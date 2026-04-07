// src/data/productData.js

// --- ALL IMAGES IMPORTS ---
import side1 from "../assets/Images/side1.jpeg";   // Kadhai / Tasra
import side2 from "../assets/Images/side2.jpeg";   // Hot-Pot
import side3 from "../assets/Images/side3.jpeg";   // Lunchbox
import side4 from "../assets/Images/side4.jpeg";   // Aluminum Cooker
import side5 from "../assets/Images/side5.jpeg";   // Cookware Sets
import side6 from "../assets/Images/side6.jpeg";   // Copper Items
import side7 from "../assets/Images/side7.jpeg";   // Bottles
import side9 from "../assets/Images/side9.jpeg";   // Sauce Pan
import side10 from "../assets/Images/side10.jpeg"; // Triply Kadhai
import side12 from "../assets/Images/side12.jpeg"; // Casserole
import side14 from "../assets/Images/side14.jpeg"; // Steel Cooker
import side18 from "../assets/Images/side18.jpeg"; // Wok
import side20 from "../assets/Images/side20.jpeg"; // Bowl
import side24 from "../assets/Images/side24.jpeg"; // Sipper
import side25 from "../assets/Images/side25.jpeg"; // Flask
import side33 from "../assets/Images/side33.jpeg"; // Coffee Mug / Copper Mug

