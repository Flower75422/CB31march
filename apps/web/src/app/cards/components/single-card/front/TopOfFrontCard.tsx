"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Check, MoreVertical, Heart, FileText, UserPlus, ShieldAlert, Ban, EyeOff, Eye, Settings } from "lucide-react";

export default function TopOfFrontCard({ 
  name, handle, views, likes, posts, avatarUrl,
  isFollowed, onFollowToggle, isMyCardView, onEditCard,
  // 🔴 NEW PROPS: Ready to be wired to your Feed store to actually remove cards
  onLikeToggle, onHideCard, onReportCard, onBlockCard 
}: any) {
  
  // States
  const [isFollowing, setIsFollowing] = useState(isFollowed || false);
  const [showFollowBtn, setShowFollowBtn] = useState(!isFollowed && !isMyCardView); 
  const [isLiked, setIsLiked] = useState(false); // 🔴 New State for visually liking a card
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const safeName = name || "User";
  const safeHandle = handle || "@unknown";
  const finalAvatar = avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(safeName)}&background=F5F5F4&color=78716c`;

  // Auto-hide the quick-follow button after clicking it
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isFollowing && showFollowBtn) {
      timer = setTimeout(() => setShowFollowBtn(false), 1500); 
    }
    return () => clearTimeout(timer);
  }, [isFollowing, showFollowBtn]);

  // Click outside to close menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setIsMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- HANDLERS ---

  // 1. Quick '+' Button Follow
  const handleQuickFollow = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setIsFollowing(true);
    if (onFollowToggle) onFollowToggle(); 
  };

  // 2. Dropdown Connect/Unfollow Sync
  const handleDropdownFollowToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newStatus = !isFollowing;
    setIsFollowing(newStatus);
    setShowFollowBtn(!newStatus); // Bring the '+' button back if they unfollow
    if (onFollowToggle) onFollowToggle();
    setIsMenuOpen(false);
  };

  // 3. Dropdown Like
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    if (onLikeToggle) onLikeToggle();
    setIsMenuOpen(false);
  };

  return (
    <div className="flex items-start justify-between w-full gap-2 relative z-50">
      
      {/* --- LEFT: Profile Info --- */}
      <div className="flex gap-3 flex-1 min-w-0">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full border border-[#E7E5E4] shadow-sm overflow-hidden bg-stone-100 relative group">
             <img src={finalAvatar} alt={safeName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
        </div>

        <div className="flex flex-col pt-0.5 min-w-0">
          <h3 className="font-bold text-[#1c1917] text-[14px] leading-tight tracking-tight truncate pr-1">{safeName}</h3>
          <p className="text-[11px] text-[#a8a29e] font-medium mb-1.5 truncate">{safeHandle}</p>
          <div className="flex items-center gap-2.5 text-[#a8a29e] text-[10px] font-bold tracking-tight">
            <div className="flex items-center gap-1 group shrink-0"><Eye size={12} className="text-[#d6d3d1]" /><span>{views || 0}</span></div>
            <div className="w-[2px] h-[2px] rounded-full bg-[#E7E5E4] shrink-0"></div>
            <div className="flex items-center gap-1 group shrink-0"><Heart size={12} className="text-[#d6d3d1]" /><span>{likes || 0}</span></div>
            <div className="w-[2px] h-[2px] rounded-full bg-[#E7E5E4] shrink-0"></div>
            <div className="flex items-center gap-1 group shrink-0"><FileText size={12} className="text-[#d6d3d1]" /><span>{posts || 0}</span></div>
          </div>
        </div>
      </div>

      {/* --- RIGHT: Actions & Menu --- */}
      <div className="flex items-center gap-0 shrink-0 relative" ref={menuRef}>
        
        {/* QUICK FOLLOW BUTTON (Never renders for owners) */}
        {!isMyCardView && (
          <div className={`transition-all duration-500 ${showFollowBtn ? 'opacity-100 scale-100' : 'opacity-0 scale-0 w-0'}`}>
            {showFollowBtn && (
              <button 
                onClick={handleQuickFollow} 
                disabled={isFollowing} 
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 -mr-2 relative z-10 ${isFollowing ? "bg-[#1c1917] text-white shadow-sm cursor-default" : "text-[#a8a29e] hover:bg-[#F5F5F4] hover:text-[#1c1917]"}`}
              >
                {isFollowing ? <Check size={16} strokeWidth={2.5} /> : <Plus size={18} />}
              </button>
            )}
          </div>
        )}
        
        {/* 3-DOT MENU BUTTON */}
        <button 
          onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }} 
          className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${isMenuOpen ? "bg-[#F5F5F4] text-[#1c1917]" : "text-[#a8a29e] hover:bg-[#F5F5F4]"}`}
        >
          <MoreVertical size={18} />
        </button>

        {/* 🔴 DROPDOWN LOGIC: Strictly separated by Ownership */}
        {isMenuOpen && (
          <div className="absolute right-0 top-10 w-40 bg-white rounded-xl shadow-xl border border-[#E7E5E4] z-[999] py-1 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
            
            {isMyCardView ? (
               // 🛡️ OWNER VIEW: Admin Tools Only
               <button 
                 onClick={(e) => { e.stopPropagation(); if (onEditCard) onEditCard(); setIsMenuOpen(false); }} 
                 className="w-full flex items-center gap-3 px-3 py-2 text-[12px] font-bold text-[#57534e] hover:bg-[#FDFBF7] hover:text-[#1c1917] transition-colors"
               >
                 <Settings size={14} /> Edit Card Settings
               </button>
            ) : (
              // 👥 VIEWER VIEW: Social & Moderation Tools
              <>
                <button 
                  onClick={handleLikeClick} 
                  className={`w-full flex items-center gap-3 px-3 py-2 text-[12px] font-bold transition-colors ${isLiked ? "text-red-500 hover:bg-red-50" : "text-[#57534e] hover:bg-[#FDFBF7] hover:text-[#1c1917]"}`}
                >
                  <Heart size={14} className={isLiked ? "fill-red-500" : ""} /> {isLiked ? "Liked" : "Like"}
                </button>
                
                <button 
                  onClick={handleDropdownFollowToggle} 
                  className="w-full flex items-center gap-3 px-3 py-2 text-[12px] font-bold text-[#57534e] hover:bg-[#FDFBF7] hover:text-[#1c1917] transition-colors"
                >
                  <UserPlus size={14} /> {isFollowing ? "Unfollow" : "Connect"}
                </button>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); if (onHideCard) onHideCard(); setIsMenuOpen(false); }} 
                  className="w-full flex items-center gap-3 px-3 py-2 text-[12px] font-bold text-[#57534e] hover:bg-[#FDFBF7] hover:text-[#1c1917] transition-colors"
                >
                  <EyeOff size={14} /> Hide
                </button>
                
                <div className="h-px bg-[#E7E5E4] my-1 mx-2"></div>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); if (onReportCard) onReportCard(); setIsMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-[12px] font-bold text-red-500 hover:bg-red-50 transition-colors"
                >
                  <ShieldAlert size={14} /> Report
                </button>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); if (onBlockCard) onBlockCard(); setIsMenuOpen(false); }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-[12px] font-bold text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Ban size={14} /> Block
                </button>
              </>
            )}

          </div>
        )}
      </div>
    </div>
  );
}