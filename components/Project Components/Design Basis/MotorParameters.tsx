// import { Table, Input, Select, Button } from "antd"
// import { useState } from "react"

// interface MotorParametersProps {
//   handleSave: () => void
// }

// const MotorParameters: React.FC<MotorParametersProps> = ({ handleSave }) => {
//   const [motorData, setMotorData] = useState([
//     {
//       key: "1",
//       motorDetails: "Motor 1",
//       safeAreaDetails: "Safe Area Details 1",
//       hazardousAreaDetails: "Hazardous Area Details 1",
//       inputType: "textarea", // Can be 'textarea', 'dropdown', or 'input'
//     },
//     {
//       key: "2",
//       motorDetails: "Motor 2",
//       safeAreaDetails: "Safe Area Details 2",
//       hazardousAreaDetails: "Hazardous Area Details 2",
//       inputType: "dropdown", // Change this to test different input types
//       options: [
//         { value: "option1", label: "Option 1" },
//         { value: "option2", label: "Option 2" },
//         { value: "option3", label: "Option 3" },
//       ],
//     },
//     {
//       key: "3",
//       motorDetails: "Motor 3",
//       safeAreaDetails: "",
//       hazardousAreaDetails: "",
//       inputType: "input", // Change this to test different input types
//     },
//   ])

//   const columns = [
//     {
//       title: "Motor Details",
//       dataIndex: "motorDetails",
//       key: "motorDetails",
//     },
//     {
//       title: "Motor Safe Area Details",
//       dataIndex: "safeAreaDetails",
//       key: "safeAreaDetails",
//       render: (text: string, record: any) => {
//         switch (record.inputType) {
//           case "textarea":
//             return (
//               <Input.TextArea
//                 value={record.safeAreaDetails}
//                 onChange={(e) =>
//                   setMotorData(
//                     motorData.map((item) =>
//                       item.key === record.key ? { ...item, safeAreaDetails: e.target.value } : item
//                     )
//                   )
//                 }
//               />
//             )
//           case "dropdown":
//             return (
//               <Select
//                 value={record.safeAreaDetails}
//                 onChange={(value) =>
//                   setMotorData(
//                     motorData.map((item) => (item.key === record.key ? { ...item, safeAreaDetails: value } : item))
//                   )
//                 }
//                 options={[...record.options]}
//               />
//             )
//           case "input":
//             return (
//               <Input
//                 value={record.safeAreaDetails}
//                 onChange={(e) =>
//                   setMotorData(
//                     motorData.map((item) =>
//                       item.key === record.key ? { ...item, safeAreaDetails: e.target.value } : item
//                     )
//                   )
//                 }
//               />
//             )
//           default:
//             return null
//         }
//       },
//     },
//     {
//       title: "Motor Hazardous Area Details",
//       dataIndex: "hazardousAreaDetails",
//       key: "hazardousAreaDetails",
//       render: (text: any, record: any) => {
//         switch (record.inputType) {
//           case "textarea":
//             return (
//               <Input.TextArea
//                 value={record.hazardousAreaDetails}
//                 onChange={(e) =>
//                   setMotorData(
//                     motorData.map((item) =>
//                       item.key === record.key ? { ...item, hazardousAreaDetails: e.target.value } : item
//                     )
//                   )
//                 }
//               />
//             )
//           case "dropdown":
//             return (
//               <Select
//                 value={record.hazardousAreaDetails}
//                 onChange={(value) =>
//                   setMotorData(
//                     motorData.map((item) => (item.key === record.key ? { ...item, hazardousAreaDetails: value } : item))
//                   )
//                 }
//                 options={[...record.options]}
//               />
//             )
//           case "input":
//             return (
//               <Input
//                 value={record.hazardousAreaDetails}
//                 onChange={(e) =>
//                   setMotorData(
//                     motorData.map((item) =>
//                       item.key === record.key ? { ...item, hazardousAreaDetails: e.target.value } : item
//                     )
//                   )
//                 }
//               />
//             )
//           default:
//             return null
//         }
//       },
//     },
//   ]

//   return (
//     <>
//       <div className="font-bold">MOTOR PARAMETERS</div>
//       <div className="border">
//         <Table dataSource={motorData} columns={columns} pagination={false} />
//       </div>

//       <div className="mt-3 flex w-full flex-row justify-end">
//         <Button type="primary"  onClick={handleSave}>
//           Save and Next
//         </Button>
//       </div>
//     </>
//   )
// }

// export default MotorParameters
import { Table, Input, Select, Button } from "antd"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import CustomTextAreaInput from "components/FormInputs/CustomTextArea"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import CustomTextInput from "components/FormInputs/CustomInput"

interface MotorParametersProps {
  handleSave: () => void
}