export const allProducts = [
  // --- 1. TRIPLY COOKWARE (7 Items) ---
  { id: 1, category: "triply-cookware", name: "Premium Triply Tasra 2L", price: "1,499", oldPrice: "1,999", img: side1, series: "Tri-Ply Series" },
  { id: 2, category: "triply-cookware", name: "Triply Induction Kadhai", price: "2,100", oldPrice: "2,800", img: side10, series: "Tri-Ply Series" },
  { id: 3, category: "triply-cookware", name: "Triply Deep Fry Pan", price: "1,850", oldPrice: "2,400", img: side18, series: "Tri-Ply Series" },
  { id: 4, category: "triply-cookware", name: "Professional Triply Wok", price: "2,400", oldPrice: "3,100", img: side18, series: "Tri-Ply Series" },
  { id: 5, category: "triply-cookware", name: "Triply Sauce Pan 1.5L", price: "1,200", oldPrice: "1,600", img: side9, series: "Tri-Ply Series" },
  { id: 6, category: "triply-cookware", name: "Triply Casserole with Lid", price: "2,900", oldPrice: "3,800", img: side12, series: "Tri-Ply Series" },
  { id: 7, category: "triply-cookware", name: "Triply Deep Kadhai 4L", price: "3,200", oldPrice: "4,000", img: side1, series: "Tri-Ply Series" },

  // --- 2. THERMOWARE (6 Items) ---
  { id: 8, category: "thermoware", name: "Insulated Hot-Pot Small", price: "799", oldPrice: "1,100", img: side2, series: "Classic Series" },
  { id: 9, category: "thermoware", name: "Insulated Hot-Pot Medium", price: "999", oldPrice: "1,400", img: side2, series: "Classic Series" },
  { id: 10, category: "thermoware", name: "Premium Serving Casserole", price: "1,250", oldPrice: "1,600", img: side12, series: "Premium Series" },
  { id: 11, category: "thermoware", name: "Designer Thermoware Set", price: "2,500", oldPrice: "3,200", img: side2, series: "Elite Series" },
  { id: 12, category: "thermoware", name: "Double Wall Soup Bowl", price: "450", oldPrice: "600", img: side20, series: "Utility" },
  { id: 13, category: "thermoware", name: "Hot-Pot Jumbo 5L", price: "1,800", oldPrice: "2,300", img: side2, series: "Classic Series" },

  // --- 3. LUNCHBOX (6 Items) ---
  { id: 14, category: "lunchbox", name: "Office Executive Box", price: "899", oldPrice: "1,200", img: side3, series: "Lifestyle" },
  { id: 15, category: "lunchbox", name: "Kids School Tiffin", price: "450", oldPrice: "650", img: side3, series: "Daily Needs" },
  { id: 16, category: "lunchbox", name: "Stainless Steel 3-Tier", price: "750", oldPrice: "999", img: side3, series: "Classic" },
  { id: 17, category: "lunchbox", name: "Electric Heating Lunchbox", price: "1,400", oldPrice: "1,900", img: side3, series: "Smart Series" },
  { id: 18, category: "lunchbox", name: "Compact Lunch Bag Set", price: "600", oldPrice: "850", img: side3, series: "Daily Needs" },
  { id: 19, category: "lunchbox", name: "Insulated Meal Box", price: "1,100", oldPrice: "1,500", img: side3, series: "Premium" },

  // --- 4. COOKERS (7 Items) ---
  { id: 20, category: "cookers", name: "Aluminum Pressure Cooker 3L", price: "1,600", oldPrice: "2,100", img: side4, series: "Aluminum Series" },
  { id: 21, category: "cookers", name: "Steel Pressure Cooker 5L", price: "2,899", oldPrice: "3,500", img: side14, series: "Steel Series" },
  { id: 22, category: "cookers", name: "Triply Pressure Cooker 3.5L", price: "3,500", oldPrice: "4,200", img: side14, series: "Tri-Ply Series" },
  { id: 23, category: "cookers", name: "Hard Anodized Cooker", price: "2,200", oldPrice: "2,900", img: side4, series: "Aluminum Series" },
  { id: 24, category: "cookers", name: "Induction Base Cooker", price: "1,950", oldPrice: "2,500", img: side14, series: "Steel Series" },
  { id: 25, category: "cookers", name: "Inner Lid Cooker Small", price: "1,400", oldPrice: "1,800", img: side4, series: "Classic" },
  { id: 26, category: "cookers", name: "Combo Cooker Pack", price: "4,000", oldPrice: "5,200", img: side14, series: "Combo Pack" },

  // --- 5. STEEL BOTTLES (6 Items) ---
  { id: 27, category: "steel-bottles", name: "Fridge Bottle 1L", price: "350", oldPrice: "500", img: side7, series: "Hydro Series" },
  { id: 28, category: "steel-bottles", name: "Vacuum Insulated Flask", price: "899", oldPrice: "1,200", img: side25, series: "Hydro Series" },
  { id: 29, category: "steel-bottles", name: "Gym Sipper Bottle", price: "499", oldPrice: "699", img: side24, series: "Sports Series" },
  { id: 30, category: "steel-bottles", name: "Office Coffee Mug", price: "550", oldPrice: "750", img: side33, series: "Lifestyle" },
  { id: 31, category: "steel-bottles", name: "Black Matte Bottle", price: "799", oldPrice: "1,100", img: side7, series: "Elite Series" },
  { id: 32, category: "steel-bottles", name: "Kids Small Sipper", price: "399", oldPrice: "550", img: side24, series: "Daily Needs" },

  // --- 6. COPPER UTENSILS (6 Items) ---
  { id: 33, category: "copper-utensils", name: "Pure Copper Water Jug", price: "1,250", oldPrice: "1,600", img: side6, series: "Ancient Series" },
  { id: 34, category: "copper-utensils", name: "Copper Bottom Handi Set", price: "2,200", oldPrice: "2,900", img: side6, series: "Classic Collection" },
  { id: 35, category: "copper-utensils", name: "Copper Mug Set of 2", price: "899", oldPrice: "1,250", img: side33, series: "Lifestyle" },
  { id: 36, category: "copper-utensils", name: "Engraved Copper Bottle", price: "1,100", oldPrice: "1,500", img: side6, series: "Ancient Series" },
  { id: 37, category: "copper-utensils", name: "Copper Glass Set", price: "650", oldPrice: "850", img: side6, series: "Classic" },
  { id: 38, category: "copper-utensils", name: "Luxury Copper Plate", price: "1,400", oldPrice: "1,800", img: side6, series: "Ancient Series" },

  // --- 7. COOKWARE SETS (6 Items) ---
  { id: 39, category: "cookware-sets", name: "7-Piece Induction Set", price: "4,599", oldPrice: "5,999", img: side5, series: "Value Packs" },
  { id: 40, category: "cookware-sets", name: "Family Meal Cookware Pack", price: "6,999", oldPrice: "8,500", img: side5, series: "Premium Pack" },
  { id: 41, category: "cookware-sets", name: "Non-Stick Combo Set", price: "3,200", oldPrice: "4,100", img: side5, series: "Value Packs" },
  { id: 42, category: "cookware-sets", name: "Master Chef 10-Piece Set", price: "9,999", oldPrice: "12,000", img: side5, series: "Premium Pack" },
  { id: 43, category: "cookware-sets", name: "Basic Kitchen Combo", price: "2,500", oldPrice: "3,500", img: side5, series: "Value Packs" },
  { id: 44, category: "cookware-sets", name: "Bridal Gift Cookware Set", price: "8,500", oldPrice: "10,500", img: side5, series: "Premium Pack" }
];