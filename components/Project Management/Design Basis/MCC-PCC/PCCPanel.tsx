import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider } from "antd" // Import Select for dropdown
import React from "react"
import { useForm } from "react-hook-form"
import * as zod from "zod"
import CustomCheckboxInput from "components/FormInputs/CustomCheckbox"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomRadioSelect from "components/FormInputs/CustomRadioSelect"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"

const configItemValidationSchema = zod.object({
  id: zod.number(),
  dol_starter: zod.string(),
  star_delta_starter: zod.string(),
  mcc_switchgear_type: zod.string(),
  check_switch: zod.boolean(),
})

type MccComponentFormData = zod.infer<typeof configItemValidationSchema>

const PCCPanel = () => {
  const { control, handleSubmit } = useForm<MccComponentFormData>({
    resolver: zodResolver(configItemValidationSchema),
    defaultValues: {
      id: 0,
      dol_starter: "",
      star_delta_starter: "",
      mcc_switchgear_type: "",
    },
    mode: "onBlur",
  })

  const SubmitCommonConfig = (data: MccComponentFormData) => {
    console.log("MCC Data", data)
  }

  return (
    <>
      <Divider>
        <span className="font-bold text-slate-700">Selection Details</span>
      </Divider>
      <form onSubmit={handleSubmit(SubmitCommonConfig)} className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <h4 className="flex-1 text-sm font-semibold text-slate-700">Incomer</h4>
            <div className="text-xs font-semibold text-blue-500">Upto and including</div>
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="push_button_color" label="Ampere" options={[]} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="push_button_color" label="Pole" options={[]} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="push_button_color" label="Type" options={[]} size="small" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <h4 className="flex-1 text-sm font-semibold text-slate-700">Incomer Above</h4>
            <div className="text-xs font-semibold text-blue-500">Above and including</div>
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="push_button_color" label="Ampere" options={[]} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="push_button_color" label="Pole" options={[]} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="push_button_color" label="Type" options={[]} size="small" />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <div className="">
            <CustomCheckboxInput control={control} name="push_button_color" label="Under / Over Voltage" />
          </div>
          <div className="">
            <CustomCheckboxInput control={control} name="push_button_color" label="LSIG" />
          </div>
          <div className="">
            <CustomCheckboxInput control={control} name="push_button_color" label="LSI" />
          </div>
          <div className="">
            <CustomCheckboxInput
              control={control}
              name="push_button_color"
              label="Neural Link With Disconnect Facility"
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="supply_feeder_standard"
              label="Indication (LED Type Lamp)"
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomCheckboxInput control={control} name="push_button_color" label="CB Spring Charge (Blue)" />
          </div>
          <div className="flex-1">
            <CustomCheckboxInput control={control} name="push_button_color" label="CB in Service (Red)" />
          </div>
          <div className="flex-1">
            <CustomCheckboxInput control={control} name="push_button_color" label="Trip Circuit Healthy (White)" />
          </div>
        </div>
        <div className="w-1/3 flex-1">
          <CustomSingleSelect
            control={control}
            name="push_button_color"
            label="Alarm Annunciator"
            options={[]}
            size="small"
          />
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Metering Instruments for Incomer</span>
        </Divider>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect control={control} name="push_button_color" label="Analog" options={[]} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="push_button_color" label="Digital" options={[]} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Communication Protocol"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">General Arrangement</span>
        </Divider>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="MOC Material"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="MOC Thickness (Door & Component mounting plate thickness in mm)"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="MOC Thickness (Top & Side covers thickness in mm)"
              label="Type"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="PCC Compartmentalization"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="PCC Front"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="PCC Drawtype"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="mcc_construction_type"
              label="PCC Construction Type"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="supply_feeder_standard"
              label="Busbar Material Of Construction"
              options={[
                { label: "Aluminium", value: "Aluminium" },
                { label: "Copper", value: "Copper" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Current Density"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Panel Mounting"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Height of base frame (mm)"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <h4 className="mr-2 font-semibold text-slate-700">Sections</h4>
          <div className="">
            <CustomCheckboxInput control={control} name="push_button_color" label="Marshalling Section" />
          </div>
          <div className="">
            <CustomCheckboxInput control={control} name="push_button_color" label="Cable Alley Section" />
          </div>
          <div className="">
            <CustomCheckboxInput
              control={control}
              name="push_button_color"
              label="Separation Between Power & Control Bus"
            />
          </div>
          <div className="">
            <CustomCheckboxInput control={control} name="push_button_color" label="Extentional On Both Sides" />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Gland Plate (3mm) Drill Type"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Gland Plate (3mm) Opening Type"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Busbar Chamber Position"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Separation between power & control busbar"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Degree of Enclosure Protection"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Cable Entry Position"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Painting / Powder Coating</span>
        </Divider>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Painting Standards"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Paint Shade for Interior and Exterior"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Paint Shade for Component Mounting Plate"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Paint Shade For Base Frame"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Minimum Coating Thickness"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Standard for pretreatment Panel Shall Be Degreased And Derusted (7 Tank Pretreatment)"
              options={[]}
              size="small"
            />
          </div>
        </div>

        <Divider>
          <span className="font-bold text-slate-700">Punching Details</span>
        </Divider>
        <div className="flex items-center gap-4">
          <h4 className="font-bold text-slate-700">Punching Details For Boiler</h4>
          <div>
            <CustomRadioSelect
              control={control}
              name="supply_feeder_standard"
              label=""
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Motor" />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Fuel" />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Year" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Power Supply (VAC)" />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Power Supply (Phase)" />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Power Supply (Hz)" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Control Supply (VAC)" />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Control Supply (Phase)" />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Control Supply (Hz)" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Evaporation" addonAfter={"Kg/Hr"} />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="OutPut" addonAfter={"MW"} />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Connected Load" addonAfter={"KW"} />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="push_button_color"
              label="Design Pressure"
              addonAfter={"Kg/cm2(g)/Bar"}
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <h4 className="font-bold text-slate-700">Punching Details For Heater</h4>
          <div>
            <CustomRadioSelect
              control={control}
              name="supply_feeder_standard"
              label=""
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Motor" />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Fuel" />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Year" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Power Supply (VAC)" />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Power Supply (Phase)" />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Power Supply (Hz)" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Control Supply (VAC)" />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Control Supply (Phase)" />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Control Supply (Hz)" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Evaporation" addonAfter={"Kcal/Hr"} />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="OutPut" addonAfter={"MW"} />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Connected Load" addonAfter={"KW"} />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="push_button_color" label="Temperature" addonAfter={"Deg C"} />
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

export default PCCPanel
