// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import API from "../utils/api";
// // import { toast } from "react-toastify";
// // import { FaEdit, FaTrash, FaPlus, FaEye, FaUsers, FaBox, FaTag, FaUpload, FaTimes, FaImage, FaSyncAlt, FaCheckCircle, FaTruck, FaSpinner, FaHourglassHalf, FaTimesCircle } from "react-icons/fa";
// // import axios from "axios";

// // const AdminDashboard = () => {
// //   const navigate = useNavigate();
// //   const [activeTab, setActiveTab] = useState("products");
// //   const [loading, setLoading] = useState(true);
// //   const [products, setProducts] = useState([]);
// //   const [users, setUsers] = useState([]);
// //   const [orders, setOrders] = useState([]);
// //   const [showAddModal, setShowAddModal] = useState(false);
// //   const [editingProduct, setEditingProduct] = useState(null);
// //   const [selectedImage, setSelectedImage] = useState(null);
// //   const [imagePreview, setImagePreview] = useState("");
// //   const [uploading, setUploading] = useState(false);
// //   const [updatingStatus, setUpdatingStatus] = useState(false);
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     category: "",
// //     price: "",
// //     description: "",
// //     stock: "",
// //     image: ""
// //   });

// //   const categoriesList = [
// //     "Copper Utensils",
// //     "Steel Bottles",
// //     "Thermoware & Lunchboxes",
// //     "Cookware Sets",
// //     "Home Appliances",
// //     "Cookers (Aluminum, Steel, Triply)"
// //   ];

// //   useEffect(() => {
// //     const user = JSON.parse(localStorage.getItem('user') || '{}');
// //     if (user.role !== "admin") {
// //       toast.error("Admin access required!");
// //       navigate('/');
// //       return;
// //     }
// //     fetchProducts();
// //     fetchUsers();
// //     fetchOrders();
// //   }, []);

// //   const fetchProducts = async () => {
// //     try {
// //       const response = await API.get('/products/all');
// //       if (Array.isArray(response.data)) {
// //         setProducts(response.data);
// //       } else if (response.data?.products) {
// //         setProducts(response.data.products);
// //       } else {
// //         setProducts([]);
// //       }
// //     } catch (err) {
// //       toast.error("Failed to fetch products");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchUsers = async () => {
// //     try {
// //       const response = await API.get('/admin/users');
// //       if (Array.isArray(response.data)) {
// //         setUsers(response.data);
// //       }
// //     } catch (err) {
// //       console.error("Failed to fetch users");
// //     }
// //   };

// //   const fetchOrders = async () => {
// //     try {
// //       const response = await API.get('/orders/admin/all');
// //       if (Array.isArray(response.data)) {
// //         setOrders(response.data);
// //       } else if (response.data?.orders) {
// //         setOrders(response.data.orders);
// //       }
// //     } catch (err) {
// //       console.error("Failed to fetch orders");
// //     }
// //   };

// //   // ✅ Update Order Status
// //   const handleUpdateOrderStatus = async (orderId, currentStatus) => {
// //     // Determine next status
// //     let newStatus = "";
// //     switch(currentStatus) {
// //       case "Processing":
// //         newStatus = "Shipped";
// //         break;
// //       case "Shipped":
// //         newStatus = "Delivered";
// //         break;
// //       case "Delivered":
// //         toast.info("Order already delivered");
// //         return;
// //       case "Cancelled":
// //         toast.info("Order is cancelled");
// //         return;
// //       default:
// //         newStatus = "Processing";
// //     }

// //     if (!window.confirm(`Change order status from ${currentStatus} to ${newStatus}?`)) {
// //       return;
// //     }

// //     setUpdatingStatus(true);
// //     try {
// //       const response = await API.put(`/orders/admin/${orderId}/status`, { status: newStatus });
// //       if (response.data.success || response.data.updatedOrder) {
// //         toast.success(`Order status updated to ${newStatus}!`);
// //         fetchOrders(); // Refresh orders list
// //       }
// //     } catch (err) {
// //       toast.error(err.response?.data?.message || "Failed to update status");
// //     } finally {
// //       setUpdatingStatus(false);
// //     }
// //   };

// //   // Get status badge for order
// //   const getStatusBadge = (status, isCancelled) => {
// //     if (isCancelled) {
// //       return { color: 'bg-red-100 text-red-800', icon: FaTimesCircle, text: 'Cancelled' };
// //     }
// //     switch(status) {
// //       case 'Delivered':
// //         return { color: 'bg-green-100 text-green-800', icon: FaCheckCircle, text: 'Delivered' };
// //       case 'Shipped':
// //         return { color: 'bg-blue-100 text-blue-800', icon: FaTruck, text: 'Shipped' };
// //       case 'Processing':
// //         return { color: 'bg-yellow-100 text-yellow-800', icon: FaSpinner, text: 'Processing' };
// //       default:
// //         return { color: 'bg-gray-100 text-gray-800', icon: FaBox, text: status || 'Placed' };
// //     }
// //   };

// //   // ✅ Image Upload Handler
// //   const handleImageUpload = async (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     if (!file.type.includes('image')) {
// //       toast.error("Please select an image file");
// //       return;
// //     }

// //     if (file.size > 2 * 1024 * 1024) {
// //       toast.error("Image size should be less than 2MB");
// //       return;
// //     }

// //     setUploading(true);
// //     const uploadFormData = new FormData();
// //     uploadFormData.append('image', file);

// //     try {
// //       const response = await axios.post('http://localhost:5000/api/upload', uploadFormData, {
// //         headers: {
// //           'Content-Type': 'multipart/form-data',
// //           'Authorization': `Bearer ${localStorage.getItem('token')}`
// //         }
// //       });

// //       if (response.data.url) {
// //         setImagePreview(response.data.url);
// //         setFormData({ ...formData, image: response.data.url });
// //         toast.success("Image uploaded successfully!");
// //       }
// //     } catch (err) {
// //       console.error("Upload failed:", err);
// //       toast.error("Failed to upload image");
// //     } finally {
// //       setUploading(false);
// //     }
// //   };

