import { getData } from "actions/crud-actions"
import { getLatestDesignBasisRevision } from "actions/design-basis"
import MainLayout from "components/Project Management/Design Basis/Layout/Main"
import { DESIGN_BASIS_REVISION_HISTORY_API } from "configs/api-endpoints"

export default async function Layout({ params }: { params: { project_id: string } }) {
  const data = await getLatestDesignBasisRevision(params.project_id)

  if (data && data.length > 0) {
    return <MainLayout revision_id={data[0]?.name} />
  } else {
    return null
  }
}
