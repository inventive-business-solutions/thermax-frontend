// import React from "react"
import ElectricalLoadList from "components/Project Management/Electrical Load List/ElectricalLoadList"
// import { getLatestDesignBasisRevision } from "actions/design-basis"
// import { getLatestLoadlistRevision } from "actions/electrical-load-list"

// const ElectricalLoadListPage = async ({ params }: { params: { project_id: string } }) => {
//   const data = await getLatestDesignBasisRevision(params.project_id)
//   const loadListRevisionData = await getLatestLoadlistRevision(params.project_id)

//   return (
//     <>
      // <ElectricalLoadList revision_id={data[0]?.name} loadListLatestRevisionId={loadListRevisionData[0]?.name}/>
//     </>
//   )
// }

// export default ElectricalLoadListPage

import { redirect } from "next/navigation"

const LoadListPage = ({ params }: any) => {
  redirect(`/project/${params.project_id}/electrical-load-list/document-revision`)
}

export default LoadListPage
