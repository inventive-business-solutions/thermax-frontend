"use client"
import { Result } from "antd"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { verifyAccount } from "actions/verification-token"
import Loader from "components/Loader"
import { UNAUTHORIZED } from "configs/constants"
import { sendCredentialsEmail } from "actions/register"

export default function VerifyAccount() {
  const [validToken, setValidToken] = useState(false)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    const token = searchParams.get("token")
    if (!token) {
      router.push(UNAUTHORIZED)
      return
    }

    ;(async () => {
      try {
        const { valid, email } = await verifyAccount(token)
        debugger

        if (valid) {
          await sendCredentialsEmail(email, "Team BTG")
        }

        if (!valid) {
          router.push(UNAUTHORIZED)
        }
        setValidToken(true)
      } catch (error) {
        router.push(UNAUTHORIZED)
      }
    })()
    setLoading(false)
  }, [searchParams, router])

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      {validToken ? (
        <Result
          status="success"
          title="Account verified successfully. Go to your email account for the login details!"
        />
      ) : (
        <Result
          status="error"
          title="Account verification failed"
          subTitle="Please check your email for the verification link"
        />
      )}
    </div>
  )
}
