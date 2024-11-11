import { zodResolver } from "@hookform/resolvers/zod"
import { Button, message, Modal } from "antd"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as zod from "zod"
import { createData, getData, updateData } from "actions/crud-actions"
import CustomTextInput from "components/FormInputs/CustomInput"
import Loader from "components/Loader"
import { DYNAMIC_DOCUMENT_API, PROJECT_PANEL_API, STATIC_DOCUMENT_API } from "configs/api-endpoints"
import { mergeLists } from "utils/helpers"

const fieldObject: any = {
  electrical_load_list: "Electrical Load List",
  control_schemes: "Control Schemes",
  lpbs_specifications_and_list: "LPBS Specifications and List",
  local_isolator_specifications_and_list: "Local Isolator Specifications and List",
  electrical_cable_schedule: "Electrical Cable Schedule",
  lt_cable_sizing: "LT Cable Sizing",
  cable_specification_and_bom: "Cable Specification and BOM",
  cable_tray_layout_e_and_i: "Cable Tray Layout E and I",
  cable_tray_support_details_and_bom: "Cable Tray Support Details and BOM",
  earthing_layout: "Earthing Layout",
  earthing_calculation_input_sheet_will_be_provided: "Earthing Calculation Input Sheet will be provided",
  earthing_material_bom: "Earthing Material BOM",
  motor_canopy_list_and_specifications: "Motor Canopy List and Specifications",
  motor_specification: "Motor Specification",
  motor_location_layout: "Motor Location Layout",
  illumination_layout_and_sld: "Illumination Layout and SLD",
  illumination_cable_schedule: "Illumination Cable Schedule",
}

const getFieldSchema = (panelIds: string[]) => {
  const staticFieldSchema = zod.object(
    Object.keys(fieldObject).reduce(
      (acc, key) => {
        acc[key] = zod.string() // Each key is assigned zod.string() type
        return acc
      },
      {} as Record<string, zod.ZodString>
    )
  )
  const dynamicPanelSchema = zod.object(
    panelIds?.reduce(
      (acc, panelId) => {
        acc[`dynamic-${panelId}-sld`] = zod.string().optional() as any
        acc[`dynamic-${panelId}-panel_specification`] = zod.string().optional() as any
        acc[`dynamic-${panelId}-tentative_panel_gad`] = zod.string().optional() as any
        return acc
      },
      {} as Record<string, zod.ZodAny>
    )
  )
  return staticFieldSchema.merge(dynamicPanelSchema)
}

const getDefaultValues = (staticValues: any, dynamicValues: any) => {
  const staticDefaultValues = Object.keys(fieldObject).reduce(
    (acc, key) => {
      acc[key] = staticValues?.[key] || "TBD"
      return acc
    },
    {} as Record<string, string>
  )

  const dynamicDefaultValues = dynamicValues?.reduce(
    (acc: any, panel: any) => {
      acc[`dynamic-${panel?.panel_id}-sld`] = panel?.sld || "TBD"
      acc[`dynamic-${panel?.panel_id}-panel_specification`] = panel?.panel_specification || "TBD"
      acc[`dynamic-${panel?.panel_id}-tentative_panel_gad`] = panel?.tentative_panel_gad || "TBD"
      return acc
    },
    {} as Record<string, any>
  )
  return { ...staticDefaultValues, ...dynamicDefaultValues }
}

