"use client";
import { Bell, Share, Info } from "lucide-react";
import { useChatsStore } from "@/store/chats/chats.store";
import { useEffect, useRef } from "react";

export default function ChannelContentFeed({ data, onToggleInfo, isInfoOpen }: any) {
  const name = data?.name || "Channel";
  
  // 🔴 THE FIX: Moved `|| []` OUTSIDE
  const messages = useChatsStore(state => state.messages[data?.id]) || [];
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#FAFAFA]">
      <div className="h-16 px-6 bg-stone-50 flex justify-between items-center shrink-0 z-10 border-b border-stone-100">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={onToggleInfo}>
          <div className="h-10 w-10 rounded-[14px] bg-white border border-stone-200 overflow-hidden flex items-center justify-center text-stone-500 font-black">{name.charAt(0)}</div>
          <div className="flex flex-col"><h2 className="text-[15px] font-black text-[#1c1917] group-hover:text-black">{name}</h2><p className="text-[11px] text-stone-400 font-bold">12.4k subscribers</p></div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2.5 text-stone-400 hover:bg-stone-100 hover:text-[#1c1917] rounded-xl transition-all"><Bell size={18} strokeWidth={2.5} /></button>
          <button className="p-2.5 text-stone-400 hover:bg-stone-100 hover:text-[#1c1917] rounded-xl transition-all"><Share size={18} strokeWidth={2.5} /></button>
          <button onClick={onToggleInfo} className={`p-2.5 rounded-xl transition-all active:scale-95 ${isInfoOpen ? 'bg-[#1c1917] text-white' : 'text-stone-400 hover:bg-stone-100 hover:text-[#1c1917]'}`}><Info size={18} strokeWidth={2.5} /></button>
        </div>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar p-6 flex flex-col gap-4 scroll-smooth">
        
        <div className="bg-white border border-stone-200/60 rounded-2xl p-5 shadow-sm mb-2">
           <p className="text-[14px] font-bold text-[#1c1917]">Welcome to the official channel broadcast. Only admins can post here.</p>
        </div>

        {messages.map((msg: any) => (
          <div key={msg.id} className="bg-white border border-stone-200/60 rounded-2xl p-5 shadow-sm">
             <p className="text-[14px] font-medium text-[#1c1917] leading-relaxed">{msg.text}</p>
             <div className="mt-4 text-[10px] font-black text-stone-400 uppercase tracking-widest">{msg.time}</div>
          </div>
        ))}
        
      </div>
    </div>
  );
}