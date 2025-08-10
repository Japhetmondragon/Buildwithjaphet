import React from 'react';
import Container from '../components/UI/Container';
import Section from '../components/UI/Section';
import Heading from '../components/UI/Heading';
import Badge from '../components/UI/Badge';

const About = () => {
  const skills = {
    "Frontend": ["React", "TypeScript", "Next.js", "Tailwind", "Redux"],
    "Backend": ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB"],
    "Tools": ["AWS", "Docker", "Git", "CI/CD", "Figma"]
  };
  
  const stats = [
    { number: "2+", label: "Years Helping Businesses Online" },
    { number: "5", label: "Ongoing Projects" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "24h", label: "Avg Response Time" }
  ];
  
  return (
    <>
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <Heading level="h1" animate className="mb-8">
              About Me
            </Heading>
            
            <div className="prose prose-xl max-w-none space-y-6 text-neutral-700">
              <p className="text-2xl font-semibold text-brand-black">
                I'm a full-stack developer who speaks both code and business.
              </p>
              
              <p>
                Started coding at 21. Left college to go all-in on building skills that 
                actually make money. Now I help small businesses and startups 
                turn ideas into profitable websites, sales funnels, and ad campaigns.
              </p>
              <p>
                I don't do vanity metrics. I don't build "pretty" websites that don't convert. 
                I build revenue-focused web applications and marketing systems 
                where every feature serves a clear ROI.
              </p>
              
              <p>
                 When I'm not writing code, I'm probably deep in market research, 
                 testing ad strategies, or figuring out how to make your 
                 competitor’s website feel outdated.
              </p>
            </div>
          </div>
        </Container>
      </Section>
      
      <Section className="bg-neutral-100">
        <Container>
          <Heading level="h2" className="text-center mb-12">
            Skills That Pay Bills
          </Heading>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <h3 className="font-display text-xl uppercase mb-4 text-brand-blue">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map(skill => (
                    <Badge key={skill} variant="primary">{skill}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      
      <Section>
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-display text-brand-blue mb-2">
                  {stat.number}
                </div>
                <div className="text-sm uppercase tracking-wider text-neutral-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
};

export default About;