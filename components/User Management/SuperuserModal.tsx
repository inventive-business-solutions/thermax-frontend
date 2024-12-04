"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { mutate } from "swr";
import * as zod from "zod";

import AlertNotification from "../AlertNotification";
import CustomTextInput from "../FormInputs/CustomInput";
import { updateData, getData } from "@/actions/crud-actions";
import { registerNewUser } from "@/actions/register";
import {
  DIVISION_API,
  USER_API,
  THERMAX_USER_API,
} from "@/configs/api-endpoints";
import { BTG, THERMAX_SUPERUSER } from "@/configs/constants";
import { useDropdownOptions } from "@/hooks/useDropdownOptions";
import CustomSingleSelect from "../FormInputs/CustomSingleSelect";

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
      required_error: "Email address is required",
      message: "Email address is required",
    })
    .email({ message: "Invalid email address" }),
  name_initial: zod
    .string({
      required_error: "Initials is required",
      message: "Initials is required",
    })
    .max(3, { message: "Initials should not exceed 3 characters" }),
  division: zod.string({
    required_error: "Division is required",
    message: "Division is required",
  }),
});

const getDefaultValues = (editMode: boolean, values: any) => {
  return {
    first_name: editMode ? values?.first_name : null,
    last_name: editMode ? values?.last_name : null,
    email: editMode ? values?.email : null,
    name_initial: editMode ? values?.name_initial : null,
    division: editMode ? values?.division : null,
  };
};

export default function SuperuserFormModal({
  open,
  setOpen,
  editMode,
  values,
  editEventTrigger,
}: any) {
  const [infoMessage, setInfoMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  let { dropdownOptions: divisionNames } = useDropdownOptions(
    DIVISION_API,
    "name"
  );
  divisionNames = divisionNames?.filter(
    (division: any) => division.name !== BTG
  );

  const { control, handleSubmit, reset, watch } = useForm({
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

  // Helper function for updating user
  const handleUpdateUser = async (userData: any) => {
    try {
      userData["digital_signature"] = null;

      await updateData(`${USER_API}/${values.name}`, false, userData);
      await updateData(`${THERMAX_USER_API}/${values.name}`, false, userData);
      setStatus("success");
      setInfoMessage("User information updated successfully");
    } catch (error: any) {
      throw error;
    } finally {
      mutate(
        `${THERMAX_USER_API}?fields=["*"]&filters=[["is_superuser", "=",  "1"]]`
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
  > = async (data) => {
    setLoading(true);
    try {
      if (editMode) {
        await handleUpdateUser(data);
        message.success("User information updated successfully");
        setOpen(false);
      } else {
        const thermaxDivisionUser = await getData(
          `${THERMAX_USER_API}?fields=["*"]&filters=[["division", "=", "${data.division}"], ["is_superuser", "=",  "1"]]`
        );
        if (thermaxDivisionUser?.length > 0) {
          setStatus("error");
          setInfoMessage(`Superuser already exists for this division`);
        } else {
          const registerRes = await registerNewUser(
            data,
            THERMAX_SUPERUSER,
            data.division,
            true,
            data.name_initial
          );
          if (registerRes?.status === 409) {
            setStatus("error");
            setInfoMessage("User already exist");
          } else {
            message.success("User created successfully");
            handleCancel();
          }
        }
      }
      mutate(
        `${THERMAX_USER_API}?fields=["*"]&filters=[["is_superuser", "=",  "1"]]`
      );
      mutate(`${USER_API}?fields=["*"]`);
    } catch (error: any) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      title={
        <h1 className="text-center font-bold">{`${
          editMode ? "Edit" : "Add New"
        } Superuser`}</h1>
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
            <CustomSingleSelect
              name="division"
              control={control}
              label="Division"
              options={divisionNames}
              disabled={watch("division") === BTG}
            />
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
