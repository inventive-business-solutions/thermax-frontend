"use client"

import { ThreeDots } from "react-loader-spinner"

export default function Loader() {
  return (
    <div className="grid min-h-dvh place-content-center">
      <ThreeDots visible={true} height="80" width="80" radius="9" ariaLabel="three-dots-loading" color="#1890ff" />
    </div>
  )
}
