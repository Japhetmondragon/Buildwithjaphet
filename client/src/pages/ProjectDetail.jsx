import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from '../components/UI/Container';
import Section from '../components/UI/Section';
import Heading from '../components/UI/Heading';
import Button from '../components/UI/Button';
import Badge from '../components/UI/Badge';
import Loader from '../components/UI/Loader';
import ErrorMessage from '../components/UI/ErrorMessage';
import { useProject } from '../hooks/useProjects';

const ProjectDetail = () => {
  const { slug } = useParams();
  const { project, loading, error } = useProject(slug);
  
  if (loading) return <Loader size="lg" className="min-h-screen flex items-center" />;
  if (error) return (
    <Section>
      <Container>
        <ErrorMessage message={error} />
        <div className="text-center mt-4">
          <Link to="/projects">
            <Button variant="secondary">Back to Projects</Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
  if (!project) return null;
  
  return (
    <>
      <Section className="pt-8">
        <Container>
          <Link to="/projects" className="inline-block mb-8">
            <span className="text-neutral-600 hover:text-brand-red transition-colors">
              ← Back to Projects
            </span>
          </Link>
          
          <div className="max-w-4xl">
            <Heading level="h1" animate className="mb-4">
              {project.title}
            </Heading>
            
            <p className="text-xl text-neutral-600 mb-6">{project.summary}</p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div>
                <span className="text-neutral-600">Role:</span>
                <span className="ml-2 font-semibold">{project.role}</span>
              </div>
              <div className="flex gap-2">
                {project.links.github && (
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="ghost">GitHub</Button>
                  </a>
                )}
                {project.links.live && (
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="primary">View Live</Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>
      
      <Section className="py-0">
        <Container>
          <div className="aspect-video bg-neutral-200 overflow-hidden">
            <img 
              src={project.heroImage} 
              alt={project.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/1200x675/E0E0E0/666666?text=Project';
              }}
            />
          </div>
        </Container>
      </Section>
      
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-12">
              <div>
                <Heading level="h3" className="mb-4">The Problem</Heading>
                <p className="text-lg leading-relaxed">{project.problem}</p>
              </div>
              
              <div>
                <Heading level="h3" className="mb-4">The Approach</Heading>
                <p className="text-lg leading-relaxed">{project.approach}</p>
              </div>
              
              <div>
                <Heading level="h3" className="mb-4">The Results</Heading>
                <p className="text-lg leading-relaxed">{project.results}</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h4 className="font-display uppercase mb-4">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map(tech => (
                    <Badge key={tech} variant="primary">{tech}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-display uppercase mb-4">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="default">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      
      {project.gallery && project.gallery.length > 0 && (
        <Section className="bg-neutral-100">
          <Container>
            <Heading level="h2" className="text-center mb-12">
              Project Gallery
            </Heading>
            <div className="grid md:grid-cols-2 gap-8">
              {project.gallery.map((image, index) => (
                <div key={index} className="aspect-video bg-neutral-200 overflow-hidden">
                  <img 
                    src={image} 
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/600x400/E0E0E0/666666?text=Gallery';
                    }}
                  />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
};

export default ProjectDetail;