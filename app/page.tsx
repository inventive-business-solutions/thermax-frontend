import { Metadata } from "next"
import HeaderSidebar from "components/HeaderSidebar"
import ProjectDashboard from "components/ProjectDashboard"

export const metadata: Metadata = {
  title: "Homepage",
}

export default async function Web() {
  return (
    <>
      <HeaderSidebar />
      <div className="p-4">
        <ProjectDashboard />
      </div>
    </>
  )
}
