"use client";

interface BottomOfCardProps {
  id: string;
  onFlip: () => void;
  onOpenChannel: () => void;
  onOpenChat: () => void;
  permissions?: any;
}

export default function BottomOfCard({ id, onFlip, onOpenChannel, onOpenChat, permissions }: BottomOfCardProps) {
  const allowChat = permissions?.allowChat !== false;

  return (
    <div className="flex gap-1.5 pt-2 mt-auto w-full">
      
      {allowChat && (
        <button 
          onClick={(e) => {
            e.stopPropagation(); 
            if (onOpenChat) onOpenChat();
          }}
          className="flex-1 flex items-center justify-center py-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 text-stone-500 hover:text-[#1c1917] text-[10px] font-bold uppercase tracking-wide transition-all border border-transparent hover:border-stone-200"
        >
           Chat
        </button>
      )}
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          if (onOpenChannel) onOpenChannel();
        }}
        className="flex-1 flex items-center justify-center py-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 text-stone-500 hover:text-[#1c1917] text-[10px] font-bold uppercase tracking-wide transition-all border border-transparent hover:border-stone-200"
      >
         Channel
      </button>
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          if (onFlip) onFlip();
        }} 
        className="flex-1 flex items-center justify-center py-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 text-stone-500 hover:text-[#1c1917] text-[10px] font-bold uppercase tracking-wide transition-all border border-transparent hover:border-stone-200"
      >
         Flip
      </button>
    </div>
  );
}