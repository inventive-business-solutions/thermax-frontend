import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider } from "antd" // Import Select for dropdown
import React from "react"
import { useForm } from "react-hook-form"
import * as zod from "zod"
import CustomCheckboxInput from "components/FormInputs/CustomCheckbox"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomRadioSelect from "components/FormInputs/CustomRadioSelect"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import CustomTextAreaInput from "components/FormInputs/CustomTextArea"

const configItemValidationSchema = zod.object({
  id: zod.number(),
  dol_starter: zod.string(),
  star_delta_starter: zod.string(),
  mcc_switchgear_type: zod.string(),
  check_switch: zod.boolean(),
  supply_feeder_standard: zod.string(),
})

interface CommonConfigurationProps {
  handleSwitchTab: (key: string) => void
}

type commonConfigurationFormData = zod.infer<typeof configItemValidationSchema>

const CommonConfiguration: React.FC<CommonConfigurationProps> = ({ handleSwitchTab }) => {
  const { control, handleSubmit } = useForm<commonConfigurationFormData>({
    resolver: zodResolver(configItemValidationSchema),
    defaultValues: {
      id: 0,
      dol_starter: "",
      star_delta_starter: "",
      mcc_switchgear_type: "",
      supply_feeder_standard: "ICE",
    },
    mode: "onBlur",
  })

  const SubmitCommonConfig = (data: commonConfigurationFormData) => {
    console.log("Common Config Data:", data)
    handleSwitchTab("3")
  }

  return (
    <>
      <form onSubmit={handleSubmit(SubmitCommonConfig)} className="flex flex-col gap-2">
        <div className="flex items-center gap-8">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="dol_starter"
              label="DOL Starter (KW including and below)"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="dol_starter"
              label="Star Delta Starter (KW including and above)"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="dol_starter"
              label="Ammeter (KW including and above)"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="dol_starter"
              label="Ammeter Configuration"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="dol_starter"
              label="MCC Switchgear Type"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="switchgear_combination"
              label="Switchgear Combination"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Supply Feeder</span>
        </Divider>
        <div className="w-1/3">
          <CustomSingleSelect control={control} name="pole" label="Pole" options={[]} size="small" />
        </div>
        <div className="flex items-center gap-4">
          <div className="basis-1/3">
            <CustomRadioSelect
              control={control}
              name="supply_feeder_standard"
              label="Supply Feeder"
              options={[
                { label: "IEC", value: "IED" },
                { label: "IS", value: "IS" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="design_manufacturer_standard"
              label="Design & Manufacturer's standard"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="testing_standard"
              label="Testing Standard"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Wiring</span>
        </Divider>
        <div className="flex items-center gap-4">
          <h4 className="flex-1 text-sm font-semibold text-slate-700">Power Wiring (L1, L2, L3, LN)</h4>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="power_wiring" label="Color" options={[]} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="power_wiring_color" label="Size" options={[]} size="small" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <h4 className="flex-1 text-sm font-semibold text-slate-700">Control Wiring (P, N)</h4>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="power_wiring" label="Color" options={[]} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="power_wiring_color" label="Size" options={[]} size="small" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <h4 className="flex-1 text-sm font-semibold text-slate-700">24 VDC Wiring (+ / -)</h4>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="power_wiring" label="Color" options={[]} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="power_wiring_color" label="Size" options={[]} size="small" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <h4 className="flex-1 text-sm font-semibold text-slate-700">Analog Signal Wiring (+ / -)</h4>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="power_wiring" label="Color" options={[]} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="power_wiring_color" label="Size" options={[]} size="small" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <h4 className="flex-1 text-sm font-semibold text-slate-700">CT Wiring (+ / -)</h4>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="power_wiring" label="Color" options={[]} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="power_wiring_color" label="Size" options={[]} size="small" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="power_wiring"
              label="Cable Insulation (PVC)"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="power_wiring_color" label="Ferrule" options={[]} size="small" />
          </div>
          <div className="flex-1">
            <CustomTextAreaInput control={control} name="power_wiring_color" label="Common Requirement" />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Terminal</span>
        </Divider>
        <div className="w-1/2">
          <CustomSingleSelect control={control} name="terminal" label="Spare Terminal" options={[]} size="small" />
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Push Button Color</span>
        </Divider>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect control={control} name="push_button_color" label="Start" options={[]} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="push_button_color" label="Stop" options={[]} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="push_button_color" label="ESS" options={[]} size="small" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="supply_feeder_standard"
              label="Speed"
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Speed Increase PB"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Speed Decrease PB"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Alarm Knowledge & Lamp Test"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Test Reset"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Selector Switch</span>
        </Divider>
        <div className="flex items-center gap-4">
          <h4 className="flex-1 text-sm font-semibold text-slate-700">
            Local/Remot Selector Switch On MCC Panel Front Door
          </h4>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="power_wiring" label="Applicable" options={[]} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="power_wiring_color"
              label="Lock Type"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Indicating Lamp</span>
        </Divider>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Running / Open"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Stopped / Closed"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="push_button_color" label="Trip" options={[]} size="small" />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Field Motor Isolator (General Specification)</span>
        </Divider>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect control={control} name="push_button_color" label="Type" options={[]} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Enclosure"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="push_button_color" label="Material" options={[]} size="small" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect control={control} name="push_button_color" label="Qty" options={[]} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Isolator Color Shade"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Cable Entry"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <div className="w-1/3">
          <CustomSingleSelect
            control={control}
            name="push_button_color"
            label="Canopy on Top"
            options={[]}
            size="small"
          />
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Local Push Button Station (General Specification)</span>
        </Divider>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect control={control} name="push_button_color" label="Type" options={[]} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Enclosure"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="push_button_color" label="Material" options={[]} size="small" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect control={control} name="push_button_color" label="Qty" options={[]} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="LPBS Color Shade"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Canopy On top"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Start Push Button Colour"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Start / ON Indication Lamp Colour"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Stop / OFF Indication Lamp Colour"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <div className="flex w-2/3 gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Speed Increase Push Button"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Speed Decrease Push Button"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">APFC</span>
        </Divider>
        <div className="w-1/3">
          <CustomSingleSelect
            control={control}
            name="push_button_color"
            label="Speed Decrease Push Button"
            options={[]}
            size="small"
          />
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Power Bus</span>
        </Divider>
        <div className="flex w-2/3 items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Main Busbar Selection"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Heat Shrinkable Color PVC sleeve (L1, L2, L3, N)"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="supply_feeder_standard"
              label="Material"
              options={[
                { label: "Aluminium", value: "aluminium" },
                { label: "Copper", value: "copper" },
                { label: "Tinned Copper", value: "Tinned Copper" },
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
              label="Rating of Busbar"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Control Bus</span>
        </Divider>
        <div className="flex w-2/3 items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Main Busbar Selection"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Heat Shrinkable Color PVC sleeve (L1, L2, L3, N)"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="supply_feeder_standard"
              label="Material"
              options={[
                { label: "Aluminium", value: "aluminium" },
                { label: "Copper", value: "copper" },
                { label: "Tinned Copper", value: "Tinned Copper" },
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
              label="Rating of Busbar"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Earth Bus</span>
        </Divider>
        <div className="flex w-2/3 items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Main Busbar Selection"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Earth Busbar Position"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="supply_feeder_standard"
              label="Material"
              options={[
                { label: "Aluminium", value: "aluminium" },
                { label: "Copper", value: "copper" },
                { label: "Tinned Copper", value: "Tinned Copper" },
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
              label="Rating of Busbar"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Metering for Feeder</span>
        </Divider>
        <div className="w-1/3 flex-1">
          <CustomSingleSelect
            control={control}
            name="push_button_color"
            label="Metering for Feeder"
            options={[]}
            size="small"
          />
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Others</span>
        </Divider>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="supply_feeder_standard"
              label="Cooling Fans"
              options={[
                { label: "Applicable", value: "Applicable" },
                { label: "Not Applicable", value: "Not Applicable" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="supply_feeder_standard"
              label="Louvers and Filters"
              options={[
                { label: "Applicable", value: "Applicable" },
                { label: "Not Applicable", value: "Not Applicable" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="supply_feeder_standard"
              label="Alarm Annunciator"
              options={[
                { label: "Applicable", value: "Applicable" },
                { label: "Not Applicable", value: "Not Applicable" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="supply_feeder_standard"
              label="Control Transformer"
              options={[
                { label: "Applicable", value: "Applicable" },
                { label: "Not Applicable", value: "Not Applicable" },
              ]}
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Spares</span>
        </Divider>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextAreaInput control={control} name="power_wiring_color" label="Commissioning Spare" />
          </div>
          <div className="flex-1">
            <CustomTextAreaInput control={control} name="power_wiring_color" label="Two Year Operational spare" />
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

export default CommonConfiguration
