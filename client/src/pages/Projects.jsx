import React, { useState, useMemo } from 'react';
import Container from '../components/UI/Container';
import Section from '../components/UI/Section';
import Heading from '../components/UI/Heading';
import Loader from '../components/UI/Loader';
import ErrorMessage from '../components/UI/ErrorMessage';
import ProjectCard from '../components/Projects/ProjectCard';
import ProjectFilters from '../components/Projects/ProjectFilters';
import { useProjects } from '../hooks/useProjects';

const Projects = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const { projects, loading, error, refetch } = useProjects(
    selectedTag ? { tag: selectedTag } : {}
  );
  
  const allTags = useMemo(() => {
    const tagSet = new Set();
    projects.forEach(project => {
      project.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [projects]);
  
  return (
    <Section>
      <Container>
        <div className="mb-12">
          <Heading level="h1" animate>
            Projects
          </Heading>
          <p className="text-xl text-neutral-600 mt-4">
            Real solutions. Real results. No fluff.
          </p>
        </div>
        
        {loading ? (
          <Loader size="lg" className="py-20" />
        ) : error ? (
          <ErrorMessage message={error} onRetry={refetch} />
        ) : (
          <>
            <ProjectFilters 
              tags={allTags}
              selectedTag={selectedTag}
              onTagSelect={setSelectedTag}
            />
            
            {projects.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-neutral-600">No projects found.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map(project => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            )}
          </>
        )}
      </Container>
    </Section>
  );
};

export default Projects;