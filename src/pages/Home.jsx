import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { content } from '../data/content';
import { FadeIn } from '../components/FadeIn';
import { StatusDot } from '../components/StatusDot';
import { Map, MapMarker, MarkerContent } from '../components/Map';
import { ProjectCard } from '../components/ProjectCard';
import { cn } from '@/lib/utils';
import { Book, FileText, Layout, MapPin, Link as LinkIcon, Mail } from 'lucide-react';

import { ModeToggle } from '../components/ModeToggle';
import { PlantAnimation } from '../components/PlantAnimation';

const Home = () => {
  const { profile, currently, summary, projects, notes, volunteer, contact, location } = content;
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-300">
      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col gap-8">
          
          <div className="flex justify-end mb-[-2rem] relative z-20">
            <ModeToggle />
          </div>

          {/* HEADER SECTION (Formerly Sidebar) */}
          <section className="flex flex-col gap-6">
             <motion.div 
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
                initial="hidden"
                animate="visible"
                variants={{
                   hidden: { opacity: 0 },
                   visible: {
                      opacity: 1,
                      transition: {
                         staggerChildren: 0.1,
                         delayChildren: 0.1
                      }
                   }
                }}
             >
                 <motion.div 
                    className="md:col-span-8 flex flex-col gap-6"
                    variants={{
                       hidden: { opacity: 0, x: -20 },
                       visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
                    }}
                 >
                     <div className="flex flex-col gap-2">
                         <h1 className="text-4xl font-bold tracking-tight text-foreground flex items-baseline gap-3">
                            {profile.name}
                            {profile.nickname && (
                              <span className="text-xl font-normal text-muted-foreground/60 italic font-mono">
                                /{profile.nickname}
                              </span>
                            )}
                         </h1>
                        <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-2xl">{profile.descriptor}</p>
                     </div>

                     {/* Plant Animation */}
                     <motion.div
                        variants={{
                           hidden: { opacity: 0, y: 20 },
                           visible: { opacity: 1, y: 0, transition: { delay: 0.3 } }
                        }}
                     >
                        <PlantAnimation />
                     </motion.div>

                     <div className="flex flex-col gap-4">
                         <div className="flex items-center gap-2 text-sm text-foreground/80">
                            <StatusDot label={null} />
                            <motion.span 
                                animate={{ opacity: [0.8, 1, 0.8] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            >
                                Available for new opportunities
                            </motion.span>
                         </div>
                         
                         <div className="flex flex-wrap gap-3 text-sm">
                            {contact.map((item, idx) => (
                              <motion.a 
                                key={idx} 
                                href={item.link.startsWith('http') ? item.link : `https://${item.link}`}
                                className="flex items-center gap-2 hover:text-primary transition-colors border border-border/50 hover:border-border px-3 py-1.5 rounded-md bg-secondary/50 hover:bg-secondary"
                                target="_blank" 
                                rel="noreferrer"
                                whileTap={{ scale: 0.95 }}
                              >
                                {item.label === 'email' ? <Mail className="w-3.5 h-3.5" /> : <LinkIcon className="w-3.5 h-3.5" />}
                                {item.link.replace('https://', '').replace('mailto:', '')}
                              </motion.a>
                            ))}
                         </div>
                     </div>
                 </motion.div>

                 {/* Map Section - Compact */}
                 <motion.div 
                    className="md:col-span-4 w-full h-40 md:h-full min-h-[160px] rounded-xl border border-border overflow-hidden relative shadow-sm"
                    variants={{
                       hidden: { opacity: 0, scale: 0.95 },
                       visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
                    }}
                 >
                    <Map
                      initialViewState={{
                        longitude: location.lng,
                        latitude: location.lat,
                        zoom: 11
                      }}
                      className="w-full h-full"
                    >
                      <MapMarker longitude={location.lng} latitude={location.lat}>
                        <MarkerContent>
                          <div className="relative flex size-4">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                            <span className="relative inline-flex size-4 rounded-full bg-sky-500"></span>
                          </div>
                        </MarkerContent>
                      </MapMarker>
                    </Map>
                    <div className="absolute bottom-2 left-2 bg-background/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-medium rounded border border-border shadow-sm flex items-center gap-1">
                       <MapPin className="w-3 h-3" />
                       {location.label}
                    </div>
                 </motion.div>
             </motion.div>
          </section>

          {/* MAIN CONTENT */}
          <main className="flex flex-col gap-6">
            
            {/* TABS Navigation */}
            <div className="border-b border-border mb-4 sticky top-0 bg-background/95 backdrop-blur z-10">
              <nav className="flex gap-6 -mb-px overflow-x-auto">
                <TabButton 
                  isActive={activeTab === 'overview'} 
                  onClick={() => setActiveTab('overview')} 
                  icon={<Layout className="w-4 h-4"/>}
                  label="Overview"
                />
                {/* Repositories Tab removed */}
                <TabButton 
                  isActive={activeTab === 'notes'} 
                  onClick={() => setActiveTab('notes')} 
                  icon={<FileText className="w-4 h-4"/>}
                  label="Notes"
                  count={notes?.length}
                />
              </nav>
            </div>

            {/* TAB CONTENT */}
            <div className="min-h-[50vh]">
              <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
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
              )}



             {activeTab === 'notes' && (
                <motion.div 
                    key="notes"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col divide-y divide-border border-t border-border"
                >
                  {notes && notes.map((note, index) => (
                    <motion.div 
                        key={index} 
                        className="py-4 flex items-center justify-between cursor-pointer hover:bg-muted/20 px-2 rounded-md transition-colors"
                        whileTap={{ scale: 0.99 }}
                    >
                        <div className="flex flex-col gap-1">
                             <a href={note.link} className="font-medium hover:text-blue-500 hover:underline">{note.title}</a>
                             <span className="text-xs text-muted-foreground">Category: Thoughts</span>
                        </div>
                        <span className="text-sm text-muted-foreground font-mono">{note.date}</span>
                    </motion.div>
                  ))}
                   {(!notes || notes.length === 0) && (
                       <div className="py-12 text-center text-muted-foreground">No public notes yet.</div>
                   )}
                </motion.div>
              )}
              </AnimatePresence>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
};


const TabButton = ({ isActive, onClick, icon, label, count }) => (
    <motion.button 
        onClick={onClick}
        whileTap={{ scale: 0.95 }}
        className={cn(
            "flex items-center gap-2 px-1 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap outline-none",
            isActive 
                ? "border-orange-500 text-foreground" 
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
        )}
    >
        {icon}
        {label}
        {count !== undefined && (
            <span className="bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded-full">
                {count}
            </span>
        )}
    </motion.button>
);

export default Home;
