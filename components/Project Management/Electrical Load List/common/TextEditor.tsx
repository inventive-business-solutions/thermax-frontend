import React from 'react';

interface TextEditorProps {
  row: any;
  onRowChange: (row: any, commit: boolean) => void;
  value: string;
  columnKey: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ row, onRowChange, value, columnKey }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(event) => onRowChange({ ...row, [columnKey]: event.target.value }, true)}
      autoFocus
    />
  );
};

export default TextEditor;
