import React, { useState, useCallback, memo } from "react";
import { notifications as initialMessages } from "../../data/notification";
import NotificationIcon from "./NotificationIcons";
import { Link } from "react-router-dom";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState(initialMessages);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleDelete = useCallback(() => {
    console.log("Delete notification");
  }, []);

  const handleMarkAllAsRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    );
  }, []);

  if (notifications.length === 0) {
    return (
      <div className="min-h-screen mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="text-4xl mb-4">
            <MdOutlineNotificationsActive className="mx-auto text-primary w-[60px] h-[60px]" />
          </div>
          <p className="text-neutral-900 text-lg font-semibold mb-2">
            You don't have any notifications yet
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:mx-auto">
      <div className="pt-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-lg font-bold">
              Notifications ({notifications.length})
            </h1>
            <p className="text-neutral-500 text-sm font-normal">
              You have {unreadCount} new notifications
            </p>
          </div>
          <button
            onClick={handleMarkAllAsRead}
            className="text-primary text-sm font-medium cursor-pointer hover:underline"
          >
            Mark all as read
          </button>
        </div>

        <div className="space-y-2 pb-6">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="relative flex bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <Link
                to={`/notifications/${notification.id}`}
                className="flex flex-1  items-center p-3 min-w-0"
              >
                <div className="mr-3 flex-shrink-0">
                  <NotificationIcon
                    type={notification.type}
                    className="w-6 h-6"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    {notification.title}
                  </p>
                  <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                    {notification.intro}
                  </p>
                </div>
              </Link>
              <div className="flex items-center flex-shrink-0">
                <div className="flex flex-col items-center justify-between h-full py-3 px-2">
                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-green-500 rounded-full mb-1"></div>
                  )}
                  <p className="text-xs text-gray-400 whitespace-nowrap">
                    {notification.timestamp}
                  </p>
                </div>
                <button
                  onClick={(e) => handleDelete(notification.id, e)}
                  aria-label="Delete notification"
                  className="w-10 h-full bg-red-500 text-white flex items-center justify-center cursor-pointer hover:opacity-85 transition-colors"
                >
                  <RiDeleteBin6Line size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(NotificationPage);
