"use client"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider } from "antd"
import Image from "next/image"
import { signIn } from "next-auth/react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as zod from "zod"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomPasswordInput from "components/FormInputs/CustomPasswordInput"

const signInSchema = zod.object({
  email: zod.string().email({ message: "Invalid email address" }),
  password: zod.string(),
})

export default function SignIn() {
  const [loading, setLoading] = useState(false)
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  })
  const onSubmit: SubmitHandler<zod.infer<typeof signInSchema>> = (data) => {
    console.log(data)
  }
  return (
    <div className="flex flex-col rounded-xl border border-gray-300 p-6 shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 ">
        <h1 className="text-center">Sign In</h1>
        <CustomTextInput name="email" control={control} label="Email" type="email" />
        <CustomPasswordInput name="password" control={control} label="Password" />
        <Button type="primary" size="large" htmlType="submit">
          Submit
        </Button>
      </form>
      <Divider style={{ borderColor: "#492971" }}>Or</Divider>
      {/* Google Button */}
      <Button
        type="default"
        size="large"
        loading={loading}
        onClick={async () => {
          setLoading(true)
          await signIn("google")
        }}
      >
        <Image src="/google-icon.png" alt="Google Icon" width={24} height={24} />
        <span>Sign In with Google</span>
      </Button>
    </div>
  )
}
