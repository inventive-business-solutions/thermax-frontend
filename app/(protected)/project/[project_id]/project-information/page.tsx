import ProjectInfo from "components/Project Management/ProjectInfo"

export default async function Page({ params }: { params: { project_id: string } }) {
  return (
    <div className="px-8 pb-4">
      <ProjectInfo params={params} />
    </div>
  )
}
