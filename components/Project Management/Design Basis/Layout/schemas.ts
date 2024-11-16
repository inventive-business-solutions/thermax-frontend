import * as zod from "zod"

export const cableTrayValidationSchema = zod.object({
  number_of_cores: zod.string({
    required_error: "Number of cores is required",
    message: "Number of cores is required",
  }),
  specific_requirement: zod.string({
    required_error: "Specific requirement is required",
    message: "Specific requirement is required",
  }),
  type_of_insulation: zod.string({
    required_error: "Type of insulation is required",
    message: "Type of insulation is required",
  }),
  color_scheme: zod.string({
    required_error: "Color scheme is required",
    message: "Color scheme is required",
  }),
  motor_voltage_drop_during_running: zod.string({
    required_error: "Motor voltage drop during running is required",
    message: "Motor voltage drop during running is required",
  }),
  conductor: zod.string({
    required_error: "Conductor is required",
    message: "Conductor is required",
  }),
  cable_installation: zod.string({
    required_error: "Cable installation is required",
    message: "Cable installation is required",
  }),
  motor_voltage_drop_during_starting: zod.string({
    required_error: "Motor voltage drop during starting is required",
    message: "Motor voltage drop during starting is required",
  }),
  voltage_grade: zod.string({
    required_error: "Voltage grade is required",
    message: "Voltage grade is required",
  }),
  derating_factor: zod.string({
    required_error: "Derating factor is required",
    message: "Derating factor is required",
  }),
  gland_make: zod.string({
    required_error: "Gland make is required",
    message: "Gland make is required",
  }),
  moc: zod.string({
    required_error: "MOC is required",
    message: "MOC is required",
  }),
  type_of_gland: zod.string({
    required_error: "Type of gland is required",
    message: "Type of gland is required",
  }),
  future_space_on_trays: zod.string({
    required_error: "Future space on trays is required",
    message: "Future space on trays is required",
  }),
  cable_placement: zod.string({
    required_error: "Cable placement is required",
    message: "Cable placement is required",
  }),
  orientation: zod.string({
    required_error: "Orientation is required",
    message: "Orientation is required",
  }),
  vertical_distance: zod.string({
    required_error: "Vertical distance is required",
    message: "Vertical distance is required",
  }),
  horizontal_distance: zod.string({
    required_error: "Horizontal distance is required",
    message: "Horizontal distance is required",
  }),
  is_dry_area_selected: zod.number({
    required_error: "Dry area is required",
    message: "Dry area is required",
  }),
  dry_area: zod.string({
    required_error: "Dry area is required",
    message: "Dry area is required",
  }),
  is_wet_area_selected: zod.number({
    required_error: "Wet area is required",
    message: "Wet area is required",
  }),
  wet_area: zod.string({
    required_error: "Wet area is required",
    message: "Wet area is required",
  }),
  is_pct_perforated_type_selected: zod.number({
    required_error: "Perforated type is required",
    message: "Perforated type is required",
  }),
  pct_perforated_type_width: zod.string({
    required_error: "Width is required",
    message: "Width is required",
  }),
  pct_perforated_type_height: zod.string({
    required_error: "Height is required",
    message: "Height is required",
  }),
  pct_perforated_type_thickness: zod.string({
    required_error: "Thickness is required",
    message: "Thickness is required",
  }),
  is_pct_ladder_type_selected: zod.number({
    required_error: "Ladder type is required",
    message: "Ladder type is required",
  }),
  pct_ladder_type_width: zod.string({
    required_error: "Width is required",
    message: "Width is required",
  }),
  pct_ladder_type_height: zod.string({
    required_error: "Height is required",
    message: "Height is required",
  }),
  pct_ladder_type_thickness: zod.string({
    required_error: "Thickness is required",
    message: "Thickness is required",
  }),
  is_pct_mesh_type_selected: zod.number({
    required_error: "Mesh type is required",
    message: "Mesh type is required",
  }),
  pct_mesh_type_width: zod.string({
    required_error: "Width is required",
    message: "Width is required",
  }),
  pct_mesh_type_height: zod.string({
    required_error: "Height is required",
    message: "Height is required",
  }),
  pct_mesh_type_thickness: zod.string({
    required_error: "Thickness is required",
    message: "Thickness is required",
  }),
  is_pct_conduit_selected: zod.number({
    required_error: "Conduit is required",
    message: "Conduit is required",
  }),
  pct_conduit_moc: zod.string({
    required_error: "MOC is required",
    message: "MOC is required",
  }),
  pct_conduit_size: zod.string({
    required_error: "Size is required",
    message: "Size is required",
  }),
  is_cct_perforated_type_selected: zod.number({
    required_error: "Perforated type is required",
    message: "Perforated type is required",
  }),
  cct_perforated_type_width: zod.string({
    required_error: "Width is required",
    message: "Width is required",
  }),
  cct_perforated_type_height: zod.string({
    required_error: "Height is required",
    message: "Height is required",
  }),
  cct_perforated_type_thickness: zod.string({
    required_error: "Thickness is required",
    message: "Thickness is required",
  }),
  is_cct_ladder_type_selected: zod.number({
    required_error: "Ladder type is required",
    message: "Ladder type is required",
  }),
  cct_ladder_type_width: zod.string({
    required_error: "Width is required",
    message: "Width is required",
  }),
  cct_ladder_type_height: zod.string({
    required_error: "Height is required",
    message: "Height is required",
  }),
  cct_ladder_type_thickness: zod.string({
    required_error: "Thickness is required",
    message: "Thickness is required",
  }),
  is_cct_mesh_type_selected: zod.number({
    required_error: "Mesh type is required",
    message: "Mesh type is required",
  }),
  cct_mesh_type_width: zod.string({
    required_error: "Width is required",
    message: "Width is required",
  }),
  cct_mesh_type_height: zod.string({
    required_error: "Height is required",
    message: "Height is required",
  }),
  cct_mesh_type_thickness: zod.string({
    required_error: "Thickness is required",
    message: "Thickness is required",
  }),
  is_cct_conduit_selected: zod.number({
    required_error: "Conduit is required",
    message: "Conduit is required",
  }),
  cct_conduit_moc: zod.string({
    required_error: "MOC is required",
    message: "MOC is required",
  }),
  cct_conduit_size: zod.string({
    required_error: "Size is required",
    message: "Size is required",
  }),
  is_sct_perforated_type_selected: zod.number({
    required_error: "Perforated type is required",
    message: "Perforated type is required",
  }),
  sct_perforated_type_width: zod.string({
    required_error: "Width is required",
    message: "Width is required",
  }),
  sct_perforated_type_height: zod.string({
    required_error: "Height is required",
    message: "Height is required",
  }),
  sct_perforated_type_thickness: zod.string({
    required_error: "Thickness is required",
    message: "Thickness is required",
  }),
  is_sct_ladder_type_selected: zod.number({
    required_error: "Ladder type is required",
    message: "Ladder type is required",
  }),
  sct_ladder_type_width: zod.string({
    required_error: "Width is required",
    message: "Width is required",
  }),
  sct_ladder_type_height: zod.string({
    required_error: "Height is required",
    message: "Height is required",
  }),
  sct_ladder_type_thickness: zod.string({
    required_error: "Thickness is required",
    message: "Thickness is required",
  }),
  is_sct_mesh_type_selected: zod.number({
    required_error: "Mesh type is required",
    message: "Mesh type is required",
  }),
  sct_mesh_type_width: zod.string({
    required_error: "Width is required",
    message: "Width is required",
  }),
  sct_mesh_type_height: zod.string({
    required_error: "Height is required",
    message: "Height is required",
  }),
  sct_mesh_type_thickness: zod.string({
    required_error: "Thickness is required",
    message: "Thickness is required",
  }),
  is_sct_conduit_selected: zod.number({
    required_error: "Conduit is required",
    message: "Conduit is required",
  }),
  sct_conduit_moc: zod.string({
    required_error: "MOC is required",
    message: "MOC is required",
  }),
  sct_conduit_size: zod.string({
    required_error: "Size is required",
    message: "Size is required",
  }),
  pct_perforated_type_max_width: zod.string({
    required_error: "Max. Width is required",
    message: "Max. Width is required",
  }),
  pct_ladder_type_max_width: zod.string({
    required_error: "Max. Width is required",
    message: "Max. Width is required",
  }),
  pct_mesh_type_max_width: zod.string({
    required_error: "Max. Width is required",
    message: "Max. Width is required",
  }),
  cct_perforated_type_max_width: zod.string({
    required_error: "Max. Width is required",
    message: "Max. Width is required",
  }),
  cct_ladder_type_max_width: zod.string({
    required_error: "Max. Width is required",
    message: "Max. Width is required",
  }),
  cct_mesh_type_max_width: zod.string({
    required_error: "Max. Width is required",
    message: "Max. Width is required",
  }),
  sct_perforated_type_max_width: zod.string({
    required_error: "Max. Width is required",
    message: "Max. Width is required",
  }),
  sct_ladder_type_max_width: zod.string({
    required_error: "Max. Width is required",
    message: "Max. Width is required",
  }),
  sct_mesh_type_max_width: zod.string({
    required_error: "Max. Width is required",
    message: "Max. Width is required",
  }),
})
