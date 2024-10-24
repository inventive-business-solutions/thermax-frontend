"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Divider, message } from "antd"
import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as zod from "zod"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomRadioSelect from "components/FormInputs/CustomRadioSelect"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import useMCCcumPCCDropdowns from "./MCCcumPCCDropdowns"
import { useParams } from "next/navigation"
import { PROJECT_API } from "configs/api-endpoints"
import { useGetData } from "hooks/useCRUD"
import { mutate } from "swr"

const configItemValidationSchema = zod.object({
  id: zod.number(),
  ups_scope: zod.string({ required_error: "This field is required", message: "This field is requied" }),
  ups_type: zod.string({ required_error: "This field is required", message: "This field is required" }),
  ups_battery_type: zod.string({ required_error: "This field is required", message: "This field is required" }),
  ups_battery_backup_time: zod.string({ required_error: "This field is required", message: "This field is required" }),
  plc_cpu_module: zod.string({ required_error: "This field is required", message: "This field is required" }),
  plc_communication_cpu_io_card: zod.string({
    required_error: "This field is required",
    message: "This field is required",
  }),
  third_party_communication_protocol: zod.string({
    required_error: "This field is required",
    message: "This field is required",
  }),
  client_system_communication: zod.string({
    required_error: "This field is required",
    message: "This field is required",
  }),
  cpu_redundancy: zod.string({ required_error: "This field is required", message: "This field is required" }),
  plc_panel_memory: zod.string({ required_error: "This field is required", message: "This field is required" }),
  plc_panel_mounted_ac: zod.string({ required_error: "This field is required", message: "This field is required" }),
  plc_panel_control_voltage: zod.string({
    required_error: "This field is required",
    message: "This field is required",
  }),
  marshalling_cabinet_for_plc: zod.string({
    required_error: "This field isr required",
    message: "This field is required",
  }),
  push_button_color_acknowledge: zod.string({
    required_error: "This field is required",
    message: "This field is required",
  }),
  push_button_color_reset: zod.string({ required_error: "This field is required", message: "This field is required" }),
  indicating_lamp_non_ups: zod.string({ required_error: "This field is required", message: "This field is required" }),
  indicating_lamp_ups: zod.string({ required_error: "This field is required", message: "This field is required" }),

  di_module_density: zod.string({ required_error: "This field is required", message: "This field is required" }),
  di_module_typeOfInput: zod.string({ required_error: "This field is required", message: "This field is required" }),
  di_module_integorration_voltage: zod.string({
    required_error: "This field is required",
    message: "This field is required",
  }),
  do_module_density: zod.string({ required_error: "This field is required", message: "This field is required" }),
  do_module_typeOfOutput: zod.string({ required_error: "This field is required", message: "This field is required" }),
  do_module_no_of_contacts: zod.string({ required_error: "This field is required", message: "This field is required" }),
  ai_module_density: zod.string({ required_error: "This field is required", message: "This field is required" }),
  ai_module_typeOfOutput: zod.string({ required_error: "This field is required", message: "This field is required" }),
  ao_module_density: zod.string({ required_error: "This field is required", message: "This field is required" }),
  ao_module_typeOfOutput: zod.string({ required_error: "This field is required", message: "This field is required" }),
  rtd_density: zod.string({ required_error: "This field is required", message: "This field is required" }),
  rtd_typeOfInput: zod.string({ required_error: "This field is required", message: "This field is required" }),

  io_count: zod.string({ required_error: "This field is required", message: "This field is required" }),
  plc_spare_memoty: zod.string({ required_error: "This field is required", message: "This field is required" }),
  es_nos: zod.string({ required_error: "This field is required", message: "This field is required" }),
  os_nos: zod.string({ required_error: "This field is required", message: "This field is required" }),
  hmi_nos: zod.string({ required_error: "This field is required", message: "This field is required" }),
  hmi_size_in_inch: zod.string({ required_error: "This field is required", message: "This field is required" }),
  scada_development_lic: zod.string({ required_error: "This field is required", message: "This field is required" }),
  scada_runtime_lic: zod.string({ required_error: "This field is required", message: "This field is required" }),
  hmi_development_lic: zod.string({ required_error: "This field is required", message: "This field is required" }),
  plc_programming_lic: zod.string({ required_error: "This field is required", message: "This field is required" }),

  eo_system_hardware: zod.string({ required_error: "This field is required", message: "This field is required" }),
  eo_commercial_grade_pc: zod.string({ required_error: "This field is required", message: "This field is required" }),
  eo_monitor_size: zod.string({ required_error: "This field is required", message: "This field is required" }),
  eo_windows_os: zod.string({ required_error: "This field is required", message: "This field is required" }),
  eo_printer_cc: zod.string({ required_error: "This field is required", message: "This field is required" }),
  eo_printer_qty: zod.string({ required_error: "This field is required", message: "This field is required" }),
  eo_printer_table: zod.string({ required_error: "This field is required", message: "This field is required" }),
  eo_furniture_console: zod.string({ required_error: "This field is required", message: "This field is required" }),
  eo_communication_cable: zod.string({ required_error: "This field is required", message: "This field is required" }),
  eo_communication_cable2: zod.string({ required_error: "This field is required", message: "This field is required" }),
  eo_mandatory_spare: zod.string({ required_error: "This field is required", message: "This field is required" }),
})

