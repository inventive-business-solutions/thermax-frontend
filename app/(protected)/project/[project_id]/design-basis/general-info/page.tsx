import { getData } from "actions/crud-actions"
import { getLatestDesignBasisRevision } from "actions/design-basis"
import GeneralInfo from "components/Project Management/Design Basis/GeneralInfo"
import { DESIGN_BASIS_REVISION_HISTORY_API } from "configs/api-endpoints"

export default async function GeneralInfoPage({ params }: { params: { project_id: string } }) {
  const data = await getLatestDesignBasisRevision(params.project_id)

  if (data && data.length > 0) {
    return <GeneralInfo revision_id={data[0]?.name} />
  } else {
    return null
  }
}
