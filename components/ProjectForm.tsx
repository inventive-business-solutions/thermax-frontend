"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as zod from "zod"
import CustomTextInput from "./FormInputs/CustomInput"
import { Col, Flex, Row } from "antd"
import CustomSingleSelect from "./FormInputs/CustomSingleSelect"

const customValidationSchema = zod.object({
  project_name: zod.string(),
  client_name: zod.string(),
  consultant_name: zod.string(),
  project_OC_Number: zod.string(),
  Approver: zod.string().email({ message: "Invalid email address" }),
})

type ProjectFormData = zod.infer<typeof customValidationSchema>

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => void
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(customValidationSchema),
    defaultValues: {
      project_name: "",
      client_name: "",
      consultant_name: "",
      project_OC_Number: "",
      Approver: "",
    },
    mode: "onBlur",
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <Row justify="space-around">
        <Col span={11}>
          <Flex vertical gap="middle">
            <CustomTextInput name="project_name" control={control} label="Project Name" type="text" />
            <CustomTextInput name="client_name" control={control} label="Client Name" type="text" />
            <CustomSingleSelect
              name="Approver"
              control={control}
              label="Approver"
              options={[
                { value: "xyz@gmail.com", label: "xyz@gmail.com" },
                { value: "abc@gmail.com", label: "abc@gmail.com" },
              ]}
            />
          </Flex>
        </Col>
        <Col span={11}>
          <Flex vertical gap="middle">
            <CustomTextInput name="project_OC_Number" control={control} label="Project OC NO." type="text" />
            <CustomTextInput name="consultant_name" control={control} label="Consultant Name" type="text" />
          </Flex>
        </Col>
      </Row>
    </form>
  )
}

export default ProjectForm

{
  /* <Flex gap="middle" justify="center" align="center" >
        <Flex gap="middle" vertical>
        </Flex>
        <Flex gap="middle" vertical>
          <CustomTextInput name="project_name" control={control} label="Project Name" type="text" />
        </Flex>
      </Flex> */
}
