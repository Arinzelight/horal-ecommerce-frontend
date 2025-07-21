import { fetchSellerProfile } from "../redux/seller/sellerThunk";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";

const useSeller = () => {
    const dispatch = useDispatch();
    const {profile, loading, error} = useSelector((state) => state.seller);
   
    const fetchProfile = useCallback(() => {
        dispatch(fetchSellerProfile());
    }, [dispatch]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return { profile, loading, error };
};
export default useSeller;