"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, message } from "antd"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as zod from "zod"
import { updateData } from "actions/crud-actions"
import CustomTextInput from "components/FormInputs/CustomInputNumber"
import CustomTextNumber from "components/FormInputs/CustomInputNumber"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import CustomTextAreaInput from "components/FormInputs/CustomTextArea"
import { MOTOR_PARAMETER_API } from "configs/api-endpoints"
import { useGetData } from "hooks/useCRUD"
import { useLoading } from "hooks/useLoading"
import useMotorParametersDropdowns from "./MotorParametersDropdown"

const fieldSchema = zod.object({
  safe_area_efficiency_level: zod.string({
    required_error: "Safe area efficiency level is required",
    message: "Safe area efficiency level is required",
  }),
  hazardous_area_efficiency_level: zod.string({
    required_error: "Hazardous area efficiency level is required",
    message: "Hazardous area efficiency level is required",
  }),
  safe_area_insulation_class: zod.string({
    required_error: "Safe area insulation class is required",
    message: "Safe area insulation class is required",
  }),
  hazardous_area_insulation_class: zod.string({
    required_error: "Hazardous area insulation class is required",
    message: "Hazardous area insulation class is required",
  }),
  safe_area_temperature_rise: zod.string({
    required_error: "Safe area temperature rise is required",
    message: "Safe area temperature rise is required",
  }),
  hazardous_area_temperature_rise: zod.string({
    required_error: "Hazardous area temperature rise is required",
    message: "Hazardous area temperature rise is required",
  }),
  safe_area_enclosure_ip_rating: zod.string({
    required_error: "Safe area enclosure IP rating is required",
    message: "Safe area enclosure IP rating is required",
  }),
  hazardous_area_enclosure_ip_rating: zod.string({
    required_error: "Hazardous area enclosure IP rating is required",
    message: "Hazardous area enclosure IP rating is required",
  }),
  safe_area_max_temperature: zod.string({
    required_error: "Safe area maximum temperature is required",
    message: "Safe area maximum temperature is required",
  }),
  hazardous_area_max_temperature: zod.string({
    required_error: "Hazardous area maximum temperature is required",
    message: "Hazardous area maximum temperature is required",
  }),
  safe_area_min_temperature: zod.string({
    required_error: "Safe area minimum temperature is required",
    message: "Safe area minimum temperature is required",
  }),
  hazardous_area_min_temperature: zod.string({
    required_error: "Hazardous area minimum temperature is required",
    message: "Hazardous area minimum temperature is required",
  }),
  safe_area_altitude: zod.string({
    required_error: "Safe area altitude is required",
    message: "Safe area altitude is required",
  }),
  hazardous_area_altitude: zod.string({
    required_error: "Hazardous area altitude is required",
    message: "Hazardous area altitude is required",
  }),
  safe_area_terminal_box_ip_rating: zod.string({
    required_error: "Safe area terminal box IP rating is required",
    message: "Safe area terminal box IP rating is required",
  }),
  hazardous_area_terminal_box_ip_rating: zod.string({
    required_error: "Hazardous area terminal box IP rating is required",
    message: "Hazardous area terminal box IP rating is required",
  }),
  safe_area_thermister: zod.string({
    required_error: "Safe area thermister is required",
    message: "Safe area thermister is required",
  }),
  hazardous_area_themister: zod.string({
    required_error: "Hazardous area thermister is required",
    message: "Hazardous area thermister is required",
  }),
  safe_area_space_heater: zod.string({
    required_error: "Safe area space heater is required",
    message: "Safe area space heater is required",
  }),
  hazardous_area_space_heater: zod.string({
    required_error: "Hazardous area space heater is required",
    message: "Hazardous area space heater is required",
  }),
  hazardous_area_certification: zod.string({
    required_error: "Hazardous area certification is required",
    message: "Hazardous area certification is required",
  }),
  safe_area_bearing_rtd: zod.string({
    required_error: "Safe area bearing RTD is required",
    message: "Safe area bearing RTD is required",
  }),
  hazardous_area_bearing_rtd: zod.string({
    required_error: "Hazardous area bearing RTD is required",
    message: "Hazardous area bearing RTD is required",
  }),
  safe_area_winding_rtd: zod.string({
    required_error: "Safe area winding RTD is required",
    message: "Safe area winding RTD is required",
  }),
  hazardous_area_winding_rtd: zod.string({
    required_error: "Hazardous area winding RTD is required",
    message: "Hazardous area winding RTD is required",
  }),
  safe_area_bearing_type: zod.string({
    required_error: "Safe area bearing type is required",
    message: "Safe area bearing type is required",
  }),
  hazardous_area_bearing_type: zod.string({
    required_error: "Hazardous area bearing type is required",
    message: "Hazardous area bearing type is required",
  }),
  safe_area_duty: zod.string({
    required_error: "Safe area duty is required",
    message: "Safe area duty is required",
  }),
  hazardous_area_duty: zod.string({
    required_error: "Hazardous area duty is required",
    message: "Hazardous area duty is required",
  }),
  safe_area_service_factor: zod.string({
    required_error: "Safe area service factor is required",
    message: "Safe area service factor is required",
  }),
  hazardous_area_service_factor: zod.string({
    required_error: "Hazardous area service factor is required",
    message: "Hazardous area service factor is required",
  }),
  safe_area_cooling_type: zod.string({
    required_error: "Safe area cooling type is required",
    message: "Safe area cooling type is required",
  }),
  hazardous_area_cooling_type: zod.string({
    required_error: "Hazardous area cooling type is required",
    message: "Hazardous area cooling type is required",
  }),
  safe_area_body_material: zod.string({
    required_error: "Safe area body material is required",
    message: "Safe area body material is required",
  }),
  hazardous_area_body_material: zod.string({
    required_error: "Hazardous area body material is required",
    message: "Hazardous area body material is required",
  }),
  safe_area_terminal_box_material: zod.string({
    required_error: "Safe area terminal box material is required",
    message: "Safe area terminal box material is required",
  }),
  hazardous_area_terminal_box_material: zod.string({
    required_error: "Hazardous area terminal box material is required",
    message: "Hazardous area terminal box material is required",
  }),
  safe_area_paint_type_and_shade: zod.string({
    required_error: "Safe area paint type and shade is required",
    message: "Safe area paint type and shade is required",
  }),
  hazardous_area_paint_type_and_shade: zod.string({
    required_error: "Hazardous area paint type and shade is required",
    message: "Hazardous area paint type and shade is required",
  }),
  safe_area_starts_hour_permissible: zod.string({
    required_error: "Safe area starts hour permissible is required",
    message: "Safe area starts hour permissible is required",
  }),
  hazardous_area_starts_hour_permissible: zod.string({
    required_error: "Hazardous area starts hour permissible is required",
    message: "Hazardous area starts hour permissible is required",
  }),
})

