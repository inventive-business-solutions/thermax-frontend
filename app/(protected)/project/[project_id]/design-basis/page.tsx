import { redirect } from "next/navigation"

const DesignBasisPage = ({ params }: any) => {
  redirect(`/project/${params.project_id}/design-basis/document-revision`)
}

export default DesignBasisPage
