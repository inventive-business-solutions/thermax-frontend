"use client"

import { createData } from "actions/crud-actions"
import { useEffect, useState } from "react"

type DropdownState = {
  [key: string]: any[]
}

export default function useCableTrayDropdowns() {

  const [dropdown, setDropdown] = useState<DropdownState>({})

  useEffect(() => {
    const getDropdown = async () => {
      const response = await createData("method/cable_tray_layout.get_cable_tray_layout_dropdown", true, {
        "Layout Number Of Cores": "name",
        "Layout Specific Requirement": "name",
        "Layout Type of Insulation": "name",
        "Layout Color Scheme": "name",
        "Layout Running Motor Voltage Drop": "name",
        "Layout Conductor": "name",
        "Layout Starting Motor Voltage Drop": "name",
        "Layout Voltage Grade": "name",
        "Gland Make": "name",
        "Gland MOC": "name",
        "Type Of Gland": "name",
        "Future Space on Trays": "name",
        "Cable Placement": "name",
        "Cable Tray Orientation": "name",
        "Cable Tray MOC": "name",
        "Cable Tray Width": "name",
        "Cable Tray Height": "name",
        "Cable Tray Thickness": "name",
        "Conduit MOC": "name",
        "Conduit Size": "name",
      })

      console.log("cable tray response", response)
      setDropdown(response)
    }
    getDropdown()
  }, [])
  return dropdown
}
