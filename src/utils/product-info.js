  const availableSizes = useMemo(() => {
    const sizeMap = new Map();

    variants.forEach((variant) => {
      // Handle standard sizes
      if (variant.standard_size) {
        const key = `standard_${variant.standard_size}`;
        if (!sizeMap.has(key)) {
          sizeMap.set(key, {
            type: "standard",
            value: variant.standard_size,
            display: variant.standard_size,
            key: key,
          });
        }
      }

     if (variant.size) {
        // NEW: Use 'size' field for footwear (primary)
        const display = variant.size.toString();
        const key = `footwear_${variant.size}`;

        if (!sizeMap.has(key)) {
          sizeMap.set(key, {
            type: "footwear",
            value: variant.size,
            display: display,
            key: key,
          });
        }
      } else if (variant.custom_size_value && !variant.custom_size_unit) {
        // LEGACY: Handle old footwear data using custom_size_value without unit
        const display = variant.custom_size_value.toString();
        const key = `footwear_legacy_${variant.custom_size_value}`;

        if (!sizeMap.has(key)) {
          sizeMap.set(key, {
            type: "footwear_legacy",
            value: variant.custom_size_value,
            display: display,
            key: key,
          });
        }
      } else if (variant.custom_size_value && variant.custom_size_unit) {
        // Handle true custom sizes (with units)
        const display = `${variant.custom_size_value} ${variant.custom_size_unit}`;
        const key = `custom_${variant.custom_size_value}_${variant.custom_size_unit}`;

        if (!sizeMap.has(key)) {
          sizeMap.set(key, {
            type: "custom",
            value: variant.custom_size_value,
            unit: variant.custom_size_unit,
            display: display,
            key: key,
          });
        }
      }
    });

    return Array.from(sizeMap.values());
  }, [variants]);