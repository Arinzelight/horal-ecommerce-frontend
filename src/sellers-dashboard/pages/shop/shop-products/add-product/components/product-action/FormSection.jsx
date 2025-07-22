// FormSections.jsx
import React from "react";
import CategorySelector from "../CategorySelector";
import ProductDetails from "../ProductDetails";
import VariantManager from "../VariantManager";
import MediaUpload from "../MediaUpload";
import ConditionSelector from "../ConditionSelector";
import OriginSection from "../OriginSection";
import SpecificationsSection from "../SpecificationSection";
import PricingSection from "../PricingSection";
import AgeRangeSelector from "../AgeRangeSelector";
import ProductDescription from "../ProductDescription";
import InventorySection from "../InventorySection";

export const CategorySection = ({ selectedCategory, handleCategoryChange }) => (
  <CategorySelector
    selectedCategory={selectedCategory?.id || ""}
    onCategoryChange={handleCategoryChange}
  />
);

export const LeftFormSection = ({
  selectedCategory,
  formData,
  handleInputChange,
  handleSpecificationChange,
  handleSpecificationsChange,
}) => (
  <div className="">
    <ProductDetails
      formData={formData}
      onInputChange={handleInputChange}
      selectedCategory={selectedCategory.id}
    />

    {selectedCategory && (
      <ConditionSelector
        category={selectedCategory.name}
        selectedCondition={formData.condition}
        onConditionChange={(value) => handleInputChange("condition", value)}
      />
    )}

    {["children"].includes(selectedCategory.name) && (
      <AgeRangeSelector
        selectedAgeRange={formData.ageRange}
        onAgeRangeChange={(value) => handleInputChange("ageRange", value)}
      />
    )}

    {selectedCategory?.name === "foods" && (
      <OriginSection
        origin={formData.origin}
        onOriginChange={(value) => handleInputChange("origin", value)}
      />
    )}

    <SpecificationsSection
      category={selectedCategory.name}
      specification={formData.specification}
      specifications={formData.specifications}
      onSpecificationChange={handleSpecificationChange}
      onSpecificationsChange={handleSpecificationsChange}
    />
  </div>
);

export const RightFormSection = ({
  formData,
  handleInputChange,
  supportsVariants,
  selectedCategory,
  handleVariantsChange,
  productToEdit,
}) => (
  <div>
    <ProductDescription
      description={formData.description}
      onDescriptionChange={(value) => handleInputChange("description", value)}
    />

    {supportsVariants() && (
      <VariantManager
        category={selectedCategory.name}
        onVariantsChange={handleVariantsChange}
        initialVariants={productToEdit?.variants_details || []}
      />
    )}

    {/* Show simple inventory section only for categories that don't support variants */}
    {!supportsVariants() && (
      <InventorySection
        quantity={formData.quantity}
        sku={formData.sku}
        onInputChange={handleInputChange}
      />
    )}

    <MediaUpload
      images={formData.images}
      video={formData.video}
      onImagesChange={(images) => handleInputChange("images", images)}
      onVideoChange={(video) => handleInputChange("video", video)}
    />

    <PricingSection
      price={formData.price}
      onPriceChange={(price) => handleInputChange("price", price)}
    />
  </div>
);
