import { getData } from "actions/crud-actions"
import MotorParameters from "components/Project Management/Design Basis/MotorParameters"
import { DESIGN_BASIS_REVISION_HISTORY_API } from "configs/api-endpoints"

export default async function MotorParametersPage({ params }: { params: { project_id: string } }) {
  const data = await getData(
    `${DESIGN_BASIS_REVISION_HISTORY_API}?filters=[["project_id", "=", "${params.project_id}"], ["status", "=", "Success"]]`
  )

  if (data && data.length > 0) {
    return <MotorParameters revision_id={data[0]?.name} />
  } else {
    return null
  }
}
