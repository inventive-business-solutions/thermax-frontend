import { Metadata } from "next"
import { auth } from "auth"
import HeaderSidebar from "components/HeaderSidebar"
import ProjectDetails from "components/ProjectDetails"

export const metadata: Metadata = {
  title: "Homepage",
}

export default async function Web() {
  const session = await auth()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex-1">
        <HeaderSidebar />
      </div>
      <div className="flex-1">
        <ProjectDetails />
      </div>
    </div>
  )
}
