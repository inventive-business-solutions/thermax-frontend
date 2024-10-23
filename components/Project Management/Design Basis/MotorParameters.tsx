"use client"
import { useEffect } from "react"
import { useLoading } from "hooks/useLoading"
import { useForm } from "react-hook-form"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import CustomTextInput from "components/FormInputs/CustomInputNumber"
import CustomTextAreaInput from "components/FormInputs/CustomTextArea"
import CustomTextNumber from "components/FormInputs/CustomInputNumber"

const MotorParameters = () => {
  const { setLoading: setModalLoading } = useLoading()
  useEffect(() => {
    setModalLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { control, handleSubmit, formState, reset } = useForm({
    // resolver: zodResolver(fieldSchema),
    // defaultValues: getDefaultValues(staticDocumentList, dynamicPanelDoc as any),
    mode: "onBlur",
  })

  const onSubmit = async (data: any) => {}

  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold underline">MOTOR PARAMETERS</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center bg-black text-white">
          <div className="flex-1 border border-white p-1 text-center">Motor Details</div>
          <div className="flex-1 border border-white p-1 text-center">Motor Safe Area Details</div>
          <div className="flex-1 border border-white p-1 text-center">Motor Hazardous Area Details</div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1 border p-1.5 text-sm font-semibold">Efficiency Level</div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              name="safe_area_efficiency_level"
              placeholder="Select safe area efficiency level"
              label=""
              options={[]}
              variant="borderless"
            />
          </div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              name="hazardous_area_efficiency_level"
              placeholder="Select hazardous area efficiency level"
              label=""
              options={[]}
              variant="borderless"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1 border p-1.5 text-sm font-semibold">Insulation Class</div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              name="safe_area_insulation_class"
              placeholder="Select safe area insulation class"
              label=""
              options={[]}
              variant="borderless"
            />
          </div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              name="hazardous_area_insulation_class"
              placeholder="Select hazardous area insulation class"
              label=""
              options={[]}
              variant="borderless"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1 border p-1.5 text-sm font-semibold">Temperature rise limited to</div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              name="safe_area_temperature_rise"
              placeholder="Select safe area temperature rise"
              label=""
              options={[]}
              variant="borderless"
            />
          </div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              name="hazardous_area_temperature_rise"
              placeholder="Select hazardous area temperature rise"
              label=""
              options={[]}
              variant="borderless"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1 border p-1.5 text-sm font-semibold">IP rating for Enclosure</div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              name="safe_area_enclosure_ip_rating"
              placeholder="Select safe area enclosure IP rating"
              label=""
              options={[]}
              variant="borderless"
            />
          </div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              name="hazardous_area_enclosure_ip_rating"
              placeholder="Select hazardous area enclosure IP rating"
              label=""
              options={[]}
              variant="borderless"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1 border p-1.5 text-sm font-semibold">Maximum (Deg.C)</div>
          <div className="flex-1 border text-center">
            <CustomTextInput
              control={control}
              name="safe_area_max_temperature"
              label=""
              variant="borderless"
              placeholder="Enter safe area maximum temperature"
            />
          </div>
          <div className="flex-1 border text-center">
            <CustomTextInput
              control={control}
              name="hazardous_area_max_temperature"
              label=""
              variant="borderless"
              placeholder="Enter hazardous area maximum temperature"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1 border p-1.5 text-sm font-semibold">Minimum (Deg.C)</div>
          <div className="flex-1 border text-center">
            <CustomTextInput
              control={control}
              name="safe_area_min_temperature"
              label=""
              variant="borderless"
              placeholder="Enter safe area minimum temperature"
            />
          </div>
          <div className="flex-1 border text-center">
            <CustomTextInput
              control={control}
              name="hazardous_area_min_temperature"
              label=""
              variant="borderless"
              placeholder="Enter hazardous area minimum temperature"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1 border p-1.5 text-sm font-semibold">Altitude less than (Meter)</div>
          <div className="flex-1 border text-center">
            <CustomTextInput
              control={control}
              name="safe_area_altitude"
              label=""
              variant="borderless"
              placeholder="Enter safe area altitude"
            />
          </div>
          <div className="flex-1 border text-center">
            <CustomTextInput
              control={control}
              name="hazardous_area_altitude"
              label=""
              variant="borderless"
              placeholder="Enter hazardous area altitude"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1 border p-1.5 text-sm font-semibold">IP rating for Terminal Box</div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              options={[]}
              name="safe_area_terminal_box_ip_rating"
              placeholder="Select safe area terminal box IP rating"
              label=""
              variant="borderless"
            />
          </div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              options={[]}
              name="hazardous_area_terminal_box_ip_rating"
              placeholder="Select hazardous area terminal box IP rating"
              label=""
              variant="borderless"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1 border p-1.5 text-sm font-semibold">
            Thermister <span className="text-xs text-[#3b82f6]">(For motor rating included and above in KW)</span>
          </div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              options={[]}
              name="safe_area_thermister"
              placeholder="Select safe area thermister"
              label=""
              variant="borderless"
            />
          </div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              options={[]}
              name="hazardous_area_themister"
              placeholder="Select hazardous area thermister"
              label=""
              variant="borderless"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1 border p-1.5 text-sm font-semibold">
            Space Heater <span className="text-xs text-[#3b82f6]">(For motor rating included and above in KW)</span>
          </div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              options={[]}
              name="safe_area_space_heater"
              placeholder="Select safe area space heater"
              label=""
              variant="borderless"
            />
          </div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              options={[]}
              name="hazardous_area_space_heater"
              placeholder="Select hazardous area space heater"
              label=""
              variant="borderless"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1 border p-1.5 text-sm font-semibold">Hazardous Area Certification for motor</div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              options={[]}
              name="safe_area_certification"
              placeholder="Select safe area certification"
              disabled
              label=""
              variant="borderless"
            />
          </div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              options={[]}
              name="hazardous_area_certification"
              placeholder="Select hazardous area certification"
              label=""
              variant="borderless"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1 border p-1.5 text-sm font-semibold">
            Bearing RTD <span className="text-xs text-[#3b82f6]">(For motor rating included and above in KW)</span>
          </div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              options={[]}
              name="safe_area_bearing_rtd"
              placeholder="Select safe area bearing RTD"
              label=""
              variant="borderless"
            />
          </div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              options={[]}
              name="hazardous_area_bearing_rtd"
              placeholder="Select hazardous area bearing RTD"
              label=""
              variant="borderless"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1 border p-1.5 text-sm font-semibold">
            Winding RTD <span className="text-xs text-[#3b82f6]">(For motor rating included and above in KW)</span>
          </div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              options={[]}
              name="safe_area_winding_rtd"
              placeholder="Select safe area winding RTD"
              label=""
              variant="borderless"
            />
          </div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              options={[]}
              name="hazardous_area_winding_rtd"
              placeholder="Select hazardous area winding RTD"
              label=""
              variant="borderless"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1 p-1.5 text-sm font-semibold">Type of Bearing</div>
          <div className="flex-1 border">
            <CustomTextAreaInput
              control={control}
              name="safe_area_bearing_type"
              placeholder="Bearing type description for safe area"
              label=""
            />
          </div>
          <div className="flex-1 border">
            <CustomTextAreaInput
              control={control}
              name="hazardous_area_bearing_type"
              placeholder="Bearing type description for hazardous area"
              label=""
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1 border p-1.5 text-sm font-semibold">Duty</div>
          <div className="flex-1 border">
            <CustomTextInput
              control={control}
              name="safe_area_duty"
              placeholder="Enter safe area duty"
              label=""
              variant="borderless"
            />
          </div>
          <div className="flex-1 border">
            <CustomTextInput
              control={control}
              name="hazardous_area_duty"
              placeholder="Enter hazardous area duty"
              label=""
              variant="borderless"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1 border p-1.5 text-sm font-semibold">Service Factor</div>
          <div className="flex-1 border">
            <CustomTextNumber
              control={control}
              name="safe_area_service_factor"
              placeholder="Enter safe area service factor"
              label=""
              variant="borderless"
            />
          </div>
          <div className="flex-1 border">
            <CustomTextNumber
              control={control}
              name="hazardous_area_service_factor"
              placeholder="Enter hazardous area service factor"
              label=""
              variant="borderless"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1 border p-1.5 text-sm font-semibold">Type of Cooling</div>
          <div className="flex-1 border">
            <CustomTextInput
              control={control}
              name="safe_area_cooling_type"
              placeholder="Enter safe area cooling type"
              label=""
              variant="borderless"
            />
          </div>
          <div className="flex-1 border">
            <CustomTextInput
              control={control}
              name="hazardous_area_cooling_type"
              placeholder="Enter hazardous area cooling type"
              label=""
              variant="borderless"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1 border p-1.5 text-sm font-semibold">Body Material</div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              options={[]}
              name="safe_area_body_material"
              placeholder="Select safe area body material"
              label=""
              variant="borderless"
            />
          </div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              options={[]}
              name="hazardous_area_body_material"
              placeholder="Select hazardous area body material"
              label=""
              variant="borderless"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1 border p-1.5 text-sm font-semibold">Material of Terminal Box</div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              options={[]}
              name="safe_area_terminal_box_material"
              placeholder="Select safe area terminal box material"
              label=""
              variant="borderless"
            />
          </div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              options={[]}
              name="hazardous_area_terminal_box_material"
              placeholder="Select hazardous area terminal box material"
              label=""
              variant="borderless"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1 border p-1.5 text-sm font-semibold">Paint Type & Shade</div>
          <div className="flex-1 border">
            <CustomTextInput
              control={control}
              name="safe_area_paint_type_and_shade"
              placeholder="Select safe area paint type and shade"
              label=""
              variant="borderless"
            />
          </div>
          <div className="flex-1 border">
            <CustomTextInput
              control={control}
              name="hazardous_area_paint_type_and_shade"
              placeholder="Select hazardous area paint type and shade"
              label=""
              variant="borderless"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1 border p-1.5 text-sm font-semibold">Starts / Hour permissibe</div>
          <div className="flex-1 border">
            <CustomTextInput
              control={control}
              name="safe_area_starts_hour_permissible"
              placeholder="Select safe area starts per hour permissible"
              label=""
              variant="borderless"
            />
          </div>
          <div className="flex-1 border">
            <CustomTextInput
              control={control}
              name="hazardous_area_starts_hour_permissible"
              placeholder="Select hazardous area starts per hour permissible"
              label=""
              variant="borderless"
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default MotorParameters
