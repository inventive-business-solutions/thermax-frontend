import ElectricalLoadList from "components/Project Management/Electrical Load List/ElectricalLoadList"
import React from "react"

export default async function Page({ params }: { params: { project_id: string } }) {
  console.log("params", params)
  return (
    <>
      <ElectricalLoadList/>
    </>
  )
}
