// // // // import {
// // // //   FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaLinkedinIn
// // // // } from "react-icons/fa";
// // // // import { Link } from "react-router-dom";

// // // // const Footer = () => {
// // // //   return (
// // // //     <footer className="bg-white text-black w-full pt-16">
// // // //       <div className="max-w-7xl mx-auto px-6">
        
// // // //         {/* MAIN CONTENT GRID */}
// // // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12">
          
// // // //           {/* 1. ABOUT US SECTION (Wider) */}
// // // //           <div className="lg:col-span-4 space-y-6">
// // // //             <h3 className="text- font-bold text-lg uppercase tracking-wider">About Us</h3>
// // // //             <p className="text-sm leading-7 text-black">
// // // //               Our company <span className="font-bold text-black">Puspendra</span> has been a leader in the beauty industry for years. We provide the best quality range of authentic skincare, professional makeup, and luxury beauty essentials.
// // // //             </p>
// // // //             {/* Social Icons with Circular Borders */}
// // // //             <div className="flex gap-3 ">
// // // //               {[FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaLinkedinIn].map((Icon, i) => (
// // // //                 <div key={i} className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-[#D4AF37] hover:text-white hover:border-[#D4AF37] transition-all">
// // // //                   <Icon size={14} />
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //           </div>

// // // //           {/* 2. MORE RESOURCES */}
// // // //           <div className="lg:col-span-2">
// // // //             <h3 className="text-black font-bold text-lg uppercase tracking-wider mb-6">Resources</h3>
// // // //             <ul className="space-y-3 text-sm">
// // // //               <li><Link to="/about" className="hover:text-[#D4AF37] transition-colors">About</Link></li>
// // // //               <li><Link to="/blog" className="hover:text-[#D4AF37] transition-colors">Blog</Link></li>
// // // //               <li><Link to="/contact" className="hover:text-[#D4AF37] transition-colors">Contact</Link></li>
// // // //               <li><Link to="/privacy" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</Link></li>
// // // //             </ul>
// // // //           </div>

// // // //           {/* 3. PRODUCT CATEGORIES */}
// // // //           <div className="lg:col-span-3">
// // // //             <h3 className="text-black font-bold text-lg uppercase tracking-wider mb-6">Categories</h3>
// // // //             <ul className="space-y-3 text-sm">
// // // //               <li><Link to="#" className="hover:text-[#D4AF37]">Triply cookware </Link></li>
// // // //               <li><Link to="#" className="hover:text-[#D4AF37]">Thermoware </Link></li>
// // // //               <li><Link to="#" className="hover:text-[#D4AF37]">Lunchbox</Link></li>
// // // //               <li><Link to="#" className="hover:text-[#D4AF37]">Cookware sets</Link></li>
// // // //               <li><Link to="#" className="hover:text-[#D4AF37]">Steel bottles</Link></li>
// // // //             </ul>
// // // //           </div>

// // // //           {/* 4. CONTACT US */}
// // // //           <div className="lg:col-span-3 space-y-6">
// // // //             <h3 className="text-black font-bold text-lg uppercase tracking-wider">Contact Us</h3>
// // // //             <div className="space-y-4">
// // // //               <p className="text-sm font-medium text-gray-800">
// // // //                 Call us at: <br />
// // // //                 <span className="text-lg font-bold text-[#D4AF37]">+9155655655656</span>
// // // //               </p>
// // // //               <p className="text-xs text-gray-400 uppercase tracking-widest">
// // // //                 Registered Office: <br />
// // // //                 <span className="normal-case text-gray-500">Moradabad, UP, India</span>
// // // //               </p>
// // // //             </div>
// // // //           </div>

// // // //         </div>

// // // //         {/* BOTTOM BAR (Copyright Area) */}
// // // //         <div className="border-t border-black py-6 flex flex-col md:flex-row justify-between items-center text-[14px] text-black tracking-widest">
// // // //           <p>© 2026 Puspendra . All Rights Reserved.</p>
// // // //           <div className="flex gap-4 mt-4 md:mt-0">
// // // //              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3 opacity-50" />
// // // //              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-3 opacity-50" />
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </footer>
// // // //   );
// // // // };

// // // // export default Footer;

