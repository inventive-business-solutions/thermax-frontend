"use server"

import {
  PROJECT_INFO_API,
  STATIC_DOCUMENT_API,
  DESIGN_BASIS_REVISION_HISTORY_API,
  DESIGN_BASIS_GENERAL_INFO_API,
  PROJECT_MAIN_PKG_API,
  MOTOR_PARAMETER_API,
  MAKE_OF_COMPONENT_API,
  COMMON_CONFIGURATION,
  MCC_PANEL,
  PCC_PANEL,
  MCC_PCC_PLC_PANEL_1,
  MCC_PCC_PLC_PANEL_2,
  CABLE_TRAY_LAYOUT,
  LAYOUT_EARTHING,
  PROJECT_PANEL_API,
  DYNAMIC_DOCUMENT_API,
  PROJECT_API,
  APPROVER_EMAIL_NOTIFICATION_API,
  ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API,
  CABLE_SCHEDULE_REVISION_HISTORY_API,
  MOTOR_CANOPY_REVISION_HISTORY_API,
  LBPS_SPECIFICATIONS_REVISION_HISTORY_API,
  LOCAL_ISOLATOR_REVISION_HISTORY_API,
  MOTOR_SPECIFICATIONS_REVISION_HISTORY_API,
} from "configs/api-endpoints"
import { createData, deleteData, getData } from "./crud-actions"

export const createProject = async (projectData: any, userInfo: any) => {
  try {
    // Create Project
    const projectCreatedata = await createData(PROJECT_API, false, projectData)
    const project_id = projectCreatedata.name
    await createData(PROJECT_INFO_API, false, { project_id })
    await createData(STATIC_DOCUMENT_API, false, { project_id })

    // Create Design Basis Revision History
    const designBasisRevisionHistoryData = await createData(DESIGN_BASIS_REVISION_HISTORY_API, false, { project_id })
    const design_basis_revision_id = designBasisRevisionHistoryData.name
    await createData(DESIGN_BASIS_GENERAL_INFO_API, false, { revision_id: design_basis_revision_id })
    await createData(MOTOR_PARAMETER_API, false, { revision_id: design_basis_revision_id })
    await createData(MAKE_OF_COMPONENT_API, false, { revision_id: design_basis_revision_id })
    await createData(COMMON_CONFIGURATION, false, { revision_id: design_basis_revision_id })
    await createData(CABLE_TRAY_LAYOUT, false, { revision_id: design_basis_revision_id })
    await createData(LAYOUT_EARTHING, false, { revision_id: design_basis_revision_id })

    await createData(ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API, false, { project_id })
    await createData(CABLE_SCHEDULE_REVISION_HISTORY_API, false, { project_id })
    await createData(MOTOR_CANOPY_REVISION_HISTORY_API, false, { project_id })
    await createData(MOTOR_SPECIFICATIONS_REVISION_HISTORY_API, false, { project_id })
    await createData(LBPS_SPECIFICATIONS_REVISION_HISTORY_API, false, { project_id })
    await createData(LOCAL_ISOLATOR_REVISION_HISTORY_API, false, { project_id })

    await createData(APPROVER_EMAIL_NOTIFICATION_API, false, {
      approvar_email: projectData?.approver,
      creator_email: userInfo?.email,
      project_oc_number: projectData.project_oc_number,
      project_name: projectData.project_name,
      sent_by: `${userInfo?.first_name} ${userInfo?.last_name}`,
      subject: "Approver - EnIMAX",
    })
  } catch (error: any) {
    throw error
  }
}

