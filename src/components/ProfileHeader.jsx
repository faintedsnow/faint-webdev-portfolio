import React from 'react';
import { motion } from "motion/react";
import { Mail, Link as LinkIcon, MapPin } from 'lucide-react';
import { Map, MapMarker, MarkerContent } from './Map';
import { StatusDot } from './ui/StatusDot';
import { CatAnimation } from './CatAnimation';

export const ProfileHeader = ({ profile, contact, location }) => {
  return (
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

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { delay: 0.3 } }
            }}
          >
            <CatAnimation />
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
              zoom: 15
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
  );
};
