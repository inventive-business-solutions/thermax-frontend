"use client"
import { Button } from "antd"
import { useLoading } from "hooks/useLoading"
import React, { useEffect } from "react"
import SLDTabs from "./SldTabs"
interface Props {
  designBasisRevisionId: string
  loadListLatestRevisionId: any
  sldRevisions: any
  cableScheduleRevisionId: string
}
const SldComponent: React.FC<Props> = ({
  loadListLatestRevisionId,
  designBasisRevisionId,
  sldRevisions,
  cableScheduleRevisionId,
}) => {
  const { setLoading } = useLoading()

  useEffect(() => {
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <SLDTabs
        sldRevisions={sldRevisions}
        designBasisRevisionId={designBasisRevisionId}
        loadListLatestRevisionId={loadListLatestRevisionId}
        cableScheduleRevisionId={cableScheduleRevisionId}
      />
    </div>
  )
}

export default SldComponent
