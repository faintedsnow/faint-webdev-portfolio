import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { content } from '../data/content';
import { FadeIn } from '../components/ui/FadeIn';
import { ProfileHeader } from '../components/ProfileHeader';
import { OverviewTab } from '../components/Tabs/OverviewTab';
import { NotesTab } from '../components/Tabs/NotesTab';
import { cn } from '@/lib/utils';
import { FileText, Layout } from 'lucide-react';
import { ModeToggle } from '../components/ui/ModeToggle';

const Home = () => {
  const { profile, currently, summary, projects, notes, contact, location } = content;
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-300">
      <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col gap-8">
          
          <div className="flex justify-end mb-[-2rem] relative z-20">
            <ModeToggle />
          </div>

          <ProfileHeader profile={profile} contact={contact} location={location} />

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
                  <OverviewTab summary={summary} currently={currently} projects={projects} />
                )}
                {activeTab === 'notes' && (
                  <NotesTab notes={notes} />
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
