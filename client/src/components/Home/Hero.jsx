import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../UI/Container';
import Button from '../UI/Button';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-neutral-50 to-neutral-100">
      <Container>
        <div className="max-w-5xl">
          <h1 className="text-2xl font-display uppercase leading-[0.85] mb-6 animate-slide-up">
            I Build
            <span className="block text-brand-blue">Websites That</span>
            <span className="block">Make Money</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-600 mb-8 max-w-2xl animate-fade-in" style={{animationDelay: '0.2s'}}>
            Full-stack developer who turns business problems into 
            <span className="text-brand-black font-semibold"> revenue-generating solutions</span>. 
            Just results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <Link to="/projects">
              <Button size="lg" variant="primary">
                View My Work
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="secondary">
                Let's Talk Money
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl animate-fade-in" style={{animationDelay: '0.6s'}}>
            <div>
              <div className="text-3xl font-display text-brand-blue">47%</div>
              <div className="text-sm text-neutral-600 uppercase tracking-wider">Avg Conversion Lift</div>
            </div>
            <div>
              <div className="text-3xl font-display text-brand-blue">2.4s</div>
              <div className="text-sm text-neutral-600 uppercase tracking-wider">Avg Load Time</div>
            </div>
            <div>
              <div className="text-3xl font-display text-brand-blue">3</div>
              <div className="text-sm text-neutral-600 uppercase tracking-wider">Industries Served</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;