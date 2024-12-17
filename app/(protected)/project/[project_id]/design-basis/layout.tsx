"use client"
import { QuestionCircleOutlined } from "@ant-design/icons"
import { FloatButton } from "antd"
import { usePathname, useRouter } from "next/navigation"
import React from "react"
import { PROJECT_API } from "configs/api-endpoints"
import { useGetData } from "hooks/useCRUD"
import { useLoading } from "hooks/useLoading"
import clsx from "clsx"

export default function DesignBasisLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { project_id: string }
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { setLoading: setModalLoading } = useLoading()
  const { data: projectData }: any = useGetData(`${PROJECT_API}/${params?.project_id}`)

  const document_revision_path = `/project/${params.project_id}/design-basis/document-revision`
  const general_info_path = `/project/${params.project_id}/design-basis/general-info`
  const motor_parameters_path = `/project/${params.project_id}/design-basis/motor-parameters`
  const mcc_pcc_path = `/project/${params.project_id}/design-basis/mcc-pcc`
  const layout_path = `/project/${params.project_id}/design-basis/layout`

  const handleTabChange = (path: string) => {
    setModalLoading(true)
    router.push(path)
  }
  return (
    <div className="flex h-full flex-col gap-4 px-4">
      <div className="sticky top-0 z-10 w-full bg-white">
        <div className="flex font-semibold">
          <h2>{projectData?.project_oc_number}</h2>
          <h2> / {projectData?.project_name}</h2>
        </div>
        <nav className="flex gap-2">
          <div
            className={clsx(
              "white grid flex-auto cursor-pointer place-content-center rounded border p-1 text-xs font-bold uppercase tracking-wide text-white",
              pathname.includes(document_revision_path) ? "bg-green-500" : "bg-blue-500"
            )}
            onClick={() => handleTabChange(document_revision_path)}
          >
            Document Revision
          </div>
          <div
            className={clsx(
              "white grid flex-auto cursor-pointer place-content-center rounded border p-1 text-xs font-bold uppercase tracking-wide text-white",
              pathname.includes(general_info_path) ? "bg-green-500" : "bg-blue-500"
            )}
            onClick={() => handleTabChange(general_info_path)}
          >
            General Information
          </div>

          <div
            className={clsx(
              "white grid flex-auto cursor-pointer place-content-center rounded border p-1 text-xs font-bold uppercase tracking-wide text-white",
              pathname.includes(motor_parameters_path) ? "bg-green-500" : "bg-blue-500"
            )}
            onClick={() => handleTabChange(motor_parameters_path)}
          >
            Motor Parameters
          </div>
          <div
            className={clsx(
              "white grid flex-auto cursor-pointer place-content-center rounded border p-1 text-xs font-bold uppercase tracking-wide text-white",
              pathname.includes(mcc_pcc_path) ? "bg-green-500" : "bg-blue-500"
            )}
            onClick={() => handleTabChange(mcc_pcc_path)}
          >
            Panels
          </div>
          <div
            className={clsx(
              "white grid flex-auto cursor-pointer place-content-center rounded border p-1 text-xs font-bold uppercase tracking-wide text-white",
              pathname.includes(layout_path) ? "bg-green-500" : "bg-blue-500"
            )}
            onClick={() => handleTabChange(layout_path)}
          >
            Layout
          </div>
        </nav>
      </div>

      <main className="flex-1 overflow-y-auto">{children}</main>
      <FloatButton icon={<QuestionCircleOutlined />} />
    </div>
  )
}
