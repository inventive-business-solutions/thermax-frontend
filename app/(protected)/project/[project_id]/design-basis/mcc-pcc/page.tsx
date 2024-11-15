import { getLatestDesignBasisRevision } from "actions/design-basis"
import MainMCCPCC from "components/Project Management/Design Basis/MCC-PCC/Main"

export default async function MccPccPage({ params }: { params: { project_id: string } }) {
  const data = await getLatestDesignBasisRevision(params.project_id)

  if (data && data.length > 0) {
    return <MainMCCPCC revision_id={data[0]?.name} />
  } else {
    return null
  }
}
