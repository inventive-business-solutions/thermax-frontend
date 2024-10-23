import React from "react"

interface SelectEditorProps {
  row: any
  onRowChange: (row: any, commit: boolean) => void
  value: string
  options: string[]
  columnKey: string
}

const SelectEditor: React.FC<SelectEditorProps> = ({ row, onRowChange, value, options, columnKey }) => {
  return (
    <select
      className={""}
      style={{ width: "90%", backgroundColor: "unset", height: "100%" }}
      value={value}
      onChange={(event) => onRowChange({ ...row, [columnKey]: event.target.value }, true)}
      autoFocus
    >
      {options.map((option) => (
        <option key={option} value={option} style={{ width: "100%", height: "100%" }}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default SelectEditor
