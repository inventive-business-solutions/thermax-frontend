import { getLatestDesignBasisRevision } from "actions/design-basis"
import { getLatestLoadlistRevision } from "actions/electrical-load-list"
import LoadList from "components/Project Management/Electrical Load List/Electrical Load List/LoadListComponent"

export default async function Loadlist({ params }: { params: { project_id: string } }) {
  const designbasisData = await getLatestDesignBasisRevision(params.project_id)
  const loadListRevisionData = await getLatestLoadlistRevision(params.project_id)

//   if (loadListRevisionData && loadListRevisionData.length > 0) {
    return (
      <LoadList
        //   onNext={() => setOpenTab((tab) => tab + 1)}
        designBasisRevisionId={designbasisData[0]?.name}
        loadListLatestRevisionId={loadListRevisionData[0]?.name}
      />
    )
//   } else {
    // return null
//   }
}
