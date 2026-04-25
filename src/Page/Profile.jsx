// import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { CgProfile } from "react-icons/cg";
// import { SiShopify } from "react-icons/si";
// import { FaHeart, FaHome, FaEdit, FaSave, FaPlus, FaTrash, FaCheck, FaEye, FaRupeeSign, FaBox } from "react-icons/fa";
// import { FaCcAmazonPay } from "react-icons/fa6";
// import { AiFillSecurityScan } from "react-icons/ai";
// import { IoSettings, IoLogOutSharp } from "react-icons/io5";
// import { MdCancel, MdDeliveryDining } from "react-icons/md";
// import API from "../utils/api";

// const Profile = () => {
//     const navigate = useNavigate()
//     const [show, setShow] = useState(1)
//     const [isEditing, setIsEditing] = useState(false);
//     const [activeTab, setActiveTab] = useState(1)
//     const [isLoading, setIsLoading] = useState(true)
//     const [error, setError] = useState(null)
    
//     // Address States
//     const [addresses, setAddresses] = useState([])
//     const [showAddressForm, setShowAddressForm] = useState(false)
//     const [editingAddress, setEditingAddress] = useState(null)
//     const [addressForm, setAddressForm] = useState({
//         street: "",
//         city: "",
//         state: "",
//         zipCode: "",
//         isDefault: false
//     })
    
//     // Orders State
//     const [orders, setOrders] = useState([])
//     const [selectedOrder, setSelectedOrder] = useState(null)
//     const [showOrderModal, setShowOrderModal] = useState(false)
    
//     const [userProfile, setUserProfile] = useState({
//         _id: "",
//         name: "",
//         email: "",
//         wishlist: [],
//         createdAt: ""
//     })
    
//     const [tempProfile, setTempProfile] = useState({})

//     // ✅ Get status badge color and icon
// const getStatusBadge = (status, isCancelled) => {
//   if (isCancelled) {
//     return { color: 'bg-red-100 text-red-800', icon: '❌', text: 'Cancelled' };
//   }
//   switch(status) {
//     case 'Delivered':
//       return { color: 'bg-green-100 text-green-800', icon: '✅', text: 'Delivered' };
//     case 'Shipped':
//       return { color: 'bg-blue-100 text-blue-800', icon: '🚚', text: 'Shipped' };
//     case 'Processing':
//       return { color: 'bg-yellow-100 text-yellow-800', icon: '⏳', text: 'Processing' };
//     default:
//       return { color: 'bg-gray-100 text-gray-800', icon: '📦', text: status || 'Placed' };
//   }
// };
    
//     useEffect(() => {
//         fetchUserProfile()
//         fetchAddresses()
//         fetchOrders() // Fetch orders on load
//     }, [])
    
//     const fetchUserProfile = async () => {
//         setIsLoading(true)
//         setError(null)
        
//         try {
//             const response = await API.get('/user/profile')
//             setUserProfile(response.data)
//             setTempProfile(response.data)
//         } catch (err) {
//             if (err.response?.status === 401) {
//                 navigate('/')
//             } else {
//                 setError(err.response?.data?.message || "Failed to fetch profile")
//             }
//         } finally {
//             setIsLoading(false)
//         }
//     }
    
//     // Fetch all orders for the user
//     const fetchOrders = async () => {
//         try {
//             const response = await API.get('/orders/myorders')
//             if (Array.isArray(response.data)) {
//                 setOrders(response.data)
//             } else if (response.data && Array.isArray(response.data.orders)) {
//                 setOrders(response.data.orders)
//             } else {
//                 setOrders([])
//             }
//         } catch (err) {
//             console.error("Failed to fetch orders:", err)
//             setOrders([])
//         }
//     }
    
//     // Fetch single order details
//     const fetchOrderDetails = async (orderId) => {
//         setIsLoading(true)
//         try {
//             const response = await API.get(`/orders/${orderId}`)
//             setSelectedOrder(response.data)
//             setShowOrderModal(true)
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to fetch order details")
//         } finally {
//             setIsLoading(false)
//         }
//     }
    
//     // Place new order (call this when user clicks checkout)
//     const placeOrder = async (orderData) => {
//         setIsLoading(true)
//         try {
//             const response = await API.post('/orders/place', orderData)
//             if (response.data.order) {
//                 // Refresh orders list
//                 await fetchOrders()
//                 return { success: true, order: response.data.order }
//             }
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to place order")
//             return { success: false, error: err.response?.data?.message }
//         } finally {
//             setIsLoading(false)
//         }
//     }
    
//     // Get status badge color
//     const getStatusColor = (status) => {
//         switch(status) {
//             case 'Delivered': return 'bg-green-100 text-green-800'
//             case 'Processing': return 'bg-yellow-100 text-yellow-800'
//             case 'Shipped': return 'bg-blue-100 text-blue-800'
//             case 'Cancelled': return 'bg-red-100 text-red-800'
//             default: return 'bg-gray-100 text-gray-800'
//         }
//     }
    
//     // Get payment status color
//     const getPaymentStatusColor = (isPaid) => {
//         return isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//     }
    
//     // Format date
//     const formatDate = (dateString) => {
//         if (!dateString) return "N/A"
//         const date = new Date(dateString)
//         return date.toLocaleDateString('en-US', { 
//             year: 'numeric', 
//             month: 'short', 
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//         })
//     }
    
//     // Address functions (same as before)
//     const fetchAddresses = async () => {
//         try {
//             const response = await API.get('/user/address')
//             if (Array.isArray(response.data)) {
//                 setAddresses(response.data)
//             } else if (response.data && Array.isArray(response.data.addresses)) {
//                 setAddresses(response.data.addresses)
//             } else {
//                 setAddresses([])
//             }
//         } catch (err) {
//             console.error("Failed to fetch addresses:", err)
//             setAddresses([])
//         }
//     }
    
//     const handleAddAddress = async (e) => {
//         e.preventDefault()
//         setIsLoading(true)
//         try {
//             const response = await API.post('/user/address', addressForm)
//             if (Array.isArray(response.data)) {
//                 setAddresses(response.data)
//             } else if (response.data && Array.isArray(response.data.addresses)) {
//                 setAddresses(response.data.addresses)
//             } else {
//                 setAddresses([])
//             }
//             setShowAddressForm(false)
//             setAddressForm({
//                 street: "",
//                 city: "",
//                 state: "",
//                 zipCode: "",
//                 isDefault: false
//             })
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to add address")
//         } finally {
//             setIsLoading(false)
//         }
//     }
    
