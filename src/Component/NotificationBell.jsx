import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import { fetchNotifications, markAsRead } from '../redux/slices/notificationSlice';

const NotificationBell = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, unreadCount, isLoading } = useSelector((state) => state.notifications);
  const { userInfo } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchNotifications());
    }
  }, [dispatch, userInfo]);

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      dispatch(markAsRead(notification._id));
    }
    if (notification.orderId) {
      navigate(`/order/${notification.orderId}`);
    }
    setIsOpen(false);
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return '🔔';
    }
  };

  if (!userInfo) return null;

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex flex-col items-center group"
      >
        <FaBell className="text-3xl text-black group-hover:text-red-700 transition" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
        <span className="hidden sm:block text-[12px] mt-1">Alerts</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 border">
            <div className="p-3 border-b bg-gray-50 rounded-t-lg">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              {unreadCount > 0 && (
                <span className="text-xs text-gray-500">{unreadCount} unread</span>
              )}
            </div>
            <div className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center text-gray-500">Loading...</div>
              ) : items.length === 0 ? (
                <div className="p-4 text-center text-gray-500">No notifications</div>
              ) : (
                items.map((notification) => (
                  <div
                    key={notification._id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`p-3 border-b hover:bg-gray-50 cursor-pointer transition ${
                      !notification.isRead ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-xl">{getNotificationIcon(notification.type)}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;