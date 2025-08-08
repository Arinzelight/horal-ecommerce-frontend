export const getInitials = (fullName) => {
  if (!fullName) return "AC";

  return fullName
    .replace(/^full_name\(pin\):\s*/, "")
    .replace(/"/g, "")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};
