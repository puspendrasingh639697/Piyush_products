import React from "react";
import Get_Glowing from "../Home/Get_Glowing";
import Video from "../Home/Video";
import This_Season from "../Home/Popular_this_sesion";
import SliderImage from "../Home/SliderImage";
import Our_Product from "../Home/Our_Product";
import MyOurTeam from "../About/MyOurTeam"
import TeamMembers from "../About/TeamMembers"
import In_The_Spotlite from "../Home/In_The_Spotlite"
import HeroSection from "../OurProduct/HeroSection";
import PartnerTheShin from "../Home/PartnerTheShin"
import ServiceHero from "../Home/SliderImage";
import ProductList from "../Component/ProductList";

const Home = ({ card, setCard }) => {
  return (
    <div className="flex flex-col m-0 p-0 w-full"> {/* Added layout classes */}
      <ServiceHero />
      <This_Season />
      {/* <Video /> */}
      {/* <Our_Product card={card} setCard={setCard} /> */}
      <ProductList/>
      <MyOurTeam />
      <Get_Glowing />
      <TeamMembers />
      
    </div>
  );
};

export default Home;
