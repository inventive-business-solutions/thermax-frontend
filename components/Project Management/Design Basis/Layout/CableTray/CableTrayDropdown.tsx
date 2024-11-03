"use client"
import {
  CT_CABLE_PLACEMENT,
  CT_FUTURE_SPACE_ON_TRAYS,
  CT_HEIGHT,
  CT_HORIZONTAL_DISTANCE,
  CT_MOC,
  CT_ORIENTATION,
  CT_SIZE,
  CT_THICKNESS,
  CT_VERTICAL_DISTANCE,
  CT_WIDTH,
  GLAND_MAKE,
  GLAND_MOC,
  LAYOUT_CABLE_INSTALLATION,
  LAYOUT_COLOR_SCHEME,
  LAYOUT_CONDUCTOR,
  LAYOUT_DERATING_FACTOR,
  LAYOUT_VOLTAGE_GRADE,
  MV_DROP_RUNNING,
  MV_DROP_STARTING,
  NUMBER_OF_CORES,
  SPECIFIC_REQUIREMENTS,
  TYPE_OF_GLAND,
  TYPE_OF_INSULATION,
} from "configs/api-endpoints"
import { useDropdownOptions } from "hooks/useDropdownOptions"

export default function useCableTrayDrodowns() {
  const { dropdownOptions: number_of_coresOptions } = useDropdownOptions(`${NUMBER_OF_CORES}?fields=["*"]`, "cores")
  const { dropdownOptions: layout_specific_requirementsOptions } = useDropdownOptions(
    `${SPECIFIC_REQUIREMENTS}?fields=["*"]`,
    "specific_requirement"
  )
  const { dropdownOptions: type_of_insulationsOptions } = useDropdownOptions(
    `${TYPE_OF_INSULATION}?fields=["*"]`,
    "type_of_insulation"
  )
  const { dropdownOptions: layout_color_schemeOptions } = useDropdownOptions(
    `${LAYOUT_COLOR_SCHEME}?fields=["*"]`,
    "colour_scheme"
  )
  const { dropdownOptions: mv_drop_runningOptions } = useDropdownOptions(
    `${MV_DROP_RUNNING}?fields=["*"]`,
    "voltage_drop"
  )
  const { dropdownOptions: layout_conductorOptions } = useDropdownOptions(
    `${LAYOUT_CONDUCTOR}?fields=["*"]`,
    "conductor"
  )
  const { dropdownOptions: layout_cable_installationOptions } = useDropdownOptions(
    `${LAYOUT_CABLE_INSTALLATION}?fields=["*"]`,
    "cable_installation"
  )
  const { dropdownOptions: mv_drop_startingOptions } = useDropdownOptions(
    `${MV_DROP_STARTING}?fields=["*"]`,
    "voltage_drop"
  )
  const { dropdownOptions: layout_voltage_gradeOptions } = useDropdownOptions(
    `${LAYOUT_VOLTAGE_GRADE}?fields=["*"]`,
    "voltage_grade"
  )
  const { dropdownOptions: layout_derating_factorOptions } = useDropdownOptions(
    `${LAYOUT_DERATING_FACTOR}?fields=["*"]`,
    "derating_factor"
  )

  const { dropdownOptions: gland_makeOptions } = useDropdownOptions(`${GLAND_MAKE}?fields=["*"]`, "gland_make")
  const { dropdownOptions: gland_mocOptions } = useDropdownOptions(`${GLAND_MOC}?fields=["*"]`, "moc")
  const { dropdownOptions: type_of_glandOptions } = useDropdownOptions(`${TYPE_OF_GLAND}?fields=["*"]`, "type_of_gland")
  const { dropdownOptions: ct_future_spaceOptions } = useDropdownOptions(
    `${CT_FUTURE_SPACE_ON_TRAYS}?fields=["*"]`,
    "future_space_on_trays"
  )
  const { dropdownOptions: ct_cable_placementOptions } = useDropdownOptions(
    `${CT_CABLE_PLACEMENT}?fields=["*"]`,
    "cable_placement"
  )
  const { dropdownOptions: ct_orientationOptions } = useDropdownOptions(`${CT_ORIENTATION}?fields=["*"]`, "orientation")
  const { dropdownOptions: ct_verticalOptions } = useDropdownOptions(
    `${CT_VERTICAL_DISTANCE}?fields=["*"]`,
    "vertical_distance"
  )
  const { dropdownOptions: ct_horizontalOptions } = useDropdownOptions(
    `${CT_HORIZONTAL_DISTANCE}?fields=["*"]`,
    "horizontal_distance"
  )

  const { dropdownOptions: ct_widthOptions } = useDropdownOptions(`${CT_WIDTH}?fields=["*"]`, "Cable Tray Width")
  const { dropdownOptions: ct_heightOptions } = useDropdownOptions(`${CT_HEIGHT}?fields=["*"]`, "Cable Tray Height")
  const { dropdownOptions: ct_thicknessOptions } = useDropdownOptions(
    `${CT_THICKNESS}?fields=["*"]`,
    "Cable Tray Thickness"
  )
  const { dropdownOptions: ct_mocOptions } = useDropdownOptions(`${CT_MOC}?fields=["*"]`, "moc")
  const { dropdownOptions: ct_sizeOptions } = useDropdownOptions(`${CT_SIZE}?fields=["*"]`, "size")

  return {
    number_of_coresOptions,
    layout_specific_requirementsOptions,
    type_of_insulationsOptions,
    layout_color_schemeOptions,
    mv_drop_runningOptions,
    layout_conductorOptions,
    layout_cable_installationOptions,
    mv_drop_startingOptions,
    layout_voltage_gradeOptions,
    layout_derating_factorOptions,

    gland_makeOptions,
    gland_mocOptions,
    type_of_glandOptions,
    ct_future_spaceOptions,
    ct_cable_placementOptions,
    ct_orientationOptions,
    ct_verticalOptions,
    ct_horizontalOptions,

    ct_widthOptions,
    ct_heightOptions,
    ct_thicknessOptions,
    ct_mocOptions,
    ct_sizeOptions,
  }
}