type MccComponentFormData = zod.infer<typeof configItemValidationSchema>

const getDefaultValues = (isEdit: boolean, projectData: any) => {
  return {
    ups_scope: projectData?.ups_scope || "NA",
    ups_type: projectData?.ups_scope || "NA",
    ups_battery_type: projectData?.ups_scope || "NA",
    ups_battery_backup_time: projectData?.ups_scope || "NA",
    plc_cpu_module: projectData?.plc_cpu_module || "NA",
    plc_communication_cpu_io_card: projectData?.plc_communication_cpu_io_card || "NA",
    third_party_communication_protocol: projectData?.third_party_communication_protocol || "NA",
    client_system_communication: projectData?.client_system_communication || "NA",
    cpu_redundancy: projectData?.cpu_redundancy || "NA",
    plc_panel_memory: projectData?.plc_panel_memory || "NA",
    plc_panel_mounted_ac: projectData?.plc_panel_mounted_ac || "NA",
    plc_panel_control_voltage: projectData?.plc_panel_control_voltage || "NA",
    marshalling_cabinet_for_plc: projectData?.marshalling_cabinet_for_plc || "NA",
    push_button_color_acknowledge: projectData?.push_button_color_acknowledge || "NA",
    push_button_color_reset: projectData?.push_button_color_reset || "NA",
    indicating_lamp_non_ups: projectData?.indicating_lamp_non_ups || "NA",
    indicating_lamp_ups: projectData?.indicating_lamp_ups || "NA",

    di_module_density: projectData?.di_module_density || "NA",
    di_module_typeOfInput: projectData?.di_module_typeOfInput || "NA",
    di_module_integorration_voltage: projectData?.di_module_integorration_voltage || "NA",
    do_module_density: projectData?.do_module_density || "NA",
    do_module_typeOfOutput: projectData?.do_module_typeOfOutput || "NA",
    do_module_no_of_contacts: projectData?.do_module_no_of_contacts || "NA",
    ai_module_density: projectData?.ai_module_density || "NA",
    ai_module_typeOfOutput: projectData?.ai_module_typeOfOutput || "NA",
    ao_module_density: projectData?.ao_module_density || "NA",
    ao_module_typeOfOutput: projectData?.ao_module_typeOfOutput || "NA",
    rtd_density: projectData?.rtd_density || "NA",
    rtd_typeOfInput: projectData?.rtd_typeOfInput || "NA",

    io_count: projectData?.io_count || "NA",
    plc_spare_memoty: projectData?.rtd_typeOfInput || "NA",
    es_nos: projectData?.es_nos || "NA",
    os_nos: projectData?.os_nos || "NA",
    hmi_nos: projectData?.hmi_nos || "NA",
    hmi_size_in_inch: projectData?.rtd_typeOfInput || "NA",
    scada_development_lic: projectData?.scada_development_lic || "NA",
    scada_runtime_lic: projectData?.scada_runtime_lic || "NA",
    hmi_development_lic: projectData?.hmi_development_lic || "NA",
    plc_programming_lic: projectData?.plc_programming_lic || "NA",

    eo_system_hardware: projectData?.eo_system_hardware || "NA",
    eo_commercial_grade_pc: projectData?.eo_commercial_grade_pc || "NA",
    eo_monitor_size: projectData?.eo_monitor_size || "NA",
    eo_windows_os: projectData?.eo_windows_os || "NA",
    eo_printer_cc: projectData?.eo_printer_cc || "NA",
    eo_printer_qty: projectData?.eo_printer_qty || "NA",
    eo_printer_table: projectData?.eo_printer_table || "NA",
    eo_furniture_console: projectData?.eo_furniture_console || "NA",
    eo_communication_cable: projectData?.eo_communication_cable || "NA",
    eo_communication_cable2: projectData?.eo_communication_cable2 || "NA",
    eo_mandatory_spare: projectData?.eo_mandatory_spare || "NA",
  }
}

