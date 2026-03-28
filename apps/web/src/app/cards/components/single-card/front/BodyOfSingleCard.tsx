// apps/web/src/app/cards/components/single-card/front/BodyOfSingleCard.tsx
"use client";

import { MapPin, Sparkles } from "lucide-react";

export default function BodyOfSingleCard({ description, location, primaryInterest, isMyCardView }: any) {
  const safeDescription = description || "";
  const truncatedBio = safeDescription.length > 120 
    ? safeDescription.slice(0, 120) + "..." 
    : safeDescription;

  return (
    <div className="flex flex-col flex-grow gap-2 mt-1 relative">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-[#a8a29e] text-[9px] font-bold uppercase tracking-tight">
          <MapPin size={10} className="text-[#d6d3d1]" />
          <span>{location?.enabled && location?.name ? location.name : "Global"}</span>
        </div>
        
        {/* 🔴 THE FIX: Strictly hides the Interest Tag if it is your own card */}
        {primaryInterest && !isMyCardView && (
           <span className="text-[9px] font-black uppercase text-amber-600 flex items-center gap-1">
             <Sparkles size={8} /> {primaryInterest}
           </span>
        )}
      </div>

      <div className="h-[48px] overflow-hidden">
        <p className="text-gray-700 text-xs leading-[16px] font-normal break-words">
          {truncatedBio || <span className="text-stone-400 italic">No bio provided.</span>}
        </p>
      </div>

    </div>
  );
}