"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, message, Modal } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { mutate } from "swr";
import * as zod from "zod";
import { updateData } from "@/actions/crud-actions";
import { registerNewUser } from "@/actions/register";
import CustomUpload from "@/components/FormInputs/CustomUpload";
import { uploadFile } from "@/components/FormInputs/FileUpload";
import {
  getUsersUrl,
  THERMAX_USER_API,
  USER_API,
} from "@/configs/api-endpoints";
import { THERMAX_USER } from "@/configs/constants";
import AlertNotification from "../AlertNotification";
import CustomTextInput from "../FormInputs/CustomInput";

const UserFormValidationSchema = zod.object({
  first_name: zod.string({
    required_error: "First name is required",
    message: "First name is required",
  }),
  last_name: zod.string({
    required_error: "Last name is required",
    message: "Last name is required",
  }),
  email: zod
    .string({
      required_error: "Email is required",
      message: "Email is required",
    })
    .email({ message: "Invalid email" }),
  name_initial: zod
    .string({
      required_error: "Initials is required",
      message: "Initials is required",
    })
    .max(3, { message: "Initials should not exceed 3 characters" }),
  digital_signature: zod.any().optional(),
});

const getDefaultValues = (editMode: boolean, values: any) => {
  return {
    first_name: editMode ? values?.first_name : null,
    last_name: editMode ? values?.last_name : null,
    email: editMode ? values?.email : null,
    name_initial: editMode ? values?.name_initial : null,
    digital_signature: editMode
      ? !values?.digital_signature
        ? []
        : [values?.digital_signature]
      : [],
  };
};

export default function UserFormModal({
  open,
  setOpen,
  editMode,
  values,
  editEventTrigger,
  userInfo,
}: any) {
  const [infoMessage, setInfoMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(UserFormValidationSchema),
    defaultValues: getDefaultValues(editMode, values),
    mode: "onSubmit",
  });

  useEffect(() => {
    reset(getDefaultValues(editMode, values));
  }, [editMode, reset, values, editEventTrigger]);

  const handleCancel = () => {
    setOpen(false);
    reset(getDefaultValues(false, values));
    setInfoMessage("");
    setStatus("");
  };

  // Helper function for creating user
  const handleCreateUser = async (userData: any) => {
    const dg_sign_file = userData?.digital_signature;
    try {
      if (Array.isArray(dg_sign_file)) {
        userData["digital_signature"] = "";
      } else {
        const { data } = await uploadFile(dg_sign_file as File);
        userData["digital_signature"] = data.file_url;
      }
      const registerRes = await registerNewUser(
        userData,
        THERMAX_USER,
        userInfo?.division,
        false,
        userData?.name_initial
      );
      if (registerRes?.status === 409) {
        setStatus("error");
        setInfoMessage("User already exist");
      } else {
        handleCancel();
        message.success("User created successfully");
      }
    } catch (error: any) {
      throw error;
    } finally {
      mutate(
        `${THERMAX_USER_API}?fields=["*"]&filters=[["division", "=",  "${userInfo?.division}"]]`
      );
      mutate(`${USER_API}?fields=["*"]`);
    }
  };

  // Helper function for updating user
  const handleUpdateUser = async (userData: any) => {
    const dg_sign_file = userData?.digital_signature;
    try {
      if (
        typeof dg_sign_file === "string" &&
        dg_sign_file.startsWith("/files/")
      ) {
        userData["digital_signature"] = dg_sign_file;
      } else {
        if (Array.isArray(dg_sign_file) && dg_sign_file.length === 0) {
          userData["digital_signature"] = "";
        } else {
          const { data } = await uploadFile(dg_sign_file[0] as File);
          userData["digital_signature"] = data.file_url;
        }
      }

      await updateData(`${USER_API}/${values.name}`, false, userData);
      await updateData(`${THERMAX_USER_API}/${values.name}`, false, userData);

      message.success("User updated successfully");
      handleCancel();
    } catch (error: any) {
      throw error;
    } finally {
      mutate(
        `${THERMAX_USER_API}?fields=["*"]&filters=[["division", "=",  "${userInfo?.division}"]]`
      );
      mutate(`${USER_API}?fields=["*"]`);
    }
  };

  // Helper function for handling errors
  const handleError = (error: any) => {
    setStatus("error");
    try {
      const errorObj = JSON.parse(error?.message) as any;
      setInfoMessage(errorObj?.message);
    } catch (parseError) {
      console.error(parseError);
      // If parsing fails, use the raw error message
      setInfoMessage(error?.message || "An unknown error occurred");
    }
  };

  const onSubmit: SubmitHandler<
    zod.infer<typeof UserFormValidationSchema>
  > = async (data: any) => {
    setLoading(true);
    try {
      if (editMode) {
        await handleUpdateUser(data);
      } else {
        await handleCreateUser(data);
      }
    } catch (error: any) {
      handleError(error);
    } finally {
      mutate(getUsersUrl);
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      title={
        <h1 className="text-center font-bold">{`${
          editMode ? "Edit" : "Add New"
        } User`}</h1>
      }
      onCancel={handleCancel}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="flex-1">
            <CustomTextInput
              name="first_name"
              control={control}
              label="First Name"
              type="text"
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              name="last_name"
              control={control}
              label="Last Name"
              type="text"
            />
          </div>
        </div>
        <div className="flex-1">
          <CustomTextInput
            name="email"
            control={control}
            label="Email"
            type="email"
            disabled={editMode}
          />
        </div>
        <div className="flex-1">
          <CustomTextInput
            name="name_initial"
            control={control}
            label="Initials"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex-1">
            <CustomUpload
              name="digital_signature"
              control={control}
              uploadButtonLabel="Digital Signature"
              accept="image/*"
            />
          </div>
          <div>
            {values?.digital_signature && (
              <Image
                src={`${process.env.NEXT_PUBLIC_FRAPPE_DOMAIN_NAME}${values?.digital_signature}`}
                width={100}
                height={100}
                alt="Digital Signature"
              />
            )}
          </div>
        </div>

        <AlertNotification message={infoMessage} status={status} />
        <div className="text-end">
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}