// // // import {
// // //   FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaLinkedinIn
// // // } from "react-icons/fa";
// // // import { Link } from "react-router-dom";

// // // import logo from "../../assets/Images/LogoShoping.png";

// // // const Footer = () => {
// // //   return (
// // //     <footer className="bg-white text-black w-full pt-16">

// // //       <div className="max-w-7xl mx-auto px-6">

// // //         {/* MAIN GRID */}
// // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12">

// // //           {/* ABOUT */}
// // //           <div className="lg:col-span-4 space-y-6">

// // //             {/* LOGO ADDED */}
// // //             <div>
// // //               <img
// // //                 src={logo}
// // //                 alt="Logo"
// // //                 className="h-14 w-auto object-contain"
// // //               />
// // //             </div>

// // //             <h3 className="font-bold text-lg uppercase tracking-wider">
// // //               About Us
// // //             </h3>

// // //             <p className="text-sm leading-7 text-black">
// // //               Our company <span className="font-bold">Puspendra</span> has been a leader in the beauty industry for years. We provide the best quality range of authentic skincare, professional makeup, and luxury beauty essentials.
// // //             </p>

// // //             {/* SOCIAL */}
// // //             <div className="flex gap-3">
// // //               {[FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaLinkedinIn].map((Icon, i) => (
// // //                 <div
// // //                   key={i}
// // //                   className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-all"
// // //                 >
// // //                   <Icon size={14} />
// // //                 </div>
// // //               ))}
// // //             </div>

// // //           </div>

// // //           {/* RESOURCES */}
// // //           <div className="lg:col-span-2">
// // //             <h3 className="font-bold text-lg uppercase mb-6">Resources</h3>
// // //             <ul className="space-y-3 text-sm">
// // //               <li><Link to="/about" className="hover:text-black">About</Link></li>
// // //               <li><Link to="/blog" className="hover:text-black">Blog</Link></li>
// // //               <li><Link to="/contact" className="hover:text-black">Contact</Link></li>
// // //               <li><Link to="/privacy" className="hover:text-black">Privacy Policy</Link></li>
// // //             </ul>
// // //           </div>

// // //           {/* CATEGORIES */}
// // //           <div className="lg:col-span-3">
// // //             <h3 className="font-bold text-lg uppercase mb-6">Categories</h3>
// // //             <ul className="space-y-3 text-sm">
// // //               <li><Link to="#">Triply cookware</Link></li>
// // //               <li><Link to="#">Thermoware</Link></li>
// // //               <li><Link to="#">Lunchbox</Link></li>
// // //               <li><Link to="#">Cookware sets</Link></li>
// // //               <li><Link to="#">Steel bottles</Link></li>
// // //             </ul>
// // //           </div>

// // //           {/* CONTACT */}
// // //           <div className="lg:col-span-3 space-y-6">
// // //             <h3 className="font-bold text-lg uppercase">Contact Us</h3>

// // //             <p className="text-sm">
// // //               Call us at: <br />
// // //               <span className="text-lg font-bold text-black">
// // //                 +9155655655656
// // //               </span>
// // //             </p>

// // //             <p className="text-xs text-gray-500">
// // //               Registered Office: <br />
// // //               Moradabad, UP, India
// // //             </p>
// // //           </div>

// // //         </div>

// // //         {/* BOTTOM BAR */}
// // //         <div className="border-t border-gray-200 py-6 flex flex-col md:flex-row justify-between items-center text-sm">

// // //           <p>© 2026 Puspendra. All Rights Reserved.</p>

// // //           <div className="flex gap-4 mt-4 md:mt-0 opacity-60">
// // //             <img
// // //               src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
// // //               alt="Visa"
// // //               className="h-3"
// // //             />
// // //             <img
// // //               src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
// // //               alt="Paypal"
// // //               className="h-3"
// // //             />
// // //           </div>

// // //         </div>

// // //       </div>
// // //     </footer>
// // //   );
// // // };

// // // export default Footer;


// // import {
// //   FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaLinkedinIn, FaGlobe
// // } from "react-icons/fa";
// // import { Link, useNavigate } from "react-router-dom";

// // import logo from "../../assets/Images/LogoShoping.png";

// // const Footer = () => {
// //   const navigate = useNavigate();

