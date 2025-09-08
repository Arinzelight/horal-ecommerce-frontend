import React from "react";

const InputField = ({
  icon: Icon,
  label,
  placeholder,
  type = "text",
  name,
  value,
  onChange,
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
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 h-14 px-4 bg-transparent focus:outline-none"
        required={required}
      />
    </div>
  </div>
);

export default InputField;
