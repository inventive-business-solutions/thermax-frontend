"use client";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import clsx from "clsx";
import { PROJECT_API } from "@/configs/api-endpoints";
import { useGetData } from "@/hooks/useCRUD";
import { useLoading } from "@/hooks/useLoading";

export default function DesignBasisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const { setLoading: setModalLoading } = useLoading();
  const { data: projectData }: any = useGetData(
    `${PROJECT_API}/${params?.project_id}`
  );

  const document_revision_path = `/project/${params.project_id}/electrical-load-list/document-revision`;
  const load_list_path = `/project/${params.project_id}/electrical-load-list/load-list`;
  const cable_schedule_path = `/project/${params.project_id}/electrical-load-list/cable-schedule`;
  const motor_canopy_path = `/project/${params.project_id}/electrical-load-list/motor-canopy`;

  const handleTabChange = (path: string) => {
    setModalLoading(true);
    router.push(path);
  };
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
              pathname.includes(document_revision_path)
                ? "bg-green-500"
                : "bg-blue-500"
            )}
            onClick={() => handleTabChange(document_revision_path)}
          >
            Document Revision
          </div>
          <div
            className={clsx(
              "white grid flex-auto cursor-pointer place-content-center rounded border p-1 text-xs font-bold uppercase tracking-wide text-white",
              pathname.includes(load_list_path) ? "bg-green-500" : "bg-blue-500"
            )}
            onClick={() => handleTabChange(load_list_path)}
          >
            Electrical Load List
          </div>

          <div
            className={clsx(
              "white grid flex-auto cursor-pointer place-content-center rounded border p-1 text-xs font-bold uppercase tracking-wide text-white",
              pathname.includes(cable_schedule_path)
                ? "bg-green-500"
                : "bg-blue-500"
            )}
            onClick={() => handleTabChange(cable_schedule_path)}
          >
            Cable Schedule
          </div>
          <div
            className={clsx(
              "white grid flex-auto cursor-pointer place-content-center rounded border p-1 text-xs font-bold uppercase tracking-wide text-white",
              pathname.includes(motor_canopy_path)
                ? "bg-green-500"
                : "bg-blue-500"
            )}
            onClick={() => handleTabChange(motor_canopy_path)}
          >
            Motor Canopy
          </div>
        </nav>
      </div>

      <main className="flex-1 overflow-y-auto">{children}</main>
      <FloatButton icon={<QuestionCircleOutlined />} />
    </div>
  );
}
