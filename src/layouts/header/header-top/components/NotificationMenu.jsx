import { forwardRef } from "react";
import { MdOutlineNotificationsActive } from "react-icons/md";
import NotificationDropdown from "../../../../pages/notification/NotificationDropdown";

const NotificationButton = forwardRef(
  (
    {
      unreadCount,
      onClick,
      showNotification,
      notifications,
      notificationRef,
      setShowNotification,
    },
    ref
  ) => {
    return (
      <>
        <button
          ref={ref}
          onClick={onClick}
          aria-label="Toggle notifications"
          className="w-8 h-8 rounded-full cursor-pointer bg-white flex items-center justify-center hover:bg-primary-50 transition-colors relative"
        >
          <MdOutlineNotificationsActive className="text-primary text-sm" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {showNotification && (
          <div
            className="absolute right-0 mt-2 w-80 bg-white shadow-lg z-50 text-black"
            ref={notificationRef}
          >
            <NotificationDropdown
              notifications={notifications}
              onClose={() => setShowNotification(false)}
            />
          </div>
        )}
      </>
    );
  }
);

NotificationButton.displayName = "NotificationButton";

export default NotificationButton;
