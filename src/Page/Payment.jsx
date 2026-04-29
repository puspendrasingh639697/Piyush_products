// import React, { useState, useEffect, useRef } from 'react';
// import amazone from "../assets/Icons/amazon.png";
// import googlepay from "../assets/Icons/googlepay.png";
// import mobikwik from "../assets/Icons/mobikwik.png";
// import paytm from "../assets/Icons/paytm.png";
// import phonepay from "../assets/Icons/phonepay.png";
// import barcode from "../assets/Icons/barcode.png";

// // Import icons for payment methods
// import { FaQrcode, FaCreditCard, FaMobileAlt, FaBuilding, FaWallet } from 'react-icons/fa';
// import { MdPayment, MdCheckCircle, MdSecurity, MdLock, MdAttachMoney } from 'react-icons/md';
// import { RiBankFill } from 'react-icons/ri';
// import { SiVisa, SiMastercard } from 'react-icons/si';
// import Lottie from "lottie-react";
// import PaymentLoading from "../assets/Images/Payment Loading.json";
// import PaymentSuccessful from "../assets/Images/payment successful.json";

// const Payment = () => {
//   const [selectedMethod, setSelectedMethod] = useState(null);
//   const [selectedBank, setSelectedBank] = useState('');
//   const [selectedWallet, setSelectedWallet] = useState('');
//   const [upiId, setUpiId] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [cardDetails, setCardDetails] = useState({
//     cardNumber: '',
//     expiry: '',
//     cvv: '',
//     name: '',
//     cardType: 'visa'
//   });
  
//   // Add this state for payment amount
//   const [paymentAmount, setPaymentAmount] = useState('');
//   const [uiTheme, setUiTheme] = useState({
//     primary: '#be185d',
//     secondary: '#db2777',
//     accent: '#ec4899',
//     gradient: 'from-[#be185d] via-[#db2777] to-[#ec4899]'
//   });

//   const topRef = useRef(null);
//   const processingRef = useRef(null);
//   const successRef = useRef(null);

//   const paymentMethods = [
//     { 
//       id: 'upi-qr', 
//       name: 'UPI QR', 
//       icon: FaQrcode, 
//       description: 'Scan to pay',
//       theme: {
//         primary: '#4f46e5',
//         secondary: '#7c73e9',
//         accent: '#a5a1ff',
//         gradient: 'from-[#4f46e5] via-[#7c73e9] to-[#a5a1ff]'
//       }
//     },
//     { 
//       id: 'card', 
//       name: 'Card', 
//       icon: FaCreditCard, 
//       description: 'Credit/Debit card',
//       theme: {
//         primary: '#2563eb',
//         secondary: '#3b82f6',
//         accent: '#60a5fa',
//         gradient: 'from-[#2563eb] via-[#3b82f6] to-[#60a5fa]'
//       }
//     },
//     { 
//       id: 'upi-id', 
//       name: 'UPI ID', 
//       icon: FaMobileAlt, 
//       description: 'Pay via UPI ID',
//       theme: {
//         primary: '#059669',
//         secondary: '#10b981',
//         accent: '#34d399',
//         gradient: 'from-[#059669] via-[#10b981] to-[#34d399]'
//       }
//     },
//     { 
//       id: 'net-banking', 
//       name: 'Net Banking', 
//       icon: RiBankFill, 
//       description: 'Bank transfer',
//       theme: {
//         primary: '#7c3aed',
//         secondary: '#8b5cf6',
//         accent: '#a78bfa',
//         gradient: 'from-[#7c3aed] via-[#8b5cf6] to-[#a78bfa]'
//       }
//     },
//     { 
//       id: 'wallet', 
//       name: 'Wallet', 
//       icon: FaWallet, 
//       description: 'Paytm, PhonePe',
//       theme: {
//         primary: '#dc2626',
//         secondary: '#ef4444',
//         accent: '#f87171',
//         gradient: 'from-[#dc2626] via-[#ef4444] to-[#f87171]'
//       }
//     }
//   ];

//   const banks = [
//     { 
//       id: 'hdfc', 
//       name: 'HDFC Bank', 
//       logo: 'HDFC',
//       color: 'bg-gradient-to-r from-blue-900 to-blue-700',
//       textColor: 'text-white',
//       theme: {
//         primary: '#1e40af',
//         secondary: '#1d4ed8',
//         accent: '#3b82f6',
//         gradient: 'from-[#1e40af] via-[#1d4ed8] to-[#3b82f6]'
//       }
//     },
//     { 
//       id: 'kotak', 
//       name: 'Kotak Mahindra Bank', 
//       logo: 'Kotak',
//       color: 'bg-gradient-to-r from-purple-900 to-purple-600',
//       textColor: 'text-white',
//       theme: {
//         primary: '#7c3aed',
//         secondary: '#8b5cf6',
//         accent: '#a78bfa',
//         gradient: 'from-[#7c3aed] via-[#8b5cf6] to-[#a78bfa]'
//       }
//     },
//     { 
//       id: 'icici', 
//       name: 'ICICI Bank', 
//       logo: 'ICICI',
//       color: 'bg-gradient-to-r from-orange-600 to-yellow-500',
//       textColor: 'text-white',
//       theme: {
//         primary: '#ea580c',
//         secondary: '#f97316',
//         accent: '#fb923c',
//         gradient: 'from-[#ea580c] via-[#f97316] to-[#fb923c]'
//       }
//     },
//     { 
//       id: 'sbi', 
//       name: 'State Bank of India', 
//       logo: 'SBI',
//       color: 'bg-gradient-to-r from-blue-800 to-blue-500',
//       textColor: 'text-white',
//       theme: {
//         primary: '#1e3a8a',
//         secondary: '#1e40af',
//         accent: '#3b82f6',
//         gradient: 'from-[#1e3a8a] via-[#1e40af] to-[#3b82f6]'
//       }
//     },
//     { 
//       id: 'axis', 
//       name: 'Axis Bank', 
//       logo: 'Axis',
//       color: 'bg-gradient-to-r from-red-700 to-red-500',
//       textColor: 'text-white',
//       theme: {
//         primary: '#dc2626',
//         secondary: '#ef4444',
//         accent: '#f87171',
//         gradient: 'from-[#dc2626] via-[#ef4444] to-[#f87171]'
//       }
//     }
//   ];

