import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider } from "antd"
import React from "react"
import { useForm } from "react-hook-form"
import * as zod from "zod"
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

const MCCcumPCCPLCPanel = () => {
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
        <span className="font-bold text-slate-700">UPS</span>
      </Divider>
      <form onSubmit={handleSubmit(SubmitCommonConfig)} className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="UPS Scope"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="push_button_color" label="UPS Type" options={[]} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="UPS Battery Type"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex basis-1/3 items-center gap-4">
            <h4 className="text-sm font-semibold text-slate-700">UPS Battery Mounting Rack</h4>
            <div className="">
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
          <div className="basis-1/3">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="UPS Battery Backup Time In Min"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">PLC Hardware</span>
        </Divider>
        <div className="flex gap-4">
          <div className="flex flex-1 items-center gap-4">
            <h4 className="text-sm font-semibold text-slate-700">Bulk Power Supply for I/O</h4>
            <div className="">
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
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="dol_starter"
              label="PLC CPU /Processor Module/Series"
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="dol_starter"
              label="PLC Communication between CPU and I/O card"
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-1 flex-col gap-4">
            <div>
              <CustomRadioSelect
                control={control}
                name="supply_feeder_standard"
                label="Third party communication protocol"
                options={[
                  { label: "Yes", value: "Yes" },
                  { label: "No", value: "No" },
                ]}
              />
            </div>
            <div>
              <CustomSingleSelect control={control} name="push_button_color" label="" options={[]} size="small" />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <div>
              <CustomRadioSelect
                control={control}
                name="supply_feeder_standard"
                label="Client system communication"
                options={[
                  { label: "Yes", value: "Yes" },
                  { label: "No", value: "No" },
                ]}
              />
            </div>
            <div>
              <CustomSingleSelect control={control} name="push_button_color" label="" options={[]} size="small" />
            </div>
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Redundancy</span>
        </Divider>
        <div className="flex flex-1 gap-4">
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="supply_feeder_standard"
              label="Power Supply Redundancy"
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="supply_feeder_standard"
              label="I/O Redundancy"
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="supply_feeder_standard"
              label="PLC Communication Redundancy between CPU and I/O card"
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="supply_feeder_standard"
              label="PLC Communication Redundancy between CPU and HMI/SCADA"
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="supply_feeder_standard"
              label="PLC Communication Redundancy between CPU and Third party devices"
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
            />
          </div>
          <div className="flex items-center gap-4">
            <h4 className="text-sm font-semibold text-slate-700">CPU Redundancy</h4>
            <div className="">
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
          <div className="basis-1/3">
            <CustomSingleSelect control={control} name="dol_starter" label="CPU Redundancy" size="small" options={[]} />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">PLC Panel</span>
        </Divider>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect control={control} name="push_button_color" label="Memory" options={[]} size="small" />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="dol_starter" label="Panel Mounted AC" size="small" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="dol_starter"
              label=" Control Voltage : Ǿ : Wire : Frequency : ± 5 (UPS)"
              size="small"
              options={[]}
            />
          </div>
          <div className="flex flex-1 items-center gap-2">
            <div className="flex flex-1 items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">Marshalling Cabinet For PLC and UPS</h4>
              <div className="flex-1">
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
            <div className="flex-1">
              <CustomSingleSelect control={control} name="dol_starter" label="" size="small" options={[]} />
            </div>
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Indicating Lamp, Push Button & Isolation Switch</span>
        </Divider>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color"
              label="Push Button Colour Acknowledge"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="dol_starter"
              label="Push Button Colour Reset"
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
              label="Indicating Lamp Colour for Non-UPS Power Supply"
              options={[]}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="dol_starter"
              label="Indicating Lamp Colour for UPS Power Supply"
              options={[]}
              size="small"
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">IO Modules</span>
        </Divider>
        <Divider orientation="left" orientationMargin={0}>
          <span className="text-sm font-bold text-blue-500">DI Modules</span>
        </Divider>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="flex flex-1 items-center gap-2">
                <div className="flex items-center gap-4">
                  <h4 className="text-sm font-semibold text-slate-700">Density</h4>
                  <div className="flex-1">
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
                <div className="flex-1">
                  <CustomSingleSelect control={control} name="dol_starter" label="" size="small" options={[]} />
                </div>
              </div>
              <div className="flex flex-1 items-center gap-2">
                <div className="flex items-center gap-4">
                  <h4 className="text-sm font-semibold text-slate-700">Type of Input</h4>
                  <div className="flex-1">
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
                <div className="flex-1">
                  <CustomSingleSelect control={control} name="dol_starter" label="" size="small" options={[]} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-1 items-end gap-2">
                <div className="flex items-end gap-4">
                  <h4 className="text-sm font-semibold text-slate-700">Interrogation Voltage</h4>
                  <div className="flex-1">
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
                <div className="flex-1">
                  <CustomSingleSelect control={control} name="dol_starter" label="" size="small" options={[]} />
                </div>
              </div>
              <div className="flex-1">
                <CustomTextInput control={control} name="push_button_color" label="Motor" size="small" />
              </div>
            </div>
          </div>
          <Divider orientation="left" orientationMargin={0}>
            <span className="text-sm font-bold text-blue-500">DO Modules</span>
          </Divider>
          <div className="flex flex-col gap-4">
            <div className="flex flex-1 gap-4">
              <div className="flex flex-1 items-center gap-2">
                <div className="flex items-center gap-4">
                  <h4 className="text-sm font-semibold text-slate-700">Density</h4>
                  <div className="flex-1">
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
                <div className="flex-1">
                  <CustomSingleSelect control={control} name="dol_starter" label="" size="small" options={[]} />
                </div>
              </div>
              <div className="flex flex-1 items-center gap-2">
                <div className="flex items-center gap-4">
                  <h4 className="text-sm font-semibold text-slate-700">Type of Output</h4>
                  <div className="flex-1">
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
                <div className="flex-1">
                  <CustomSingleSelect control={control} name="dol_starter" label="" size="small" options={[]} />
                </div>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-4">
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="push_button_color"
                  label="Output Contact rating of Interposing relay"
                  size="small"
                />
              </div>
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="push_button_color"
                  label="Output status on processor/module failure"
                  size="small"
                />
              </div>
            </div>
            <div className="flex w-1/2 flex-1 items-end gap-4">
              <h4 className="text-sm font-semibold text-slate-700">No. of Contacts</h4>
              <div className="">
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
              <div className="flex-1">
                <CustomSingleSelect control={control} name="dol_starter" label="" size="small" options={[]} />
              </div>
            </div>
          </div>
          <Divider orientation="left" orientationMargin={0}>
            <span className="text-sm font-bold text-blue-500">AI Modules</span>
          </Divider>
          <div className="flex flex-col gap-4">
            <div className="flex flex-1 gap-4">
              <div className="flex flex-1 items-center gap-2">
                <div className="flex items-center gap-4">
                  <h4 className="text-sm font-semibold text-slate-700">Density</h4>
                  <div className="flex-1">
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
                <div className="flex-1">
                  <CustomSingleSelect control={control} name="dol_starter" label="" size="small" options={[]} />
                </div>
              </div>
              <div className="flex flex-1 items-center gap-2">
                <div className="flex items-center gap-4">
                  <h4 className="text-sm font-semibold text-slate-700">Type of Output</h4>
                  <div className="flex-1">
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
                <div className="flex-1">
                  <CustomSingleSelect control={control} name="dol_starter" label="" size="small" options={[]} />
                </div>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-4">
              <div className="flex-1">
                <CustomTextInput control={control} name="push_button_color" label="Scan Time" size="small" />
              </div>
              <div className="flex flex-1 items-center gap-4">
                <h4 className="text-sm font-semibold text-slate-700">Hart Protocol Support</h4>
                <div className="flex-1">
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
            </div>
          </div>
          <Divider orientation="left" orientationMargin={0}>
            <span className="text-sm font-bold text-blue-500">RTD / TC Modules</span>
          </Divider>
          <div className="flex flex-col gap-4">
            <div className="flex flex-1 gap-4">
              <div className="flex flex-1 items-center gap-2">
                <div className="flex items-center gap-4">
                  <h4 className="text-sm font-semibold text-slate-700">Density</h4>
                  <div className="flex-1">
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
                <div className="flex-1">
                  <CustomSingleSelect control={control} name="dol_starter" label="" size="small" options={[]} />
                </div>
              </div>
              <div className="flex flex-1 items-center gap-2">
                <div className="flex items-center gap-4">
                  <h4 className="text-sm font-semibold text-slate-700">Type of Input</h4>
                  <div className="flex-1">
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
                <div className="flex-1">
                  <CustomSingleSelect control={control} name="dol_starter" label="" size="small" options={[]} />
                </div>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-4">
              <div className="flex-1">
                <CustomTextInput control={control} name="push_button_color" label="Scan Time" size="small" />
              </div>
              <div className="flex flex-1 items-center gap-4">
                <h4 className="text-sm font-semibold text-slate-700">Hart Protocol Support</h4>
                <div className="flex-1">
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
            </div>
          </div>
          <Divider orientation="left" orientationMargin={0}>
            <span className="text-sm font-bold text-blue-500">AO Modules</span>
          </Divider>
          <div className="flex flex-col gap-4">
            <div className="flex flex-1 gap-4">
              <div className="flex flex-1 items-center gap-2">
                <div className="flex items-center gap-4">
                  <h4 className="text-sm font-semibold text-slate-700">Density</h4>
                  <div className="flex-1">
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
                <div className="flex-1">
                  <CustomSingleSelect control={control} name="dol_starter" label="" size="small" options={[]} />
                </div>
              </div>
              <div className="flex flex-1 items-center gap-2">
                <div className="flex items-center gap-4">
                  <h4 className="text-sm font-semibold text-slate-700">Type of Output</h4>
                  <div className="flex-1">
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
                <div className="flex-1">
                  <CustomSingleSelect control={control} name="dol_starter" label="" size="small" options={[]} />
                </div>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-4">
              <div className="flex-1">
                <CustomTextInput control={control} name="push_button_color" label="Scan Time" size="small" />
              </div>
              <div className="flex flex-1 items-center gap-4">
                <h4 className="text-sm font-semibold text-slate-700">Hart Protocol Support</h4>
                <div className="flex-1">
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
            </div>
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

export default MCCcumPCCPLCPanel
