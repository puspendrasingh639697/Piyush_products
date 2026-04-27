// // // import React, { useState } from 'react'
// // // // import { HashRouter as Router, Routes, Route } from 'react-router-dom'
// // // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// // // import Home from './Page/Home'
// // // import About from './Page/About'
// // // import Products from './Page/Products'
// // // import Gallery from './Page/Gallery'
// // // import Blog from './Page/Blog'
// // // import Team from './Page/Team'
// // // import Contact from './Page/Contact'
// // // import Navbar from './Component/Navbar'

// // // import Profile from './Page/Profile'
// // // import MyAccount from './Page/MyAccount'
// // // import WishList from './Page/WishList'
// // // import ScrollToTop from "./Component/ScrollToTop";
// // // import AddDeliveryAddress from './Page/AddDeliveryAddress'
// // // import Payment from './Page/Payment'
// // // import OrderSumary from './Page/OrderSumary'
// // // import CategoryPage from './OurProduct/CategoryPage'
// // // import ProductDetail from './OurProduct/ProductDetail'
// // // import Checkout from './PaymentCard/Checkout'
// // // import SuccessPage from './PaymentCard/SuccessPage'
// // // import Footer from './Component/Auth/Footer2'
// // // import ResetPassword from './Component/Auth/ResetPassword'
// // // import AuthModal from './Component/Auth/AuthModal'
// // // import AdminDashboard from './AdminDasbord/AdminDashboard'
// // // import Cart from './PaymentCard/Cart'
// // // import OrderDetails from './Page/OrderDetails'
// // // import Terms from './Page/Terms'
// // // import Privacy from './Page/Privacy'



// // // const App = () => {
// // //   // ✅ 1. Card state define karni zaroori thi jo missing thi
// // //   const [card, setCard] = useState([]); 
// // //   const [cartItems, setCartItems] = useState([]); // Dono mein se jo aap use kar rahe ho

// // //   // ✅ 2. Form data with empty strings (to avoid uncontrolled error)
// // //   const [formData, setFormData] = useState({
// // //     name: "",
// // //     mobile: "",
// // //     pincode: "",
// // //     city: "",
// // //     state: "",
// // //     address: "",
// // //     area: "",
// // //     addressType: "home" 
// // //   });
    
// // //   return (
// // //     <Router>
// // //       <ScrollToTop /> 
// // //       {/* Navbar mein card pass ho raha hai */}
// // //       <Navbar card={card} setCard={setCard} />
      
// // //       <Routes>
// // //         <Route path='/' element={<Home card={card} setCard={setCard}/>} />
// // //         <Route path='/about' element={<About/>} />
// // //         <Route path='/products' element={<Products card={card} setCard={setCard}/>} />
// // //         <Route path='/gallery' element={<Gallery/>} />
// // //         <Route path='/blog' element={<Blog/>} />
// // //         <Route path='/team' element={<Team/>} />
// // //         <Route path='/contact' element={<Contact/>} />
        
// // //         <Route path='/myaccount' element={<MyAccount/>} />
// // //         <Route path='/wishlist' element={<WishList card={card} setCard={setCard}/>} />
        
// // //         {/* Address Page */}
// // //         <Route path='/addDeliveryAddress' element={<AddDeliveryAddress formData={formData} setFormData={setFormData}/>} />
        
// // //         {/* Order Summary Page (Isme cartItems use ho raha hai) */}
// // //         <Route path="/orderSumary" element={<OrderSumary formData={formData} cartItems={card} />} />
        
// // //         <Route path='/payment' element={<Payment card={card} setCard={setCard}/>} />
// // //         <Route path='/category/:categoryId' element={<CategoryPage card={card} setCard={setCard} />} />
// // //         <Route path="/product/:id" element={<ProductDetail />} />
// // //         <Route path="/checkout" element={<Checkout />} />
// // //         <Route path="/success" element={<SuccessPage />} />
// // //         <Route path="/reset-password/:token" element={<ResetPassword />} />
// // //         <Route path='/profile' element={<Profile/>} />
         
// // // <Route path='/admin' element={<AdminDashboard />} />
// // // <Route path='/Admin' element={<AdminDashboard />} />
// // // <Route path="/cart" element={<Cart />} />
// // // <Route path="/order/:orderId" element={<OrderDetails />} />

// // // <Route path="/terms" element={<Terms />} />
// // // <Route path="/privacy" element={<Privacy />} />

        
      
// // //       </Routes>

// // //       <Footer/>
// // //     </Router>
// // //   )
// // // }

// // // export default App




