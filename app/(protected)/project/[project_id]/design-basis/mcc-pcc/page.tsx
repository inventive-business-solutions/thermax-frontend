import MainMCCPCC from "components/Project Management/Design Basis/MCC-PCC/Main"

export default function MccPccPage({ params }: { params: { project_id: string } }) {
  return (
    <>
      <MainMCCPCC params={params} />
    </>
  )
}
