"use client"
import { Card } from "antd"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { PROJECTS_PAGE } from "configs/constants"
import { useLoading } from "hooks/useLoading"
import LogoImage from "../public/eni_max_logo.png"
import { PROJECT_API } from "configs/api-endpoints"
import { useCurrentUser } from "hooks/useCurrentUser"
import { useGetData } from "hooks/useCRUD"

interface Project {
  id: number
  creation: string
  name: string
}

// Define the return type for year counts
interface YearCount {
  year: number
  count: number
}

const ProjectDashboard = () => {
  const { setLoading: setModalLoading } = useLoading()
  const userInfo = useCurrentUser()

  const getProjectUrl = `${PROJECT_API}?fields=["*"]&limit=1000`
  let { data: projectList } = useGetData(getProjectUrl)

  let proj = projectList?.filter((item: any) => item?.division === userInfo?.division)

  function countProjectsByYearAsArray(projectList: Project[]): YearCount[] {
    const yearCount: { [key: number]: number } = {}

    projectList?.forEach((project) => {
      if (project.creation) {
        const year = new Date(project.creation).getFullYear()
        if (!yearCount[year]) {
          yearCount[year] = 0
        }
        yearCount[year]++
      } else {
        console.warn("Project has no valid creation date:", project)
      }
    })

    return Object.entries(yearCount).map(([year, count]) => ({
      year: Number(year),
      count,
    }))
  }

  const projectCountsByYearArray = countProjectsByYearAsArray(proj)

  useEffect(() => {
    setModalLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold tracking-wide">Project Dashboard</h2>
        <div className="p-4">
          <div className="flex justify-center px-4 py-2 ">
            <Link href={PROJECTS_PAGE} onClick={() => setModalLoading(true)}>
              <Card bordered hoverable className="shadow-md">
                <div className="flex gap-4">
                  <div>
                    <Image src={"/eni_max_logo.png"} alt="Description of the image" width={65} height={65} priority />
                  </div>
                  <div className="flex flex-col items-center justify-center text-gray-700">
                    <div className="font-bold">PROJECT SUMMARY</div>
                    <div className="font-semibold">{proj?.length}</div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
          <div className="flex justify-start gap-4">
            {projectCountsByYearArray?.map((item: any, index: any) => (
              <Link key={index} href={PROJECTS_PAGE} onClick={() => setModalLoading(true)}>
                <Card className="shadow-md" bordered hoverable>
                  <div className="flex gap-4">
                    <div>
                      <Image src={LogoImage} alt="Description of the image" width={65} height={65} priority />
                    </div>
                    <div className="flex flex-col items-center justify-center text-gray-700">
                      <div className="font-bold">FY {item.year}</div>
                      <div className="font-semibold">{item.count}</div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectDashboard
