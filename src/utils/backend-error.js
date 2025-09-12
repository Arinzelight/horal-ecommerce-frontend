export const extractBackendError = (error) => {
  // Check if it's from Redux payload
  if (error?.payload?.non_field_errors?.[0]) {
    return error.payload.non_field_errors[0];
  }

  // Check other payload formats
  if (error?.payload) {
    if (typeof error.payload === "string") return error.payload;
    if (error.payload?.error) return error.payload.error;

    // Handle other field errors in payload
    if (typeof error.payload === "object") {
      const firstKey = Object.keys(error.payload)[0];
      if (firstKey && Array.isArray(error.payload[firstKey])) {
        return error.payload[firstKey][0];
      }
    }
  }

  return null;
};
