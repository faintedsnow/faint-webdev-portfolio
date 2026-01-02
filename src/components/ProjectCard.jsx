import React, { useState } from 'react';
import { motion } from "motion/react";
import { Book, ExternalLink, Github, ChevronLeft, ChevronRight, Maximize2, Play } from 'lucide-react';

export const ProjectCard = ({ project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <motion.div 
      className="group/card border border-border rounded-lg overflow-hidden bg-card shadow-sm hover:shadow-md transition-all duration-300"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, borderColor: "hsl(var(--primary) / 0.3)" }}
    >
        {/* Media Preview Section - Shown First */}
        {project.demo && (
            <div className="relative w-full h-[320px] bg-gradient-to-br from-muted/30 to-muted/10 overflow-hidden">
                <iframe 
                    src={project.demo} 
                    title={`Demo of ${project.title}`}
                    className="w-full h-full border-0"
                    loading="lazy"
                />
                
                {/* Enhanced controls overlay */}
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-20">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-white/90 text-xs font-medium">
                            <Play className="w-3 h-3" />
                            <span>Live Demo</span>
                        </div>
                        <a 
                            href={project.demo} 
                            target="_blank" 
                            rel="noreferrer"
                            className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-md backdrop-blur-md transition-all duration-200 hover:scale-110"
                        >
                            <Maximize2 className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        )}

        {/* Image Slideshow */}
        {project.images && !project.demo && (
            <div className="relative w-full aspect-video bg-gradient-to-br from-muted/50 to-muted/20 group/slider">
                {/* Image with smooth transitions */}
                <motion.img 
                    key={currentImageIndex}
                    src={project.images[currentImageIndex]} 
                    alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain p-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                />
                
                {/* Gradient overlays for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-background/20 pointer-events-none" />
                
                {project.images.length > 1 && (
                    <>
                        {/* Navigation buttons with enhanced styling */}
                        <button 
                            onClick={prevImage}
                            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/90 dark:bg-foreground/90 text-foreground dark:text-background border border-border shadow-lg hover:scale-110 transition-all duration-200 opacity-0 group-hover/slider:opacity-100"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={nextImage}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/90 dark:bg-foreground/90 text-foreground dark:text-background border border-border shadow-lg hover:scale-110 transition-all duration-200 opacity-0 group-hover/slider:opacity-100"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                        
                        {/* Enhanced counter badge */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-sm font-semibold text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.9)' }}>
                            {currentImageIndex + 1} / {project.images.length}
                        </div>
                        
                        {/* Dot indicators */}
                        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover/slider:opacity-100 transition-opacity">
                            {project.images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentImageIndex(idx);
                                    }}
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                                        idx === currentImageIndex 
                                            ? 'bg-primary w-4' 
                                            : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
                                    }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        )}

        {/* Project Info with enhanced styling */}
        <div className="p-5 flex flex-col gap-3 bg-gradient-to-b from-transparent to-muted/5">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                        <Book className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold text-base text-foreground truncate">{project.title}</span>
                    <div className="ml-auto flex gap-2">
                        {project.repo && (
                            <motion.a 
                                href={project.repo} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                                onClick={(e) => e.stopPropagation()}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Github className="w-4 h-4" />
                            </motion.a>
                        )}
                        {project.demo && (
                            <motion.a 
                                href={project.demo} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                                onClick={(e) => e.stopPropagation()}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ExternalLink className="w-4 h-4" />
                            </motion.a>
                        )}
                    </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{project.description}</p>
            </div>

            <div className="flex items-center gap-3 text-xs pt-2 border-t border-border/50">
                {project.tech && (
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
                        {project.tech}
                    </div>
                )}
            </div>
        </div>
    </motion.div>
  );
};
