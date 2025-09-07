import SubcategorySelector from "./SubCategorySelector";
import * as nigerianStates from "nigerian-states-and-lgas";

const allStatesAndLGAs = nigerianStates.all();

const ProductDetails = ({ formData, onInputChange, selectedCategory }) => {
  // Get available states
  const stateOptions = allStatesAndLGAs.map((state) => ({
    value: state.state,
    label: state.state,
  }));

  // Get LGAs for selected state
  const getLGAOptions = (selectedState) => {
    if (!selectedState) return [];
    const stateData = allStatesAndLGAs.find(
      (state) => state.state === selectedState
    );
    return stateData
      ? stateData.lgas.map((lga) => ({
          value: lga,
          label: lga,
        }))
      : [];
  };

  // Handle state change and reset LGA
  const handleStateChange = (value) => {
    onInputChange("state", value);
    // Reset LGA when state changes
    onInputChange("local_govt", "");
  };

  const handleTitleChange = (value) => {
    onInputChange("title", value);
  };

  const lgaOptions = getLGAOptions(formData.state);
  const titleLength = formData.title?.length || 0;
  const isAtLimit = titleLength >= 50;

  return (
    <div className="mb-6">
      <h2 className="text-sm md:text-[20px] font-bold mb-2">
        Please ensure all details are accurate before publishing
      </h2>
      <h3 className="text-[16px] font-medium mb-2">Product Details</h3>

      <div className="space-y-4 border-[1px] border-neutral-200 p-4 rounded-md">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Name
          </label>
          <div className="relative">
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 pr-12 ${
                isAtLimit
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Name of Product/Dish"
              required
              maxLength={50}
            />
            <div
              className={`absolute right-2 top-2 text-xs ${
                titleLength > 40 ? "text-red-500" : "text-gray-400"
              }`}
            >
              {titleLength}/50
            </div>
          </div>
          {titleLength > 40 && (
            <p
              className={`text-xs mt-1 ${
                isAtLimit ? "text-red-500" : "text-orange-500"
              }`}
            >
              {isAtLimit
                ? "Character limit reached"
                : `${50 - titleLength} characters remaining`}
            </p>
          )}
        </div>

        {/* Subcategory Selector */}
        <SubcategorySelector
          selectedCategory={selectedCategory}
          selectedSubcategory={formData.subcategory}
          onSubcategoryChange={(subcategory) =>
            onInputChange("subcategory", subcategory)
          }
        />

        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            State
          </label>
          <select
            id="state"
            value={formData.state}
            onChange={(e) => handleStateChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          >
            <option value="">Select State</option>
            {stateOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="local_govt"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Local Government Area
          </label>
          <select
            id="local_govt"
            value={formData.local_govt}
            onChange={(e) => onInputChange("local_govt", e.target.value)}
            disabled={!formData.state}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:opacity-50"
            required
          >
            <option value="">
              {formData.state ? "Select LGA" : "Select State First"}
            </option>
            {lgaOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Brand Name
          </label>
          <input
            type="text"
            id="brand"
            value={formData.brand}
            onChange={(e) => onInputChange("brand", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Brand Name"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
