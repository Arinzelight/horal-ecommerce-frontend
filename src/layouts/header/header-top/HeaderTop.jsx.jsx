import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useMobile from "../../../hooks/use-mobile";
import { useCart } from "../../../hooks/useCart";
import { notifications as messages } from "../../../data/notification";
import AppDownloadButtons from "./components/AppDownloadButttons";
import DesktopNavigation from "./components/DesktopAuthNav";
import MobileNavigation from "./components/MobileAuthNav";

export default function HeaderTop() {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState(messages);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.wishlist);
  const { itemCount } = useCart();
  const wishlistItems = data?.items?.map((item) => item.product) || [];
  const wishlistCount = wishlistItems.length;

  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const notificationRef = useRef(null);
  const notificationButtonRef = useRef(null);
  const isMobile = useMobile();

  const { userInfo } = useSelector((state) => state.user);
  const user = userInfo?.data;
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const toggleAccountMenu = () => {
    setShowAccountMenu(!showAccountMenu);
    setShowNotification(false);
  };

  const handleMobileProfileClick = () => {
    if (!user) {
      navigate("/signin");
      return;
    }
    setShowAccountMenu(!showAccountMenu);
  };

  const handleNotificationClick = () => {
    if (showNotification) {
      setShowNotification(false);
    } else {
      setShowNotification(true);
      setShowAccountMenu(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowAccountMenu(false);
      }

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setShowMobileMenu(false);
      }

      if (
        showNotification &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        notificationButtonRef.current.contains(event.target)
      ) {
        setShowNotification(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotification]);

  const navigationProps = {
    user,
    wishlistCount,
    itemCount,
    unreadCount,
    showAccountMenu,
    // showNotification,
    notifications,
    menuRef,
    notificationRef,
    notificationButtonRef,
    toggleAccountMenu,
    handleNotificationClick,
    handleMobileProfileClick,
    dispatch,
    setShowNotification,
  };

  return (
    <div className="bg-primary-700 w-full text-white py-2 sm:px-12 px-2 flex items-center justify-between">
      <AppDownloadButtons />

      <div className="flex items-center">
        {isMobile ? (
          <MobileNavigation {...navigationProps} />
        ) : (
          <DesktopNavigation {...navigationProps} />
        )}
      </div>
    </div>
  );
}
