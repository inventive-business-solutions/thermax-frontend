"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, message } from "antd";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { updateData } from "@/actions/crud-actions";
import * as zod from "zod";
import CustomTextInput from "@/components/FormInputs/CustomInput";
import CustomRadioSelect from "@/components/FormInputs/CustomRadioSelect";
import CustomSingleSelect from "@/components/FormInputs/CustomSingleSelect";
import { CABLE_TRAY_LAYOUT } from "@/configs/api-endpoints";
import { useGetData } from "@/hooks/useCRUD";
import useCableTrayDropdowns from "./CableTrayDropdown";
import { cableTrayValidationSchema } from "./schemas";
import CustomTextNumber from "@/components/FormInputs/CustomInputNumber";

const getDefaultValues = (cableTrayData: any) => {
  return {
    cable_tray_cover: cableTrayData?.cable_tray_cover || "1",
    cable_tray_moc: cableTrayData?.cable_tray_moc || "SS 304",
    cable_tray_moc_input: cableTrayData?.cable_tray_moc_input || "",
    number_of_cores: cableTrayData?.number_of_cores || "3C",
    specific_requirement:
      cableTrayData?.specific_requirement || "Fire Resistant",
    type_of_insulation: cableTrayData?.type_of_insulation || "PVC",
    color_scheme: cableTrayData?.color_scheme || "Red, Yellow, Blue",
    motor_voltage_drop_during_running:
      cableTrayData?.motor_voltage_drop_during_running || "2",
    copper_conductor: cableTrayData?.copper_conductor || "2.5",
    aluminium_conductor: cableTrayData?.aluminium_conductor || "4",
    cable_installation: cableTrayData?.cable_installation || "Air",
    motor_voltage_drop_during_starting:
      cableTrayData?.motor_voltage_drop_during_starting || "5",
    voltage_grade: cableTrayData?.voltage_grade || "11 kV",
    derating_factor: cableTrayData?.derating_factor || "2",
    gland_make: cableTrayData?.gland_make || "Comet",
    moc: cableTrayData?.moc || "SS 304",
    type_of_gland: cableTrayData?.type_of_gland || "Single Compression",
    future_space_on_trays: cableTrayData?.future_space_on_trays || "10",
    cable_placement: cableTrayData?.cable_placement || "Single Layer",
    orientation: cableTrayData?.orientation || "Layered",
    vertical_distance: cableTrayData?.vertical_distance || "3",
    horizontal_distance: cableTrayData?.horizontal_distance || "3",
    is_dry_area_selected:
      cableTrayData?.is_dry_area_selected?.toString() || "1",
    dry_area: cableTrayData?.dry_area || "SS",
    is_wet_area_selected:
      cableTrayData?.is_wet_area_selected?.toString() || "1",
    wet_area: cableTrayData?.wet_area || "FRP",
    is_pct_perforated_type_selected:
      cableTrayData?.is_pct_perforated_type_selected?.toString() || "1",
    pct_perforated_type_width:
      cableTrayData?.pct_perforated_type_width || "150",
    pct_perforated_type_max_width:
      cableTrayData?.pct_perforated_type_max_width || "150",
    pct_perforated_type_height:
      cableTrayData?.pct_perforated_type_height || "75",
    pct_perforated_type_thickness:
      cableTrayData?.pct_perforated_type_thickness || "2",
    is_pct_ladder_type_selected:
      cableTrayData?.is_pct_ladder_type_selected?.toString() || "1",
    pct_ladder_type_width: cableTrayData?.pct_ladder_type_width || "150",
    pct_ladder_type_max_width:
      cableTrayData?.pct_ladder_type_max_width || "150",
    pct_ladder_type_height: cableTrayData?.pct_ladder_type_height || "75",
    pct_ladder_type_thickness: cableTrayData?.pct_ladder_type_thickness || "2",
    is_pct_mesh_type_selected:
      cableTrayData?.is_pct_mesh_type_selected?.toString() || "1",
    pct_mesh_type_width: cableTrayData?.pct_mesh_type_width || "150",
    pct_mesh_type_max_width: cableTrayData?.pct_mesh_type_max_width || "150",
    pct_mesh_type_height: cableTrayData?.pct_mesh_type_height || "75",
    pct_mesh_type_thickness: cableTrayData?.pct_mesh_type_thickness || "2",
    is_pct_conduit_selected:
      cableTrayData?.is_pct_conduit_selected?.toString() || "1",
    pct_conduit_moc: cableTrayData?.pct_conduit_moc || "Sch 40 PVC",
    pct_conduit_size: cableTrayData?.pct_conduit_size || "1/8",
    is_cct_perforated_type_selected:
      cableTrayData?.is_cct_perforated_type_selected?.toString() || "1",
    cct_perforated_type_width:
      cableTrayData?.cct_perforated_type_width || "150",
    cct_perforated_type_max_width:
      cableTrayData?.cct_perforated_type_max_width || "150",
    cct_perforated_type_height:
      cableTrayData?.cct_perforated_type_height || "75",
    cct_perforated_type_thickness:
      cableTrayData?.cct_perforated_type_thickness || "2",
    is_cct_ladder_type_selected:
      cableTrayData?.is_cct_ladder_type_selected?.toString() || "1",
    cct_ladder_type_width: cableTrayData?.cct_ladder_type_width || "150",
    cct_ladder_type_max_width:
      cableTrayData?.cct_ladder_type_max_width || "150",
    cct_ladder_type_height: cableTrayData?.cct_ladder_type_height || "75",
    cct_ladder_type_thickness: cableTrayData?.cct_ladder_type_thickness || "2",
    is_cct_mesh_type_selected:
      cableTrayData?.is_cct_mesh_type_selected?.toString() || "1",
    cct_mesh_type_width: cableTrayData?.cct_mesh_type_width || "150",
    cct_mesh_type_max_width: cableTrayData?.cct_mesh_type_max_width || "150",
    cct_mesh_type_height: cableTrayData?.cct_mesh_type_height || "75",
    cct_mesh_type_thickness: cableTrayData?.cct_mesh_type_thickness || "2",
    is_cct_conduit_selected:
      cableTrayData?.is_cct_conduit_selected?.toString() || "1",
    cct_conduit_moc: cableTrayData?.cct_conduit_moc || "Sch 40 PVC",
    cct_conduit_size: cableTrayData?.cct_conduit_size || "1/8",
    is_sct_perforated_type_selected:
      cableTrayData?.is_sct_perforated_type_selected?.toString() || "1",
    sct_perforated_type_width:
      cableTrayData?.sct_perforated_type_width || "150",
    sct_perforated_type_max_width:
      cableTrayData?.sct_perforated_type_max_width || "150",
    sct_perforated_type_height:
      cableTrayData?.sct_perforated_type_height || "75",
    sct_perforated_type_thickness:
      cableTrayData?.sct_perforated_type_thickness || "2",
    is_sct_ladder_type_selected:
      cableTrayData?.is_sct_ladder_type_selected?.toString() || "1",
    sct_ladder_type_width: cableTrayData?.sct_ladder_type_width || "150",
    sct_ladder_type_max_width:
      cableTrayData?.sct_ladder_type_max_width || "150",
    sct_ladder_type_height: cableTrayData?.sct_ladder_type_height || "75",
    sct_ladder_type_thickness: cableTrayData?.sct_ladder_type_thickness || "2",
    is_sct_mesh_type_selected:
      cableTrayData?.is_sct_mesh_type_selected?.toString() || "1",
    sct_mesh_type_width: cableTrayData?.sct_mesh_type_width || "150",
    sct_mesh_type_max_width: cableTrayData?.sct_mesh_type_max_width || "150",
    sct_mesh_type_height: cableTrayData?.sct_mesh_type_height || "75",
    sct_mesh_type_thickness: cableTrayData?.sct_mesh_type_thickness || "2",
    is_sct_conduit_selected:
      cableTrayData?.is_sct_conduit_selected?.toString() || "1",
    sct_conduit_moc: cableTrayData?.sct_conduit_moc || "Sch 40 PVC",
    sct_conduit_size: cableTrayData?.sct_conduit_size || "1/8",
    touching_factor_air: Number(cableTrayData?.touching_factor_air) || 1,
    touching_factor_burid: Number(cableTrayData?.touching_factor_burid) || 2,
    ambient_temp_factor_air:
      Number(cableTrayData?.ambient_temp_factor_air) || 2,
    ambient_temp_factor_burid:
      Number(cableTrayData?.ambient_temp_factor_burid) || 2,
    derating_factor_air: Number(cableTrayData?.derating_factor_air) || 2,
    derating_factor_burid: Number(cableTrayData?.derating_factor_burid) || 4,
  };
};

