"use client"

import { Controller } from "react-hook-form"
import CustomCheckboxInput from "components/FormInputs/CustomCheckbox"
import CustomRadioSelect from "components/FormInputs/CustomRadioSelect"

export default function GISubPkgInfo({ subPkg, control }: { subPkg: any; control: any }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-10">
        <div>
          <Controller
            name={`active_sub_pkg_${subPkg.sub_package_name}`}
            control={control}
            defaultValue={Boolean(subPkg.is_sub_package_selected)}
            render={({ field }) => {
              return (
                <CustomCheckboxInput
                  control={control}
                  name={`active_sub_pkg_${subPkg.sub_package_name}`}
                  label={subPkg.sub_package_name}
                  checked={field.value}
                />
              )
            }}
          />
        </div>
        <div>
          <Controller
            name={`classification_area_${subPkg.sub_package_name}`}
            control={control}
            defaultValue={subPkg.area_of_classification}
            render={({ field }) => {
              return (
                <CustomRadioSelect
                  label={""}
                  control={control}
                  name={`classification_area_${subPkg.sub_package_name}`}
                  options={[
                    { label: "Safe Area", value: "Safe Area" },
                    { label: "Hazardous Area", value: "Hazardous Area" },
                  ]}
                  value={field.value}
                />
              )
            }}
          />
        </div>
      </div>
    </div>
  )
}
