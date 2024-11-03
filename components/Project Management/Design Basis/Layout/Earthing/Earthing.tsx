import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider, message } from "antd" // Import Select for dropdown
import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as zod from "zod"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import { useParams } from "next/navigation"
import { PROJECT_API } from "configs/api-endpoints"
import { useGetData } from "hooks/useCRUD"
import useEarthingDropdowns from "./EarthingDropdown"
import { useLoading } from "hooks/useLoading"
import { mutate } from "swr"

const configItemValidationSchema = zod.object({
  id: zod.number(),
  earthing_pit: zod.string({ required_error: "This field is required", message: "This field is required" }),
  earthing_system: zod.string({ required_error: "This field is required", message: "This field is required" }),
  earthing_strip: zod.string({ required_error: "This field is required", message: "This field is required" }),
  soil_resistivity: zod.string({ required_error: "This field is required", message: "This field is required" }),
})

type EarthingFormData = zod.infer<typeof configItemValidationSchema>

const getDefaultValues = (isEdit: boolean, projectData: any) => {
  return {
    earthing_pit: projectData?.earthing_pit || "NA",
    earthing_system: projectData?.earthing_system || "NA",
    earthing_strip: projectData?.earthing_strip || "NA",
    soil_resistivity: projectData?.soil_resistivity || "NA",
  }
}

const Earthing: React.FC = () => {
  const params = useParams()

  const project_id = params.project_id
  const getProjectMetadataUrl = `${PROJECT_API}/${project_id}`
  const earthingUrl = `${PROJECT_API}/${project_id}`

  const { data: projectMetadata } = useGetData(getProjectMetadataUrl, false)
  const { data: earthing } = useGetData(earthingUrl, false)

  const [loading, setLoading] = useState(false)
  const projectData = React.useMemo(() => ({ ...projectMetadata, earthing }), [projectMetadata, earthing])

  const { earthing_pitOptions, earthing_systemOptions, earthing_stripOptions } = useEarthingDropdowns()

  const { setLoading: setModalLoading } = useLoading()

  useEffect(() => {
    setModalLoading(false)
  }, [])

  const { control, handleSubmit, reset, formState } = useForm({
    resolver: zodResolver(configItemValidationSchema),
    defaultValues: getDefaultValues(true, projectData),
    mode: "onSubmit",
  })

  useEffect(() => {
    reset(getDefaultValues(true, projectData))
  }, [reset, projectData])

  const handleError = (error: any) => {
    try {
      const errorObj = JSON.parse(error?.message) as any
      message.error(errorObj?.message)
    } catch (parseError) {
      message.error(error?.message || "An unknown error occured")
    }
  }

  const onSubmit: SubmitHandler<zod.infer<typeof earthing>> = async (data: any) => {
    setLoading(true)
    try {
      console.log("data: ", data)
    } catch (error) {
      handleError(error)
    } finally {
      setLoading(false)
      mutate(earthingUrl)
    }
  }

  return (
    <>
      <Divider orientation="left" orientationMargin={0}>
        Material of Construction
      </Divider>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="earthing_system"
              label="Earthing System"
              options={earthing_systemOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="earthing_strip"
              label="Earth Strip"
              options={earthing_stripOptions}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="earthing_pit"
              label="Earthing Pit"
              options={earthing_pitOptions}
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
          <Button type="primary" htmlType="submit">
            Save and Continue
          </Button>
        </div>
      </form>
    </>
  )
}

export default Earthing
