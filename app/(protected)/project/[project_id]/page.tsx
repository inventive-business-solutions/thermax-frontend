import ProjectLanding from "components/Project Management/ProjectLanding"

export default async function Page({ params }: { params: { project_id: string } }) {
  console.log("params", params)
  return (
    <>
      <ProjectLanding params={params} />
    </>
  )
}
