import React from 'react';
import Hero from '../components/Home/Hero';
import ValueProp from '../components/Home/ValueProp';
import FeaturedProjects from '../components/Home/FeaturedProjects';

const Home = () => {
  return (
    <>
      <Hero />
      <ValueProp />
      <FeaturedProjects />
    </>
  );
};

export default Home;