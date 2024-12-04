"use client";

import {
  EARTHING_SYSTEM,
  EARTH_STRIP,
  EARTH_PIT,
} from "@/configs/api-endpoints";
import { useDropdownOptions } from "@/hooks/useDropdownOptions";

export default function useEarthingDropdowns() {
  const { dropdownOptions: earthing_system_options } = useDropdownOptions(
    `${EARTHING_SYSTEM}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: earth_strip_options } = useDropdownOptions(
    `${EARTH_STRIP}?fields=["*"]`,
    "name"
  );
  const { dropdownOptions: earthing_pit_options } = useDropdownOptions(
    `${EARTH_PIT}?fields=["*"]`,
    "name"
  );
  return { earthing_system_options, earth_strip_options, earthing_pit_options };
}
