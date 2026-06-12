


import {
  FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaLinkedinIn, FaGlobe, FaPhoneAlt, FaMapMarkerAlt
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/Images/LogoShoping2.png";


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
  <div className="bg-white rounded-lg p-2 inline-block w-auto">
    <img
      src={logo}
      alt="The Loot Bazaar Logo"
      className="h-14 w-auto object-contain cursor-pointer block"
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
        className="w-9 h-9 rounded-full border border-gray-300 bg-white flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-[#8B1E2D] hover:text-white hover:border-[#8B1E2D]"
        style={{ color: '#8B1E2D' }}
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