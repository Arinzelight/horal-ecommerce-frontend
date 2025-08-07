import { useEffect, useState } from "react";
import api from "../utils/api";

const useSellerAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await api.get("/dashboard/seller/analytics");
        setAnalytics(res.data?.data || null);
      } catch (err) {
        setError("Failed to load analytics");
        console.error("Analytics fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return { analytics, loading, error };
};

export default useSellerAnalytics;
