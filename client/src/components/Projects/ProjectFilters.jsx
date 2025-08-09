import React from 'react';
import Badge from '../UI/Badge';

const ProjectFilters = ({ tags, selectedTag, onTagSelect }) => {
  const allTags = ['all', ...tags];
  
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {allTags.map(tag => (
        <button
          key={tag}
          onClick={() => onTagSelect(tag === 'all' ? null : tag)}
          className={`px-4 py-2 font-semibold uppercase text-sm transition-all ${
            (tag === 'all' && !selectedTag) || selectedTag === tag
              ? 'bg-brand-black text-neutral-50'
              : 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default ProjectFilters;