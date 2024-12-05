import { redirect } from "next/navigation"

const LoadListPage = ({ params }: any) => {
  redirect(`/project/${params.project_id}/electrical-load-list/document-revision`)
}

export default LoadListPage