//   const wallets = [
//     { 
//       id: 'paytm', 
//       name: 'Paytm', 
//       logo: paytm,
//       color: 'bg-white',
//       textColor: 'text-white',
//       theme: {
//         primary: '#1e40af',
//         secondary: '#2563eb',
//         accent: '#3b82f6',
//         gradient: 'from-[#1e40af] via-[#2563eb] to-[#3b82f6]'
//       }
//     },
//     { 
//       id: 'phonepay', 
//       name: 'PhonePe', 
//       logo: phonepay,
//       color: 'bg-white',
//       textColor: 'text-white',
//       theme: {
//         primary: '#7c3aed',
//         secondary: '#8b5cf6',
//         accent: '#a78bfa',
//         gradient: 'from-[#7c3aed] via-[#8b5cf6] to-[#a78bfa]'
//       }
//     },
//     { 
//       id: 'googlepay', 
//       name: 'Google Pay', 
//       logo: googlepay,
//       color: 'bg-white',
//       textColor: 'text-white',
//       theme: {
//         primary: '#374151',
//         secondary: '#4b5563',
//         accent: '#6b7280',
//         gradient: 'from-[#374151] via-[#4b5563] to-[#6b7280]'
//       }
//     },
//     { 
//       id: 'amazonpay', 
//       name: 'Amazon Pay', 
//       logo: amazone,
//       color: 'bg-white',
//       textColor: 'text-white',
//       theme: {
//         primary: '#d97706',
//         secondary: '#f59e0b',
//         accent: '#fbbf24',
//         gradient: 'from-[#d97706] via-[#f59e0b] to-[#fbbf24]'
//       }
//     },
//     { 
//       id: 'mobikwik', 
//       name: 'MobiKwik', 
//       logo: mobikwik,
//       color: 'bg-white',
//       textColor: 'text-white',
//       theme: {
//         primary: '#1d4ed8',
//         secondary: '#3b82f6',
//         accent: '#60a5fa',
//         gradient: 'from-[#1d4ed8] via-[#3b82f6] to-[#60a5fa]'
//       }
//     }
//   ];

//   useEffect(() => {
//     if (topRef.current) {
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   }, []);

//   useEffect(() => {
//     if (isProcessing && processingRef.current) {
//       setTimeout(() => {
//         processingRef.current?.scrollIntoView({ behavior: 'smooth' });
//       }, 100);
//     }
//   }, [isProcessing]);

//   useEffect(() => {
//     if (isSuccess && successRef.current) {
//       setTimeout(() => {
//         successRef.current?.scrollIntoView({ behavior: 'smooth' });
//       }, 100);
//     }
//   }, [isSuccess]);

//   useEffect(() => {
//     if (selectedMethod === 'net-banking' && selectedBank) {
//       const bank = banks.find(b => b.id === selectedBank);
//       if (bank) {
//         setUiTheme(bank.theme);
//       }
//     } else if (selectedMethod === 'wallet' && selectedWallet) {
//       const wallet = wallets.find(w => w.id === selectedWallet);
//       if (wallet) {
//         setUiTheme(wallet.theme);
//       }
//     } else if (selectedMethod === 'card') {
//       if (cardDetails.cardType === 'visa') {
//         setUiTheme({
//           primary: '#1e40af',
//           secondary: '#3b82f6',
//           accent: '#60a5fa',
//           gradient: 'from-[#1e40af] via-[#3b82f6] to-[#60a5fa]'
//         });
//       } else if (cardDetails.cardType === 'mastercard') {
//         setUiTheme({
//           primary: '#dc2626',
//           secondary: '#ef4444',
//           accent: '#f87171',
//           gradient: 'from-[#dc2626] via-[#ef4444] to-[#f87171]'
//         });
//       } else {
//         const method = paymentMethods.find(m => m.id === selectedMethod);
//         if (method) {
//           setUiTheme(method.theme);
//         }
//       }
//     } else if (selectedMethod) {
//       const method = paymentMethods.find(m => m.id === selectedMethod);
//       if (method) {
//         setUiTheme(method.theme);
//       }
//     } else {
//       setUiTheme({
//         primary: '#be185d',
//         secondary: '#db2777',
//         accent: '#ec4899',
//         gradient: 'from-[#be185d] via-[#db2777] to-[#ec4899]'
//       });
//     }
//   }, [selectedMethod, selectedBank, selectedWallet, cardDetails.cardType]);

//   // Format price function
//   const formatPrice = () => {
//     const amount = parseFloat(paymentAmount) || 0;
//     return amount;
//   };

//   const handlePay = () => {
//     if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
//       alert('Please enter a valid payment amount');
//       return;
//     }
    
//     if (!selectedMethod) {
//       alert('Please select a payment method');
//       return;
//     }
    
//     if (selectedMethod === 'card' && (!cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvv)) {
//       alert('Please fill all card details');
//       return;
//     }
    
//     if (selectedMethod === 'net-banking' && !selectedBank) {
//       alert('Please select a bank');
//       return;
//     }

//     if (selectedMethod === 'wallet' && !selectedWallet) {
//       alert('Please select a wallet');
//       return;
//     }

//     if (selectedMethod === 'upi-id' && !upiId) {
//       alert('Please enter UPI ID');
//       return;
//     }

//     setIsProcessing(true);
    
