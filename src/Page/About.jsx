// import React from 'react'
// import AboutTitle from '../About/AboutTitle'
// import ProductAvaileble from '../About/ProductAvaileble'
// import OurStory from '../About/OurStory'
// import OurValues from '../About/OurValues'
// import OurValues2 from '../About/OurValues2'
// import WhyChooseUs from '../About/WhyChooseUs'
// import WhyChooseUs2 from '../About/WhyChooseUs2'
// import MyOurTeam from '../About/MyOurTeam'
// import Experience from '../About/Experience'
// import TeamMembers from '../About/TeamMembers'

// const About = () => {
//   return (
//     <div >
//       <AboutTitle/>
//       <ProductAvaileble/>
//       {/* <OurStory/> */}
//       <OurValues/>
//       {/* <OurValues2/> */}
//       <WhyChooseUs/>
//       <WhyChooseUs2/>
//       <MyOurTeam/>
//       <TeamMembers/>
//       <Experience/>
//     </div>
//   )
// }

// export default About

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContent } from '../redux/slices/contentSlice';
import AboutTitle from '../About/AboutTitle';
import ProductAvaileble from '../About/ProductAvaileble';
import OurStory from '../About/OurStory';
import OurValues from '../About/OurValues';
import OurValues2 from '../About/OurValues2';
import WhyChooseUs from '../About/WhyChooseUs';
import WhyChooseUs2 from '../About/WhyChooseUs2';
import MyOurTeam from '../About/MyOurTeam';
import Experience from '../About/Experience';
import TeamMembers from '../About/TeamMembers';

const About = () => {
  const dispatch = useDispatch();
  const { about, isLoading } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(fetchContent('about'));
  }, [dispatch]);

  return (
    <div>
      {/* ✅ Dynamic About Title - Admin se edit hoga */}
      <AboutTitle 
        title={about?.title || "About Our Company"}
        description={about?.body || "We are the best kitchenware store in India..."}
      />
      
      {/* Static Components */}
      <ProductAvaileble/>
      <OurValues/>
      <WhyChooseUs/>
      <WhyChooseUs2/>
      <MyOurTeam/>
      <TeamMembers/>
      <Experience/>
    </div>
  );
};

export default About;