// Zod schema for validation
const schema = z.object({
  motor1SafeArea: z.string().nonempty("Motor 1 Safe Area is required"),
  motor1HazardousArea: z.string().nonempty("Motor 1 Hazardous Area is required"),
  motor2SafeArea: z.string().nonempty("Motor 2 Safe Area is required"),
  motor2HazardousArea: z.string().nonempty("Motor 2 Hazardous Area is required"),
  motor3SafeArea: z.string().nonempty("Motor 3 Safe Area is required"),
  motor3HazardousArea: z.string().nonempty("Motor 3 Hazardous Area is required"),
})

const MotorParameters: React.FC<MotorParametersProps> = ({ handleSave }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      motor1SafeArea: "",
      motor1HazardousArea: "",
      motor2SafeArea: "option1", // default selected option
      motor2HazardousArea: "",
      motor3SafeArea: "",
      motor3HazardousArea: "",
    },
  })

  const motor2Options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ]

  const onSubmit = (data: any) => {
    console.log(data) // handle form submission data
    handleSave() // Call the parent save function
  }

  return (
    <>
      <div className="font-bold">MOTOR PARAMETERS</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border">
          <Table
            dataSource={[
              {
                key: "1",
                motorDetails: "Motor 1",
                safeAreaDetails: (
                  // <Controller
                  //   name="motor1SafeArea"
                  //   control={control}
                  //   render={({ field }) => (
                  //     <>
                  //       <Input.TextArea {...field} />
                  //       {errors.motor1SafeArea && <p className="text-red-500">{errors.motor1SafeArea.message}</p>}
                  //     </>
                  //   )}
                  // />
                  <CustomTextAreaInput name="motor1SafeArea" control={control} label="" />
                ),
                hazardousAreaDetails: (
                  // <Controller
                  //   name="motor1HazardousArea"
                  //   control={control}
                  //   render={({ field }) => (
                  //     <>
                  //       <Input.TextArea {...field} />
                  //       {errors.motor1HazardousArea && (
                  //         <p className="text-red-500">{errors.motor1HazardousArea.message}</p>
                  //       )}
                  //     </>
                  //   )}
                  // />
                  <CustomTextAreaInput name="motor1HazardousArea" control={control} label="" />
                ),
              },
              {
                key: "2",
                motorDetails: "Motor 2",
                safeAreaDetails: (
                  // <Controller
                  //   name="motor2SafeArea"
                  //   control={control}
                  //   render={({ field }) => (
                  //     <>
                  //       <Select
                  //         {...field}
                  //         options={motor2Options}
                  //         onChange={(value) => field.onChange(value)} // Update the field on change
                  //       />
                  //       {errors.motor2SafeArea && <p className="text-red-500">{errors.motor2SafeArea.message}</p>}
                  //     </>
                  //   )}
                  // />
                  <CustomSingleSelect name="motor2SafeArea" control={control} label="" options={motor2Options} />
                ),
                hazardousAreaDetails: (
                  // <Controller
                  //   name="motor2HazardousArea"
                  //   control={control}
                  //   render={({ field }) => (
                  //     <>
                  //       <Input {...field} />
                  //       {errors.motor2HazardousArea && (
                  //         <p className="text-red-500">{errors.motor2HazardousArea.message}</p>
                  //       )}
                  //     </>
                  //   )}
                  // />
                  <CustomTextInput name="motor2HazardousArea" control={control} label="" />
                ),
              },
              {
                key: "3",
                motorDetails: "Motor 3",
                safeAreaDetails: (
                  // <Controller
                  //   name="motor3SafeArea"
                  //   control={control}
                  //   render={({ field }) => (
                  //     <>
                  //       <Input {...field} />
                  //       {errors.motor3SafeArea && <p className="text-red-500">{errors.motor3SafeArea.message}</p>}
                  //     </>
                  //   )}
                  // />
                  <CustomTextInput name="motor3SafeArea" control={control} label="" />
                ),
                hazardousAreaDetails: (
                  // <Controller
                  //   name="motor3HazardousArea"
                  //   control={control}
                  //   render={({ field }) => (
                  //     <>
                  //       <Input {...field} />
                  //       {errors.motor3HazardousArea && (
                  //         <p className="text-red-500">{errors.motor3HazardousArea.message}</p>
                  //       )}
                  //     </>
                  //   )}
                  // />
                  <CustomTextInput name="motor3HazardousArea" control={control} label="" />
                ),
              },
            ]}
            columns={[
              {
                title: "Motor Details",
                dataIndex: "motorDetails",
                key: "motorDetails",
              },
              {
                title: "Motor Safe Area Details",
                dataIndex: "safeAreaDetails",
                key: "safeAreaDetails",
              },
              {
                title: "Motor Hazardous Area Details",
                dataIndex: "hazardousAreaDetails",
                key: "hazardousAreaDetails",
              },
            ]}
            pagination={false}
          />
        </div>

        <div className="mt-3 flex w-full flex-row justify-end">
          <Button type="primary" htmlType="submit">
            Save and Next
          </Button>
        </div>
      </form>
    </>
  )
}

export default MotorParameters