//     setTimeout(() => {
//       setIsProcessing(false);
//       setIsSuccess(true);
//     }, 3000);
//   };

//   const handleMakeAnotherPayment = () => {
//     setSelectedMethod(null);
//     setSelectedBank('');
//     setSelectedWallet('');
//     setUpiId('');
//     setCardDetails({
//       cardNumber: '',
//       expiry: '',
//       cvv: '',
//       name: '',
//       cardType: 'visa'
//     });
//     setPaymentAmount('');
//     setIsSuccess(false);
//     setUiTheme({
//       primary: '#be185d',
//       secondary: '#db2777',
//       accent: '#ec4899',
//       gradient: 'from-[#be185d] via-[#db2777] to-[#ec4899]'
//     });
    
//     setTimeout(() => {
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }, 100);
//   };

//   const handleCardInputChange = (e) => {
//     const { name, value } = e.target;
//     let newValue = value;
    
//     if (name === 'cardNumber') {
//       newValue = value.replace(/\D/g, '');
//       if (newValue.startsWith('4')) {
//         setCardDetails(prev => ({ ...prev, cardType: 'visa' }));
//       } else if (newValue.startsWith('5')) {
//         setCardDetails(prev => ({ ...prev, cardType: 'mastercard' }));
//       }
//     }
    
//     setCardDetails(prev => ({
//       ...prev,
//       [name]: newValue
//     }));
//   };

//   const formatCardNumber = (value) => {
//     const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
//     const matches = v.match(/\d{4,16}/g);
//     const match = (matches && matches[0]) || '';
//     const parts = [];
    
//     for (let i = 0, len = match.length; i < len; i += 4) {
//       parts.push(match.substring(i, i + 4));
//     }
    
//     if (parts.length) {
//       return parts.join(' ');
//     } else {
//       return value;
//     }
//   };

//   const formatExpiry = (value) => {
//     const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
//     if (v.length >= 2) {
//       return v.substring(0, 2) + '/' + v.substring(2, 4);
//     }
//     return value;
//   };

//   const getSelectedWallet = () => {
//     return wallets.find(w => w.id === selectedWallet);
//   };

//   const getSelectedBank = () => {
//     return banks.find(b => b.id === selectedBank);
//   };

//   const getSelectedMethod = () => {
//     return paymentMethods.find(m => m.id === selectedMethod);
//   };

//   // Handle payment amount input
//   const handleAmountChange = (e) => {
//     const value = e.target.value.replace(/[^0-9.]/g, '');
//     setPaymentAmount(value);
//   };

//   return (
//     <div className={`min-h-screen bg-gradient-to-br from-[${uiTheme.primary}]/10 via-[${uiTheme.secondary}]/10 to-[${uiTheme.accent}]/10`}>
//       <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
//         <div className="flex flex-col items-center justify-center mb-4 sm:mb-6">
//           <div className="text-black p-0 sm:p-0 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-3 transform hover:scale-105 transition-transform duration-300">
//             <MdPayment className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-black" />
//           </div>
          
//           <div className="text-center">
//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black-800 mb-2 sm:mb-3">RazorPay Payment Gateway</h1>
//             <div className={`flex items-center justify-center bg-gradient-to-br from-[${uiTheme.primary}]/20 via-[${uiTheme.secondary}]/20 to-[${uiTheme.accent}]/20 px-4 sm:px-6 py-1 sm:py-2 rounded-full`}>
//               <MdSecurity className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black mr-1 sm:mr-2" />
//               <span className="text-sm sm:text-base md:text-lg font-medium text-black-700">Secure Payment Gateway</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-3 sm:px-4 pb-6 sm:pb-8">
//         <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-black-100">
//           {isProcessing ? (
//             <div ref={processingRef} className="p-4 sm:p-6 md:p-8 animate-fade-in">
//               <div className="text-center">
//                 <div className="flex justify-center mb-4 sm:mb-6">
//                   <Lottie
//                     animationData={PaymentLoading}
//                     style={{ width: 180, height: 180 }}
//                     loop={true}
//                     autoplay={true}
//                   />
//                 </div>
                
//                 <h1 className="text-2xl sm:text-3xl font-bold text-black mb-3 sm:mb-4">Processing Payment</h1>
//                 <p className="text-black-600 mb-6 sm:mb-8 text-base sm:text-lg">
//                   Please wait while we process your payment...
//                 </p>
                
//                 <div className="max-w-md mx-auto mb-6 sm:mb-8 px-4">
//                   <div className="w-full bg-black-200 rounded-full h-2">
//                     <div className={`bg-gradient-to-br ${uiTheme.gradient} h-2 rounded-full animate-progress`}></div>
//                   </div>
//                   <div className="flex justify-between mt-2">
//                     <span className="text-xs sm:text-sm text-black-500">Verifying</span>
//                     <span className="text-xs sm:text-sm text-black-500">Processing</span>
//                     <span className="text-xs sm:text-sm text-black-500">Complete</span>
//                   </div>
//                 </div>
                
