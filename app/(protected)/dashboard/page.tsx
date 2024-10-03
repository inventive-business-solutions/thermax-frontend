import HeaderSidebar from "components/HeaderSidebar"
import ProjectDashboard from "components/ProjectDashboard"

export default function Web() {
  return (
    <>
      <HeaderSidebar />
      <div className="p-4">
        <ProjectDashboard />
      </div>
    </>
  )
}
