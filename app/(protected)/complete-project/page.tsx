import { Metadata } from "next"
import { getUserInfo } from "actions/user-actions"
import ProjectList from "components/Project Management/Project List/ProjectList"

export const metadata: Metadata = {
  title: "Complete Projects",
}

export default async function Projects() {
  const userInfo = await getUserInfo()
  return (
    <>
      <ProjectList userInfo={userInfo} isComplete={1} />
    </>
  )
}