//     const handleUpdateAddress = async (e) => {
//         e.preventDefault()
//         setIsLoading(true)
//         try {
//             const response = await API.put(`/user/address/${editingAddress._id}`, addressForm)
//             if (Array.isArray(response.data)) {
//                 setAddresses(response.data)
//             } else if (response.data && Array.isArray(response.data.addresses)) {
//                 setAddresses(response.data.addresses)
//             } else {
//                 setAddresses([])
//             }
//             setShowAddressForm(false)
//             setEditingAddress(null)
//             setAddressForm({
//                 street: "",
//                 city: "",
//                 state: "",
//                 zipCode: "",
//                 isDefault: false
//             })
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to update address")
//         } finally {
//             setIsLoading(false)
//         }
//     }
    
//     const handleDeleteAddress = async (addressId) => {
//         if (!window.confirm("Are you sure you want to delete this address?")) return
        
//         setIsLoading(true)
//         try {
//             const response = await API.delete(`/user/address/${addressId}`)
//             if (Array.isArray(response.data)) {
//                 setAddresses(response.data)
//             } else if (response.data && Array.isArray(response.data.addresses)) {
//                 setAddresses(response.data.addresses)
//             } else {
//                 setAddresses([])
//             }
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to delete address")
//         } finally {
//             setIsLoading(false)
//         }
//     }
    
//     const handleSetDefault = async (addressId) => {
//         setIsLoading(true)
//         try {
//             const addressToUpdate = addresses.find(addr => addr._id === addressId)
//             const response = await API.put(`/user/address/${addressId}`, {
//                 street: addressToUpdate.street,
//                 city: addressToUpdate.city,
//                 state: addressToUpdate.state,
//                 zipCode: addressToUpdate.zipCode,
//                 isDefault: true
//             })
//             if (Array.isArray(response.data)) {
//                 setAddresses(response.data)
//             } else if (response.data && Array.isArray(response.data.addresses)) {
//                 setAddresses(response.data.addresses)
//             } else {
//                 setAddresses([])
//             }
//         } catch (err) {
//             setError(err.response?.data?.message || "Failed to set default address")
//         } finally {
//             setIsLoading(false)
//         }
//     }
    
//     const editAddress = (address) => {
//         setEditingAddress(address)
//         setAddressForm({
//             street: address.street,
//             city: address.city,
//             state: address.state,
//             zipCode: address.zipCode,
//             isDefault: address.isDefault || false
//         })
//         setShowAddressForm(true)
//     }
    
//     const handleEditSave = async () => {
//         if (isEditing) {
//             setIsLoading(true)
//             try {
//                 const response = await API.put('/user/profile', {
//                     name: tempProfile.name,
//                     email: tempProfile.email
//                 })
//                 setUserProfile(response.data)
//                 setTempProfile(response.data)
//             } catch (err) {
//                 setError(err.response?.data?.message || "Failed to update profile")
//             } finally {
//                 setIsLoading(false)
//             }
//         }
//         setIsEditing(!isEditing);
//     }
    
//     const handleCancel = () => {
//         setTempProfile(userProfile);
//         setIsEditing(false);
//     }
    
//     const updateProfileField = (field, value) => {
//         setTempProfile(prev => ({ ...prev, [field]: value }))
//     }
    
//     const handleLogout = () => {
//         localStorage.removeItem('token')
//         localStorage.removeItem('user')
//         navigate('/')
//     }
    
//     const handleNavClick = (id) => {
//         setShow(id);
//         setActiveTab(id);
//         if (id === 2) {
//             fetchOrders() // Refresh orders when clicking on My Orders tab
//         }
//         if (id === 4) {
//             fetchAddresses()
//         }
//     }
    
//     if (isLoading && !userProfile.name) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-50">
//                 <div className="text-center">
//                     <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-3"></div>
//                     <p className="text-gray-600">Loading profile...</p>
//                 </div>
//             </div>
//         )
//     }
    
//     if (error) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-50">
//                 <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow">
//                     <div className="text-red-600 text-5xl mb-3">!</div>
//                     <h2 className="text-xl font-bold text-gray-900 mb-2">Error</h2>
//                     <p className="text-gray-600 mb-4">{error}</p>
//                     <button 
//                         onClick={() => {
//                             setError(null)
//                             fetchUserProfile()
//                             fetchAddresses()
//                             fetchOrders()
//                         }}
//                         className="px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
//                     >
//                         Try Again
//                     </button>
//                 </div>
//             </div>
//         )
//     }
    
//     return (
//         <div className='bg-gray-50 min-h-screen'>
//             <div className='py-8 px-4 max-w-7xl mx-auto'>
//                 <h1 className='text-3xl font-bold text-gray-900 mb-8'>
//                     My Account
//                 </h1>
    
//                 <div className='flex flex-col lg:flex-row gap-8'>
//                     {/* Sidebar */}
//                     <div className='lg:w-1/4'>
//                         <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
//                             <div className='flex flex-col items-center text-center pb-6 border-b border-gray-200 mb-6'>
//                                 <div className='w-24 h-24 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center mb-4'>
//                                     <CgProfile className="text-white text-5xl" />
//                                 </div>
//                                 <h2 className='text-xl font-bold text-gray-900 mb-1'>{userProfile.name}</h2>
//                                 <p className='text-gray-500 text-sm'>{userProfile.email}</p>
//                                 <p className='text-gray-400 text-xs mt-2'>Member since {formatDate(userProfile.createdAt)}</p>
//                             </div>
    
//                             <nav className='space-y-1'>
//                                 {[
//                                     { id: 1, icon: <CgProfile />, label: "Profile Info" },
//                                     { id: 2, icon: <SiShopify />, label: "My Orders" },
//                                     { id: 3, icon: <FaHeart />, label: "Wishlist" },
//                                     { id: 4, icon: <FaHome />, label: "Address" },
//                                     { id: 5, icon: <FaCcAmazonPay />, label: "Payment" },
//                                     { id: 6, icon: <AiFillSecurityScan />, label: "Security" },
//                                     { id: 7, icon: <IoSettings />, label: "Settings" }
//                                 ].map((item) => (
//                                     <button
//                                         key={item.id}
//                                         onClick={() => handleNavClick(item.id)}
//                                         className={`flex items-center w-full p-3 rounded-lg transition-all text-left ${
//                                             activeTab === item.id 
//                                             ? 'bg-gray-100 text-gray-900 font-medium' 
//                                             : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
//                                         }`}
//                                     >
//                                         <span className='mr-3 text-lg'>{item.icon}</span>
//                                         <span>{item.label}</span>
//                                     </button>
//                                 ))}
                                
//                                 <button 
//                                     onClick={handleLogout}
//                                     className='flex items-center w-full p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all mt-4'
//                                 >
//                                     <span className='mr-3 text-lg'><IoLogOutSharp /></span>
//                                     <span>Logout</span>
//                                 </button>
//                             </nav>
//                         </div>
//                     </div>
    
