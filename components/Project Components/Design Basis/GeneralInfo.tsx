"use client"
import React, { useState } from "react"
import { Button, Checkbox, Divider, Dropdown, Menu, Radio, Select, Tabs, message } from "antd"
import { CloseOutlined, DownOutlined } from "@ant-design/icons"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import CustomSingleSelect from "components/FormInputs/CustomSingleSelect"

// Define validation schema using zod
const GeneralInfoSchema = z
  .object({
    selectedPackage: z.string(),
    checkboxOne: z.boolean(),
    checkboxTwo: z.boolean(),
    radioOne: z.string().optional(),
    radioTwo: z.string().optional(),
    powerSupply: z.string(),
    // Only validate area classification fields if one of the areas is hazardous
    standard: z.string().optional(),
    zone: z.string().optional(),
    gasGroup: z.string().optional(),
    temperature: z.string().optional(),
  })
  .refine(
    (data) => {
      // Only require area classification fields when either radio is "hazardous"
      const isHazardous = data.radioOne === "hazardous" || data.radioTwo === "hazardous"
      if (isHazardous) {
        return data.standard && data.zone && data.gasGroup && data.temperature
      }
      return true // No validation if none are hazardous
    },
    {
      message: "All area classification fields are required if any checkbox is hazardous",
      path: ["standard"],
    }
  )

interface GeneralInfoProps {
  handleSave: (data: any) => void
}

const packageOptions = [
  { label: "Package 1", key: "1" },
  { label: "Package 2", key: "2" },
  { label: "Package 3", key: "3" },
  { label: "Package 4", key: "4" },
]

