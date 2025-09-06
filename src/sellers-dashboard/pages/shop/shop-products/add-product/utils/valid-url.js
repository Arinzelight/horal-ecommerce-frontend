import { toast } from "../../../../../../components/toast";

export const isValidUrl = (url) => {
  if (url.length > 200) {
    toast.error("URL is too long");
    return false;
  }
  try {
    new URL(url);
    return true;
  } catch (e) {
    toast.error("Invalid URL");
    return false;
  }
};
