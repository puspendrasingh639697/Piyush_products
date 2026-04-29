// // import {
// //   FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaLinkedinIn
// // } from "react-icons/fa";
// // import { Link } from "react-router-dom";

// // const Footer = () => {
// //   return (
// //     <footer className="bg-white text-black w-full pt-16">
// //       <div className="max-w-7xl mx-auto px-6">
        
// //         {/* MAIN CONTENT GRID */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12">
          
// //           {/* 1. ABOUT US SECTION (Wider) */}
// //           <div className="lg:col-span-4 space-y-6">
// //             <h3 className="text- font-bold text-lg uppercase tracking-wider">About Us</h3>
// //             <p className="text-sm leading-7 text-black">
// //               Our company <span className="font-bold text-black">Puspendra</span> has been a leader in the beauty industry for years. We provide the best quality range of authentic skincare, professional makeup, and luxury beauty essentials.
// //             </p>
// //             {/* Social Icons with Circular Borders */}
// //             <div className="flex gap-3 ">
// //               {[FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaLinkedinIn].map((Icon, i) => (
// //                 <div key={i} className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-[#D4AF37] hover:text-white hover:border-[#D4AF37] transition-all">
// //                   <Icon size={14} />
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           {/* 2. MORE RESOURCES */}
// //           <div className="lg:col-span-2">
// //             <h3 className="text-black font-bold text-lg uppercase tracking-wider mb-6">Resources</h3>
// //             <ul className="space-y-3 text-sm">
// //               <li><Link to="/about" className="hover:text-[#D4AF37] transition-colors">About</Link></li>
// //               <li><Link to="/blog" className="hover:text-[#D4AF37] transition-colors">Blog</Link></li>
// //               <li><Link to="/contact" className="hover:text-[#D4AF37] transition-colors">Contact</Link></li>
// //               <li><Link to="/privacy" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</Link></li>
// //             </ul>
// //           </div>

// //           {/* 3. PRODUCT CATEGORIES */}
// //           <div className="lg:col-span-3">
// //             <h3 className="text-black font-bold text-lg uppercase tracking-wider mb-6">Categories</h3>
// //             <ul className="space-y-3 text-sm">
// //               <li><Link to="#" className="hover:text-[#D4AF37]">Triply cookware </Link></li>
// //               <li><Link to="#" className="hover:text-[#D4AF37]">Thermoware </Link></li>
// //               <li><Link to="#" className="hover:text-[#D4AF37]">Lunchbox</Link></li>
// //               <li><Link to="#" className="hover:text-[#D4AF37]">Cookware sets</Link></li>
// //               <li><Link to="#" className="hover:text-[#D4AF37]">Steel bottles</Link></li>
// //             </ul>
// //           </div>

// //           {/* 4. CONTACT US */}
// //           <div className="lg:col-span-3 space-y-6">
// //             <h3 className="text-black font-bold text-lg uppercase tracking-wider">Contact Us</h3>
// //             <div className="space-y-4">
// //               <p className="text-sm font-medium text-gray-800">
// //                 Call us at: <br />
// //                 <span className="text-lg font-bold text-[#D4AF37]">+9155655655656</span>
// //               </p>
// //               <p className="text-xs text-gray-400 uppercase tracking-widest">
// //                 Registered Office: <br />
// //                 <span className="normal-case text-gray-500">Moradabad, UP, India</span>
// //               </p>
// //             </div>
// //           </div>

// //         </div>

// //         {/* BOTTOM BAR (Copyright Area) */}
// //         <div className="border-t border-black py-6 flex flex-col md:flex-row justify-between items-center text-[14px] text-black tracking-widest">
// //           <p>© 2026 Puspendra . All Rights Reserved.</p>
// //           <div className="flex gap-4 mt-4 md:mt-0">
// //              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3 opacity-50" />
// //              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-3 opacity-50" />
// //           </div>
// //         </div>
// //       </div>
// //     </footer>
// //   );
// // };

// // export default Footer;

// import {
//   FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaLinkedinIn
// } from "react-icons/fa";
// import { Link } from "react-router-dom";

// import logo from "../../assets/Images/LogoShoping.png";

// const Footer = () => {
//   return (
//     <footer className="bg-white text-black w-full pt-16">

//       <div className="max-w-7xl mx-auto px-6">

//         {/* MAIN GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12">

//           {/* ABOUT */}
//           <div className="lg:col-span-4 space-y-6">

//             {/* LOGO ADDED */}
//             <div>
//               <img
//                 src={logo}
//                 alt="Logo"
//                 className="h-14 w-auto object-contain"
//               />
//             </div>

//             <h3 className="font-bold text-lg uppercase tracking-wider">
//               About Us
//             </h3>

//             <p className="text-sm leading-7 text-black">
//               Our company <span className="font-bold">Puspendra</span> has been a leader in the beauty industry for years. We provide the best quality range of authentic skincare, professional makeup, and luxury beauty essentials.
//             </p>

//             {/* SOCIAL */}
//             <div className="flex gap-3">
//               {[FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaLinkedinIn].map((Icon, i) => (
//                 <div
//                   key={i}
//                   className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-all"
//                 >
//                   <Icon size={14} />
//                 </div>
//               ))}
//             </div>

//           </div>

//           {/* RESOURCES */}
//           <div className="lg:col-span-2">
//             <h3 className="font-bold text-lg uppercase mb-6">Resources</h3>
//             <ul className="space-y-3 text-sm">
//               <li><Link to="/about" className="hover:text-black">About</Link></li>
//               <li><Link to="/blog" className="hover:text-black">Blog</Link></li>
//               <li><Link to="/contact" className="hover:text-black">Contact</Link></li>
//               <li><Link to="/privacy" className="hover:text-black">Privacy Policy</Link></li>
//             </ul>
//           </div>

