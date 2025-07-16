import {
  FaTshirt,
  FaGem,
  FaHeartbeat,
  FaMobile,
  FaBaby,
  FaTools,
  FaUtensils,
  FaCar,
   // fallback icon
} from "react-icons/fa";
import React from "react";

// Icon mapping based on category names
const CATEGORY_ICON_MAP = {
  // Fashion variations
  fashion: FaTshirt,
  clothing: FaTshirt,
  apparel: FaTshirt,

  // Accessories variations
  accessories: FaGem,
  jewelry: FaGem,
  jewellery: FaGem,

  // Health & Beauty variations
  "health and beauty": FaHeartbeat,
  "health & beauty": FaHeartbeat,
  beauty: FaHeartbeat,
  health: FaHeartbeat,
  cosmetics: FaHeartbeat,

  // Electronics variations
  electronics: FaMobile,
  electronic: FaMobile,
  phones: FaMobile,
  mobile: FaMobile,

  // Children variations
  children: FaBaby,
  kids: FaBaby,
  baby: FaBaby,
  toys: FaBaby,

  // Gadgets variations
  gadgets: FaTools,
  gadget: FaTools,
  tools: FaTools,
  equipment: FaTools,

  // Food variations
  food: FaUtensils,
  foods: FaUtensils,
  restaurant: FaUtensils,
  dining: FaUtensils,
  grocery: FaUtensils,

  // Vehicles variations
  vehicles: FaCar,
  vehicle: FaCar,
  cars: FaCar,
  automotive: FaCar,
  transport: FaCar,
};


//   Maps a category name to its corresponding icon component
 export const getCategoryIcon = (categoryName) => {
  if (!categoryName) return FaTshirt;

  // Normalize the category name (lowercase, trim spaces)
  const normalizedName = categoryName.toLowerCase().trim();

  // Direct match
  if (CATEGORY_ICON_MAP[normalizedName]) {
    return CATEGORY_ICON_MAP[normalizedName];
  }

  // check if any key contains the category name or vice versa
  const matchedKey = Object.keys(CATEGORY_ICON_MAP).find((key) => {
    return key.includes(normalizedName) || normalizedName.includes(key);
  });

  if (matchedKey) {
    return CATEGORY_ICON_MAP[matchedKey];
  }

  // Return default icon if no match found
  return FaTshirt;
};

// Adds icons to an array of categories
export const addIconsToCategories = (categories) => {
  if (!Array.isArray(categories)) return [];

  return categories.map((category) => ({
    ...category,
    icon: getCategoryIcon(category.name),
  }));
};

// Get icon component as JSX element
export const getCategoryIconElement = (categoryName) => {
  const IconComponent = getCategoryIcon(categoryName);
  return React.createElement(IconComponent);
};