const CableTray = ({
  revision_id,
  setActiveKey,
}: {
  revision_id: string;
  setActiveKey: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [loading, setLoading] = useState(false);

  const { data: cableTrayData } = useGetData(
    `${CABLE_TRAY_LAYOUT}?fields=["*"]&filters=[["revision_id", "=", "${revision_id}"]]`
  );
  const { control, reset, watch, setValue, handleSubmit } = useForm({
    resolver: zodResolver(cableTrayValidationSchema),
    defaultValues: getDefaultValues(cableTrayData?.[0]),
    mode: "onSubmit",
  });

  useEffect(() => {
    reset(getDefaultValues(cableTrayData?.[0]));
  }, [cableTrayData, reset]);

  const dropdown = useCableTrayDropdowns();

  const no_of_core_options = dropdown["Layout Number Of Cores"];
  const specific_requirement_options = dropdown["Layout Specific Requirement"];
  const type_of_insulation_options = dropdown["Layout Type of Insulation"];
  const color_scheme_options = dropdown["Layout Color Scheme"];
  const running_motor_voltage_drop_options =
    dropdown["Layout Running Motor Voltage Drop"];
  const copper_conductor_options = dropdown["Layout Conductor"]?.filter(
    (item: any) => !item.name.startsWith("25")
  );
  const aluminium_conductor_options = dropdown["Layout Conductor"]?.filter(
    (item: any) => !item.name.startsWith("2.5")
  );
  const starting_motor_voltage_drop_options =
    dropdown["Layout Starting Motor Voltage Drop"];
  const voltage_grade_options = dropdown["Layout Voltage Grade"];
  const gland_moc_options = dropdown["Gland MOC"];
  const type_of_gland_options = dropdown["Type Of Gland"];
  const future_space_on_trays_options = dropdown["Future Space on Trays"];
  const cable_placement_options = dropdown["Cable Placement"];
  const cable_tray_orientation_options = dropdown["Cable Tray Orientation"];
  const cable_tray_moc_options = dropdown["Cable Tray MOC"];
  const cable_tray_width_options = dropdown["Cable Tray Width"];
  const cable_tray_height_options = dropdown["Cable Tray Height"];
  const cable_tray_thickness_options = dropdown["Cable Tray Thickness"];
  const conduit_moc_options = dropdown["Conduit MOC"];
  const conduit_size_options = dropdown["Conduit Size"];

  // Define a type for the valid keys for setValue
  type SetValueKeys =
    | "number_of_cores"
    | "specific_requirement"
    | "type_of_insulation"
    | "color_scheme"
    | "motor_voltage_drop_during_running"
    | "copper_conductor"
    | "aluminium_conductor"; // Add other keys as needed

  const copper_conductor_controlled = watch("copper_conductor");

  const touching_air_controlled = watch("touching_factor_air");
  const touching_burid_controlled = watch("touching_factor_burid");
  const ambient_temp_factor_burid_controlled = watch(
    "ambient_temp_factor_burid"
  );
  const ambient_temp_factor_air_controlled = watch("ambient_temp_factor_air");
  const number_of_cores_controlled = watch("number_of_cores");
  const is_dry_area_selected_controlled = watch("is_dry_area_selected");
  const is_wet_area_selected_controlled = watch("is_wet_area_selected");

  useEffect(() => {
    if (is_dry_area_selected_controlled === "0") {
      setValue("dry_area", "NA");
    }
    if (is_wet_area_selected_controlled === "0") {
      setValue("wet_area", "NA");
    }
  }, [
    is_dry_area_selected_controlled,
    is_wet_area_selected_controlled,
    setValue,
  ]);

  useEffect(() => {
    const air_derating_factor = (
      touching_air_controlled * ambient_temp_factor_air_controlled
    ).toFixed(2);
    const burid_derating_factor = (
      touching_burid_controlled * ambient_temp_factor_burid_controlled
    ).toFixed(2);
    setValue("derating_factor_air", Number(air_derating_factor));
    setValue("derating_factor_burid", Number(burid_derating_factor));
  }, [
    ambient_temp_factor_air_controlled,
    ambient_temp_factor_burid_controlled,
    setValue,
    touching_air_controlled,
    touching_burid_controlled,
  ]);

  useEffect(() => {
    switch (copper_conductor_controlled) {
      case "2.5":
        setValue("aluminium_conductor", "4");
        break;
      case "4":
        setValue("aluminium_conductor", "6");
        break;
      case "6":
        setValue("aluminium_conductor", "10");
        break;
      case "10":
        setValue("aluminium_conductor", "16");
        break;
      case "16":
        setValue("aluminium_conductor", "25");
        break;
      case "All":
        setValue("aluminium_conductor", "NA");
        break;
      case "NA":
        setValue("aluminium_conductor", "All");
        break;

      default:
        setValue("aluminium_conductor", "4");
        break;
    }
  }, [copper_conductor_controlled, setValue]);

  useEffect(() => {
    // Create a function that safely sets values
    const updateColorScheme = (key: SetValueKeys, value: string) => {
      setValue(key, value);
    };

    // Determine the color scheme based on number_of_cores_controlled
    switch (number_of_cores_controlled) {
      case "3C":
        updateColorScheme("color_scheme", "Red, Yellow, Blue");
        break;
      case "3.5C":
        updateColorScheme("color_scheme", "Red, Yellow, Blue, Black");
        break;
      case "4C":
        updateColorScheme("color_scheme", "Brown, Black, Grey, Blue");
        break;
      default:
        break; // No action needed if no match
    }
  }, [number_of_cores_controlled, setValue]);

  const handleError = (error: any) => {
    try {
      const errorObj: any = JSON.parse(error.message);
      message.error(errorObj.message);
    } catch (parseError) {
      console.error(parseError);
      message.error(error.message || "An unknown error occurred");
    }
  };

  const onSubmit: SubmitHandler<
    zod.infer<typeof cableTrayValidationSchema>
  > = async (values: any) => {
    try {
      setLoading(true);
      await updateData(
        `${CABLE_TRAY_LAYOUT}/${cableTrayData[0].name}`,
        false,
        values
      );
      message.success("Cable Tray Updated Successfully");
      setActiveKey("2");
    } catch (error) {
      console.error("Submission error:", error);
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-4">
      <Divider>
        <span className="font-bold text-slate-700">Field Power Cable</span>
      </Divider>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="number_of_cores"
              label="Number of Cores"
              options={no_of_core_options || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="specific_requirement"
              label="Specific Requirement"
              options={specific_requirement_options || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="type_of_insulation"
              label="Type of Insulation"
              options={type_of_insulation_options || []}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="color_scheme"
              label="Color Scheme"
              options={color_scheme_options || []}
              disabled={true}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="motor_voltage_drop_during_running"
              label="Motor Voltage Drop During Running"
              options={running_motor_voltage_drop_options || []}
              size="small"
              suffixIcon={
                <>
                  <p className="text-lg font-semibold text-blue-500">%</p>
                </>
              }
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="motor_voltage_drop_during_starting"
              label="Motor Voltage Drop During Starting"
              options={starting_motor_voltage_drop_options || []}
              size="small"
              suffixIcon={
                <>
                  <p className="text-lg font-semibold  text-blue-500">%</p>
                </>
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="">
            <CustomSingleSelect
              control={control}
              name="voltage_grade"
              label="Voltage Grade"
              options={voltage_grade_options || []}
              size="small"
            />
          </div>

          <div className="">
            <CustomSingleSelect
              control={control}
              name="copper_conductor"
              label="Copper Conductor (Sq mm. including and below)"
              options={copper_conductor_options || []}
              suffixIcon={
                <>
                  <p className="text-xs font-semibold text-blue-500">Sq. mm</p>
                </>
              }
              size="small"
            />
          </div>
          <div className="">
            <CustomSingleSelect
              control={control}
              name="aluminium_conductor"
              label="Aluminium Conductor (Sq mm. including and above)"
              options={aluminium_conductor_options || []}
              suffixIcon={
                <>
                  <p className="text-xs font-semibold text-blue-500">Sq. mm</p>
                </>
              }
              size="small"
            />
          </div>
          {/* <div className="flex-1">
            <CustomTextInput control={control} name="derating_factor" label="Derating Factor" size="small" />
          </div> */}
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div className="font-semibold text-slate-700"></div>
          <div className="font-semibold text-slate-700">Air</div>
          <div className="font-semibold text-slate-700">Buried</div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <div className="font-semibold text-slate-700">Touching Factor</div>
          <div>
            <CustomTextNumber
              control={control}
              name="touching_factor_air"
              label=""
              size="small"
            />
          </div>
          <div>
            <CustomTextNumber
              control={control}
              name="touching_factor_burid"
              label=""
              size="small"
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div className="font-semibold text-slate-700">
            Ambient Temperature Factor
          </div>
          <div>
            <CustomTextNumber
              control={control}
              name="ambient_temp_factor_air"
              label=""
              size="small"
            />
          </div>
          <div>
            <CustomTextNumber
              control={control}
              name="ambient_temp_factor_burid"
              label=""
              size="small"
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div className="font-semibold text-slate-700">Derating Factor</div>
          <div>
            <CustomTextNumber
              control={control}
              disabled={true}
              name="derating_factor_air"
              label=""
              size="small"
            />
          </div>
          <div>
            <CustomTextNumber
              control={control}
              disabled={true}
              name="derating_factor_burid"
              label=""
              size="small"
            />
          </div>
        </div>
        {/* <div className="w-1/3 flex-1">
          <CustomTextInput control={control} name="derating_factor" label="Derating Factor" size="small" />
        </div> */}
      </div>
      <Divider>
        <span className="font-bold text-slate-700">Gland Details</span>
      </Divider>
      <div className="flex gap-4">
        {/* <div className="flex-1">
          <CustomSingleSelect
            control={control}
            name="gland_make"
            label="Gland Make"
            options={gland_make_options}
            size="small"
          />
        </div> */}
        <div className="flex-1">
          <CustomSingleSelect
            control={control}
            name="moc"
            label="MOC"
            options={gland_moc_options || []}
            size="small"
          />
        </div>
        <div className="flex-1">
          <CustomSingleSelect
            control={control}
            name="type_of_gland"
            label="Type of Gland"
            options={type_of_gland_options || []}
            size="small"
          />
        </div>
      </div>
      <Divider>
        <span className="font-bold text-slate-700">Cable Trays</span>
      </Divider>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomRadioSelect
              control={control}
              name="cable_tray_cover"
              label="Cable Tray Cover"
              options={[
                { label: "Yes", value: "1" },
                { label: "No", value: "0" },
              ]}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="future_space_on_trays"
              label="Future Space on Trays"
              options={future_space_on_trays_options || []}
              size="small"
              suffixIcon={
                <>
                  <p className="text-lg font-semibold text-blue-500">%</p>
                </>
              }
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="cable_placement"
              label="Cable Placement"
              options={cable_placement_options || []}
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="orientation"
              label="Orientation"
              options={cable_tray_orientation_options || []}
              size="small"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="vertical_distance"
              label="Vertical Distance"
              suffix={
                <>
                  <p className="font-semibold text-blue-500">mm</p>
                </>
              }
              size="small"
            />
          </div>
          <div className="flex-1">
            <CustomTextInput
              control={control}
              name="horizontal_distance"
              label="Horizontal Distance"
              suffix={
                <>
                  <p className="font-semibold text-blue-500">mm</p>
                </>
              }
              size="small"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-bold">Cable Tray MOC</h4>
          <div className="flex gap-4">
            <div className="w-1/2 mt-[4px]">
              <CustomSingleSelect
                control={control}
                name="cable_tray_moc"
                label=""
                options={cable_tray_moc_options || []}
              />
            </div>
            {Boolean(
              watch("cable_tray_moc") === "MS - Hot dipped Galvanised"
            ) && (
              <div className="w-1/2">
                <CustomTextInput
                  control={control}
                  name="cable_tray_moc_input"
                  label=""
                />
              </div>
            )}
            {/* <div className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-4">
                <h4 className="text-sm font-semibold text-slate-700">Wet Area</h4>

              </div>
              <div className="flex-1">
                <CustomSingleSelect
                  control={control}
                  name="wet_area"
                  label=""
                  size="small"
                  options={material_construction_wet_area_options}
                  disabled={watch("is_wet_area_selected") === "0"}
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <Divider orientation="left" orientationMargin={0}>
        <span className="text-sm font-bold text-blue-500">
          Power Cable Tray
        </span>
      </Divider>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex items-center gap-4">
            <div className="grid grid-cols-2">
              <h4 className="col-span-2 text-sm font-semibold text-slate-700">
                Perforated Type (upto below)
              </h4>
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="is_pct_perforated_type_selected"
                  label=""
                  options={[
                    { label: "Yes", value: "1" },
                    { label: "No", value: "0" },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="pct_perforated_type_width"
              label="Width"
              options={cable_tray_width_options || []}
              size="small"
              disabled={watch("is_pct_perforated_type_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="pct_perforated_type_max_width"
              label="Min. Width"
              options={cable_tray_width_options || []}
              size="small"
              disabled={watch("is_pct_perforated_type_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="pct_perforated_type_height"
              label="Height"
              options={cable_tray_height_options || []}
              size="small"
              disabled={watch("is_pct_perforated_type_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="pct_perforated_type_thickness"
              label="Thickness"
              options={cable_tray_thickness_options || []}
              size="small"
              disabled={watch("is_pct_perforated_type_selected") === "0"}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-4">
            <div className="grid grid-cols-2">
              <h4 className="col-span-2 text-sm font-semibold text-slate-700">
                Ladder Type (upto and above)
              </h4>
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="is_pct_ladder_type_selected"
                  label=""
                  options={[
                    { label: "Yes", value: "1" },
                    { label: "No", value: "0" },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="pct_ladder_type_width"
              label="Width"
              options={cable_tray_width_options || []}
              size="small"
              disabled={watch("is_pct_ladder_type_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="pct_ladder_type_max_width"
              label="Max. Width"
              options={cable_tray_width_options || []}
              size="small"
              disabled={watch("is_pct_ladder_type_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="pct_ladder_type_height"
              label="Height"
              options={cable_tray_height_options || []}
              size="small"
              disabled={watch("is_pct_ladder_type_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="pct_ladder_type_thickness"
              label="Thickness"
              options={cable_tray_thickness_options || []}
              size="small"
              disabled={watch("is_pct_ladder_type_selected") === "0"}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-4">
            <div className="grid grid-cols-2">
              <h4 className="col-span-2 text-sm font-semibold text-slate-700">
                Mesh Type (upto and above)
              </h4>
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="is_pct_mesh_type_selected"
                  label=""
                  options={[
                    { label: "Yes", value: "1" },
                    { label: "No", value: "0" },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="pct_mesh_type_width"
              label="Width"
              options={cable_tray_width_options || []}
              size="small"
              disabled={watch("is_pct_mesh_type_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="pct_mesh_type_max_width"
              label="Max. Width"
              options={cable_tray_width_options || []}
              size="small"
              disabled={watch("is_pct_mesh_type_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="pct_mesh_type_height"
              label="Height"
              options={cable_tray_height_options || []}
              size="small"
              disabled={watch("is_pct_mesh_type_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="pct_mesh_type_thickness"
              label="Thickness"
              options={cable_tray_thickness_options || []}
              size="small"
              disabled={watch("is_pct_mesh_type_selected") === "0"}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-4">
            <div className="grid grid-cols-2">
              <h4 className="col-span-2 text-sm font-semibold text-slate-700">
                Conduit
              </h4>
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="is_pct_conduit_selected"
                  label=""
                  options={[
                    { label: "Yes", value: "1" },
                    { label: "No", value: "0" },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="pct_conduit_moc"
              label="MOC"
              options={conduit_moc_options || []}
              size="small"
              disabled={watch("is_pct_conduit_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="pct_conduit_size"
              label="Size"
              options={conduit_size_options || []}
              size="small"
              disabled={watch("is_pct_conduit_selected") === "0"}
            />
          </div>
        </div>
      </div>
      <Divider orientation="left" orientationMargin={0}>
        <span className="text-sm font-bold text-blue-500">
          Control Cable Tray
        </span>
      </Divider>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex items-center gap-4">
            <div className="grid grid-cols-2">
              <h4 className="col-span-2 text-sm font-semibold text-slate-700">
                Perforated Type (upto below)
              </h4>
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="is_cct_perforated_type_selected"
                  label=""
                  options={[
                    { label: "Yes", value: "1" },
                    { label: "No", value: "0" },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="cct_perforated_type_width"
              label="Width"
              options={cable_tray_width_options || []}
              size="small"
              disabled={watch("is_cct_perforated_type_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="cct_perforated_type_max_width"
              label="Min. Width"
              options={cable_tray_width_options || []}
              size="small"
              disabled={watch("is_cct_perforated_type_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="cct_perforated_type_height"
              label="Height"
              options={cable_tray_height_options || []}
              size="small"
              disabled={watch("is_cct_perforated_type_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="cct_perforated_type_thickness"
              label="Thickness"
              options={cable_tray_thickness_options || []}
              size="small"
              disabled={watch("is_cct_perforated_type_selected") === "0"}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-4">
            <div className="grid grid-cols-2">
              <h4 className="col-span-2 text-sm font-semibold text-slate-700">
                Ladder Type (upto and above)
              </h4>
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="is_cct_ladder_type_selected"
                  label=""
                  options={[
                    { label: "Yes", value: "1" },
                    { label: "No", value: "0" },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="cct_ladder_type_width"
              label="Width"
              options={cable_tray_width_options || []}
              size="small"
              disabled={watch("is_cct_ladder_type_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="cct_ladder_type_max_width"
              label="Max. Width"
              options={cable_tray_width_options || []}
              size="small"
              disabled={watch("is_cct_ladder_type_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="cct_ladder_type_height"
              label="Height"
              options={cable_tray_height_options || []}
              size="small"
              disabled={watch("is_cct_ladder_type_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="cct_ladder_type_thickness"
              label="Thickness"
              options={cable_tray_thickness_options || []}
              size="small"
              disabled={watch("is_cct_ladder_type_selected") === "0"}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-4">
            <div className="grid grid-cols-2">
              <h4 className="col-span-2 text-sm font-semibold text-slate-700">
                Mesh Type (upto and above)
              </h4>
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="is_cct_mesh_type_selected"
                  label=""
                  options={[
                    { label: "Yes", value: "1" },
                    { label: "No", value: "0" },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="cct_mesh_type_width"
              label="Width"
              options={cable_tray_width_options || []}
              size="small"
              disabled={watch("is_cct_mesh_type_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="cct_mesh_type_max_width"
              label="Max. Width"
              options={cable_tray_width_options || []}
              size="small"
              disabled={watch("is_cct_mesh_type_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="cct_mesh_type_height"
              label="Height"
              options={cable_tray_height_options || []}
              size="small"
              disabled={watch("is_cct_mesh_type_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="cct_mesh_type_thickness"
              label="Thickness"
              options={cable_tray_thickness_options || []}
              size="small"
              disabled={watch("is_cct_mesh_type_selected") === "0"}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-4">
            <div className="grid grid-cols-2">
              <h4 className="col-span-2 text-sm font-semibold text-slate-700">
                Conduit
              </h4>
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="is_cct_conduit_selected"
                  label=""
                  options={[
                    { label: "Yes", value: "1" },
                    { label: "No", value: "0" },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="cct_conduit_moc"
              label="MOC"
              options={conduit_moc_options || []}
              size="small"
              disabled={watch("is_cct_conduit_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="cct_conduit_size"
              label="Size"
              options={conduit_size_options || []}
              size="small"
              disabled={watch("is_cct_conduit_selected") === "0"}
            />
          </div>
        </div>
      </div>
      <Divider orientation="left" orientationMargin={0}>
        <span className="text-sm font-bold text-blue-500">
          Signal Cable Tray
        </span>
      </Divider>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex items-center gap-4">
            <div className="grid grid-cols-2">
              <h4 className="col-span-2 text-sm font-semibold text-slate-700">
                Perforated Type (upto below)
              </h4>
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="is_sct_perforated_type_selected"
                  label=""
                  options={[
                    { label: "Yes", value: "1" },
                    { label: "No", value: "0" },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="sct_perforated_type_width"
              label="Width"
              options={cable_tray_width_options || []}
              size="small"
              disabled={watch("is_sct_perforated_type_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="sct_perforated_type_max_width"
              label="Min. Width"
              options={cable_tray_width_options || []}
              size="small"
              disabled={watch("is_sct_perforated_type_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="sct_perforated_type_height"
              label="Height"
              options={cable_tray_height_options || []}
              size="small"
              disabled={watch("is_sct_perforated_type_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="sct_perforated_type_thickness"
              label="Thickness"
              options={cable_tray_thickness_options || []}
              size="small"
              disabled={watch("is_sct_perforated_type_selected") === "0"}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-4">
            <div className="grid grid-cols-2">
              <h4 className="col-span-2 text-sm font-semibold text-slate-700">
                Ladder Type (upto and above)
              </h4>
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="is_sct_ladder_type_selected"
                  label=""
                  options={[
                    { label: "Yes", value: "1" },
                    { label: "No", value: "0" },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="sct_ladder_type_width"
              label="Width"
              options={cable_tray_width_options || []}
              size="small"
              disabled={watch("is_sct_ladder_type_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="sct_ladder_type_max_width"
              label="Max. Width"
              options={cable_tray_width_options || []}
              size="small"
              disabled={watch("is_pct_perforated_type_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="sct_ladder_type_height"
              label="Height"
              options={cable_tray_height_options || []}
              size="small"
              disabled={watch("is_pct_perforated_type_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="sct_ladder_type_thickness"
              label="Thickness"
              options={cable_tray_thickness_options || []}
              size="small"
              disabled={watch("is_sct_ladder_type_selected") === "0"}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-4">
            <div className="grid grid-cols-2">
              <h4 className="col-span-2 text-sm font-semibold text-slate-700">
                Mesh Type (upto and above)
              </h4>
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="is_sct_mesh_type_selected"
                  label=""
                  options={[
                    { label: "Yes", value: "1" },
                    { label: "No", value: "0" },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="sct_mesh_type_width"
              label="Width"
              options={cable_tray_width_options || []}
              size="small"
              disabled={watch("is_sct_mesh_type_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="sct_mesh_type_max_width"
              label="Max. Width"
              options={cable_tray_width_options || []}
              size="small"
              disabled={watch("is_sct_mesh_type_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="sct_mesh_type_height"
              label="Height"
              options={cable_tray_height_options || []}
              size="small"
              disabled={watch("is_sct_mesh_type_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="sct_mesh_type_thickness"
              label="Thickness"
              options={cable_tray_thickness_options || []}
              size="small"
              disabled={watch("is_sct_mesh_type_selected") === "0"}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-4">
            <div className="grid grid-cols-2">
              <h4 className="col-span-2 text-sm font-semibold text-slate-700">
                Conduit
              </h4>
              <div className="flex-1">
                <CustomRadioSelect
                  control={control}
                  name="is_sct_conduit_selected"
                  label=""
                  options={[
                    { label: "Yes", value: "1" },
                    { label: "No", value: "0" },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="sct_conduit_moc"
              label="MOC"
              options={conduit_moc_options || []}
              size="small"
              disabled={watch("is_sct_conduit_selected") === "0"}
            />
          </div>
          <div className="flex-1">
            <CustomSingleSelect
              control={control}
              name="sct_conduit_size"
              label="Size"
              options={conduit_size_options || []}
              size="small"
              disabled={watch("is_sct_conduit_selected") === "0"}
            />
          </div>
        </div>
      </div>

      <div className="mt-2 flex w-full justify-end">
        <Button type="primary" htmlType="submit" loading={loading}>
          Save and Next
        </Button>
      </div>
    </form>
  );
};

export default CableTray;