// //   // Globe click handler - Home page par le jayega
// //   const handleGlobeClick = () => {
// //     navigate('/');
// //   };

// //   return (
// //     <footer className="bg-white text-black w-full pt-16">
// //       <div className="max-w-7xl mx-auto px-6">

// //         {/* MAIN GRID */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12">

// //           {/* ABOUT */}
// //           <div className="lg:col-span-4 space-y-6">

// //             {/* LOGO */}
// //             <div>
// //               <img
// //                 src={logo}
// //                 alt="Logo"
// //                 className="h-14 w-auto object-contain"
// //               />
// //             </div>

// //             <h3 className="font-bold text-lg uppercase tracking-wider">
// //               About Us
// //             </h3>

// //             <p className="text-sm leading-7 text-black">
// //            Moradabad, Uttar Pradesh, 244001
// //             </p>

// //             {/* SOCIAL ICONS - Color #8B1E2D */}
// //             <div className="flex gap-3">
// //               {[FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaLinkedinIn].map((Icon, i) => (
// //                 <div
// //                   key={i}
// //                   className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center cursor-pointer transition-all"
// //                   style={{ color: '#8B1E2D' }}
// //                   onMouseEnter={(e) => {
// //                     e.currentTarget.style.backgroundColor = '#8B1E2D';
// //                     e.currentTarget.style.color = 'white';
// //                     e.currentTarget.style.borderColor = '#8B1E2D';
// //                   }}
// //                   onMouseLeave={(e) => {
// //                     e.currentTarget.style.backgroundColor = 'transparent';
// //                     e.currentTarget.style.color = '#8B1E2D';
// //                     e.currentTarget.style.borderColor = '#E5E7EB';
// //                   }}
// //                 >
// //                   <Icon size={14} />
// //                 </div>
// //               ))}
// //             </div>

// //           </div>

// //           {/* RESOURCES - Links color #8B1E2D */}
// //           <div className="lg:col-span-2">
// //             <h3 className="font-bold text-lg uppercase mb-6">Resources</h3>
// //             <ul className="space-y-3 text-sm">
// //               <li><Link to="/about" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={(e) => e.target.style.color = '#6B1622'} onMouseLeave={(e) => e.target.style.color = '#8B1E2D'}>About</Link></li>
// //               <li><Link to="/blog" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={(e) => e.target.style.color = '#6B1622'} onMouseLeave={(e) => e.target.style.color = '#8B1E2D'}>Blog</Link></li>
// //               <li><Link to="/contact" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={(e) => e.target.style.color = '#6B1622'} onMouseLeave={(e) => e.target.style.color = '#8B1E2D'}>Contact</Link></li>
// //               <li><Link to="/privacy" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={(e) => e.target.style.color = '#6B1622'} onMouseLeave={(e) => e.target.style.color = '#8B1E2D'}>Privacy Policy</Link></li>
// //             </ul>
// //           </div>

// //           {/* CATEGORIES - Links color #8B1E2D */}
// //           <div className="lg:col-span-3">
// //             <h3 className="font-bold text-lg uppercase mb-6">Categories</h3>
// //             <ul className="space-y-3 text-sm">
// //               <li><Link to="#" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={(e) => e.target.style.color = '#6B1622'} onMouseLeave={(e) => e.target.style.color = '#8B1E2D'}>Triply cookware</Link></li>
// //               <li><Link to="#" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={(e) => e.target.style.color = '#6B1622'} onMouseLeave={(e) => e.target.style.color = '#8B1E2D'}>Thermoware</Link></li>
// //               <li><Link to="#" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={(e) => e.target.style.color = '#6B1622'} onMouseLeave={(e) => e.target.style.color = '#8B1E2D'}>Lunchbox</Link></li>
// //               <li><Link to="#" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={(e) => e.target.style.color = '#6B1622'} onMouseLeave={(e) => e.target.style.color = '#8B1E2D'}>Cookware sets</Link></li>
// //               <li><Link to="#" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={(e) => e.target.style.color = '#6B1622'} onMouseLeave={(e) => e.target.style.color = '#8B1E2D'}>Steel bottles</Link></li>
// //             </ul>
// //           </div>