//                     {/* Main Content */}
//                     <div className='lg:w-3/4'>
//                         {/* Profile Info - Same as before */}
//                         {show === 1 && (
//                             <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
//                                 <div className='flex justify-between items-center mb-6 pb-4 border-b border-gray-200'>
//                                     <h2 className='text-2xl font-bold text-gray-900'>Profile Information</h2>
//                                     <div className='flex gap-3'>
//                                         {isEditing ? (
//                                             <>
//                                                 <button
//                                                     onClick={handleEditSave}
//                                                     className='flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all text-sm'
//                                                     disabled={isLoading}
//                                                 >
//                                                     <FaSave /> {isLoading ? 'Saving...' : 'Save'}
//                                                 </button>
//                                                 <button
//                                                     onClick={handleCancel}
//                                                     className='flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm'
//                                                 >
//                                                     <MdCancel /> Cancel
//                                                 </button>
//                                             </>
//                                         ) : (
//                                             <button
//                                                 onClick={() => setIsEditing(true)}
//                                                 className='flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all text-sm'
//                                             >
//                                                 <FaEdit /> Edit Profile
//                                             </button>
//                                         )}
//                                     </div>
//                                 </div>
    
//                                 <div className='space-y-5'>
//                                     <div>
//                                         <label className='block text-gray-700 text-sm font-medium mb-2'>Full Name</label>
//                                         <input
//                                             type='text'
//                                             value={isEditing ? tempProfile.name : userProfile.name}
//                                             onChange={(e) => updateProfileField('name', e.target.value)}
//                                             disabled={!isEditing}
//                                             className='w-full p-3 border border-gray-300 rounded-lg bg-gray-50 disabled:bg-gray-100 focus:ring-2 focus:ring-gray-900 outline-none'
//                                         />
//                                     </div>
                                    
//                                     <div>
//                                         <label className='block text-gray-700 text-sm font-medium mb-2'>Email Address</label>
//                                         <input
//                                             type='email'
//                                             value={userProfile.email}
//                                             disabled
//                                             className='w-full p-3 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed'
//                                         />
//                                     </div>
                                    
//                                     <div>
//                                         <label className='block text-gray-700 text-sm font-medium mb-2'>Wishlist Items</label>
//                                         <input
//                                             type='text'
//                                             value={userProfile.wishlist?.length || 0}
//                                             disabled
//                                             className='w-full p-3 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed'
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
    
                         

// {show === 2 && (
//   <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
//     <div className='flex justify-between items-center mb-6'>
//       <h2 className='text-2xl font-bold text-gray-900'>My Orders</h2>
//       <div className='px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm'>
//         Total Orders: {orders.length}
//       </div>
//     </div>

//     {orders.length === 0 ? (
//       <div className="text-center py-12">
//         <FaBox className="text-5xl text-gray-300 mx-auto mb-3" />
//         <p className="text-gray-500">No orders found</p>
//         <button 
//           onClick={() => navigate('/products')}
//           className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//         >
//           Start Shopping
//         </button>
//       </div>
//     ) : (
//       <div className='space-y-4'>
//         {orders.map((order) => {
//           const statusInfo = getStatusBadge(order.status, order.isCancelled);
//           const StatusIcon = statusInfo.icon;
          
//           return (
//             <div 
//               key={order._id} 
//               className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer'
//               onClick={() => navigate(`/order/${order._id}`)}
//             >
//               {/* Order Header */}
//               <div className='flex flex-wrap justify-between items-start mb-3 pb-3 border-b border-gray-100'>
//                 <div>
//                   <p className='text-sm text-gray-500'>Order #{order._id?.slice(-8)}</p>
//                   <p className='text-xs text-gray-400'>
//                     {new Date(order.createdAt).toLocaleDateString('en-IN', {
//                       day: 'numeric',
//                       month: 'short',
//                       year: 'numeric'
//                     })}
//                   </p>
//                 </div>
//                 <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusInfo.color}`}>
//                   <StatusIcon size={12} />
//                   <span>{statusInfo.text}</span>
//                 </div>
//               </div>

//               {/* Order Items Preview */}
//               <div className='mb-3'>
//                 <div className='flex flex-wrap gap-2'>
//                   {order.orderItems?.slice(0, 2).map((item, idx) => (
//                     <div key={idx} className='flex items-center gap-2 text-sm'>
//                       <span>{item.name}</span>
//                       <span className='text-gray-400'>x{item.qty}</span>
//                     </div>
//                   ))}
//                   {order.orderItems?.length > 2 && (
//                     <span className='text-xs text-gray-400'>+{order.orderItems.length - 2} more</span>
//                   )}
//                 </div>
//               </div>

//               {/* Order Footer */}
//               <div className='flex flex-wrap justify-between items-center pt-3 border-t border-gray-100'>
//                 <div className='flex items-center gap-1'>
//                   <FaRupeeSign className="text-gray-600 text-sm" />
//                   <span className='font-bold text-gray-900'>{order.totalPrice?.toLocaleString()}</span>
//                 </div>
//                 <div className='flex gap-3'>
//                   <button 
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       navigate(`/order/${order._id}`);
//                     }}
//                     className='text-sm text-red-600 hover:text-red-700'
//                   >
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     )}
//   </div>
// )}
    
//                         {/* Order Details Modal */}
//                         {showOrderModal && selectedOrder && (
//                             <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowOrderModal(false)}>
//                                 <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
//                                     <div className='flex justify-between items-center mb-4 pb-3 border-b'>
//                                         <h3 className='text-xl font-bold text-gray-900'>Order Details</h3>
//                                         <button onClick={() => setShowOrderModal(false)} className='text-gray-400 hover:text-gray-600'>
//                                             <MdCancel size={24} />
//                                         </button>
//                                     </div>
    
//                                     {/* Order Info */}
//                                     <div className='space-y-4'>
//                                         <div className='grid grid-cols-2 gap-4 text-sm'>
//                                             <div>
//                                                 <p className='text-gray-500'>Order ID</p>
//                                                 <p className='font-medium'>{selectedOrder._id}</p>
//                                             </div>
//                                             <div>
//                                                 <p className='text-gray-500'>Order Date</p>
//                                                 <p className='font-medium'>{formatDate(selectedOrder.createdAt)}</p>
//                                             </div>
//                                             <div>
//                                                 <p className='text-gray-500'>Status</p>
//                                                 <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
//                                                     {selectedOrder.status}
//                                                 </span>
//                                             </div>
//                                             <div>
//                                                 <p className='text-gray-500'>Payment</p>
//                                                 <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(selectedOrder.isPaid)}`}>
//                                                     {selectedOrder.isPaid ? 'Paid' : 'Pending'}
//                                                 </span>
//                                             </div>
//                                         </div>
    
//                                         {/* Shipping Address */}
//                                         {selectedOrder.shippingAddress && (
//                                             <div className='border-t pt-3'>
//                                                 <h4 className='font-semibold mb-2'>Shipping Address</h4>
//                                                 <p className='text-sm text-gray-600'>
//                                                     {selectedOrder.shippingAddress.street}<br />
//                                                     {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}<br />
//                                                     PIN: {selectedOrder.shippingAddress.zipCode}
//                                                 </p>
//                                             </div>
//                                         )}
    
