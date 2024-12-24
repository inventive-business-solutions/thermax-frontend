import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider, message } from "antd"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as zod from "zod"
import { createData, getData, updateData } from "actions/crud-actions"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import { LAYOUT_EARTHING } from "configs/api-endpoints"
import { useGetData } from "hooks/useCRUD"
import useEarthingDropdowns from "./EarthingDropdown"
import { useParams, useRouter } from "next/navigation"

const cableTrayValidationSchema = zod.object({
  earthing_system: zod.string({
    required_error: "Earthing System is required",
    message: "Please select an Earthing System",
  }),
  earth_strip: zod.string({ required_error: "Earth Strip is required", message: "Please select an Earth Strip" }),
  earth_pit: zod.string({ required_error: "Earthing Pit is required", message: "Please select an Earthing Pit" }),
  soil_resistivity: zod.string({
    required_error: "Soil Resistivity is required",
    message: "Please enter Soil Resistivity",
  }),
})

const getDefaultValues = (earthingData: any) => {
  return {
    earthing_system: earthingData?.earthing_system || "TNC",
    earth_strip: earthingData?.earth_strip || "GI",
    earth_pit: earthingData?.earth_pit || "GI",
    soil_resistivity: earthingData?.soil_resistivity || "0",
  }
}

const Earthing = ({ revision_id }: { revision_id: string }) => {
  const router = useRouter()
  const params = useParams()
  const { data: layoutEarthingData } = useGetData(
    `${LAYOUT_EARTHING}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"]]`
  )
  const [loading, setLoading] = useState(false)

  const dropdown = useEarthingDropdowns()

  let earthing_system_options = dropdown["Earthing System"]
  let earth_strip_options = dropdown["Earth Strip"]
  let earthing_pit_options = dropdown["Earth Pit"]

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(cableTrayValidationSchema),
    defaultValues: getDefaultValues(layoutEarthingData?.[0]),
    mode: "onSubmit",
  })

  useEffect(() => {
    reset(getDefaultValues(layoutEarthingData?.[0]))
  }, [layoutEarthingData, reset])

  const handleError = (error: any) => {
    try {
      const errorObj = JSON.parse(error?.message) as any
      message?.error(errorObj?.message)
    } catch (parseError) {
      message?.error(error?.message || "An unknown error occured")
    }
  }

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const layoutEarthingData = await getData(
        `${LAYOUT_EARTHING}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"]]`
      )

      if (layoutEarthingData && layoutEarthingData.length > 0) {
        await updateData(`${LAYOUT_EARTHING}/${layoutEarthingData[0].name}`, false, data)
      } else {
        data["revision_id"] = revision_id
        await createData(LAYOUT_EARTHING, false, data)
      }

      message.success("Earthing Data Saved Successfully")
    } catch (error) {
      console.error("error: ", error)
      handleError(error)
    } finally {
      setLoading(false)
      router.push(`/project/${params.project_id}/design-basis/document-revision`)
    }
  }

  return (
    <>
      <Divider orientation="center" orientationMargin={0}>
        <span className="font-bold text-slate-700">Material Of Construction</span>
      </Divider>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="earthing_system"
              label="Earthing Connection as Per"
              options={earthing_system_options || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="earth_strip"
              label="Earth Strip MOC"
              options={earth_strip_options || []}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="earth_pit"
              label="Earth Pit MOC"
              options={earthing_pit_options || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="soil_resistivity"
              label="Soil Resistivity"
              addonAfter={"ohm"}
              size="small"
            />
          </div>
        </div>
        <div className="mt-2 flex w-full justify-end">
          <Button type="primary" htmlType="submit" loading={loading}>
            Save and Next
          </Button>
        </div>
      </form>
    </>
  )
}

export default Earthing
