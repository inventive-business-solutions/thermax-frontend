"use client"
import { QuestionCircleOutlined } from "@ant-design/icons"
import { FloatButton } from "antd"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import React from "react"
import { useLoading } from "hooks/useLoading"

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const params = useParams()
  const { setLoading: setModalLoading } = useLoading()

  const handleTabChange = (path: string) => {
    setModalLoading(true)
    router.push(path)
  }
  return (
    <>
      <div className="flex flex-col gap-2">
        <nav className="flex gap-2">
          <Link
            href={`/project/${params.project_id}/project-information`}
            className={
              "white grid flex-auto cursor-pointer place-content-center rounded border bg-orange-500 p-1 text-sm font-bold uppercase tracking-wide text-white"
            }
            onClick={() => handleTabChange(`/project/${params.project_id}/project-information`)}
          >
            Project Information
          </Link>
          <Link
            href={`/project/${params.project_id}/design-basis`}
            className={
              "white grid flex-auto cursor-pointer place-content-center rounded border bg-orange-500 p-1 text-sm font-bold uppercase tracking-wide text-white"
            }
            onClick={() => handleTabChange(`/project/${params.project_id}/design-basis`)}
          >
            Design Basis
          </Link>
          <Link
            href={`/project/${params.project_id}/electrical-load-list`}
            className={
              "white grid flex-auto cursor-pointer place-content-center rounded border bg-orange-500 p-1 text-sm font-bold uppercase tracking-wide text-white"
            }
            onClick={() => handleTabChange(`/project/${params.project_id}/electrical-load-list`)}
          >
            Electrical Load List
          </Link>
          <Link
            href={`/project/${params.project_id}/sld`}
            className={
              "white grid flex-auto cursor-pointer place-content-center rounded border bg-orange-500 p-1 text-sm font-bold uppercase tracking-wide text-white"
            }
            onClick={() => handleTabChange(`/project/${params.project_id}/sld`)}
          >
            SLD
          </Link>
          <Link
            href={`/project/${params.project_id}/cable-tray`}
            className={
              "white grid flex-auto cursor-pointer place-content-center rounded border bg-orange-500 p-1 text-sm font-bold uppercase tracking-wide text-white"
            }
            onClick={() => handleTabChange(`/project/${params.project_id}/cable-tray`)}
          >
            Cable Tray
          </Link>
          <Link
            href={`/project/${params.project_id}/earthing`}
            className={
              "white grid flex-auto cursor-pointer place-content-center rounded border bg-orange-500 p-1 text-sm font-bold uppercase tracking-wide text-white"
            }
            onClick={() => handleTabChange(`/project/${params.project_id}/earthing`)}
          >
            Earthing
          </Link>
          <Link
            href={`/project/${params.project_id}/lighting`}
            className={
              "white grid flex-auto cursor-pointer place-content-center rounded border bg-orange-500 p-1 text-sm font-bold uppercase tracking-wide text-white"
            }
            onClick={() => handleTabChange(`/project/${params.project_id}/lighting`)}
          >
            Lighting
          </Link>
          <Link
            href={`/project/${params.project_id}/sizing`}
            className={
              "white grid flex-auto cursor-pointer place-content-center rounded border bg-orange-500 p-1 text-sm font-bold uppercase tracking-wide text-white"
            }
            onClick={() => handleTabChange(`/project/${params.project_id}/sizing`)}
          >
            Sizing
          </Link>
        </nav>
        <main>{children}</main>
        <FloatButton icon={<QuestionCircleOutlined />} />
      </div>
    </>
  )
}