//           {/* CATEGORIES */}
//           <div className="lg:col-span-3">
//             <h3 className="font-bold text-lg uppercase mb-6">Categories</h3>
//             <ul className="space-y-3 text-sm">
//               <li><Link to="#">Triply cookware</Link></li>
//               <li><Link to="#">Thermoware</Link></li>
//               <li><Link to="#">Lunchbox</Link></li>
//               <li><Link to="#">Cookware sets</Link></li>
//               <li><Link to="#">Steel bottles</Link></li>
//             </ul>
//           </div>

//           {/* CONTACT */}
//           <div className="lg:col-span-3 space-y-6">
//             <h3 className="font-bold text-lg uppercase">Contact Us</h3>

//             <p className="text-sm">
//               Call us at: <br />
//               <span className="text-lg font-bold text-black">
//                 +9155655655656
//               </span>
//             </p>

//             <p className="text-xs text-gray-500">
//               Registered Office: <br />
//               Moradabad, UP, India
//             </p>
//           </div>

//         </div>

//         {/* BOTTOM BAR */}
//         <div className="border-t border-gray-200 py-6 flex flex-col md:flex-row justify-between items-center text-sm">

//           <p>© 2026 Puspendra. All Rights Reserved.</p>

//           <div className="flex gap-4 mt-4 md:mt-0 opacity-60">
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
//               alt="Visa"
//               className="h-3"
//             />
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
//               alt="Paypal"
//               className="h-3"
//             />
//           </div>

//         </div>

//       </div>
//     </footer>
//   );
// };

// export default Footer;


import {
  FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaLinkedinIn, FaGlobe
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/Images/LogoShoping.png";

const Footer = () => {
  const navigate = useNavigate();

  // Globe click handler - Home page par le jayega
  const handleGlobeClick = () => {
    navigate('/');
  };

  return (
    <footer className="bg-white text-black w-full pt-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12">

          {/* ABOUT */}
          <div className="lg:col-span-4 space-y-6">

            {/* LOGO */}
            <div>
              <img
                src={logo}
                alt="Logo"
                className="h-14 w-auto object-contain"
              />
            </div>

            <h3 className="font-bold text-lg uppercase tracking-wider">
              About Us
            </h3>

            <p className="text-sm leading-7 text-black">
              Our company <span className="font-bold">Puspendra</span> has been a leader in the beauty industry for years. We provide the best quality range of authentic skincare, professional makeup, and luxury beauty essentials.
            </p>

            {/* SOCIAL ICONS - Color #8B1E2D */}
            <div className="flex gap-3">
              {[FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaLinkedinIn].map((Icon, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center cursor-pointer transition-all"
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
                  <Icon size={14} />
                </div>
              ))}
            </div>

          </div>

          {/* RESOURCES - Links color #8B1E2D */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-lg uppercase mb-6">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={(e) => e.target.style.color = '#6B1622'} onMouseLeave={(e) => e.target.style.color = '#8B1E2D'}>About</Link></li>
              <li><Link to="/blog" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={(e) => e.target.style.color = '#6B1622'} onMouseLeave={(e) => e.target.style.color = '#8B1E2D'}>Blog</Link></li>
              <li><Link to="/contact" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={(e) => e.target.style.color = '#6B1622'} onMouseLeave={(e) => e.target.style.color = '#8B1E2D'}>Contact</Link></li>
              <li><Link to="/privacy" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={(e) => e.target.style.color = '#6B1622'} onMouseLeave={(e) => e.target.style.color = '#8B1E2D'}>Privacy Policy</Link></li>
            </ul>
          </div>

          {/* CATEGORIES - Links color #8B1E2D */}
          <div className="lg:col-span-3">
            <h3 className="font-bold text-lg uppercase mb-6">Categories</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="#" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={(e) => e.target.style.color = '#6B1622'} onMouseLeave={(e) => e.target.style.color = '#8B1E2D'}>Triply cookware</Link></li>
              <li><Link to="#" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={(e) => e.target.style.color = '#6B1622'} onMouseLeave={(e) => e.target.style.color = '#8B1E2D'}>Thermoware</Link></li>
              <li><Link to="#" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={(e) => e.target.style.color = '#6B1622'} onMouseLeave={(e) => e.target.style.color = '#8B1E2D'}>Lunchbox</Link></li>
              <li><Link to="#" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={(e) => e.target.style.color = '#6B1622'} onMouseLeave={(e) => e.target.style.color = '#8B1E2D'}>Cookware sets</Link></li>
              <li><Link to="#" className="transition-colors" style={{ color: '#8B1E2D' }} onMouseEnter={(e) => e.target.style.color = '#6B1622'} onMouseLeave={(e) => e.target.style.color = '#8B1E2D'}>Steel bottles</Link></li>
            </ul>
          </div>

          {/* CONTACT - With Globe Icon */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="font-bold text-lg uppercase flex items-center gap-2">
              <FaGlobe 
                className="cursor-pointer transition-all hover:scale-110" 
                style={{ color: '#8B1E2D' }}
                onClick={handleGlobeClick}
                title="Go to Home"
              /> 
              Contact Us
            </h3>

            <p className="text-sm">
              Call us at: <br />
              <span className="text-lg font-bold" style={{ color: '#8B1E2D' }}>
                +9155655655656
              </span>
            </p>

            <p className="text-xs text-gray-500">
              Registered Office: <br />
              Moradabad, UP, India
            </p>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-200 py-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p style={{ color: '#8B1E2D' }}>© 2026 Puspendra. All Rights Reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0 opacity-60">
            {/* Payment icons can go here */}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;