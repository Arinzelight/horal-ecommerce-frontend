import { useEffect, useState } from "react";
import CategorySelector from "./components/CategorySelector";
import ProductDetails from "./components/ProductDetails";
import VariantManager from "./components/VariantManager"; 
import MediaUpload from "./components//MediaUpload";
import ConditionSelector from "./components//ConditionSelector";
import OriginSection from "./components/OriginSection"
import SpecificationsSection from "./components/SpecificationSection";
import PricingSection from "./components/PricingSection";
import AgeRangeSelector from "./components/AgeRangeSelector";
import { createProduct } from "../../../../../redux/product/thunks/productThunk";
import { useDispatch, useSelector } from "react-redux";
import ProductDescription from "./components/ProductDescription";
import InventorySection from "./components/InventorySection";
import toast from "react-hot-toast";
import { clearCreateSuccess, clearError } from "../../../../../redux/product/slices/productSlice";
const AddProduct = ({ onAddProduct }) => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [variants, setVariants] = useState([]); 
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    description: "",
    subcategory: "",
    quantity: 0, 
    sku: "",
    images: [],
    video: null,
    condition: "",
    state: "",
    local_govt: "",
    occasion: [],
    production_date: "",
    ageRange: "",
    specification: {
      ingredients: "",
      weight: "",
      volume: "",
      shelfLife: "",
      dietaryInfo: "",
      shade: "",
    },
    specifications: "",
    price: 0,
  });

  const {creating, createSuccess, error} = useSelector((state) => state.products);

  const handleCategoryChange = (category) => {
    console.log("Selected category:", category.name || category);
    setSelectedCategory(category);
    // Reset condition when category changes
    setFormData({
      ...formData,
      condition: "",
      subcategory: "",
      ageRange: "",
    });
    // Reset variants when category changes
    setVariants([]);
  };

  useEffect(() => {
    if(createSuccess) {
      toast.success("Product created successfully!");
      handleDiscard();
      dispatch(clearCreateSuccess());
    }
  }, [createSuccess, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to create product");
      //handle different error code cases
      if (error.response && error.response.data) {
        const { status, detail } = error.response.data;
        switch (status) {
          case 403:
            toast.error(`An error occured,please login to add product`);
            break;
          case 500:
            toast.error(`Server Error: ${detail}`);
            break;
          
          default:
            toast.error(`Error: ${detail}`);
        }
      }
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSpecificationChange = (field, value) => {
    setFormData({
      ...formData,
      specification: {
        ...formData.specification,
        [field]: value,
      },
    });
  };

  const handleSpecificationsChange = (value) => {
    setFormData({
      ...formData,
      specifications: value,
    });
  };

  // Handle variants change from VariantManager
  const handleVariantsChange = (newVariants) => {
    setVariants(newVariants);
    // Update total quantity based on variants
    const totalQuantity = newVariants.reduce((total, variant) => {
      return total + variant.stock_quantity;
    }, 0);
    setFormData({
      ...formData,
      quantity: totalQuantity,
    });
  };

  const formatImagesForAPI = (images) => {
    return images.map((imageUrl, index) => ({
      url: imageUrl,
      alt_text: `Product image ${index + 1}`,
    }));
  };

  const formatSpecificationsForAPI = (specification) => {
    const formatted = {};

    // Only include non-empty specifications
    Object.entries(specification).forEach(([key, value]) => {
      if (value && value.trim() !== "") {
        formatted[key] = value;
      }
    });

    return formatted;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (
      !selectedCategory ||
      !formData.title ||
      !formData.description ||
      !formData.subcategory ||
      formData.price <= 0 
    ) {
      toast.error(
        "Please fill in all required fields: Category, Title, Price, Subcategory, Description"
      );
      return;
    }

    if (formData.images.length === 0) {
      toast.error("Please add at least one product image");
      return;
    }

    // Check if variants are required for this category
    const variantRequiredCategories = ["fashion", "children",  "health", "beauty", "accessories", "vehicles"];
    if (variantRequiredCategories.includes(selectedCategory.name) && variants.length === 0) {
      toast.error("Please add at least one product variant (color/size combination)");
      return;
    }


    const hasEmptyStock = variants?.some((colorVariant) =>
      colorVariant.variants?.some((variant) => variant.stockQuantity === 0)
    );

    if (hasEmptyStock) {
      toast.error("Please ensure all variants have stock quantities greater than 0");
      return;
    }

    try {
      // Create the product data according to API format
      const productData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        condition: formData.condition,
        brand: formData.brand,
        sku: formData.sku,
        occasion: formData.occasion,
        is_published: true,
        live_video_url: formData.video,
        state: formData.state,
        local_govt: formData.local_govt,
        category: selectedCategory.name,
        sub_category: formData.subcategory || null,
        images: formatImagesForAPI(formData.images),
        variants: variants, 
        ...formatSpecificationsForAPI(
          formData.specification,
          selectedCategory
        ),
        specification: formData.specifications || null
      };

      console.log("Submitting product data:", productData);

      // Dispatch the createProduct action
      const result = await dispatch(
        createProduct({
          category_name: selectedCategory.name,
          productData: productData,
        })
      ).unwrap();

      console.log("Product created successfully:", result);

      // Call the parent callback if provided
      if (onAddProduct) {
        onAddProduct(result);
      }

      // Reset form after successful submission
      handleDiscard();

    } catch (error) {
      console.error("Error creating product:", error);
      // toast.error(`Error creating product: ${error.message || error}`);
    }
  };

  const handleDiscard = () => {
    // Reset form
    setFormData({
      title: "",
      brand: "",
      description: "",
      subcategory: "",
      quantity: 0,
      sku: "",
      images: [],
      occasion: [],
      production_date: "",
      state: "",
      local_govt: "",
      video: null,
      condition: "",
      specification: {
        ingredients: "",
        weight: "",
        volume: "",
        shelfLife: "",
        dietaryInfo: "",
        shade: "",
      },
      specifications: "",
      price: 0,
      ageRange: "",
    });
    setSelectedCategory("");
    setVariants([]);
  };

  // Check if current category supports variants
  const supportsVariants = () => {
    return ["fashion", "children", "health", "beauty", "accessories", "vehicles", "gadget"].includes(selectedCategory.name);
  };

  return (
    <div className="flex-1">
      <form onSubmit={handleSubmit} className="mt-6">
        <CategorySelector
          selectedCategory={selectedCategory?.id || ""}
          onCategoryChange={handleCategoryChange}
        />

        {selectedCategory && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-2">
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
                  onConditionChange={(value) =>
                    handleInputChange("condition", value)
                  }
                />
              )}

              {["children"].includes(selectedCategory.name) && (
                <AgeRangeSelector
                  selectedAgeRange={formData.ageRange}
                  onAgeRangeChange={(value) =>
                    handleInputChange("ageRange", value)
                  }
                />
              )}

              {selectedCategory && selectedCategory.name === "foods" && (
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

            <div>
              <ProductDescription
                description={formData.description}
                onDescriptionChange={(value) =>
                  handleInputChange("description", value)
                }
              />

              {supportsVariants() && (
                <VariantManager
                  category={selectedCategory.name}
                  onVariantsChange={handleVariantsChange}
                />
              )}

              {/* Show simple inventory section only for categories that don't support variants */}
              {!supportsVariants() && (
                <InventorySection
                  quantity={formData.quantity}
                  sku={formData.sku}
                  onInputChange={(field, value) =>
                    handleInputChange(field, value)
                  }
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
              {selectedCategory && (
                <div className="mt-8 flex flex-col md:flex-row justify-between space-x-4 gap-4">
                  <button
                    type="button"
                    onClick={handleDiscard}
                    disabled={creating}
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    disabled={creating}
                    className="px-6 py-2 bg-secondary text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {creating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating...
                      </>
                    ) : (
                      "Publish Product"
                    )}
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