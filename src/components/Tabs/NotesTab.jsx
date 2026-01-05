import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from 'lucide-react';

export const NotesTab = ({ notes }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <motion.div 
      key="notes"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col divide-y divide-border border-t border-border"
    >
      {notes && notes.map((note, index) => {
        const isExpanded = expandedIndex === index;
        return (
          <motion.div 
            key={index} 
            className="py-4 flex flex-col cursor-pointer hover:bg-muted/10 px-2 rounded-md transition-colors"
            onClick={() => toggleExpand(index)}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-1">
                <span className="font-medium text-foreground flex items-center gap-2">
                  {note.title} {note.emoji && <span>{note.emoji}</span>}
                </span>
                <span className="text-xs text-muted-foreground">Category: {note.category}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground font-mono">{note.date}</span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </motion.div>
              </div>
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 pb-2 text-sm text-foreground/90 leading-relaxed whitespace-pre-line border-t border-border/50 mt-4">
                    {note.body}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
      {(!notes || notes.length === 0) && (
        <div className="py-12 text-center text-muted-foreground">No public notes yet.</div>
      )}
    </motion.div>
  );
};