// //   // ✅ Local image preview
// //   const handleLocalImageSelect = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       setSelectedImage(file);
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setImagePreview(reader.result);
// //         setFormData({ ...formData, image: reader.result });
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleSubmitProduct = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     try {
// //       const formDataToSend = new FormData();
// //       formDataToSend.append('name', formData.name);
// //       formDataToSend.append('category', formData.category);
// //       formDataToSend.append('price', formData.price);
// //       formDataToSend.append('description', formData.description);
// //       formDataToSend.append('stock', formData.stock);
      
// //       if (selectedImage) {
// //         formDataToSend.append('image', selectedImage);
// //       } else if (formData.image && formData.image.startsWith('http')) {
// //         formDataToSend.append('imageUrl', formData.image);
// //       }
      
// //       if (editingProduct) {
// //         await API.put(`/products/${editingProduct._id}`, formDataToSend, {
// //           headers: { 'Content-Type': 'multipart/form-data' }
// //         });
// //         toast.success("Product updated successfully!");
// //       } else {
// //         await API.post('/products/add', formDataToSend, {
// //           headers: { 'Content-Type': 'multipart/form-data' }
// //         });
// //         toast.success("Product added successfully!");
// //       }
      
// //       setShowAddModal(false);
// //       setEditingProduct(null);
// //       setFormData({ name: "", category: "", price: "", description: "", stock: "", image: "" });
// //       setImagePreview("");
// //       setSelectedImage(null);
// //       fetchProducts();
// //     } catch (err) {
// //       console.error("Error:", err.response?.data);
// //       toast.error(err.response?.data?.message || "Failed to save product");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleEditProduct = (product) => {
// //     setEditingProduct(product);
// //     setFormData({
// //       name: product.name,
// //       category: product.category,
// //       price: product.price,
// //       description: product.description,
// //       stock: product.stock,
// //       image: product.image
// //     });
// //     setImagePreview(product.image);
// //     setShowAddModal(true);
// //   };

// //   const handleDeleteProduct = async (id) => {
// //     if (window.confirm("Delete this product?")) {
// //       try {
// //         await API.delete(`/products/${id}`);
// //         toast.success("Deleted!");
// //         fetchProducts();
// //       } catch (err) {
// //         toast.error("Failed to delete");
// //       }
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gray-100">
// //         <div className="text-center">
// //           <div className="w-12 h-12 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
// //           <p className="text-gray-600">Loading Admin Dashboard...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const totalProducts = products.length;
// //   const totalUsers = users.length;
// //   const totalOrders = orders.length;
// //   const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);

// //   return (
// //     <div className="min-h-screen bg-gray-100">
// //       <div className="container mx-auto px-4 py-8">
// //         <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

// //         {/* Stats Cards */}
// //         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
// //           <div className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition" onClick={() => setActiveTab("products")}>
// //             <h3 className="text-gray-500 text-sm">Total Products</h3>
// //             <p className="text-3xl font-bold">{totalProducts}</p>
// //           </div>
// //           <div className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition" onClick={() => setActiveTab("users")}>
// //             <h3 className="text-gray-500 text-sm">Total Users</h3>
// //             <p className="text-3xl font-bold">{totalUsers}</p>
// //           </div>
// //           <div className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition" onClick={() => setActiveTab("orders")}>
// //             <h3 className="text-gray-500 text-sm">Total Orders</h3>
// //             <p className="text-3xl font-bold">{totalOrders}</p>
// //           </div>
// //           <div className="bg-white rounded-lg shadow p-6">
// //             <h3 className="text-gray-500 text-sm">Total Revenue</h3>
// //             <p className="text-3xl font-bold">₹{totalRevenue.toLocaleString()}</p>
// //           </div>
// //         </div>

// //         {/* Tab Buttons */}
// //         <div className="flex gap-2 mb-6 border-b flex-wrap">
// //           <button onClick={() => setActiveTab("products")} className={`px-6 py-3 font-medium transition ${activeTab === "products" ? "border-b-2 border-red-600 text-red-600" : "text-gray-500"}`}>
// //             Products ({totalProducts})
// //           </button>
// //           <button onClick={() => setActiveTab("users")} className={`px-6 py-3 font-medium transition ${activeTab === "users" ? "border-b-2 border-red-600 text-red-600" : "text-gray-500"}`}>
// //             Users ({totalUsers})
// //           </button>
// //           <button onClick={() => setActiveTab("orders")} className={`px-6 py-3 font-medium transition ${activeTab === "orders" ? "border-b-2 border-red-600 text-red-600" : "text-gray-500"}`}>
// //             Orders ({totalOrders})
// //           </button>


// //           <div className="flex justify-between items-center mb-8">
// //   <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
  
// //   {/* ✅ YAHAN LAGAO - Header ke right side */}
// //   <button
// //     onClick={() => navigate('/admin/content')}
// //     className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
// //   >
// //     <FaEdit /> Manage Content
// //   </button>
// // </div>
// //           {activeTab === "products" && (
// //             <button onClick={() => { setEditingProduct(null); setFormData({ name: "", category: "", price: "", description: "", stock: "", image: "" }); setImagePreview(""); setShowAddModal(true); }} className="ml-auto bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2">
// //               <FaPlus /> Add Product
// //             </button>
// //           )}
// //         </div>

// //         {/* Products Table */}
// //         {activeTab === "products" && (
// //           <div className="bg-white rounded-lg shadow overflow-hidden">
// //             <div className="overflow-x-auto">
// //               <table className="w-full">
// //                 <thead className="bg-gray-50">
// //                   <tr>
// //                     <th className="px-6 py-3 text-left">Image</th>
// //                     <th className="px-6 py-3 text-left">Name</th>
// //                     <th className="px-6 py-3 text-left">Category</th>
// //                     <th className="px-6 py-3 text-left">Price</th>
// //                     <th className="px-6 py-3 text-left">Stock</th>
// //                     <th className="px-6 py-3 text-left">Actions</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="divide-y divide-gray-200">
// //                   {products.map((product) => (
// //                     <tr key={product._id} className="hover:bg-gray-50">
// //                       <td className="px-6 py-4">
// //                         <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
// //                       </td>
// //                       <td className="px-6 py-4 font-medium">{product.name}</td>
// //                       <td className="px-6 py-4">{product.category}</td>
// //                       <td className="px-6 py-4">₹{product.price}</td>
// //                       <td className="px-6 py-4">{product.stock || 15}</td>
// //                       <td className="px-6 py-4">
// //                         <div className="flex gap-3">
// //                           <button onClick={() => handleEditProduct(product)} className="text-green-600 hover:text-green-800">
// //                             <FaEdit />
// //                           </button>
// //                           <button onClick={() => handleDeleteProduct(product._id)} className="text-red-600 hover:text-red-800">
// //                             <FaTrash />
// //                           </button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         )}

// //         {/* Users Table */}
// //         {activeTab === "users" && (
// //           <div className="bg-white rounded-lg shadow overflow-hidden">
// //             <div className="overflow-x-auto">
// //               <table className="w-full">
// //                 <thead className="bg-gray-50">
// //                   <tr>
// //                     <th className="px-6 py-3 text-left">Name</th>
// //                     <th className="px-6 py-3 text-left">Email</th>
// //                     <th className="px-6 py-3 text-left">Role</th>
// //                     <th className="px-6 py-3 text-left">Joined</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {users.map((user) => (
// //                     <tr key={user._id} className="border-t">
// //                       <td className="px-6 py-4">{user.name}</td>
// //                       <td className="px-6 py-4">{user.email}</td>
// //                       <td className="px-6 py-4">
// //                         <span className={`px-2 py-1 rounded text-xs ${user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
// //                           {user.role || 'user'}
// //                         </span>
// //                       </td>
// //                       <td className="px-6 py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         )}

// //         {/* ✅ Orders Table with Status Update */}
// //         {activeTab === "orders" && (
// //           <div className="bg-white rounded-lg shadow overflow-hidden">
// //             <div className="overflow-x-auto">
// //               <table className="w-full">
// //                 <thead className="bg-gray-50">
// //                   <tr>
// //                     <th className="px-6 py-3 text-left">Order ID</th>
// //                     <th className="px-6 py-3 text-left">Customer</th>
// //                     <th className="px-6 py-3 text-left">Items</th>
// //                     <th className="px-6 py-3 text-left">Total</th>
// //                     <th className="px-6 py-3 text-left">Status</th>
// //                     <th className="px-6 py-3 text-left">Payment</th>
// //                     <th className="px-6 py-3 text-left">Date</th>
// //                     <th className="px-6 py-3 text-left">Actions</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {orders.map((order) => {
// //                     const statusInfo = getStatusBadge(order.status, order.isCancelled);
// //                     const StatusIcon = statusInfo.icon;
                    
// //                     return (
// //                       <tr key={order._id} className="border-t hover:bg-gray-50">
// //                         <td className="px-6 py-4 font-mono text-sm">{order._id?.slice(-8)}</td>
// //                         <td className="px-6 py-4">
// //                           <div>
// //                             <p className="font-medium">{order.user?.name || 'N/A'}</p>
// //                             <p className="text-xs text-gray-500">{order.user?.email}</p>
// //                           </div>
// //                         </td>
// //                         <td className="px-6 py-4">
// //                           <div className="space-y-1">
// //                             {order.orderItems?.slice(0, 2).map((item, idx) => (
// //                               <p key={idx} className="text-sm">
// //                                 {item.name} x{item.qty || item.quantity}
// //                               </p>
// //                             ))}
// //                             {order.orderItems?.length > 2 && (
// //                               <p className="text-xs text-gray-500">+{order.orderItems.length - 2} more</p>
// //                             )}
// //                           </div>
// //                         </td>
// //                         <td className="px-6 py-4 font-bold">₹{order.totalPrice}</td>
// //                         <td className="px-6 py-4">
// //                           <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusInfo.color}`}>
// //                             <StatusIcon size={12} />
// //                             {statusInfo.text}
// //                           </span>
// //                         </td>
// //                         <td className="px-6 py-4">
// //                           <span className={`px-2 py-1 rounded text-xs ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
// //                             {order.isPaid ? 'Paid' : 'Pending'}
// //                           </span>
// //                         </td>
// //                         <td className="px-6 py-4 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
// //                         <td className="px-6 py-4">
// //                           <div className="flex gap-2">
// //                             {!order.isCancelled && order.status !== 'Delivered' && (
// //                               <button
// //                                 onClick={() => handleUpdateOrderStatus(order._id, order.status)}
// //                                 disabled={updatingStatus}
// //                                 className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
// //                               >
// //                                 <FaSyncAlt size={12} /> Update
// //                               </button>
// //                             )}
// //                             <button
// //                               onClick={() => navigate(`/order/${order._id}`)}
// //                               className="flex items-center gap-1 px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
// //                             >
// //                               <FaEye size={12} /> View
// //                             </button>
// //                           </div>
// //                         </td>
// //                       </tr>
// //                     );
// //                   })}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       {/* Add/Edit Product Modal */}
// //       {showAddModal && (
// //         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddModal(false)}>
// //           <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
// //             <h2 className="text-xl font-bold mb-4">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
// //             <form onSubmit={handleSubmitProduct} className="space-y-4">
// //               <input type="text" placeholder="Product Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded-lg" required />
// //               <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-2 border rounded-lg" required>
// //                 <option value="">Select Category</option>
// //                 {categoriesList.map(cat => <option key={cat} value={cat}>{cat}</option>)}
// //               </select>
// //               <input type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full p-2 border rounded-lg" required />
// //               <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded-lg" rows="3" required />
// //               <input type="number" placeholder="Stock" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className="w-full p-2 border rounded-lg" required />
              
// //               {/* Image Upload Section */}
// //               <div>
// //                 <label className="block text-sm font-medium mb-1">Product Image</label>
// //                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
// //                   {imagePreview ? (
// //                     <div className="relative">
// //                       <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover mx-auto rounded-lg" />
// //                       <button type="button" onClick={() => { setImagePreview(""); setFormData({...formData, image: ""}); setSelectedImage(null); }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
// //                         <FaTimes size={12} />
// //                       </button>
// //                     </div>
// //                   ) : (
// //                     <div className="space-y-2">
// //                       <FaImage className="text-4xl text-gray-400 mx-auto" />
// //                       <p className="text-sm text-gray-500">Click to upload image</p>
// //                       <input type="file" accept="image/*" onChange={handleLocalImageSelect} className="hidden" id="imageUpload" />
// //                       <label htmlFor="imageUpload" className="inline-block px-4 py-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 text-sm">Choose Image</label>
// //                     </div>
// //                   )}
// //                 </div>
// //                 <input type="text" placeholder="Or enter image URL" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full p-2 border rounded-lg mt-2" />
// //               </div>
              
// //               <div className="flex gap-3 pt-2">
// //                 <button type="submit" className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
// //                   {editingProduct ? "Update" : "Save"}
// //                 </button>
// //                 <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default AdminDashboard;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../utils/api";
// import { toast } from "react-toastify";
// import { FaEdit, FaTrash, FaPlus, FaEye, FaUsers, FaBox, FaTag, FaUpload, FaTimes, FaImage, FaSyncAlt, FaCheckCircle, FaTruck, FaSpinner, FaHourglassHalf, FaTimesCircle, FaChartLine } from "react-icons/fa";
// import axios from "axios";

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("products");
//   const [loading, setLoading] = useState(true);
//   const [products, setProducts] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [updatingStatus, setUpdatingStatus] = useState(false);
  
//   // ✅ Stats State
//   const [stats, setStats] = useState({
//     totalOrders: 0,
//     totalRevenue: 0,
//     totalProducts: 0,
//     totalUsers: 0,
//     pendingOrders: 0,
//     lowStockProducts: 0
//   });
  
//   const [formData, setFormData] = useState({
//     name: "",
//     category: "",
//     price: "",
//     description: "",
//     stock: "",
//     image: ""
//   });

//   const categoriesList = [
//     "Copper Utensils",
//     "Steel Bottles",
//     "Thermoware & Lunchboxes",
//     "Cookware Sets",
//     "Home Appliances",
//     "Cookers (Aluminum, Steel, Triply)"
//   ];

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     if (user.role !== "admin") {
//       toast.error("Admin access required!");
//       navigate('/');
//       return;
//     }
//     fetchProducts();
//     fetchUsers();
//     fetchOrders();
//     fetchStats(); // ✅ Fetch stats
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await API.get('/products/all');
//       if (Array.isArray(response.data)) {
//         setProducts(response.data);
//       } else if (response.data?.products) {
//         setProducts(response.data.products);
//       } else {
//         setProducts([]);
//       }
//     } catch (err) {
//       toast.error("Failed to fetch products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const response = await API.get('/admin/users');
//       if (Array.isArray(response.data)) {
//         setUsers(response.data);
//       }
//     } catch (err) {
//       console.error("Failed to fetch users");
//     }
//   };

//   const fetchOrders = async () => {
//     try {
//       const response = await API.get('/orders/admin/all');
//       if (Array.isArray(response.data)) {
//         setOrders(response.data);
//       } else if (response.data?.orders) {
//         setOrders(response.data.orders);
//       }
//     } catch (err) {
//       console.error("Failed to fetch orders");
//     }
//   };

//   // ✅ Fetch Stats from API
//   const fetchStats = async () => {
//     try {
//       const response = await API.get('/orders/admin/stats');
//       setStats(response.data);
//     } catch (err) {
//       console.error("Failed to fetch stats", err);
//       // Fallback to calculate from existing data
//       setStats({
//         totalOrders: orders.length,
//         totalRevenue: orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0),
//         totalProducts: products.length,
//         totalUsers: users.length,
//         pendingOrders: orders.filter(o => o.status === 'Processing' && !o.isCancelled).length,
//         lowStockProducts: products.filter(p => p.stock < 5).length
//       });
//     }
//   };

//   // Update stats when data changes
//   useEffect(() => {
//     if (products.length > 0 || orders.length > 0 || users.length > 0) {
//       setStats({
//         totalOrders: orders.length,
//         totalRevenue: orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0),
//         totalProducts: products.length,
//         totalUsers: users.length,
//         pendingOrders: orders.filter(o => o.status === 'Processing' && !o.isCancelled).length,
//         lowStockProducts: products.filter(p => p.stock < 5).length
//       });
//     }
//   }, [products, orders, users]);

//   // ✅ Update Order Status
//   const handleUpdateOrderStatus = async (orderId, currentStatus) => {
//     let newStatus = "";
//     switch(currentStatus) {
//       case "Processing":
//         newStatus = "Shipped";
//         break;
//       case "Shipped":
//         newStatus = "Delivered";
//         break;
//       case "Delivered":
//         toast.info("Order already delivered");
//         return;
//       case "Cancelled":
//         toast.info("Order is cancelled");
//         return;
//       default:
//         newStatus = "Processing";
//     }

//     if (!window.confirm(`Change order status from ${currentStatus} to ${newStatus}?`)) {
//       return;
//     }

//     setUpdatingStatus(true);
//     try {
//       const response = await API.put(`/orders/admin/${orderId}/status`, { status: newStatus });
//       if (response.data.success || response.data.updatedOrder) {
//         toast.success(`Order status updated to ${newStatus}!`);
//         fetchOrders();
//         fetchStats(); // ✅ Refresh stats
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to update status");
//     } finally {
//       setUpdatingStatus(false);
//     }
//   };

//   // Get status badge for order
//   const getStatusBadge = (status, isCancelled) => {
//     if (isCancelled) {
//       return { color: 'bg-red-100 text-red-800', icon: FaTimesCircle, text: 'Cancelled' };
//     }
//     switch(status) {
//       case 'Delivered':
//         return { color: 'bg-green-100 text-green-800', icon: FaCheckCircle, text: 'Delivered' };
//       case 'Shipped':
//         return { color: 'bg-blue-100 text-blue-800', icon: FaTruck, text: 'Shipped' };
//       case 'Processing':
//         return { color: 'bg-yellow-100 text-yellow-800', icon: FaSpinner, text: 'Processing' };
//       default:
//         return { color: 'bg-gray-100 text-gray-800', icon: FaBox, text: status || 'Placed' };
//     }
//   };

//   // ✅ Image Upload Handler
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!file.type.includes('image')) {
//       toast.error("Please select an image file");
//       return;
//     }

//     if (file.size > 2 * 1024 * 1024) {
//       toast.error("Image size should be less than 2MB");
//       return;
//     }

//     setUploading(true);
//     const uploadFormData = new FormData();
//     uploadFormData.append('image', file);

//     try {
//       const response = await axios.post('https://piyush-sir.onrender.com/api/upload', uploadFormData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });

//       if (response.data.url) {
//         setImagePreview(response.data.url);
//         setFormData({ ...formData, image: response.data.url });
//         toast.success("Image uploaded successfully!");
//       }
//     } catch (err) {
//       console.error("Upload failed:", err);
//       toast.error("Failed to upload image");
//     } finally {
//       setUploading(false);
//     }
//   };

//   // ✅ Local image preview
//   const handleLocalImageSelect = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//         setFormData({ ...formData, image: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmitProduct = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('name', formData.name);
//       formDataToSend.append('category', formData.category);
//       formDataToSend.append('price', formData.price);
//       formDataToSend.append('description', formData.description);
//       formDataToSend.append('stock', formData.stock);
      
//       if (selectedImage) {
//         formDataToSend.append('image', selectedImage);
//       } else if (formData.image && formData.image.startsWith('http')) {
//         formDataToSend.append('imageUrl', formData.image);
//       }
      
//       if (editingProduct) {
//         await API.put(`/products/${editingProduct._id}`, formDataToSend, {
//           headers: { 'Content-Type': 'multipart/form-data' }
//         });
//         toast.success("Product updated successfully!");
//       } else {
//         await API.post('/products/add', formDataToSend, {
//           headers: { 'Content-Type': 'multipart/form-data' }
//         });
//         toast.success("Product added successfully!");
//       }
      
//       setShowAddModal(false);
//       setEditingProduct(null);
//       setFormData({ name: "", category: "", price: "", description: "", stock: "", image: "" });
//       setImagePreview("");
//       setSelectedImage(null);
//       fetchProducts();
//       fetchStats(); // ✅ Refresh stats
//     } catch (err) {
//       console.error("Error:", err.response?.data);
//       toast.error(err.response?.data?.message || "Failed to save product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditProduct = (product) => {
//     setEditingProduct(product);
//     setFormData({
//       name: product.name,
//       category: product.category,
//       price: product.price,
//       description: product.description,
//       stock: product.stock,
//       image: product.image
//     });
//     setImagePreview(product.image);
//     setShowAddModal(true);
//   };

//   const handleDeleteProduct = async (id) => {
//     if (window.confirm("Delete this product?")) {
//       try {
//         await API.delete(`/products/${id}`);
//         toast.success("Deleted!");
//         fetchProducts();
//         fetchStats(); // ✅ Refresh stats
//       } catch (err) {
//         toast.error("Failed to delete");
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading Admin Dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header with Manage Content Button */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
//           <button
//             onClick={() => navigate('/admin/content')}
//             className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
//           >
//             <FaEdit /> Manage Content
//           </button>
//         </div>

//         {/* ✅ Stats Cards - Updated */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {/* Total Revenue Card */}
//           <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow p-6 text-white">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm opacity-90">Total Revenue</p>
//                 <p className="text-2xl font-bold">₹{stats.totalRevenue?.toLocaleString() || 0}</p>
//               </div>
//               <FaChartLine className="text-3xl opacity-80" />
//             </div>
//           </div>
          
//           {/* Total Orders Card */}
//           <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white cursor-pointer hover:opacity-90 transition" onClick={() => setActiveTab("orders")}>
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm opacity-90">Total Orders</p>
//                 <p className="text-2xl font-bold">{stats.totalOrders || 0}</p>
//               </div>
//               <FaBox className="text-3xl opacity-80" />
//             </div>
//           </div>
          
//           {/* Pending Orders Card */}
//           <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg shadow p-6 text-white cursor-pointer hover:opacity-90 transition" onClick={() => setActiveTab("orders")}>
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm opacity-90">Pending Orders</p>
//                 <p className="text-2xl font-bold">{stats.pendingOrders || 0}</p>
//               </div>
//               <FaSpinner className="text-3xl opacity-80" />
//             </div>
//           </div>
          
//           {/* Low Stock Alert Card */}
//           <div className={`rounded-lg shadow p-6 text-white cursor-pointer hover:opacity-90 transition ${stats.lowStockProducts > 0 ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-gray-500 to-gray-600'}`} onClick={() => setActiveTab("products")}>
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm opacity-90">Low Stock Products</p>
//                 <p className="text-2xl font-bold">{stats.lowStockProducts || 0}</p>
//               </div>
//               <FaTag className="text-3xl opacity-80" />
//             </div>
//           </div>
//         </div>

//         {/* Tab Buttons */}
//         <div className="flex gap-2 mb-6 border-b flex-wrap">
//           <button onClick={() => setActiveTab("products")} className={`px-6 py-3 font-medium transition ${activeTab === "products" ? "border-b-2 border-red-600 text-red-600" : "text-gray-500"}`}>
//             Products ({stats.totalProducts})
//           </button>
//           <button onClick={() => setActiveTab("users")} className={`px-6 py-3 font-medium transition ${activeTab === "users" ? "border-b-2 border-red-600 text-red-600" : "text-gray-500"}`}>
//             Users ({stats.totalUsers})
//           </button>
//           <button onClick={() => setActiveTab("orders")} className={`px-6 py-3 font-medium transition ${activeTab === "orders" ? "border-b-2 border-red-600 text-red-600" : "text-gray-500"}`}>
//             Orders ({stats.totalOrders})
//           </button>
//           {activeTab === "products" && (
//             <button onClick={() => { setEditingProduct(null); setFormData({ name: "", category: "", price: "", description: "", stock: "", image: "" }); setImagePreview(""); setShowAddModal(true); }} className="ml-auto bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2">
//               <FaPlus /> Add Product
//             </button>
//           )}
//         </div>

//         {/* Products Table */}
//         {activeTab === "products" && (
//           <div className="bg-white rounded-lg shadow overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left">Image</th>
//                     <th className="px-6 py-3 text-left">Name</th>
//                     <th className="px-6 py-3 text-left">Category</th>
//                     <th className="px-6 py-3 text-left">Price</th>
//                     <th className="px-6 py-3 text-left">Stock</th>
//                     <th className="px-6 py-3 text-left">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {products.map((product) => (
//                     <tr key={product._id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4">
//                         <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
//                       </td>
//                       <td className="px-6 py-4 font-medium">{product.name}</td>
//                       <td className="px-6 py-4">{product.category}</td>
//                       <td className="px-6 py-4">₹{product.price}</td>
//                       <td className={`px-6 py-4 font-medium ${product.stock < 5 ? 'text-red-600' : 'text-green-600'}`}>
//                         {product.stock || 15}
//                         {product.stock < 5 && product.stock > 0 && <span className="ml-2 text-xs text-orange-500">(Low Stock!)</span>}
//                         {product.stock === 0 && <span className="ml-2 text-xs text-red-500">(Out of Stock)</span>}
//                        </td>
//                       <td className="px-6 py-4">
//                         <div className="flex gap-3">
//                           <button onClick={() => handleEditProduct(product)} className="text-green-600 hover:text-green-800">
//                             <FaEdit />
//                           </button>
//                           <button onClick={() => handleDeleteProduct(product._id)} className="text-red-600 hover:text-red-800">
//                             <FaTrash />
//                           </button>
//                         </div>
//                        </td>
//                      </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* Users Table */}
//         {activeTab === "users" && (
//           <div className="bg-white rounded-lg shadow overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left">Name</th>
//                     <th className="px-6 py-3 text-left">Email</th>
//                     <th className="px-6 py-3 text-left">Role</th>
//                     <th className="px-6 py-3 text-left">Joined</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users.map((user) => (
//                     <tr key={user._id} className="border-t">
//                       <td className="px-6 py-4">{user.name}</td>
//                       <td className="px-6 py-4">{user.email}</td>
//                       <td className="px-6 py-4">
//                         <span className={`px-2 py-1 rounded text-xs ${user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
//                           {user.role || 'user'}
//                         </span>
//                        </td>
//                       <td className="px-6 py-4">{new Date(user.createdAt).toLocaleDateString()} </td>
//                      </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* Orders Table */}
//         {activeTab === "orders" && (
//           <div className="bg-white rounded-lg shadow overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left">Order ID</th>
//                     <th className="px-6 py-3 text-left">Customer</th>
//                     <th className="px-6 py-3 text-left">Items</th>
//                     <th className="px-6 py-3 text-left">Total</th>
//                     <th className="px-6 py-3 text-left">Status</th>
//                     <th className="px-6 py-3 text-left">Payment</th>
//                     <th className="px-6 py-3 text-left">Date</th>
//                     <th className="px-6 py-3 text-left">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {orders.map((order) => {
//                     const statusInfo = getStatusBadge(order.status, order.isCancelled);
//                     const StatusIcon = statusInfo.icon;
                    
//                     return (
//                       <tr key={order._id} className="border-t hover:bg-gray-50">
//                         <td className="px-6 py-4 font-mono text-sm">{order._id?.slice(-8)}</td>
//                         <td className="px-6 py-4">
//                           <div>
//                             <p className="font-medium">{order.user?.name || 'N/A'}</p>
//                             <p className="text-xs text-gray-500">{order.user?.email}</p>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="space-y-1">
//                             {order.orderItems?.slice(0, 2).map((item, idx) => (
//                               <p key={idx} className="text-sm">
//                                 {item.name} x{item.qty || item.quantity}
//                               </p>
//                             ))}
//                             {order.orderItems?.length > 2 && (
//                               <p className="text-xs text-gray-500">+{order.orderItems.length - 2} more</p>
//                             )}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 font-bold">₹{order.totalPrice}</td>
//                         <td className="px-6 py-4">
//                           <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusInfo.color}`}>
//                             <StatusIcon size={12} />
//                             {statusInfo.text}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4">
//                           <span className={`px-2 py-1 rounded text-xs ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
//                             {order.isPaid ? 'Paid' : 'Pending'}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
//                         <td className="px-6 py-4">
//                           <div className="flex gap-2">
//                             {!order.isCancelled && order.status !== 'Delivered' && (
//                               <button
//                                 onClick={() => handleUpdateOrderStatus(order._id, order.status)}
//                                 disabled={updatingStatus}
//                                 className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
//                               >
//                                 <FaSyncAlt size={12} /> Update
//                               </button>
//                             )}
//                             <button
//                               onClick={() => navigate(`/order/${order._id}`)}
//                               className="flex items-center gap-1 px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
//                             >
//                               <FaEye size={12} /> View
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Add/Edit Product Modal */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddModal(false)}>
//           <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
//             <h2 className="text-xl font-bold mb-4">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
//             <form onSubmit={handleSubmitProduct} className="space-y-4">
//               <input type="text" placeholder="Product Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded-lg" required />
//               <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-2 border rounded-lg" required>
//                 <option value="">Select Category</option>
//                 {categoriesList.map(cat => <option key={cat} value={cat}>{cat}</option>)}
//               </select>
//               <input type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full p-2 border rounded-lg" required />
//               <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded-lg" rows="3" required />
//               <input type="number" placeholder="Stock" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className="w-full p-2 border rounded-lg" required />
              
//               {/* Image Upload Section */}
//               <div>
//                 <label className="block text-sm font-medium mb-1">Product Image</label>
//                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
//                   {imagePreview ? (
//                     <div className="relative">
//                       <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover mx-auto rounded-lg" />
//                       <button type="button" onClick={() => { setImagePreview(""); setFormData({...formData, image: ""}); setSelectedImage(null); }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
//                         <FaTimes size={12} />
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="space-y-2">
//                       <FaImage className="text-4xl text-gray-400 mx-auto" />
//                       <p className="text-sm text-gray-500">Click to upload image</p>
//                       <input type="file" accept="image/*" onChange={handleLocalImageSelect} className="hidden" id="imageUpload" />
//                       <label htmlFor="imageUpload" className="inline-block px-4 py-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 text-sm">Choose Image</label>
//                     </div>
//                   )}
//                 </div>
//                 <input type="text" placeholder="Or enter image URL" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full p-2 border rounded-lg mt-2" />
//               </div>
              
//               <div className="flex gap-3 pt-2">
//                 <button type="submit" className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
//                   {editingProduct ? "Update" : "Save"}
//                 </button>
//                 <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { 
    FaEdit, FaTrash, FaPlus, FaEye, FaBox, FaTag, FaImage, 
    FaSyncAlt, FaCheckCircle, FaTruck, FaSpinner, FaTimesCircle, 
    FaChartLine, FaUsers, FaPercent, FaCalendarAlt, FaHeart
} from "react-icons/fa";
import axios from "axios";
import API from "../utils/api";
// import CouponCreateModal from "../components/CouponCreateModal";
import { 
    fetchAllCoupons, 
    toggleCouponStatus, 
    deleteCoupon,
    selectAllCoupons,
    selectCouponLoading
} from "../redux/slices/couponSlice";
import CouponCreateModal from "../Component/CouponCreateModal";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Redux Selectors
    const coupons = useSelector(selectAllCoupons);
    const couponLoading = useSelector(selectCouponLoading);
    
    const [activeTab, setActiveTab] = useState("products");
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showCouponModal, setShowCouponModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [updatingStatus, setUpdatingStatus] = useState(false);
    
    // Stats State
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        totalProducts: 0,
        totalUsers: 0,
        pendingOrders: 0,
        lowStockProducts: 0
    });
    
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        description: "",
        stock: "",
        image: ""
    });

    const categoriesList = [
        "Copper Utensils",
        "Steel Bottles",
        "Thermoware & Lunchboxes",
        "Cookware Sets",
        "Home Appliances",
        "Cookers (Aluminum, Steel, Triply)"
    ];

    // Fetch all data
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.role !== "admin") {
            toast.error("Admin access required!");
            navigate('/');
            return;
        }
        fetchProducts();
        fetchUsers();
        fetchOrders();
        fetchStats();
    }, []);

    // Fetch coupons when tab changes
    useEffect(() => {
        if (activeTab === "coupons") {
            dispatch(fetchAllCoupons());
        }
    }, [activeTab, dispatch]);

    const fetchProducts = async () => {
        try {
            const response = await API.get('/products/all');
            if (Array.isArray(response.data)) {
                setProducts(response.data);
            } else if (response.data?.products) {
                setProducts(response.data.products);
            } else {
                setProducts([]);
            }
        } catch (err) {
            toast.error("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await API.get('/admin/users');
            if (Array.isArray(response.data)) {
                setUsers(response.data);
            }
        } catch (err) {
            console.error("Failed to fetch users");
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await API.get('/orders/admin/all');
            if (Array.isArray(response.data)) {
                setOrders(response.data);
            } else if (response.data?.orders) {
                setOrders(response.data.orders);
            }
        } catch (err) {
            console.error("Failed to fetch orders");
        }
    };

    const fetchStats = async () => {
        try {
            const response = await API.get('/orders/admin/stats');
            setStats(response.data);
        } catch (err) {
            console.error("Failed to fetch stats", err);
            setStats({
                totalOrders: orders.length,
                totalRevenue: orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0),
                totalProducts: products.length,
                totalUsers: users.length,
                pendingOrders: orders.filter(o => o.status === 'Processing' && !o.isCancelled).length,
                lowStockProducts: products.filter(p => p.stock < 5).length
            });
        }
    };

    useEffect(() => {
        if (products.length > 0 || orders.length > 0 || users.length > 0) {
            setStats({
                totalOrders: orders.length,
                totalRevenue: orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0),
                totalProducts: products.length,
                totalUsers: users.length,
                pendingOrders: orders.filter(o => o.status === 'Processing' && !o.isCancelled).length,
                lowStockProducts: products.filter(p => p.stock < 5).length
            });
        }
    }, [products, orders, users]);

    const handleUpdateOrderStatus = async (orderId, currentStatus) => {
        let newStatus = "";
        switch(currentStatus) {
            case "Processing":
                newStatus = "Shipped";
                break;
            case "Shipped":
                newStatus = "Delivered";
                break;
            case "Delivered":
                toast.info("Order already delivered");
                return;
            case "Cancelled":
                toast.info("Order is cancelled");
                return;
            default:
                newStatus = "Processing";
        }

        if (!window.confirm(`Change order status from ${currentStatus} to ${newStatus}?`)) {
            return;
        }

        setUpdatingStatus(true);
        try {
            const response = await API.put(`/orders/admin/${orderId}/status`, { status: newStatus });
            if (response.data.success || response.data.updatedOrder) {
                toast.success(`Order status updated to ${newStatus}!`);
                fetchOrders();
                fetchStats();
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update status");
        } finally {
            setUpdatingStatus(false);
        }
    };

    // Coupon Handlers
    const handleToggleCouponStatus = async (couponId, currentStatus) => {
        const result = await dispatch(toggleCouponStatus({ id: couponId, isActive: !currentStatus }));
        if (result.payload?.success) {
            toast.success(`Coupon ${!currentStatus ? 'activated' : 'deactivated'}!`);
        } else {
            toast.error(result.payload || "Failed to update coupon status");
        }
    };

    const handleDeleteCoupon = async (couponId) => {
        if (window.confirm("Delete this coupon permanently?")) {
            const result = await dispatch(deleteCoupon(couponId));
            if (result.payload?.success) {
                toast.success("Coupon deleted!");
            } else {
                toast.error(result.payload || "Failed to delete coupon");
            }
        }
    };

    const handleCouponCreated = () => {
        dispatch(fetchAllCoupons());
    };

    const getStatusBadge = (status, isCancelled) => {
        if (isCancelled) {
            return { color: 'bg-red-100 text-red-800', icon: FaTimesCircle, text: 'Cancelled' };
        }
        switch(status) {
            case 'Delivered':
                return { color: 'bg-green-100 text-green-800', icon: FaCheckCircle, text: 'Delivered' };
            case 'Shipped':
                return { color: 'bg-blue-100 text-blue-800', icon: FaTruck, text: 'Shipped' };
            case 'Processing':
                return { color: 'bg-yellow-100 text-yellow-800', icon: FaSpinner, text: 'Processing' };
            default:
                return { color: 'bg-gray-100 text-gray-800', icon: FaBox, text: status || 'Placed' };
        }
    };

    const handleLocalImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmitProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('stock', formData.stock);
            
            if (selectedImage) {
                formDataToSend.append('image', selectedImage);
            } else if (formData.image && formData.image.startsWith('http')) {
                formDataToSend.append('imageUrl', formData.image);
            }
            
            if (editingProduct) {
                await API.put(`/products/${editingProduct._id}`, formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success("Product updated successfully!");
            } else {
                await API.post('/products/add', formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                toast.success("Product added successfully!");
            }
            
            setShowAddModal(false);
            setEditingProduct(null);
            setFormData({ name: "", category: "", price: "", description: "", stock: "", image: "" });
            setImagePreview("");
            setSelectedImage(null);
            fetchProducts();
            fetchStats();
        } catch (err) {
            console.error("Error:", err.response?.data);
            toast.error(err.response?.data?.message || "Failed to save product");
        } finally {
            setLoading(false);
        }
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            category: product.category,
            price: product.price,
            description: product.description,
            stock: product.stock,
            image: product.image
        });
        setImagePreview(product.image);
        setShowAddModal(true);
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm("Delete this product?")) {
            try {
                await API.delete(`/products/${id}`);
                toast.success("Deleted!");
                fetchProducts();
                fetchStats();
            } catch (err) {
                toast.error("Failed to delete");
            }
        }
    };

    if (loading && activeTab === "products") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading Admin Dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <button
                        onClick={() => navigate('/admin/content')}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
                    >
                        <FaEdit /> Manage Content
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-90">Total Revenue</p>
                                <p className="text-2xl font-bold">₹{stats.totalRevenue?.toLocaleString() || 0}</p>
                            </div>
                            <FaChartLine className="text-3xl opacity-80" />
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white cursor-pointer hover:opacity-90 transition" onClick={() => setActiveTab("orders")}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-90">Total Orders</p>
                                <p className="text-2xl font-bold">{stats.totalOrders || 0}</p>
                            </div>
                            <FaBox className="text-3xl opacity-80" />
                        </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg shadow p-6 text-white cursor-pointer hover:opacity-90 transition" onClick={() => setActiveTab("orders")}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-90">Pending Orders</p>
                                <p className="text-2xl font-bold">{stats.pendingOrders || 0}</p>
                            </div>
                            <FaSpinner className="text-3xl opacity-80" />
                        </div>
                    </div>
                    
                    <div className={`rounded-lg shadow p-6 text-white cursor-pointer hover:opacity-90 transition ${stats.lowStockProducts > 0 ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-gray-500 to-gray-600'}`} onClick={() => setActiveTab("products")}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-90">Low Stock Products</p>
                                <p className="text-2xl font-bold">{stats.lowStockProducts || 0}</p>
                            </div>
                            <FaTag className="text-3xl opacity-80" />
                        </div>
                    </div>
                </div>

                {/* Tab Buttons */}
                <div className="flex gap-2 mb-6 border-b flex-wrap">
                    <button 
                        onClick={() => setActiveTab("products")} 
                        className={`px-6 py-3 font-medium transition ${activeTab === "products" ? "border-b-2 border-red-600 text-red-600" : "text-gray-500"}`}
                    >
                        Products ({stats.totalProducts})
                    </button>
                    <button 
                        onClick={() => setActiveTab("users")} 
                        className={`px-6 py-3 font-medium transition ${activeTab === "users" ? "border-b-2 border-red-600 text-red-600" : "text-gray-500"}`}
                    >
                        Users ({stats.totalUsers})
                    </button>
                    <button 
                        onClick={() => setActiveTab("orders")} 
                        className={`px-6 py-3 font-medium transition ${activeTab === "orders" ? "border-b-2 border-red-600 text-red-600" : "text-gray-500"}`}
                    >
                        Orders ({stats.totalOrders})
                    </button>
                    <button 
                        onClick={() => setActiveTab("coupons")} 
                        className={`px-6 py-3 font-medium transition ${activeTab === "coupons" ? "border-b-2 border-red-600 text-red-600" : "text-gray-500"}`}
                    >
                        Coupons ({coupons.length})
                    </button>
                    {activeTab === "products" && (
                        <button 
                            onClick={() => { setEditingProduct(null); setFormData({ name: "", category: "", price: "", description: "", stock: "", image: "" }); setImagePreview(""); setShowAddModal(true); }} 
                            className="ml-auto bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
                        >
                            <FaPlus /> Add Product
                        </button>
                    )}
                    {activeTab === "coupons" && (
                        <button 
                            onClick={() => setShowCouponModal(true)} 
                            className="ml-auto bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
                        >
                            <FaPlus /> Create Coupon
                        </button>
                    )}
                </div>

                {/* Products Tab */}
                {activeTab === "products" && (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Image</th>
                                        <th className="px-6 py-3 text-left">Name</th>
                                        <th className="px-6 py-3 text-left">Category</th>
                                        <th className="px-6 py-3 text-left">Price</th>
                                        <th className="px-6 py-3 text-left">Stock</th>
                                        <th className="px-6 py-3 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {products.map((product) => (
                                        <tr key={product._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                                            </td>
                                            <td className="px-6 py-4 font-medium">{product.name}</td>
                                            <td className="px-6 py-4">{product.category}</td>
                                            <td className="px-6 py-4">₹{product.price}</td>
                                            <td className={`px-6 py-4 font-medium ${product.stock < 5 ? 'text-red-600' : 'text-green-600'}`}>
                                                {product.stock || 15}
                                                {product.stock < 5 && product.stock > 0 && <span className="ml-2 text-xs text-orange-500">(Low Stock!)</span>}
                                                {product.stock === 0 && <span className="ml-2 text-xs text-red-500">(Out of Stock)</span>}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-3">
                                                    <button onClick={() => handleEditProduct(product)} className="text-green-600 hover:text-green-800">
                                                        <FaEdit />
                                                    </button>
                                                    <button onClick={() => handleDeleteProduct(product._id)} className="text-red-600 hover:text-red-800">
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Users Tab */}
                {activeTab === "users" && (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Name</th>
                                        <th className="px-6 py-3 text-left">Email</th>
                                        <th className="px-6 py-3 text-left">Role</th>
                                        <th className="px-6 py-3 text-left">Joined</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user._id} className="border-t">
                                            <td className="px-6 py-4">{user.name}</td>
                                            <td className="px-6 py-4">{user.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-xs ${user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                                    {user.role || 'user'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Orders Tab */}
                {activeTab === "orders" && (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Order ID</th>
                                        <th className="px-6 py-3 text-left">Customer</th>
                                        <th className="px-6 py-3 text-left">Items</th>
                                        <th className="px-6 py-3 text-left">Total</th>
                                        <th className="px-6 py-3 text-left">Status</th>
                                        <th className="px-6 py-3 text-left">Payment</th>
                                        <th className="px-6 py-3 text-left">Date</th>
                                        <th className="px-6 py-3 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => {
                                        const statusInfo = getStatusBadge(order.status, order.isCancelled);
                                        const StatusIcon = statusInfo.icon;
                                        
                                        return (
                                            <tr key={order._id} className="border-t hover:bg-gray-50">
                                                <td className="px-6 py-4 font-mono text-sm">{order._id?.slice(-8)}</td>
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <p className="font-medium">{order.user?.name || 'N/A'}</p>
                                                        <p className="text-xs text-gray-500">{order.user?.email}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="space-y-1">
                                                        {order.orderItems?.slice(0, 2).map((item, idx) => (
                                                            <p key={idx} className="text-sm">
                                                                {item.name} x{item.qty || item.quantity}
                                                            </p>
                                                        ))}
                                                        {order.orderItems?.length > 2 && (
                                                            <p className="text-xs text-gray-500">+{order.orderItems.length - 2} more</p>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-bold">₹{order.totalPrice}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusInfo.color}`}>
                                                        <StatusIcon size={12} />
                                                        {statusInfo.text}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded text-xs ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                        {order.isPaid ? 'Paid' : 'Pending'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2">
                                                        {!order.isCancelled && order.status !== 'Delivered' && (
                                                            <button
                                                                onClick={() => handleUpdateOrderStatus(order._id, order.status)}
                                                                disabled={updatingStatus}
                                                                className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                                                            >
                                                                <FaSyncAlt size={12} /> Update
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => navigate(`/order/${order._id}`)}
                                                            className="flex items-center gap-1 px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
                                                        >
                                                            <FaEye size={12} /> View
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Coupons Tab */}
                {activeTab === "coupons" && (
                    <div>
                        {couponLoading && activeTab === "coupons" ? (
                            <div className="text-center py-12">
                                <div className="w-12 h-12 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-gray-600">Loading coupons...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {coupons.map((coupon) => (
                                    <div key={coupon._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition">
                                        {/* Coupon Header */}
                                        <div className="bg-gradient-to-r from-red-700 to-red-800 p-4 text-white">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-xs opacity-80">COUPON CODE</p>
                                                    <p className="text-2xl font-bold tracking-wider">{coupon.code}</p>
                                                </div>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${coupon.isActive ? 'bg-green-500' : 'bg-gray-500'}`}>
                                                    {coupon.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Coupon Body */}
                                        <div className="p-4">
                                            <p className="text-gray-600 text-sm mb-3">{coupon.description || "Special discount for you!"}</p>
                                            
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-500 text-sm">Discount:</span>
                                                    <span className="font-bold text-red-600">
                                                        {coupon.voucherType === 'discount' 
                                                            ? `${coupon.discountPercent}% OFF` 
                                                            : `₹${coupon.fixedAmount} OFF`}
                                                    </span>
                                                </div>
                                                
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-500 text-sm">Min. Order:</span>
                                                    <span className="font-medium">₹{coupon.minOrderAmount || 0}</span>
                                                </div>
                                                
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-500 text-sm">Used:</span>
                                                    <span className="font-medium">{coupon.usedCount || 0} / {coupon.maxUsage || 1}</span>
                                                </div>
                                                
                                                {coupon.isFirstOrderOnly && (
                                                    <div className="mt-2">
                                                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">🎯 First Order Only</span>
                                                    </div>
                                                )}
                                                
                                                {coupon.expiresAt && (
                                                    <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
                                                        <span>Expires:</span>
                                                        <span>{new Date(coupon.expiresAt).toLocaleDateString()}</span>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {/* Action Buttons */}
                                            <div className="flex gap-2 mt-4 pt-3 border-t">
                                                <button
                                                    onClick={() => handleToggleCouponStatus(coupon._id, coupon.isActive)}
                                                    className={`flex-1 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                                                        coupon.isActive 
                                                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                                                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                                                    }`}
                                                >
                                                    {coupon.isActive ? 'Deactivate' : 'Activate'}
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCoupon(coupon._id)}
                                                    className="flex-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        {/* No Coupons Message */}
                        {coupons.length === 0 && !couponLoading && (
                            <div className="text-center py-12 bg-white rounded-lg shadow">
                                <FaTag className="text-6xl text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500">No coupons created yet</p>
                                <button
                                    onClick={() => setShowCouponModal(true)}
                                    className="mt-4 text-red-600 hover:underline"
                                >
                                    Create your first coupon
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Add/Edit Product Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddModal(false)}>
                    <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-xl font-bold mb-4">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
                        <form onSubmit={handleSubmitProduct} className="space-y-4">
                            <input type="text" placeholder="Product Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded-lg" required />
                            <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-2 border rounded-lg" required>
                                <option value="">Select Category</option>
                                {categoriesList.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                            <input type="number" placeholder="Price" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full p-2 border rounded-lg" required />
                            <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded-lg" rows="3" required />
                            <input type="number" placeholder="Stock" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className="w-full p-2 border rounded-lg" required />
                            
                            <div className="flex gap-3 pt-2">
                                <button type="submit" className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
                                    {editingProduct ? "Update" : "Save"}
                                </button>
                                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Coupon Create Modal */}
            <CouponCreateModal
                isOpen={showCouponModal}
                onClose={() => setShowCouponModal(false)}
                onCouponCreated={handleCouponCreated}
            />
        </div>
    );
};

export default AdminDashboard;