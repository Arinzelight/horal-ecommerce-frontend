import { FiLogOut } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { closeLogoutModal } from "../redux/modal/modalSlice";
import toast from "react-hot-toast";
import { logoutUser, logout } from "../redux/auth/authSlice/userSlice";
import { clearWishlist } from "../redux/wishlist/wishlistSlice";

const LogoutConfirmation = () => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modal.showLogoutModal);
  const userInfo = useSelector((state) => state.user.userInfo);

  if (!showModal || !userInfo) return null;

  const handleLogout = async () => {
    try {
      const result = await dispatch(
        logoutUser({
          refresh: userInfo.data.tokens.refresh,
          id: userInfo.data.id,
        })
      ).unwrap();

      // Clear wishlist in Redux state
      dispatch(clearWishlist());

      toast.success("Logged out successfully");
      dispatch(closeLogoutModal());
    } catch (err) {
      console.log("Logout error:", err);

      toast.error(err || "Failed to log out");
      dispatch(closeLogoutModal());
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
            className="flex-1 px-4 py-2 bg-white rounded hover:opacity-90 cursor-pointer text-stone-900 text-sm font-bold shadow"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 px-4 py-2 bg-primary hover:opacity-90 cursor-pointer rounded text-white text-sm font-bold shadow"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmation;
