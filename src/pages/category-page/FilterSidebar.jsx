
// import { useMemo, useState } from "react"
// import { FaChevronDown, FaChevronUp } from "react-icons/fa"



// export default function FilterSidebar({
//   categories,
//   brands,
//   conditions,
//   states,
//   lgas,
//   priceRanges,
//   selectedCategories,
//   selectedBrands,
//   selectedConditions,
//   selectedRating,
//   priceRange,
//   selectedState,
//   selectedLGA,
//   onCategoryChange,
//   onBrandChange,
//   onConditionChange,
//   onRatingChange,
//   onPriceRangeChange,
//   onStateChange,
//   onLGAChange,
//   onClearFilters,
//   isMobile,
// }) {
//   const [expandedFilters, setExpandedFilters] = useState({
//     categories: true,
//     brands: true,
//     condition: true,
//     rating: true,
//     price: true,
//     location: true,
//   });

//   // Toggle filter sections
//   const toggleFilterSection = (section) => {
//     setExpandedFilters({
//       ...expandedFilters,
//       [section]: !expandedFilters[section],
//     });
//   };

//   const hasActiveFilters =
//     selectedCategories.length > 0 ||
//     selectedBrands.length > 0 ||
//     selectedConditions.length > 0 ||
//     selectedRating !== null ||
//     selectedState !== null ||
//     selectedLGA !== null ||
//     priceRange[0] > 0 ||
//     priceRange[1] < 1000000;

//   const ratingOptions = useMemo(() => [4.5, 4.0, 3.0, 2.0, 1.0], []);

//   // Helper function to check if a price range is selected
//   const isPriceRangeSelected = (priceRange, range) => {
//     return priceRange[0] === range.min && priceRange[1] === range.max;
//   };

//   return (
//     <div className={`${isMobile ? "w-full" : "w-64"} flex-shrink-0`}>
//       <div className="bg-white rounded-lg shadow p-4">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-bold">Filter by</h2>
//           {hasActiveFilters && (
//             <button
//               onClick={onClearFilters}
//               className="text-sm text-blue-500 hover:text-blue-700"
//             >
//               Clear All
//             </button>
//           )}
//         </div>

