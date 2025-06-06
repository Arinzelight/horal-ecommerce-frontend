import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import RootLayout from "./layouts/RootLayout";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Wishlist from "./pages/wishlist/Wishlist";
import AdminRoute from "./routes/AdminRoute";
import NotFound from "./routes/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProfilePage from "./pages/profile-page/ProfilePage";
import InitialLoader from "./components/InitialLoader";

import ProductDetails from "./pages/product-details/ProductDetails";
import CategoryPage from "./pages/category-page/CategoryPage";
import Signup from "./pages/signup/Signup";
import Signin from "./pages/signin/Signin";
import NotificationDetail from "./pages/notification/NotificationDetails";
import NotificationPage from "./pages/notification/NotificationPage";
import VerifyEmail from "./pages/verify-email/VerifyEmail";
import AccountApproval from "./pages/account-approval/AccountApproval";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import OtpVerification from "./pages/otp-verification/OtpVerification";
import ResetPassword from "./pages/reset-password/ResetPassword";
import PasswordResetSuccess from "./pages/sucessful-password-rest/PasswordResetSuccess";
import KYCVerification from "./pages/kyc/kyc-verification/KYCVerification";
import UploadID from "./pages/kyc/upload-id/UploadID";
import ProofOfAddress from "./pages/kyc/proof-of-address/ProofOfAddress";
import SocialLinksUpload from "./pages/kyc/social-links-upload/SocialLinksUpload";
import SuccessfulKYC from "./pages/kyc/successful-kyc/SuccessfulKYC";
import OrderDetails from "./pages/order-details/OrderDetails";
import DashboardLayout from "./sellers-dashboard/layout/DashboardLayout";
import Dashboard from "./sellers-dashboard/pages/home/Dashboard";
import ShopProducts from "./sellers-dashboard/pages/shop/shop-products/ShopProducts";
import ShopOrders from "./sellers-dashboard/pages/shop/shop-orders/ShopOrders";
import ReviewsPage from "./sellers-dashboard/pages/review/Reviews";
import ReviewDetails from "./sellers-dashboard/pages/review/ReviewDetailsPage";
import OrderDetailPage from "./sellers-dashboard/pages/shop/shop-orders/OrderDetails";
import Account from "./sellers-dashboard/pages/settings/account-settings/Account";
import ChatPage from "./sellers-dashboard/pages/chat/Chat";
import OAuthCallback from "./components/OAuthCallback";
// Lazy load the Home page
const Home = lazy(() => import("./pages/home/Home"));

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <ScrollToTop />

      <Routes>
        <Route element={<ScrollToTop />} />
        <Route path="/" element={<RootLayout />}>
          {/* Public Routes */}
          <Route
            index
            element={
              <Suspense fallback={<InitialLoader />}>
                <Home />
              </Suspense>
            }
          />
          <Route path="product/:id" element={<ProductDetails />} />

          <Route path="category/:category" element={<CategoryPage />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="account-approval" element={<AccountApproval />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="otp-verification" element={<OtpVerification />} />
          <Route path="/oauth2callback" element={<OAuthCallback />} />

          <Route
            path="password-reset-success"
            element={<PasswordResetSuccess />}
          />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="checkout" element={<Checkout />} />
            <Route path="profile-page" element={<ProfilePage />} />
            <Route path="notifications" element={<NotificationPage />} />
            <Route path="notifications/:id" element={<NotificationDetail />} />
            <Route path="kyc-verification" element={<KYCVerification />} />
            <Route path="upload-id" element={<UploadID />} />
            <Route path="proof-of-address" element={<ProofOfAddress />} />
            <Route path="social-links-upload" element={<SocialLinksUpload />} />
            <Route path="successful-kyc" element={<SuccessfulKYC />} />
            <Route path="order-details" element={<OrderDetails />} />
          </Route>
        </Route>

        {/* Sellers Dashboard */}

        <Route path="sellers-dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="shop-products" element={<ShopProducts />} />
          <Route path="shop-orders" element={<ShopOrders />} />
          <Route path="shop-order/:id" element={<OrderDetailPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="review/:id" element={<ReviewDetails />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="account-settings" element={<Account />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoute />} />

        {/* Not Found Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
