"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Modal } from "antd"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as zod from "zod"
import { CreateUser } from "actions/register"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomPasswordInput from "components/FormInputs/CustomPasswordInput"
import { BTG, DASHBOARD_PAGE, THERMAX_SUPERUSER } from "configs/constants"
import { useLoading } from "hooks/useLoading"
import AlertNotification from "./AlertNotification"

const signInSchema = zod.object({
  email: zod.string({ required_error: "Email address is required" }).email({ message: "Invalid email address" }),
  password: zod.string({ required_error: "Password is required" }),
})

const createBTGUserSchema = zod.object({
  first_name: zod.string({ required_error: "First name is required", message: "First name is required" }),
  last_name: zod.string({ required_error: "Last name is required", message: "Last name is required" }),
  email: zod.string({ required_error: "Email address is required" }).email({ message: "Invalid email address" }),
})

export default function SignIn({ authSecret }: { authSecret: string }) {
  const [loading, setLoading] = useState(false)
  const { setLoading: setModalLoading } = useLoading()
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("")
  const router = useRouter()

  useEffect(() => {
    setModalLoading(false)
  }, [])

  const { control, handleSubmit, watch } = useForm<zod.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
  })

  const { control: control2, handleSubmit: handleSubmit2 } = useForm<zod.infer<typeof createBTGUserSchema>>({
    resolver: zodResolver(createBTGUserSchema),
    mode: "onBlur",
  })

  // Helper function for handling errors
  const handleError = (error: any) => {
    setStatus("error")
    try {
      const errorObj = JSON.parse(error?.message) as any
      setMessage(errorObj?.message)
    } catch (parseError) {
      // If parsing fails, use the raw error message
      setMessage(error?.message || "An unknown error occurred")
    }
  }

  const onSubmit: SubmitHandler<zod.infer<typeof signInSchema>> = async (data) => {
    setLoading(true)
    const signInRes = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })
    if (!signInRes?.error) {
      // If no error then redirect to the desired page
      setStatus("success")
      setMessage("Successfully signed in. Redirecting...")
      setModalLoading(true)
      router.push(DASHBOARD_PAGE)
    }
    switch (signInRes?.error) {
      case "CredentialsSignin":
        setStatus("error")
        setMessage("Invalid email or password")
        break
      case "Configuration":
        setStatus("error")
        setMessage("Account does not exist!")
        break
      default:
        break
    }
    setLoading(false)
  }

  const onSubmit2: SubmitHandler<zod.infer<typeof createBTGUserSchema>> = async (data) => {
    setLoading(true)
    try {
      const response = await CreateUser(data, THERMAX_SUPERUSER, BTG, true)
      if (response?.status === 409) {
        setStatus("error")
        setMessage(response?.message)
        return
      }
      if (response?.status === 201) {
        setStatus("success")
        setMessage(response?.message)
        return
      }
    } catch (error: any) {
      handleError(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex w-1/3 flex-col gap-2 rounded-xl border border-gray-300 p-6 shadow-lg">
      <div className="mb-2 flex flex-col items-center justify-center">
        <Image src="/logoLandingPage.png" alt="Logo" width={60} height={60} priority />
        <h1 className="text-center text-lg font-bold tracking-wide text-slate-700">SIGN IN</h1>
      </div>

      {watch("email") === authSecret ? (
        <div className="">
          <form onSubmit={handleSubmit2(onSubmit2)} className="flex flex-col gap-2">
            <CustomTextInput name="first_name" control={control2} label="First Name" />
            <CustomTextInput name="last_name" control={control2} label="Last Name" />
            <CustomTextInput name="email" control={control2} label="Email" type="email" />
            <AlertNotification status={status} message={message} />
            <Button type="primary" htmlType="submit" loading={loading}>
              Create BTG User
            </Button>
          </form>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div>
            <CustomTextInput name="email" control={control} label="Email" type="email" />
          </div>
          <div>
            <CustomPasswordInput name="password" control={control} label="Password" />
          </div>
          <AlertNotification status={status} message={message} />
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </form>
      )}
    </div>
  )
}