//         {/* Category Filter */}
//         <div className="mb-6">
//           <div
//             className="flex justify-between items-center cursor-pointer mb-2"
//             onClick={() => toggleFilterSection("categories")}
//           >
//             <h3 className="font-semibold">Categories</h3>
//             {expandedFilters.categories ? <FaChevronUp /> : <FaChevronDown />}
//           </div>
//           {expandedFilters.categories && (
//             <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
//               {categories.map((category) => (
//                 <div key={category.name} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id={`category-${category.name}`}
//                     checked={selectedCategories.includes(category.name)}
//                     onChange={() => onCategoryChange(category.name)}
//                     className="mr-2"
//                   />
//                   <label
//                     htmlFor={`category-${category.name}`}
//                     className="text-sm cursor-pointer flex items-center"
//                   >
//                     {category.name}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Brand Filter */}
//         <div className="mb-6">
//           <div
//             className="flex justify-between items-center cursor-pointer mb-2"
//             onClick={() => toggleFilterSection("brands")}
//           >
//             <h3 className="font-semibold">Brand</h3>
//             {expandedFilters.brands ? <FaChevronUp /> : <FaChevronDown />}
//           </div>
//           {expandedFilters.brands && (
//             <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
//               {brands.map((brand) => (
//                 <div key={brand} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id={`brand-${brand}`}
//                     checked={selectedBrands.includes(brand)}
//                     onChange={() => onBrandChange(brand)}
//                     className="mr-2"
//                   />
//                   <label
//                     htmlFor={`brand-${brand}`}
//                     className="text-sm cursor-pointer"
//                   >
//                     {brand}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Condition Filter */}
//         <div className="mb-6">
//           <div
//             className="flex justify-between items-center cursor-pointer mb-2 custom-scrollbar"
//             onClick={() => toggleFilterSection("condition")}
//           >
//             <h3 className="font-semibold">Condition</h3>
//             {expandedFilters.condition ? <FaChevronUp /> : <FaChevronDown />}
//           </div>
//           {expandedFilters.condition && (
//             <div className="space-y-2">
//               {conditions.map((condition) => (
//                 <div key={condition} className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id={`condition-${condition}`}
//                     checked={selectedConditions.includes(condition)}
//                     onChange={() => onConditionChange(condition)}
//                     className="mr-2"
//                   />
//                   <label
//                     htmlFor={`condition-${condition}`}
//                     className="text-sm cursor-pointer"
//                   >
//                     {condition}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Rating Filter */}
//         <div className="mb-6">
//           <div
//             className="flex justify-between custom-scrollbar items-center cursor-pointer mb-2"
//             onClick={() => toggleFilterSection("rating")}
//           >
//             <h3 className="font-semibold">Ratings</h3>
//             {expandedFilters.rating ? <FaChevronUp /> : <FaChevronDown />}
//           </div>
//           {expandedFilters.rating && (
//             <div className="space-y-2">
//               {ratingOptions.map((rating) => (
//                 <div key={rating} className="flex items-center">
//                   <input
//                     type="radio"
//                     id={`rating-${rating}`}
//                     checked={selectedRating === rating}
//                     onChange={() => onRatingChange(rating)}
//                     className="mr-2"
//                   />
//                   <label
//                     htmlFor={`rating-${rating}`}
//                     className="text-sm cursor-pointer flex items-center"
//                   >
//                     {rating} & above
//                     <div className="ml-2 flex text-yellow-400">
//                       {Array.from({ length: 5 }).map((_, i) => (
//                         <span
//                           key={i}
//                           className={
//                             i < Math.floor(rating)
//                               ? "text-yellow-400"
//                               : "text-gray-300"
//                           }
//                         >
//                           ★
//                         </span>
//                       ))}
//                     </div>
//                   </label>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Price Filter */}
//         <div className="mb-6">
//           <div
//             className="flex justify-between custom-scrollbar items-center cursor-pointer mb-2"
//             onClick={() => toggleFilterSection("price")}
//           >
//             <h3 className="font-semibold">Price</h3>
//             {expandedFilters.price ? <FaChevronUp /> : <FaChevronDown />}
//           </div>
//           {expandedFilters.price && (
//             <div className="space-y-2">
//               {priceRanges.map((range, index) => (
//                 <div key={index} className="flex items-center">
//                   <input
//                     type="radio"
//                     id={`price-${index}`}
//                     checked={isPriceRangeSelected(priceRange, range)}
//                     onChange={() => onPriceRangeChange(range.min, range.max)}
//                     className="mr-2"
//                   />
//                   <label
//                     htmlFor={`price-${index}`}
//                     className="text-sm cursor-pointer"
//                   >
//                     {range.label}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Location Filter */}
//         <div className="mb-6">
//           <div
//             className="flex justify-between custom-scrollbar items-center cursor-pointer mb-2"
//             onClick={() => toggleFilterSection("location")}
//           >
//             <h3 className="font-semibold">Location</h3>
//             {expandedFilters.location ? <FaChevronUp /> : <FaChevronDown />}
//           </div>
//           {expandedFilters.location && (
//             <div>
//               <h4 className="text-sm font-medium mb-2">State</h4>
//               <div className="space-y-2 max-h-32 custom-scrollbar overflow-y-auto mb-4">
//                 {states.map((state) => (
//                   <div key={state} className="flex items-center">
//                     <input
//                       type="radio"
//                       id={`state-${state}`}
//                       checked={selectedState === state}
//                       onChange={() => onStateChange(state)}
//                       className="mr-2"
//                     />
//                     <label
//                       htmlFor={`state-${state}`}
//                       className="text-sm cursor-pointer"
//                     >
//                       {state}
//                     </label>
//                   </div>
//                 ))}
//               </div>

//               {selectedState && (
//                 <>
//                   <h4 className="text-sm font-medium mb-2">LGA</h4>
//                   <div className="space-y-2 max-h-32 custom-scrollbar overflow-y-auto">
//                     {lgas
//                       .filter((lga) => true) // This would filter LGAs by selected state
//                       .map((lga) => (
//                         <div key={lga} className="flex items-center">
//                           <input
//                             type="radio"
//                             id={`lga-${lga}`}
//                             checked={selectedLGA === lga}
//                             onChange={() => onLGAChange(lga)}
//                             className="mr-2"
//                           />
//                           <label
//                             htmlFor={`lga-${lga}`}
//                             className="text-sm cursor-pointer"
//                           >
//                             {lga}
//                           </label>
//                         </div>
//                       ))}
//                   </div>
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaTshirt,
  FaGem,
  FaHeartbeat,
  FaMobile,
  FaBaby,
  FaTools,
  FaUtensils,
  FaCar,
  FaWrench,
  FaGamepad,
  FaHome,
  FaBook,
  FaLaptop,
  FaEllipsisH,
} from "react-icons/fa";
import {
  categories,
  getBrands,
  getLocations,
  conditions,
  ratings,
  priceRanges,
} from "../../data/mockProducts";

