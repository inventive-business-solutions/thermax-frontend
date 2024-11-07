// FilterComponent.tsx
import React from 'react';

interface FilterComponentProps {
  column: string;
  onFilterChange: (column: string, value: string) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ column, onFilterChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange(column, event.target.value);
  };

  return (
    <input
      type="text"
      placeholder={`Filter ${column}`}
      onChange={handleChange}
    />
  );
};

export default FilterComponent;