export default function DocumentListModal({ open, setOpen, revision_id }: any) {
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [staticDocumentData, setStaticDocumentData] = useState<any>({})
  const [dynamicPanelDoc, setDynamicPanelDoc] = useState<any>([])
  const [panel_ids, setPanelIds] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const staticData = await getData(
        `${STATIC_DOCUMENT_API}?fields=["*"]&filters=[["project_id", "=", "${params.project_id}"]]`
      )

      if (staticData && staticData.length > 0) {
        setStaticDocumentData(staticData[0])
      }
      const projectPanelData = await getData(
        `${PROJECT_PANEL_API}?fields=["name", "panel_name"]&filters=[["revision_id", "=", "${revision_id}"]]`
      )
      const panel_ids = projectPanelData?.map((item: any) => item.name)
      setPanelIds(panel_ids)
      const quotedPanelIds = panel_ids?.map((id: string) => `"${id}"`).join(", ")

      const dynamicDocumentList = await getData(
        `${DYNAMIC_DOCUMENT_API}?fields=["*"]&filters=[["panel_id", "in", [${quotedPanelIds}]]]`
      )
      const mergedList = mergeLists([projectPanelData, dynamicDocumentList], [{ fromKey: "name", toKey: "panel_id" }])
      setDynamicPanelDoc(mergedList)
    }

    fetchData()
  }, [params.project_id, revision_id, open])

  const handleCancel = () => {
    setOpen(false)
  }

  const fieldSchema = getFieldSchema(panel_ids)

  const { control, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(fieldSchema),
    defaultValues: getDefaultValues(staticDocumentData, dynamicPanelDoc as any),
    mode: "onBlur",
  })

  useEffect(() => {
    reset(getDefaultValues(staticDocumentData, dynamicPanelDoc as any))
  }, [reset, staticDocumentData, dynamicPanelDoc])

  const handleStaticDocumentData = async (data: any) => {
    try {
      await updateData(`${STATIC_DOCUMENT_API}/${params.project_id}`, false, data)
    } catch (error: any) {
      const errorObj = JSON.parse(error?.message) as any
      if (errorObj.type === "DoesNotExistError") {
        try {
          await createData(STATIC_DOCUMENT_API, false, { ...data, project_id: params.project_id })
        } catch (error: any) {
          throw error
        }
      } else {
        throw error
      }
    }
  }

  const handleDynamicDocumentData = async (data: any) => {
    panel_ids.forEach(async (panelId: string) => {
      const dynamicDocData = {
        panel_id: panelId,
        sld: data[`dynamic-${panelId}-sld`],
        panel_specification: data[`dynamic-${panelId}-panel_specification`],
        tentative_panel_gad: data[`dynamic-${panelId}-tentative_panel_gad`],
      }
      try {
        await updateData(`${DYNAMIC_DOCUMENT_API}/${panelId}`, false, dynamicDocData)
      } catch (error: any) {
        const errorObj = JSON.parse(error?.message) as any
        if (errorObj.type === "DoesNotExistError") {
          try {
            await createData(DYNAMIC_DOCUMENT_API, false, dynamicDocData)
          } catch (error: any) {
            throw error
          }
        } else {
          throw error
        }
      }
    })
  }

  const onSubmit = async (data: any) => {
    const staticData = Object.keys(data).reduce(
      (acc: Record<string, any>, key) => {
        if (!key.includes("dynamic")) {
          acc[key] = data[key]
        }
        return acc
      },
      {} as Record<string, any>
    )
    const dynamicData = Object.keys(data).reduce(
      (acc: Record<string, any>, key) => {
        if (key.includes("dynamic")) {
          acc[key] = data[key]
        }
        return acc
      },
      {} as Record<string, any>
    )
    setLoading(true)
    try {
      await handleStaticDocumentData(staticData)
      await handleDynamicDocumentData(dynamicData)
      message.success("Document data saved successfully")
    } catch (error: any) {
      message.error("Failed to save document data")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      style={{ top: 20 }}
      width={800}
      open={open}
      title={<h1 className="text-center text-xl font-bold text-slate-700">Document List</h1>}
      onCancel={handleCancel}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between bg-black">
          <div className="flex flex-1 items-center justify-center border pl-2 text-center font-semibold text-white">
            Document Type
          </div>
          <div className="flex-1 border p-1 text-center font-semibold text-white">Document Name</div>
        </div>
        {Object.keys(fieldObject).map((item, index) => (
          <div key={index} className="flex justify-between">
            <div className="flex flex-1 items-center border pl-2">
              <label htmlFor="" className="text-sm font-semibold text-slate-800">
                {fieldObject[item]}
              </label>
            </div>
            <div className="flex-1 border">
              <CustomTextInput name={item} control={control} label="" type="text" variant="borderless" />
            </div>
          </div>
        ))}
        {dynamicPanelDoc ? (
          dynamicPanelDoc?.map((item: any, index: number) => (
            <div key={index} className="flex flex-col">
              <div className="flex">
                <div className="flex flex-1 items-center border pl-2">
                  <label>
                    <span className="font-semibold text-slate-800">{item.panel_name}</span> -{" "}
                    <span className="text-sm font-semibold text-slate-600">SLD</span>
                  </label>
                </div>
                <div className="flex-1 border">
                  <CustomTextInput
                    name={`dynamic-${item.panel_id}-sld`}
                    control={control}
                    label=""
                    type="text"
                    variant="borderless"
                  />
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-1 items-center border pl-2">
                  <label>
                    <span className="font-semibold text-slate-800">{item.panel_name}</span> -{" "}
                    <span className="text-sm font-semibold text-slate-600">Panel Specifications</span>
                  </label>
                </div>
                <div className="flex-1 border">
                  <CustomTextInput
                    name={`dynamic-${item.panel_id}-panel_specification`}
                    control={control}
                    label=""
                    type="text"
                    variant="borderless"
                  />
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-1 items-center border pl-2">
                  <label>
                    <span className="font-semibold text-slate-800">{item.panel_name}</span> -{" "}
                    <span className="text-sm font-semibold text-slate-600">Tentative Panel GAD</span>
                  </label>
                </div>
                <div className="flex-1 border">
                  <CustomTextInput
                    name={`dynamic-${item.panel_id}-tentative_panel_gad`}
                    control={control}
                    label=""
                    type="text"
                    variant="borderless"
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}
        <div className="mt-2 flex justify-end gap-2">
          <Button type="primary" htmlType="submit" loading={loading} disabled={!formState.isValid}>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  )
}
