
import toast from "react-hot-toast";
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

  // Check if variants are required for this category
  if (
    selectedCategory?.name &&
    VARIANT_REQUIRED_CATEGORIES.includes(selectedCategory.name) &&
    variants.length === 0
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
    ...formattedSpecs,
    specifications: formData.specifications || null,
  };
};

export const handleErrorResponse = (error, isEditMode) => {
  if (error.response?.data) {
    const { status, detail } = error.response.data;
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
        toast.error(`${ERROR_MESSAGES.GENERIC_ERROR} ${detail}`);
    }
  }
};
