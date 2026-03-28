"use client";

import { useState } from "react";
import { Sparkles, Shuffle } from "lucide-react";
import { useCardsFeedStore } from "@/store/cards/cards.feed.store";
import GridLayout from "./GridLayout";

export default function GridContainer({ isOpen, myInterests, handleTopicSelect }: any) {
  const { refreshInterestPool } = useCardsFeedStore();
  const [isAnimating, setIsAnimating] = useState(false);

  if (!isOpen) return null;

  const handleShuffle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnimating(true);
    refreshInterestPool();
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="absolute right-0 top-full mt-2 w-[340px] bg-white border border-stone-200 shadow-2xl rounded-2xl p-4 z-[999] animate-in fade-in zoom-in-95 duration-200 origin-top-right">
      
      <div className="flex items-center justify-between mb-3 border-b border-stone-100 pb-3">
        <div className="flex items-center gap-1.5 text-[#1c1917]">
          <Sparkles size={14} className="text-amber-500" />
          <span className="text-[12px] font-black uppercase tracking-widest">Discover Pool</span>
        </div>
        
        <button 
          onClick={handleShuffle}
          className="flex items-center gap-1.5 text-[10px] font-black uppercase text-stone-500 hover:text-black transition-colors bg-stone-50 border border-stone-200 hover:border-stone-300 px-2.5 py-1.5 rounded-lg shadow-sm active:scale-95"
        >
          <Shuffle size={12} className={isAnimating ? "animate-spin-fast" : ""} /> Shuffle
        </button>
      </div>

      <GridLayout 
        isAnimating={isAnimating}
        myInterests={myInterests}
        handleTopicSelect={handleTopicSelect} 
      />
      
      <div className="mt-3 pt-2 border-t border-stone-100 text-center">
        <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Select a topic to pin it to your feed</span>
      </div>
    </div>
  );
}