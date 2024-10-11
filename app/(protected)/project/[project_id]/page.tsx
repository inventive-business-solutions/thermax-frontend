import { redirect } from "next/navigation"

const DefaultPage = async ({ params }: { params: { project_id: string } }) => {
  redirect(`/project/${params.project_id}/project-information`)
}

export default DefaultPage
