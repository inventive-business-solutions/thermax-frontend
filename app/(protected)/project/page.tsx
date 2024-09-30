import { Metadata } from "next"
import ProjectList from "components/Project Components/ProjectList"

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
