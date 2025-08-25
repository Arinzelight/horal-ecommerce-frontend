import { useEffect, useState } from "react";
import api from "../utils/api";

const useSellerTopSellingProducts = () => {
  const [topSelling, setTopSelling] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopSelling = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await api.get("/dashboard/seller/topselling/");
        setTopSelling(res.data?.data || []);
      } catch (err) {
        setError("Failed to load seller top-selling products");
        console.error("Seller top-selling fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSelling();
  }, []);

  return { topSelling, loading, error };
};

export default useSellerTopSellingProducts;