const getDefaultValues = (defaultData: any) => {
  return {
    safe_area_efficiency_level: defaultData?.safe_area_efficiency_level || "IE-2",
    hazardous_area_efficiency_level: defaultData?.hazardous_area_efficiency_level || "IE-2",
    safe_area_insulation_class: defaultData?.safe_area_insulation_class || "Class-F",
    hazardous_area_insulation_class: defaultData?.hazardous_area_insulation_class || "Class-F",
    safe_area_temperature_rise: defaultData?.safe_area_temperature_rise || "Class-B",
    hazardous_area_temperature_rise: defaultData?.hazardous_area_temperature_rise || "Class-B",
    safe_area_enclosure_ip_rating: defaultData?.safe_area_enclosure_ip_rating || "IP55",
    hazardous_area_enclosure_ip_rating: defaultData?.hazardous_area_enclosure_ip_rating || "IP55",
    safe_area_max_temperature: defaultData?.safe_area_max_temperature || "40",
    hazardous_area_max_temperature: defaultData?.hazardous_area_max_temperature || "40",
    safe_area_min_temperature: defaultData?.safe_area_min_temperature || "10",
    hazardous_area_min_temperature: defaultData?.hazardous_area_min_temperature || "10",
    safe_area_altitude: defaultData?.safe_area_altitude || "7.5",
    hazardous_area_altitude: defaultData?.hazardous_area_altitude || "7.5",
    safe_area_terminal_box_ip_rating: defaultData?.safe_area_terminal_box_ip_rating || "IP55",
    hazardous_area_terminal_box_ip_rating: defaultData?.hazardous_area_terminal_box_ip_rating || "IP55",
    safe_area_thermister: defaultData?.safe_area_thermister || "110",
    hazardous_area_themister: defaultData?.hazardous_area_themister || "110",
    safe_area_space_heater: defaultData?.safe_area_space_heater || "110",
    hazardous_area_space_heater: defaultData?.hazardous_area_space_heater || "110",
    hazardous_area_certification: defaultData?.hazardous_area_certification || "PESO",
    safe_area_bearing_rtd: defaultData?.safe_area_bearing_rtd || "110",
    hazardous_area_bearing_rtd: defaultData?.hazardous_area_bearing_rtd || "110",
    safe_area_winding_rtd: defaultData?.safe_area_winding_rtd || "110",
    hazardous_area_winding_rtd: defaultData?.hazardous_area_winding_rtd || "110",
    safe_area_bearing_type: defaultData?.safe_area_bearing_type || "",
    hazardous_area_bearing_type: defaultData?.hazardous_area_bearing_type || "",
    safe_area_duty: defaultData?.safe_area_duty || "S1",
    hazardous_area_duty: defaultData?.hazardous_area_duty || "S1",
    safe_area_service_factor: defaultData?.safe_area_service_factor || "1",
    hazardous_area_service_factor: defaultData?.hazardous_area_service_factor || "1",
    safe_area_cooling_type: defaultData?.safe_area_cooling_type || "TEFC",
    hazardous_area_cooling_type: defaultData?.hazardous_area_cooling_type || "TEFC",
    safe_area_body_material: defaultData?.safe_area_body_material || "Aluminium",
    hazardous_area_body_material: defaultData?.hazardous_area_body_material || "Aluminium",
    safe_area_terminal_box_material: defaultData?.safe_area_terminal_box_material || "Aluminium",
    hazardous_area_terminal_box_material: defaultData?.hazardous_area_terminal_box_material || "Aluminium",
    safe_area_paint_type_and_shade: defaultData?.safe_area_paint_type_and_shade || "User Defined",
    hazardous_area_paint_type_and_shade: defaultData?.hazardous_area_paint_type_and_shade || "User Defined",
    safe_area_starts_hour_permissible: defaultData?.safe_area_starts_hour_permissible || "2 Hot and 3 Cold",
    hazardous_area_starts_hour_permissible: defaultData?.hazardous_area_starts_hour_permissible || "2 Hot and 3 Cold",
  }
}

