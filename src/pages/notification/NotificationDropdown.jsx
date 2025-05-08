import React from "react";
import { Link } from "react-router-dom";
import NotificationIcon from "./NotificationIcons";

const NotificationDropdown = ({ notifications, onClose }) => {
  return (
    <div className="absolute right-42 mt-5 w-[418px] h-[330px] bg-white rounded-b shadow-lg overflow-hidden z-50">
      <div className="flex justify-between items-center px-4 py-3 bg-gray-50 shadow">
        <h3 className="font-semibold text-xs">
          Notifications ({notifications.length})
        </h3>
        <Link
          to="/notifications"
          className="text-primary text-xs hover:text-primary"
          onClick={onClose}
        >
          View all
        </Link>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-neutral-800">No notifications</div>
        ) : (
          notifications.slice(0, 5).map((notification) => (
            <Link
              key={notification.id}
              to={`/notifications/${notification.id}`}
              className="block relative hover:bg-neutral-100"
              onClick={onClose}
            >
              <div className="flex h-[55px] justify-between items-start p-2">
                <div className="">
                  <NotificationIcon
                    type={notification.type}
                    className="flex-shrink-0 mt-1"
                  />
                </div>

                <div className="ml-2 flex-1">
                  <p className="font-bold text-neutral-800 text-xs">
                    {notification.title}
                  </p>
                  <p className="text-[10px] text-neutral-400 ">
                    {notification.intro}
                  </p>
                </div>
                <div className="flex flex-col items-end h-full justify-between">
                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                  <p className="text-[10px] text-gray-400">
                    {notification.timestamp}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
