import { useState, useCallback } from "react";
import api from "../utils/api";

export function useMediaApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /** ---------------- Upload ---------------- */
  const uploadMedia = useCallback(async (file, { isPrivate = false } = {}) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("is_private", isPrivate);

      const { data } = await api.post("/media/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /** ---------------- Delete ---------------- */
  const deleteMedia = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      await api.delete(`/media/${id}/delete/`);
      return true;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /** ---------------- List (user media) ---------------- */
  const listMedia = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await api.get("/media/list/", { params: filters });
      return data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /** ---------------- Vendor media list ---------------- */
  const listVendorMedia = useCallback(async (vendorId, filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await api.get(`/media/vendor/${vendorId}/`, {
        params: filters,
      });
      return data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    uploadMedia,
    deleteMedia,
    listMedia,
    listVendorMedia,
    loading,
    error,
  };
}
