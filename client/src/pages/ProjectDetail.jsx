import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from '../components/UI/Container';
import Section from '../components/UI/Section';
import Heading from '../components/UI/Heading';
import Button from '../components/UI/Button';
import Badge from '../components/UI/Badge';
import Loader from '../components/UI/Loader';
import ErrorMessage from '../components/UI/ErrorMessage';
import { useProject } from '../hooks/useProjects';
import { toPublicUrl, FALLBACK_SVG } from "../utils/publicUrl";

function Gallery({ images, projectTitle }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openAt = (i) => { setIndex(i); setOpen(true); };
  const close = () => setOpen(false);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  // Keyboard controls when lightbox is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Grid (no cropping) */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, i) => {
          const src = toPublicUrl(img);
          return (
            <button
              key={i}
              type="button"
              onClick={() => openAt(i)}
              className="group block bg-white border rounded-lg overflow-hidden cursor-zoom-in"
              aria-label={`Open ${projectTitle} image ${i + 1}`}
            >
              <img
                src={src}
                alt={`${projectTitle} screenshot ${i + 1}`}
                className="w-full h-auto max-h-80 object-contain bg-neutral-200 transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
                onError={(e) => { e.currentTarget.src = FALLBACK_SVG; }}
              />
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
          aria-modal="true"
          role="dialog"
        >
          <div className="relative max-w-[95vw] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={toPublicUrl(images[index])}
              alt={`${projectTitle} full view ${index + 1}`}
              className="max-w-[95vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />

            {/* Controls */}
            <button
              onClick={close}
              className="absolute top-2 right-2 rounded-full bg-white/90 hover:bg-white p-2 text-neutral-800"
              aria-label="Close"
            >
              ✕
            </button>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white p-3"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white p-3"
              aria-label="Next"
            >
              ›
            </button>

            {/* Index indicator */}
            <div className="absolute bottom-2 right-1/2 translate-x-1/2 rounded-full bg-white/80 px-3 py-1 text-sm text-neutral-800">
              {index + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}


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
            <span className="text-neutral-600 hover:text-brand-blue transition-colors">
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
          <div className="aspect-video bg-neutral-200 overflow-hidden flex items-center justify-center">
            <img
              src={toPublicUrl(project.heroImage)}  // <-- was project.heroImage
              alt={project.title}
              className="h-full w-auto max-w-full object-contain"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = FALLBACK_SVG; // no external DNS
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

            {/* Lightbox state */}
            <Gallery projectTitle={project.title} images={project.gallery} />
          </Container>
        </Section>
      )}
    </>
  );
};

export default ProjectDetail;