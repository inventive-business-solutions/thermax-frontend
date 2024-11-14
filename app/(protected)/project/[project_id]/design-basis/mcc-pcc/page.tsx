import { getData } from "actions/crud-actions"
import { getLatestDesignBasisRevision } from "actions/design-basis"
import MainMCCPCC from "components/Project Management/Design Basis/MCC-PCC/Main"
import { DESIGN_BASIS_REVISION_HISTORY_API } from "configs/api-endpoints"

export default async function MccPccPage({ params }: { params: { project_id: string } }) {
  const data = await getLatestDesignBasisRevision(params.project_id)

  if (data && data.length > 0) {
    return <MainMCCPCC revision_id={data[0]?.name} />
  } else {
    return null
  }
}
