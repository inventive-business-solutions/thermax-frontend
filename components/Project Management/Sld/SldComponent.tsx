"use client"
import { Button } from "antd"
import { useLoading } from "hooks/useLoading"
import React, { useEffect } from "react"
import SLDTabs from "./SldTabs"
interface Props {
  designBasisRevisionId: string
  loadListLatestRevisionId: any
  cableScheduleRevisionId: string
}
const SldComponent: React.FC<Props> = ({
  loadListLatestRevisionId,
  designBasisRevisionId,
  cableScheduleRevisionId,
}) => {
  const { setLoading } = useLoading()

  useEffect(() => {
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <div className="mb-4 flex justify-end gap-4">
        <Button type="primary" onClick={() => {}} className="hover:bg-blue-600">
          Get Load List Details
        </Button>
        <Button type="primary" onClick={() => {}} className="hover:bg-blue-600">
          Panel Mapping
        </Button>
      </div>

      <SLDTabs
        designBasisRevisionId={designBasisRevisionId}
        loadListLatestRevisionId={loadListLatestRevisionId}
        cableScheduleRevisionId={cableScheduleRevisionId}
      />
    </div>
  )
}

export default SldComponent
