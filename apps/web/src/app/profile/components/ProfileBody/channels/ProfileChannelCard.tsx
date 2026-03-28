"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical, Share, Flag, LogOut, ShieldCheck, UserPlus, Heart, Eye, FileText, TrendingUp } from "lucide-react";

export interface Channel {
  id: number;
  title: string;
  subs: string;
  owner: string;
  desc: string;
  trending?: boolean;
  isPrivate?: boolean;
  topics?: string[];
  avatarUrl?: string;
  isJoined?: boolean;
}

export default function ProfileChannelCard({ channel, onOpenChat }: { channel: Channel, onOpenChat?: (channel: Channel) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setIsMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpenChat = () => {
    if (!channel.isPrivate) {
      if (onOpenChat) onOpenChat(channel);
    } else {
      alert("This is a private channel. You must request access to join.");
    }
  };

  return (
    <div className="h-[220px] bg-white p-5 rounded-[28px] border border-stone-100 hover:shadow-xl hover:shadow-stone-200/40 transition-all flex flex-col justify-between group">
      
      {/* TOP */}
      <div onClick={handleOpenChat} className={`flex justify-between items-start relative z-20 ${!channel.isPrivate ? "cursor-pointer" : "cursor-not-allowed opacity-90"}`}>
        <div className="flex gap-3 min-w-0">
          <div className="h-10 w-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0 border border-blue-100/50 overflow-hidden relative">
            {channel.avatarUrl ? <img src={channel.avatarUrl} alt={channel.title} className="w-full h-full object-cover" /> : <span className="text-[16px] font-black uppercase text-blue-600">{channel.title.charAt(0)}</span>}
          </div>
          <div className="min-w-0 pt-0.5">
            <h3 className="text-[13px] font-bold text-[#1c1917] truncate leading-tight tracking-tight flex items-center gap-1.5">
              {channel.title}
              {channel.isPrivate && <ShieldCheck size={12} className="text-stone-400 shrink-0" />}
            </h3>
            <p className="text-[10px] text-stone-400 font-semibold tracking-wide">{channel.subs} Subscribers</p>
          </div>
        </div>

        <div className="shrink-0 relative" ref={menuRef}>
          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }} className="p-1.5 -mr-1.5 text-stone-400 hover:text-[#1c1917] hover:bg-stone-100 rounded-full transition-colors active:scale-95">
            <MoreVertical size={18} />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 top-8 w-36 bg-white rounded-xl shadow-xl border border-stone-200/60 z-50 py-1.5 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
              <button onClick={(e) => e.stopPropagation()} className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-bold text-[#1c1917] hover:bg-stone-50 transition-colors"><Share size={14} className="text-stone-400" /> Share</button>
              <button onClick={(e) => e.stopPropagation()} className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-bold text-[#1c1917] hover:bg-stone-50 transition-colors"><Flag size={14} className="text-stone-400" /> Report</button>
              <div className="h-px bg-stone-100 my-1 mx-2"></div>
              {channel.isJoined ? (
                <button onClick={(e) => e.stopPropagation()} className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-bold text-red-600 hover:bg-red-50 transition-colors"><LogOut size={14} className="text-red-400" /> Leave</button>
              ) : (
                <button onClick={(e) => e.stopPropagation()} className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-bold text-[#1c1917] hover:bg-stone-50 transition-colors"><UserPlus size={14} className="text-stone-400" /> Subscribe</button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* BODY */}
      <div className="flex flex-col gap-2 py-1">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-stone-400 text-[10px] font-bold"><Heart size={12} className="text-rose-400/70" /> 1.8k</div>
          <div className="flex items-center gap-1 text-stone-400 text-[10px] font-bold"><Eye size={12} /> 1.2k</div>
          <div className="flex items-center gap-1 text-stone-400 text-[10px] font-bold"><FileText size={12} /> 5</div>
        </div>
        <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-2 px-0.5">{channel.desc}</p>
        {channel.trending && (
          <div className="flex items-center gap-1 w-fit bg-amber-50/60 text-amber-600 px-2 py-0.5 rounded-md border border-amber-100/40">
             <TrendingUp size={10} />
             <span className="text-[8px] font-black uppercase tracking-tighter">Trending Today</span>
          </div>
        )}
      </div>

      {/* BOTTOM */}
      <div className="flex items-center justify-between pt-3 border-t border-stone-50">
        <div className="flex flex-col">
          <span className="text-[8px] font-black text-stone-300 uppercase tracking-widest leading-none mb-0.5">Owned By</span>
          <span className="text-[10px] font-bold text-stone-500 truncate max-w-[100px]">{channel.owner}</span>
        </div>
        <button className={`px-5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm active:scale-95 transition-all ${channel.isPrivate ? "bg-[#1c1917] text-white hover:bg-black" : "bg-blue-500 text-white hover:bg-blue-600"}`}>
          {channel.isPrivate ? "Request" : "Follow"}
        </button>
      </div>

    </div>
  );
}