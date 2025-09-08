import React from "react";

const SelectField = ({
  icon: Icon,
  label,
  placeholder,
  name,
  value,
  onChange,
  options,
  disabled = false,
  required = true,
}) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label} {required ? "*" : "(Optional)"}
      </label>
    )}
    <div className="flex items-center border border-neutral-200 bg-neutral-50 rounded">
      <div className="w-14 h-14 flex justify-center items-center border-r border-gray-200">
        <Icon className="text-primary text-xl" />
      </div>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="flex-1 h-14 px-4 bg-transparent focus:outline-none disabled:opacity-50"
        required={required}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default SelectField;
