import { useState, useEffect, useRef } from "react";
import useMobile from "../../../hooks/use-mobile";
import { notifications as messages } from "../../../data/notification";
import { useSelector } from "react-redux";
import { useCategories } from "../../../hooks/useCategories";
import { useNavigate } from "react-router-dom";
import MobileHeader from "./components/MobileHeader";
import DesktopHeader from "./components/DesktopHeader";

export default function HeaderBottom() {
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notifications, setNotifications] = useState(messages);

  const isMobile = useMobile();
  const navigate = useNavigate();

  const menuRef = useRef(null);
  const stateDropdownRef = useRef(null);
  const menuButtonRef = useRef(null);

  const { categories } = useCategories();
  const { userInfo } = useSelector((state) => state.user);
  const user = userInfo?.data || null;
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`);
    setShowMobileMenu(false);
  };

  const toggleStateDropdown = () => {
    setShowStateDropdown(!showStateDropdown);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setShowMobileMenu(false);
        document.body.style.overflow = "auto";
      }
    }

    if (showMobileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [showMobileMenu]);

  // Close state dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        stateDropdownRef.current &&
        !stateDropdownRef.current.contains(event.target) &&
        !event.target.closest('button[onClick="toggleStateDropdown"]')
      ) {
        setShowStateDropdown(false);
      }
    }

    if (showStateDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showStateDropdown]);

  // Log when userInfo changes
  useEffect(() => {
    console.log("userInfo changed in useEffect:", userInfo);
    console.log("user changed in useEffect:", user);
  }, [userInfo, user]);

  const sharedProps = {
    user,
    categories,
    showStateDropdown,
    showMobileMenu,
    stateDropdownRef,
    menuRef,
    menuButtonRef,
    toggleStateDropdown,
    toggleMobileMenu,
    handleCategoryClick,
    unreadCount,
  };

  if (isMobile) {
    return <MobileHeader {...sharedProps} />;
  }

  return <DesktopHeader {...sharedProps} />;
}