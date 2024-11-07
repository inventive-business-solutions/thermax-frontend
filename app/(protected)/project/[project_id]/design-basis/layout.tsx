"use client"
import { QuestionCircleOutlined } from "@ant-design/icons"
import { FloatButton } from "antd"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"
import { useLoading } from "hooks/useLoading"
import { useGetData } from "hooks/useCRUD"
import { PROJECT_API } from "configs/api-endpoints"

export default function DesignBasisLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { project_id: string }
}) {
  const router = useRouter()
  const { setLoading: setModalLoading } = useLoading()
  const { data: projectData }: any = useGetData(`${PROJECT_API}/${params?.project_id}`, false)

  const handleTabChange = (path: string) => {
    setModalLoading(true)
    router.push(path)
  }
  return (
    <div className="flex flex-col gap-2 px-2 pb-2 shadow-lg">
      <div className="flex">
        <h2 className="font-bold underline">DESIGN BASIS TAB</h2>
        <h2 className="font-semibold"> : {projectData?.project_name}</h2>
      </div>
      <nav className="flex gap-2">
        <Link
          href={`/project/${params.project_id}/design-basis/document-revision`}
          className={
            "white grid flex-auto cursor-pointer place-content-center rounded border bg-gray-500 p-1 text-xs font-bold uppercase tracking-wide text-white"
          }
          onClick={() => handleTabChange(`/project/${params.project_id}/design-basis/document-revision`)}
        >
          Document Revision
        </Link>
        <Link
          href={`/project/${params.project_id}/design-basis/general-info`}
          className={
            "white grid flex-auto cursor-pointer place-content-center rounded border bg-gray-500 p-1 text-xs font-bold uppercase tracking-wide text-white"
          }
          onClick={() => handleTabChange(`/project/${params.project_id}/design-basis/general-info`)}
        >
          General Information
        </Link>

        <Link
          href={`/project/${params.project_id}/design-basis/motor-parameters`}
          className={
            "white grid flex-auto cursor-pointer place-content-center rounded border bg-gray-500 p-1 text-xs font-bold uppercase tracking-wide text-white"
          }
          onClick={() => handleTabChange(`/project/${params.project_id}/design-basis/motor-parameters`)}
        >
          Motor Parameters
        </Link>
        <Link
          href={`/project/${params.project_id}/design-basis/mcc-pcc`}
          className={
            "white grid flex-auto cursor-pointer place-content-center rounded border bg-gray-500 p-1 text-xs font-bold uppercase tracking-wide text-white"
          }
          onClick={() => handleTabChange(`/project/${params.project_id}/design-basis/mcc-pcc`)}
        >
          MCC / PCC
        </Link>
        <Link
          href={`/project/${params.project_id}/design-basis/layout`}
          className={
            "white grid flex-auto cursor-pointer place-content-center rounded border bg-gray-500 p-1 text-xs font-bold uppercase tracking-wide text-white"
          }
          onClick={() => handleTabChange(`/project/${params.project_id}/design-basis/layout`)}
        >
          Layout
        </Link>
      </nav>
      <main>{children}</main>
      <FloatButton icon={<QuestionCircleOutlined />} />
    </div>
  )
}
