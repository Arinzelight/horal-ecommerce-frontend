
/**
 * Normalizes brand name for consistent display
 * Examples: "hp" -> "HP", "samsung" -> "Samsung", "iPhone" -> "iPhone"
 */
export const normalizeBrandName = (brand) => {
  if (!brand) return "";

  const brandLower = brand.toLowerCase().trim();

  // Handle special cases for well-known brands
  const specialCases = {
    hp: "HP",
    lg: "LG",
    bmw: "BMW",
    ibm: "IBM",
    amd: "AMD",
    asus: "ASUS",
    msi: "MSI",
    dji: "DJI",
    jbl: "JBL",
    kfc: "KFC",
    mcdonalds: "McDonald's",
    dell: "Dell",
    intel: "Intel",
    nvidia: "NVIDIA",
    iphone: "iPhone",
    ipad: "iPad",
    macbook: "MacBook",
    playstation: "PlayStation",
    xbox: "Xbox",
    "coca cola": "Coca-Cola",
    "mercedes benz": "Mercedes-Benz",
    "rolls royce": "Rolls-Royce",
    // Add more special cases as needed
  };

  if (specialCases[brandLower]) {
    return specialCases[brandLower];
  }

  // Default: Capitalize first letter of each word
  return brandLower
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Creates normalized version for client-side filtering
 */
export const createBrandNormalized = (brand) => {
  if (!brand) return "";
  return brand.toLowerCase().trim();
};

/**
 * Gets unique brands from products array using client-side normalization
 * Groups brands by normalized version but displays the best formatted version
 */
export const getUniqueBrands = (products) => {
  if (!products || !Array.isArray(products)) return [];

  const brandMap = new Map();

  products.forEach((product) => {
    if (product.brand) {
      // Create normalized key for grouping
      const normalizedKey = createBrandNormalized(product.brand);

      if (!brandMap.has(normalizedKey)) {
        // Store the properly formatted version for display
        brandMap.set(normalizedKey, normalizeBrandName(product.brand));
      }
    }
  });

  return Array.from(brandMap.values()).sort();
};

/**
 * Checks if a product matches selected brand filters (client-side approach)
 */
export const matchesBrandFilter = (product, selectedBrands) => {
  if (!product.brand || selectedBrands.length === 0) {
    return selectedBrands.length === 0;
  }

  // Normalize product brand for comparison
  const productBrandNormalized = createBrandNormalized(product.brand);

  // Check if any selected brand matches (after normalization)
  return selectedBrands.some((selectedBrand) => {
    const selectedBrandNormalized = createBrandNormalized(selectedBrand);
    return productBrandNormalized === selectedBrandNormalized;
  });
};