const GeneralInfo: React.FC<GeneralInfoProps> = ({ handleSave }) => {
  const [tabs, setTabs] = useState<{ key: string; label: string }[]>([])
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(GeneralInfoSchema),
    defaultValues: {
      selectedPackage: "",
      checkboxOne: false,
      checkboxTwo: false,
      radioOne: "safe",
      radioTwo: "safe",
      powerSupply: "lucy",
      standard: "",
      zone: "",
      gasGroup: "",
      temperature: "",
    },
  })

  const selectedPackage = watch("selectedPackage")
  const checkboxOne = watch("checkboxOne")
  const checkboxTwo = watch("checkboxTwo")
  const radioOne = watch("radioOne")
  const radioTwo = watch("radioTwo")

  const handleMenuClick = (e: any) => {
    setValue("selectedPackage", e.key)
  }

  const addTab = () => {
    const newTab = packageOptions.find((pkg) => pkg.key === selectedPackage)
    if (newTab && !tabs.some((tab) => tab.key === newTab.key)) {
      setTabs([...tabs, { key: newTab.key, label: newTab.label }])
    }
    setValue("selectedPackage", "") // Reset after adding
  }

  const removeTab = (key: string) => {
    setTabs(tabs.filter((tab) => tab.key !== key))
  }

  const onSubmit = (data: any) => {
    message.success("Form saved successfully!")
    handleSave(data) // Pass the form data to handleSave function
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="text-2xl font-bold">Package Selection</div>

        {/* Package Dropdown */}
        <div className="ms-4 flex flex-row items-center gap-2">
          <div>Package Name</div>
          <Dropdown
            menu={{
              items: packageOptions.map((option) => ({
                key: option.key,
                label: option.label,
              })),
              onClick: handleMenuClick,
            }}
          >
            <Button>
              {selectedPackage ? packageOptions.find((pkg) => pkg.key === selectedPackage)?.label : "Select Package"}{" "}
              <DownOutlined />
            </Button>
          </Dropdown>
          <Button type="primary" onClick={addTab} disabled={!selectedPackage}>
            Add
          </Button>
        </div>
        {errors.selectedPackage && <span className="text-red-500">{errors.selectedPackage.message}</span>}

        {/* Dynamic Tabs */}
        <Tabs
          className="ms-4"
          items={tabs.map((tab) => ({
            key: tab.key,
            label: (
              <span>
                {tab.label}
                <Button type="link" onClick={() => removeTab(tab.key)} icon={<CloseOutlined />} />
              </span>
            ),
            children: (
              <div className="ms-4 flex flex-col gap-6 ">
                {/* Checkboxes and Radio Buttons */}
                <Controller
                  name="checkboxOne"
                  control={control}
                  render={({ field }) => (
                    <Checkbox {...field} checked={checkboxOne}>
                      One
                    </Checkbox>
                  )}
                />
                <Controller
                  name="radioOne"
                  control={control}
                  render={({ field }) => (
                    <Radio.Group {...field} disabled={!checkboxOne}>
                      <Radio value="safe">Safe Area</Radio>
                      <Radio value="hazardous">Hazardous Area</Radio>
                    </Radio.Group>
                  )}
                />

                <Controller
                  name="checkboxTwo"
                  control={control}
                  render={({ field }) => (
                    <Checkbox {...field} checked={checkboxTwo}>
                      Two
                    </Checkbox>
                  )}
                />
                <Controller
                  name="radioTwo"
                  control={control}
                  render={({ field }) => (
                    <Radio.Group {...field} disabled={!checkboxTwo}>
                      <Radio value="safe">Safe Area</Radio>
                      <Radio value="hazardous">Hazardous Area</Radio>
                    </Radio.Group>
                  )}
                />

                {/* Area Classification Section (conditional rendering) */}
                {(radioOne === "hazardous" || radioTwo === "hazardous") && (
                  <div className="mt-4">
                    <h3 className="text-xl font-bold">Area Classification</h3>

                    <div className="grid grid-cols-4 gap-4">
                      <CustomSingleSelect
                        name="standard"
                        control={control}
                        label="Standard"
                        options={[
                          { value: "iso", label: "ISO" },
                          { value: "iec", label: "IEC" },
                          { value: "nema", label: "NEMA" },
                        ]}
                      />
                      <CustomSingleSelect
                        name="zone"
                        control={control}
                        label="Zone"
                        options={[
                          { value: "zone0", label: "Zone 0" },
                          { value: "zone1", label: "Zone 1" },
                          { value: "zone2", label: "Zone 2" },
                        ]}
                      />

                      <CustomSingleSelect
                        name="gasGroup"
                        control={control}
                        label="Gas Group"
                        options={[
                          { value: "groupI", label: "Group I" },
                          { value: "groupIIA", label: "Group IIA" },
                          { value: "groupIIB", label: "Group IIB" },
                          { value: "groupIIC", label: "Group IIC" },
                        ]}
                      />

                      <CustomSingleSelect
                        name="temperature"
                        control={control}
                        label="Zone"
                        placeholder="Temperature"
                        options={[
                          { value: "-20C to +40C", label: "-20°C to +40°C" },
                          { value: "-20C to +60C", label: "-20°C to +60°C" },
                          { value: "+40C to +70C", label: "+40°C to +70°C" },
                        ]}
                      />
                    </div>
                    {errors.standard && <span className="text-red-500">{errors.standard.message}</span>}
                  </div>
                )}
              </div>
            ),
          }))}
        />

        <Divider />
        <div className="m-0 flex flex-col gap-6 p-0 ">
          <div className="text-2xl font-bold">Battery Limit</div>
          <div className="ms-6 flex flex-row justify-start gap-4">
            <div>Power Supply at the </div>
            <Controller
              name="powerSupply"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { value: "jack", label: "Jack" },
                    { value: "lucy", label: "Lucy" },
                    { value: "Yiminghe", label: "Yiminghe" },
                  ]}
                />
              )}
            />
          </div>
          {errors.powerSupply && <span className="text-red-500">{errors.powerSupply.message}</span>}
        </div>

        <div className="flex w-full justify-end gap-4">
          <Button type="primary" htmlType="submit" >
            Save
          </Button>
        </div>
      </div>
    </form>
  )
}

export default GeneralInfo
