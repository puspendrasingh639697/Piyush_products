// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchContent } from '../redux/slices/contentSlice';

// const Privacy = () => {
//   const dispatch = useDispatch();
//   const { privacy, isLoading } = useSelector((state) => state.content);

//   useEffect(() => {
//     dispatch(fetchContent('privacy'));
//   }, [dispatch]);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-10 h-10 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin mx-auto mb-3"></div>
//           <p className="text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="container mx-auto px-4 max-w-4xl">
//         <div className="bg-white rounded-lg shadow-md p-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">
//             {privacy?.title || 'Privacy Policy'}
//           </h1>
//           <div className="prose max-w-none">
//             <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
//               {privacy?.body || 'Please check back later for our privacy policy.'}
//             </div>
//           </div>
//           <div className="mt-8 pt-4 border-t text-sm text-gray-500">
//             <p>Last updated: {new Date().toLocaleDateString()}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Privacy;

import React from "react";
import { 
  FaLock, FaUserShield, FaDatabase, FaEye, FaCookieBite, 
  FaShareAlt, FaExternalLinkAlt, FaChild, FaHistory, 
  FaUserCheck, FaGlobe, FaExclamationCircle, FaEnvelopeOpen 
} from "react-icons/fa";

const Privacy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-xl p-6 sm:p-10 border border-gray-100">
        
        {/* Header Section */}
        <div className="border-b border-gray-200 pb-6 mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Last Updated: <span className="font-semibold">June 01, 2026</span>
          </p>
        </div>

        {/* Intro */}
        <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed mb-8">
          <p>
            This Privacy Policy describes how <strong className="text-gray-900">TheLootBazar by Naivedyam Enterprises</strong> ("TheLootBazar", "we", "us", or "our") collects, uses, and discloses your personal information when you visit, use our services, make a purchase from our website, or otherwise communicate with us regarding our products and services (collectively, the "Services").
          </p>
          <p>
            For the purposes of this Privacy Policy, "you" and "your" refer to any user of the Services, including customers, website visitors, and other individuals whose information we collect.
          </p>
          <p>
            Please read this Privacy Policy carefully. By accessing or using our Services, you agree to the collection, use, and disclosure of your information as described in this Privacy Policy. If you do not agree, please do not access or use our Services.
          </p>
        </div>

        {/* Main Content Sections */}
        <div className="space-y-8 text-sm sm:text-base text-gray-600 leading-relaxed">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <FaHistory style={{ color: '#8B1E2D' }} size={20} className="flex-shrink-0" />
              Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or operational needs. Any updates will be posted on this page with a revised "Last Updated" date.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <FaDatabase style={{ color: '#8B1E2D' }} size={20} className="flex-shrink-0" />
              How We Collect and Use Your Personal Information
            </h2>
            <p>To provide and improve our Services, we collect personal information from various sources depending on how you interact with us.</p>
            <p className="font-semibold text-gray-800">We may use your information to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li>Process and fulfill orders.</li>
              <li>Provide customer support.</li>
              <li>Improve our products, website, and Services.</li>
              <li>Communicate with you regarding purchases, updates, and promotions.</li>
              <li>Prevent fraud and enhance security.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <FaUserShield style={{ color: '#8B1E2D' }} size={20} className="flex-shrink-0" />
              Personal Information We Collect
            </h2>
            
            <div className="space-y-2 pl-2">
              <h3 className="font-bold text-gray-900 text-base">Information You Provide Directly</h3>
              <p>When you use our Services, we may collect: Name, Email address, Phone number, Billing address, Shipping address, Payment-related information, Account login credentials, and Customer support communications.</p>
              
              <h3 className="font-bold text-gray-900 text-base pt-2">Information Collected Automatically</h3>
              <p>We automatically track details about your interaction, including: IP address, Device information, Browser type, Network connection information, Pages viewed, actions taken, and referring URLs using cookies and web beacons.</p>
              
              <h3 className="font-bold text-gray-900 text-base pt-2">Information from Third Parties</h3>
              <p>We may receive updates from e-commerce platform providers, payment processors, shipping/fulfillment partners, analytics providers, and marketing partners.</p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <FaEye style={{ color: '#8B1E2D' }} size={20} className="flex-shrink-0" />
              How We Use Your Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h4 className="font-bold text-gray-950 mb-1 text-sm">Order & Service Delivery</h4>
                <p className="text-xs text-gray-600">Processing payments, fulfilling orders, managing shipping/delivery, returns, exchanges, and accounts.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h4 className="font-bold text-gray-950 mb-1 text-sm">Marketing & Advertising</h4>
                <p className="text-xs text-gray-600">Sending promotional emails, SMS, or personalized ads. You can opt out at any time.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h4 className="font-bold text-gray-950 mb-1 text-sm">Security & Fraud Prevention</h4>
                <p className="text-xs text-gray-600">Detecting, investigating, and stopping fraudulent, illegal, or unauthorized behaviors.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h4 className="font-bold text-gray-950 mb-1 text-sm">Support & Improvement</h4>
                <p className="text-xs text-gray-600">Responding to custom inquiries, troubleshooting bugs, and making user experiences smoother.</p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <FaCookieBite style={{ color: '#8B1E2D' }} size={20} className="flex-shrink-0" />
              Cookies and Tracking Technologies
            </h2>
            <p>
              We use cookies to enable system functionality, remember preferences, analyze website traffic performance, and deliver relevant advertisements. You can modify your browser settings to refuse or delete cookies, though some features might stop working.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <FaShareAlt style={{ color: '#8B1E2D' }} size={20} className="flex-shrink-0" />
              How We Share Personal Information
            </h2>
            <p>We may share data with service providers (payment/shipping logs), marketing partners, or due to legal requirements to safeguard our rights, property, and prevent security threats. In a business transfer (merger/sale), information may be transferred too.</p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <FaExternalLinkAlt style={{ color: '#8B1E2D' }} size={18} className="flex-shrink-0" />
              Third-Party Websites and Links
            </h2>
            <p>
              Our website may contain links to third-party spaces. We are not responsible for their privacy practices or content. Please check their guidelines before providing data.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <FaChild style={{ color: '#8B1E2D' }} size={20} className="flex-shrink-0" />
              Children's Privacy
            </h2>
            <p>
              Our Services are not intended for children under 16. We do not knowingly collect info from minors. If you believe a child has shared data, please contact us immediately.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <FaLock style={{ color: '#8B1E2D' }} size={18} className="flex-shrink-0" />
              Security & Data Retention
            </h2>
            <p>
              We implement reasonable security measures to protect your personal information. We retain personal details only for as long as necessary to provide services, fulfill legal/regulatory duties, or settle disputes.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <FaUserCheck style={{ color: '#8B1E2D' }} size={20} className="flex-shrink-0" />
              Your Rights & International Transfers
            </h2>
            <p>
              Depending on your location, you may have the right to access, correct, delete, or restrict certain data processing. Your details may be stored and processed outside your residence country with appropriate safeguards in place.
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <FaExclamationCircle style={{ color: '#8B1E2D' }} size={20} className="flex-shrink-0" />
              Complaints
            </h2>
            <p>
              If you have concerns regarding how we handle data, please connect with us first. If you remain unsatisfied, you can lodge a complaint with your local data protection authority.
            </p>
          </section>

          {/* Section 12: Contact Box */}
          <section className="bg-red-50/50 p-5 rounded-xl border border-red-100 space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FaEnvelopeOpen style={{ color: '#8B1E2D' }} size={18} className="flex-shrink-0" />
              Contact Us
            </h2>
            <p>For questions about this Privacy Policy or privacy requests, please contact:</p>
            <div className="text-sm space-y-1 text-gray-700 font-medium">
              <p className="text-base font-bold" style={{ color: '#8B1E2D' }}>TheLootBazar by Naivedyam Enterprises</p>
              <p>Email: <a href="mailto:https://thelootbazaar.vercel.app" className="hover:underline text-blue-600">info@https://thelootbazaar.vercel.app/</a></p>
              <p>Phone: <a href="tel:8368925010" className="hover:underline text-gray-900">8368925010</a></p>
              <p className="text-xs text-gray-500 pt-1">
                Address: 2, D-115, Shyam Park Extension, Sahibabad, Ghaziabad, Uttar Pradesh 201005
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Privacy;