//                 <div className={`bg-gradient-to-br from-[${uiTheme.primary}]/10 via-[${uiTheme.secondary}]/10 to-[${uiTheme.accent}]/10 rounded-xl p-4 sm:p-6 max-w-md mx-auto mb-6 sm:mb-8`}>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div className="text-left">
//                       <p className={`text-xs sm:text-sm font-medium text-[${uiTheme.primary}] mb-1`}>Amount</p>
//                       <p className="font-bold text-xl sm:text-2xl text-black-800">₹{formatPrice().toLocaleString('en-IN')}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className={`text-xs sm:text-sm font-medium text-[${uiTheme.primary}] mb-1`}>Method</p>
//                       <p className="font-semibold text-black-800 text-sm sm:text-base">
//                         {selectedMethod === 'upi-qr' ? 'UPI QR' : 
//                          selectedMethod === 'card' ? 'Credit/Debit Card' : 
//                          selectedMethod === 'net-banking' ? 'Net Banking' : 
//                          selectedMethod === 'upi-id' ? 'UPI ID' : 
//                          getSelectedWallet() ? getSelectedWallet().name : 'Wallet'}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center justify-center text-black-600 text-sm sm:text-base">
//                   <MdLock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-black" />
//                   <p className="text-xs sm:text-sm">Secured by 256-bit SSL encryption</p>
//                 </div>
//               </div>
//             </div>
//           ) : isSuccess ? (
//             <div ref={successRef} className="p-4 sm:p-6 md:p-8 animate-fade-in">
//               <div className="text-center">
//                 <div className="flex justify-center mb-2 sm:mb-4">
//                   <Lottie
//                     animationData={PaymentSuccessful}
//                     style={{ width: 220, height: 220 }}
//                     loop={false}
//                     autoplay={true}
//                   />
//                 </div>
                
//                 <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-3 sm:mb-4 animate-bounce">Payment Successful!</h1>
//                 <p className="text-black-600 mb-6 sm:mb-8 text-base sm:text-lg">Your payment has been successfully completed</p>
                
//                 <div className="bg-gradient-to-br from-black-50 to-black-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 max-w-2xl mx-auto mb-6 sm:mb-10 border border-black-200 - backdrop-blur-sm bg-white/80">
//                   <div className="bg-white p-6 sm:p-8 rounded-xl border border-black-200 duration-300">
//                     <div className="space-y-4">
//                       <div className="flex justify-between items-center">
//                         <span className="text-sm font-medium text-black-600">Transaction ID</span>
//                         <span className="font-bold text-black text-lg">TX{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
//                       </div>
                      
//                       <div className="flex justify-between items-center">
//                         <span className="text-sm font-medium text-black-600">Amount</span>
//                         <span className="font-bold text-black-800 text-2xl">₹{formatPrice().toLocaleString('en-IN')}</span>
//                       </div>
                      
//                       <div className="flex justify-between items-center">
//                         <span className="text-sm font-medium text-black-600">Payment Method</span>
//                         <span className="font-semibold text-black-800">
//                           {selectedMethod === 'upi-qr' ? 'UPI QR' : 
//                            selectedMethod === 'card' ? 'Credit/Debit Card' : 
//                            selectedMethod === 'net-banking' ? 'Net Banking' : 
//                            selectedMethod === 'upi-id' ? 'UPI ID' : 
//                            getSelectedWallet() ? getSelectedWallet().name : 'Wallet'}
//                         </span>
//                       </div>
                      
//                       <div className="flex justify-between items-center">
//                         <span className="text-sm font-medium text-black-600">Status</span>
//                         <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-br from-[${uiTheme.primary}]/20 via-[${uiTheme.secondary}]/20 to-[${uiTheme.accent}]/20 text-[${uiTheme.primary}] animate-pulse`}>
//                           <MdCheckCircle className="w-4 h-4 mr-2 text-black" />
//                           Completed
//                         </span>
//                       </div>
                      
//                       <div className="flex justify-between items-center">
//                         <span className="text-sm font-medium text-black-600">Date & Time</span>
//                         <span className="font-semibold text-black-800 text-sm text-right">
//                           {(new Date()).toLocaleDateString('en-IN', { 
//                             weekday: 'long', 
//                             year: 'numeric', 
//                             month: 'long', 
//                             day: 'numeric',
//                             hour: '2-digit',
//                             minute: '2-digit'
//                           })}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="space-y-3 sm:space-y-4 max-w-md mx-auto mb-8 sm:mb-12 px-4">
//                   <button
//                     onClick={handleMakeAnotherPayment}
//                     className={`w-full bg-black text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center animate-pulse`}
//                   >
//                     <MdAttachMoney className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-white" />
//                     Make Another Payment
//                   </button>
//                 </div>
                
//                 <div className="border-t border-black-200 pt-6 sm:pt-8">
//                   <p className="text-xs sm:text-sm text-black-500 mb-4 sm:mb-6">Secured by RazorPay</p>
//                   <div className="flex items-center justify-center space-x-4 sm:space-x-8">
//                     <div className="text-center transform hover:scale-110 transition-transform duration-300">
//                       <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[${uiTheme.primary}]/10 via-[${uiTheme.secondary}]/10 to-[${uiTheme.accent}]/10 rounded-lg flex items-center justify-center mx-auto mb-1 sm:mb-2`}>
//                         <MdSecurity className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
//                       </div>
//                       <span className="text-xs text-black-500">256-bit SSL</span>
//                     </div>
//                     <div className="text-center transform hover:scale-110 transition-transform duration-300">
//                       <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[${uiTheme.primary}]/10 via-[${uiTheme.secondary}]/10 to-[${uiTheme.accent}]/10 rounded-lg flex items-center justify-center mx-auto mb-1 sm:mb-2`}>
//                         <span className="text-xs sm:text-sm font-bold text-black">PCI</span>
//                       </div>
//                       <span className="text-xs text-black-500">PCI DSS</span>
//                     </div>
//                     <div className="text-center transform hover:scale-110 transition-transform duration-300">
//                       <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[${uiTheme.primary}]/10 via-[${uiTheme.secondary}]/10 to-[${uiTheme.accent}]/10 rounded-lg flex items-center justify-center mx-auto mb-1 sm:mb-2`}>
//                         <span className="text-xs sm:text-sm font-bold text-black">RBI</span>
//                       </div>
//                       <span className="text-xs text-black-500">RBI Approved</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div ref={topRef} className="p-4 sm:p-6 md:p-8">
//               <div className={`bg-gradient-to-br ${uiTheme.gradient} rounded-t-xl sm:rounded-t-2xl -mx-4 sm:-mx-6 md:-mx-8 -mt-4 sm:-mt-6 md:-mt-8 px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 mb-6 sm:mb-10`}>
//                 <div className="max-w-md mx-auto">
//                   <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-3 sm:mb-4 text-center">Enter Payment Amount</h2>
//                   <div className="relative">
                  