//                                         {/* Order Items */}
//                                         <div className='border-t pt-3'>
//                                             <h4 className='font-semibold mb-3'>Order Items</h4>
//                                             <div className='space-y-2'>
//                                                 {selectedOrder.orderItems?.map((item, idx) => (
//                                                     <div key={idx} className='flex justify-between items-center py-2 border-b border-gray-100'>
//                                                         <div className='flex items-center gap-3'>
//                                                             {item.image && (
//                                                                 <img src={item.image} alt={item.name} className='w-12 h-12 object-cover rounded' />
//                                                             )}
//                                                             <div>
//                                                                 <p className='font-medium'>{item.name}</p>
//                                                                 <p className='text-xs text-gray-500'>Qty: {item.qty}</p>
//                                                             </div>
//                                                         </div>
//                                                         <p className='font-medium'>₹{item.price * item.qty}</p>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </div>
    
//                                         {/* Total */}
//                                         <div className='border-t pt-3'>
//                                             <div className='flex justify-between items-center'>
//                                                 <span className='font-bold'>Total Amount</span>
//                                                 <span className='text-xl font-bold text-gray-900'>₹{selectedOrder.totalPrice?.toLocaleString()}</span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
    
//                         {/* Wishlist - Same as before */}
//                         {show === 3 && (
//                             <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
//                                 <div className='flex justify-between items-center mb-4'>
//                                     <h2 className='text-2xl font-bold text-gray-900'>My Wishlist</h2>
//                                     <span className='px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm'>
//                                         {userProfile.wishlist?.length || 0} items
//                                     </span>
//                                 </div>
//                                 {!userProfile.wishlist || userProfile.wishlist.length === 0 ? (
//                                     <div className="text-center py-12">
//                                         <FaHeart className="text-5xl text-gray-300 mx-auto mb-3" />
//                                         <p className="text-gray-500">Your wishlist is empty</p>
//                                     </div>
//                                 ) : (
//                                     <div className="space-y-3">
//                                         {userProfile.wishlist.map((item, index) => (
//                                             <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
//                                                 <span>{typeof item === 'string' ? item : item.name || item.productId}</span>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>
//                         )}
    
//                         {/* Address Section - Same as before */}
//                         {show === 4 && (
//                             <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
//                                 <div className='flex justify-between items-center mb-6'>
//                                     <h2 className='text-2xl font-bold text-gray-900'>Saved Addresses</h2>
//                                     <button
//                                         onClick={() => {
//                                             setEditingAddress(null)
//                                             setAddressForm({
//                                                 street: "",
//                                                 city: "",
//                                                 state: "",
//                                                 zipCode: "",
//                                                 isDefault: false
//                                             })
//                                             setShowAddressForm(true)
//                                         }}
//                                         className='flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm'
//                                     >
//                                         <FaPlus /> Add Address
//                                     </button>
//                                 </div>
    
//                                 {/* Address Form Modal */}
//                                 {showAddressForm && (
//                                     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddressForm(false)}>
//                                         <div className="bg-white rounded-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
//                                             <h3 className="text-xl font-bold mb-4">
//                                                 {editingAddress ? 'Edit Address' : 'Add New Address'}
//                                             </h3>
//                                             <form onSubmit={editingAddress ? handleUpdateAddress : handleAddAddress} className="space-y-4">
//                                                 <div>
//                                                     <label className="block text-sm font-medium mb-1">Street Address</label>
//                                                     <input
//                                                         type="text"
//                                                         value={addressForm.street}
//                                                         onChange={(e) => setAddressForm({...addressForm, street: e.target.value})}
//                                                         className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-900 outline-none"
//                                                         required
//                                                     />
//                                                 </div>
//                                                 <div>
//                                                     <label className="block text-sm font-medium mb-1">City</label>
//                                                     <input
//                                                         type="text"
//                                                         value={addressForm.city}
//                                                         onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
//                                                         className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-900 outline-none"
//                                                         required
//                                                     />
//                                                 </div>
//                                                 <div>
//                                                     <label className="block text-sm font-medium mb-1">State</label>
//                                                     <input
//                                                         type="text"
//                                                         value={addressForm.state}
//                                                         onChange={(e) => setAddressForm({...addressForm, state: e.target.value})}
//                                                         className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-900 outline-none"
//                                                         required
//                                                     />
//                                                 </div>
//                                                 <div>
//                                                     <label className="block text-sm font-medium mb-1">Zip Code</label>
//                                                     <input
//                                                         type="text"
//                                                         value={addressForm.zipCode}
//                                                         onChange={(e) => setAddressForm({...addressForm, zipCode: e.target.value})}
//                                                         className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-900 outline-none"
//                                                         required
//                                                     />
//                                                 </div>
//                                                 <div className="flex items-center gap-2">
//                                                     <input
//                                                         type="checkbox"
//                                                         checked={addressForm.isDefault}
//                                                         onChange={(e) => setAddressForm({...addressForm, isDefault: e.target.checked})}
//                                                         className="w-4 h-4"
//                                                     />
//                                                     <label className="text-sm">Set as default address</label>
//                                                 </div>
//                                                 <div className="flex gap-3 pt-2">
//                                                     <button type="submit" className="flex-1 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800">
//                                                         {editingAddress ? 'Update' : 'Save'} Address
//                                                     </button>
//                                                     <button type="button" onClick={() => setShowAddressForm(false)} className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200">
//                                                         Cancel
//                                                     </button>
//                                                 </div>
//                                             </form>
//                                         </div>
//                                     </div>
//                                 )}
    
//                                 {/* Addresses List */}
//                                 {!addresses || addresses.length === 0 ? (
//                                     <div className="text-center py-12">
//                                         <FaHome className="text-5xl text-gray-300 mx-auto mb-3" />
//                                         <p className="text-gray-500">No addresses saved</p>
//                                         <p className="text-gray-400 text-sm mt-1">Click "Add Address" to add your first address</p>
//                                     </div>
//                                 ) : (
//                                     <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//                                         {addresses.map((addr) => (
//                                             <div 
//                                                 key={addr._id} 
//                                                 className={`border rounded-lg p-4 transition-all ${
//                                                     addr.isDefault ? 'border-gray-900 bg-gray-50' : 'border-gray-200'
//                                                 }`}
//                                             >
//                                                 <div className='flex justify-between items-start mb-3'>
//                                                     <div className='flex items-center gap-2'>
//                                                         <FaHome className="text-gray-600" />
//                                                         {addr.isDefault && (
//                                                             <span className='px-2 py-0.5 bg-gray-900 text-white text-xs rounded-full'>Default</span>
//                                                         )}
//                                                     </div>
//                                                     <div className='flex gap-2'>
//                                                         <button 
//                                                             onClick={() => editAddress(addr)}
//                                                             className='p-1 text-gray-500 hover:text-gray-900 transition-colors'
//                                                             title='Edit'
//                                                         >
//                                                             <FaEdit size={14} />
//                                                         </button>
//                                                         <button 
//                                                             onClick={() => handleDeleteAddress(addr._id)}
//                                                             className='p-1 text-gray-500 hover:text-red-600 transition-colors'
//                                                             title='Delete'
//                                                         >
//                                                             <FaTrash size={14} />
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                                 <div className='space-y-1 text-sm'>
//                                                     <p className='text-gray-800'>{addr.street}</p>
//                                                     <p className='text-gray-600'>{addr.city}, {addr.state}</p>
//                                                     <p className='text-gray-600'>PIN: {addr.zipCode}</p>
//                                                 </div>
//                                                 {!addr.isDefault && (
//                                                     <button 
//                                                         onClick={() => handleSetDefault(addr._id)}
//                                                         className='mt-3 text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors'
//                                                     >
//                                                         <FaCheck size={10} /> Set as default
//                                                     </button>
//                                                 )}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>
//                         )}
    
