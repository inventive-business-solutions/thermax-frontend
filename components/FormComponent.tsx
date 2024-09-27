"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "antd"
import { SubmitHandler, useForm } from "react-hook-form"
import * as zod from "zod"
import CustomCheckBoxGroup from "components/FormInputs/CustomCheckBoxGroup"
import CustomDateInput from "components/FormInputs/CustomDate"
import CustomTextInput from "components/FormInputs/CustomInput"
import CustomInputNumber from "components/FormInputs/CustomInputNumber"
import CustomMultiSelect from "components/FormInputs/CustomMultiSelect"
import CustomOTPInput from "components/FormInputs/CustomOTPInput"
import CustomPasswordInput from "components/FormInputs/CustomPasswordInput"
import CustomRadioSelect from "components/FormInputs/CustomRadioSelect"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"
import CustomSwitch from "components/FormInputs/CustomSwitch"
import CustomTreeSelect from "components/FormInputs/CustomTreeSelect"
import CustomUpload from "components/FormInputs/CustomUpload"
import CustomDateRangeInput from "./FormInputs/CustomDateRangePicker"

const customValidationSchema = zod
  .object({
    name: zod.string(),
    age: zod.number(),
    date: zod.date(),
    dateRange: zod.array(zod.date()),
    mobile: zod.string(),
    otp: zod.string(),
    role: zod.string(),
    roles: zod.array(zod.string()),
    radioInput: zod.string(),
    checkboxInput: zod.array(zod.string()),
    switch: zod.boolean(),
    upload: zod.string(),
    treeSelect: zod.array(zod.string()),
    email: zod.string().email({ message: "Invalid email address" }),
    password: zod.string(),
    password_confirmation: zod.string(),
  })
  .refine((fieldsData) => fieldsData.password === fieldsData.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  })
  .refine((fieldsData) => fieldsData.mobile.length === 10 && fieldsData.mobile.match(/^[0-9]+$/) !== null, {
    message: "Mobile number must be numeric",
    path: ["mobile"],
  })

export default function MyCustomForm() {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(customValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      age: 0,
      date: new Date(),
      dateRange: [new Date(), new Date()],
      mobile: "",
      otp: "",
      role: "",
      roles: [],
      radioInput: "",
      checkboxInput: [],
      switch: false,
      upload: "",
      treeSelect: [],
    },
    mode: "onBlur",
  })
  const onSubmit: SubmitHandler<zod.infer<typeof customValidationSchema>> = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <CustomTextInput name="name" control={control} label="Add your name" addonBefore="http://" addonAfter=".com" />
      <CustomTextInput name="email" control={control} label="Email" type="email" />
      <CustomPasswordInput name="password" control={control} label="Password" />
      <CustomPasswordInput name="password_confirmation" control={control} label="Confirm password" />
      <CustomInputNumber name="age" control={control} label="Add your age" />
      <CustomDateInput name="date" control={control} label="Date" />
      <CustomDateRangeInput name="dateRange" control={control} label="Date Range" />
      <CustomTextInput
        name="mobile"
        control={control}
        label="Mobile Number"
        type="tel"
        addonBefore="+91"
        required={false}
      />
      <CustomOTPInput name="otp" control={control} label="OTP" length={6} />
      <CustomSingleSelect
        name="role"
        control={control}
        label="Role"
        options={[
          { value: "Male", label: "Male" },
          { value: "Female", label: "Female" },
        ]}
      />
      <CustomMultiSelect
        name="roles"
        control={control}
        label="Multi Select"
        options={[
          {
            label: "China",
            value: "China",
          },
          {
            label: "USA",
            value: "USA",
          },
          {
            label: "Japan",
            value: "Japan",
          },
          {
            label: "Korea",
            value: "Korea",
          },
        ]}
      />
      <CustomRadioSelect
        name="radioInput"
        control={control}
        label="Radio Input"
        options={[
          {
            label: "Asia",
            value: "Asia",
          },
          {
            label: "America",
            value: "America",
          },
          {
            label: "Europe",
            value: "Europe",
          },
          {
            label: "Australia",
            value: "Australia",
          },
        ]}
      />
      <CustomUpload name="upload" control={control} uploadButtonLabel="Upload" />
      <CustomCheckBoxGroup
        name="checkboxInput"
        control={control}
        label="Continents"
        options={[
          { label: "Apple", value: "Apple" },
          { label: "Pear", value: "Pear" },
          { label: "Orange", value: "Orange", disabled: true },
        ]}
      />
      <CustomSwitch name="switch" control={control} label="Switch" />
      <CustomTreeSelect
        name="treeSelect"
        control={control}
        label="Tree Select"
        treeData={[
          {
            title: "Node1",
            value: "0-0",
            key: "0-0",
            children: [
              {
                title: "Child Node1",
                value: "0-0-0",
                key: "0-0-0",
              },
            ],
          },
          {
            title: "Node2",
            value: "0-1",
            key: "0-1",
            children: [
              {
                title: "Child Node3",
                value: "0-1-0",
                key: "0-1-0",
              },
              {
                title: "Child Node4",
                value: "0-1-1",
                key: "0-1-1",
              },
              {
                title: "Child Node5",
                value: "0-1-2",
                key: "0-1-2",
              },
            ],
          },
        ]}
      />

      <Button type="primary"  htmlType="submit">
        Submit
      </Button>
    </form>
  )
}
