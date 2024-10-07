import { Metadata } from "next"
import { getUserInfo } from "actions/user-actions"
import ProjectList from "components/Project Management/ProjectList"

export const metadata: Metadata = {
  title: "Projects",
}

export default async function Projects() {
  const userInfo = await getUserInfo()
  return (
    <>
      <ProjectList userInfo={userInfo} />
    </>
  )
}
