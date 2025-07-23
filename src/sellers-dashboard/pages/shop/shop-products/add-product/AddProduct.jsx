import { useEffect, useState, useMemo } from "react";
import { useCategories } from "../../../../../hooks/useCategories";
import { CategorySection, LeftFormSection, RightFormSection } from './components/product-action/FormSection';
import FormActions from './components/product-action/FormActions';
import { INITIAL_FORM_DATA } from "./components/product-action/constants";
import {
  useAddProductState,
  useAddProductEffects,
  useFormHandlers,
  useProductSubmission,
  useProductUtils,
} from './components/product-action/hook';
import { useDispatch } from "react-redux";

const AddProduct = ({
  productToEdit,
  onAddProduct,
  onUpdateProduct,
  onCancel,
}) => {
  const { categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [variants, setVariants] = useState([]);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  // Memoize computed values
  const isEditMode = useMemo(() => Boolean(productToEdit), [productToEdit]);
  
 
  const { creating, updating, createSuccess, updateSuccess, error } = useAddProductState();
  
  const {
    handleInputChange,
    handleSpecificationChange,
    handleSpecificationsChange,
    handleVariantsChange,
  } = useFormHandlers(setFormData, setVariants);

  const {
    supportsVariants,
    handleCategoryChange,
    handleDiscard,
  } = useProductUtils(
    selectedCategory,
    setFormData,
    setSelectedCategory,
    setVariants,
    isEditMode,
    onCancel
  );

  const handleSubmit = useProductSubmission(
    isEditMode,
    selectedCategory,
    formData,
    variants,
    productToEdit,
    onAddProduct,
    handleDiscard,
    useDispatch()
  );

 
  useAddProductEffects(
    createSuccess,
    updateSuccess,
    error,
    isEditMode,
    onAddProduct,
    onUpdateProduct,
    handleDiscard,
    useDispatch()
  );

  // Initialize form data when editing
  useEffect(() => {
    if (!productToEdit || !categories.length) return;

    // Find the category object from categories
    const categoryObj = categories.find(
      (cat) =>
        cat.name.toLowerCase() === productToEdit.category_name?.toLowerCase()
    );

    if (categoryObj) {
      setSelectedCategory(categoryObj);
    }

    // Set form data with existing product data
    setFormData({
      title: productToEdit.title || "",
      brand: productToEdit.brand || "",
      description: productToEdit.description || "",
      subcategory: productToEdit.category_object?.sub_category?.id || "",
      quantity: productToEdit.quantity || 0,
      sku: productToEdit.sku || "",
      images: productToEdit.images?.map((img) => img.url) || [],
      video: productToEdit.live_video_url || null,
      condition: productToEdit.condition || "",
      state: productToEdit.state || "",
      local_govt: productToEdit.local_govt || "",
      occasion: productToEdit.occasion || [],
      production_date: productToEdit.production_date || "",
      ageRange: productToEdit.ageRange || "",
      specification: productToEdit.specification || {},
      specifications: productToEdit.specifications || "",
      price: productToEdit.price || 0,
    });

    // Set variants if they exist
    if (productToEdit.variants_details?.length > 0) {
      setVariants(productToEdit.variants_details);
    }
  }, [productToEdit, categories]);

  return (
    <div className="flex-1">
      <form onSubmit={handleSubmit} className="mt-6">
        <CategorySection
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
        />

        {selectedCategory && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-2">
            <LeftFormSection
              selectedCategory={selectedCategory}
              formData={formData}
              handleInputChange={handleInputChange}
              handleSpecificationChange={handleSpecificationChange}
              handleSpecificationsChange={handleSpecificationsChange}
            />

            <RightFormSection
              formData={formData}
              handleInputChange={handleInputChange}
              supportsVariants={supportsVariants}
              selectedCategory={selectedCategory}
              handleVariantsChange={handleVariantsChange}
              productToEdit={productToEdit}
            />
          </div>
        )}

        <FormActions
          selectedCategory={selectedCategory}
          isEditMode={isEditMode}
          creating={creating}
          updating={updating}
          handleDiscard={handleDiscard}
        />
      </form>
    </div>
  );
};

export default AddProduct;