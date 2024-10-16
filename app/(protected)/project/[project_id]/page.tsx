import ProjectLanding from "components/Project Management/ProjectLanding"
import TabList from "components/Tab List/TabList"

export default async function Page({ params }: { params: { project_id: string } }) {
  console.log("params", params)
  return (
    <>
      <TabList project_id={params.project_id}/>
      <ProjectLanding params={params} />
    </>
  )
}

