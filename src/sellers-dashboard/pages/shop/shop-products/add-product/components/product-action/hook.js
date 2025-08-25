// hooks.js
import { useCallback, useEffect} from "react";
import { useSelector } from "react-redux";
import { toast } from "../../../../../../../components/toast";
import {
  createProduct,
  updateProduct,
} from "../../../../../../../redux/product/thunks/productThunk";
import {
  clearCreateSuccess,
  clearUpdateSuccess,
  clearError,
  resetProductState,
} from "../../../../../../../redux/product/slices/productSlice";
import {
  VARIANT_SUPPORTED_CATEGORIES,
  SUCCESS_MESSAGES,
  INITIAL_FORM_DATA,
} from "./constants";
import {
  validateForm,
  buildProductData,
  formatImagesForAPI,
  formatSpecificationsForAPI,
  handleErrorResponse,
} from "./utils";

export const useAddProductState = () => {
  const { creating, updating, createSuccess, updateSuccess, error } =
    useSelector((state) => state.products);

  return { creating, updating, createSuccess, updateSuccess, error };
};

export const useAddProductEffects = (
  createSuccess,
  updateSuccess,
  error,
  isEditMode,
  onAddProduct,
  onUpdateProduct,
  handleDiscard,
  dispatch
) => {
  // Success/error effect handlers
  useEffect(() => {
    if (createSuccess) {
      toast.success(SUCCESS_MESSAGES.PRODUCT_CREATED);
      handleDiscard();
      dispatch(clearCreateSuccess());
      onAddProduct?.();
    }
  }, [createSuccess, dispatch, onAddProduct, handleDiscard]);

  useEffect(() => {
    if (updateSuccess) {
      toast.success(SUCCESS_MESSAGES.PRODUCT_UPDATED);
      dispatch(clearUpdateSuccess());
      onUpdateProduct?.();
    }
  }, [updateSuccess, dispatch, onUpdateProduct]);

  useEffect(() => {
    if (error) {
      toast.error(
        isEditMode ? "Failed to update product" : "Failed to create product"
      );

      handleErrorResponse(error, isEditMode);
      dispatch(clearError());
    }
  }, [error, dispatch, isEditMode]);

  // Reset state only once on mount
  useEffect(() => {
    dispatch(resetProductState());
  }, [dispatch]);
};

export const useFormHandlers = (setFormData, setVariants) => {
  // Optimized input change handler
  const handleInputChange = useCallback(
    (field, value) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [setFormData]
  );

  // specification handlers
  const handleSpecificationChange = useCallback(
    (field, value) => {
      setFormData((prev) => ({
        ...prev,
        specification: {
          ...prev.specification,
          [field]: value,
        },
      }));
    },
    [setFormData]
  );

  const handleSpecificationsChange = useCallback(
    (value) => {
      setFormData((prev) => ({
        ...prev,
        specifications: value,
      }));
    },
    [setFormData]
  );

  // Handle variants change from VariantManager
  const handleVariantsChange = useCallback(
    (newVariants) => {
      setVariants(newVariants);
      // Update total quantity based on variants
      const totalQuantity = newVariants.reduce((total, variant) => {
        return total + variant.stock_quantity;
      }, 0);
      setFormData((prev) => ({
        ...prev,
        quantity: totalQuantity,
      }));
    },
    [setFormData, setVariants]
  );

  return {
    handleInputChange,
    handleSpecificationChange,
    handleSpecificationsChange,
    handleVariantsChange,
  };
};

export const useProductSubmission = (
  isEditMode,
  selectedCategory,
  formData,
  variants,
  productToEdit,
  onAddProduct,
  handleDiscard,
  dispatch
) => {
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!validateForm(isEditMode, selectedCategory, formData, variants))
        return;

      try {
        const productData = buildProductData(
          formData,
          selectedCategory,
          variants,
          formatImagesForAPI,
          formatSpecificationsForAPI
        );

        console.log(
          `${isEditMode ? "Updating" : "Creating"} product data:`,
          productData
        );

        if (isEditMode) {
          // Update existing product
          const result = await dispatch(
            updateProduct({
              category_name: selectedCategory.name,
              id: productToEdit.id,
              productData: productData,
            })
          ).unwrap();

          console.log("Product updated successfully:", result);
        } else {
          // Create new product
          const result = await dispatch(
            createProduct({
              category_name: selectedCategory.name,
              productData: productData,
            })
          ).unwrap();

          console.log("Product created successfully:", result);

          // Call the parent callback if provided
          onAddProduct?.(result);

          // Reset form after successful submission
          handleDiscard();
        }
      } catch (error) {
        console.log(
          `Error ${isEditMode ? "updating" : "creating"} product:`,
          error
        );
      }
    },
    [
      isEditMode,
      selectedCategory,
      formData,
      variants,
      productToEdit?.id,
      onAddProduct,
      handleDiscard,
      dispatch,
    ]
  );

  return handleSubmit;
};

export const useProductUtils = (
  selectedCategory,
  setFormData,
  setSelectedCategory,
  setVariants,
  isEditMode,
  onCancel
) => {
  // Check if current category supports variants
  const supportsVariants = useCallback(() => {
    return selectedCategory?.name
      ? VARIANT_SUPPORTED_CATEGORIES.includes(selectedCategory.name)
      : false;
  }, [selectedCategory?.name]);

  // Optimized category change handler
  const handleCategoryChange = useCallback(
    (category) => {
      console.log("Selected category:", category.name || category);
      setSelectedCategory(category);

      // Reset condition when category changes (only in create mode)
      if (!isEditMode) {
        setFormData((prev) => ({
          ...prev,
          condition: "",
          subcategory: "",
          ageRange: "",
        }));
        // Reset variants when category changes
        setVariants([]);
      }
    },
    [isEditMode, setFormData, setSelectedCategory, setVariants]
  );

  const handleDiscard = useCallback(() => {
    if (isEditMode && onCancel) {
      onCancel();
      return;
    }

    // Reset form
    setFormData(INITIAL_FORM_DATA);
    setSelectedCategory("");
    setVariants([]);
  }, [isEditMode, onCancel, setFormData, setSelectedCategory, setVariants]);

  return {
    supportsVariants,
    handleCategoryChange,
    handleDiscard,
  };
};
