"use client"
import { QuestionCircleOutlined } from "@ant-design/icons"
import { FloatButton } from "antd"
import { useParams, usePathname, useRouter } from "next/navigation"
import React from "react"
import { useLoading } from "hooks/useLoading"
import clsx from "clsx"

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const params = useParams()
  const { setLoading: setModalLoading } = useLoading()
  const pathname = usePathname()
  const project_information_path = `/project/${params.project_id}/project-information`
  const design_basis_path = `/project/${params.project_id}/design-basis`
  const electrical_load_list_path = `/project/${params.project_id}/electrical-load-list`
  const sld_path = `/project/${params.project_id}/sld`
  const cable_tray_path = `/project/${params.project_id}/cable-tray`
  const earthing_path = `/project/${params.project_id}/earthing`
  const lighting_path = `/project/${params.project_id}/lighting`

  const handleTabChange = (path: string) => {
    setModalLoading(true)
    router.push(path)
  }
  return (
    <>
      <div className="flex h-full flex-col gap-4">
        <div className="sticky top-0 z-10 w-full bg-white">
          <nav className="flex gap-2 p-2 shadow-md">
            <div
              className={clsx(
                "white grid flex-auto cursor-pointer place-content-center rounded border p-1 text-sm font-bold uppercase tracking-wide text-white",
                pathname.includes(project_information_path) ? "bg-green-700" : "bg-blue-700"
              )}
              onClick={() => handleTabChange(project_information_path)}
            >
              Project Information
            </div>
            <div
              className={clsx(
                "white grid flex-auto cursor-pointer place-content-center rounded border p-1 text-sm font-bold uppercase tracking-wide text-white",
                pathname.includes(design_basis_path) ? "bg-green-700" : "bg-blue-700"
              )}
              onClick={() => handleTabChange(design_basis_path)}
            >
              Design Basis
            </div>
            <div
              className={clsx(
                "white grid flex-auto cursor-pointer place-content-center rounded border p-1 text-sm font-bold uppercase tracking-wide text-white",
                pathname.includes(electrical_load_list_path) ? "bg-green-700" : "bg-blue-700"
              )}
              onClick={() => handleTabChange(electrical_load_list_path)}
            >
              Electrical Load List
            </div>
            <div
              className={clsx(
                "white grid flex-auto cursor-pointer place-content-center rounded border p-1 text-sm font-bold uppercase tracking-wide text-white",
                pathname.includes(sld_path) ? "bg-green-700" : "bg-blue-700"
              )}
              onClick={() => handleTabChange(sld_path)}
            >
              SLD
            </div>
            <div
              className={clsx(
                "white grid flex-auto cursor-pointer place-content-center rounded border p-1 text-sm font-bold uppercase tracking-wide text-white",
                pathname.includes(cable_tray_path) ? "bg-green-700" : "bg-blue-700"
              )}
              onClick={() => handleTabChange(cable_tray_path)}
            >
              Cable Tray
            </div>
            <div
              className={clsx(
                "white grid flex-auto cursor-pointer place-content-center rounded border p-1 text-sm font-bold uppercase tracking-wide text-white",
                pathname.includes(earthing_path) ? "bg-green-700" : "bg-blue-700"
              )}
              onClick={() => handleTabChange(earthing_path)}
            >
              Earthing
            </div>
            <div
              className={clsx(
                "white grid flex-auto cursor-pointer place-content-center rounded border p-1 text-sm font-bold uppercase tracking-wide text-white",
                pathname.includes(lighting_path) ? "bg-green-700" : "bg-blue-700"
              )}
              onClick={() => handleTabChange(lighting_path)}
            >
              Lighting
            </div>
          </nav>
        </div>

        <main className="flex-1 overflow-y-auto pb-4">{children}</main>
        <FloatButton icon={<QuestionCircleOutlined />} />
      </div>
    </>
  )
}