//                     <input
//                       type="text"
//                       value={paymentAmount}
//                       onChange={handleAmountChange}
//                       placeholder="Enter amount"
//                       className=" py-5 text-4xl sm:text-4xl md:text-4xl text-black font-bold w-full bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl border-2 border-transparent focus:border-white focus:ring-2 sm:focus:ring-4 focus:ring-white/20 focus:outline-none transition-all duration-300 pl-5 sm:pl-5  text-black placeholder-white/50 text-center sm:text-left"
//                     />
//                   </div>
//                   <p className="text-black text-center mt-3 sm:mt-4 text-base sm:text-lg">
//                     {paymentAmount ? `Amount: ₹${formatPrice().toLocaleString('en-IN')}` : 'Enter payment amount above'}
//                   </p>
//                 </div>
//               </div>

//               <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 -mt-8 relative z-10">
//                 <div className="mb-8 sm:mb-10">
//                   <h2 className="text-lg sm:text-xl font-bold text-black-800 mb-4 sm:mb-6 flex items-center">
//                     <MdPayment className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-black" />
//                     Choose Payment Method
//                   </h2>
                  
//                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
//                     {paymentMethods.map((method) => {
//                       const Icon = method.icon;
//                       const isSelected = selectedMethod === method.id;
                      
//                       return (
//                         <button
//                           key={method.id}
//                           onClick={() => {
//                             setSelectedMethod(method.id);
//                             setUiTheme(method.theme);
//                             if (method.id !== 'net-banking') setSelectedBank('');
//                             if (method.id !== 'wallet') setSelectedWallet('');
//                           }}
//                           className={`flex flex-col items-center justify-center p-3 sm:p-4 md:p-5 border-2 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 relative rounded-xl ${
//                             isSelected
//                               ? `bg-gradient-to-br ${uiTheme.gradient} text-white border-transparent`
//                               : 'border-black-200 hover:border-black-300 bg-white'
//                           }`}
//                         >
//                           <div className={`mb-2 sm:mb-3 p-2 sm:p-3 rounded-full ${
//                             isSelected ? 'bg-white/20 text-white' : 'bg-black-100'
//                           }`}>
//                             <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-black" />
//                           </div>
//                           <span className={`font-semibold mb-1 text-sm sm:text-base ${isSelected ? 'text-white' : 'text-black-800'}`}>
//                             {method.name}
//                           </span>
//                           <span className={`text-xs ${isSelected ? 'text-white/90' : 'text-black-500'} text-center`}>
//                             {method.description}
//                           </span>
//                           {isSelected && (
//                             <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center animate-bounce">
//                               <MdCheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
//                             </div>
//                           )}
//                         </button>
//                       );
//                     })}
//                   </div>

//                   {selectedMethod === 'upi-qr' && (
//                     <div className="border-t border-black-200 pt-6 sm:pt-8 animate-fade-in">
//                       <div className={`bg-gradient-to-br from-[${uiTheme.primary}]/10 via-[${uiTheme.secondary}]/10 to-[${uiTheme.accent}]/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-[${uiTheme.primary}]/20`}>
//                         <div className="max-w-2xl mx-auto">
//                           <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
//                             <div className="text-center mb-6 sm:mb-8">
//                               <div className={`inline-flex items-center justify-center p-3 sm:p-4 bg-gradient-to-br from-[${uiTheme.primary}]/20 via-[${uiTheme.secondary}]/20 to-[${uiTheme.accent}]/20 rounded-full mb-3 sm:mb-4`}>
//                                 <FaQrcode className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-black" />
//                               </div>
//                               <h3 className="text-xl sm:text-2xl font-bold text-black mb-2">Scan QR Code</h3>
//                               <p className="text-black-600 text-sm sm:text-base">Use any UPI app to scan</p>
//                             </div>
                            
//                             <div className="flex flex-col lg:flex-row gap-6 items-center">
//                               <div className="flex-1 w-full">
//                                 <div className={`bg-gradient-to-br ${uiTheme.gradient} p-4 sm:p-6 rounded-2xl`}>
//                                   <div className="bg-white p-4 sm:p-6 rounded-xl">
//                                     <img className='w-full object-cover' src={barcode} alt="QR Code"/>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
                            
