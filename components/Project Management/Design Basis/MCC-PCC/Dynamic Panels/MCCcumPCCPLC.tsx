import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider, message } from "antd"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { createData, getData, updateData } from "actions/crud-actions"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomTextNumber from "components/FormInputs/CustomInputNumber"
import CustomRadioSelect from "components/FormInputs/CustomRadioSelect"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import CustomTextAreaInput from "components/FormInputs/CustomTextArea"
import { MCC_PCC_PLC_PANEL_1, MCC_PCC_PLC_PANEL_2 } from "configs/api-endpoints"
import { useGetData } from "hooks/useCRUD"
import usePLCDropdowns from "./PLCDropdown"
import { plcPanelValidationSchema } from "../schemas"

const getDefaultValues = (plcData: any) => {
  return {
    ups_scope: plcData?.ups_scope || "Client Scope",
    is_rtd_tc_moduule_selected: plcData?.is_rtd_tc_moduule_selected?.toString() || "1",
    ups_type: plcData?.ups_type || "Commercial",
    ups_battery_type: plcData?.ups_battery_type || "SMF Battery",
    ups_battery_backup_time: plcData?.ups_battery_backup_time || "20 min",
    is_ups_battery_mounting_rack_selected: plcData?.is_ups_battery_mounting_rack_selected?.toString() || "1",
    plc_cpu_or_processor_module_or_series: plcData?.plc_cpu_or_processor_module_or_series || "VTS",
    is_bulk_power_supply_selected: plcData?.is_bulk_power_supply_selected?.toString() || "1",
    plc_communication_between_cpu_and_io_card: plcData?.plc_communication_between_cpu_and_io_card || "VTS",
    is_third_party_communication_protocol_selected:
      plcData?.is_third_party_communication_protocol_selected?.toString() || "1",
    third_party_communication_protocol: plcData?.third_party_communication_protocol || "Ethernet",
    is_client_system_communication_selected: plcData?.is_client_system_communication_selected?.toString() || "1",
    client_system_communication: plcData?.client_system_communication || "FO",
    is_power_supply_redundancy_selected: plcData?.is_power_supply_redundancy_selected?.toString() || "1",
    is_cpu_redundancy_selected: plcData?.is_cpu_redundancy_selected?.toString() || "1",
    cpu_redundancy: plcData?.cpu_redundancy || "Hot",
    is_io_redundancy_selected: plcData?.is_io_redundancy_selected?.toString() || "1",
    is_cpu_and_io_card_redundancy_selected: plcData?.is_cpu_and_io_card_redundancy_selected?.toString() || "1",
    is_cpu_and_hmi_scada_card_redundancy_selected:
      plcData?.is_cpu_and_hmi_scada_card_redundancy_selected?.toString() || "1",
    is_cpu_and_third_party_services_redundancy_selected:
      plcData?.is_cpu_and_third_party_services_redundancy_selected?.toString() || "1",
    plc_panel_memory: plcData?.plc_panel_memory || "20%",
    is_plc_and_ups_marshalling_cabinet_selected:
      plcData?.is_plc_and_ups_marshalling_cabinet_selected?.toString() || "1",
    marshalling_cabinet_for_plc_and_ups: plcData?.marshalling_cabinet_for_plc_and_ups || "As per OEM",
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
    is_plc_spare_io_count_selected: plcData?.is_plc_spare_io_count_selected?.toString() || "1",
    plc_spare_io_count: plcData?.plc_spare_io_count || "10%",
    is_plc_spare_memory_selected: plcData?.is_plc_spare_memory_selected?.toString() || "1",
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
    system_hardware: plcData?.system_hardware || "Industrial Grade PC",
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
}

const MCCcumPCCPLCPanel = ({ revision_id, panel_id }: { revision_id: string; panel_id: string }) => {
  const { data: plcPanelData1 } = useGetData(
    `${MCC_PCC_PLC_PANEL_1}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"], ["panel_id", "=", "${panel_id}"]]`
  )
  const { data: plcPanelData2 } = useGetData(
    `${MCC_PCC_PLC_PANEL_2}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"], ["panel_id", "=", "${panel_id}"]]`
  )

  const plcPanelData = useMemo(
    () => [...(plcPanelData1 || []), ...(plcPanelData2 || [])],
    [plcPanelData1, plcPanelData2]
  )
  const [loading, setLoading] = useState(false)
  const {
    plc_ups_scope_options,
    plc_ups_type_options,
    plc_ups_battery_backup_time_options,
    plc_hardware_communication_protocol_options,
    plc_client_system_communication_options,
    plc_cpu_redundancy_options,
    plc_panel_memory_options,
    marshalling_cabinet_options,
    plc_control_voltage_options,
    push_button_color_acknowledge_options,
    push_button_color_reset_options,
    non_ups_indicating_lamp_color_options,
    ups_indicating_lamp_color_options,
    di_module_density_options,
    di_module_input_type_options,
    di_module_interrogation_voltage_options,
    do_module_density_options,
    do_module_output_type_options,
    do_contact_no_options,
    ai_module_density_options,
    rtd_density_options,
    rtd_input_type_options,
    ao_module_density_options,
    ao_module_output_type_options,
    plc_io_count_options,
    plc_spare_memory_options,
    plc_hmi_size_options,
    eo_system_hardware_options,
    eo_monitor_size_options,
    eo_pc_cable_options,
    eo_scada_furniture_options,
  } = usePLCDropdowns()

  const { control, handleSubmit, reset, watch, getValues, setValue } = useForm({
    resolver: zodResolver(plcPanelValidationSchema),
    defaultValues: getDefaultValues(plcPanelData?.[0]),
    mode: "onSubmit",
  })
  const isClientOrThermaxScopeisSelected = watch("ups_scope")
  const isRtdModuleSelected = watch("is_rtd_tc_moduule_selected")

  // const is_third_party_communication_protocol_selected_controlled = watch(
  //   "is_third_party_communication_protocol_selected"
  // )
  // const is_client_system_communication_selected_controlled = watch("is_client_system_communication_selected")
  // const is_cpu_redundancy_selected_controlled = watch("is_cpu_redundancy_selected")
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

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      setLoading(true)
      try {
        let data = getValues()
        const mccPanelData1 = await getData(
          `${MCC_PCC_PLC_PANEL_1}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"], ["panel_id", "=", "${panel_id}"]]`
        )
        const mccPanelData2 = await getData(
          `${MCC_PCC_PLC_PANEL_2}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"], ["panel_id", "=", "${panel_id}"]]`
        )

        if (mccPanelData1 && mccPanelData1.length > 0) {
          await updateData(`${MCC_PCC_PLC_PANEL_1}/${mccPanelData1[0].name}`, false, data)
        } else {
          const combined_Data = {
            ...data,
            revision_id,
            panel_id,
          }
          data = { ...combined_Data }
          // data["revision_id"] = revision_id
          // data["panel_id"] = panel_id
          await createData(MCC_PCC_PLC_PANEL_1, false, data)
        }

        if (mccPanelData2 && mccPanelData2.length > 0) {
          await updateData(`${MCC_PCC_PLC_PANEL_2}/${mccPanelData2[0].name}`, false, data)
        } else {
          const combined_Data = {
            ...data,
            revision_id,
            panel_id,
          }
          data = { ...combined_Data }
          await createData(MCC_PCC_PLC_PANEL_2, false, data)
        }

        message.success("PLC Data updated successfully")
      } catch (error) {
        console.error(error)
        handleError(error)
      } finally {
        setLoading(false)
      }
    },
    [revision_id, reset, getValues]
  )

  return (
    <>
      <Divider>
        <span className="font-bold text-slate-700">UPS</span>
      </Divider>
      <form onSubmit={onSubmit} className="flex flex-col gap-2 px-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ups_scope"
              label="UPS Scope"
              options={plc_ups_scope_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ups_type"
              label="UPS Type"
              options={plc_ups_type_options}
              disabled={
                isClientOrThermaxScopeisSelected === "Thermax Scope" ||
                isClientOrThermaxScopeisSelected === "Client Scope"
              }
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="ups_battery_type"
              label="UPS Battery Type"
              disabled={
                isClientOrThermaxScopeisSelected === "Thermax Scope" ||
                isClientOrThermaxScopeisSelected === "Client Scope"
              }
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
                name="is_ups_battery_mounting_rack_selected"
                label=""
                options={[
                  { label: "Yes", value: "1" },
                  { label: "No", value: "0" },
                ]}
                disabled={
                  isClientOrThermaxScopeisSelected === "Thermax Scope" ||
                  isClientOrThermaxScopeisSelected === "Client Scope"
                }
              />
            </div>
          </div>
          <div className="basis-1/3">
            <CustomSingleSelect
              control={control}
              name="ups_battery_backup_time"
              label="UPS Battery Backup Time In Min"
              options={plc_ups_battery_backup_time_options}
              size="small"
              disabled={
                isClientOrThermaxScopeisSelected === "Thermax Scope" ||
                isClientOrThermaxScopeisSelected === "Client Scope"
              }
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
                name="is_bulk_power_supply_selected"
                label=""
                options={[
                  { label: "Yes", value: "1" },
                  { label: "No", value: "0" },
                ]}
              />
            </div>
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="plc_cpu_or_processor_module_or_series"
              label="PLC CPU/Processor Module/Series"
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="plc_communication_between_cpu_and_io_card"
              label="PLC Communication Between CPU and I/O Card"
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-1 flex-col gap-4">
            <div>
              <CustomRadioSelect
                control={control}
                name="is_third_party_communication_protocol_selected"
                label="Third Party Communication Protocol"
                options={[
                  { label: "Yes", value: "1" },
                  { label: "No", value: "0" },
                ]}
              />
            </div>
            <div>
              <CustomSingleSelect
                control={control}
                name="third_party_communication_protocol"
                label=""
                options={plc_hardware_communication_protocol_options}
                size="small"
                disabled={watch("is_third_party_communication_protocol_selected") === "0"}
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <div>
              <CustomRadioSelect
                control={control}
                name="is_client_system_communication_selected"
                label="Client System Communication"
                options={[
                  { label: "Yes", value: "1" },
                  { label: "No", value: "0" },
                ]}
              />
            </div>
            <div>
              <CustomSingleSelect
                control={control}
                name="client_system_communication"
                label=""
                options={plc_client_system_communication_options}
                size="small"
                disabled={watch("is_client_system_communication_selected") === "0"}
              />
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
              name="is_power_supply_redundancy_selected"
              label="Power Supply Redundancy"
              options={[
                { label: "Yes", value: "1" },
                { label: "No", value: "0" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="is_io_redundancy_selected"
              label="I/O Redundancy"
              options={[
                { label: "Yes", value: "1" },
                { label: "No", value: "0" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="is_cpu_and_io_card_redundancy_selected"
              label="PLC Communication Redundancy between CPU and I/O card"
              options={[
                { label: "Yes", value: "1" },
                { label: "No", value: "0" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="is_cpu_and_hmi_scada_card_redundancy_selected"
              label="PLC Communication Redundancy Between CPU and HMI/SCADA"
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
              name="is_cpu_and_third_party_services_redundancy_selected"
              label="PLC Communication Redundancy Between CPU and Third Party Devices"
              options={[
                { label: "Yes", value: "1" },
                { label: "No", value: "0" },
              ]}
            />
          </div>
          <div className="flex items-center gap-4">
            <h4 className="text-sm font-semibold text-slate-700">CPU Redundancy</h4>
            <div className="">
              <CustomRadioSelect
                control={control}
                name="is_cpu_redundancy_selected"
                label=""
                options={[
                  { label: "Yes", value: "1" },
                  { label: "No", value: "0" },
                ]}
              />
            </div>
          </div>
          <div className="basis-1/3">
            <CustomSingleSelect
              control={control}
              name="cpu_redundancy"
              label=""
              size="small"
              options={plc_cpu_redundancy_options}
              disabled={watch("is_cpu_redundancy_selected") === "0"}
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">PLC Panel</span>
        </Divider>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="plc_panel_memory"
              label="Memory"
              options={plc_panel_memory_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="panel_mounted_ac" label="Panel Mounted AC" size="small" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="control_voltage"
              label=" Control Voltage : Ǿ : Wire : Frequency : ± 5 (UPS)"
              size="small"
              options={plc_control_voltage_options}
            />
          </div>
          <div className="flex flex-1 items-center gap-2">
            <div className="flex flex-1 items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">Marshalling Cabinet For PLC and UPS</h4>
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="is_plc_and_ups_marshalling_cabinet_selected"
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
                name="marshalling_cabinet_for_plc_and_ups"
                label=""
                size="small"
                options={marshalling_cabinet_options}
                disabled={watch("is_plc_and_ups_marshalling_cabinet_selected") === "0"}
              />
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
              name="push_button_colour_acknowledge"
              label="Push Button Colour Acknowledge"
              options={push_button_color_acknowledge_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color_reset"
              label="Push Button Colour Reset"
              options={push_button_color_reset_options}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="indicating_lamp_color_for_nonups_power_supply"
              label="Indicating Lamp Colour for Non-UPS Power Supply"
              options={non_ups_indicating_lamp_color_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="indicating_lamp_colour_for_ups_power_supply"
              label="Indicating Lamp Colour for UPS Power Supply"
              options={ups_indicating_lamp_color_options}
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
                    options={di_module_density_options}
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
                    options={di_module_input_type_options}
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
                    options={di_module_interrogation_voltage_options}
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
                    options={do_module_density_options}
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
                    options={do_module_output_type_options}
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
                  options={do_contact_no_options}
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
                    options={ai_module_density_options}
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
                    options={rtd_density_options}
                    disabled={ isRtdModuleSelected === "0"}
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
                    options={rtd_input_type_options}
                    disabled={ isRtdModuleSelected === "0" }
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
                    options={ao_module_density_options}
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
                    options={ao_module_output_type_options}
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
                options={plc_io_count_options}
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
                options={plc_spare_memory_options}
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
                  options={plc_hmi_size_options}
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
                options={eo_system_hardware_options}
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
                options={eo_monitor_size_options}
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
                options={eo_pc_cable_options}
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
                options={eo_scada_furniture_options}
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
