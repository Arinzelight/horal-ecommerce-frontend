
export const INITIAL_FORM_DATA = {
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
  specification: {},
  specifications: "",
  price: 0,
};

export const VARIANT_REQUIRED_CATEGORIES = [
  "fashion",
  "children",
  "health and beauty",
  "health",
  "beauty",
  "accessories",
  "vehicles",
  "gadget",
  "electronics",
  "foods",
];

export const VARIANT_SUPPORTED_CATEGORIES = [
  "fashion",
  "children",
  "health and beauty",
  "health",
  "beauty",
  "accessories",
  "vehicles",
  "gadget",
  "electronics",
  "foods",
];

export const ERROR_MESSAGES = {
  REQUIRED_FIELDS:
    "Please fill in all required fields: Category, Title, Price, Subcategory, Description, Condition, state, local_govt",
  NO_IMAGES: "Please add at least one product image",
  NO_VARIANTS:
    "Please add at least one product variant (color/size combination)",
  EMPTY_STOCK:
    "Please ensure all variants have stock quantities greater than 0",
  LOGIN_REQUIRED: "An error occurred, please login to",
  SERVER_ERROR: "Server Error:",
  GENERIC_ERROR: "Error:",
  UNIQUE_SET_ERROR: "Products with this title already exist in your shop"
};

export const SUCCESS_MESSAGES = {
  PRODUCT_CREATED: "Product created successfully!",
  PRODUCT_UPDATED: "Product updated successfully!",
};

export const LOADING_MESSAGES = {
  CREATING: "Creating...",
  UPDATING: "Updating...",
  UPDATE_PRODUCT: "Update Product",
  PUBLISH_PRODUCT: "Publish Product",
};
