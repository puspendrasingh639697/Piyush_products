import React from "react";

const RefundPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-xl p-6 sm:p-10 border border-gray-100">
        
        {/* Header Section */}
        <div className="border-b border-gray-200 pb-6 mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Refund & Return Policy
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Last Updated: <span className="font-semibold">June 1, 2026</span>
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-8 text-sm sm:text-base text-gray-600 leading-relaxed">
          
          <p>
            At <strong className="text-gray-900">TheLootBazar by Naivedyam Enterprises</strong>, we strive to ensure customer satisfaction with every purchase. If you are not completely satisfied with your order, you may be eligible for a return subject to the terms below.
          </p>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-red-700 pl-3">
              Return Policy
            </h2>
            <p>
              We have a <strong className="text-gray-900">5-day return policy</strong>, which means you have <strong>5 days after receiving your item</strong> to request a return.
            </p>
            <p className="font-medium text-gray-800">To be eligible for a return, your item must:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li>Be unused and in the same condition that you received it.</li>
              <li>Have all original tags attached (if applicable).</li>
              <li>Be in its original packaging.</li>
              <li>Be accompanied by the receipt or proof of purchase.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-red-700 pl-3">
              How to Start a Return
            </h2>
            <p>
              To initiate a return, please contact us at:{" "}
              <a href="mailto:support@thelootbazar.com" className="text-red-700 font-medium hover:underline">
                support@thelootbazar.com
              </a>
            </p>
            <p>Please include your order number and reason for the return request.</p>
            <p>
              If your return is approved, we will provide instructions on how and where to send your package. Items returned without prior approval will not be accepted.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-2">
              <p className="font-bold text-gray-900 mb-1 text-xs uppercase tracking-wider">Return Address:</p>
              <p className="text-sm text-gray-700">
                TheLootBazar by Naivedyam Enterprises<br />
                2, D-115, Shyam Park Extension, Sahibabad, Ghaziabad, Uttar Pradesh 201005
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-red-700 pl-3">
              Damaged, Defective, or Incorrect Items
            </h2>
            <p>Please inspect your order immediately upon delivery.</p>
            <p>
              If you receive a damaged product, a defective item, or an incorrect product, please contact us **within 48 hours of delivery** with photographs and your order details. We will review the issue and work to resolve it as quickly as possible.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-red-700 pl-3">
              Non-Returnable Items
            </h2>
            <p>Certain items cannot be returned, including:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
              <li>Customized or personalized products.</li>
              <li>Special-order items.</li>
              <li>Products marked as non-returnable at the time of purchase.</li>
              <li>Items returned in used, damaged, or altered condition.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-red-700 pl-3">
              Exchanges
            </h2>
            <p>
              We currently do not offer direct exchanges. If you would like a different item, please return the eligible product and place a new order once the return has been approved.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-red-700 pl-3">
              Refunds
            </h2>
            <p>
              Once we receive and inspect your returned item, we will notify you whether your refund has been approved.
            </p>
            <p>
              If approved, the refund will be processed to your original payment method. Refunds are typically credited within **5–10 business days**, though processing times may vary depending on your bank or payment gateway.
            </p>
            <p>
              If more than 15 business days have passed since approval and you haven't received it, please ping us at{" "}
              <a href="mailto:support@thelootbazar.com" className="text-red-700 font-medium hover:underline">
                support@thelootbazar.com
              </a>.
            </p>
          </section>

          {/* Section 7 */}
          <section className="bg-red-50/50 p-4 rounded-xl border border-red-100 text-center sm:text-left">
            <h3 className="font-bold text-gray-900 mb-1">Need Extra Help?</h3>
            <p className="text-sm">
              For any questions regarding returns, refunds, or exchanges, mail us at{" "}
              <a href="mailto:support@thelootbazar.com" className="text-red-700 font-semibold hover:underline">
                support@thelootbazar.com
              </a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;