const MotorParameters = ({ revision_id }: { revision_id: string }) => {
  const [loading, setLoading] = useState(false)
  const [isHazardous, setIsHazardous] = useState(false)
  const { setLoading: setModalLoading } = useLoading()

  useEffect(() => {
    setModalLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const { data: motorParameters } = useGetData(
    `${MOTOR_PARAMETER_API}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"]]`
  )
  useEffect(() => {
    if (motorParameters?.[0]) {
      setIsHazardous(Boolean(motorParameters?.[0].is_hazardous_area_present))
    }
  }, [motorParameters])

  const {
    safeEfficiencyLevelOptions,
    hazardousEfficiencyLevelOptions,
    safeInsulationClassOptions,
    hazardousInsulationClassOptions,
    safeTempRiseOptions,
    hazardousTempRiseOptions,
    safeEnclosureIpRatingOptions,
    hazardousEnclosureIpRatingOptions,
    safeTerminalBoxIpRatingOptions,
    hazardousTerminalBoxIpRatingOptions,
    safeThermistorOptions,
    hazardousThermistorOptions,
    safeSpaceHeaterOptions,
    hazardousSpaceHeaterOptions,
    hazardousCertificationOptions,
    safeBearingRTDOptions,
    hazardousBearingRTDOptions,
    safeWindingRTDOptions,
    hazardousWindingRTDOptions,
    safeBodyMaterialOptions,
    hazardousBodyMaterialOptions,
    safeTerminalBoxOptions,
    hazardousTerminalBoxOptions,
  } = useMotorParametersDropdowns()

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(fieldSchema),
    defaultValues: getDefaultValues(motorParameters?.[0]),
    mode: "onSubmit",
  })

  useEffect(() => {
    reset(getDefaultValues(motorParameters?.[0]))
  }, [reset, motorParameters])

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      if (motorParameters?.[0]) {
        await updateData(`${MOTOR_PARAMETER_API}/${motorParameters?.[0].name}`, false, data)
        message.success("Motor parameters saved successfully")
      }
    } catch (error) {
      message.error("Failed to save motor parameters")
      console.error("Failed to save motor parameters", error)
    }
    setLoading(false)
  }

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
              options={safeEfficiencyLevelOptions}
              variant="borderless"
            />
          </div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              name="hazardous_area_efficiency_level"
              placeholder="Select hazardous area efficiency level"
              label=""
              options={hazardousEfficiencyLevelOptions}
              variant={isHazardous ? "borderless" : "filled"}
              disabled={!isHazardous}
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
              options={safeInsulationClassOptions}
              variant="borderless"
            />
          </div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              name="hazardous_area_insulation_class"
              placeholder="Select hazardous area insulation class"
              label=""
              options={hazardousInsulationClassOptions}
              variant={isHazardous ? "borderless" : "filled"}
              disabled={!isHazardous}
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
              options={safeTempRiseOptions}
              variant="borderless"
            />
          </div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              name="hazardous_area_temperature_rise"
              placeholder="Select hazardous area temperature rise"
              label=""
              options={hazardousTempRiseOptions}
              variant={isHazardous ? "borderless" : "filled"}
              disabled={!isHazardous}
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
              options={safeEnclosureIpRatingOptions}
              variant="borderless"
            />
          </div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              name="hazardous_area_enclosure_ip_rating"
              placeholder="Select hazardous area enclosure IP rating"
              label=""
              options={hazardousEnclosureIpRatingOptions}
              variant={isHazardous ? "borderless" : "filled"}
              disabled={!isHazardous}
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
              placeholder="Enter hazardous area maximum temperature"
              variant={isHazardous ? "borderless" : "filled"}
              disabled={!isHazardous}
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
              placeholder="Enter hazardous area minimum temperature"
              variant={isHazardous ? "borderless" : "filled"}
              disabled={!isHazardous}
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
              placeholder="Enter hazardous area altitude"
              variant={isHazardous ? "borderless" : "filled"}
              disabled={!isHazardous}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1 border p-1.5 text-sm font-semibold">IP rating for Terminal Box</div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              options={safeTerminalBoxIpRatingOptions}
              name="safe_area_terminal_box_ip_rating"
              placeholder="Select safe area terminal box IP rating"
              label=""
              variant="borderless"
            />
          </div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              options={hazardousTerminalBoxIpRatingOptions}
              name="hazardous_area_terminal_box_ip_rating"
              placeholder="Select hazardous area terminal box IP rating"
              label=""
              variant={isHazardous ? "borderless" : "filled"}
              disabled={!isHazardous}
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
              options={safeThermistorOptions}
              name="safe_area_thermister"
              placeholder="Select safe area thermister"
              label=""
              variant="borderless"
            />
          </div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              options={hazardousThermistorOptions}
              name="hazardous_area_themister"
              placeholder="Select hazardous area thermister"
              label=""
              variant={isHazardous ? "borderless" : "filled"}
              disabled={!isHazardous}
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
              options={safeSpaceHeaterOptions}
              name="safe_area_space_heater"
              placeholder="Select safe area space heater"
              label=""
              variant="borderless"
            />
          </div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              options={hazardousSpaceHeaterOptions}
              name="hazardous_area_space_heater"
              placeholder="Select hazardous area space heater"
              label=""
              variant={isHazardous ? "borderless" : "filled"}
              disabled={!isHazardous}
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
              variant="filled"
            />
          </div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              options={hazardousCertificationOptions}
              name="hazardous_area_certification"
              placeholder="Select hazardous area certification"
              label=""
              variant={isHazardous ? "borderless" : "filled"}
              disabled={!isHazardous}
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
              options={safeBearingRTDOptions}
              name="safe_area_bearing_rtd"
              placeholder="Select safe area bearing RTD"
              label=""
              variant="borderless"
            />
          </div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              options={hazardousBearingRTDOptions}
              name="hazardous_area_bearing_rtd"
              placeholder="Select hazardous area bearing RTD"
              label=""
              variant={isHazardous ? "borderless" : "filled"}
              disabled={!isHazardous}
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
              options={safeWindingRTDOptions}
              name="safe_area_winding_rtd"
              placeholder="Select safe area winding RTD"
              label=""
              variant="borderless"
            />
          </div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              options={hazardousWindingRTDOptions}
              name="hazardous_area_winding_rtd"
              placeholder="Select hazardous area winding RTD"
              label=""
              variant={isHazardous ? "borderless" : "filled"}
              disabled={!isHazardous}
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
              disabled={!isHazardous}
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
              variant={isHazardous ? "borderless" : "filled"}
              disabled={!isHazardous}
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
              variant={isHazardous ? "borderless" : "filled"}
              disabled={!isHazardous}
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
              variant={isHazardous ? "borderless" : "filled"}
              disabled={!isHazardous}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1 border p-1.5 text-sm font-semibold">Body Material</div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              options={safeBodyMaterialOptions}
              name="safe_area_body_material"
              placeholder="Select safe area body material"
              label=""
              variant="borderless"
            />
          </div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              options={hazardousBodyMaterialOptions}
              name="hazardous_area_body_material"
              placeholder="Select hazardous area body material"
              label=""
              variant={isHazardous ? "borderless" : "filled"}
              disabled={!isHazardous}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1 border p-1.5 text-sm font-semibold">Material of Terminal Box</div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              options={safeTerminalBoxOptions}
              name="safe_area_terminal_box_material"
              placeholder="Select safe area terminal box material"
              label=""
              variant="borderless"
              disabled={!isHazardous}
            />
          </div>
          <div className="flex-1 border">
            <CustomSingleSelect
              control={control}
              options={hazardousTerminalBoxOptions}
              name="hazardous_area_terminal_box_material"
              placeholder="Select hazardous area terminal box material"
              label=""
              variant={isHazardous ? "borderless" : "filled"}
              disabled={!isHazardous}
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
              variant={isHazardous ? "borderless" : "filled"}
              disabled={!isHazardous}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-1 border p-1.5 text-sm font-semibold">Starts / Hour Permissibe</div>
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
              variant={isHazardous ? "borderless" : "filled"}
              disabled={!isHazardous}
            />
          </div>
        </div>
        <div className="mt-4 text-end">
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}

export default MotorParameters
