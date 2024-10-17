import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider } from "antd" // Import Select for dropdown
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
      <form onSubmit={handleSubmit(SubmitCommonConfig)} className="flex flex-col">
        <Divider>Power Cable</Divider>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="dol_starter"
                label="Number of Cores"
                options={[]}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="dol_starter"
                label="Specific requirement"
                options={[]}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="dol_starter"
                label="Type of insulation"
                options={[]}
                size="small"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <CustomSingleSelect control={control} name="dol_starter" label="Color Scheme" options={[]} size="small" />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="dol_starter"
                label="Motor voltage drop during running"
                options={[]}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect control={control} name="dol_starter" label="Conductor" options={[]} size="small" />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="dol_starter"
                label="Cable Installation (Provided on trays whenever possible)"
                options={[]}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="dol_starter"
                label="Motor voltage drop during starting"
                options={[]}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="dol_starter"
                label="Voltage grade"
                options={[]}
                size="small"
              />
            </div>
          </div>
          <div className="w-1/3 flex-1">
            <CustomTextInput control={control} name="dol_starter" label="Derating Factor" size="small" />
          </div>
        </div>
        <Divider>Gland Details</Divider>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect control={control} name="dol_starter" label="Gland Make" options={[]} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="dol_starter" label="MOC" options={[]} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="dol_starter" label="Type of Gland" options={[]} size="small" />
          </div>
        </div>
        <Divider>Cable Trays</Divider>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="dol_starter"
                label="Future Space on Trays"
                options={[]}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="dol_starter"
                label="Cable Placement"
                options={[]}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect control={control} name="dol_starter" label="Orientation" options={[]} size="small" />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="dol_starter"
                label="Vertical Distance"
                options={[]}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="dol_starter"
                label="Horizontal Distance"
                options={[]}
                size="small"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-bold text-slate-700">Material Construction</h4>
            <div className="flex gap-4">
              <div className="flex flex-1 items-center gap-2">
                <div className="flex items-center gap-4">
                  <h4 className="text-sm font-semibold text-slate-700">Dry Area</h4>
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
                  <h4 className="text-sm font-semibold text-slate-700">Wet Area</h4>
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
          </div>
        </div>
        <Divider orientation="left" orientationMargin={0}>
          <span className="text-sm font-bold text-blue-500">Power Cable Tray</span>
        </Divider>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">Perforated Type (upto below)</h4>
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
              <CustomSingleSelect control={control} name="dol_starter" label="Width" options={[]} size="small" />
            </div>
            <div className="flex-1">
              <CustomSingleSelect control={control} name="dol_starter" label="Height" options={[]} size="small" />
            </div>
            <div className="flex-1">
              <CustomSingleSelect control={control} name="dol_starter" label="Thickness" options={[]} size="small" />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">Ladder Type (upto an above)</h4>
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
              <CustomSingleSelect control={control} name="dol_starter" label="Width" options={[]} size="small" />
            </div>
            <div className="flex-1">
              <CustomSingleSelect control={control} name="dol_starter" label="Height" options={[]} size="small" />
            </div>
            <div className="flex-1">
              <CustomSingleSelect control={control} name="dol_starter" label="Thickness" options={[]} size="small" />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">Mesh Type (upto an above)</h4>
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
              <CustomSingleSelect control={control} name="dol_starter" label="Width" options={[]} size="small" />
            </div>
            <div className="flex-1">
              <CustomSingleSelect control={control} name="dol_starter" label="Height" options={[]} size="small" />
            </div>
            <div className="flex-1">
              <CustomSingleSelect control={control} name="dol_starter" label="Thickness" options={[]} size="small" />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">Conduit</h4>
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
              <CustomSingleSelect control={control} name="dol_starter" label="MOC" options={[]} size="small" />
            </div>
            <div className="flex-1">
              <CustomSingleSelect control={control} name="dol_starter" label="Size" options={[]} size="small" />
            </div>
          </div>
        </div>
        <Divider orientation="left" orientationMargin={0}>
          <span className="text-sm font-bold text-blue-500">Control Cable Tray</span>
        </Divider>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">Perforated Type (upto below)</h4>
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
              <CustomSingleSelect control={control} name="dol_starter" label="Width" options={[]} size="small" />
            </div>
            <div className="flex-1">
              <CustomSingleSelect control={control} name="dol_starter" label="Height" options={[]} size="small" />
            </div>
            <div className="flex-1">
              <CustomSingleSelect control={control} name="dol_starter" label="Thickness" options={[]} size="small" />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">Ladder Type (upto an above)</h4>
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
              <CustomSingleSelect control={control} name="dol_starter" label="Width" options={[]} size="small" />
            </div>
            <div className="flex-1">
              <CustomSingleSelect control={control} name="dol_starter" label="Height" options={[]} size="small" />
            </div>
            <div className="flex-1">
              <CustomSingleSelect control={control} name="dol_starter" label="Thickness" options={[]} size="small" />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">Mesh Type (upto an above)</h4>
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
              <CustomSingleSelect control={control} name="dol_starter" label="Width" options={[]} size="small" />
            </div>
            <div className="flex-1">
              <CustomSingleSelect control={control} name="dol_starter" label="Height" options={[]} size="small" />
            </div>
            <div className="flex-1">
              <CustomSingleSelect control={control} name="dol_starter" label="Thickness" options={[]} size="small" />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">Conduit</h4>
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
              <CustomSingleSelect control={control} name="dol_starter" label="MOC" options={[]} size="small" />
            </div>
            <div className="flex-1">
              <CustomSingleSelect control={control} name="dol_starter" label="Size" options={[]} size="small" />
            </div>
          </div>
        </div>
        <Divider orientation="left" orientationMargin={0}>
          <span className="text-sm font-bold text-blue-500">Single Cable Tray</span>
        </Divider>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">Perforated Type (upto below)</h4>
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
              <CustomSingleSelect control={control} name="dol_starter" label="Width" options={[]} size="small" />
            </div>
            <div className="flex-1">
              <CustomSingleSelect control={control} name="dol_starter" label="Height" options={[]} size="small" />
            </div>
            <div className="flex-1">
              <CustomSingleSelect control={control} name="dol_starter" label="Thickness" options={[]} size="small" />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">Ladder Type (upto an above)</h4>
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
              <CustomSingleSelect control={control} name="dol_starter" label="Width" options={[]} size="small" />
            </div>
            <div className="flex-1">
              <CustomSingleSelect control={control} name="dol_starter" label="Height" options={[]} size="small" />
            </div>
            <div className="flex-1">
              <CustomSingleSelect control={control} name="dol_starter" label="Thickness" options={[]} size="small" />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">Mesh Type (upto an above)</h4>
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
              <CustomSingleSelect control={control} name="dol_starter" label="Width" options={[]} size="small" />
            </div>
            <div className="flex-1">
              <CustomSingleSelect control={control} name="dol_starter" label="Height" options={[]} size="small" />
            </div>
            <div className="flex-1">
              <CustomSingleSelect control={control} name="dol_starter" label="Thickness" options={[]} size="small" />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">Conduit</h4>
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
              <CustomSingleSelect control={control} name="dol_starter" label="MOC" options={[]} size="small" />
            </div>
            <div className="flex-1">
              <CustomSingleSelect control={control} name="dol_starter" label="Size" options={[]} size="small" />
            </div>
          </div>
        </div>

        <div className="mt-2 flex w-full justify-end">
          <Button type="primary" onClick={handleSubmit(SubmitCommonConfig)}>
            Save and Continue
          </Button>
        </div>
      </form>
    </>
  )
}

export default CableTray
