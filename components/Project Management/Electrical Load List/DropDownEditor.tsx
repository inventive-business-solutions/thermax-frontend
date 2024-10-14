import React, { useState } from "react";

// Define the types for the row data
interface RowData {
  id: number;
  dropdown: string;
}

// Define the props for the DropdownEditor component
interface DropdownEditorProps {
  row: RowData;
  onRowChange: (row: RowData) => void;
  column: { key: keyof RowData };
}

// Custom Dropdown Editor Component with proper types
const DropdownEditor: React.FC<DropdownEditorProps> = ({ row, onRowChange, column }) => {
  const [value, setValue] = useState(row[column.key]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    onRowChange({ ...row, [column.key]: newValue });
  };

  return (
    <select value={value} onChange={handleChange}>
      <option value="">Select an option</option>
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
      <option value="Option 3">Option 3</option>
    </select>
  );
};

export default DropdownEditor;