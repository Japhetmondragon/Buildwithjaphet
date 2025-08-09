import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../UI/Container';
import Section from '../UI/Section';
import Heading from '../UI/Heading';
import Button from '../UI/Button';
import ProjectCard from '../Projects/ProjectCard';
import { useProjects } from '../../hooks/useProjects';

const FeaturedProjects = () => {
  const { projects, loading } = useProjects();
  const featured = projects.filter(p => p.featured).slice(0, 3);
  
  if (loading || featured.length === 0) return null;
  
  return (
    <Section id="featured-projects" className="bg-neutral-100">
      <Container>
        <div className="text-center mb-12">
          <Heading level="h2" animate>
            Recent Wins
          </Heading>
          <p className="text-xl text-neutral-600 mt-4">
            Proof &gt; Promises. Here's what I've shipped.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featured.map(project => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/projects">
            <Button size="lg" variant="primary">
              View All Projects
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
};

export default FeaturedProjects;