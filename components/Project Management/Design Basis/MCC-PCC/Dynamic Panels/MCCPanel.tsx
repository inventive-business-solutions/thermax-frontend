import { getData, updateData, createData } from "@/actions/crud-actions";
import CustomCheckboxInput from "@/components/FormInputs/CustomCheckbox";
import CustomTextInput from "@/components/FormInputs/CustomInput";
import CustomRadioSelect from "@/components/FormInputs/CustomRadioSelect";
import CustomSingleSelect from "@/components/FormInputs/CustomSingleSelect";
import CustomTextAreaInput from "@/components/FormInputs/CustomTextArea";
import {
  MCC_PANEL,
  PROJECT_INFO_API,
  PROJECT_API,
} from "@/configs/api-endpoints";
import { HEATING, WWS_SPG } from "@/configs/constants";
import { useGetData } from "@/hooks/useCRUD";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, message, Skeleton } from "antd"; // Import Select for dropdown
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { mccPanelValidationSchema } from "../schemas";
import useMCCPCCPanelDropdowns from "./MCCPCCPanelDropdown";

const getDefaultValues = (
  projectMetadata: any,
  projectInfo: any,
  mccPanelData: any
) => {
  return {
    incomer_ampere: mccPanelData?.incomer_ampere || "1000",
    led_type_other_input: mccPanelData?.led_type_other_input || "NA",
    incomer_pole: mccPanelData?.incomer_pole || "3",
    incomer_type: mccPanelData?.incomer_type || "SFU",
    incomer_above_ampere: mccPanelData?.incomer_above_ampere || "1001",
    incomer_above_pole: mccPanelData?.incomer_above_pole || "4",
    incomer_above_type: mccPanelData?.incomer_above_type || "SFU",
    is_under_or_over_voltage_selected:
      mccPanelData?.is_under_or_over_voltage_selected?.toString() || "1",
    is_other_selected: mccPanelData?.is_other_selected?.toString() || "1",
    is_lsig_selected: mccPanelData?.is_lsig_selected?.toString() || "1",
    is_lsi_selected: mccPanelData?.is_lsi_selected || "1",
    is_neural_link_with_disconnect_facility_selected:
      mccPanelData?.is_neural_link_with_disconnect_facility_selected || "1",
    is_led_type_lamp_selected: mccPanelData?.is_led_type_lamp_selected || "1",
    is_blue_cb_spring_charge_selected:
      mccPanelData?.is_blue_cb_spring_charge_selected?.toString() || "0",
    is_red_cb_in_service: mccPanelData?.is_red_cb_in_service?.toString() || "0",
    is_white_healthy_trip_circuit_selected:
      mccPanelData?.is_white_healthy_trip_circuit_selected?.toString() || "0",
    current_transformer_coating:
      mccPanelData?.current_transformer_coating || "Cast Resin",
    control_transformer_coating:
      mccPanelData?.current_transformer_coating || "Cast Resin",
    control_transformer_configuration:
      mccPanelData?.control_transformer_configuration || "Single",
    current_transformer_number:
      mccPanelData?.current_transformer_number || "One",
    alarm_annunciator: mccPanelData?.alarm_annunciator || "Applicable",
    mi_analog: mccPanelData?.mi_analog || "Ammeter",
    mi_digital: mccPanelData?.mi_digital || "Multifunction meter",
    mi_communication_protocol:
      mccPanelData?.mi_communication_protocol || "Ethernet",
    ga_moc_material: mccPanelData?.ga_moc_material || "Aluminium",
    ga_moc_thickness_door: mccPanelData?.ga_moc_thickness_door || "1.6",
    ga_moc_thickness_covers: mccPanelData?.ga_moc_thickness_covers || "1.6",
    ga_mcc_compartmental:
      mccPanelData?.ga_mcc_compartmental || "Form-I A (Non Compartmental)",
    ga_mcc_construction_front_type:
      mccPanelData?.ga_mcc_construction_front_type || "Single Front",
    ga_mcc_construction_drawout_type:
      mccPanelData?.ga_mcc_construction_drawout_type || "Drawout Type",
    ga_mcc_construction_type:
      mccPanelData?.ga_mcc_construction_type || "Intelligent",
    busbar_material_of_construction:
      mccPanelData?.busbar_material_of_construction || "Aluminium",
    ga_current_density: mccPanelData?.ga_current_density || "0.8 A/Sq. mm",
    ga_panel_mounting_frame:
      mccPanelData?.ga_panel_mounting_frame || "Base Frame",
    ga_panel_mounting_height: mccPanelData?.ga_panel_mounting_height || "100",
    is_marshalling_section_selected:
      mccPanelData?.is_marshalling_section_selected || "1",
    is_cable_alley_section_selected:
      mccPanelData?.is_cable_alley_section_selected || "1",
    is_power_and_bus_separation_section_selected:
      mccPanelData?.is_power_and_bus_separation_section_selected || "1",
    is_both_side_extension_section_selected:
      mccPanelData?.is_both_side_extension_section_selected || "1",
    ga_gland_plate_3mm_drill_type:
      mccPanelData?.ga_gland_plate_3mm_drill_type || "Drilled",
    ga_gland_plate_3mm_attachment_type:
      mccPanelData?.ga_gland_plate_3mm_attachment_type || "Detachable",
    ga_busbar_chamber_position:
      mccPanelData?.ga_busbar_chamber_position || "Top",
    ga_power_and_control_busbar_separation:
      mccPanelData?.ga_power_and_control_busbar_separation || "FRP",
    ga_enclosure_protection_degree:
      mccPanelData?.ga_enclosure_protection_degree || "IP65",
    ga_cable_entry_position: mccPanelData?.ga_cable_entry_position || "Bottom",
    ppc_painting_standards: mccPanelData?.ppc_painting_standards || "OEM",
    ppc_interior_and_exterior_paint_shade:
      mccPanelData?.ppc_interior_and_exterior_paint_shade || "RAL 7035",
    ppc_component_mounting_plate_paint_shade:
      mccPanelData?.ppc_component_mounting_plate_paint_shade || "RAL 7035",
    ppc_base_frame_paint_shade:
      mccPanelData?.ppc_base_frame_paint_shade || "Black",
    ppc_minimum_coating_thickness:
      mccPanelData?.ppc_minimum_coating_thickness ||
      "As per Client Specification",
    ppc_pretreatment_panel_standard:
      mccPanelData?.ppc_pretreatment_panel_standard ||
      "OEM Standard for pretreatment",
    vfd_auto_manual_selection:
      mccPanelData?.vfd_auto_manual_selection || "Applicable",
    is_punching_details_for_boiler_selected:
      mccPanelData?.is_punching_details_for_boiler_selected?.toString() || "0",
    boiler_model: mccPanelData?.boiler_model || "NA",
    boiler_fuel: mccPanelData?.boiler_fuel || "NA",
    boiler_year: mccPanelData?.boiler_year || "NA",
    boiler_power_supply_vac:
      mccPanelData?.boiler_power_supply_vac || projectInfo?.main_supply_lv,
    boiler_power_supply_phase:
      mccPanelData?.boiler_power_supply_phase ||
      projectInfo?.main_supply_lv_phase,
    boiler_power_supply_frequency:
      mccPanelData?.boiler_power_supply_frequency || projectInfo?.frequency,
    boiler_control_supply_vac:
      mccPanelData?.boiler_control_supply_vac || projectInfo?.control_supply,
    boiler_control_supply_phase:
      mccPanelData?.boiler_control_supply_phase ||
      projectInfo?.control_supply_phase,
    boiler_control_supply_frequency:
      mccPanelData?.boiler_control_supply_frequency || projectInfo?.frequency,
    boiler_evaporation: mccPanelData?.boiler_evaporation || "NA",
    boiler_output: mccPanelData?.boiler_output || "NA",
    boiler_connected_load: mccPanelData?.boiler_connected_load || "NA",
    boiler_design_pressure: mccPanelData?.boiler_design_pressure || "NA",
    is_punching_details_for_heater_selected:
      mccPanelData?.is_punching_details_for_heater_selected?.toString() || "0",
    heater_model: mccPanelData?.heater_model || "NA",
    heater_fuel: mccPanelData?.heater_fuel || "NA",
    heater_year: mccPanelData?.heater_year || "NA",
    special_note: mccPanelData?.special_note || "NA",
    heater_power_supply_vac:
      mccPanelData?.heater_power_supply_vac || projectInfo?.main_supply_lv,
    heater_power_supply_phase:
      mccPanelData?.heater_power_supply_phase ||
      projectInfo?.main_supply_lv_phase,
    heater_power_supply_frequency:
      mccPanelData?.heater_power_supply_frequency || projectInfo?.frequency,
    heater_control_supply_vac:
      mccPanelData?.heater_control_supply_vac || projectInfo?.control_supply,
    heater_control_supply_phase:
      mccPanelData?.heater_control_supply_phase ||
      projectInfo?.control_supply_phase,
    heater_control_supply_frequency:
      mccPanelData?.heater_control_supply_frequency || projectInfo?.frequency,
    heater_evaporation: mccPanelData?.heater_evaporation || "NA",
    heater_output: mccPanelData?.heater_output || "NA",
    heater_connected_load: mccPanelData?.heater_connected_load || "NA",
    heater_temperature: mccPanelData?.heater_temperature || "NA",
    spg_name_plate_unit_name: mccPanelData?.spg_name_plate_unit_name || "NA",
    spg_name_plate_capacity: mccPanelData?.spg_name_plate_capacity || "NA",
    spg_name_plate_manufacturing_year:
      mccPanelData?.spg_name_plate_manufacturing_year || "NA",
    spg_name_plate_weight: mccPanelData?.spg_name_plate_weight || "NA",
    spg_name_plate_oc_number:
      mccPanelData?.spg_name_plate_oc_number ||
      projectMetadata?.project_oc_number,
    spg_name_plate_part_code: mccPanelData?.spg_name_plate_part_code || "NA",
    is_spg_applicable: mccPanelData?.is_spg_applicable?.toString() || "0",
  };
};

