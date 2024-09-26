// import React, { useState } from "react"
// import { Button, Select } from "antd"

// const { Option } = Select

// // Define the option type
// interface OptionType {
//   value: string
//   label: string
// }

// // Define the component prop type
// interface MakeOfComponentProps {
//     handleSwitchTab : () => void
// }

// // Define the dropdown data structure
// interface DropdownData {
//   heading: string
//   options: OptionType[]
// }

// // Create a common set of options
// const options: OptionType[] = [
//   { value: "motor1", label: "Motor Option 1" },
//   { value: "motor2", label: "Motor Option 2" },
//   { value: "motor3", label: "Motor Option 3" },
// ]

// // Manually create the dropdown data
// const dropdownData: DropdownData[] = [
//   { heading: "Motors", options },
//   { heading: "Cables", options },
//   { heading: "LV switchgear", options },
//   { heading: "Panel Enclosure", options },
//   { heading: "Variable frequency/Speed drive (VFD/VSD)", options },
//   { heading: "Soft Starter", options },
//   { heading: "PLC", options },
// ]

// const MakeOfComponent: React.FC<MakeOfComponentProps> = ({handleSwitchTab}) => {
//   const [selectedOptions, setSelectedOptions] = useState<(string | null)[]>(Array(7).fill(null))

//   const handleChange = (index: number) => (value: string | undefined) => {
//     const updatedSelections = [...selectedOptions]
//     updatedSelections[index] = value || null // Set to null if undefined
//     setSelectedOptions(updatedSelections)
//   }

//   return (
//     <div>
//       <div className="grid grid-cols-3 gap-4">
//         {dropdownData.map((dropdown, index) => (
//           <div key={index} style={{ marginBottom: "10px" }}>
//             <h4 className="text-lg">{dropdown.heading}</h4>
//             <Select
//               size="large"
//               placeholder="Select an option"
//               onChange={handleChange(index)}
//               style={{ width: "100%", height: "3.2rem" }}
//               allowClear
//             >
//               {dropdown.options.map((option) => (
//                 <Option key={option.value} value={option.value}>
//                   <span className="bg-primary-500 px-3 rounded-lg text-md py-2 text-white">{option.label}</span>
//                 </Option>
//               ))}
//             </Select>
//           </div>
//         ))}
//       </div>

//       <div className="flex flex-row justify-end">
//         <Button type="primary" size="large" onClick={handleSwitchTab}>Save and Next</Button>
//       </div>
//     </div>
//   )
// }

// export default MakeOfComponent

import React from "react"
import { Button, Select } from "antd"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"

const { Option } = Select

// Define the option type
interface OptionType {
  value: string
  label: string
}

// Define the component prop type
interface MakeOfComponentProps {
  handleSwitchTab: () => void
}

// Define the dropdown data structure
interface DropdownData {
  heading: string
  options: OptionType[]
}

// Create a common set of options
const options: OptionType[] = [
  { value: "motor1", label: "Motor Option 1" },
  { value: "motor2", label: "Motor Option 2" },
  { value: "motor3", label: "Motor Option 3" },
]

// Manually create the dropdown data
const dropdownData: DropdownData[] = [
  { heading: "Motors", options },
  { heading: "Cables", options },
  { heading: "LV switchgear", options },
  { heading: "Panel Enclosure", options },
  { heading: "Variable frequency/Speed drive (VFD/VSD)", options },
  { heading: "Soft Starter", options },
  { heading: "PLC", options },
]

// Define Zod schema for validation
const schema = z.object({
  selections: z.array(z.string().min(1, "Selection is required")).length(dropdownData.length),
})

const MakeOfComponent: React.FC<MakeOfComponentProps> = ({ handleSwitchTab }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    selections: string[]
  }>({
    resolver: zodResolver(schema),
    defaultValues: {
      selections: Array(dropdownData.length).fill(""), // Initialize selections with empty strings
    },
  })

  const onSubmit = (data: { selections: string[] }) => {
    console.log(data)
    handleSwitchTab() // Call the switch tab handler after successful submission
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-3 gap-4">
        {dropdownData.map((dropdown, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <h4 className="text-lg">{dropdown.heading}</h4>
            {/* <Controller
              name={`selections.${index}`}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  size="large"
                  placeholder="Select an option"
                  style={{ width: "100%", height: "3.2rem" }}
                  allowClear
                  onChange={(value) => field.onChange(value)} // Update form state on change
                >
                  {dropdown.options.map((option) => (
                    <Option key={option.value} value={option.value}>
                      <span className="text-md rounded-lg bg-primary-500 px-3 py-2 text-white">{option.label}</span>
                    </Option>
                  ))}
                </Select>
              )}
            /> */}
            <CustomSingleSelect name={`selections.${index}`} control={control} label="" options={options} />
            {/* Display error message if validation fails */}
            {errors.selections && errors.selections[index] && (
              <p className="text-red-500">{errors.selections[index].message}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-row justify-end">
        <Button type="primary" size="large" htmlType="submit">
          Save and Next
        </Button>
      </div>
    </form>
  )
}

export default MakeOfComponent
