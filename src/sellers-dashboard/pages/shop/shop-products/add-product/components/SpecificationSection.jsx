import { useState, useRef, useEffect } from "react";
import { specificationsByCategory } from "../utils/specification-by-category";

const SpecificationsSection = ({
  category,
  specification,
  specifications,
  onSpecificationChange,
  onSpecificationsChange,
}) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [openDropdowns, setOpenDropdowns] = useState({});
  const dropdownRefs = useRef({});

  // Get category name from category object or use directly if it's a string
  const categoryName = typeof category === "object" ? category.name : category;

  // Get specifications for the selected category
  const relevantSpecs = specificationsByCategory[categoryName] || [];

  // Handle clicking outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.keys(openDropdowns).forEach((key) => {
        if (
          openDropdowns[key] &&
          dropdownRefs.current[key] &&
          !dropdownRefs.current[key].contains(event.target)
        ) {
          setOpenDropdowns((prev) => ({ ...prev, [key]: false }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdowns]);

  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const selectOption = (key, option) => {
    handleSpecificationChange(key, option);
    setOpenDropdowns((prev) => ({ ...prev, [key]: false }));
  };

  const validateField = (spec, value) => {
    const errors = {};

    // Required validation
    if (spec.validation?.required && !value?.trim()) {
      errors[spec.key] = `${spec.label} is required`;
      return errors;
    }

    // Pattern validation
    if (value && spec.pattern && !spec.pattern.test(value)) {
      errors[spec.key] =
        spec.validationMessage || `Invalid format for ${spec.label}`;
      return errors;
    }

    // Length validation
    if (
      value &&
      spec.validation?.minLength &&
      value.length < spec.validation.minLength
    ) {
      errors[
        spec.key
      ] = `${spec.label} must be at least ${spec.validation.minLength} characters`;
      return errors;
    }

    return errors;
  };

  const handleSpecificationChange = (key, value) => {
    // Find the spec to validate
    const spec = relevantSpecs.find((s) => s.key === key);

    if (spec) {
      const errors = validateField(spec, value);
      setValidationErrors((prev) => ({
        ...prev,
        [key]: errors[key] || null,
      }));
    }

    onSpecificationChange(key, value);
  };

  const handleMultiSelectChange = (key, selectedValue) => {
    const currentValues = specification?.[key] || [];
    const currentArray = Array.isArray(currentValues)
      ? currentValues
      : currentValues.split(", ").filter((v) => v);

    let newValues;
    if (currentArray.includes(selectedValue)) {
      newValues = currentArray.filter((v) => v !== selectedValue);
    } else {
      newValues = [...currentArray, selectedValue];
    }

    handleSpecificationChange(key, newValues.join(", "));
  };

  const renderField = (spec) => {
    const value = specification?.[spec.key] || "";
    const error = validationErrors[spec.key];

    switch (spec.type) {
      case "select": {
        const isOpen = openDropdowns[spec.key];
        return (
          <div
            key={spec.key}
            className="relative"
            ref={(el) => (dropdownRefs.current[spec.key] = el)}
          >
            <label
              htmlFor={spec.key}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {spec.label}
              {spec.validation?.required && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown(spec.key)}
                className={`w-full px-3 py-2 text-left border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white flex justify-between items-center ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
              >
                <span className={value ? "text-gray-900" : "text-gray-500"}>
                  {value || spec.placeholder}
                </span>
                <svg
                  className={`w-5 h-5 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => selectOption(spec.key, "")}
                      className="block w-full px-3 py-2 text-left text-gray-500 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                    >
                      {spec.placeholder}
                    </button>
                    {spec.options.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => selectOption(spec.key, option)}
                        className={`block w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none ${
                          value === option
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-900"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
        );
      }

      case "multiselect": {
        const selectedValues = value ? value.split(", ").filter((v) => v) : [];
        const isOpen = openDropdowns[spec.key];
        return (
          <div
            key={spec.key}
            className="relative"
            ref={(el) => (dropdownRefs.current[spec.key] = el)}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {spec.label}
              {spec.validation?.required && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown(spec.key)}
                className={`w-full px-3 py-2 text-left border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white flex justify-between items-center ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
              >
                <span
                  className={
                    selectedValues.length > 0
                      ? "text-gray-900"
                      : "text-gray-500"
                  }
                >
                  {selectedValues.length > 0
                    ? `${selectedValues.length} selected`
                    : spec.placeholder}
                </span>
                <svg
                  className={`w-5 h-5 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  <div className="py-1">
                    {spec.options.map((option) => (
                      <label
                        key={option}
                        className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedValues.includes(option)}
                          onChange={() =>
                            handleMultiSelectChange(spec.key, option)
                          }
                          className="mr-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-900">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {selectedValues.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {selectedValues.map((selectedValue) => (
                  <span
                    key={selectedValue}
                    className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {selectedValue}
                    <button
                      type="button"
                      onClick={() =>
                        handleMultiSelectChange(spec.key, selectedValue)
                      }
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
        );
      }

      case "textarea":
        return (
          <div key={spec.key}>
            <label
              htmlFor={spec.key}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {spec.label}
              {spec.validation?.required && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </label>
            <textarea
              id={spec.key}
              rows={3}
              value={value}
              onChange={(e) =>
                handleSpecificationChange(spec.key, e.target.value)
              }
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={spec.placeholder}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
        );

      default: // text input
        return (
          <div key={spec.key}>
            <label
              htmlFor={spec.key}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {spec.label}
              {spec.validation?.required && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </label>
            <input
              type="text"
              id={spec.key}
              value={value}
              onChange={(e) =>
                handleSpecificationChange(spec.key, e.target.value)
              }
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={spec.placeholder}
            />
            {spec.validationMessage && !error && (
              <p className="text-xs text-gray-500 mt-1">
                {spec.validationMessage}
              </p>
            )}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
        );
    }
  };

  if (relevantSpecs.length === 0 && !onSpecificationsChange) return null;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Product Specifications</h3>

      <div className="space-y-4 border border-gray-200 p-6 rounded-lg bg-white">
        <p className="text-sm text-gray-600 mb-4">
          Provide detailed specifications applicable to your {categoryName}{" "}
          product. If none of the fields below are relevant, you can use the
          additional specifications box at the bottom.
        </p>

        {/* Structured Specifications (Key-Value Pairs) */}
        {relevantSpecs.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-800 border-b pb-2">
              Standard Specifications
            </h4>
            {relevantSpecs.map(renderField)}
          </div>
        )}

        {/* Free-form Additional Specifications */}
        {onSpecificationsChange && (
          <div className="space-y-2">
            {relevantSpecs.length > 0 && (
              <h4 className="text-md font-medium text-gray-800 border-b pb-2 mt-6">
                Additional Specifications
              </h4>
            )}
            <label
              htmlFor="additionalSpecifications"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {relevantSpecs.length === 0
                ? "Product Specifications"
                : "Other Specifications"}
            </label>
            <textarea
              id="additionalSpecifications"
              rows={4}
              value={specifications || ""}
              onChange={(e) => onSpecificationsChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add any additional specifications not covered above (e.g., warranty details, special features, care instructions, etc.)"
            />
            <p className="text-xs text-gray-500">
              Use this field for any specifications not covered in the standard
              fields above
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecificationsSection;
