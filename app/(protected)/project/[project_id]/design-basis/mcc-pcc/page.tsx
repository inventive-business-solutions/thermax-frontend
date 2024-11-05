import { getData } from "actions/crud-actions"
import MainMCCPCC from "components/Project Management/Design Basis/MCC-PCC/Main"
import { DESIGN_BASIS_REVISION_HISTORY_API } from "configs/api-endpoints"

export default async function MccPccPage({ params }: { params: { project_id: string } }) {
  const data = await getData(
    `${DESIGN_BASIS_REVISION_HISTORY_API}?filters=[["project_id", "=", "${params.project_id}"], ["status", "=", "Success"]]`,
    false
  )

  if (data && data.length > 0) {
    return <MainMCCPCC revision_id={data[0]?.name} />
  } else {
    return null
  }
}
