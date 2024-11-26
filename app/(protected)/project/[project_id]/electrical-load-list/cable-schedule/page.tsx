// import { getLatestDesignBasisRevision } from "actions/design-basis"
// import MainMCCPCC from "components/Project Management/Design Basis/MCC-PCC/Main"
// import Download from "components/Project Management/Electrical Load List/Download"
// import Download from "./Download"
import CableScheduleComponent from "components/Project Management/Electrical Load List/Cable Schedule/CableScheduleComponent"

export default async function CableSchedule({ params }: { params: { project_id: string } }) {
  //   const data = await getLatestDesignBasisRevision(params.project_id)

  //   if (data && data.length > 0) {
  return <CableScheduleComponent />
  //   } else {
  // return null
  //   }
}
