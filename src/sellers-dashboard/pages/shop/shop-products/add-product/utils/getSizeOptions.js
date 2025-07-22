import { sizeOptions } from "./constants";

export const getSizeOptions = (sizeType, category) => {
  if (sizeType === "noSize") return ["One Size"];

  if (category === "children") {
    return sizeOptions[sizeType] || sizeOptions.childrenClothing;
  }
  return sizeOptions[sizeType] || sizeOptions.clothing;
};

export const getSizeTypeOptions = (category) => {
  const baseOptions = [
    { value: "noSize", label: "No Size (e.g., Eyeglasses, Accessories)" },
  ];

  if (category === "fashion") {
    return [
      ...baseOptions,
      { value: "clothing", label: "Clothing Size" },
      { value: "footwear", label: "Footwear Size" },
    ];
  } else if (category === "children") {
    return [
      ...baseOptions,
      { value: "childrenClothing", label: "Clothing Size" },
      { value: "childrenFootwear", label: "Footwear Size" },
    ];
  }
  return [...baseOptions, { value: "clothing", label: "Standard Size" }];
};

export const getSizeTypeLabel = (sizeType, category) => {
  const options = getSizeTypeOptions(category);
  return options.find((opt) => opt.value === sizeType)?.label || "";
};

export const isNoSizeType = (sizeType) => sizeType === "noSize";
