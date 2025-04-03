import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import RootLayout from "./layouts/RootLayout";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AdminRoute from "./routes/AdminRoute";
import NotFound from "./routes/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProfilePage from "./pages/profile-page/ProfilePage";
import InitialLoader from "./components/InitialLoader";

// Lazy load the Home page
const Home = lazy(() => import("./pages/home/Home"));

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />

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
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="cart" element={<Cart />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="checkout" element={<Checkout />} />
            <Route path="profile-page" element={<ProfilePage />} />
          </Route>

          {/* Not Found Page */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
