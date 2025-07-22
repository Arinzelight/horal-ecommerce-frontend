const colorClasses = {
  // Standard colors
  red: "bg-red-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
  yellow: "bg-yellow-500",
  black: "bg-black",
  white: "bg-white",
  orange: "bg-orange-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  brown: "bg-amber-800", // Tailwind doesn't have brown, using amber-800 as substitute
  gray: "bg-gray-500",
  indigo: "bg-indigo-500",

  // Special/mixed colors
  silver: "bg-gray-300",
  gold: "bg-yellow-400",
  "black gold": "bg-gradient-to-r from-black to-yellow-600",
  cyan: "bg-cyan-500",
  magenta: "bg-fuchsia-500",
  lime: "bg-lime-500",
  amber: "bg-amber-500",
  teal: "bg-teal-500",
  maroon: "bg-red-800",
  turquoise: "bg-teal-300",
  olive: "bg-yellow-700",
  beige: "bg-amber-100",
  transparent: "bg-transparent",

  // Additional colors from your VariantManager
  bronze: "bg-amber-600", // Closest to bronze
  navy: "bg-blue-900",
  coral: "bg-orange-400", // Closest to coral
  salmon: "bg-orange-300", // Closest to salmon
  khaki: "bg-yellow-200", // Closest to khaki
  lavender: "bg-purple-200", // Closest to lavender
  peach: "bg-orange-200", // Closest to peach
  mint: "bg-green-200", // Closest to mint

  // Fallback for unknown colors
  default: "bg-gray-300",
};

// Helper function with fallback
export const getColorClass = (color) =>
  colorClasses[color.toLowerCase()] || colorClasses.default;