//                         {/* Payment, Security, Settings - Coming Soon */}
//                         {show === 5 && (
//                             <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center'>
//                                 <div className="py-12">
//                                     <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                                         <FaCcAmazonPay className="text-2xl text-gray-600" />
//                                     </div>
//                                     <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Methods</h3>
//                                     <p className="text-gray-500">This feature will be available soon</p>
//                                 </div>
//                             </div>
//                         )}
    
//                         {show === 6 && (
//                             <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center'>
//                                 <div className="py-12">
//                                     <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                                         <AiFillSecurityScan className="text-2xl text-gray-600" />
//                                     </div>
//                                     <h3 className="text-xl font-semibold text-gray-900 mb-2">Security Settings</h3>
//                                     <p className="text-gray-500">This feature will be available soon</p>
//                                 </div>
//                             </div>
//                         )}
    
//                         {show === 7 && (
//                             <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center'>
//                                 <div className="py-12">
//                                     <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                                         <IoSettings className="text-2xl text-gray-600" />
//                                     </div>
//                                     <h3 className="text-xl font-semibold text-gray-900 mb-2">App Settings</h3>
//                                     <p className="text-gray-500">This feature will be available soon</p>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
    
// export default Profile



import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { SiShopify } from "react-icons/si";
import { FaHeart, FaHome, FaEdit, FaSave, FaPlus, FaTrash, FaCheck, FaRupeeSign, FaBox } from "react-icons/fa";
import { FaCcAmazonPay } from "react-icons/fa6";
import { AiFillSecurityScan } from "react-icons/ai";
import { IoSettings, IoLogOutSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import API from "../utils/api";

const Profile = () => {
    const navigate = useNavigate()
    const [show, setShow] = useState(1)
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    
    // Address States
    const [addresses, setAddresses] = useState([])
    const [showAddressForm, setShowAddressForm] = useState(false)
    const [editingAddress, setEditingAddress] = useState(null)
    const [addressForm, setAddressForm] = useState({
        street: "",
        city: "",
        state: "",
        zipCode: "",
        isDefault: false
    })
    
    // Orders State
    const [orders, setOrders] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [showOrderModal, setShowOrderModal] = useState(false)
    
    // Profile State with default values
    const [userProfile, setUserProfile] = useState({
        _id: "",
        name: "",
        email: "",
        phone: "",
        wishlist: [],
        createdAt: ""
    })
    
    const [tempProfile, setTempProfile] = useState({
        name: "",
        phone: ""
    })

    // Get status badge color and icon
    const getStatusBadge = (status, isCancelled) => {
        if (isCancelled) {
            return { color: 'bg-red-100 text-red-800', icon: '❌', text: 'Cancelled' };
        }
        switch(status) {
            case 'Delivered':
                return { color: 'bg-green-100 text-green-800', icon: '✅', text: 'Delivered' };
            case 'Shipped':
                return { color: 'bg-blue-100 text-blue-800', icon: '🚚', text: 'Shipped' };
            case 'Processing':
                return { color: 'bg-yellow-100 text-yellow-800', icon: '⏳', text: 'Processing' };
            default:
                return { color: 'bg-gray-100 text-gray-800', icon: '📦', text: status || 'Placed' };
        }
    };
    
    useEffect(() => {
        fetchUserProfile()
        fetchAddresses()
        fetchOrders()
        fetchWishlist()
    }, [])
    
    const fetchUserProfile = async () => {
        setIsLoading(true)
        setError(null)
        
        try {
            const response = await API.get('/user/profile')
            setUserProfile(response.data)
            setTempProfile({
                name: response.data.name || "",
                phone: response.data.phone || ""
            })
        } catch (err) {
            if (err.response?.status === 401) {
                navigate('/')
            } else {
                setError(err.response?.data?.message || "Failed to fetch profile")
            }
        } finally {
            setIsLoading(false)
        }
    }
    
    // Fetch wishlist with product details
    const fetchWishlist = async () => {
        try {
            const response = await API.get('/user/wishlist')
            if (response.data && response.data.wishlist) {
                setUserProfile(prev => ({ ...prev, wishlist: response.data.wishlist }))
            }
        } catch (err) {
            console.error("Failed to fetch wishlist:", err)
        }
    }
    
    // Fetch all orders for the user
    const fetchOrders = async () => {
        try {
            const response = await API.get('/orders/myorders')
            if (Array.isArray(response.data)) {
                setOrders(response.data)
            } else if (response.data && Array.isArray(response.data.orders)) {
                setOrders(response.data.orders)
            } else {
                setOrders([])
            }
        } catch (err) {
            console.error("Failed to fetch orders:", err)
            setOrders([])
        }
    }
    
    // Remove from wishlist
    const removeFromWishlist = async (productId) => {
        try {
            const response = await API.post('/user/wishlist', { productId })
            if (response.data.success) {
                fetchWishlist()
            }
        } catch (err) {
            console.error("Failed to remove from wishlist:", err)
        }
    }
    
    // Fetch single order details
    const fetchOrderDetails = async (orderId) => {
        setIsLoading(true)
        try {
            const response = await API.get(`/orders/${orderId}`)
            setSelectedOrder(response.data)
            setShowOrderModal(true)
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch order details")
        } finally {
            setIsLoading(false)
        }
    }
    
    // Get status badge color
    const getStatusColor = (status) => {
        switch(status) {
            case 'Delivered': return 'bg-green-100 text-green-800'
            case 'Processing': return 'bg-yellow-100 text-yellow-800'
            case 'Shipped': return 'bg-blue-100 text-blue-800'
            case 'Cancelled': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }
    
    // Get payment status color
    const getPaymentStatusColor = (isPaid) => {
        return isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }
    
    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return "N/A"
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }
    
    // Address functions
    const fetchAddresses = async () => {
        try {
            const response = await API.get('/user/address')
            if (Array.isArray(response.data)) {
                setAddresses(response.data)
            } else if (response.data && Array.isArray(response.data.addresses)) {
                setAddresses(response.data.addresses)
            } else {
                setAddresses([])
            }
        } catch (err) {
            console.error("Failed to fetch addresses:", err)
            setAddresses([])
        }
    }
    
    const handleAddAddress = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await API.post('/user/address', addressForm)
            if (Array.isArray(response.data)) {
                setAddresses(response.data)
            } else if (response.data && Array.isArray(response.data.addresses)) {
                setAddresses(response.data.addresses)
            } else {
                setAddresses([])
            }
            setShowAddressForm(false)
            setAddressForm({
                street: "",
                city: "",
                state: "",
                zipCode: "",
                isDefault: false
            })
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add address")
        } finally {
            setIsLoading(false)
        }
    }
    
    const handleUpdateAddress = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await API.put(`/user/address/${editingAddress._id}`, addressForm)
            if (Array.isArray(response.data)) {
                setAddresses(response.data)
            } else if (response.data && Array.isArray(response.data.addresses)) {
                setAddresses(response.data.addresses)
            } else {
                setAddresses([])
            }
            setShowAddressForm(false)
            setEditingAddress(null)
            setAddressForm({
                street: "",
                city: "",
                state: "",
                zipCode: "",
                isDefault: false
            })
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update address")
        } finally {
            setIsLoading(false)
        }
    }
    
    const handleDeleteAddress = async (addressId) => {
        if (!window.confirm("Are you sure you want to delete this address?")) return
        
        setIsLoading(true)
        try {
            const response = await API.delete(`/user/address/${addressId}`)
            if (Array.isArray(response.data)) {
                setAddresses(response.data)
            } else if (response.data && Array.isArray(response.data.addresses)) {
                setAddresses(response.data.addresses)
            } else {
                setAddresses([])
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete address")
        } finally {
            setIsLoading(false)
        }
    }
    
    const handleSetDefault = async (addressId) => {
        setIsLoading(true)
        try {
            const addressToUpdate = addresses.find(addr => addr._id === addressId)
            const response = await API.put(`/user/address/${addressId}`, {
                street: addressToUpdate.street,
                city: addressToUpdate.city,
                state: addressToUpdate.state,
                zipCode: addressToUpdate.zipCode,
                isDefault: true
            })
            if (Array.isArray(response.data)) {
                setAddresses(response.data)
            } else if (response.data && Array.isArray(response.data.addresses)) {
                setAddresses(response.data.addresses)
            } else {
                setAddresses([])
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to set default address")
        } finally {
            setIsLoading(false)
        }
    }
    
    const editAddress = (address) => {
        setEditingAddress(address)
        setAddressForm({
            street: address.street,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            isDefault: address.isDefault || false
        })
        setShowAddressForm(true)
    }
    
    const handleEditSave = async () => {
        if (isEditing) {
            setIsLoading(true)
            try {
                const response = await API.put('/user/profile', {
                    name: tempProfile.name,
                    phone: tempProfile.phone
                })
                setUserProfile(prev => ({ ...prev, name: response.data.name, phone: response.data.phone }))
                alert("Profile updated successfully!")
            } catch (err) {
                setError(err.response?.data?.message || "Failed to update profile")
            } finally {
                setIsLoading(false)
            }
        }
        setIsEditing(!isEditing);
    }
    
    const handleCancel = () => {
        setTempProfile({
            name: userProfile.name || "",
            phone: userProfile.phone || ""
        });
        setIsEditing(false);
    }
    
    const updateProfileField = (field, value) => {
        setTempProfile(prev => ({ ...prev, [field]: value }))
    }
    
    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/')
    }
    
    const handleNavClick = (id) => {
        setShow(id);
        setActiveTab(id);
        if (id === 2) {
            fetchOrders()
        }
        if (id === 3) {
            fetchWishlist()
        }
        if (id === 4) {
            fetchAddresses()
        }
    }
    
    if (isLoading && !userProfile.name) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-gray-600">Loading profile...</p>
                </div>
            </div>
        )
    }
    
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow">
                    <div className="text-red-600 text-5xl mb-3">!</div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Error</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button 
                        onClick={() => {
                            setError(null)
                            fetchUserProfile()
                            fetchAddresses()
                            fetchOrders()
                        }}
                        className="px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }
    
    return (
        <div className='bg-gray-50 min-h-screen'>
            <div className='py-8 px-4 max-w-7xl mx-auto'>
                <h1 className='text-3xl font-bold text-gray-900 mb-8'>
                    My Account
                </h1>
    
                <div className='flex flex-col lg:flex-row gap-8'>
                    {/* Sidebar */}
                    <div className='lg:w-1/4'>
                        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
                            <div className='flex flex-col items-center text-center pb-6 border-b border-gray-200 mb-6'>
                                <div className='w-24 h-24 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center mb-4'>
                                    <CgProfile className="text-white text-5xl" />
                                </div>
                                <h2 className='text-xl font-bold text-gray-900 mb-1'>{userProfile.name || ''}</h2>
                                <p className='text-gray-500 text-sm'>{userProfile.email || ''}</p>
                                <p className='text-gray-400 text-xs mt-2'>Member since {formatDate(userProfile.createdAt)}</p>
                            </div>
    
                            <nav className='space-y-1'>
                                {[
                                    { id: 1, icon: <CgProfile />, label: "Profile Info" },
                                    { id: 2, icon: <SiShopify />, label: "My Orders" },
                                    { id: 3, icon: <FaHeart />, label: "Wishlist" },
                                    { id: 4, icon: <FaHome />, label: "Address" },
                                    { id: 5, icon: <FaCcAmazonPay />, label: "Payment" },
                                    { id: 6, icon: <AiFillSecurityScan />, label: "Security" },
                                    { id: 7, icon: <IoSettings />, label: "Settings" }
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleNavClick(item.id)}
                                        className={`flex items-center w-full p-3 rounded-lg transition-all text-left ${
                                            activeTab === item.id 
                                            ? 'bg-gray-100 text-gray-900 font-medium' 
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                    >
                                        <span className='mr-3 text-lg'>{item.icon}</span>
                                        <span>{item.label}</span>
                                    </button>
                                ))}
                                
                                <button 
                                    onClick={handleLogout}
                                    className='flex items-center w-full p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all mt-4'
                                >
                                    <span className='mr-3 text-lg'><IoLogOutSharp /></span>
                                    <span>Logout</span>
                                </button>
                            </nav>
                        </div>
                    </div>
    
                    {/* Main Content */}
                    <div className='lg:w-3/4'>
                        {/* Profile Info */}
                        {show === 1 && (
                            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
                                <div className='flex justify-between items-center mb-6 pb-4 border-b border-gray-200'>
                                    <h2 className='text-2xl font-bold text-gray-900'>Profile Information</h2>
                                    <div className='flex gap-3'>
                                        {isEditing ? (
                                            <>
                                                <button
                                                    onClick={handleEditSave}
                                                    className='flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all text-sm'
                                                    disabled={isLoading}
                                                >
                                                    <FaSave /> {isLoading ? 'Saving...' : 'Save'}
                                                </button>
                                                <button
                                                    onClick={handleCancel}
                                                    className='flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm'
                                                >
                                                    <MdCancel /> Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => setIsEditing(true)}
                                                className='flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all text-sm'
                                            >
                                                <FaEdit /> Edit Profile
                                            </button>
                                        )}
                                    </div>
                                </div>
    
                                <div className='space-y-5'>
                                    <div>
                                        <label className='block text-gray-700 text-sm font-medium mb-2'>Full Name</label>
                                        <input
                                            type='text'
                                            value={isEditing ? (tempProfile.name || '') : (userProfile.name || '')}
                                            onChange={(e) => updateProfileField('name', e.target.value)}
                                            disabled={!isEditing}
                                            className='w-full p-3 border border-gray-300 rounded-lg bg-gray-50 disabled:bg-gray-100 focus:ring-2 focus:ring-gray-900 outline-none'
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className='block text-gray-700 text-sm font-medium mb-2'>Phone Number</label>
                                        <input
                                            type='text'
                                            value={isEditing ? (tempProfile.phone || '') : (userProfile.phone || '')}
                                            onChange={(e) => updateProfileField('phone', e.target.value)}
                                            disabled={!isEditing}
                                            className='w-full p-3 border border-gray-300 rounded-lg bg-gray-50 disabled:bg-gray-100 focus:ring-2 focus:ring-gray-900 outline-none'
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className='block text-gray-700 text-sm font-medium mb-2'>Email Address</label>
                                        <input
                                            type='email'
                                            value={userProfile.email || ''}
                                            disabled
                                            className='w-full p-3 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed'
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
    
                        {/* My Orders */}
                        {show === 2 && (
                            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
                                <div className='flex justify-between items-center mb-6'>
                                    <h2 className='text-2xl font-bold text-gray-900'>My Orders</h2>
                                    <div className='px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm'>
                                        Total Orders: {orders.length}
                                    </div>
                                </div>
    
                                {orders.length === 0 ? (
                                    <div className="text-center py-12">
                                        <FaBox className="text-5xl text-gray-300 mx-auto mb-3" />
                                        <p className="text-gray-500">No orders found</p>
                                        <button 
                                            onClick={() => navigate('/products')}
                                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                        >
                                            Start Shopping
                                        </button>
                                    </div>
                                ) : (
                                    <div className='space-y-4'>
                                        {orders.map((order) => {
                                            const statusInfo = getStatusBadge(order.status, order.isCancelled);
                                            return (
                                                <div 
                                                    key={order._id} 
                                                    className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer'
                                                    onClick={() => fetchOrderDetails(order._id)}
                                                >
                                                    <div className='flex flex-wrap justify-between items-start mb-3 pb-3 border-b border-gray-100'>
                                                        <div>
                                                            <p className='text-sm text-gray-500'>Order #{order._id?.slice(-8)}</p>
                                                            <p className='text-xs text-gray-400'>
                                                                {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                                                    day: 'numeric',
                                                                    month: 'short',
                                                                    year: 'numeric'
                                                                })}
                                                            </p>
                                                        </div>
                                                        <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusInfo.color}`}>
                                                            <span>{statusInfo.icon}</span>
                                                            <span>{statusInfo.text}</span>
                                                        </div>
                                                    </div>
    
                                                    <div className='mb-3'>
                                                        <div className='flex flex-wrap gap-2'>
                                                            {order.orderItems?.slice(0, 2).map((item, idx) => (
                                                                <div key={idx} className='flex items-center gap-2 text-sm'>
                                                                    <span>{item.name}</span>
                                                                    <span className='text-gray-400'>x{item.qty}</span>
                                                                </div>
                                                            ))}
                                                            {order.orderItems?.length > 2 && (
                                                                <span className='text-xs text-gray-400'>+{order.orderItems.length - 2} more</span>
                                                            )}
                                                        </div>
                                                    </div>
    
                                                    <div className='flex flex-wrap justify-between items-center pt-3 border-t border-gray-100'>
                                                        <div className='flex items-center gap-1'>
                                                            <FaRupeeSign className="text-gray-600 text-sm" />
                                                            <span className='font-bold text-gray-900'>{order.totalPrice?.toLocaleString()}</span>
                                                        </div>
                                                        <button className='text-sm text-red-600 hover:text-red-700'>
                                                            View Details
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
    
                        {/* Order Details Modal */}
                        {showOrderModal && selectedOrder && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowOrderModal(false)}>
                                <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
                                    <div className='flex justify-between items-center mb-4 pb-3 border-b'>
                                        <h3 className='text-xl font-bold text-gray-900'>Order Details</h3>
                                        <button onClick={() => setShowOrderModal(false)} className='text-gray-400 hover:text-gray-600'>
                                            <MdCancel size={24} />
                                        </button>
                                    </div>
    
                                    <div className='space-y-4'>
                                        <div className='grid grid-cols-2 gap-4 text-sm'>
                                            <div>
                                                <p className='text-gray-500'>Order ID</p>
                                                <p className='font-medium'>{selectedOrder._id}</p>
                                            </div>
                                            <div>
                                                <p className='text-gray-500'>Order Date</p>
                                                <p className='font-medium'>{formatDate(selectedOrder.createdAt)}</p>
                                            </div>
                                            <div>
                                                <p className='text-gray-500'>Status</p>
                                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                                                    {selectedOrder.status}
                                                </span>
                                            </div>
                                            <div>
                                                <p className='text-gray-500'>Payment</p>
                                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(selectedOrder.isPaid)}`}>
                                                    {selectedOrder.isPaid ? 'Paid' : 'Pending'}
                                                </span>
                                            </div>
                                        </div>
    
                                        {selectedOrder.shippingAddress && (
                                            <div className='border-t pt-3'>
                                                <h4 className='font-semibold mb-2'>Shipping Address</h4>
                                                <p className='text-sm text-gray-600'>
                                                    {selectedOrder.shippingAddress.street}<br />
                                                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}<br />
                                                    PIN: {selectedOrder.shippingAddress.zipCode}
                                                </p>
                                            </div>
                                        )}
    
                                        <div className='border-t pt-3'>
                                            <h4 className='font-semibold mb-3'>Order Items</h4>
                                            <div className='space-y-2'>
                                                {selectedOrder.orderItems?.map((item, idx) => (
                                                    <div key={idx} className='flex justify-between items-center py-2 border-b border-gray-100'>
                                                        <div className='flex items-center gap-3'>
                                                            {item.image && (
                                                                <img src={item.image} alt={item.name} className='w-12 h-12 object-cover rounded' />
                                                            )}
                                                            <div>
                                                                <p className='font-medium'>{item.name}</p>
                                                                <p className='text-xs text-gray-500'>Qty: {item.qty}</p>
                                                            </div>
                                                        </div>
                                                        <p className='font-medium'>₹{item.price * item.qty}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
    
                                        <div className='border-t pt-3'>
                                            <div className='flex justify-between items-center'>
                                                <span className='font-bold'>Total Amount</span>
                                                <span className='text-xl font-bold text-gray-900'>₹{selectedOrder.totalPrice?.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
    
                        {/* Wishlist */}
                        {show === 3 && (
                            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
                                <div className='flex justify-between items-center mb-4'>
                                    <h2 className='text-2xl font-bold text-gray-900'>My Wishlist</h2>
                                    <span className='px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm'>
                                        {userProfile.wishlist?.length || 0} items
                                    </span>
                                </div>
                                {!userProfile.wishlist || userProfile.wishlist.length === 0 ? (
                                    <div className="text-center py-12">
                                        <FaHeart className="text-5xl text-gray-300 mx-auto mb-3" />
                                        <p className="text-gray-500">Your wishlist is empty</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {userProfile.wishlist.map((item, index) => (
                                            <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all">
                                                <div className="flex items-center gap-3">
                                                    {item.image && (
                                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                                                    )}
                                                    <div>
                                                        <p className="font-medium text-gray-900">{item.name}</p>
                                                        <p className="text-red-600 font-bold">₹{item.price}</p>
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={() => removeFromWishlist(item._id)}
                                                    className="text-red-500 hover:text-red-700 p-2"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
    
                        {/* Address Section */}
                        {show === 4 && (
                            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
                                <div className='flex justify-between items-center mb-6'>
                                    <h2 className='text-2xl font-bold text-gray-900'>Saved Addresses</h2>
                                    <button
                                        onClick={() => {
                                            setEditingAddress(null)
                                            setAddressForm({
                                                street: "",
                                                city: "",
                                                state: "",
                                                zipCode: "",
                                                isDefault: false
                                            })
                                            setShowAddressForm(true)
                                        }}
                                        className='flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm'
                                    >
                                        <FaPlus /> Add Address
                                    </button>
                                </div>
    
                                {/* Address Form Modal */}
                                {showAddressForm && (
                                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddressForm(false)}>
                                        <div className="bg-white rounded-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
                                            <h3 className="text-xl font-bold mb-4">
                                                {editingAddress ? 'Edit Address' : 'Add New Address'}
                                            </h3>
                                            <form onSubmit={editingAddress ? handleUpdateAddress : handleAddAddress} className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium mb-1">Street Address</label>
                                                    <input
                                                        type="text"
                                                        value={addressForm.street}
                                                        onChange={(e) => setAddressForm({...addressForm, street: e.target.value})}
                                                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-900 outline-none"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-1">City</label>
                                                    <input
                                                        type="text"
                                                        value={addressForm.city}
                                                        onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
                                                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-900 outline-none"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-1">State</label>
                                                    <input
                                                        type="text"
                                                        value={addressForm.state}
                                                        onChange={(e) => setAddressForm({...addressForm, state: e.target.value})}
                                                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-900 outline-none"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-1">Zip Code</label>
                                                    <input
                                                        type="text"
                                                        value={addressForm.zipCode}
                                                        onChange={(e) => setAddressForm({...addressForm, zipCode: e.target.value})}
                                                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-900 outline-none"
                                                        required
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={addressForm.isDefault}
                                                        onChange={(e) => setAddressForm({...addressForm, isDefault: e.target.checked})}
                                                        className="w-4 h-4"
                                                    />
                                                    <label className="text-sm">Set as default address</label>
                                                </div>
                                                <div className="flex gap-3 pt-2">
                                                    <button type="submit" className="flex-1 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800">
                                                        {editingAddress ? 'Update' : 'Save'} Address
                                                    </button>
                                                    <button type="button" onClick={() => setShowAddressForm(false)} className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200">
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
    
                                {/* Addresses List */}
                                {!addresses || addresses.length === 0 ? (
                                    <div className="text-center py-12">
                                        <FaHome className="text-5xl text-gray-300 mx-auto mb-3" />
                                        <p className="text-gray-500">No addresses saved</p>
                                        <p className="text-gray-400 text-sm mt-1">Click "Add Address" to add your first address</p>
                                    </div>
                                ) : (
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        {addresses.map((addr) => (
                                            <div 
                                                key={addr._id} 
                                                className={`border rounded-lg p-4 transition-all ${
                                                    addr.isDefault ? 'border-gray-900 bg-gray-50' : 'border-gray-200'
                                                }`}
                                            >
                                                <div className='flex justify-between items-start mb-3'>
                                                    <div className='flex items-center gap-2'>
                                                        <FaHome className="text-gray-600" />
                                                        {addr.isDefault && (
                                                            <span className='px-2 py-0.5 bg-gray-900 text-white text-xs rounded-full'>Default</span>
                                                        )}
                                                    </div>
                                                    <div className='flex gap-2'>
                                                        <button 
                                                            onClick={() => editAddress(addr)}
                                                            className='p-1 text-gray-500 hover:text-gray-900 transition-colors'
                                                            title='Edit'
                                                        >
                                                            <FaEdit size={14} />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDeleteAddress(addr._id)}
                                                            className='p-1 text-gray-500 hover:text-red-600 transition-colors'
                                                            title='Delete'
                                                        >
                                                            <FaTrash size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className='space-y-1 text-sm'>
                                                    <p className='text-gray-800'>{addr.street}</p>
                                                    <p className='text-gray-600'>{addr.city}, {addr.state}</p>
                                                    <p className='text-gray-600'>PIN: {addr.zipCode}</p>
                                                </div>
                                                {!addr.isDefault && (
                                                    <button 
                                                        onClick={() => handleSetDefault(addr._id)}
                                                        className='mt-3 text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors'
                                                    >
                                                        <FaCheck size={10} /> Set as default
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
    
                        {/* Coming Soon Sections */}
                        {show === 5 && (
                            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center'>
                                <div className="py-12">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FaCcAmazonPay className="text-2xl text-gray-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Methods</h3>
                                    <p className="text-gray-500">This feature will be available soon</p>
                                </div>
                            </div>
                        )}
    
                        {show === 6 && (
                            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center'>
                                <div className="py-12">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <AiFillSecurityScan className="text-2xl text-gray-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Security Settings</h3>
                                    <p className="text-gray-500">This feature will be available soon</p>
                                </div>
                            </div>
                        )}
    
                        {show === 7 && (
                            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center'>
                                <div className="py-12">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <IoSettings className="text-2xl text-gray-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">App Settings</h3>
                                    <p className="text-gray-500">This feature will be available soon</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
    
export default Profile