// //           {/* CONTACT - With Globe Icon */}
// //           <div className="lg:col-span-3 space-y-6">
// //             <h3 className="font-bold text-lg uppercase flex items-center gap-2">
// //               <FaGlobe 
// //                 className="cursor-pointer transition-all hover:scale-110" 
// //                 style={{ color: '#8B1E2D' }}
// //                 onClick={handleGlobeClick}
// //                 title="Go to Home"
// //               /> 
// //               Contact Us
// //             </h3>

// //             <p className="text-sm">
// //               Call us at: <br />
// //               <span className="text-lg font-bold" style={{ color: '#8B1E2D' }}>
// //                 6396976781
// //               </span>
// //             </p>

// //             <p className="text-xs text-gray-500">
// //               Registered Office: <br />
// //               Moradabad, UP, India
// //             </p>
// //           </div>

// //         </div>

// //         {/* BOTTOM BAR */}
// //         <div className="border-t border-gray-200 py-6 flex flex-col md:flex-row justify-between items-center text-sm">
// //           <p style={{ color: '#8B1E2D' }}>© 2026 Puspendra. All Rights Reserved.</p>
// //           <div className="flex gap-4 mt-4 md:mt-0 opacity-60">
// //             {/* Payment icons can go here */}
// //           </div>
// //         </div>

// //       </div>
// //     </footer>
// //   );
// // };

// // export default Footer;

// import {
//   FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaLinkedinIn, FaGlobe, FaPhoneAlt, FaMapMarkerAlt
// } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";

// import logo from "../../assets/Images/LogoShoping.png";

// const Footer = () => {
//   const navigate = useNavigate();

//   // Globe click handler - Home page par le jayega
//   const handleGlobeClick = () => {
//     navigate('/');
//   };

//   // Hover Effect Helper Function for Links
//   const handleMouseEnter = (e) => { e.target.style.color = '#6B1622'; };
//   const handleMouseLeave = (e) => { e.target.style.color = '#8B1E2D'; };

//   return (
//     <footer className="bg-white text-black w-full pt-16 border-t border-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* MAIN GRID - Fully Responsive columns */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-10 pb-12">

//           {/* COL 1: ABOUT & LOGO (Takes more space on large screens) */}
//           <div className="sm:col-span-2 md:col-span-3 lg:col-span-4 space-y-6">
//             <div>
//               <img
//                 src={logo}
//                 alt="The Loot Bazaar Logo"
//                 className="h-14 w-auto object-contain cursor-pointer"
//                 onClick={() => navigate('/')}
//               />
//             </div>

//             <h3 className="font-bold text-base uppercase tracking-wider text-gray-800">
//               About Our Business
//             </h3>

//             <p className="text-sm leading-relaxed text-gray-600 max-w-sm">
//               The Loot Bazaar (A unit of Naivaidyam Enterprises) is an authorized reseller and discount retailer of premium kitchenware and household products.
//             </p>

//             {/* SOCIAL ICONS */}
//             <div className="flex gap-3 pt-2">
//               {[
//                 { Icon: FaFacebookF, url: "#" },
//                 { Icon: FaInstagram, url: "#" },
//                 { Icon: FaTwitter, url: "#" },
//                 { Icon: FaEnvelope, url: "mailto:info@thelootbazaar.com" },
//                 { Icon: FaLinkedinIn, url: "#" }
//               ].map((item, i) => (
//                 <a
//                   key={i}
//                   href={item.url}
//                   className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center cursor-pointer transition-all duration-300"
//                   style={{ color: '#8B1E2D' }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.backgroundColor = '#8B1E2D';
//                     e.currentTarget.style.color = 'white';
//                     e.currentTarget.style.borderColor = '#8B1E2D';
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.backgroundColor = 'transparent';
//                     e.currentTarget.style.color = '#8B1E2D';
//                     e.currentTarget.style.borderColor = '#E5E7EB';
//                   }}
//                 >
//                   <item.Icon size={14} />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* COL 2: LEGAL & RESOURCES (Yahan humne nayi policies add ki hain) */}
//           <div className="sm:col-span-1 md:col-span-3 lg:col-span-2">
//             <h3 className="font-bold text-sm uppercase tracking-wider text-gray-800 mb-6">Legal & Policy</h3>
//             <ul className="space-y-3 text-sm font-medium">
//               <li><Link to="/about" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>About Us</Link></li>
//               <li><Link to="/contact" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Contact Us</Link></li>
//               <li><Link to="/privacy" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Privacy Policy</Link></li>
//               <li><Link to="/terms" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Terms & Conditions</Link></li>
//               <li><Link to="/refund-policy" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Return & Refund</Link></li>
//             </ul>
//           </div>

