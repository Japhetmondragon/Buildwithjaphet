import React from 'react';
import Container from '../UI/Container';
import Section from '../UI/Section';
import Heading from '../UI/Heading';

const ValueProp = () => {
  const values = [
    {
      title: "Speed Kills Competition",
      description: "Sites that load in under 3 seconds. Because every second costs you 7% in conversions."
    },
    {
      title: "Built to Scale",
      description: "Architecture that handles your first user and your millionth without breaking a sweat."
    },
    {
      title: "ROI Focused",
      description: "Every line of code written with one goal: make you more money than you spend."
    }
  ];
  
  return (
    <Section>
      <Container>
        <div className="max-w-4xl mx-auto">
          <Heading level="h2" className="text-center mb-16">
            Why Clients Choose Me
          </Heading>
          
          <div className="space-y-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="flex gap-6 items-start p-6 border-l-4 border-brand-red hover:bg-neutral-50 transition-colors"
              >
                <div className="text-4xl font-display text-brand-red">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="font-display text-2xl uppercase mb-2">
                    {value.title}
                  </h3>
                  <p className="text-lg text-neutral-600">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default ValueProp;