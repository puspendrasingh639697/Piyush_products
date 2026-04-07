import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti'; // 🎉 Isse party wala feel aayega

const SuccessPage = () => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState('');
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // 1. Order ID set karo
    const randomId = "MHRN-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    setOrderId(randomId);
    window.scrollTo(0, 0);

    // 2. 🎉 CONFETTI BLAST (Active feel ke liye)
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#22c55e', '#1773B0', '#000000']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#22c55e', '#1773B0', '#000000']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // 3. Content ko thoda ruk ke dikhao (Smoothness)
    setTimeout(() => setShowContent(true), 300);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#f8fafc] overflow-hidden">
      
      {/* Dynamic Progress Bar (Top par active lagega) */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200">
        <div className="h-full bg-green-500 animate-[loading_2s_ease-in-out]"></div>
      </div>

      <div className={`max-w-md w-full transition-all duration-700 transform ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        
        {/* Main Card */}
        <div className="bg-white   p-8 text-center relative overflow-hidden border border-gray-100">
          
          {/* Animated Background Blob */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-50 rounded-full blur-3xl"></div>
          
          {/* Success Icon with Pulse */}
          <div className="relative mb-8 flex justify-center">
            <div className="absolute inset-0 bg-green-100 rounded-full scale-150 animate-ping opacity-20"></div>
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-xl shadow-green-200 relative z-10 animate-bounce-short">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl mb-2 text-gray-500 font-medium mb-8">
            YOU'RE ALL SET!
          </h1>
          <p className="text-black font-medium mb-8">
            Hooray! Your kitchen is getting an upgrade.
          </p>

          {/* ACTIVE RECEIPT BOX */}
          <div className="bg-slate-50 rounded-xl p-6 mb-8 border-2 border-dashed border-gray-200 relative">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 border-dotted">
              <span className="text-lg text-black ">Order Receipt</span>
              <span className="bg-green-100 text-green-700 text-[10px] font-black px-3 py-1 rounded-full uppercase">Confirmed</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-black font-medium">Order Number</span>
                <span className="font-medium text-black select-all cursor-pointer" title="Click to copy">#{orderId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-black font-medium">Date</span>
                <span className="text-black text-black">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-black font-medium">Payment</span>
                <span className="font-medium text-black">Prepaid</span>
              </div>
            </div>

            
          </div>

          {/* ACTION BUTTONS */}
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/')}
              className="w-full bg-red-800 text-white py-5 rounded-lg font-medium text-sm  hover:bg-gray-800 active:scale-[0.98] transition-all shadow-2xl flex items-center justify-center gap-2"
            >
              Back to Store
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
            
            <button 
              onClick={() => window.print()}
              className="w-full text-black text-lg hover:text-black py-2 transition-colors"
            >
              Download Invoice
            </button>
          </div>
        </div>

        {/* Support Section */}
        <p className="mt-8 text-center text-black text-lg font-medium">
          Need help? <a href="mailto:support@maharanikitchenware.com" className="text-black underline">Contact Maharani Support</a>
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;