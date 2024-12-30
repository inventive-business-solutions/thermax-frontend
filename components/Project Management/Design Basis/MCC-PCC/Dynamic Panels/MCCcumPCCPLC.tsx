import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"
import { Button, Divider, message } from "antd"
import React, { useEffect, useMemo, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { createData, getData, updateData } from "actions/crud-actions"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomTextNumber from "components/FormInputs/CustomInputNumber"
import CustomRadioSelect from "components/FormInputs/CustomRadioSelect"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import CustomTextAreaInput from "components/FormInputs/CustomTextArea"
import { MCC_PCC_PLC_PANEL_1, MCC_PCC_PLC_PANEL_2 } from "configs/api-endpoints"
import { useGetData, useNewGetData } from "hooks/useCRUD"
import usePLCDropdowns from "./PLCDropdown"
import { plcPanelValidationSchema } from "../schemas"

const getDefaultValues = (plcData: any) => {
  const defaultValues = {
    ups_control_voltage: plcData?.ups_control_voltage || "230 VAC, 1-Phase, 2 Wire",
    non_ups_control_voltage: plcData?.non_ups_control_voltage || "230 VAC, 1-Phase, 2 Wire",
    is_bulk_power_supply_selected: plcData?.is_bulk_power_supply_selected?.toString() || "1",
    ups_scope: plcData?.ups_scope || "Client Scope",
    ups_input_voltage_3p: plcData?.ups_input_voltage_3p || "NA",
    ups_input_voltage_1p: plcData?.ups_input_voltage_1p || "NA",
    ups_output_voltage_1p: plcData?.ups_output_voltage_1p || "230 VAC, 1-Phase, 2 Wire",
    is_rtd_tc_moduule_selected: plcData?.is_rtd_tc_moduule_selected?.toString() || "1",
    ups_type: plcData?.ups_type || "NA",
    ups_battery_type: plcData?.ups_battery_type || "NA",
    is_ups_battery_mounting_rack_selected: plcData?.is_ups_battery_mounting_rack_selected?.toString() || "1",
    ups_battery_backup_time: plcData?.ups_battery_backup_time || "NA",
    ups_redundancy: plcData?.ups_redundancy || "NA",
    plc_cpu_system_series: plcData?.plc_cpu_system_series || "VTS",
    plc_cpu_system_input_voltage: plcData?.plc_cpu_system_input_voltage || "24 VDC",
    plc_cpu_system_battery_backup: plcData?.plc_cpu_system_battery_backup || "40%",
    plc_cpu_system_memory_free_space_after_program: plcData?.plc_cpu_system_memory_free_space_after_program || "20%",
    panel_power_supply_on_color: plcData?.panel_power_supply_on_color || "NA",
    panel_power_supply_off_color: plcData?.panel_power_supply_off_color || "Green",

    is_power_supply_plc_cpu_system_selected: plcData?.is_power_supply_plc_cpu_system_selected?.toString() || "1",
    is_plc_cpu_system_selected: plcData?.is_plc_cpu_system_selected?.toString() || "1",
    cpu_redundancy: plcData?.cpu_redundancy || "Hot",
    is_power_supply_input_output_module_selected:
      plcData?.is_power_supply_input_output_module_selected?.toString() || "1",
    is_plc_input_output_modules_system_selected:
      plcData?.is_plc_input_output_modules_system_selected?.toString() || "1",
    is_plc_cpu_system_and_input_output_modules_system_selected:
      plcData?.is_plc_cpu_system_and_input_output_modules_system_selected?.toString() || "0",
    is_plc_cpu_system_and_hmi_scada_selected: plcData?.is_plc_cpu_system_and_hmi_scada_selected?.toString() || "0",
    is_plc_cpu_system_and_third_party_devices_selected:
      plcData?.is_plc_cpu_system_and_third_party_devices_selected?.toString() || "0",
    plc_panel_memory: plcData?.plc_panel_memory || "20%",
    is_plc_and_ups_marshalling_cabinet_selected:
      plcData?.is_plc_and_ups_marshalling_cabinet_selected?.toString() || "1",
    marshalling_cabinet_for_plc_and_ups: plcData?.marshalling_cabinet_for_plc_and_ups || "As per OEM",
    is_electronic_hooter_selected: plcData?.is_electronic_hooter_selected?.toString() || "0",
    electronic_hooter_acknowledge: plcData?.electronic_hooter_acknowledge || "NA",
    panel_mounted_ac: plcData?.panel_mounted_ac || "NA",
    control_voltage: plcData?.control_voltage || "230 VAC, 1 Phase, 2W, 50Hz",
    push_button_colour_acknowledge: plcData?.push_button_colour_acknowledge || "Black",
    push_button_color_reset: plcData?.push_button_color_reset || "Yellow",
    indicating_lamp_color_for_nonups_power_supply: plcData?.indicating_lamp_color_for_nonups_power_supply || "Red",
    indicating_lamp_colour_for_ups_power_supply: plcData?.indicating_lamp_colour_for_ups_power_supply || "Red",
    is_di_module_density_selected: plcData?.is_di_module_density_selected?.toString() || "1",
    di_module_density: plcData?.di_module_density || "16",
    is_di_module_input_type_selected: plcData?.is_di_module_input_type_selected?.toString() || "1",
    di_module_input_type: plcData?.di_module_input_type || "Sense Voltage",
    is_interrogation_voltage_selected: plcData?.is_interrogation_voltage_selected?.toString() || "1",
    interrogation_voltage: plcData?.interrogation_voltage || "24 VDC",
    di_module_scan_time: plcData?.di_module_scan_time || "VTS",
    is_do_module_density_selected: plcData?.is_do_module_density_selected?.toString() || "1",
    do_module_density: plcData?.do_module_density || "16",
    is_do_module_output_type_selected: plcData?.is_do_module_output_type_selected?.toString() || "1",
    do_module_output_type: plcData?.do_module_output_type || "Wetted",
    output_contact_rating_of_interposing_relay: plcData?.output_contact_rating_of_interposing_relay || "230 VAC, 5Amp",
    is_no_of_contact_selected: plcData?.is_no_of_contact_selected?.toString() || "1",
    do_module_no_of_contact: plcData?.do_module_no_of_contact || "1NO + 1NC",
    output_status_on_processor_or_module_failure:
      plcData?.output_status_on_processor_or_module_failure || "Output shall change to fail-safe position",
    is_ai_module_density_selected: plcData?.is_ai_module_density_selected?.toString() || "1",
    ai_module_density: plcData?.ai_module_density || "16",
    is_ai_module_output_type_selected: plcData?.is_ai_module_output_type_selected?.toString() || "1",
    ai_module_output_type: plcData?.ai_module_output_type || "4-20 mA DC",
    ai_module_scan_time: plcData?.ai_module_scan_time || "VTS",
    is_ai_module_hart_protocol_support_selected:
      plcData?.is_ai_module_hart_protocol_support_selected?.toString() || "1",
    is_rtd_tc_module_density_selected: plcData?.is_rtd_tc_module_density_selected?.toString() || "1",
    rtd_tc_module_density: plcData?.rtd_tc_module_density || "16",
    is_rtd_tc_module_input_type_selected: plcData?.is_rtd_tc_module_input_type_selected?.toString() || "1",
    rtd_tc_module_input_type: plcData?.rtd_tc_module_input_type || "RTD",
    rtd_tc_module_scan_time: plcData?.rtd_tc_module_scan_time || "VTS",
    is_rtd_tc_module_hart_protocol_support_selected:
      plcData?.is_rtd_tc_module_hart_protocol_support_selected?.toString() || "1",
    is_ao_module_density_selected: plcData?.is_ao_module_density_selected?.toString() || "1",
    ao_module_density: plcData?.ao_module_density || "16",
    is_ao_module_output_type_selected: plcData?.is_ao_module_output_type_selected?.toString() || "1",
    ao_module_output_type: plcData?.ao_module_output_type || "4-20 mA DC",
    ao_module_scan_time: plcData?.ao_module_scan_time || "VTS",
    is_ao_module_hart_protocol_support_selected:
      plcData?.is_ao_module_hart_protocol_support_selected?.toString() || "1",
    is_plc_spare_io_count_selected: plcData?.is_plc_spare_io_count_selected || "1",
    plc_spare_io_count: plcData?.plc_spare_io_count || "10%",
    is_plc_spare_memory_selected: plcData?.is_plc_spare_memory_selected || "1",
    plc_spare_memory: plcData?.plc_spare_memory || "20%",
    is_no_of_hid_es_selected: plcData?.is_no_of_hid_es_selected?.toString() || "1",
    no_of_hid_es: plcData?.no_of_hid_es?.toString() || "1",
    is_no_of_hid_os_selected: plcData?.is_no_of_hid_os_selected?.toString() || "1",
    no_of_hid_os: plcData?.no_of_hid_os || 1,
    is_no_of_hid_hmi_selected: plcData?.is_no_of_hid_hmi_selected?.toString() || "1",
    no_of_hid_hmi: plcData?.no_of_hid_hmi || 1,
    is_hid_hmi_size_selected: plcData?.is_hid_hmi_size_selected?.toString() || "1",
    hid_hmi_size: plcData?.hid_hmi_size || "10",
    is_scada_development_license_selected: plcData?.is_scada_development_license_selected?.toString() || "1",
    no_of_scada_development_license: plcData?.no_of_scada_development_license?.toString() || "1",
    is_scada_runtime_license_selected: plcData?.is_scada_runtime_license_selected?.toString() || "1",
    no_of_scada_runtime_license: plcData?.no_of_scada_runtime_license || 1,
    is_hmi_development_license_selected: plcData?.is_hmi_development_license_selected?.toString() || "1",
    no_of_hmi_development_license: plcData?.no_of_hmi_development_license || 1,
    is_plc_programming_license_software_selected:
      plcData?.is_plc_programming_license_software_selected?.toString() || "1",
    no_of_plc_programming_license_software: plcData?.no_of_plc_programming_license_software || 1,
    system_hardware: plcData?.system_hardware || "Industrial grade PC",
    commercial_grade_pc:
      plcData?.commercial_grade_pc ||
      "Minimum Configuration = min. i5/latest Processor, min 8GB RAM, min 1TB Hard Disk, multimedia with DVD R/W drive, Keyboard mouse set 1 nos with 4USB Port",
    monitor_size: plcData?.monitor_size || "21",
    windows_operating_system: plcData?.windows_operating_system || "Windows Latest Version VTS",
    is_printer_with_cable_selected: plcData?.is_printer_with_cable_selected?.toString() || "1",
    printer_with_communication_cable: plcData?.printer_with_communication_cable || "A3 B/W",
    no_of_printer: plcData?.no_of_printer || 1,
    printer_cable: plcData?.printer_cable || "NA",
    is_furniture_for_scada_station_selected: plcData?.is_furniture_for_scada_station_selected?.toString() || "1",
    furniture_for_scada_station: plcData?.furniture_for_scada_station || "Console",
    hardware_between_plc_and_scada_pc: plcData?.hardware_between_plc_and_scada_pc || "Approx 50 meter per PC",
    hardware_between_plc_and_third_party: plcData?.hardware_between_plc_and_third_party || "Approx 50 meter",
    hardware_between_plc_and_client_system: plcData?.hardware_between_plc_and_client_system || "Approx 50 meter",
    iiot_requirement: plcData?.iiot_requirement || "NA",
    mandatory_spares: plcData?.mandatory_spares || "NA",
  }
  return defaultValues
}

const MCCcumPCCPLCPanel = ({ revision_id, panel_id }: { revision_id: string; panel_id: string }) => {
  const { data: plcPanelData1 } = useNewGetData(
    `${MCC_PCC_PLC_PANEL_1}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"], ["panel_id", "=", "${panel_id}"]]`
  )
  const { data: plcPanelData2 } = useNewGetData(
    `${MCC_PCC_PLC_PANEL_2}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"], ["panel_id", "=", "${panel_id}"]]`
  )

  const plcPanelData = useMemo(
    () => ({
      ...(plcPanelData1?.[0] || {}),
      ...(plcPanelData2?.[0] || {}),
    }),
    [plcPanelData1, plcPanelData2]
  )

  const [loading, setLoading] = useState(false)
  const dropdown = usePLCDropdowns()

  let plc_control_voltage_options = dropdown["PLC Control Voltage"]

  let plc_ups_scope_options = dropdown["PLC UPS Scope"]
  let plc_ups_3p_voltage_options = dropdown["PLC UPS 3 Phase Voltage"]
  let plc_ups_1p_voltage_options = dropdown["PLC UPS 1 Phase Voltage"]
  let plc_ups_type_options = dropdown["PLC UPS Type"]
  let plc_ups_battery_type_options = dropdown["PLC UPS Battery Type"]
  let plc_ups_battery_backup_time_options = dropdown["PLC UPS Battery Backup Time"]
  let plc_ups_redundancy_options = dropdown["UPS Redundancy"]
  let plc_cpu_system_options = dropdown["PLC CPU System"]
  let plc_panel_memory_options = dropdown["PLC Panel Memory"]
  let marshalling_cabinet_options = dropdown["Marshalling Cabinet for PLC and UPS"]
  let electronic_hooter_acknowledge_options = dropdown["Electronic Hooter Acknowledge"]
  let panel_power_supply_on_options = dropdown["Panel Power Supply On"]
  let panel_power_supply_off_options = dropdown["Panel Power Supply Off"]

  let non_ups_indicating_lamp_color_options = dropdown["Indicating Lamp Color for Non-UPS Power Supply"]
  let ups_indicating_lamp_color_options = dropdown["Indicating Lamp Color for UPS Power Supply"]
  let di_module_density_options = dropdown["DI Modules Density"]
  let di_module_input_type_options = dropdown["DI Modules Type Of Input"]
  let di_module_interrogation_voltage_options = dropdown["DI Modules Interrogation Voltage"]
  let do_module_density_options = dropdown["DO Modules Density"]
  let do_module_output_type_options = dropdown["DO Modules Type Of Output"]
  let do_contact_no_options = dropdown["DO No Of Contacts"]
  let ai_module_density_options = dropdown["AI Module Density"]
  let rtd_density_options = dropdown["RTD Density"]
  let rtd_input_type_options = dropdown["RTD Type Of Input"]
  let ao_module_density_options = dropdown["AO Modules Density"]
  let ao_module_output_type_options = dropdown["AO Modules Type of Output"]
  let plc_io_count_options = dropdown["PLC IO Count"]
  let plc_spare_memory_options = dropdown["PLC Spare Memory"]
  let plc_hmi_size_options = dropdown["PLC HMI Size"]
  let eo_system_hardware_options = dropdown["EO System Hardware"]
  let eo_monitor_size_options = dropdown["EO Monitor Size"]
  let eo_pc_cable_options = dropdown["EO Printer and Communication Cable"]
  let eo_scada_furniture_options = dropdown["EO Furniture"]

  const { control, handleSubmit, reset, watch, getValues, setValue } = useForm({
    resolver: zodResolver(plcPanelValidationSchema),
    defaultValues: getDefaultValues(plcPanelData?.[0]),
    mode: "onSubmit",
  })
  const upsScope = watch("ups_scope")
  const isRtdModuleSelected = watch("is_rtd_tc_moduule_selected")

  // const is_third_party_communication_protocol_selected_controlled = watch(
  //   "is_third_party_communication_protocol_selected"
  // )
  // const is_client_system_communication_selected_controlled = watch("is_client_system_communication_selected")
  // const is_cpu_redundancy_selected_controlled = watch("is_plc_cpu_system_selected")
  // const is_plc_and_ups_marshalling_cabinet_selected_controlled = watch("is_plc_and_ups_marshalling_cabinet_selected")
  // const is_no_of_contact_selected_controlled = watch("is_no_of_contact_selected")
  // const is_plc_spare_io_count_selected_controlled = watch("is_plc_spare_io_count_selected")
  // const is_plc_spare_memory_selected_controlled = watch("is_plc_spare_memory_selected")
  // const is_rtd_tc_moduule_selected_controlled = watch("is_rtd_tc_moduule_selected")

  // useEffect(() => {
  // if (is_third_party_communication_protocol_selected_controlled === "0") {
  //   setValue("third_party_communication_protocol", "NA")
  // }
  // if (is_client_system_communication_selected_controlled === "0") {
  //   setValue("client_system_communication", "NA")
  // }
  // if (is_cpu_redundancy_selected_controlled === "0") {
  //   setValue("cpu_redundancy", "NA")
  // }
  // if (is_plc_and_ups_marshalling_cabinet_selected_controlled === "0") {
  //   setValue("marshalling_cabinet_for_plc_and_ups", "NA")
  // }
  // if (is_no_of_contact_selected_controlled === "0") {
  //   setValue("do_module_no_of_contact", "NA")
  // }
  // if (is_plc_spare_io_count_selected_controlled === "0") {
  //   setValue("plc_spare_io_count", "NA")
  // }
  // if (is_plc_spare_memory_selected_controlled === "0") {
  //   setValue("plc_spare_memory", "NA")
  // }
  // if (is_rtd_tc_moduule_selected_controlled === "0") {
  //   setValue("rtd_tc_module_density", "NA")
  //   setValue("rtd_tc_module_input_type", "NA")
  //   setValue("rtd_tc_module_scan_time", "NA")
  //   setValue("is_rtd_tc_module_hart_protocol_support_selected", 0)
  // }
  // }, [
  //   is_third_party_communication_protocol_selected_controlled,
  //   is_client_system_communication_selected_controlled,
  //   is_cpu_redundancy_selected_controlled,
  //   is_plc_and_ups_marshalling_cabinet_selected_controlled,
  //   is_no_of_contact_selected_controlled,
  //   is_plc_spare_io_count_selected_controlled,
  //   is_plc_spare_memory_selected_controlled,
  //   is_rtd_tc_moduule_selected_controlled,
  //   setValue,
  // ])

  useEffect(() => {
    reset(getDefaultValues(plcPanelData?.[0]))
  }, [plcPanelData, reset])

  const handleError = (error: any) => {
    try {
      const errorObj = JSON.parse(error?.message) as any
      message?.error(errorObj?.message)
    } catch (parseError) {
      message?.error(error?.message || "An unknown error occured")
    }
  }

  const onSubmit: SubmitHandler<zod.infer<typeof plcPanelValidationSchema>> = async (data) => {
    setLoading(true)
    try {
      await updateData(`${MCC_PCC_PLC_PANEL_1}/${plcPanelData1[0].name}`, false, data)
      await updateData(`${MCC_PCC_PLC_PANEL_2}/${plcPanelData2[0].name}`, false, data)
      message.success("PLC Data updated successfully")
    } catch (error) {
      console.error(error)
      handleError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 px-4">
        <Divider>
          <span className="font-bold text-slate-700">Supply Requirements</span>
        </Divider>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="ups_control_voltage"
                label="Control voltage ( UPS )"
                options={plc_control_voltage_options || []}
                size="small"
              />
            </div>

            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="non_ups_control_voltage"
                label="Control voltage ( Non UPS )"
                options={plc_control_voltage_options || []}
                size="small"
              />
            </div>

            <div className="flex-1">
              <CustomRadioSelect
                control={control}
                name="is_bulk_power_supply_selected"
                label="Bulk Power Supply for I/O"
                options={[
                  { label: "Yes", value: "1" },
                  { label: "No", value: "0" },
                ]}
              />
            </div>
          </div>
        </div>

        <Divider>
          <span className="font-bold text-slate-700">UPS</span>
        </Divider>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="ups_scope"
                label="UPS Scope"
                options={plc_ups_scope_options || []}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="ups_input_voltage_3p"
                label="UPS Input Voltage 3-Phase"
                options={plc_ups_3p_voltage_options || []}
                size="small"
                disabled={upsScope === "Thermax Scope" || upsScope === "Client Scope"}
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="ups_input_voltage_1p"
                label="UPS Input Voltage 1-Phase"
                options={plc_ups_1p_voltage_options || []}
                size="small"
                disabled={upsScope === "Thermax Scope" || upsScope === "Client Scope"}
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="ups_output_voltage_1p"
                label="UPS Output Voltage 1-Phase"
                options={plc_ups_1p_voltage_options || []}
                size="small"
                disabled={upsScope === "Thermax Scope" || upsScope === "Client Scope"}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="ups_type"
                label="UPS Type"
                options={plc_ups_type_options || []}
                disabled={upsScope === "Thermax Scope" || upsScope === "Client Scope"}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="ups_battery_type"
                label="UPS Battery Type"
                options={plc_ups_battery_type_options || []}
                disabled={upsScope === "Thermax Scope" || upsScope === "Client Scope"}
                size="small"
              />
            </div>
            <div className="flex-1">
              <CustomRadioSelect
                control={control}
                name="is_ups_battery_mounting_rack_selected"
                label="UPS Battery Mounting Rack"
                options={[
                  { label: "Yes", value: "1" },
                  { label: "No", value: "0" },
                ]}
                disabled={upsScope === "Thermax Scope" || upsScope === "Client Scope"}
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="ups_battery_backup_time"
                label="UPS Battery Backup Time In Min"
                options={plc_ups_battery_backup_time_options || []}
                size="small"
                disabled={upsScope === "Thermax Scope" || upsScope === "Client Scope"}
              />
            </div>

            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="ups_redundancy"
                label="UPS Redundancy"
                options={plc_ups_redundancy_options || []}
                size="small"
                disabled={upsScope === "Thermax Scope" || upsScope === "Client Scope"}
              />
            </div>
          </div>
          <div className="flex items-center gap-4"></div>
        </div>

        <Divider>
          <span className="font-bold text-slate-700">PLC Hardware</span>
        </Divider>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="plc_cpu_system_series"
              label="PLC CPU System Series"
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="plc_cpu_system_input_voltage"
              label="PLC CPU System Input Voltage"
              size="small"
              options={plc_control_voltage_options || []}
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="plc_cpu_system_battery_backup"
              label="PLC CPU System Input Voltage"
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="plc_cpu_system_memory_free_space_after_program"
              label="PLC CPU System Memory Free Space after Program"
              size="small"
            />
          </div>
        </div>

        <Divider>
          <span className="font-bold text-slate-700">Redundancy</span>
        </Divider>
        <div className="flex flex-1 gap-4">
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="is_power_supply_plc_cpu_system_selected"
              label="Power Supply PLC CPU System"
              options={[
                { label: "Yes", value: "1" },
                { label: "No", value: "0" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="is_power_supply_input_output_module_selected"
              label="Power Supply Input - Output Module"
              options={[
                { label: "Yes", value: "1" },
                { label: "No", value: "0" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="is_plc_input_output_modules_system_selected"
              label="PLC Input - Output Modules System "
              options={[
                { label: "Yes", value: "1" },
                { label: "No", value: "0" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="is_plc_cpu_system_and_input_output_modules_system_selected"
              label="PLC CPU System and PLC Input - Output Modules System"
              options={[
                { label: "Yes", value: "1" },
                { label: "No", value: "0" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="is_plc_cpu_system_and_hmi_scada_selected"
              label="PLC CPU System and HMI / SCADA"
              options={[
                { label: "Yes", value: "1" },
                { label: "No", value: "0" },
              ]}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="is_plc_cpu_system_and_third_party_devices_selected"
              label="PLC CPU System and Third Party devices"
              options={[
                { label: "Yes", value: "1" },
                { label: "No", value: "0" },
              ]}
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <CustomRadioSelect
                control={control}
                name="is_plc_cpu_system_selected"
                label="PLC CPU System"
                options={[
                  { label: "Yes", value: "1" },
                  { label: "No", value: "0" },
                ]}
              />
            </div>
            <div className="basis-1/3">
              <CustomSingleSelect
                control={control}
                name="plc_cpu_system"
                label=""
                size="small"
                options={plc_cpu_system_options || []}
                disabled={watch("is_plc_cpu_system_selected") === "0"}
              />
            </div>
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">PLC Panel Mounted</span>
        </Divider>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput control={control} name="panel_mounted_ac" label="Panel Mounted AC" size="small" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-1 items-center gap-2">
            <div className="flex flex-1 items-center gap-4">
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="is_plc_and_ups_marshalling_cabinet_selected"
                  label="Marshalling Cabinet For PLC and UPS"
                  options={[
                    { label: "Yes", value: "1" },
                    { label: "No", value: "0" },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="marshalling_cabinet_for_plc_and_ups"
                label=""
                size="small"
                options={marshalling_cabinet_options || []}
                disabled={watch("is_plc_and_ups_marshalling_cabinet_selected") === "0"}
              />
            </div>
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Panel Mounted Push Buttons , Indication lamps & Colors</span>
        </Divider>

        <div className="flex gap-4">
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="is_electronic_hooter_selected"
              label="Electronic Hooter"
              options={[
                { label: "Yes", value: "1" },
                { label: "No", value: "0" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="electronic_hooter_acknowledge"
              label="Electronic Hooter Acknowledge"
              options={electronic_hooter_acknowledge_options || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="panel_power_supply_on_color"
              label="Electronic Hooter Acknowledge"
              options={panel_power_supply_on_options || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="indicating_lamp_color_for_nonups_power_supply"
              label="Indicating Lamp Colour for Non-UPS Power Supply"
              options={non_ups_indicating_lamp_color_options || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="indicating_lamp_colour_for_ups_power_supply"
              label="Indicating Lamp Colour for UPS Power Supply"
              options={ups_indicating_lamp_color_options || []}
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
                  {/* <div className="flex-1">
                    <CustomRadioSelect
                      control={control}
                      name="is_di_module_density_selected"
                      label=""
                      options={[
                        { label: "Yes", value: "1" },
                        { label: "No", value: "0" },
                      ]}
                    />
                  </div> */}
                </div>
                <div className="flex-1">
                  <CustomSingleSelect
                    control={control}
                    name="di_module_density"
                    label=""
                    size="small"
                    options={di_module_density_options || []}
                    // disabled={watch("is_di_module_density_selected") === "0"}
                  />
                </div>
              </div>
              <div className="flex flex-1 items-center gap-2">
                <div className="flex items-center gap-4">
                  <h4 className="text-sm font-semibold text-slate-700">Type of Input</h4>
                  {/* <div className="flex-1">
                    <CustomRadioSelect
                      control={control}
                      name="is_di_module_input_type_selected"
                      label=""
                      options={[
                        { label: "Yes", value: "1" },
                        { label: "No", value: "0" },
                      ]}
                    />
                  </div> */}
                </div>
                <div className="flex-1">
                  <CustomSingleSelect
                    control={control}
                    name="di_module_input_type"
                    label=""
                    size="small"
                    options={di_module_input_type_options || []}
                    // disabled={watch("is_di_module_input_type_selected") === "0"}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-1 items-end gap-2">
                <div className="flex items-end gap-4">
                  <h4 className="text-sm font-semibold text-slate-700">Interrogation Voltage</h4>
                  {/* <div className="flex-1">
                    <CustomRadioSelect
                      control={control}
                      name="is_interrogation_voltage_selected"
                      label=""
                      options={[
                        { label: "Yes", value: "1" },
                        { label: "No", value: "0" },
                      ]}
                    />
                  </div> */}
                </div>
                <div className="flex-1">
                  <CustomSingleSelect
                    control={control}
                    name="interrogation_voltage"
                    label=""
                    size="small"
                    options={di_module_interrogation_voltage_options || []}
                    // disabled={watch("is_interrogation_voltage_selected") === "0"}
                  />
                </div>
              </div>
              <div className="flex-1">
                <CustomTextInput control={control} name="di_module_scan_time" label="Scan Time" size="small" />
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
                  {/* <div className="flex-1">
                    <CustomRadioSelect
                      control={control}
                      name="is_do_module_density_selected"
                      label=""
                      options={[
                        { label: "Yes", value: "1" },
                        { label: "No", value: "0" },
                      ]}
                    />
                  </div> */}
                </div>
                <div className="flex-1">
                  <CustomSingleSelect
                    control={control}
                    name="do_module_density"
                    label=""
                    size="small"
                    options={do_module_density_options || []}
                    // disabled={watch("is_do_module_density_selected") === "0"}
                  />
                </div>
              </div>
              <div className="flex flex-1 items-center gap-2">
                <div className="flex items-center gap-4">
                  <h4 className="text-sm font-semibold text-slate-700">Type of Output</h4>
                  {/* <div className="flex-1">
                    <CustomRadioSelect
                      control={control}
                      name="is_do_module_output_type_selected"
                      label=""
                      options={[
                        { label: "Yes", value: "1" },
                        { label: "No", value: "0" },
                      ]}
                    />
                  </div> */}
                </div>
                <div className="flex-1">
                  <CustomSingleSelect
                    control={control}
                    name="do_module_output_type"
                    label=""
                    size="small"
                    options={do_module_output_type_options || []}
                    // disabled={watch("is_do_module_output_type_selected") === "0"}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-4">
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="output_contact_rating_of_interposing_relay"
                  label="Output Contact Rating of Interposing Relay"
                  size="small"
                />
              </div>
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="output_status_on_processor_or_module_failure"
                  label="Output Status on Processor/Module Failure"
                  size="small"
                />
              </div>
            </div>
            <div className="flex w-1/2 flex-1 items-end gap-4">
              <h4 className="text-sm font-semibold text-slate-700">No. of Contacts</h4>
              <div className="">
                <CustomRadioSelect
                  control={control}
                  name="is_no_of_contact_selected"
                  label=""
                  options={[
                    { label: "Yes", value: "1" },
                    { label: "No", value: "0" },
                  ]}
                />
              </div>
              <div className="flex-1">
                <CustomSingleSelect
                  control={control}
                  name="do_module_no_of_contact"
                  label=""
                  size="small"
                  options={do_contact_no_options || []}
                  disabled={watch("is_no_of_contact_selected") === "0"}
                />
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
                  {/* <div className="flex-1">
                    <CustomRadioSelect
                      control={control}
                      name="is_ai_module_density_selected"
                      label=""
                      options={[
                        { label: "Yes", value: "1" },
                        { label: "No", value: "0" },
                      ]}
                    />
                  </div> */}
                </div>
                <div className="flex-1">
                  <CustomSingleSelect
                    control={control}
                    name="ai_module_density"
                    label=""
                    size="small"
                    options={ai_module_density_options || []}
                    // disabled={watch("is_ai_module_density_selected") === "0"}
                  />
                </div>
              </div>
              <div className="flex flex-1 items-center gap-2">
                <div className="flex items-center gap-4">
                  <h4 className="text-sm font-semibold text-slate-700">Type of Output</h4>
                  {/* <div className="flex-1">
                    <CustomRadioSelect
                      control={control}
                      name="is_ai_module_output_type_selected"
                      label=""
                      options={[
                        { label: "Yes", value: "1" },
                        { label: "No", value: "0" },
                      ]}
                    />
                  </div> */}
                </div>
                <div className="flex-1">
                  <CustomTextInput
                    control={control}
                    name="ai_module_output_type"
                    label=""
                    size="small"
                    // disabled={watch("is_ai_module_output_type_selected") === "0"}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-4">
              <div className="flex-1">
                <CustomTextInput control={control} name="ai_module_scan_time" label="Scan Time" size="small" />
              </div>
              <div className="flex flex-1 items-center gap-4">
                <h4 className="text-sm font-semibold text-slate-700">HART Protocol Support</h4>
                <div className="flex-1">
                  <CustomRadioSelect
                    control={control}
                    name="is_ai_module_hart_protocol_support_selected"
                    label=""
                    options={[
                      { label: "Yes", value: "1" },
                      { label: "No", value: "0" },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
          <Divider orientation="left" orientationMargin={0}>
            <div className="flex flex-row items-center justify-center gap-5">
              <span className="text-sm font-bold text-blue-500">RTD / TC Modules</span>
              <span>
                <CustomRadioSelect
                  control={control}
                  name="is_rtd_tc_moduule_selected"
                  label=""
                  options={[
                    { label: "Yes", value: "1" },
                    { label: "No", value: "0" },
                  ]}
                />
              </span>
            </div>
          </Divider>
          <div className="flex flex-col gap-4">
            <div className="flex flex-1 gap-4">
              <div className="flex flex-1 items-center gap-2">
                <div className="flex items-center gap-4">
                  <h4 className="text-sm font-semibold text-slate-700">Density</h4>
                  {/* <div className="flex-1">
                    <CustomRadioSelect
                      control={control}
                      name="is_rtd_tc_module_density_selected"
                      label=""
                      options={[
                        { label: "Yes", value: "1" },
                        { label: "No", value: "0" },
                      ]}
                    />
                  </div> */}
                </div>
                <div className="flex-1">
                  <CustomSingleSelect
                    control={control}
                    name="rtd_tc_module_density"
                    label=""
                    size="small"
                    options={rtd_density_options || []}
                    disabled={isRtdModuleSelected === "0"}
                  />
                </div>
              </div>
              <div className="flex flex-1 items-center gap-2">
                <div className="flex items-center gap-4">
                  <h4 className="text-sm font-semibold text-slate-700">Type of Input</h4>
                  {/* <div className="flex-1">
                    <CustomRadioSelect
                      control={control}
                      name="is_rtd_tc_module_input_type_selected"
                      label=""
                      options={[
                        { label: "Yes", value: "1" },
                        { label: "No", value: "0" },
                      ]}
                    />
                  </div> */}
                </div>
                <div className="flex-1">
                  <CustomSingleSelect
                    control={control}
                    name="rtd_tc_module_input_type"
                    label=""
                    size="small"
                    options={rtd_input_type_options || []}
                    disabled={isRtdModuleSelected === "0"}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-4">
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="rtd_tc_module_scan_time"
                  label="Scan Time"
                  size="small"
                  disabled={isRtdModuleSelected === "0"}
                />
              </div>
              <div className="flex flex-1 items-center gap-4">
                <h4 className="text-sm font-semibold text-slate-700">HART Protocol Support</h4>
                <div className="flex-1">
                  <CustomRadioSelect
                    control={control}
                    name="is_rtd_tc_module_hart_protocol_support_selected"
                    label=""
                    options={[
                      { label: "Yes", value: "1" },
                      { label: "No", value: "0" },
                    ]}
                    disabled={isRtdModuleSelected === "0"}
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
                  {/* <div className="flex-1">
                    <CustomRadioSelect
                      control={control}
                      name="is_ao_module_density_selected"
                      label=""
                      options={[
                        { label: "Yes", value: "1" },
                        { label: "No", value: "0" },
                      ]}
                    />
                  </div> */}
                </div>
                <div className="flex-1">
                  <CustomSingleSelect
                    control={control}
                    name="ao_module_density"
                    label=""
                    size="small"
                    options={ao_module_density_options || []}
                    // disabled={watch("is_ao_module_density_selected") === "0"}
                  />
                </div>
              </div>
              <div className="flex flex-1 items-center gap-2">
                <div className="flex items-center gap-4">
                  <h4 className="text-sm font-semibold text-slate-700">Type of Output</h4>
                  {/* <div className="flex-1">
                    <CustomRadioSelect
                      control={control}
                      name="is_ao_module_output_type_selected"
                      label=""
                      options={[
                        { label: "Yes", value: "1" },
                        { label: "No", value: "0" },
                      ]}
                    />
                  </div> */}
                </div>
                <div className="flex-1">
                  <CustomSingleSelect
                    control={control}
                    name="ao_module_output_type"
                    label=""
                    size="small"
                    options={ao_module_output_type_options || []}
                    // disabled={watch("is_ao_module_output_type_selected") === "0"}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-4">
              <div className="flex-1">
                <CustomTextInput control={control} name="ao_module_scan_time" label="Scan Time" size="small" />
              </div>
              <div className="flex flex-1 items-center gap-4">
                <h4 className="text-sm font-semibold text-slate-700">HART Protocol Support</h4>
                <div className="flex-1">
                  <CustomRadioSelect
                    control={control}
                    name="is_ao_module_hart_protocol_support_selected"
                    label=""
                    options={[
                      { label: "Yes", value: "1" },
                      { label: "No", value: "0" },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">PLC Spare</span>
        </Divider>
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-2">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">IO Count</h4>
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="is_plc_spare_io_count_selected"
                  label=""
                  options={[
                    { label: "Yes", value: "1" },
                    { label: "No", value: "0" },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="plc_spare_io_count"
                label=""
                size="small"
                options={plc_io_count_options || []}
                disabled={watch("is_plc_spare_io_count_selected") === "0"}
              />
            </div>
          </div>
          <div className="flex flex-1 items-center gap-2">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">Memory</h4>
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="is_plc_spare_memory_selected"
                  label=""
                  options={[
                    { label: "Yes", value: "1" },
                    { label: "No", value: "0" },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="plc_spare_memory"
                label=""
                size="small"
                options={plc_spare_memory_options || []}
                disabled={watch("is_plc_spare_memory_selected") === "0"}
              />
            </div>
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Human Interface Device</span>
        </Divider>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-4">
                <h4 className="text-sm font-semibold text-slate-700">ES (NOs)</h4>
                <div className="flex-1">
                  <CustomRadioSelect
                    control={control}
                    name="is_no_of_hid_es_selected"
                    label=""
                    options={[
                      { label: "Yes", value: "1" },
                      { label: "No", value: "0" },
                    ]}
                  />
                </div>
              </div>
              <div className="flex-1">
                <CustomTextNumber
                  control={control}
                  name="no_of_hid_es"
                  label=""
                  size="small"
                  disabled={watch("is_no_of_hid_es_selected") === "0"}
                />
              </div>
            </div>
            <div className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-4">
                <h4 className="text-sm font-semibold text-slate-700">OS (NOs)</h4>
                <div className="flex-1">
                  <CustomRadioSelect
                    control={control}
                    name="is_no_of_hid_os_selected"
                    label=""
                    options={[
                      { label: "Yes", value: "1" },
                      { label: "No", value: "0" },
                    ]}
                  />
                </div>
              </div>
              <div className="flex-1">
                <CustomTextNumber
                  control={control}
                  name="no_of_hid_os"
                  label=""
                  size="small"
                  disabled={watch("is_no_of_hid_os_selected") === "0"}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-4">
                <h4 className="text-sm font-semibold text-slate-700">HMI (NOs)</h4>
                <div className="flex-1">
                  <CustomRadioSelect
                    control={control}
                    name="is_no_of_hid_hmi_selected"
                    label=""
                    options={[
                      { label: "Yes", value: "1" },
                      { label: "No", value: "0" },
                    ]}
                  />
                </div>
              </div>
              <div className="flex-1">
                <CustomTextNumber
                  control={control}
                  name="no_of_hid_hmi"
                  label=""
                  size="small"
                  disabled={watch("is_no_of_hid_hmi_selected") === "0"}
                />
              </div>
            </div>
            <div className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-4">
                <h4 className="text-sm font-semibold text-slate-700">HMI Size (inch)</h4>
                <div className="flex-1">
                  <CustomRadioSelect
                    control={control}
                    name="is_hid_hmi_size_selected"
                    label=""
                    options={[
                      { label: "Yes", value: "1" },
                      { label: "No", value: "0" },
                    ]}
                  />
                </div>
              </div>
              <div className="flex-1">
                <CustomSingleSelect
                  control={control}
                  name="hid_hmi_size"
                  label=""
                  size="small"
                  options={plc_hmi_size_options || []}
                  suffixIcon={
                    <>
                      <p className="font-semibold text-blue-500">inch</p>
                    </>
                  }
                  disabled={watch("is_hid_hmi_size_selected") === "0"}
                />
              </div>
            </div>
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Software</span>
        </Divider>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-4">
                <h4 className="text-sm font-semibold text-slate-700">SCADA Development License (NOs)</h4>
                <div className="flex-1">
                  <CustomRadioSelect
                    control={control}
                    name="is_scada_development_license_selected"
                    label=""
                    options={[
                      { label: "Yes", value: "1" },
                      { label: "No", value: "0" },
                    ]}
                  />
                </div>
              </div>
              <div className="flex-1">
                <CustomTextNumber
                  control={control}
                  name="no_of_scada_development_license"
                  label=""
                  size="small"
                  disabled={watch("is_scada_development_license_selected") === "0"}
                />
              </div>
            </div>
            <div className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-4">
                <h4 className="text-sm font-semibold text-slate-700">SCADA Runtime License (NOs)</h4>
                <div className="flex-1">
                  <CustomRadioSelect
                    control={control}
                    name="is_scada_runtime_license_selected"
                    label=""
                    options={[
                      { label: "Yes", value: "1" },
                      { label: "No", value: "0" },
                    ]}
                  />
                </div>
              </div>
              <div className="flex-1">
                <CustomTextNumber
                  control={control}
                  name="no_of_scada_runtime_license"
                  disabled={watch("is_scada_runtime_license_selected") === "0"}
                  label=""
                  size="small"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-4">
                <h4 className="text-sm font-semibold text-slate-700">HMI Development License (NOs)</h4>
                <div className="flex-1">
                  <CustomRadioSelect
                    control={control}
                    name="is_hmi_development_license_selected"
                    label=""
                    options={[
                      { label: "Yes", value: "1" },
                      { label: "No", value: "0" },
                    ]}
                  />
                </div>
              </div>
              <div className="flex-1">
                <CustomTextNumber
                  control={control}
                  name="no_of_hmi_development_license"
                  label=""
                  disabled={watch("is_hmi_development_license_selected") === "0"}
                  size="small"
                />
              </div>
            </div>
            <div className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-4">
                <h4 className="text-sm font-semibold text-slate-700">PLC Programming License Software</h4>
                <div className="flex-1">
                  <CustomRadioSelect
                    control={control}
                    name="is_plc_programming_license_software_selected"
                    label=""
                    options={[
                      { label: "Yes", value: "1" },
                      { label: "No", value: "0" },
                    ]}
                  />
                </div>
              </div>
              <div className="flex-1">
                <CustomTextNumber
                  control={control}
                  name="no_of_plc_programming_license_software"
                  label=""
                  size="small"
                  disabled={watch("is_plc_programming_license_software_selected") === "0"}
                />
              </div>
            </div>
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Engineering/Operating SCADA Station</span>
        </Divider>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="system_hardware"
                label="System Hardware"
                size="small"
                options={eo_system_hardware_options || []}
              />
            </div>
            <div className="flex-1">
              <CustomTextAreaInput control={control} name="commercial_grade_pc" label="Commercial Grade PC" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="monitor_size"
                label="Monitor Size"
                size="small"
                suffixIcon={
                  <>
                    <p className="font-semibold text-blue-500">inch</p>
                  </>
                }
                options={eo_monitor_size_options || []}
              />
            </div>
            <div className="flex-1">
              <CustomTextInput
                control={control}
                name="windows_operating_system"
                label="Window Operating System, Microsoft Office, Anti Virus (3 Year) License, Quantity As Per ES & OS"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-2">
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">Printer With Suitable Communication Cable</h4>
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="is_printer_with_cable_selected"
                  label=""
                  options={[
                    { label: "Yes", value: "1" },
                    { label: "No", value: "0" },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="printer_with_communication_cable"
                label=""
                size="small"
                options={eo_pc_cable_options || []}
                disabled={watch("is_printer_with_cable_selected") === "0"}
              />
            </div>
          </div>
          <div className="flex flex-1 items-center gap-2">
            <div className="flex-1">
              <CustomTextNumber
                control={control}
                name="no_of_printer"
                label="Printer - Qty"
                disabled={watch("is_printer_with_cable_selected") === "0"}
                size="small"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-2">
            <CustomTextInput
              control={control}
              label="Printer Table"
              size="small"
              disabled={watch("is_printer_with_cable_selected") === "0"}
              name="printer_cable"
            />
          </div>
          <div className="flex flex-1 items-center gap-2">
            <h4 className="text-sm font-semibold text-slate-700">
              Furniture/Console for Computer/SCADA Station (ES/OS)
            </h4>
            <div className="">
              <CustomRadioSelect
                control={control}
                name="is_furniture_for_scada_station_selected"
                label=""
                options={[
                  { label: "Yes", value: "1" },
                  { label: "No", value: "0" },
                ]}
              />
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="furniture_for_scada_station"
                label=""
                size="small"
                options={eo_scada_furniture_options || []}
                disabled={watch("is_furniture_for_scada_station_selected") === "0"}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="hardware_between_plc_and_scada_pc"
              label="Communication Cable & Hardware Between PLC & SCADA PC"
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="hardware_between_plc_and_third_party"
              label="Communication Cable & Hardware Between PLC & Third Party"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="hardware_between_plc_and_client_system"
              label="Communication Cable & Hardware Between PLC & Client System"
            />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="iiot_requirement" label="IIOT requirement" />
          </div>
        </div>
        <div>
          <div className="flex-1">
            <CustomTextInput control={control} name="mandatory_spares" label="Mandatory Spares" />
          </div>
        </div>

        <div className="mt-2 flex w-full justify-end">
          <Button type="primary" onClick={onSubmit} loading={loading}>
            Save and Next
          </Button>
        </div>
      </form>
    </>
  )
}

export default MCCcumPCCPLCPanel