//           {/* COL 3: CATEGORIES */}
//           <div className="sm:col-span-1 md:col-span-3 lg:col-span-3">
//             <h3 className="font-bold text-sm uppercase tracking-wider text-gray-800 mb-6">Categories</h3>
//             <ul className="space-y-3 text-sm font-medium">
//               <li><Link to="#" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Triply Cookware</Link></li>
//               <li><Link to="#" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Thermoware</Link></li>
//               <li><Link to="#" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Lunchbox</Link></li>
//               <li><Link to="#" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Cookware Sets</Link></li>
//               <li><Link to="#" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Steel Bottles</Link></li>
//             </ul>
//           </div>

//           {/* COL 4: CONTACT & ADDRESS */}
//           <div className="sm:col-span-2 md:col-span-3 lg:col-span-3 space-y-5">
//             <h3 className="font-bold text-sm uppercase tracking-wider text-gray-800 flex items-center gap-2">
//               <FaGlobe 
//                 className="cursor-pointer transition-all hover:scale-110 duration-200" 
//                 style={{ color: '#8B1E2D' }}
//                 onClick={handleGlobeClick}
//                 title="Go to Home"
//               /> 
//               Contact Info
//             </h3>

//             <div className="space-y-3 text-sm text-gray-600">
//               <p className="flex items-start gap-2">
//                 <FaPhoneAlt className="mt-1 flex-shrink-0" style={{ color: '#8B1E2D' }} size={12} />
//                 <span>
//                   Support: <br />
//                   <a href="tel:8368925010" className="text-base font-bold transition-colors hover:underline" style={{ color: '#8B1E2D' }}>
//                     8368925010
//                   </a>
//                 </span>
//               </p>

//               <p className="flex items-start gap-2">
//                 <FaMapMarkerAlt className="mt-1 flex-shrink-0" style={{ color: '#8B1E2D' }} size={14} />
//                 <span>
//                   <strong>Registered Office:</strong><br />
//                   Moradabad, Uttar Pradesh, 244001
//                 </span>
//               </p>

//               <p className="flex items-start gap-2 pl-5 text-xs text-gray-400">
//                 <span>
//                   <strong>Operations/Returns:</strong><br />
//                   2, D-115, Shyam Park Extension, Sahibabad, Ghaziabad, UP 201005
//                 </span>
//               </p>
//             </div>
//           </div>

//         </div>

//         {/* BOTTOM BAR */}
//         <div className="border-t border-gray-100 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-center sm:text-left">
//           <p style={{ color: '#8B1E2D' }} className="font-medium">
//             © 2026 The Loot Bazaar. All Rights Reserved.
//           </p>
//           <p className="text-gray-400 text-xs">
//             Designed & Developed by Puspendra
//           </p>
//         </div>

//       </div>
//     </footer>
//   );
// };

// export default Footer;


