import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider } from "antd" // Import Select for dropdown
import React from "react"
import { useForm } from "react-hook-form"
import * as zod from "zod"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"

const configItemValidationSchema = zod.object({
  id: zod.number(),
  dol_starter: zod.string(),
  star_delta_starter: zod.string(),
  mcc_switchgear_type: zod.string(),
  check_switch: zod.boolean(),
})

type EarthingFormData = zod.infer<typeof configItemValidationSchema>

const Earthing: React.FC = () => {
  const { control, handleSubmit } = useForm<EarthingFormData>({
    resolver: zodResolver(configItemValidationSchema),
    defaultValues: {
      id: 0,
      dol_starter: "",
      star_delta_starter: "",
      mcc_switchgear_type: "",
    },
    mode: "onBlur",
  })

  const SubmitCommonConfig = (data: EarthingFormData) => {
    console.log("Common Config Data:", data)
  }

  return (
    <>
      <Divider orientation="left" orientationMargin={0}>
        Material of Construction
      </Divider>
      <form onSubmit={handleSubmit(SubmitCommonConfig)} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="dol_starter"
              label="Earthing System"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="dol_starter" label="Earth Strip" options={[]} size="small" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect control={control} name="dol_starter" label="Earthing Pit" options={[]} size="small" />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="dol_starter"
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
