"use client";

import {
  LAYOUT_NUMBER_OF_CORES,
  LAYOUT_SPECIFIC_REQUIREMENT,
  LAYOUT_TYPE_OF_INSULATION,
  LAYOUT_COLOR_SCHEME,
  LAYOUT_RUNNING_MOTOR_VOLTAGE_DROP,
  LAYOUT_CONDUCTOR,
  LAYOUT_CABLE_INSTALLATION,
  LAYOUT_STARTING_MOTOR_VOLTAGE_DROP,
  LAYOUT_VOLTAGE_GRADE,
  GLAND_MAKE,
  GLAND_MOC,
  TYPE_OF_GLAND,
  FUTURE_SPACE_ON_TRAYS,
  CABLE_PLACEMENT,
  CABLE_TRAY_ORIENTATION,
  MATERIAL_CONSTRUCTION_DRY_AREA,
  MATERIAL_CONSTRUCTION_WET_AREA,
  CABLE_TRAY_WIDTH,
  CABLE_TRAY_HEIGHT,
  CABLE_TRAY_THICKNESS,
  CONDUIT_MOC,
  CONDUIT_SIZE,
} from "@/configs/api-endpoints";
import { useDropdownOptions } from "@/hooks/useDropdownOptions";
import { sortDropdownOptions, moveNAtoEnd } from "@/utils/helpers";

export default function useCableTrayDropdowns() {
  const { dropdownOptions: no_of_core_options } = useDropdownOptions(
    `${LAYOUT_NUMBER_OF_CORES}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: specific_requirement_options } = useDropdownOptions(
    `${LAYOUT_SPECIFIC_REQUIREMENT}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: type_of_insulation_options } = useDropdownOptions(
    `${LAYOUT_TYPE_OF_INSULATION}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: color_scheme_options } = useDropdownOptions(
    `${LAYOUT_COLOR_SCHEME}?fields=["*"]`,
    "name"
  );
  let { dropdownOptions: running_motor_voltage_drop_options } =
    useDropdownOptions(
      `${LAYOUT_RUNNING_MOTOR_VOLTAGE_DROP}?fields=["*"]`,
      "name"
    );
  running_motor_voltage_drop_options = sortDropdownOptions(
    running_motor_voltage_drop_options
  );
  const { dropdownOptions: conductor_options } = useDropdownOptions(
    `${LAYOUT_CONDUCTOR}?fields=["*"]`,
    "name"
  );
  // conductor_options = sortDropdownOptions(conductor_options)
  let copper_conductor_options = conductor_options?.filter(
    (item: any) => !item.name.startsWith("25")
  );
  copper_conductor_options = sortDropdownOptions(copper_conductor_options);

  let aluminium_conductor_options = conductor_options?.filter(
    (item: any) => !item.name.startsWith("2.5")
  );
  aluminium_conductor_options = sortDropdownOptions(
    aluminium_conductor_options
  );

  const { dropdownOptions: cable_installation_options } = useDropdownOptions(
    `${LAYOUT_CABLE_INSTALLATION}?fields=["*"]`,
    "name"
  );
  let { dropdownOptions: starting_motor_voltage_drop_options } =
    useDropdownOptions(
      `${LAYOUT_STARTING_MOTOR_VOLTAGE_DROP}?fields=["*"]`,
      "name"
    );
  starting_motor_voltage_drop_options = sortDropdownOptions(
    starting_motor_voltage_drop_options
  );

  const { dropdownOptions: voltage_grade_options } = useDropdownOptions(
    `${LAYOUT_VOLTAGE_GRADE}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: gland_make_options } = useDropdownOptions(
    `${GLAND_MAKE}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: gland_moc_options } = useDropdownOptions(
    `${GLAND_MOC}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: type_of_gland_options } = useDropdownOptions(
    `${TYPE_OF_GLAND}?fields=["*"]`,
    "name"
  );
  let { dropdownOptions: future_space_on_trays_options } = useDropdownOptions(
    `${FUTURE_SPACE_ON_TRAYS}?fields=["*"]`,
    "name"
  );
  future_space_on_trays_options = sortDropdownOptions(
    future_space_on_trays_options
  );
  const { dropdownOptions: cable_placement_options } = useDropdownOptions(
    `${CABLE_PLACEMENT}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: cable_tray_orientation_options } =
    useDropdownOptions(`${CABLE_TRAY_ORIENTATION}?fields=["*"]`, "name");
  let { dropdownOptions: material_construction_dry_area_options } =
    useDropdownOptions(
      `${MATERIAL_CONSTRUCTION_DRY_AREA}?fields=["*"]`,
      "name"
    );
  material_construction_dry_area_options = moveNAtoEnd(
    material_construction_dry_area_options
  );
  let { dropdownOptions: material_construction_wet_area_options } =
    useDropdownOptions(
      `${MATERIAL_CONSTRUCTION_WET_AREA}?fields=["*"]`,
      "name"
    );
  material_construction_wet_area_options = moveNAtoEnd(
    material_construction_wet_area_options
  );
  let { dropdownOptions: cable_tray_width_options } = useDropdownOptions(
    `${CABLE_TRAY_WIDTH}?fields=["*"]`,
    "name"
  );
  cable_tray_width_options = sortDropdownOptions(cable_tray_width_options);
  let { dropdownOptions: cable_tray_height_options } = useDropdownOptions(
    `${CABLE_TRAY_HEIGHT}?fields=["*"]`,
    "name"
  );
  cable_tray_height_options = sortDropdownOptions(cable_tray_height_options);
  let { dropdownOptions: cable_tray_thickness_options } = useDropdownOptions(
    `${CABLE_TRAY_THICKNESS}?fields=["*"]`,
    "name"
  );
  cable_tray_thickness_options = sortDropdownOptions(
    cable_tray_thickness_options
  );
  const { dropdownOptions: conduit_moc_options } = useDropdownOptions(
    `${CONDUIT_MOC}?limit=100&fields=["*"]`,
    "name"
  );
  let { dropdownOptions: conduit_size_options } = useDropdownOptions(
    `${CONDUIT_SIZE}?limit=100&fields=["*"]`,
    "name"
  );
  conduit_size_options = sortDropdownOptions(conduit_size_options);
  return {
    no_of_core_options,
    specific_requirement_options,
    type_of_insulation_options,
    color_scheme_options,
    running_motor_voltage_drop_options,
    // conductor_options,
    copper_conductor_options,
    aluminium_conductor_options,
    cable_installation_options,
    starting_motor_voltage_drop_options,
    voltage_grade_options,
    gland_make_options,
    gland_moc_options,
    type_of_gland_options,
    future_space_on_trays_options,
    cable_placement_options,
    cable_tray_orientation_options,
    material_construction_dry_area_options,
    material_construction_wet_area_options,
    cable_tray_width_options,
    cable_tray_height_options,
    cable_tray_thickness_options,
    conduit_moc_options,
    conduit_size_options,
  };
}
