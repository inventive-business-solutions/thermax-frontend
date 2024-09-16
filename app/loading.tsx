"use client"
import { RotatingLines } from "react-loader-spinner"

export default function Loading() {
  return (
    <div className="grid min-h-dvh place-content-center">
      <RotatingLines
        visible={true}
        width="96"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        strokeColor="#492971"
      />
    </div>
  )
}