// Icon mapping object
const iconComponents = {
  FaTshirt: FaTshirt,
  FaGem: FaGem,
  FaHeartbeat: FaHeartbeat,
  FaMobile: FaMobile,
  FaBaby: FaBaby,
  FaTools: FaTools,
  FaUtensils: FaUtensils,
  FaCar: FaCar,
  FaWrench: FaWrench,
  FaGamepad: FaGamepad,
  FaHome: FaHome,
  FaBook: FaBook,
  FaLaptop: FaLaptop,
  FaEllipsisH: FaEllipsisH,
};

const FilterOption = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-4  pb-2">
      <div
        className="flex justify-between items-center cursor-pointer py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-semibold text-gray-700">{title}</h3>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>

      {isOpen && (
        <div className="max-h-60 overflow-y-auto py-2">{children}</div>
      )}
    </div>
  );
};

const FilterSidebar = ({ activeFilters, onFilterChange }) => {
  const brands = getBrands();
  const locations = getLocations();

  // Function to render the correct icon component
  const renderIcon = (iconName) => {
    const IconComponent = iconComponents[iconName];
    return IconComponent ? <IconComponent /> : null;
  };

  //reset filter
  const resetFilters = () => {
    onFilterChange("category", []);
    onFilterChange("brand", []);
    onFilterChange("condition", []);
    onFilterChange("rating", null);
    onFilterChange("price", null);
    onFilterChange("location", []);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 w-full flex-shrink-0">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold mb-4">Filter by</h2>
        {activeFilters.length > 0 && (
          <button
            onClick={resetFilters}
            className="text-sm text-blue-500 hover:text-blue-700 mb-4"
          >
            Clear All
          </button>
        )}
      </div>

      <FilterOption title="Category" defaultOpen={true}>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.name} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${category.name}`}
                checked={activeFilters.category.includes(category.name)}
                onChange={() => onFilterChange("category", category.name)}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label
                htmlFor={`category-${category.name}`}
                className="ml-2 text-sm text-gray-700 flex items-center"
              >
                <span className="mr-2">{renderIcon(category.icon)}</span>
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </FilterOption>

      <FilterOption title="Brand">
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand.name} className="flex items-center">
              <input
                type="checkbox"
                id={`brand-${brand.name}`}
                checked={activeFilters.brand.includes(brand.name)}
                onChange={() => onFilterChange("brand", brand.name)}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label
                htmlFor={`brand-${brand.name}`}
                className="ml-2 text-sm text-gray-700"
              >
                {brand.name}
              </label>
            </div>
          ))}
        </div>
      </FilterOption>

      <FilterOption title="Condition">
        <div className="space-y-2">
          {conditions.map((condition) => (
            <div key={condition} className="flex items-center">
              <input
                type="checkbox"
                id={`condition-${condition}`}
                checked={activeFilters.condition.includes(condition)}
                onChange={() => onFilterChange("condition", condition)}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label
                htmlFor={`condition-${condition}`}
                className="ml-2 text-sm text-gray-700"
              >
                {condition}
              </label>
            </div>
          ))}
        </div>
      </FilterOption>

      <FilterOption title="Rating">
        <div className="space-y-2">
          {ratings.map((rating) => (
            <div key={rating.value} className="flex items-center">
              <input
                type="radio"
                id={`rating-${rating.value}`}
                checked={activeFilters.rating === rating.value}
                onChange={() => onFilterChange("rating", rating.value)}
                name="rating"
                className="h-4 w-4 text-blue-600"
              />
              <label
                htmlFor={`rating-${rating.value}`}
                className="ml-2 text-sm text-gray-700 flex items-center"
              >
                {rating.label}
                <div className="ml-1 flex text-yellow-400">
                  {Array(rating.value)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                </div>
              </label>
            </div>
          ))}
        </div>
      </FilterOption>

      <FilterOption title="Price">
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <div key={range.id} className="flex items-center">
              <input
                type="radio"
                id={`price-${range.id}`}
                checked={activeFilters.price === range.id}
                onChange={() => onFilterChange("price", range.id)}
                name="price"
                className="h-4 w-4 text-blue-600"
              />
              <label
                htmlFor={`price-${range.id}`}
                className="ml-2 text-sm text-gray-700"
              >
                {range.label}
              </label>
            </div>
          ))}
        </div>
      </FilterOption>

      <FilterOption title="Location">
        <div className="space-y-2">
          {locations.map((location) => (
            <div key={location.name} className="flex items-center">
              <input
                type="checkbox"
                id={`location-${location.name}`}
                checked={activeFilters.location.includes(location.name)}
                onChange={() => onFilterChange("location", location.name)}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label
                htmlFor={`location-${location.name}`}
                className="ml-2 text-sm text-gray-700"
              >
                {location.name}
              </label>
            </div>
          ))}
        </div>
      </FilterOption>
    </div>
  );
};

export default FilterSidebar;