// // import React, { useState, useEffect } from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import Home from './Page/Home';
// // import About from './Page/About';
// // import Products from './Page/Products';
// // import Gallery from './Page/Gallery';
// // import Blog from './Page/Blog';
// // import Team from './Page/Team';
// // import Contact from './Page/Contact';
// // import Navbar from './Component/Navbar';
// // import Profile from './Page/Profile';
// // import MyAccount from './Page/MyAccount';
// // import WishList from './Page/WishList';
// // import ScrollToTop from "./Component/ScrollToTop";
// // import AddDeliveryAddress from './Page/AddDeliveryAddress';
// // import Payment from './Page/Payment';
// // import OrderSumary from './Page/OrderSumary';
// // import CategoryPage from './OurProduct/CategoryPage';
// // import ProductDetail from './OurProduct/ProductDetail';
// // import Checkout from './PaymentCard/Checkout';
// // import SuccessPage from './PaymentCard/SuccessPage';
// // import Footer from './Component/Auth/Footer2';
// // import ResetPassword from './Component/Auth/ResetPassword';
// // import AdminDashboard from './AdminDasbord/AdminDashboard';
// // import Cart from './PaymentCard/Cart';
// // import OrderDetails from './Page/OrderDetails';
// // import Terms from './Page/Terms';
// // import Privacy from './Page/Privacy';
// // import 'react-toastify/dist/ReactToastify.css';


// // const App = () => {
// //   // ✅ Card State for Cart
// //   const [card, setCard] = useState([]);
// //   const [cartCount, setCartCount] = useState(0);
  
// //   // ✅ Form Data State
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     mobile: "",
// //     pincode: "",
// //     city: "",
// //     state: "",
// //     address: "",
// //     area: "",
// //     addressType: "home"
// //   });

// //   // ✅ Update cart count from localStorage
// //   useEffect(() => {
// //     const updateCartCount = () => {
// //       const cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
// //       setCartCount(cart.length);
// //       setCard(cart);
// //     };
    
// //     updateCartCount();
// //     window.addEventListener('storage', updateCartCount);
    
// //     return () => window.removeEventListener('storage', updateCartCount);
// //   }, []);

// //   return (
// //     <Router>
// //       <ScrollToTop />
      
// //       {/* ✅ Pass both card and cartCount to Navbar */}
// //       <Navbar card={card} cartCount={cartCount} />
      
// //       <Routes>
// //         <Route path='/' element={<Home card={card} setCard={setCard} />} />
// //         <Route path='/about' element={<About />} />
// //         <Route path='/products' element={<Products card={card} setCard={setCard} />} />
// //         <Route path='/gallery' element={<Gallery />} />
// //         <Route path='/blog' element={<Blog />} />
// //         <Route path='/team' element={<Team />} />
// //         <Route path='/contact' element={<Contact />} />
        
// //         <Route path='/myaccount' element={<MyAccount />} />
// //         <Route path='/wishlist' element={<WishList card={card} setCard={setCard} />} />
        
// //         <Route path='/addDeliveryAddress' element={<AddDeliveryAddress formData={formData} setFormData={setFormData} />} />
// //         <Route path="/orderSumary" element={<OrderSumary formData={formData} cartItems={card} />} />
        
// //         <Route path='/payment' element={<Payment card={card} setCard={setCard} />} />
// //         <Route path='/category/:categoryId' element={<CategoryPage card={card} setCard={setCard} />} />
// //         <Route path="/product/:id" element={<ProductDetail />} />
// //         <Route path="/checkout" element={<Checkout />} />
// //         <Route path="/success" element={<SuccessPage />} />
// //         <Route path="/reset-password/:token" element={<ResetPassword />} />
// //         <Route path='/profile' element={<Profile />} />
// //         <Route path='/admin' element={<AdminDashboard />} />
// //         <Route path='/Admin' element={<AdminDashboard />} />
// //         <Route path="/cart" element={<Cart card={card} setCard={setCard} />} />
// //         <Route path="/order/:orderId" element={<OrderDetails />} />
// //         <Route path="/terms" element={<Terms />} />
// //         <Route path="/privacy" element={<Privacy />} />

// //          <Route path="/products" element={<ProductList />} />
// //                 <Route path="/product/:id" element={<ProductDetails />} />
// //                 <Route path="/profile" element={<Profile />} />
// //       </Routes>

// //       <Footer />
// //     </Router>
// //   );
// // };

// // export default App;


// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
// // import { store } from './store/store';
// import Home from './Page/Home';
// import About from './Page/About';
// import Products from './Page/Products';
// import Gallery from './Page/Gallery';
// import Blog from './Page/Blog';
// import Team from './Page/Team';
// import Contact from './Page/Contact';
// import Navbar from './Component/Navbar';
// import Profile from './Page/Profile';
// import MyAccount from './Page/MyAccount';
// import WishList from './Page/WishList';
// import ScrollToTop from "./Component/ScrollToTop";
// import AddDeliveryAddress from './Page/AddDeliveryAddress';
// import Payment from './Page/Payment';
// import OrderSumary from './Page/OrderSumary';
// import CategoryPage from './OurProduct/CategoryPage';
// import ProductDetail from './OurProduct/ProductDetail';
// import Checkout from './PaymentCard/Checkout';
// import SuccessPage from './PaymentCard/SuccessPage';
// import Footer from './Component/Auth/Footer2';
// import ResetPassword from './Component/Auth/ResetPassword';
// import AdminDashboard from './AdminDasbord/AdminDashboard';
// import Cart from './PaymentCard/Cart';
// import OrderDetails from './Page/OrderDetails';
// import Terms from './Page/Terms';
// import Privacy from './Page/Privacy';
// import 'react-toastify/dist/ReactToastify.css';

// // ✅ Redux Product Catalog Components
// // import ProductList from './pages/ProductList';
// // import ProductDetails from './pages/ProductDetails';
// import { store } from './redux/store';
// import ProductDetails from './Component/ProductDetails';
// import ProductList from './Component/ProductList';

// const AppContent = () => {
//   // ✅ Card State for Cart
//   const [card, setCard] = useState([]);
//   const [cartCount, setCartCount] = useState(0);
  
//   // ✅ Form Data State
//   const [formData, setFormData] = useState({
//     name: "",
//     mobile: "",
//     pincode: "",
//     city: "",
//     state: "",
//     address: "",
//     area: "",
//     addressType: "home"
//   });

//   // ✅ Update cart count from localStorage
//   useEffect(() => {
//     const updateCartCount = () => {
//       const cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
//       setCartCount(cart.length);
//       setCard(cart);
//     };
    
//     updateCartCount();
//     window.addEventListener('storage', updateCartCount);
    
//     return () => window.removeEventListener('storage', updateCartCount);
//   }, []);

//   return (
//     <Router>
//       <ScrollToTop />
      
//       {/* ✅ Pass both card and cartCount to Navbar */}
//       <Navbar card={card} cartCount={cartCount} />
      
//       <Routes>
//         {/* Home & Pages */}
//         <Route path='/' element={<Home card={card} setCard={setCard} />} />
//         <Route path='/about' element={<About />} />
//         <Route path='/gallery' element={<Gallery />} />
//         <Route path='/blog' element={<Blog />} />
//         <Route path='/team' element={<Team />} />
//         <Route path='/contact' element={<Contact />} />
        
//         {/* Product Routes - Redux Based */}
//         <Route path='/products' element={<ProductList
//          />} />
//         <Route path='/product/:id' element={<ProductDetails />} />
        
//         {/* Old Products Route (if needed) */}
//         <Route path='/products-old' element={<Products card={card} setCard={setCard} />} />
        
//         {/* Category Route */}
//         <Route path='/category/:categoryId' element={<CategoryPage card={card} setCard={setCard} />} />
        
//         {/* User Account Routes */}
//         <Route path='/myaccount' element={<MyAccount />} />
//         <Route path='/profile' element={<Profile />} />
//         <Route path='/wishlist' element={<WishList card={card} setCard={setCard} />} />
        
//         {/* Address & Order Routes */}
//         <Route path='/addDeliveryAddress' element={<AddDeliveryAddress formData={formData} setFormData={setFormData} />} />
//         <Route path="/orderSumary" element={<OrderSumary formData={formData} cartItems={card} />} />
//         <Route path="/order/:orderId" element={<OrderDetails />} />
        
//         {/* Payment Routes */}
//         <Route path='/payment' element={<Payment card={card} setCard={setCard} />} />
//         <Route path="/checkout" element={<Checkout />} />
//         <Route path="/success" element={<SuccessPage />} />
//         <Route path="/cart" element={<Cart card={card} setCard={setCard} />} />
        
//         {/* Auth Routes */}
//         <Route path="/reset-password/:token" element={<ResetPassword />} />
        
//         {/* Admin Routes */}
//         <Route path='/admin' element={<AdminDashboard />} />
//         <Route path='/Admin' element={<AdminDashboard />} />
        