export const deleteProject = async (project_id: string) => {
  try {
    // Delete Project Information
    await deleteData(`${PROJECT_INFO_API}/${project_id}`, false)

    // Delete Static Document List
    await deleteData(`${STATIC_DOCUMENT_API}/${project_id}`, false)
    // Delete Design Basis Revision History
    const designBasisRevisionHistory = await getData(
      `${DESIGN_BASIS_REVISION_HISTORY_API}?filters=[["project_id", "=", "${project_id}"]]&fields=["*"]`
    )
    for (const revision of designBasisRevisionHistory || []) {
      const revisionID = revision.name
      // Delete Design Basis General Information
      const designBasisGeneralInfo = await getData(
        `${DESIGN_BASIS_GENERAL_INFO_API}?filters=[["revision_id", "=", "${revisionID}"]]&fields=["*"]`
      )

      for (const dbGeneralInfo of designBasisGeneralInfo || []) {
        const dbGeneralInfoID = dbGeneralInfo.name
        await deleteData(`${DESIGN_BASIS_GENERAL_INFO_API}/${dbGeneralInfoID}`, false)
      }

      // Delete Project Main Package
      const projectMainPackage = await getData(
        `${PROJECT_MAIN_PKG_API}?filters=[["revision_id", "=", "${revisionID}"]]&fields=["*"]`
      )
      for (const projectMainPkg of projectMainPackage || []) {
        const projectMainPkgID = projectMainPkg.name
        await deleteData(`${PROJECT_MAIN_PKG_API}/${projectMainPkgID}`, false)
      }

      // Delete Motor Parameters
      const motorParameters = await getData(
        `${MOTOR_PARAMETER_API}?filters=[["revision_id", "=", "${revisionID}"]]&fields=["*"]`
      )
      for (const motorParameter of motorParameters || []) {
        const motorParameterID = motorParameter.name
        await deleteData(`${MOTOR_PARAMETER_API}/${motorParameterID}`, false)
      }

      // Delete Make of Components
      const makeOfComponents = await getData(
        `${MAKE_OF_COMPONENT_API}?filters=[["revision_id", "=", "${revisionID}"]]&fields=["*"]`
      )
      for (const makeOfComponent of makeOfComponents || []) {
        const makeOfComponentID = makeOfComponent.name
        await deleteData(`${MAKE_OF_COMPONENT_API}/${makeOfComponentID}`, false)
      }

      // Delete Common Configuration
      const commonConfigurations = await getData(
        `${COMMON_CONFIGURATION}?filters=[["revision_id", "=", "${revisionID}"]]&fields=["*"]`
      )
      for (const commonConfiguration of commonConfigurations || []) {
        const commonConfigurationID = commonConfiguration.name
        await deleteData(`${COMMON_CONFIGURATION}/${commonConfigurationID}`, false)
      }

      // Delete all MCC Panel Data
      const mccPanelData = await getData(`${MCC_PANEL}?filters=[["revision_id", "=", "${revisionID}"]]&fields=["*"]`)
      for (const mccPanel of mccPanelData || []) {
        const mccPanelID = mccPanel.name
        await deleteData(`${MCC_PANEL}/${mccPanelID}`, false)
      }

      // Delete all PCC Panel Data
      const pccPanelData = await getData(`${PCC_PANEL}?filters=[["revision_id", "=", "${revisionID}"]]&fields=["*"]`)
      for (const pccPanel of pccPanelData || []) {
        const pccPanelID = pccPanel.name
        await deleteData(`${PCC_PANEL}/${pccPanelID}`, false)
      }

      // Delete all MCC Cum PCC MCC Panel Data
      const mccCumPccMccPanelData = await getData(
        `${MCC_PANEL}?filters=[["revision_id", "=", "${revisionID}"]]&fields=["*"]`
      )
      for (const mccCumPccMccPanel of mccCumPccMccPanelData || []) {
        const mccCumPccMccPanelID = mccCumPccMccPanel.name
        await deleteData(`${MCC_PANEL}/${mccCumPccMccPanelID}`, false)
      }

      // Delete all MCC_PCC_PLC_PANEL_1 Data
      const mccPccPlcPanel1Data = await getData(
        `${MCC_PCC_PLC_PANEL_1}?filters=[["revision_id", "=", "${revisionID}"]]&fields=["*"]`
      )

      for (const mccPccPlcPanel1 of mccPccPlcPanel1Data || []) {
        const mccPccPlcPanel1ID = mccPccPlcPanel1.name
        await deleteData(`${MCC_PCC_PLC_PANEL_1}/${mccPccPlcPanel1ID}`, false)
      }

      // Delete all MCC_PCC_PLC_PANEL_2 Data
      const mccPccPlcPanel2Data = await getData(
        `${MCC_PCC_PLC_PANEL_2}?filters=[["revision_id", "=", "${revisionID}"]]&fields=["*"]`
      )

      for (const mccPccPlcPanel2 of mccPccPlcPanel2Data) {
        const mccPccPlcPanel2ID = mccPccPlcPanel2.name
        await deleteData(`${MCC_PCC_PLC_PANEL_2}/${mccPccPlcPanel2ID}`, false)
      }

      // Delete Cable Tray Layout Data
      const cableTrayLayoutData = await getData(
        `${CABLE_TRAY_LAYOUT}?filters=[["revision_id", "=", "${revisionID}"]]&fields=["*"]`
      )
      for (const cableTrayLayout of cableTrayLayoutData || []) {
        const cableTrayLayoutID = cableTrayLayout.name
        await deleteData(`${CABLE_TRAY_LAYOUT}/${cableTrayLayoutID}`, false)
      }

      // Delete Earthing Layout Data
      const earthingLayoutData = await getData(
        `${LAYOUT_EARTHING}?filters=[["revision_id", "=", "${revisionID}"]]&fields=["*"]`
      )
      for (const earthingLayout of earthingLayoutData || []) {
        const earthingLayoutID = earthingLayout.name
        await deleteData(`${LAYOUT_EARTHING}/${earthingLayoutID}`, false)
      }

      // Delete Project Panel Data
      const projectPanelData = await getData(
        `${PROJECT_PANEL_API}?filters=[["revision_id", "=", "${revisionID}"]]&fields=["*"]`
      )
      for (const projectPanel of projectPanelData || []) {
        const projectPanelID = projectPanel.name

        // Delete Dynamic Document List
        await deleteData(`${DYNAMIC_DOCUMENT_API}/${projectPanelID}`, false)

        // Delete project panel data
        await deleteData(`${PROJECT_PANEL_API}/${projectPanelID}`, false)
      }

      await deleteData(`${DESIGN_BASIS_REVISION_HISTORY_API}/${revisionID}`, false)
    }

    const electricalLoadListRevisionHistory = await getData(
      `${ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API}?filters=[["project_id", "=", "${project_id}"]]&fields=["*"]`
    )
    for (const revision of electricalLoadListRevisionHistory || []) {
      const revisionID = revision.name

      await deleteData(`${ELECTRICAL_LOAD_LIST_REVISION_HISTORY_API}/${revisionID}`, false)
    }

    const cableScheduleRevisionHistory = await getData(
      `${CABLE_SCHEDULE_REVISION_HISTORY_API}?filters=[["project_id", "=", "${project_id}"]]&fields=["*"]`
    )
    for (const revision of cableScheduleRevisionHistory || []) {
      const revisionID = revision.name

      await deleteData(`${CABLE_SCHEDULE_REVISION_HISTORY_API}/${revisionID}`, false)
    }

    const motorCanopyRevisionHistory = await getData(
      `${MOTOR_CANOPY_REVISION_HISTORY_API}?filters=[["project_id", "=", "${project_id}"]]&fields=["*"]`
    )
    for (const revision of motorCanopyRevisionHistory || []) {
      const revisionID = revision.name

      await deleteData(`${MOTOR_CANOPY_REVISION_HISTORY_API}/${revisionID}`, false)
    }

    const motorSpecificationsRevisionHistory = await getData(
      `${MOTOR_SPECIFICATIONS_REVISION_HISTORY_API}?filters=[["project_id", "=", "${project_id}"]]&fields=["*"]`
    )
    for (const revision of motorSpecificationsRevisionHistory || []) {
      const revisionID = revision.name

      await deleteData(`${MOTOR_SPECIFICATIONS_REVISION_HISTORY_API}/${revisionID}`, false)
    }

    const lbpsSpecificationsRevisionHistory = await getData(
      `${LBPS_SPECIFICATIONS_REVISION_HISTORY_API}?filters=[["project_id", "=", "${project_id}"]]&fields=["*"]`
    )
    for (const revision of lbpsSpecificationsRevisionHistory || []) {
      const revisionID = revision.name

      await deleteData(`${LBPS_SPECIFICATIONS_REVISION_HISTORY_API}/${revisionID}`, false)
    }

    const localIsolatorRevisionHistory = await getData(
      `${LOCAL_ISOLATOR_REVISION_HISTORY_API}?filters=[["project_id", "=", "${project_id}"]]&fields=["*"]`
    )
    for (const revision of localIsolatorRevisionHistory || []) {
      const revisionID = revision.name

      await deleteData(`${LOCAL_ISOLATOR_REVISION_HISTORY_API}/${revisionID}`, false)
    }

    await deleteData(`${PROJECT_API}/${project_id}`, false)
  } catch (error) {
    throw error
  }
}
