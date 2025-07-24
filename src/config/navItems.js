import { CiWallet } from "react-icons/ci";
import {
  FaUsers,
  FaShoppingCart,
  FaChartLine,
  FaUserShield,
  FaStore,
  FaBox,
  FaShoppingBag,
  FaCommentDots,
  FaStar,
  FaUser,
  FaLock,
  FaHeart,
  FaWallet,
} from "react-icons/fa";

export const adminNavItems = [
  { to: "/admin", icon: FaChartLine, label: "Dashboard" },
  { to: "/admin/users", icon: FaUsers, label: "User Management" },
  // { to: "/admin/orders", icon: FaShoppingCart, label: "Orders" },
  // { to: "/admin/analytics", icon: FaChartLine, label: "Analytics" },
  { to: "/admin/support", icon: FaUserShield, label: "Customer Support" },
];

export const sellerNavItems = [
  { to: "/sellers-dashboard", icon: FaChartLine, label: "Dashboard" },
  {
    to: "/sellers-dashboard/wallet",
    icon: FaWallet,
    label: "Wallet",
  },
  {
    to: "/sellers-dashboard/reviews",
    icon: FaStar,
    label: "Reviews",
  },
  {
    type: "dropdown",
    label: "My Shop",
    icon: FaStore,
    basePath: "/sellers-dashboard/shop",
    items: [
      {
        to: "/sellers-dashboard/shop-products",
        icon: FaBox,
        label: "Products",
      },
      {
        to: "/sellers-dashboard/shop-orders",
        icon: FaShoppingBag,
        label: "Orders",
      },
    ],
  },

  {
    to: "/sellers-dashboard/account-settings",
    icon: FaUser,
    label: "Account Settings",
  },
  { to: "/sellers-dashboard/chat", icon: FaCommentDots, label: "Chat" },
  { to: "/sellers-dashboard/reviews", icon: FaStar, label: "Reviews" },
  {
    to: "/sellers-dashboard/support",
    icon: FaUserShield,
    label: "Customer Support",
  },
];

export const userNavItems = [
  { to: "/profile", icon: FaUser, label: "My Profile" },
  { to: "/profile/change-password", icon: FaLock, label: "My Password" },
  { to: "/profile/orders", icon: FaShoppingCart, label: "Orders" },
  { to: "/profile/chat", icon: FaCommentDots, label: "Chat" },
  { to: "/profile/wishlist", icon: FaHeart, label: "My Wishlist" },
  { to: "/profile/support", icon: FaUserShield, label: "Customer Support" },
];
