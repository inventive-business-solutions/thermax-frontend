import {
  ArrowDownOutlined,
  DeleteColumnOutlined,
  DeleteOutlined,
  DownOutlined,
  DownSquareFilled,
  PlusOutlined,
} from "@ant-design/icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Select, Tooltip } from "antd" // Import Select for dropdown
import CustomCheckboxInput from "components/FormInputs/CustomCheckbox"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import CustomTextAreaInput from "components/FormInputs/CustomTextArea"
import { Preahvihear } from "next/font/google"
import React from "react"
import { useForm, Controller } from "react-hook-form"
import * as zod from "zod"

const configItemValidationSchema = zod.object({
  id: zod.number(),
  dol_starter: zod.string(),
  star_delta_starter: zod.string(),
  mcc_switchgear_type: zod.string(),
  check_switch: zod.boolean(),
})

interface CommonConfigurationProps {
    handleSwitchTab : (key: string) => void
}

type commonConfigurationFormData = zod.infer<typeof configItemValidationSchema>

const CommonConfiguration: React.FC<CommonConfigurationProps> = ({handleSwitchTab}) => {
  const { control, handleSubmit } = useForm<commonConfigurationFormData>({
    resolver: zodResolver(configItemValidationSchema),
    defaultValues: {
      id: 0,
      dol_starter: "",
      star_delta_starter: "",
      mcc_switchgear_type: "",
    },
    mode: "onBlur",
  })

  const SubmitCommonConfig = (data: commonConfigurationFormData) => {
    console.log("Common Config Data:", data)
    handleSwitchTab("3");
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
        <Button type="primary" size="large" onClick={handleSubmit(SubmitCommonConfig)}>
          Save and Continue
        </Button>
      </div>
    </>
  )
}

export default CommonConfiguration
