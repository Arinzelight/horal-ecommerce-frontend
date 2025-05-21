
import { useState } from "react";
import CategorySelector from "./CategorySelector";
import ProductDetails from "./ProductDetails";
import InventorySection from "./InventorySection";
import MediaUpload from "./MediaUpload";
import ConditionSelector from "./ConditionSelector";
import OriginSection from "./OriginSection";
import SpecificationsSection from "./SpecificationSection";
import ColorSelector from "./ColorSelector";
import PricingSection from "./PricingSection";
import AgeRangeSelector from "./AgeRangeSelector";
import SizeSelector from "./SizeSelector";

const AddProduct = ({ onAddProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    quantity: 1,
    sku: "",
    images: [],
    video: null,
    condition: "",
    origin: "",
    sizes: [],
    ageRange: "",
    specifications: {
      ingredients: "",
      weight: "",
      volume: "",
      shelfLife: "",
      dietaryInfo: "",
      shade: "",
    },
    color: [],
    price: 0,
  });

  const handleCategoryChange = (category) => {
    console.log("Selected category:", category);
    setSelectedCategory(category);
    // Reset condition when category changes
    setFormData({
      ...formData,
      condition: "",
      sizes:  [],
      ageRange: "",
    });
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSpecificationChange = (field, value) => {
    setFormData({
      ...formData,
      specifications: {
        ...formData.specifications,
        [field]: value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!selectedCategory || !formData.name || !formData.price) {
      alert("Please fill in all required fields");
      return;
    }

    // Create new product object
    const newProduct = {
      ...formData,
      category: selectedCategory,
      price: Number.parseFloat(formData.price),
      image: formData.images.length > 0 ? formData.images[0] : null,
    };

    onAddProduct(newProduct);
    console.log("newProduct:", newProduct);

    // Reset form
    setFormData({
      name: "",
      brand: "",
      description: "",
      quantity: 1,
      sku: "",
      images: [],
      video: null,
      condition: "",
      origin: "",
      specifications: {
        ingredients: "",
        weight: "",
        volume: "",
        shelfLife: "",
        dietaryInfo: "",
        shade: "",
      },
      color: [],
      price: 0,
    });
    setSelectedCategory("");
  };

  const handleDiscard = () => {
    // Reset form
    setFormData({
      name: "",
      brand: "",
      description: "",
      quantity: 1,
      sku: "",
      images: [],
      video: null,
      condition: "",
      origin: "",
      specifications: {
        ingredients: "",
        weight: "",
        volume: "",
        shelfLife: "",
        dietaryInfo: "",
        shade: "",
      },
      color: [],
      price: 0,
      ageRange: "",
      sizes: [],
    });
    setSelectedCategory("");
  };

  return (
    <div className="flex-1 ">
      <form onSubmit={handleSubmit} className="mt-6  ">
        <CategorySelector
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {selectedCategory && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="">
              <ProductDetails
                formData={formData}
                onInputChange={handleInputChange}
              />

              {selectedCategory && (
                <ConditionSelector
                  category={selectedCategory}
                  selectedCondition={formData.condition}
                  onConditionChange={(value) =>
                    handleInputChange("condition", value)
                  }
                />
              )}
              {["toys", "babies"].includes(selectedCategory) && (
                <AgeRangeSelector
                  selectedAgeRange={formData.ageRange}
                  onAgeRangeChange={(value) =>
                    handleInputChange("ageRange", value)
                  }
                />
              )}

              {selectedCategory && selectedCategory === "food" && (
                <OriginSection
                  origin={formData.origin}
                  onOriginChange={(value) => handleInputChange("origin", value)}
                />
              )}

              <SpecificationsSection
                category={selectedCategory}
                specifications={formData.specifications}
                onSpecificationChange={handleSpecificationChange}
              />
            </div>

            <div>
              <InventorySection
                quantity={formData.quantity}
                sku={formData.sku}
                onInputChange={handleInputChange}
              />

              {["fashion", "babies"].includes(selectedCategory) && (
                <SizeSelector
                  category={selectedCategory}
                  selectedSizes={formData.sizes}
                  onSizesChange={(sizes) => handleInputChange("sizes", sizes)}
                />
              )}

              <MediaUpload
                images={formData.images}
                video={formData.video}
                onImagesChange={(images) => handleInputChange("images", images)}
                onVideoChange={(video) => handleInputChange("video", video)}
              />

              {["fashion", "health", "beauty", "babies"].includes(
                selectedCategory
              ) && (
                <ColorSelector
                  selectedColor={formData.color}
                  onColorChange={(color) => handleInputChange("color", color)}
                />
              )}

              <PricingSection
                price={formData.price}
                onPriceChange={(price) => handleInputChange("price", price)}
              />
              {selectedCategory && (
                <div className="mt-8 flex flex-col md:flex-row justify-between space-x-4 gap-4">
                  <button
                    type="button"
                    onClick={handleDiscard}
                    className="px-6 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 w-full md:w-[125px] md:h-[33px]"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600 w-full md:w-[125px] md:h-[33px]"
                  >
                    Publish
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
