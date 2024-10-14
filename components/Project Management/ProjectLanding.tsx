"use client"

import { QuestionCircleOutlined } from "@ant-design/icons"
import { FloatButton } from "antd"
import { useState } from "react"
import DesignBasis from "components/Project Management/Design Basis/DesignBasis"
import ElectricalLoadList from "components/Project Management/Electrical Load List/ElectricalLoadList"
import ProjectInfo from "components/Project Management/ProjectInfo"
import { useGetData } from "hooks/useCRUD"
import { useRouter } from "next/navigation"

const tabData = [
  { label: "Project Information", key: "1", route: "/project-information" },
  { label: "Design Basis", key: "2", route: "/design-basis" },
  { label: "Electrical Load List", key: "3", route: "/electrical-load-list" },
  { label: "SLD", key: "4", route: "/sld" },
  { label: "Cable Tray", key: "5", route: "/cable-tray" },
  { label: "Earthing", key: "6", route: "/earthing" },
  { label: "Lighting", key: "7", route: "/lighting" },
  { label: "Sizing", key: "8", route: "/sizing" },
]

// const tabData = [

//   { label: "Project Information", key: "1" },
//   { label: "Design Basis", key: "2" },
//   { label: "Electrical Load List", key: "3" },
//   { label: "SLD", key: "4" },
//   { label: "Cable Tray", key: "5" },
//   { label: "Earthing", key: "6" },
//   { label: "Lighting", key: "7" },
//   { label: "Sizing", key: "8" },
// ]

export default function ProjectLanding({ params }: { params: { project_id: string } }) {
  const [openTab, setOpenTab] = useState<string>("1") // current open tab
  const [savedTabs, setSavedTabs] = useState<string[]>([]) // array to track saved tabs
  const router = useRouter()
  const navigate = (path: string) => {
    router.push(`/project/${params.project_id}/${path}`);
  };
  console.log("params", params)

  // Check if a tab is saved
  const isSaved = (tabKey: string) => savedTabs.includes(tabKey)

  // Handle tab click
  const handleTabClick = (tabKey: string) => {
    // Prevent navigating to a tab if it's not saved and not immediately next to a saved tab
    const currentIndex = tabData.findIndex((tab) => tab.key === openTab)
    const targetIndex = tabData.findIndex((tab) => tab.key === tabKey)

    if (targetIndex <= currentIndex || (targetIndex === currentIndex + 1 && isSaved(openTab))) {
      setOpenTab(tabKey)
    }
  }

  const changeTab = (tab: string) => {
    setOpenTab(tab) // set the tab to desired tab
  }

  // Handle save action
  const handleSave = () => {
    if (!isSaved(openTab)) {
      setSavedTabs([...savedTabs, openTab])
    }
  }

  // Render the tab classes based on their state

  return (
    <>
      <div className="">
        <div className="flex flex-col gap-2">
         

          <div className="">
            {/* Tab Content */}
            <div className={openTab === "1" ? "block" : "hidden"} id="link1">
              <ProjectInfo isSaved={isSaved} handleSave={handleSave} changeTab={changeTab} params={params} />
            </div>

            <div className={openTab === "2" ? "block" : "hidden"} id="link2">
              <DesignBasis handleSave={handleSave} />
            </div>

            <div className={openTab === "3" ? "block" : "hidden"} id="link3">
              {/* <ElectricalLoadList project_id/> */}
            </div>

            <div className={openTab === "4" ? "block" : "hidden"} id="link4">
              <p>Content of SLD</p>
            </div>

            <div className={openTab === "5" ? "block" : "hidden"} id="link5">
              <p>Content of Cable Tray</p>
            </div>

            <div className={openTab === "6" ? "block" : "hidden"} id="link6">
              <p>Content of Earthing</p>
            </div>

            <div className={openTab === "7" ? "block" : "hidden"} id="link7">
              <p>Content of Lighting</p>
            </div>

            <div className={openTab === "8" ? "block" : "hidden"} id="link8">
              <p>Content of Sizing</p>
            </div>
          </div>
        </div>

        <FloatButton icon={<QuestionCircleOutlined />} />
      </div>
    </>
  )
}