const MCCcumPCCPLCPanel = () => {
  const params = useParams()
  const project_id = params.project_id
  const getPProjectMetaDataUrl = `${PROJECT_API}/${project_id}`
  const getMccPanelUrl = `${PROJECT_API}/${project_id}`
  const [loading, setLoading] = useState(false)

  const { data: projectMetadata } = useGetData(getPProjectMetaDataUrl, false)
  const { data: mccPanel } = useGetData(getMccPanelUrl, false)

  const projectData = React.useMemo(() => ({ ...projectMetadata, mccPanel }), [projectMetadata, mccPanel])

  const {
    ups_scopeOptions,
    ups_typeOptions,
    ups_battery_typeOptions,
    ups_battery_backup_time_in_minOptions,
    plc_hardware_cpuOptions,
    plc_hardware_communicationOptions,
    third_party_communicationOptions,
    client_system_communicationOptions,
    cpu_redundancyOptions,
    plc_panel_memoryOptions,
    plc_panelMounted_acOptions,
    marshalling_cabinetOptions,
    push_button_color_acknowledgeOptions,
    push_button_color_resetOptions,
    plc_panel_control_voltageOptions,
    indicating_lamp_non_upsOptions,
    indicating_lamp_upsOptions,
    di_module_densityOptions,
    di_module_typeOfInputOptions,
    di_module_integorration_voltageOptions,
    do_module_densityOptions,
    do_module_typeOfOutputOptions,
    do_module_no_of_contactsOptions,
    ai_module_densityOptions,
    ai_module_typeOfOutputOptions,
    ao_module_densityOptions,
    ao_module_typeOfOutputOptions,
    rtd_densityOptions,
    rtd_typeOfInputOptions,
    io_countOptions,
    plc_spare_memotyOptions,
    es_nosOptions,
    os_nosOptions,
    hmi_nosOptions,
    hmi_size_in_inchOptions,
    scada_development_licOptions,
    scada_runtime_licOptions,
    hmi_development_licOptions,
    plc_programming_licOptions,

    eo_system_hardwareOptions,
    eo_commercial_grade_pcOptions,
    eo_monitor_sizeOptions,
    eo_windows_osOptions,
    eo_printer_ccOptions,
    eo_printer_qtyOptions,
    eo_printer_tableOptions,
    eo_furniture_consoleOptions,
    eo_communication_cableOptions,
    eo_communication_cable2Options,
    eo_mandatory_spareOptions,
  } = useMCCcumPCCDropdowns()

  const { control, handleSubmit, reset, formState } = useForm({
    resolver: zodResolver(configItemValidationSchema),
    defaultValues: getDefaultValues(true, projectData),
    mode: "onSubmit",
  })

  console.log("ups_scopeOptions", ups_scopeOptions)

  useEffect(() => {
    reset(getDefaultValues(true, projectData))
  }, [reset, projectData])

  const handleError = (error: any) => {
    try {
      const errorObj = JSON.parse(error?.message) as any
      message.error(errorObj?.message)
    } catch (parseError) {
      message.error(error?.message || "An Unknown error occurred")
    }
  }

  const onSubmit: SubmitHandler<zod.infer<typeof mccPanel>> = async (data: any) => {
    setLoading(true)
    try {
      console.log("data: ", data)
    } catch (err) {
      handleError(err)
    } finally {
      setLoading(false)
      mutate(getMccPanelUrl)
    }
  }

  return (
    <>
      <Divider>
        <span className="font-bold text-slate-700">UPS</span>
      </Divider>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ups_scope"
              label="UPS Scope"
              options={ups_scopeOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ups_type"
              label="UPS Type"
              options={ups_typeOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ups_battery_type"
              label="UPS Battery Type"
              options={ups_battery_typeOptions}
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
              name="ups_battery_backup_time"
              label="UPS Battery Backup Time In Min"
              options={ups_battery_backup_time_in_minOptions}
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
              name="plc_hardware_cpu"
              label="PLC CPU /Processor Module/Series"
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="plc_hardware_communication"
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
                name="third_party_communication_protocol"
                label="Third party communication protocol"
                options={[
                  { label: "Yes", value: "Yes" },
                  { label: "No", value: "No" },
                ]}
              />
            </div>
            <div>
              <CustomSingleSelect
                control={control}
                name="third_party_communication_protocol"
                label=""
                options={third_party_communicationOptions}
                size="small"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <div>
              <CustomRadioSelect
                control={control}
                name="client_system_communication"
                label="Client system communication"
                options={[
                  { label: "Yes", value: "Yes" },
                  { label: "No", value: "No" },
                ]}
              />
            </div>
            <div>
              <CustomSingleSelect
                control={control}
                name="client_system_communication"
                label=""
                options={client_system_communicationOptions}
                size="small"
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
                name="cpu_redundancy"
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
              name="cpu_redundancy"
              label="CPU Redundancy"
              size="small"
              options={cpu_redundancyOptions}
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
              options={plc_panel_memoryOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomTextInput control={control} name="plc_panel_mounted_ac" label="Panel Mounted AC" size="small" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="plc_panel_control_voltage"
              label=" Control Voltage : Ǿ : Wire : Frequency : ± 5 (UPS)"
              size="small"
              options={plc_panel_control_voltageOptions}
            />
          </div>
          <div className="flex flex-1 items-center gap-2">
            <div className="flex flex-1 items-center gap-4">
              <h4 className="text-sm font-semibold text-slate-700">Marshalling Cabinet For PLC and UPS</h4>
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="marshalling_cabinet_for_plc"
                  label=""
                  options={[
                    { label: "Yes", value: "Yes" },
                    { label: "No", value: "No" },
                  ]}
                />
              </div>
            </div>
            <div className="flex-1">
              <CustomSingleSelect
                control={control}
                name="marshalling_cabinet_for_plc"
                label=""
                size="small"
                options={marshalling_cabinetOptions}
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
              name="push_button_color_acknowledge"
              label="Push Button Colour Acknowledge"
              options={push_button_color_acknowledgeOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="push_button_color_reset"
              label="Push Button Colour Reset"
              options={push_button_color_resetOptions}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="indicating_lamp_non_ups"
              label="Indicating Lamp Colour for Non-UPS Power Supply"
              options={indicating_lamp_non_upsOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="indicating_lamp_ups"
              label="Indicating Lamp Colour for UPS Power Supply"
              options={indicating_lamp_upsOptions}
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
                      name="di_module_density"
                      label=""
                      options={[
                        { label: "Yes", value: "Yes" },
                        { label: "No", value: "No" },
                      ]}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <CustomSingleSelect
                    control={control}
                    name="di_module_density"
                    label=""
                    size="small"
                    options={di_module_densityOptions}
                  />
                </div>
              </div>
              <div className="flex flex-1 items-center gap-2">
                <div className="flex items-center gap-4">
                  <h4 className="text-sm font-semibold text-slate-700">Type of Input</h4>
                  <div className="flex-1">
                    <CustomRadioSelect
                      control={control}
                      name="di_module_typeOfInput"
                      label=""
                      options={[
                        { label: "Yes", value: "Yes" },
                        { label: "No", value: "No" },
                      ]}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <CustomSingleSelect
                    control={control}
                    name="di_module_typeOfInput"
                    label=""
                    size="small"
                    options={di_module_typeOfInputOptions}
                  />
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
                      name="di_module_integorration_voltage"
                      label=""
                      options={[
                        { label: "Yes", value: "Yes" },
                        { label: "No", value: "No" },
                      ]}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <CustomSingleSelect
                    control={control}
                    name="di_module_integorration_voltage"
                    label=""
                    size="small"
                    options={di_module_integorration_voltageOptions}
                  />
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
                      name="do_module_density"
                      label=""
                      options={[
                        { label: "Yes", value: "Yes" },
                        { label: "No", value: "No" },
                      ]}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <CustomSingleSelect
                    control={control}
                    name="do_module_density"
                    label=""
                    size="small"
                    options={do_module_densityOptions}
                  />
                </div>
              </div>
              <div className="flex flex-1 items-center gap-2">
                <div className="flex items-center gap-4">
                  <h4 className="text-sm font-semibold text-slate-700">Type of Output</h4>
                  <div className="flex-1">
                    <CustomRadioSelect
                      control={control}
                      name="do_module_typeOfOutput"
                      label=""
                      options={[
                        { label: "Yes", value: "Yes" },
                        { label: "No", value: "No" },
                      ]}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <CustomSingleSelect
                    control={control}
                    name="do_module_typeOfOutput"
                    label=""
                    size="small"
                    options={do_module_typeOfOutputOptions}
                  />
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
                  name="do_module_no_of_contacts"
                  label=""
                  options={[
                    { label: "Yes", value: "Yes" },
                    { label: "No", value: "No" },
                  ]}
                />
              </div>
              <div className="flex-1">
                <CustomSingleSelect
                  control={control}
                  name="do_module_no_of_contacts"
                  label=""
                  size="small"
                  options={do_module_no_of_contactsOptions}
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
                  <div className="flex-1">
                    <CustomRadioSelect
                      control={control}
                      name="ai_module_density"
                      label=""
                      options={[
                        { label: "Yes", value: "Yes" },
                        { label: "No", value: "No" },
                      ]}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <CustomSingleSelect
                    control={control}
                    name="ai_module_density"
                    label=""
                    size="small"
                    options={ai_module_densityOptions}
                  />
                </div>
              </div>
              <div className="flex flex-1 items-center gap-2">
                <div className="flex items-center gap-4">
                  <h4 className="text-sm font-semibold text-slate-700">Type of Output</h4>
                  <div className="flex-1">
                    <CustomRadioSelect
                      control={control}
                      name="ai_module_typeOfOutput"
                      label=""
                      options={[
                        { label: "Yes", value: "Yes" },
                        { label: "No", value: "No" },
                      ]}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <CustomSingleSelect
                    control={control}
                    name="ai_module_typeOfOutput"
                    label=""
                    size="small"
                    options={ai_module_typeOfOutputOptions}
                  />
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
                      name="rtd_density"
                      label=""
                      options={[
                        { label: "Yes", value: "Yes" },
                        { label: "No", value: "No" },
                      ]}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <CustomSingleSelect
                    control={control}
                    name="rtd_density"
                    label=""
                    size="small"
                    options={rtd_densityOptions}
                  />
                </div>
              </div>
              <div className="flex flex-1 items-center gap-2">
                <div className="flex items-center gap-4">
                  <h4 className="text-sm font-semibold text-slate-700">Type of Input</h4>
                  <div className="flex-1">
                    <CustomRadioSelect
                      control={control}
                      name="rtd_typeOfInput"
                      label=""
                      options={[
                        { label: "Yes", value: "Yes" },
                        { label: "No", value: "No" },
                      ]}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <CustomSingleSelect
                    control={control}
                    name="rtd_typeOfInput"
                    label=""
                    size="small"
                    options={rtd_typeOfInputOptions}
                  />
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
                      name="ao_module_density"
                      label=""
                      options={[
                        { label: "Yes", value: "Yes" },
                        { label: "No", value: "No" },
                      ]}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <CustomSingleSelect
                    control={control}
                    name="ao_module_density"
                    label=""
                    size="small"
                    options={ao_module_densityOptions}
                  />
                </div>
              </div>
              <div className="flex flex-1 items-center gap-2">
                <div className="flex items-center gap-4">
                  <h4 className="text-sm font-semibold text-slate-700">Type of Output</h4>
                  <div className="flex-1">
                    <CustomRadioSelect
                      control={control}
                      name="ao_module_typeOfOutput"
                      label=""
                      options={[
                        { label: "Yes", value: "Yes" },
                        { label: "No", value: "No" },
                      ]}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <CustomSingleSelect
                    control={control}
                    name="ao_module_typeOfOutput"
                    label=""
                    size="small"
                    options={ao_module_typeOfOutputOptions}
                  />
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
        <Divider />

        <Divider>
          <span className="font-bold text-slate-700">PLC Spare</span>
        </Divider>

        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="io_count"
              label="IO Count"
              options={io_countOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="plc_spare_memoty"
              label="Memory"
              options={plc_spare_memotyOptions}
              size="small"
            />
          </div>
        </div>

        <Divider>
          <span className="font-bold text-slate-700">Human Interface Device</span>
        </Divider>

        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect control={control} name="es_nos" label="ES (NOs)" options={es_nosOptions} size="small" />
          </div>
          <div className="flex-1">
            <CustomSingleSelect control={control} name="os_nos" label="OS (NOs)" options={os_nosOptions} size="small" />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="hmi_nos"
              label="HMI (NOs)"
              options={hmi_nosOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="hmi_size_in_inch"
              label="HMI Size in Inch"
              options={hmi_size_in_inchOptions}
              size="small"
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Software</span>
        </Divider>

        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="scada_development_lic"
              label="SCADA Development License (NOs)"
              options={scada_development_licOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="scada_runtime_lic"
              label="SCADA Runtime License (NOs)"
              options={scada_runtime_licOptions}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="hmi_development_lic"
              label="HMI Development License (NOs)"
              options={hmi_development_licOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="plc_programming_lic"
              label="PLC Programming License Software"
              options={plc_programming_licOptions}
              size="small"
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">Engineering/Operating SCADA Station</span>
        </Divider>

        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="eo_system_hardware"
              label="System Hardware"
              options={eo_system_hardwareOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="eo_commercial_grade_pc"
              label="Commercial Grade PC"
              options={eo_commercial_grade_pcOptions}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="eo_monitor_size"
              label="Monitor Size"
              options={eo_monitor_sizeOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="eo_windows_os"
              label="Window Operating System,Microsoft Office, Anti Virus ( 3 Year) License, Quantity As Per ES & OS"
              options={eo_windows_osOptions}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="eo_printer_cc"
              label="Printer with Suitable Communication Cable"
              options={eo_printer_ccOptions}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="eo_printer_qty"
              label="Printer - Qty"
              options={eo_printer_qtyOptions}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="eo_printer_table"
              label="Printer Table"
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="eo_furniture_console"
              label="Furniture/Console of Computer/SCADA Station (ES/OS)"
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="eo_communication_cable"
              label="Communication Cable & Hardware Between PLC & SCADA PC"
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="eo_communication_cable2"
              label="Communication Cable & Hardware Between PLC & Third Party"
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="eo_mandatory_spare"
              label="Mandatory Spares"
              size="small"
            />
          </div>
          <div className="flex-1"></div>
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