//         {/* Static Pages */}
//         <Route path="/terms" element={<Terms />} />
//         <Route path="/privacy" element={<Privacy />} />
        
//         {/* Product Detail Old (if needed) */}
//         <Route path="/product-detail/:id" element={<ProductDetail />} />
//       </Routes>

//       <Footer />
//     </Router>
//   );
// };

// // ✅ Main App with Redux Provider
// const App = () => {
//   return (
//     <Provider store={store}>
//       <AppContent />
//     </Provider>
//   );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './Page/Home';
import About from './Page/About';
import Products from './Page/Products';
import Gallery from './Page/Gallery';
import Blog from './Page/Blog';
import Team from './Page/Team';
import Contact from './Page/Contact';
import Navbar from './Component/Navbar';
import Profile from './Page/Profile';
import MyAccount from './Page/MyAccount';
import WishList from './Page/WishList';
import ScrollToTop from "./Component/ScrollToTop";
import AddDeliveryAddress from './Page/AddDeliveryAddress';
// import Payment from './Page/Payment';
import OrderSumary from './Page/OrderSumary';
import CategoryPage from './OurProduct/CategoryPage';
import ProductDetail from './OurProduct/ProductDetail';
import Checkout from './PaymentCard/Checkout';
import SuccessPage from './PaymentCard/SuccessPage';
import Footer from './Component/Auth/Footer2';
import ResetPassword from './Component/Auth/ResetPassword';
import AdminDashboard from './AdminDasbord/AdminDashboard';
import Cart from './PaymentCard/Cart';
import OrderDetails from './Page/OrderDetails';
import Terms from './Page/Terms';
import Privacy from './Page/Privacy';
import 'react-toastify/dist/ReactToastify.css';

// ✅ Redux Store
import { store } from './redux/store';

// ✅ Redux Product Catalog Components
import ProductDetails from './Component/ProductDetails';
import ProductList from './Component/ProductList';
import CartPage from './Page/CartPage';
import OrderSuccessPage from './Page/OrderSuccessPage';

// ✅ Redux Cart Page Component (Naya Component)
// import CartPage from './pages/CartPage';

const AppContent = () => {
  // ✅ Card State for Cart (Local Storage Backup)
  const [card, setCard] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  
  // ✅ Form Data State
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pincode: "",
    city: "",
    state: "",
    address: "",
    area: "",
    addressType: "home"
  });

  // ✅ Update cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
      setCartCount(cart.length);
      setCard(cart);
    };
    
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      
      {/* ✅ Pass both card and cartCount to Navbar */}
      <Navbar card={card} cartCount={cartCount} />
      
      <Routes>
        {/* Home & Pages */}
        <Route path='/' element={<Home card={card} setCard={setCard} />} />
        <Route path='/about' element={<About />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/team' element={<Team />} />
        <Route path='/contact' element={<Contact />} />
        
        {/* Product Routes - Redux Based */}
        <Route path='/products' element={<ProductList />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        
        {/* Old Products Route (if needed) */}
        <Route path='/products-old' element={<Products card={card} setCard={setCard} />} />
        
        {/* Category Route */}
        <Route path='/category/:categoryId' element={<CategoryPage card={card} setCard={setCard} />} />
        
        {/* User Account Routes */}
        <Route path='/myaccount' element={<MyAccount />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/wishlist' element={<WishList/>} />
        
        {/* Address & Order Routes */}
        <Route path='/addDeliveryAddress' element={<AddDeliveryAddress formData={formData} setFormData={setFormData} />} />
        <Route path="/orderSumary" element={<OrderSumary formData={formData} cartItems={card} />} />
        <Route path="/order/:orderId" element={<OrderDetails />} />
        
        {/* Payment Routes */}
        {/* <Route path='/payment' element={<Payment card={card} setCard={setCard} />} /> */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<SuccessPage />} />
        
        {/* ✅ Cart Routes - Both old and new */}
        <Route path="/cart" element={<Cart card={card} setCard={setCard} />} />
        <Route path="/cart-redux" element={<CartPage />} />
        
        {/* Auth Routes */}
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        
        {/* Admin Routes */}
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/Admin' element={<AdminDashboard />} />
        
        {/* Static Pages */}
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        
        {/* Product Detail Old (if needed) */}
        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        {/* <Route path="/order-success" element={<SuccessPage />} /> */}
        {/* <Route path="/order-success" element={<OrderSuccessPage />} />
         */}
      </Routes>

      <Footer />
    </Router>
  );
};

// ✅ Main App with Redux Provider
const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;