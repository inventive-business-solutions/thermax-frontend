"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Result } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { useRouter } from "next/navigation";
import { verifyEmailandGenerateToken } from "@/actions/verification-token";
import AlertNotification from "@/components/AlertNotification";
import CustomTextInput from "@/components/FormInputs/CustomInput";
import { SIGN_IN } from "@/configs/constants";
import { useLoading } from "@/hooks/useLoading";

const resetPasswordSchema = zod.object({
  email: zod.string().email({
    message: "Please enter a valid email address",
  }),
});

export default function ResetPassword() {
  const [status, setStatus] = useState<string | null>("");
  const [message, setMessage] = useState<string | null>("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const { setLoading: setModalLoading } = useLoading();
  useEffect(() => {
    setModalLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<zod.infer<typeof resetPasswordSchema>> = async (
    values
  ) => {
    setStatus("");
    setMessage("");
    setIsPending(true);
    const response = await verifyEmailandGenerateToken(values.email);
    if (response.status === "success") {
      setStatus("success");
      setMessage("Go to your registered email to reset your password");
    } else {
      setStatus("error");
      setMessage(response.message);
    }
    setIsPending(false);
  };

  return (
    <div className="mx-auto mt-4 w-full rounded-2xl border border-gray-300 p-4 shadow-md md:w-1/2">
      {status === "success" ? (
        <Result
          status="success"
          title="Reset password link sent to your registered email!"
          extra={[
            <Button
              type="primary"
              key="signin"
              onClick={() => {
                setModalLoading(true);
                router.push(SIGN_IN);
              }}
            >
              Go to Sign In
            </Button>,
          ]}
        />
      ) : (
        <>
          <div className="mb-2 flex justify-center">
            <Image
              src="/logoLandingPage.png"
              alt="Logo"
              width={60}
              height={60}
              priority
            />
          </div>
          <h1 className="text-center text-lg font-bold">Reset Password</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <CustomTextInput
                name="email"
                control={control}
                label="Email"
                type="email"
                placeholder="Enter your registered email"
              />
            </div>
            <AlertNotification message={message} status={status} />
            <div className="flex justify-end">
              <Button type="primary" htmlType="submit" loading={isPending}>
                {status === "success" ? "Reverify Email" : "Verify Email"}
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