//                             <div className="mt-6 sm:mt-8 text-center">
//                               <p className="text-xs sm:text-sm text-black-600 flex items-center justify-center">
//                                 <img src={barcode} className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
//                                 QR code expires in 5 minutes
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {selectedMethod === 'card' && (
//                     <div className="border-t border-black-200 pt-6 sm:pt-8 animate-fade-in">
//                       <div className={`bg-gradient-to-br from-[${uiTheme.primary}]/10 via-[${uiTheme.secondary}]/10 to-[${uiTheme.accent}]/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-[${uiTheme.primary}]/20`}>
//                         <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6 flex items-center">
//                           <FaCreditCard className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mr-2 sm:mr-3 text-black" />
//                           Enter Card Details
//                         </h3>
                        
//                         <div className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white mb-6 sm:mb-8 w-full transform hover:scale-[1.02] transition-transform duration-300 bg-gradient-to-br ${uiTheme.gradient}`}>
//                           <div className="flex justify-between items-start mb-4 sm:mb-6">
//                             <div>
//                               <p className="text-xs text-white/80 mb-1">CARD NUMBER</p>
//                               <p className="text-lg sm:text-xl font-mono tracking-widest">
//                                 {cardDetails.cardNumber ? formatCardNumber(cardDetails.cardNumber) : '•••• •••• •••• ••••'}
//                               </p>
//                             </div>
//                             <div className="text-right">
//                               <p className="text-xs text-white/80 mb-1">VALID THRU</p>
//                               <p className="text-base sm:text-lg font-mono">
//                                 {cardDetails.expiry || 'MM/YY'}
//                               </p>
//                             </div>
//                           </div>
//                           <div className="flex justify-between items-end">
//                             <div>
//                               <p className="text-xs text-white/80 mb-1">CARDHOLDER NAME</p>
//                               <p className="text-base sm:text-lg font-medium tracking-wide">
//                                 {cardDetails.name.toUpperCase() || 'YOUR NAME'}
//                               </p>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               {cardDetails.cardType === 'visa' ? (
//                                 <div className="w-12 h-8 sm:w-16 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
//                                   <SiVisa className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
//                                 </div>
//                               ) : (
//                                 <div className="w-12 h-8 sm:w-16 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
//                                   <SiMastercard className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                           <div className="absolute top-4 right-4 opacity-20">
//                             <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-white/30 to-transparent blur-lg"></div>
//                           </div>
//                         </div>
                        
//                         <div className="bg-white rounded-xl p-4 sm:p-6">
//                           <div className="space-y-4 sm:space-y-6">
//                             <div>
//                               <label className="block text-sm font-medium text-black-700 mb-2 flex items-center">
//                                 <MdPayment className="w-4 h-4 mr-2 text-black" />
//                                 Card Number
//                               </label>
//                               <div className="relative">
//                                 <input
//                                   type="text"
//                                   name="cardNumber"
//                                   value={formatCardNumber(cardDetails.cardNumber)}
//                                   onChange={handleCardInputChange}
//                                   placeholder="1234 5678 9012 3456"
//                                   maxLength="19"
//                                   className="w-full px-3 sm:px-4 py-3 sm:py-4 pl-10 sm:pl-12 border-2 border-black-300 rounded-xl focus:ring-2 focus:ring-[#be185d] focus:border-[#be185d] transition-all duration-300 text-base sm:text-lg"
//                                 />
//                                 <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2">
//                                   {cardDetails.cardType === 'visa' ? (
//                                     <SiVisa className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
//                                   ) : (
//                                     <SiMastercard className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
                            
//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                               <div>
//                                 <label className="block text-sm font-medium text-black-700 mb-2">Expiry Date</label>
//                                 <input
//                                   type="text"
//                                   name="expiry"
//                                   value={formatExpiry(cardDetails.expiry)}
//                                   onChange={handleCardInputChange}
//                                   placeholder="MM/YY"
//                                   maxLength="5"
//                                   className="w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-black-300 rounded-xl focus:ring-2 focus:ring-[#be185d] focus:border-[#be185d] transition-all duration-300 text-base sm:text-lg"
//                                 />
//                               </div>
                              
//                               <div>
//                                 <label className="block text-sm font-medium text-black-700 mb-2">CVV</label>
//                                 <div className="relative">
//                                   <input
//                                     type="password"
//                                     name="cvv"
//                                     value={cardDetails.cvv}
//                                     onChange={handleCardInputChange}
//                                     placeholder="123"
//                                     maxLength="3"
//                                     className="w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-black-300 rounded-xl focus:ring-2 focus:ring-[#be185d] focus:border-[#be185d] transition-all duration-300 text-base sm:text-lg"
//                                   />
//                                   <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
//                                     <MdLock className="w-4 h-4 sm:w-5 sm:h-5 text-black-400" />
//                                   </div>
//                                 </div>
//                               </div>
                              
//                               <div className="sm:col-span-2 lg:col-span-1">
//                                 <label className="block text-sm font-medium text-black-700 mb-2">Cardholder Name</label>
//                                 <input
//                                   type="text"
//                                   name="name"
//                                   value={cardDetails.name}
//                                   onChange={handleCardInputChange}
//                                   placeholder="John Doe"
//                                   className="w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-black-300 rounded-xl focus:ring-2 focus:ring-[#be185d] focus:border-[#be185d] transition-all duration-300 text-base sm:text-lg"
//                                 />
//                               </div>
//                             </div>
                            
//                             <div className={`flex items-center text-sm text-black-700 bg-gradient-to-br from-[${uiTheme.primary}]/10 via-[${uiTheme.secondary}]/10 to-[${uiTheme.accent}]/10 p-3 sm:p-4 rounded-lg border border-[${uiTheme.primary}]/20`}>
//                               <MdSecurity className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-black" />
//                               Your card details are secure and encrypted with 256-bit SSL
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {selectedMethod === 'upi-id' && (
//                     <div className="border-t border-black-200 pt-6 sm:pt-8 animate-fade-in">
//                       <div className={`bg-gradient-to-br from-[${uiTheme.primary}]/10 via-[${uiTheme.secondary}]/10 to-[${uiTheme.accent}]/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-[${uiTheme.primary}]/20`}>
//                         <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
//                           <div className="text-center mb-6 sm:mb-8">
//                             <div className={`inline-flex items-center justify-center p-3 sm:p-4 bg-gradient-to-br from-[${uiTheme.primary}]/20 via-[${uiTheme.secondary}]/20 to-[${uiTheme.accent}]/20 rounded-full mb-3 sm:mb-4`}>
//                               <FaMobileAlt className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-black" />
//                             </div>
//                             <h3 className="text-xl sm:text-2xl font-bold text-black mb-2">UPI ID Payment</h3>
//                             <p className="text-black-600 text-sm sm:text-base">Enter your UPI ID to receive payment request</p>
//                           </div>
                          
//                           <div className="max-w-md mx-auto">
//                             <label className="block text-sm font-medium text-black-700 mb-2">
//                               Enter UPI ID
//                             </label>
//                             <div className="relative">
//                               <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2">
//                                 <svg className="w-5 h-5 sm:w-6 sm:h-6 text-black-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                                 </svg>
//                               </div>
//                               <input
//                                 type="text"
//                                 value={upiId}
//                                 onChange={(e) => setUpiId(e.target.value)}
//                                 placeholder="yourname@upi"
//                                 className="w-full px-10 sm:px-14 py-3 sm:py-4 border-2 border-black-300 rounded-xl focus:ring-2 focus:ring-[#be185d] focus:border-[#be185d] transition-all duration-300 text-base sm:text-lg"
//                               />
//                               <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
//                                 <span className="text-black-500 text-xs sm:text-sm">@upi</span>
//                               </div>
//                             </div>
//                             <p className="text-xs sm:text-sm text-black-500 mt-2">Enter your UPI ID to receive payment request on your app</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {selectedMethod === 'net-banking' && (
//                     <div className="pt-6 sm:pt-8 animate-fade-in">
//                       <div className={`bg-gradient-to-br from-[${uiTheme.primary}]/10 via-[${uiTheme.secondary}]/10 to-[${uiTheme.accent}]/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-[${uiTheme.primary}]/20`}>
//                         <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6 flex items-center justify-center">
//                           <RiBankFill className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mr-2 sm:mr-3 text-black" />
//                           Select Your Bank
//                         </h3>
                        
//                         <div className="bg-white rounded-xl p-4 sm:p-6">
//                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
//                             {banks.map((bank) => {
//                               const isSelected = selectedBank === bank.id;
                              
//                               return (
//                                 <button
//                                   key={bank.id}
//                                   onClick={() => {
//                                     setSelectedBank(bank.id);
//                                     setUiTheme(bank.theme);
//                                   }}
//                                   className={`flex items-center justify-between p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 ${
//                                     isSelected
//                                       ? `border-2 border-[${uiTheme.primary}] ${bank.color}`
//                                       : 'border-black-200 hover:border-black-300 bg-white'
//                                   }`}
//                                 >
//                                   <div className="flex items-center">
//                                     <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mr-3 text-sm sm:text-base md:text-lg font-bold ${bank.color} ${bank.textColor}`}>
//                                       {bank.logo}
//                                     </div>
//                                     <div className="text-left">
//                                       <span className={`font-bold block text-sm sm:text-base ${isSelected ? 'text-white' : 'text-black-800'}`}>{bank.name}</span>
//                                       <span className={`text-xs ${isSelected ? 'text-white/90' : 'text-black-500'}`}>Secure net banking</span>
//                                     </div>
//                                   </div>
//                                   {isSelected && (
//                                     <div className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 ${bank.color} rounded-full flex items-center justify-center animate-pulse`}>
//                                       <MdCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                                     </div>
//                                   )}
//                                 </button>
//                               );
//                             })}
//                           </div>
                          
//                           {selectedBank && (
//                             <div className={`p-4 sm:p-6 rounded-xl border ${getSelectedBank()?.color} border-opacity-30`}>
//                               <div className="flex flex-col sm:flex-row items-center justify-between mb-3 sm:mb-4">
//                                 <div className="flex items-center mb-3 sm:mb-0">
//                                   <div className={`w-10 h-10 sm:w-12 sm:h-12 ${getSelectedBank()?.color} rounded-lg flex items-center justify-center mr-3 text-white text-sm sm:text-base md:text-lg font-bold`}>
//                                     {getSelectedBank()?.logo}
//                                   </div>
//                                   <div>
//                                     <p className="font-bold text-black-800 text-base sm:text-lg">{getSelectedBank()?.name}</p>
//                                     <p className="text-xs sm:text-sm text-black-600">Secure redirect to bank login</p>
//                                   </div>
//                                 </div>
//                                 <div className="text-right">
//                                   <p className="text-xs sm:text-sm text-black-500">Amount</p>
//                                   <p className="text-lg sm:text-xl font-bold text-black-800">₹{formatPrice().toLocaleString('en-IN')}</p>
//                                 </div>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {selectedMethod === 'wallet' && (
//                     <div className="border-t border-black-200 pt-6 sm:pt-8 animate-fade-in">
//                       <div className={`bg-gradient-to-br from-[${uiTheme.primary}]/10 via-[${uiTheme.secondary}]/10 to-[${uiTheme.accent}]/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-[${uiTheme.primary}]/20`}>
//                         <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
//                           <div className="text-center mb-6 sm:mb-8">
//                             <div className={`inline-flex items-center justify-center p-3 sm:p-4 bg-gradient-to-br from-[${uiTheme.primary}]/20 via-[${uiTheme.secondary}]/20 to-[${uiTheme.accent}]/20 rounded-full mb-3 sm:mb-4`}>
//                               <FaWallet className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-black" />
//                             </div>
//                             <h3 className="text-xl sm:text-2xl font-bold text-black-800 mb-2">Choose Wallet</h3>
//                             <p className="text-black-600 text-sm sm:text-base">Select your preferred wallet for payment</p>
//                           </div>
                          
//                           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
//                             {wallets.map((wallet) => {
//                               const isSelected = selectedWallet === wallet.id;
                              
//                               return (
//                                 <button
//                                   key={wallet.id}
//                                   onClick={() => {
//                                     setSelectedWallet(wallet.id);
//                                     setUiTheme(wallet.theme);
//                                   }}
//                                   className={`flex flex-col items-center justify-center p-3 sm:p-4 md:p-5 rounded-xl border-2 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 ${
//                                     isSelected
//                                       ? `border-2 border-[${uiTheme.primary}] ${wallet.color}`
//                                       : 'border-black-200 hover:border-black-300 bg-white'
//                                   }`}
//                                 >
//                                   <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-2xl mb-2 sm:mb-3 ${wallet.color}`}>
//                                    <img src={wallet.logo} alt={wallet.name} className="w-10 h-10 sm:w-10 sm:h-10 md:w-20 md:h-20 object-contain" />
//                                   </div>
//                                   <span className={`font-semibold text-center text-xs sm:text-sm md:text-base ${isSelected ? 'text-black' : 'text-black-800'}`}>{wallet.name}</span>
//                                   {isSelected && (
//                                     <div className={`mt-1 sm:mt-2 w-5 h-5 sm:w-6 sm:h-6 ${wallet.color} rounded-full flex items-center justify-center animate-pulse`}>
//                                       <MdCheckCircle className="w-3 h-3 sm:w-3 sm:h-3 text-white" />
//                                     </div>
//                                   )}
//                                 </button>
//                               );
//                             })}
//                           </div>
                          
//                           {selectedWallet && (
//                             <div className={`p-4 sm:p-6 rounded-xl border ${getSelectedWallet()?.color} border-opacity-30`}>
//                               <div className="flex flex-col sm:flex-row items-center justify-between">
//                                 <div className="flex items-center mb-3 sm:mb-0">
//                                   <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-2xl mr-3 sm:mr-4 ${getSelectedWallet()?.color} text-white`}>
//                                     <img src={getSelectedWallet()?.logo} 
//                                          alt={getSelectedWallet()?.name} 
//                                          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain" />
//                                   </div>
//                                   <div>
//                                     <p className="font-bold text-black-800 text-base sm:text-lg md:text-xl">{getSelectedWallet()?.name}</p>
//                                     <p className="text-xs sm:text-sm text-black-600">Instant payment</p>
//                                   </div>
//                                 </div>
//                                 <div className="text-right">
//                                   <p className="text-xs sm:text-sm text-black-500">Amount</p>
//                                   <p className="text-lg sm:text-xl md:text-2xl font-bold text-black-800">₹{formatPrice().toLocaleString('en-IN')}</p>
//                                 </div>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <div className="mb-6 sm:mb-8">
//                   <button
//                     onClick={handlePay}
//                     className={`w-full bg-gradient-to-br ${uiTheme.gradient} text-white py-3 sm:py-4 px-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover: flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none animate-pulse`}
//                     disabled={
//                       !paymentAmount || 
//                       parseFloat(paymentAmount) <= 0 ||
//                       !selectedMethod || 
//                       (selectedMethod === 'card' && (!cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvv)) ||
//                       (selectedMethod === 'net-banking' && !selectedBank) ||
//                       (selectedMethod === 'wallet' && !selectedWallet) ||
//                       (selectedMethod === 'upi-id' && !upiId)
//                     }
//                   >
//                     <span>PAY NOW ₹{formatPrice().toLocaleString('en-IN')}</span>
//                     <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
//                     </svg>
//                   </button>
                  
//                   {!paymentAmount || parseFloat(paymentAmount) <= 0 ? (
//                     <p className="text-center text-black-500 mt-2 sm:mt-3 text-sm sm:text-base">Please enter a valid payment amount to continue</p>
//                   ) : !selectedMethod ? (
//                     <p className="text-center text-black-500 mt-2 sm:mt-3 text-sm sm:text-base">Please select a payment method to continue</p>
//                   ) : null}
//                 </div>

//                 <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-black-500">
//                   <p>By proceeding, you agree to our <a href="#" className={`text-[${uiTheme.primary}] hover:underline`}>Terms of Service</a> and <a href="#" className={`text-[${uiTheme.primary}] hover:underline`}>Privacy Policy</a></p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes spin {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }
        
//         @keyframes progress {
//           0% {
//             width: 0%;
//           }
//           100% {
//             width: 100%;
//           }
//         }
        
//         @keyframes checkmark {
//           0% {
//             stroke-dashoffset: 100;
//             opacity: 0;
//           }
//           100% {
//             stroke-dashoffset: 0;
//             opacity: 1;
//           }
//         }
        
//         @keyframes ping {
//           75%, 100% {
//             transform: scale(2);
//             opacity: 0;
//           }
//         }
        
//         @keyframes bounce {
//           0%, 100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//         }
        
//         @keyframes success-pulse {
//           0%, 100% {
//             box-shadow: 0 0 20px rgba(190, 24, 93, 0.5);
//           }
//           50% {
//             box-shadow: 0 0 40px rgba(190, 24, 93, 0.8), 0 0 60px rgba(190, 24, 93, 0.6);
//           }
//         }
        
//         .animate-fade-in {
//           animation: fade-in 0.5s ease-out;
//         }
        
//         .animate-spin {
//           animation: spin 1s linear infinite;
//         }
        
//         .animate-progress {
//           animation: progress 3s ease-in-out;
//         }
        
//         .animate-checkmark {
//           stroke-dasharray: 100;
//           stroke-dashoffset: 100;
//           animation: checkmark 0.6s ease-in-out forwards;
//           animation-delay: 0.2s;
//         }
        
//         .animate-ping {
//           animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
//         }
        
//         .animate-bounce {
//           animation: bounce 0.5s ease-in-out;
//         }
        
//         .animate-success-pulse {
//           animation: success-pulse 2s ease-in-out infinite;
//         }
        
//         .animate-pulse {
//           animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//         }
        
//         @keyframes pulse {
//           0%, 100% {
//             opacity: 1;
//           }
//           50% {
//             opacity: 0.8;
//           }
//         }
        
//         .border-gradient {
//           border-image: linear-gradient(to right, #be185d, #ec4899) 1;
//         }
        
//         ::-webkit-scrollbar {
//           width: 0px;
//         }
        
//         ::-webkit-scrollbar-track {
//           background: #f1f1f1;
//           border-radius: 10px;
//         }
        
//         ::-webkit-scrollbar-thumb {
//           background: linear-gradient(to bottom, #be185d, #ec4899);
//           border-radius: 10px;
//         }
        
//         ::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(to bottom, #be185d, #ec4899);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Payment;