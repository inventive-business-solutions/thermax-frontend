import { getData } from "actions/crud-actions"
import ProjectInfo from "components/Project Management/Project Information/ProjectInfo"
import { DESIGN_BASIS_REVISION_HISTORY_API } from "configs/api-endpoints"

export default async function Page({ params }: { params: { project_id: string } }) {
  const data = await getData(
    `${DESIGN_BASIS_REVISION_HISTORY_API}?filters=[["project_id", "=", "${params.project_id}"], ["status", "=", "Success"]]`,
    false
  )

  if (data && data.length > 0) {
    return <ProjectInfo revision_id={data[0]?.name} />
  } else {
    return null
  }
}
