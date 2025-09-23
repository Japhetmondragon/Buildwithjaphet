import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../UI/Card';
import Badge from '../UI/Badge';
import { toPublicUrl, FALLBACK_SVG } from "../../utils/publicUrl";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  
  return (
    <Card 
      onClick={() => navigate(`/projects/${project.slug}`)}
      className="h-full flex flex-col"
    >
      <div className="aspect-video bg-neutral-200 mb-4 overflow-hidden">
        <img
          src={toPublicUrl(project.heroImage)}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => { e.currentTarget.src = FALLBACK_SVG; }}
        />
      </div>
      
      <h3 className="font-display text-2xl uppercase mb-2">{project.title}</h3>
      
      <p className="text-neutral-600 mb-4 flex-grow">{project.summary}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.slice(0, 3).map(tag => (
          <Badge key={tag} variant="default">
            {tag}
          </Badge>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <span className="text-neutral-600">{project.role}</span>
        <span className="text-brand-blue font-semibold uppercase">View →</span>
      </div>
    </Card>
  );
};

export default ProjectCard;