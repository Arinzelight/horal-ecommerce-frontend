// Define which specifications to show based on category
const specificationsByCategory = {
  food: ["ingredients", "weight", "volume", "shelfLife", "dietaryInfo"],
  fashion: ["material", "size", "dimensions", "weight", "care", "shade"],
  electronics: [
    "dimensions",
    "weight",
    "connectivity",
    "powerSource",
    "warranty",
  ],
  beauty: ["ingredients", "weight", "volume", "shelfLife", "shade"],
  health: ["ingredients", "weight", "volume", "shelfLife", "dietaryInfo"],
  automotive: ["dimensions", "weight", "material", "care"],
  furniture: ["dimensions", "weight", "material", "care"],
  books: ["dimensions", "weight", "material", "care"],
  jewelry: ["dimensions", "weight", "material", "care"],
  gadget: ["dimensions", "weight", "connectivity", "powerSource", "warranty"],
  "home-garden": ["dimensions", "weight", "material", "care"],
  sports: ["dimensions", "weight", "material", "care"],
  toys: ["dimensions", "weight", "material", "ageRecommendation", "safetyInfo"],
  "babies": [
    "dimensions",
    "weight",
    "material",
    "ageRecommendation",
    "safetyInfo",
  ],
  "health-beauty": ["ingredients", "weight", "volume", "shelfLife", "shade"],
};

// Labels for specifications
const specificationLabels = {
  ingredients: "Ingredients",
  weight: "Weight",
  volume: "Volume",
  shelfLife: "Shelf Life",
  dietaryInfo: "Dietary Information (Vegan, Gluten-Free)",
  material: "Material",
  size: "Size",
  dimensions: "Dimensions",
  care: "Care Instructions",
  shade: "Shade",
  connectivity: "Connectivity",
  powerSource: "Power Source",
  warranty: "Warranty",
  ageRecommendation: "Age Recommendation",
  safetyInfo: "Safety Information",
};

const SpecificationsSection = ({
  category,
  specifications,
  onSpecificationChange,
}) => {
  // Get specifications for the selected category
  const relevantSpecs = specificationsByCategory[category] || [];

  if (relevantSpecs.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="text-[16px] font-medium mb-4">Specifications</h3>

      <div className="space-y-4 border-[1px] border-neutral-200 p-4 rounded-md">
        {relevantSpecs.map((spec) => (
          <div key={spec}>
            <label
              htmlFor={spec}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {specificationLabels[spec]}
            </label>
            <input
              type="text"
              id={spec}
              value={specifications[spec] || ""}
              onChange={(e) => onSpecificationChange(spec, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecificationsSection;
