import React from 'react';
import { motion } from "motion/react";
import { ProjectCard } from '../ProjectCard';

export const OverviewTab = ({ summary, currently, projects }) => {
  return (
    <motion.div 
      key="overview"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-8"
    >
      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none border rounded-md p-6 bg-card text-card-foreground">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">about</h3>
        <p className="text-foreground leading-relaxed whitespace-pre-line">{summary}</p>
        
        <div className="mt-8 pt-6 border-t border-border">
          <h4 className="text-sm font-medium mb-3">Currently working on</h4>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            {currently.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Selected Works</h3>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};
