import React from 'react';
import Container from '../components/UI/Container';
import Section from '../components/UI/Section';
import Heading from '../components/UI/Heading';

const Home = () => {
  return (
    <>
      <Section className="min-h-screen flex items-center">
        <Container>
          <Heading level="h1" animate>
            Home Page
          </Heading>
          <p className="text-xl mt-4">Build coming in Phase 4</p>
        </Container>
      </Section>
    </>
  );
};

export default Home;