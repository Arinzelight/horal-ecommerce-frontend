import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { closeLogoutModal } from "../redux/modal/modalSlice";
import { toast } from "./toast";
import { logoutUser, logout } from "../redux/auth/authSlice/userSlice";
import { clearWishlist } from "../redux/wishlist/wishlistSlice";
import { persistor } from "../redux/store";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const LogoutConfirmation = () => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modal.showLogoutModal);
  const userInfo = useSelector((state) => state.user.userInfo);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!showModal || !userInfo) return null;

  const handleLogout = async () => {
    setLoading(true);
    try {
      await dispatch(
        logoutUser({
          refresh: userInfo.data.tokens.refresh,
          id: userInfo.data.id,
        })
      ).unwrap();

      dispatch(clearWishlist());
      dispatch(logout());
      await persistor.purge();

      toast.success("Logged out successfully");

      setTimeout(() => {
        navigate("/signin");
      }, 100);
    } catch (err) {
      console.error("Logout error:", err);
      toast.error(err || "Failed to log out");
    } finally {
      setLoading(false);
      setTimeout(() => {
        dispatch(closeLogoutModal());
      }, 200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-indigo-50 opacity-100 rounded-lg p-6 flex flex-col items-center gap-6 shadow-xl">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 bg-stone-800 flex items-center justify-center rounded-full">
            <FiLogOut className="text-white w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 text-center">
            Log Out
          </h2>
          <p className="text-base font-medium text-neutral-900 text-center">
            Are you sure you want to log out of your Horal's account?
          </p>
        </div>
        <div className="flex flex-row gap-4 w-full justify-center">
          <button
            onClick={() => dispatch(closeLogoutModal())}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-white rounded hover:opacity-90 cursor-pointer text-stone-900 text-sm font-bold shadow"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            disabled={loading}
            className={`flex-1 px-4 py-2 bg-primary text-white text-sm font-bold shadow rounded hover:opacity-90 flex items-center justify-center gap-2 ${
              loading ? "cursor-not-allowed opacity-80" : ""
            }`}
          >
            {loading ? (
              <>
                <ImSpinner2 className="animate-spin h-4 w-4" />
                Logging out...
              </>
            ) : (
              "Log Out"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmation;
