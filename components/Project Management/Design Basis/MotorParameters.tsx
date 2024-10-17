"use client"
import { useEffect } from "react"
import { useLoading } from "hooks/useLoading"

const MotorParameters = () => {
  const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false)
  }, [setModalLoading])

  return (
    <>
      <div className="font-bold">MOTOR PARAMETERS</div>
    </>
  )
}

export default MotorParameters
