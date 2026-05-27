import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { useAuth } from "../context/AuthContext";
import JourneyManager from "./Admin/JourneyManager";
import { motion } from "framer-motion";

const Journey = () => {
  const [journeyTimeline, setJourneyTimeline] = useState([]);
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const fetchJourney = async () => {
      try {
        const res = await API.get("/api/journey");
        const sortedData = (res.data || []).sort((a, b) => {
           const yearA = parseInt(a.year) || 0;
           const yearB = parseInt(b.year) || 0;
           return yearB - yearA; 
        });
        setJourneyTimeline(sortedData);
      } catch (err) {
        console.error("Failed to load journey data:", err);
      }
    };
    fetchJourney();
  }, []);

  return (
    <div className="bg-surface-deep min-h-screen pt-32 pb-section-gap-lg text-on-surface">
      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-gutter">
        
        {}
        <div className="mb-16 text-center md:text-left">
          <span className="font-label-caps text-label-caps text-primary tracking-widest block mb-4">
            THE TIMELINE
          </span>
          <h1 className="text-headline-lg-mobile md:text-headline-xl font-geist mb-6">My Journey</h1>
          <p className="text-body-lg text-text-dim max-w-2xl mx-auto md:mx-0">
            A chronological look at my evolution as a Product Engineer, the roles I've held, and the milestones I've achieved.
          </p>
        </div>

        {}
        {journeyTimeline.length === 0 ? (
           <p className="text-text-dim label-caps text-center py-12">Loading timeline...</p>
        ) : (
          <div className="relative">
             {}
             <div className="hidden md:block absolute top-[24px] left-0 w-full h-[1px] bg-border-subtle" />
             
             {}
             <div className="flex flex-col md:flex-row gap-8 md:overflow-x-auto pb-8 custom-scrollbar">
               {journeyTimeline.map((item, idx) => (
                 <motion.div 
                   key={item._id}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: idx * 0.1 }}
                   className="relative flex-shrink-0 w-full md:w-[400px] glass-card p-8 rounded-xl flex flex-col md:mt-12"
                 >
                   {}
                   <div className="hidden md:flex absolute -top-[48px] left-8 w-4 h-4 rounded-full bg-primary ring-[8px] ring-surface-deep shadow-[0_0_15px_rgba(45,91,255,0.5)] z-10" />

                   <h2 className="font-mono text-headline-lg text-primary mb-4">{item.year}</h2>
                   <h3 className="text-headline-md text-on-surface mb-2">{item.title}</h3>
                   <p className="text-body-md text-text-dim flex-1 leading-relaxed">{item.description}</p>
                 </motion.div>
               ))}
             </div>
          </div>
        )}

        {}
        {isAdmin && (
          <div className="mt-20">
             <div className="glass-card p-6 rounded-xl">
               <h3 className="label-caps text-text-dim mb-6">ADMIN CONTROLS</h3>
               <JourneyManager />
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Journey;
