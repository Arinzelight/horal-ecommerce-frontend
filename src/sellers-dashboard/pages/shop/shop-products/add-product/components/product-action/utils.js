import { toast } from "../../../../../../../components/toast";
import { VARIANT_REQUIRED_CATEGORIES, ERROR_MESSAGES } from "./constants";

export const formatImagesForAPI = (images) => {
  return images.map((imageUrl, index) => ({
    url: imageUrl,
    alt_text: `Product image ${index + 1}`,
  }));
};

export const formatSpecificationsForAPI = (specification) => {
  const formatted = {};

  // Only include non-empty specifications
  Object.entries(specification).forEach(([key, value]) => {
    if (value && typeof value === "string" && value.trim() !== "") {
      formatted[key] = value;
    }
  });

  return formatted;
};

export const validateForm = (
  isEditMode,
  selectedCategory,
  formData,
  variants
) => {
  if (!isEditMode) {
    if (
      !selectedCategory ||
      !formData.title ||
      !formData.description ||
      !formData.condition ||
      !formData.subcategory ||
      !formData.state ||
      !formData.local_govt ||
      formData.price <= 0
    ) {
      toast.error(ERROR_MESSAGES.REQUIRED_FIELDS);
      return false;
    }
  }

  if (formData.images.length === 0) {
    toast.error(ERROR_MESSAGES.NO_IMAGES);
    return false;
  }

  // Check if variants are required for this category, also check that is not edit mode
  if (
    selectedCategory?.name &&
    VARIANT_REQUIRED_CATEGORIES.includes(selectedCategory.name) &&
    variants.length === 0 &&
    !isEditMode
  ) {
    toast.error(ERROR_MESSAGES.NO_VARIANTS);
    return false;
  }

  const hasEmptyStock = variants?.some((colorVariant) =>
    colorVariant.variants?.some((variant) => variant.stockQuantity === 0)
  );

  if (hasEmptyStock) {
    toast.error(ERROR_MESSAGES.EMPTY_STOCK);
    return false;
  }

  return true;
};

export const buildProductData = (
  formData,
  selectedCategory,
  variants,
  formatImagesForAPI,
  formatSpecificationsForAPI
) => {
  // Get formatted structured specifications
  const formattedSpecs = formatSpecificationsForAPI(formData.specification);

  return {
    title: formData.title,
    description: formData.description,
    price: parseFloat(formData.price) || 0,
    quantity: parseInt(formData.quantity) || 0,
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
    ...formattedSpecs,
    specifications: formData.specifications || null,
  };
};

// Helper function to check for weight inconsistency error
export const isWeightInconsistencyError = (errorData) => {
  // Check in detail field
  if (
    errorData.detail &&
    errorData.detail.includes("cannot exceed its logistics weight")
  ) {
    return true;
  }

  // Check in non_field_errors array
  if (errorData.non_field_errors && Array.isArray(errorData.non_field_errors)) {
    return errorData.non_field_errors.some(
      (error) =>
        typeof error === "string" &&
        error.includes("cannot exceed its logistics weight")
    );
  }

  // Check if the error is directly an array 
  if (Array.isArray(errorData)) {
    return errorData.some(
      (error) =>
        typeof error === "string" &&
        error.includes("cannot exceed its logistics weight")
    );
  }

  return false;
};

export const handleErrorResponse = (error, isEditMode) => {

  
  let errorData = error;

  // Check for inconsistent weight error first
  if (isWeightInconsistencyError(errorData)) {
    console.log("Showing weight inconsistency toast");
    toast.error(ERROR_MESSAGES.INCONSISTENT_WEIGHT);
    return;
  }

  // Check for unique constraint violation
  if (errorData.non_field_errors) {
    const uniqueConstraintError = errorData.non_field_errors.find((err) =>
      err.includes("must make a unique set")
    );

    if (uniqueConstraintError) {
      toast.error("A product with that name and category already exists");
      return;
    }
  }

  // Handle message field if present
  if (errorData.message) {
    toast.error(errorData.message);
    return;
  }

  const { status, detail } = errorData;
  switch (status) {
    case 403:
      toast.error(
        `${ERROR_MESSAGES.LOGIN_REQUIRED} ${
          isEditMode ? "update" : "add"
        } product`
      );
      break;
    case 500:
      toast.error(`${ERROR_MESSAGES.SERVER_ERROR} ${detail}`);
      break;
    default:
      toast.error(
        `${ERROR_MESSAGES.GENERIC_ERROR} ${detail || "Unknown error"}`
      );
  }
};
