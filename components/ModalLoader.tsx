"use client"

import { useLoading } from "hooks/useLoading"
import { Circles } from "react-loader-spinner"

export default function ModalLoader() {
  const { isLoading } = useLoading()
  if (!isLoading) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white opacity-80">
      <Circles height="80" width="80" color="#1373CC" ariaLabel="circles-loading" visible={true} />
    </div>
  )
}
