// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchContent } from '../redux/slices/contentSlice';

// const Terms = () => {
//   const dispatch = useDispatch();
//   const { terms, isLoading } = useSelector((state) => state.content);

//   useEffect(() => {
//     dispatch(fetchContent('terms'));
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
//             {terms?.title || 'Terms & Conditions'}
//           </h1>
//           <div className="prose max-w-none">
//             <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
//               {terms?.body || 'Please check back later for our terms and conditions.'}
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

// export default Terms;

import React from "react";
import { 
  FaInfoCircle, FaUserCheck, FaTags, FaCreditCard, 
  FaTruck, FaUndo, FaShieldAlt, FaBan, FaExclamationTriangle, 
  FaHandshake, FaGavel, FaSyncAlt, FaEnvelope 
} from "react-icons/fa";

const Terms = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-xl p-6 sm:p-10 border border-gray-100">
        
        {/* Header Section */}
        <div className="border-b border-gray-200 pb-6 mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Terms & Conditions
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Last Updated: <span className="font-semibold">06/06/2026</span>
          </p>
        </div>

        {/* Intro */}
        <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed mb-8">
          <p className="text-lg font-medium text-gray-900">
            Welcome to The Loot Bazaar
          </p>
          <p>
            Welcome to The Loot Bazaar, a unit of <strong className="text-gray-900">Naivaidyam Enterprises</strong>. These Terms and Conditions govern your use of our website, products, and services available through our online store <a href="https://thelootbazaar.vercel.app" className="font-medium hover:underline" style={{ color: '#8B1E2D' }}>https://thelootbazaar.vercel.app</a>.
          </p>
          <p>
            By accessing our Site or purchasing products from us, you agree to comply with and be bound by these Terms. Please read them carefully before using our services.
          </p>
        </div>

        {/* Main Sections with Dark Red Icons */}
        <div className="space-y-8 text-sm sm:text-base text-gray-600 leading-relaxed">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <FaInfoCircle style={{ color: '#8B1E2D' }} size={20} className="flex-shrink-0" />
              1. About Our Business
            </h2>
            <p>
              The Loot Bazaar is an authorized reseller and discount retailer of kitchenware and household products from various brands. We offer genuine branded products at discounted prices with the consent and authorization of respective brand owners or distributors.
            </p>
            <p>
              All trademarks, logos, and brand names displayed on the Site belong to their respective owners and are used solely for identification and resale purposes.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <FaUserCheck style={{ color: '#8B1E2D' }} size={20} className="flex-shrink-0" />
              2. Eligibility to Use
            </h2>
            <p>By using this Site, you confirm that:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li>You are at least 18 years old or the age of majority in your jurisdiction.</li>
              <li>You are legally capable of entering into binding contracts.</li>
              <li>The information provided by you is accurate and complete.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <FaTags style={{ color: '#8B1E2D' }} size={20} className="flex-shrink-0" />
              3. Product Information and Pricing
            </h2>
            <div className="space-y-2 pl-2">
              <p><strong className="text-gray-900">Product Accuracy:</strong> We strive to ensure that product descriptions, images, colors, specifications, and pricing are accurate. However, actual product appearance may slightly vary due to screen settings, lighting, or manufacturing updates.</p>
              <p><strong className="text-gray-900">Discounted Products:</strong> Products sold on The Loot Bazaar may be offered at promotional or discounted prices as part of clearance sales, stock liquidation, festive offers, or authorized reseller discounts.</p>
              <p><strong className="text-gray-900">Pricing Errors:</strong> In the event of any pricing or typographical errors, we reserve the right to cancel or refuse orders placed for incorrectly priced products, even if payment has been processed. In such cases, a full refund will be issued.</p>
              <p><strong className="text-gray-900">Product Availability:</strong> We reserve the right to limit quantities, discontinue products, or modify pricing without prior notice.</p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <FaCreditCard style={{ color: '#8B1E2D' }} size={20} className="flex-shrink-0" />
              4. Orders and Payments
            </h2>
            <p><strong className="text-gray-900">Order Acceptance:</strong> An order confirmation email or message does not constitute final acceptance of your order. We reserve the right to cancel or reject any order due to stock unavailability, pricing errors, suspected fraud, or other reasons.</p>
            <p><strong className="text-gray-900">Billing Information:</strong> You agree to provide current, complete, and accurate billing and shipping information for all purchases.</p>
            <p><strong className="text-gray-900">Payment Methods:</strong> We may accept payment through: Credit Cards, Debit Cards, UPI, Net Banking, Wallets, and Cash on Delivery (if available). All payments are processed through secure payment gateways.</p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <FaTruck style={{ color: '#8B1E2D' }} size={20} className="flex-shrink-0" />
              5. Shipping and Delivery
            </h2>
            <p>Estimated delivery timelines and shipping charges will be displayed during checkout.</p>
            <p>While we strive to deliver orders within the estimated timeframe, delays may occur due to courier service issues, weather conditions, government restrictions, public holidays, or unforeseen operational delays.</p>
            <p><strong className="text-gray-900">Naivaidyam Enterprises</strong> shall not be held liable for delays caused by third-party logistics providers.</p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <FaUndo style={{ color: '#8B1E2D' }} size={20} className="flex-shrink-0" />
              6. Returns, Refunds, and Replacements
            </h2>
            <p>Customers are advised to review our Return and Refund Policy before making a purchase.</p>
            <p><strong className="text-gray-900">Damaged or Defective Products:</strong> If you receive a damaged, defective, or incorrect product, you must notify us within 48 hours of delivery along with clear photo or video evidence.</p>
            <p>Upon verification, we may offer: Replacement, Store credit, or a Full Refund. Refunds, if approved, will be processed through the original payment method within the applicable banking timelines.</p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <FaShieldAlt style={{ color: '#8B1E2D' }} size={20} className="flex-shrink-0" />
              7. Intellectual Property
            </h2>
            <p>All content available on the Site, including text, logos, graphics, images, product listings, and website design, is the property of Naivaidyam Enterprises or respective brand owners and is protected under applicable intellectual property laws.</p>
            <p>Unauthorized use, copying, or reproduction is strictly prohibited.</p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <FaBan style={{ color: '#8B1E2D' }} size={20} className="flex-shrink-0" />
              8. Prohibited Activities
            </h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li>Use the Site for unlawful purposes.</li>
              <li>Attempt unauthorized access to our systems.</li>
              <li>Copy or resell content without permission.</li>
              <li>Interfere with the security or functionality of the Site.</li>
            </ul>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <FaExclamationTriangle style={{ color: '#8B1E2D' }} size={20} className="flex-shrink-0" />
              9. Limitation of Liability
            </h2>
            <p>To the maximum extent permitted by law, The Loot Bazaar and Naivaidyam Enterprises shall not be liable for indirect or consequential damages, loss of profits or business, delays in delivery, or product misuse by customers.</p>
            <p>Our maximum liability shall not exceed the amount paid for the purchased product.</p>
          </section>

          {/* Section 10 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <FaHandshake style={{ color: '#8B1E2D' }} size={20} className="flex-shrink-0" />
              10. Third-Party Brands and Products
            </h2>
            <p>The Loot Bazaar sells genuine products sourced through authorized suppliers, distributors, or brand partners. Brand ownership and trademarks remain the exclusive property of their respective owners.</p>
            <p>We do not claim ownership of third-party trademarks, logos, or brand identities displayed on the Site.</p>
          </section>

          {/* Section 11 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <FaGavel style={{ color: '#8B1E2D' }} size={20} className="flex-shrink-0" />
              11. Governing Law
            </h2>
            <p>These Terms shall be governed by and interpreted in accordance with the laws of India.</p>
            <p>Any disputes arising from the use of this Site shall be subject to the exclusive jurisdiction of the courts located in Haryana, India.</p>
          </section>

          {/* Section 12 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <FaSyncAlt style={{ color: '#8B1E2D' }} size={20} className="flex-shrink-0" />
              12. Changes to Terms and Conditions
            </h2>
            <p>We reserve the right to update, modify, or replace these Terms at any time without prior notice. Changes will become effective immediately upon posting on the Site.</p>
            <p>Your continued use of the Site after any changes constitutes acceptance of those changes.</p>
          </section>

          {/* Section 13: Contact Info */}
          <section className="bg-red-50/50 p-5 rounded-xl border border-red-100 space-y-3">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FaEnvelope style={{ color: '#8B1E2D' }} size={20} className="flex-shrink-0" />
              13. Contact Information
            </h2>
            <p>For any questions regarding these Terms and Conditions, please contact:</p>
            <div className="text-sm space-y-1 text-gray-700 font-medium">
              <p className="text-base font-bold" style={{ color: '#8B1E2D' }}>Naivaidyam Enterprises</p>
              <p>Operating Brand: <span className="text-gray-900">The Loot Bazaar</span></p>
              <p>Email: <a href="mailto:info@https://thelootbazaar.vercel.app/" className="hover:underline text-blue-600">info@https://thelootbazaar.vercel.app/</a></p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Terms;