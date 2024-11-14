"use server"

import { DESIGN_BASIS_REVISION_HISTORY_API } from "configs/api-endpoints"
import { getData } from "./crud-actions"
import { DB_REVISION_STATUS } from "configs/constants"

export const getLatestDesignBasisRevision = async (projectId: string) => {
  const dbRevisionData = await getData(
    `${DESIGN_BASIS_REVISION_HISTORY_API}?filters=[["project_id", "=", "${projectId}"], ["status", "in", ["${DB_REVISION_STATUS.Unsubmitted}", "${DB_REVISION_STATUS.Submitted}", "${DB_REVISION_STATUS.Resubmitted}"]]]&fields=["*"]&order_by=creation desc`
  )

  return dbRevisionData
}
