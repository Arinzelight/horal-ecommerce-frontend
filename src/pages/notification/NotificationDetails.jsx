import React from "react";
import { useParams, Link } from "react-router-dom";
import { notifications } from "../../data/notification";
import NotificationIcon from "./NotificationIcons";
import {  FaChevronLeft } from "react-icons/fa";

const NotificationDetail = () => {
  const { id } = useParams();
  const notification = notifications.find((n) => n.id === parseInt(id));

  if (!notification) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-16">
          <h2 className="text-xl font-semibold mb-2">Notification not found</h2>
          <Link
            to="/notifications"
            className="text-primary-700 hover:text-primary-900"
          >
            Back to notifications
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:mx-auto">
      <div className="pt-8">
        <Link
          to="/notifications"
          className="inline-flex items-center text-primary text-xs cursor-pointer mb-6"
        >
          <FaChevronLeft size={15} className="mr-1" />
          Back to notifications
        </Link>

        <div className="flex justify-between items-center mb-4 border-b-1 border-gray-100">
          <div className="flex flex-row space-x-2">
            <NotificationIcon
              type={notification.type}
              className="flex-shrink-0 mt-2"
            />
            <h1 className="text-sm font-semibold mb-2 neutral-900">{notification.title}</h1>
          </div>

          <div className="text-neutral-900 text-xs font-medium whitespace-nowrap"> 
            {notification.timestamp}
          </div>
        </div>

        <div className="bg-white   ">
          <div className="">
            <p className="text-neutral-500 p-4">{notification.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetail;