import {
  FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaLinkedinIn, FaGlobe, FaPhoneAlt, FaMapMarkerAlt
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/Images/LogoShoping1.jpeg";


const Footer = () => {
  const navigate = useNavigate();

  // Globe click handler - Home page par le jayega
  const handleGlobeClick = () => {
    navigate('/');
  };

  // Hover Effect Helper Function for Links
  const handleMouseEnter = (e) => { e.target.style.color = '#6B1622'; };
  const handleMouseLeave = (e) => { e.target.style.color = '#8B1E2D'; };

  return (
    <footer className="bg-white text-black w-full pt-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* MAIN GRID - Fully Responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-10 pb-12">

          {/* COL 1: ABOUT & LOGO */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-4 space-y-6">
            <div>
              <img
                src={logo}
                alt="The Loot Bazaar Logo"
                className="h-14 w-auto object-contain cursor-pointer"
                onClick={() => navigate('/')}
              />
            </div>

            <h3 className="font-bold text-base uppercase tracking-wider text-gray-800">
              About Our Business
            </h3>

            <p className="text-sm leading-relaxed text-gray-600 max-w-sm">
              The Loot Bazaar, a proud unit of Navaidayam Enterprises. We are your ultimate destination for premium, durable, and stylish kitchenware. Committed to elevating your culinary experience, we bring you high-quality cookware and innovative kitchen essentials that combine functionality with affordability. Upgrade your home and cook with joy.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-3 pt-2">
              {[
                { Icon: FaFacebookF, url: "#" },
                { Icon: FaInstagram, url: "#" },
                { Icon: FaTwitter, url: "#" },
                { Icon: FaEnvelope, url: "mailto:https://thelootbazaar.vercel.app" },
                { Icon: FaLinkedinIn, url: "#" }
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center cursor-pointer transition-all duration-300"
                  style={{ color: '#8B1E2D' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#8B1E2D';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.borderColor = '#8B1E2D';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#8B1E2D';
                    e.currentTarget.style.borderColor = '#E5E7EB';
                  }}
                >
                  <item.Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* COL 2: LEGAL & POLICY */}
          <div className="sm:col-span-1 md:col-span-3 lg:col-span-2">
            <h3 className="font-bold text-sm uppercase tracking-wider text-gray-800 mb-6">Legal & Policy</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/about" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>About Us</Link></li>
              <li><Link to="/contact" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Contact Us</Link></li>
              <li><Link to="/privacy" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Privacy Policy</Link></li>
              <li><Link to="/terms" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Terms & Conditions</Link></li>
              <li><Link to="/refund-policy" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Return & Refund</Link></li>
            </ul>
          </div>

          {/* COL 3: CATEGORIES */}
          <div className="sm:col-span-1 md:col-span-3 lg:col-span-3">
            <h3 className="font-bold text-sm uppercase tracking-wider text-gray-800 mb-6">Categories</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="#" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Triply Cookware</Link></li>
              <li><Link to="#" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Thermoware</Link></li>
              <li><Link to="#" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Lunchbox</Link></li>
              <li><Link to="#" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Cookware Sets</Link></li>
              <li><Link to="#" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Steel Bottles</Link></li>
            </ul>
          </div>

          {/* COL 4: CONTACT & ADDRESS */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-3 space-y-5">
            <h3 className="font-bold text-sm uppercase tracking-wider text-gray-800 flex items-center gap-2">
              <FaGlobe 
                className="cursor-pointer transition-all hover:scale-110 duration-200" 
                style={{ color: '#8B1E2D' }}
                onClick={handleGlobeClick}
                title="Go to Home"
              /> 
              Contact Info
            </h3>

            <div className="space-y-3 text-sm text-gray-600">
              <p className="flex items-start gap-2">
                <FaPhoneAlt className="mt-1 flex-shrink-0" style={{ color: '#8B1E2D' }} size={12} />
                <span>
                  Support: <br />
                  <a href="tel:8368925010" className="text-base font-bold transition-colors hover:underline" style={{ color: '#8B1E2D' }}>
                    8368925010
                  </a>
                </span>
              </p>

              <p className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0" style={{ color: '#8B1E2D' }} size={14} />
                <span>
                  <strong>Registered Office:</strong><br />
                  6-A, Addl., Sihani Gate, Hapur Road, Old Bus Stand, Ghaziabad, Uttar Pradesh 201001
                </span>
              </p>

              <p className="flex items-start gap-2 pl-5 text-xs text-gray-400">
                <span>
                  <strong>Operations/Returns:</strong><br />
                  2, D-115, Shyam Park Extension, Sahibabad, Ghaziabad, UP 201005
                </span>
              </p>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR - Updated with Globe Icon */}
        <div className="border-t border-gray-100 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-center sm:text-left">
          <p style={{ color: '#8B1E2D' }} className="font-medium">
            © 2026 The Loot Bazaar. All Rights Reserved.
          </p>
          <div className="flex items-center justify-center">
            <FaGlobe 
              size={18} 
              style={{ color: '#8B1E2D' }} 
              className="cursor-pointer hover:scale-120 transition-transform duration-200"
              onClick={handleGlobeClick}
              title="Visit Home"
            />
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;