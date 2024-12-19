import { getLatestDesignBasisRevision } from "actions/design-basis"
import { getLatestCableScheduleRevision, getLatestLoadlistRevision } from "actions/electrical-load-list"
import SldComponent from "components/Project Management/Sld/SldComponent"

export default async function Page({ params }: { params: { project_id: string } }) {
  const designbasisData = await getLatestDesignBasisRevision(params.project_id)
  const designBasisRevisionId: string = designbasisData[0]?.name
  const loadListRevisionData = await getLatestLoadlistRevision(params.project_id)
  const cableScheduleRevisionData = await getLatestCableScheduleRevision(params.project_id)
  const loadListLatestRevisionId: string = loadListRevisionData[0]?.name
  return (
    <SldComponent
      designBasisRevisionId={designBasisRevisionId}
      loadListLatestRevisionId={loadListLatestRevisionId}
      cableScheduleRevisionId={cableScheduleRevisionData[0]?.name}
    />
  )
}
