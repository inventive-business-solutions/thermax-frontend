import React, { useState } from "react"
import type { TableProps } from "antd"
import { Button, Form, Input, InputNumber, message, Modal, Popconfirm, Table, Typography } from "antd"
import { STATIC_DOCUMENT_API } from "configs/api-endpoints"
import { useGetData } from "hooks/useCRUD"
import * as zod from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import CustomTextInput from "components/FormInputs/CustomInput"
import { updateData } from "actions/crud-actions"
import { mutate } from "swr"

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

// Create Zod schema for the object
const fieldSchema = zod.object(
  Object.keys(fieldObject).reduce(
    (acc, key) => {
      acc[key] = zod.string() // Each key is assigned zod.string() type
      return acc
    },
    {} as Record<string, zod.ZodString>
  )
)

const getDefaultValues = (values: Record<string, string> = {}) => {
  return Object.keys(fieldObject).reduce(
    (acc, key) => {
      acc[key] = values[key] !== undefined ? values[key] : "TBD"
      return acc
    },
    {} as Record<string, string>
  )
}

const DocumentListModal = ({ open, setOpen, projectId }: any) => {
  const [loading, setLoading] = useState(false)
  const { data: documentList } = useGetData(
    `${STATIC_DOCUMENT_API}?fields=["*"]&filters=[["project_id", "=", "${projectId}"]]`,
    false
  )
  console.log("documentList", documentList)
  const handleCancel = () => {
    setOpen(false)
  }

  const { control, handleSubmit, reset, formState, getValues } = useForm({
    resolver: zodResolver(fieldSchema),
    defaultValues: getDefaultValues(documentList ? documentList[0] : {}),
    mode: "onBlur",
  })

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      await updateData(`${STATIC_DOCUMENT_API}/${projectId}`, false, data)
      message.success("Document list updated successfully")
    } catch (error: any) {
      throw error
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
              <label htmlFor="" className="text-sm font-semibold text-slate-700">
                {fieldObject[item]}
              </label>
            </div>
            <div className="flex-1 border">
              <CustomTextInput name={item} control={control} label="" type="text" variant="borderless" />
            </div>
          </div>
        ))}
        <div className="mt-2 text-end">
          <Button type="primary" htmlType="submit" loading={loading} disabled={!formState.isValid}>
            Save
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default DocumentListModal
