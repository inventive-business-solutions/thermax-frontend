import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "antd" // Import Select for dropdown
import React from "react"
import { useForm } from "react-hook-form"
import * as zod from "zod"
import CustomCheckboxInput from "components/FormInputs/CustomCheckbox"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import CustomTextAreaInput from "components/FormInputs/CustomTextArea"

const configItemValidationSchema = zod.object({
  id: zod.number(),
  dol_starter: zod.string(),
  star_delta_starter: zod.string(),
  mcc_switchgear_type: zod.string(),
  check_switch: zod.boolean(),
})

type CableTrayFormData = zod.infer<typeof configItemValidationSchema>

const CableTray: React.FC = () => {
  const { control, handleSubmit } = useForm<CableTrayFormData>({
    resolver: zodResolver(configItemValidationSchema),
    defaultValues: {
      id: 0,
      dol_starter: "",
      star_delta_starter: "",
      mcc_switchgear_type: "",
    },
    mode: "onBlur",
  })

  const SubmitCommonConfig = (data: CableTrayFormData) => {
    console.log("Common Config Data:", data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(SubmitCommonConfig)}>
        <div className="text-xl font-bold"> Supply Feeder</div>

        <div className="grid grid-cols-2 gap-3">
          <CustomTextInput name="dol_starter" control={control} label="DOL Starter" type="text" />
          <CustomSingleSelect
            name="mcc_switchgear_type"
            control={control}
            label="MCC Switchgear type"
            options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
            ]}
          />
          <CustomCheckboxInput name="check_switch" control={control} label="Check Switch" />
          <CustomTextAreaInput name="star_delta_starter" control={control} label="Star Delta Starter" />

          {/* Additional fields can be added here */}
        </div>
      </form>

      <div className="mt-2 flex w-full justify-end">
        <Button type="primary" onClick={handleSubmit(SubmitCommonConfig)}>
          Save and Continue
        </Button>
      </div>
    </>
  )
}

export default CableTray
