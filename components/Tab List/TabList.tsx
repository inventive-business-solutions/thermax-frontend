'use client'
import { useRouter } from "next/navigation"
import { FC } from "react"

interface Props {
  project_id: string
}

const TabList: FC<Props> = ({ project_id }) => {
  const router = useRouter()

  const tabData = [
    { label: "Project Information", key: "1", route: "project-information" },
    { label: "Design Basis", key: "2", route: "design-basis" },
    { label: "Electrical Load List", key: "3", route: "electrical-load-list" },
    { label: "SLD", key: "4", route: "sld" },
    { label: "Cable Tray", key: "5", route: "cable-tray" },
    { label: "Earthing", key: "6", route: "earthing" },
    { label: "Lighting", key: "7", route: "lighting" },
    { label: "Sizing", key: "8", route: "sizing" },
  ]

  const navigate = (path: string) => {
    router.push(`/project/${project_id}/${path}`)
  }

  return (
    <div className="flex gap-2">
      {tabData.map((tab) => (
        <div
          key={tab.key}
          className={
            "white grid flex-auto cursor-pointer place-content-center rounded border bg-orange-500 p-1 text-sm font-bold uppercase tracking-wide text-white"
          }
          onClick={(e) => {
            e.preventDefault()
            navigate(tab.route)
          }}
        >
          {tab.label}
        </div>
      ))}
    </div>
  )
}

export default TabList
