// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { FaBell } from 'react-icons/fa';
// import { fetchNotifications, markAsRead } from '../redux/slices/notificationSlice';
// import { useNavigate } from 'react-router-dom';

// const NotificationBell = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { items: notifications, unreadCount, isLoading } = useSelector((state) => state.notifications);
//     const [showDropdown, setShowDropdown] = useState(false);

//     useEffect(() => {
//         dispatch(fetchNotifications());
//         // Har 30 second mein check karo
//         const interval = setInterval(() => {
//             dispatch(fetchNotifications());
//         }, 30000);
//         return () => clearInterval(interval);
//     }, [dispatch]);

//     const handleMarkAsRead = async (id) => {
//         await dispatch(markAsRead(id));
//     };

//     const handleNotificationClick = (notification) => {
//         if (!notification.isRead) {
//             handleMarkAsRead(notification._id);
//         }
//         if (notification.orderId) {
//             navigate(`/order/${notification.orderId}`);
//         }
//         setShowDropdown(false);
//     };

//     return (
//         <div className="relative">
//             {/* Bell Icon */}
//             <button 
//                 onClick={() => setShowDropdown(!showDropdown)}
//                 className="relative p-2 hover:bg-gray-100 rounded-full transition"
//             >
//                 <FaBell className="text-3xl text-gray-700" />
//                 {unreadCount > 0 && (
//                     <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                         {unreadCount > 9 ? '9+' : unreadCount}
//                     </span>
//                 )}
//             </button>

//             {/* Dropdown */}
//             {showDropdown && (
//                 <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50">
//                     <div className="p-3 border-b">
//                         <h3 className="font-semibold">Notifications</h3>
//                     </div>
                    
//                     <div className="max-h-96 overflow-y-auto">
//                         {isLoading && notifications.length === 0 ? (
//                             <p className="text-center text-gray-500 py-4">Loading...</p>
//                         ) : notifications.length === 0 ? (
//                             <p className="text-center text-gray-500 py-4">No notifications</p>
//                         ) : (
//                             notifications.map((notif) => (
//                                 <div 
//                                     key={notif._id}
//                                     className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${!notif.isRead ? 'bg-blue-50' : ''}`}
//                                     onClick={() => handleNotificationClick(notif)}
//                                 >
//                                     <p className="text-sm font-medium">{notif.title}</p>
//                                     <p className="text-xs text-gray-500">{notif.message}</p>
//                                     <p className="text-xs text-gray-400 mt-1">
//                                         {new Date(notif.createdAt).toLocaleString()}
//                                     </p>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default NotificationBell;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaBell } from 'react-icons/fa';
import { fetchNotifications, markAsRead, markAllAsRead } from '../redux/slices/notificationSlice';
import { useNavigate } from 'react-router-dom';

const NotificationBell = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items: notifications, unreadCount, isLoading } = useSelector((state) => state.notifications);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        dispatch(fetchNotifications());
        // Har 30 second mein check karo
        const interval = setInterval(() => {
            dispatch(fetchNotifications());
        }, 30000);
        return () => clearInterval(interval);
    }, [dispatch]);

    const handleMarkAsRead = async (id) => {
        await dispatch(markAsRead(id));
    };

    const handleMarkAllAsRead = async () => {
        await dispatch(markAllAsRead());
    };

    const handleNotificationClick = (notification) => {
        if (!notification.isRead) {
            handleMarkAsRead(notification._id);
        }
        if (notification.orderId) {
            navigate(`/order/${notification.orderId}`);
        }
        setShowDropdown(false);
    };

    return (
        <div className="relative">
            {/* Bell Icon - Responsive Size */}
            <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="relative p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition group"
            >
                <FaBell className="text-xl sm:text-2xl md:text-3xl text-gray-700 group-hover:text-red-600 transition-colors" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] sm:text-xs font-bold rounded-full min-w-[18px] sm:min-w-[20px] h-[18px] sm:h-[20px] flex items-center justify-center px-1 shadow-md">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown - Responsive Width */}
            {showDropdown && (
                <>
                    {/* Backdrop for mobile */}
                    <div 
                        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                        onClick={() => setShowDropdown(false)}
                    />
                    
                    <div className="absolute right-0 mt-2 w-[90vw] sm:w-80 md:w-96 bg-white rounded-lg shadow-xl border z-50">
                        {/* Header */}
                        <div className="p-3 sm:p-4 border-b flex justify-between items-center">
                            <h3 className="font-semibold text-sm sm:text-base text-gray-800">Notifications</h3>
                            {unreadCount > 0 && (
                                <button 
                                    onClick={handleMarkAllAsRead}
                                    className="text-[10px] sm:text-xs text-red-600 hover:underline"
                                >
                                    Mark all as read
                                </button>
                            )}
                        </div>
                        
                        {/* Notifications List */}
                        <div className="max-h-64 sm:max-h-80 md:max-h-96 overflow-y-auto">
                            {isLoading && notifications.length === 0 ? (
                                <div className="text-center py-6 sm:py-8">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-gray-300 border-t-red-600 rounded-full animate-spin mx-auto mb-2"></div>
                                    <p className="text-xs sm:text-sm text-gray-500">Loading...</p>
                                </div>
                            ) : notifications.length === 0 ? (
                                <div className="text-center py-8 sm:py-10">
                                    <FaBell className="text-3xl sm:text-4xl text-gray-300 mx-auto mb-2" />
                                    <p className="text-xs sm:text-sm text-gray-500">No notifications yet</p>
                                </div>
                            ) : (
                                notifications.map((notif) => (
                                    <div 
                                        key={notif._id}
                                        className={`p-3 sm:p-4 border-b hover:bg-gray-50 cursor-pointer transition ${
                                            !notif.isRead ? 'bg-red-50 border-l-4 border-l-red-600' : ''
                                        }`}
                                        onClick={() => handleNotificationClick(notif)}
                                    >
                                        <div className="flex items-start gap-2 sm:gap-3">
                                            <div className={`w-2 h-2 rounded-full mt-1.5 ${!notif.isRead ? 'bg-red-600' : 'bg-gray-300'}`}></div>
                                            <div className="flex-1">
                                                <p className="text-xs sm:text-sm font-semibold text-gray-800">{notif.title}</p>
                                                <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">{notif.message}</p>
                                                <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
                                                    {new Date(notif.createdAt).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        
                        {/* Footer */}
                        {notifications.length > 0 && (
                            <div className="p-2 sm:p-3 border-t bg-gray-50">
                                <button 
                                    onClick={() => navigate('/notifications')}
                                    className="w-full text-center text-[11px] sm:text-xs text-red-600 hover:underline py-1"
                                >
                                    View all notifications →
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default NotificationBell;