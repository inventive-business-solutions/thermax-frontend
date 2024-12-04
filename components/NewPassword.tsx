"use client";

import { resetPassword } from "@/actions/verification-token";
import { SIGN_IN } from "@/configs/constants";
import { useLoading } from "@/hooks/useLoading";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import AlertNotification from "./AlertNotification";
import CustomPasswordInput from "./FormInputs/CustomPasswordInput";

const NewPasswordSchema = zod
  .object({
    password: zod
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .max(16, { message: "Password must be at most 16 characters" }),
    password_confirmation: zod.string(),
  })
  .refine(
    (fieldsData) => fieldsData.password === fieldsData.password_confirmation,
    {
      message: "Passwords don't match",
      path: ["password_confirmation"],
    }
  );

export default function NewPassword({ email }: { email: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();
  const { setLoading: setModalLoading } = useLoading();
  useEffect(() => {
    setModalLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (data: zod.infer<typeof NewPasswordSchema>) => {
    setIsLoading(true);
    try {
      await resetPassword(email, data.password);
      setStatus("success");
      setMessage("Password reset successful");
    } catch (error) {
      console.error(error);
      setMessage("Password reset failed");
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col rounded-xl border border-gray-300 p-6 shadow-md">
      <div className="mb-2 flex justify-center">
        <Image
          src="/logoLandingPage.png"
          alt="Logo"
          width={60}
          height={60}
          priority
        />
      </div>
      <h1 className="mb-2 text-center text-lg font-bold">Set New Password</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <CustomPasswordInput
          name="password"
          control={control}
          label="New Password"
        />
        <CustomPasswordInput
          name="password_confirmation"
          control={control}
          label="Confirm password"
        />
        <AlertNotification message={message} status={status} />
        {status !== "success" && (
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        )}
      </form>
      {status === "success" && (
        <Button
          className="mt-2"
          type="primary"
          htmlType="button"
          onClick={() => {
            setModalLoading(true);
            router.push(SIGN_IN);
          }}
        >
          Sign In
        </Button>
      )}
    </div>
  );
}
