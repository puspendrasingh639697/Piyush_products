import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { FaTimes, FaPercent, FaRupeeSign, FaTag, FaCalendarAlt, FaUsers } from "react-icons/fa";
import { createCoupon, selectCouponLoading } from "../redux/slices/couponSlice";

const CouponCreateModal = ({ isOpen, onClose, onCouponCreated }) => {
    const dispatch = useDispatch();
    const loading = useSelector(selectCouponLoading);
    
    const [formData, setFormData] = useState({
        code: "",
        discountPercent: "",
        fixedAmount: "",
        voucherType: "discount",
        minOrderAmount: "",
        maxUsage: "1",
        description: "",
        isFirstOrderOnly: false,
        expiresAt: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.code.trim()) {
            toast.error("Please enter coupon code");
            return;
        }
        
        if (formData.voucherType === "discount" && !formData.discountPercent) {
            toast.error("Please enter discount percentage");
            return;
        }
        
        if (formData.voucherType === "fixed" && !formData.fixedAmount) {
            toast.error("Please enter fixed amount");
            return;
        }
        
        const couponData = {
            code: formData.code.toUpperCase(),
            discountPercent: formData.voucherType === "discount" ? Number(formData.discountPercent) : 0,
            fixedAmount: formData.voucherType === "fixed" ? Number(formData.fixedAmount) : 0,
            voucherType: formData.voucherType,
            minOrderAmount: Number(formData.minOrderAmount) || 0,
            maxUsage: Number(formData.maxUsage) || 1,
            description: formData.description,
            isFirstOrderOnly: formData.isFirstOrderOnly,
            expiresAt: formData.expiresAt || null,
        };
        
        const result = await dispatch(createCoupon(couponData));
        
        if (result.payload?.success) {
            toast.success(result.payload.message || "Coupon created successfully!");
            if (onCouponCreated) {
                onCouponCreated(result.payload.coupon);
            }
            onClose();
            // Reset form
            setFormData({
                code: "",
                discountPercent: "",
                fixedAmount: "",
                voucherType: "discount",
                minOrderAmount: "",
                maxUsage: "1",
                description: "",
                isFirstOrderOnly: false,
                expiresAt: "",
            });
        } else {
            toast.error(result.payload || "Failed to create coupon");
        }
    };

    const resetForm = () => {
        setFormData({
            code: "",
            discountPercent: "",
            fixedAmount: "",
            voucherType: "discount",
            minOrderAmount: "",
            maxUsage: "1",
            description: "",
            isFirstOrderOnly: false,
            expiresAt: "",
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black z-50"
                    />
                    
                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl bg-white rounded-2xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                    <FaTag className="text-red-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">Create New Coupon</h2>
                            </div>
                            <button 
                                onClick={onClose} 
                                className="p-2 hover:bg-gray-100 rounded-full transition"
                            >
                                <FaTimes className="text-gray-500" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {/* Coupon Code */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Coupon Code <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="code"
                                    value={formData.code}
                                    onChange={handleChange}
                                    placeholder="e.g., WELCOME20"
                                    required
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition uppercase"
                                />
                                <p className="text-xs text-gray-400 mt-1">Code will be automatically converted to uppercase</p>
                            </div>

                            {/* Voucher Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Voucher Type
                                </label>
                                <div className="flex gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="voucherType"
                                            value="discount"
                                            checked={formData.voucherType === "discount"}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-red-600 focus:ring-red-500"
                                        />
                                        <span className="text-gray-700">Percentage Discount (%)</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="voucherType"
                                            value="fixed"
                                            checked={formData.voucherType === "fixed"}
                                            onChange={handleChange}
                                            className="w-4 h-4 text-red-600 focus:ring-red-500"
                                        />
                                        <span className="text-gray-700">Fixed Amount (₹)</span>
                                    </label>
                                </div>
                            </div>

                            {/* Discount Value */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {formData.voucherType === "discount" ? "Discount Percentage" : "Fixed Amount"} 
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        {formData.voucherType === "discount" ? <FaPercent /> : <FaRupeeSign />}
                                    </span>
                                    <input
                                        type="number"
                                        name={formData.voucherType === "discount" ? "discountPercent" : "fixedAmount"}
                                        value={formData.voucherType === "discount" ? formData.discountPercent : formData.fixedAmount}
                                        onChange={handleChange}
                                        placeholder={formData.voucherType === "discount" ? "e.g., 20" : "e.g., 500"}
                                        required
                                        min="0"
                                        max={formData.voucherType === "discount" ? "100" : ""}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                                    />
                                </div>
                                {formData.voucherType === "discount" && (
                                    <p className="text-xs text-gray-400 mt-1">Enter value between 1-100%</p>
                                )}
                            </div>

                            {/* Minimum Order Amount */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Minimum Order Amount (₹)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <FaRupeeSign />
                                    </span>
                                    <input
                                        type="number"
                                        name="minOrderAmount"
                                        value={formData.minOrderAmount}
                                        onChange={handleChange}
                                        placeholder="e.g., 500"
                                        min="0"
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                                    />
                                </div>
                                <p className="text-xs text-gray-400 mt-1">Leave empty for no minimum order requirement</p>
                            </div>

                            {/* Max Usage per User */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Max Usage per User
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <FaUsers />
                                    </span>
                                    <input
                                        type="number"
                                        name="maxUsage"
                                        value={formData.maxUsage}
                                        onChange={handleChange}
                                        min="1"
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                                    />
                                </div>
                                <p className="text-xs text-gray-400 mt-1">How many times can a single user use this coupon?</p>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description (Optional)
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="2"
                                    placeholder="Describe the coupon offer..."
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none"
                                />
                            </div>

                            {/* First Order Only */}
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    name="isFirstOrderOnly"
                                    checked={formData.isFirstOrderOnly}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                                />
                                <label className="text-sm text-gray-700">
                                    Apply only for first-time orders
                                </label>
                            </div>

                            {/* Expiry Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Expiry Date (Optional)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <FaCalendarAlt />
                                    </span>
                                    <input
                                        type="datetime-local"
                                        name="expiresAt"
                                        value={formData.expiresAt}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                                    />
                                </div>
                                <p className="text-xs text-gray-400 mt-1">Leave empty for no expiry date</p>
                            </div>

                            {/* Preview Section */}
                            {(formData.code || formData.discountPercent || formData.fixedAmount) && (
                                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg border border-red-200">
                                    <p className="text-xs font-semibold text-gray-500 mb-2">PREVIEW</p>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-lg font-bold text-red-700">{formData.code.toUpperCase() || "COUPON"}</p>
                                            <p className="text-sm text-gray-600">
                                                {formData.voucherType === "discount" 
                                                    ? `${formData.discountPercent || 0}% OFF` 
                                                    : `₹${formData.fixedAmount || 0} OFF`}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500">Min. Order</p>
                                            <p className="font-semibold">₹{formData.minOrderAmount || 0}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        resetForm();
                                        onClose();
                                    }}
                                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 px-4 py-2.5 bg-red-700 text-white rounded-lg hover:bg-red-800 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                >
                                    {loading ? "Creating..." : "Create Coupon"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CouponCreateModal;