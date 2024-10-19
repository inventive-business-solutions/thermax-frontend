"use client"

import { MAKE_CABLE, MAKE_LV_SWITCHGEAR, MAKE_MOTORS, MAKE_PANEL_ENCLOSURE, MAKE_PLC, MAKE_SOFT_STARTER, MAKE_VFD_VSD } from "configs/api-endpoints"

import { useDropdownOptions } from "hooks/useDropdownOptions"

export default function useMakeOfComponentDropdowns() {
  const { dropdownOptions: motorsMakeOptions } = useDropdownOptions(`${MAKE_MOTORS}?fields=["*"]`, "motors")
  const { dropdownOptions: cableMakeOptions } = useDropdownOptions(`${MAKE_CABLE}?fields=["*"]`, "cable")
  const { dropdownOptions: lv_switchgearOptions } = useDropdownOptions(`${MAKE_LV_SWITCHGEAR}?fields=["*"]`, "lv_switchgear")
  const { dropdownOptions: panel_enclosureOptins } = useDropdownOptions(`${MAKE_PANEL_ENCLOSURE}?fields=["*"]`, "panel_enclosure")
  const { dropdownOptions: vfd_vsdOptions } = useDropdownOptions(`${MAKE_VFD_VSD}?fields=["*"]`, "vfd_vsd")
  const { dropdownOptions: soft_starterOptions } = useDropdownOptions(`${MAKE_SOFT_STARTER}?fields=["*"]`, "soft_starter")
  const { dropdownOptions: plcMakeOptions } = useDropdownOptions(`${MAKE_PLC}?fields=["*"]`, "plc")

  return {
    motorsMakeOptions,
    cableMakeOptions,
    lv_switchgearOptions,
    panel_enclosureOptins,
    vfd_vsdOptions,
    soft_starterOptions,
    plcMakeOptions
  }
}
