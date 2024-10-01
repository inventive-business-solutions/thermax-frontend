import { Metadata } from "next"
import ProjectList from "components/Project Management/ProjectList"

export const metadata: Metadata = {
  title: "Projects",
}

export default function Projects() {
  return (
    <>
      <ProjectList />
    </>
  )
}