const MCCPanel = ({
  revision_id,
  panel_id,
}: {
  revision_id: string;
  panel_id: string;
}) => {
  const params = useParams();
  const project_id = params.project_id;

  const { data: mccPanelData, isLoading: isMccPanelLoading } = useGetData(
    `${MCC_PANEL}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"], ["panel_id", "=", "${panel_id}"]]`
  );

  const getProjectInfoUrl = `${PROJECT_INFO_API}/${project_id}`;
  const getProjectMetadataUrl = `${PROJECT_API}/${project_id}`;

  const { data: projectMetadata, isLoading: isProjectMetaDataLoading } =
    useGetData(getProjectMetadataUrl);
  const { data: projectInfo, isLoading: isProjectInfoLoading } =
    useGetData(getProjectInfoUrl);

  const [loading, setLoading] = useState(false);
  const userInfo = useCurrentUser();

  const isLoading =
    isMccPanelLoading || isProjectInfoLoading || isProjectMetaDataLoading;

  const {
    incomer_ampere_options,
    incomer_pole_options,
    incomer_type_options,
    incomer_above_ampere_options,
    incomer_above_pole_options,
    incomer_above_type_options,
    current_transformer_coating_options,
    current_transformer_number_options,
    mi_analog_options,
    mi_digital_options,
    mi_communication_protocol_options,
    ga_moc_material_options,
    ga_moc_thickness_door_options,
    ga_moc_thickness_covers_options,
    ga_mcc_compartmental_options,
    ga_mcc_construction_front_type_options,
    ga_mcc_construction_drawout_type_options,
    ga_mcc_construction_type_options,
    ga_current_density_options,
    ga_panel_mounting_frame_options,
    ga_panel_mounting_height_options,
    ga_gland_plate_3mm_drill_type_options,
    ga_gland_plate_3mm_attachment_type_options,
    ga_busbar_chamber_position_options,
    ga_power_and_control_busbar_separation_options,
    ga_enclosure_protection_degree_options,
    ga_cable_entry_position_options,
    ppc_painting_standards_options,
    ppc_interior_and_exterior_paint_shade_options,
    ppc_component_mounting_plate_paint_shade_options,
    control_transformer_configuration_options,
    ppc_base_frame_paint_shade_options,
    ppc_minimum_coating_thickness_options,
    ppc_pretreatment_panel_standard_options,
  } = useMCCPCCPanelDropdowns();

  const aluminium_current_density_options = ga_current_density_options.filter(
    (item: any) => item.name.startsWith("0.8")
  );
  const copper_current_density_options = ga_current_density_options?.filter(
    (item: any) => item.name.startsWith("1.2") || item.name.startsWith("1.0")
  );

  const base_frame_options = ga_panel_mounting_height_options?.filter(
    (item: any) => item.name === "100" || item.name === "75"
  );

  const extended_frame_options = ga_panel_mounting_height_options?.filter(
    (item: any) =>
      item.name === "200" || item.name === "300" || item.name === "500"
  );

  const { control, reset, watch, setValue, getValues } = useForm({
    resolver: zodResolver(mccPanelValidationSchema),
    defaultValues: getDefaultValues(
      projectMetadata,
      projectInfo,
      mccPanelData?.[0]
    ),
    mode: "onSubmit",
  });

  const currentTransformerCoating = watch("current_transformer_coating");
  useEffect(() => {
    // Check if the coating is 'NA' and set the number to 'NA'
    if (currentTransformerCoating === "NA") {
      setValue("current_transformer_number", "NA");
    }
  }, [currentTransformerCoating, setValue]);

  useEffect(() => {
    if (projectInfo && mccPanelData) {
      reset(getDefaultValues(projectMetadata, projectInfo, mccPanelData[0]));
    }
    // reset(getDefaultValues(projectInfo, mccPanelData?.[0]))
  }, [mccPanelData, projectInfo, projectMetadata, reset]);

  const incomer_ampere_controlled = watch("incomer_ampere");
  const incomer_type_controlled = watch("incomer_type");
  const incomer_above_type_controlled = watch("incomer_above_type");
  const current_transformer_coating_Controlled = watch(
    "current_transformer_coating"
  );
  const ga_current_density_controlled = watch(
    "busbar_material_of_construction"
  );
  const ga_panel_mounting_frame_controlled = watch("ga_panel_mounting_frame");
  const control_transformer_coating_controlled = watch(
    "control_transformer_coating"
  );

  useEffect(() => {
    if (control_transformer_coating_controlled === "NA") {
      setValue("control_transformer_configuration", "NA");
    }
  }, [control_transformer_coating_controlled, setValue]);

  useEffect(() => {
    if (ga_panel_mounting_frame_controlled !== "Base Frame") {
      setValue("ga_panel_mounting_height", "200");
    } else {
      setValue("ga_panel_mounting_height", "100");
    }
  }, [
    ga_panel_mounting_frame_controlled,
    ga_panel_mounting_height_options,
    setValue,
  ]);

  useEffect(() => {
    if (ga_current_density_controlled === "Aluminium") {
      setValue("ga_current_density", "0.8 A/Sq. mm");
    } else {
      setValue("ga_current_density", "1.0 A/Sq. mm");
    }
  }, [ga_current_density_controlled, ga_current_density_options, setValue]);

  useEffect(() => {
    if (current_transformer_coating_Controlled === "NA") {
      setValue("current_transformer_number", "NA");
    }
  }, [current_transformer_coating_Controlled, setValue]);

  // to control the checkboxes

  useEffect(() => {
    if (
      incomer_type_controlled === "EDO ACB" ||
      incomer_type_controlled === "MDO ACB" ||
      incomer_type_controlled === "EF ACB" ||
      incomer_type_controlled === "MF ACB" ||
      incomer_above_type_controlled === "EDO ACB" ||
      incomer_above_type_controlled === "MDO ACB" ||
      incomer_above_type_controlled === "EF ACB" ||
      incomer_above_type_controlled === "MF ACB"
    ) {
      setValue("is_blue_cb_spring_charge_selected", 1);
      setValue("is_red_cb_in_service", 1);
      setValue("is_white_healthy_trip_circuit_selected", 1);
    }
  }, [incomer_type_controlled, incomer_above_type_controlled, setValue]);

  useEffect(() => {
    if (incomer_ampere_controlled === "1000") {
      setValue("incomer_above_ampere", "1001");
    } else if (incomer_ampere_controlled === "400") {
      setValue("incomer_above_ampere", "401");
    } else if (incomer_ampere_controlled === "630") {
      setValue("incomer_above_ampere", "631");
    } else {
      setValue("incomer_above_ampere", "801");
    }
  }, [incomer_ampere_controlled, setValue]);

  const handleError = (error: any) => {
    try {
      const errorObj = JSON.parse(error?.message) as any;
      message?.error(errorObj?.message);
    } catch (parseError) {
      console.error(parseError);
      message?.error(error?.message || "An unknown error occured");
    }
  };

  const onSubmit = useCallback(async () => {
    setLoading(true);
    try {
      let data = getValues();
      const mccPanelData = await getData(
        `${MCC_PANEL}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"], ["panel_id", "=", "${panel_id}"]]`
      );

      if (mccPanelData && mccPanelData.length > 0) {
        await updateData(`${MCC_PANEL}/${mccPanelData[0].name}`, false, data);
        message.success("Panel data updated successfully");
      } else {
        const combined_Data = {
          ...data,
          revision_id,
          panel_id,
        };

        data = { ...combined_Data };
        // data["revision_id"] = revision_id
        // data["panel_id"] = panel_id
        await createData(MCC_PANEL, false, data);
        message.success("Panel data created successfully");
      }
    } catch (error) {
      console.error("error: ", error);
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [revision_id, getValues, panel_id]);

  if (isLoading) {
    return (
      <div>
        <Skeleton active paragraph={{ rows: 8 }} />
      </div>
    );
  }

  return (
    <>
      <Divider>
        <span className="font-bold text-slate-700">Selection Details</span>
      </Divider>
      <form onSubmit={onSubmit} className="flex flex-col gap-2 px-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <h4 className="flex-1 text-sm font-semibold text-slate-700">
              Incomer
            </h4>
            <div className="text-xs font-semibold text-blue-500">
              Upto and including
            </div>
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="incomer_ampere"
              label="Ampere"
              options={incomer_ampere_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="incomer_pole"
              label="Pole"
              options={incomer_pole_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="incomer_type"
              label="Type"
              options={incomer_type_options}
              size="small"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <h4 className="flex-1 text-sm font-semibold text-slate-700">
              Incomer Above
            </h4>
            <div className="text-xs font-semibold text-blue-500">
              Above and including
            </div>
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="incomer_above_ampere"
              label="Ampere"
              options={incomer_above_ampere_options}
              disabled={true}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="incomer_above_pole"
              label="Pole"
              options={incomer_above_pole_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="incomer_above_type"
              label="Type"
              options={incomer_above_type_options}
              size="small"
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <div className="">
            <CustomCheckboxInput
              control={control}
              name="is_under_or_over_voltage_selected"
              label="Under / Over Voltage"
            />
          </div>
          <div className="">
            <CustomCheckboxInput
              control={control}
              name="is_lsig_selected"
              label="LSIG"
            />
          </div>
          <div className="">
            <CustomCheckboxInput
              control={control}
              name="is_lsi_selected"
              label="LSI"
            />
          </div>
          <div className="">
            <CustomCheckboxInput
              control={control}
              name="is_neural_link_with_disconnect_facility_selected"
              label="Neutral Link With Disconnect Facility"
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex-1">
            {/* <CustomRadioSelect
              control={control}
              name="is_led_type_lamp_selected"
              label="Indication (LED Type Lamp)"
              options={[
                { label: "ON", value: "ON" },
                { label: "OFF", value: "OFF" },
                { label: "Other", value: "Other" },
              ]}
            /> */}
            <CustomRadioSelect
              control={control}
              name="is_led_type_lamp_selected"
              label="Indication (LED Type Lamp)"
              options={[
                { label: "ON", value: 1 },
                { label: "OFF", value: 0 },
              ]}
            />
            <CustomCheckboxInput
              control={control}
              name="is_other_selected"
              label="Other"
            />
          </div>
          {watch("is_other_selected") && (
            <div className="flex-1">
              <CustomTextInput
                control={control}
                name="led_type_other_input"
                label=""
              />
            </div>
          )}
          <div className="flex-1">
            <CustomCheckboxInput
              control={control}
              name="is_blue_cb_spring_charge_selected"
              label="CB Spring Charge (Blue)"
            />
          </div>
          <div className="flex-1">
            <CustomCheckboxInput
              control={control}
              name="is_red_cb_in_service"
              label="CB in Service (Red)"
            />
          </div>
          <div className="flex-1">
            <CustomCheckboxInput
              control={control}
              name="is_white_healthy_trip_circuit_selected"
              label="Trip Circuit Healthy (White)"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="current_transformer_coating"
              label="Current Transformer Coating"
              options={current_transformer_coating_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="current_transformer_number"
              label="Current Transformer Quantity"
              options={current_transformer_number_options}
              size="small"
              disabled={currentTransformerCoating === "NA"}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="control_transformer_coating"
              label="Control Transformer Coating"
              options={current_transformer_coating_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="control_transformer_configuration"
              label="Control Transformer Configuration"
              options={control_transformer_configuration_options}
              disabled={control_transformer_coating_controlled === "NA"}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="alarm_annunciator"
              label="Alarm Annunciator"
              options={[
                { label: "Applicable", value: "Applicable" },
                { label: "Not Applicable", value: "Not Applicable" },
              ]}
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">
            Metering Instruments for Incomer
          </span>
        </Divider>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="mi_analog"
              label="Analog"
              options={mi_analog_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="mi_digital"
              label="Digital"
              options={mi_digital_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="mi_communication_protocol"
              label="Communication Protocol"
              options={mi_communication_protocol_options}
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
              name="ga_moc_material"
              label="MOC"
              options={ga_moc_material_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_moc_thickness_door"
              label="MOC Thickness (Door & Component mounting plate thickness in mm)"
              options={ga_moc_thickness_door_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_moc_thickness_covers"
              label="MOC Thickness (Top & Side covers thickness in mm)"
              options={ga_moc_thickness_covers_options}
              size="small"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_mcc_compartmental"
              label="MCC Compartmentalization"
              options={ga_mcc_compartmental_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_mcc_construction_front_type"
              label="MCC Front Type"
              options={ga_mcc_construction_front_type_options}
              size="small"
            />
          </div>

          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_mcc_construction_drawout_type"
              label="MCC Drawout Type"
              options={ga_mcc_construction_drawout_type_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_mcc_construction_type"
              label="MCC Construction Type"
              options={ga_mcc_construction_type_options}
              size="small"
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="busbar_material_of_construction"
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
              name="ga_current_density"
              label="Current Density"
              options={
                watch("busbar_material_of_construction") === "Aluminium"
                  ? aluminium_current_density_options
                  : copper_current_density_options
              }
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_panel_mounting_frame"
              label="Panel Mounting"
              options={ga_panel_mounting_frame_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_panel_mounting_height"
              label="Height of Base Frame (mm)"
              options={
                watch("ga_panel_mounting_frame") === "Base Frame"
                  ? base_frame_options
                  : extended_frame_options
              }
              size="small"
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <h4 className="mr-2 font-semibold text-slate-700">Sections</h4>
          <div className="">
            <CustomCheckboxInput
              control={control}
              name="is_marshalling_section_selected"
              label="Marshalling Section"
            />
          </div>
          <div className="">
            <CustomCheckboxInput
              control={control}
              name="is_cable_alley_section_selected"
              label="Cable Alley Section"
            />
          </div>
          <div className="">
            <CustomCheckboxInput
              control={control}
              name="is_power_and_bus_separation_section_selected"
              label="Separation Between Power & Control Bus"
            />
          </div>
          <div className="">
            <CustomCheckboxInput
              control={control}
              name="is_both_side_extension_section_selected"
              label="Extentional On Both Sides"
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_gland_plate_3mm_drill_type"
              label="Gland Plate (3mm) Drill Type"
              options={ga_gland_plate_3mm_drill_type_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_gland_plate_3mm_attachment_type"
              label="Gland Plate (3mm) Opening Type"
              options={ga_gland_plate_3mm_attachment_type_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_busbar_chamber_position"
              label="Busbar Chamber Position"
              options={ga_busbar_chamber_position_options}
              size="small"
            />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_power_and_control_busbar_separation"
              label="Separation Between Power & Control Busbar"
              options={ga_power_and_control_busbar_separation_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_enclosure_protection_degree"
              label="Degree of Enclosure Protection"
              options={ga_enclosure_protection_degree_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ga_cable_entry_position"
              label="Cable Entry Position"
              options={ga_cable_entry_position_options}
              size="small"
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">
            Painting / Powder Coating
          </span>
        </Divider>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ppc_painting_standards"
              label="Painting Standards"
              options={ppc_painting_standards_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ppc_interior_and_exterior_paint_shade"
              label="Paint Shade for Interior and Exterior"
              options={ppc_interior_and_exterior_paint_shade_options}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="ppc_component_mounting_plate_paint_shade"
              label="Paint Shade for Component Mounting Plate"
              options={ppc_component_mounting_plate_paint_shade_options}
              size="small"
            />
          </div>
        </div>
        <div className="mt-2 grid grid-cols-3 items-center gap-4">
          <div className="col-span-2">
            <CustomSingleSelect
              control={control}
              name="ppc_minimum_coating_thickness"
              label="Minimum Coating Thickness"
              options={ppc_minimum_coating_thickness_options}
              size="small"
            />
          </div>
          <div className="">
            <CustomSingleSelect
              control={control}
              name="ppc_base_frame_paint_shade"
              label="Paint Shade for Base Frame"
              options={ppc_base_frame_paint_shade_options}
              size="small"
            />
          </div>

          <div className="col-span-2">
            <CustomSingleSelect
              control={control}
              name="ppc_pretreatment_panel_standard"
              label="Standard for pretreatment Panel Shall Be Degreased And Derusted (7 Tank Pretreatment)"
              options={ppc_pretreatment_panel_standard_options}
              size="small"
            />
          </div>
        </div>
        <Divider>
          <span className="font-bold text-slate-700">VFD</span>
        </Divider>
        <div className="w-1/3 flex-1">
          <CustomRadioSelect
            control={control}
            name="vfd_auto_manual_selection"
            label="VFD Auto / Manual Selection"
            options={[
              { label: "Applicable", value: "Applicable" },
              { label: "Not Applicable", value: "Not Applicable" },
            ]}
          />
        </div>
        {userInfo?.division === HEATING && (
          <>
            <Divider>
              <span className="font-bold text-slate-700">Punching Details</span>
            </Divider>
            <div className="flex items-center gap-4">
              <h4 className="font-bold text-slate-700">
                Punching Details For Boiler
              </h4>
              <div>
                <CustomRadioSelect
                  control={control}
                  name="is_punching_details_for_boiler_selected"
                  label=""
                  options={[
                    { label: "Yes", value: "1" },
                    { label: "No", value: "0" },
                  ]}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="boiler_model"
                  label="Model"
                  disabled={
                    watch("is_punching_details_for_boiler_selected") === "0"
                  }
                />
              </div>
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="boiler_fuel"
                  label="Fuel"
                  disabled={
                    watch("is_punching_details_for_boiler_selected") === "0"
                  }
                />
              </div>
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="boiler_year"
                  label="Year"
                  disabled={
                    watch("is_punching_details_for_boiler_selected") === "0"
                  }
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="boiler_power_supply_vac"
                  label="Power Supply"
                  addonAfter={"VAC"}
                  disabled={
                    watch("is_punching_details_for_boiler_selected") === "0"
                  }
                />
              </div>
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="boiler_power_supply_phase"
                  label="Power Supply"
                  addonAfter={"Phase"}
                  disabled={
                    watch("is_punching_details_for_boiler_selected") === "0"
                  }
                />
              </div>
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="boiler_power_supply_frequency"
                  label="Power Supply"
                  addonAfter={"Hz"}
                  disabled={
                    watch("is_punching_details_for_boiler_selected") === "0"
                  }
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="boiler_control_supply_vac"
                  label="Control Supply"
                  addonAfter={"VAC"}
                  disabled={
                    watch("is_punching_details_for_boiler_selected") === "0"
                  }
                />
              </div>
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="boiler_control_supply_phase"
                  label="Control Supply"
                  addonAfter={"Phase"}
                  disabled={
                    watch("is_punching_details_for_boiler_selected") === "0"
                  }
                />
              </div>
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="boiler_control_supply_frequency"
                  label="Control Supply"
                  addonAfter={"Hz"}
                  disabled={
                    watch("is_punching_details_for_boiler_selected") === "0"
                  }
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="boiler_evaporation"
                  label="Evaporation"
                  addonAfter={"Kg/Hr"}
                  disabled={
                    watch("is_punching_details_for_boiler_selected") === "0"
                  }
                />
              </div>
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="boiler_output"
                  label="Output"
                  addonAfter={"MW"}
                  disabled={
                    watch("is_punching_details_for_boiler_selected") === "0"
                  }
                />
              </div>
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="boiler_connected_load"
                  label="Connected Load"
                  addonAfter={"KW"}
                  disabled={
                    watch("is_punching_details_for_boiler_selected") === "0"
                  }
                />
              </div>
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="boiler_design_pressure"
                  label="Design Pressure"
                  addonAfter={"Kg/cm2(g)/Bar"}
                  disabled={
                    watch("is_punching_details_for_boiler_selected") === "0"
                  }
                />
              </div>
            </div>
            <Divider />
            <div className="mt-2 flex items-center gap-4">
              <h4 className="font-bold text-slate-700">
                Punching Details For Heater
              </h4>
              <div>
                <CustomRadioSelect
                  control={control}
                  name="is_punching_details_for_heater_selected"
                  label=""
                  options={[
                    { label: "Yes", value: "1" },
                    { label: "No", value: "0" },
                  ]}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="heater_model"
                  label="Model"
                  disabled={
                    watch("is_punching_details_for_heater_selected") === "0"
                  }
                />
              </div>
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="heater_fuel"
                  defaultValue={10}
                  label="Fuel"
                  disabled={
                    watch("is_punching_details_for_heater_selected") === "0"
                  }
                />
              </div>
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="heater_year"
                  label="Year"
                  disabled={
                    watch("is_punching_details_for_heater_selected") === "0"
                  }
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="heater_power_supply_vac"
                  label="Power Supply"
                  addonAfter={"VAC"}
                  disabled={
                    watch("is_punching_details_for_heater_selected") === "0"
                  }
                />
              </div>
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="heater_power_supply_phase"
                  label="Power Supply"
                  addonAfter={"Phase"}
                  disabled={
                    watch("is_punching_details_for_heater_selected") === "0"
                  }
                />
              </div>
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="heater_power_supply_frequency"
                  label="Power Supply"
                  addonAfter={"Hz"}
                  disabled={
                    watch("is_punching_details_for_heater_selected") === "0"
                  }
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="heater_control_supply_vac"
                  label="Control Supply"
                  addonAfter={"VAC"}
                  disabled={
                    watch("is_punching_details_for_heater_selected") === "0"
                  }
                />
              </div>
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="heater_control_supply_phase"
                  label="Control Supply"
                  addonAfter={"Phase"}
                  disabled={
                    watch("is_punching_details_for_heater_selected") === "0"
                  }
                />
              </div>
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="heater_control_supply_frequency"
                  label="Control Supply"
                  addonAfter={"Hz"}
                  disabled={
                    watch("is_punching_details_for_heater_selected") === "0"
                  }
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="heater_evaporation"
                  label="Evaporation"
                  addonAfter={"Kcal/Hr"}
                  disabled={
                    watch("is_punching_details_for_heater_selected") === "0"
                  }
                />
              </div>
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="heater_output"
                  label="Output"
                  addonAfter={"MW"}
                  disabled={
                    watch("is_punching_details_for_heater_selected") === "0"
                  }
                />
              </div>
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="heater_connected_load"
                  label="Connected Load"
                  addonAfter={"KW"}
                  disabled={
                    watch("is_punching_details_for_heater_selected") === "0"
                  }
                />
              </div>
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="heater_temperature"
                  label="Temperature"
                  addonAfter={"Deg C"}
                  disabled={
                    watch("is_punching_details_for_heater_selected") === "0"
                  }
                />
              </div>
            </div>
          </>
        )}
        {userInfo?.division === WWS_SPG && (
          <>
            <Divider>
              <span className="font-bold text-slate-700">
                Name Plate Details For SPG
              </span>
              <div>
                <CustomRadioSelect
                  control={control}
                  name="is_spg_applicable"
                  label=""
                  options={[
                    { label: "Yes", value: "1" },
                    { label: "No", value: "0" },
                  ]}
                />
              </div>
            </Divider>
            <div className="flex gap-4">
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="spg_name_plate_unit_name"
                  label="Unit Name"
                  disabled={watch("is_spg_applicable") === "0"}
                />
              </div>
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="spg_name_plate_capacity"
                  label="Capacity"
                  disabled={watch("is_spg_applicable") === "0"}
                />
              </div>
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="spg_name_plate_manufacturing_year"
                  label="Year of Manufacturing"
                  disabled={watch("is_spg_applicable") === "0"}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="spg_name_plate_weight"
                  label="Weight"
                  disabled={watch("is_spg_applicable") === "0"}
                />
              </div>
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="spg_name_plate_oc_number"
                  label="OC No."
                  disabled={watch("is_spg_applicable") === "0"}
                />
              </div>
              <div className="flex-1">
                <CustomTextInput
                  control={control}
                  name="spg_name_plate_part_code"
                  label="Part Code"
                  disabled={watch("is_spg_applicable") === "0"}
                />
              </div>
            </div>
          </>
        )}

        <Divider>
          <span className="font-bold text-slate-700">Special Notes</span>
        </Divider>
        <div className="mt-4 w-full">
          <CustomTextAreaInput
            control={control}
            name="special_note"
            label="Special Notes"
            rows={4}
          />
        </div>
        <div className="mt-2 flex w-full justify-end">
          <Button type="primary" onClick={onSubmit} loading={loading}>
            Save and Next
          </Button>
        </div>
      </form>
    </>
  );
};

export default MCCPanel;
