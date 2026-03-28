"use client";

import { useState } from "react";
import FrontOfCard from "./front/FrontOfCard";
import BackOfCard from "./back/BackOfCard";

export default function SingleCard(props: any) {
  const [isFlipped, setIsFlipped] = useState(false);

  const { onOpenChannel, onOpenChat, channelName, name, handle, isMyCardView, onEditCard } = props;

  const handleChannelClick = () => {
    if (onOpenChannel) {
      onOpenChannel({
        channelName: channelName || `${name || 'User'}'s Channel`,
        handle: handle || "@unknown"
      });
    }
  };

  return (
    <div className="group w-full h-full [perspective:1000px] z-0">
      <div 
        className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* --- FRONT SIDE --- */}
        <div className="relative w-full h-full [backface-visibility:hidden] z-20 border border-[#1c1917] rounded-2xl bg-white">
          <FrontOfCard 
            {...props} 
            onFlip={() => setIsFlipped(true)}
            onOpenChannel={handleChannelClick}
            onOpenChat={onOpenChat}
            onEditCard={onEditCard}
          />
        </div>

        {/* --- BACK SIDE --- */}
        <div className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] z-0 border border-[#1c1917] rounded-2xl overflow-hidden">
          <BackOfCard 
            {...props} 
            onFlipBack={() => setIsFlipped(false)} 
          />
        </div>
      </div>
    </div>
  );
}