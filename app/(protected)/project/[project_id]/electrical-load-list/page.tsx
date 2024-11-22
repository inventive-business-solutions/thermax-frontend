import React from "react"
import ElectricalLoadList from "components/Project Management/Electrical Load List/ElectricalLoadList"
import { getLatestDesignBasisRevision } from "actions/design-basis"

const ElectricalLoadListPage = async ({ params }: { params: { project_id: string } }) => {
  const data = await getLatestDesignBasisRevision(params.project_id)
  
  return (
    <>
      <ElectricalLoadList revision_id={data[0]?.name} />
    </>
  )
}

export default ElectricalLoadListPage
