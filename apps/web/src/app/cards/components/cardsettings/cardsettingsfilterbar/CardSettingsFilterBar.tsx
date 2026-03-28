"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Save, Trash2, FilePlus } from "lucide-react";
import { useCommunitiesStore } from "@/store/communities/communities.store";

export default function CardSettingsFilterBar({ 
  cards, activeIndex, setActiveIndex, onAdd, onDelete, onSaveSingleCard 
}: any) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const addMenuRef = useRef<HTMLDivElement>(null);

  const [contextMenu, setContextMenu] = useState<{ x: number, y: number, index: number } | null>(null);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);

  const { myChannels } = useCommunitiesStore();

  const availableChannels = myChannels.filter((channel: any) => {
    const channelIdToMatch = channel.handle.replace('@', '');
    return !cards.some((c: any) => c.channel?.id === channelIdToMatch);
  });

  useEffect(() => {
    if (scrollContainerRef.current) scrollContainerRef.current.scrollTo({ left: scrollContainerRef.current.scrollWidth, behavior: 'smooth' });
  }, [cards.length]);

  useEffect(() => {
    const closeMenus = (e: MouseEvent) => {
      setContextMenu(null);
      if (addMenuRef.current && !addMenuRef.current.contains(e.target as Node)) setIsAddMenuOpen(false);
    };
    window.addEventListener("mousedown", closeMenus);
    return () => window.removeEventListener("mousedown", closeMenus);
  }, []);

  const handleRightClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setContextMenu({ x: e.pageX, y: e.pageY, index });
  };

  const scrollTabs = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 150;
      scrollContainerRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCreateSelection = (channelData: any = null) => {
    onAdd(channelData); 
    setIsAddMenuOpen(false);
  };

  const handleAddButtonClick = () => {
    if (availableChannels.length === 0) {
      handleCreateSelection(null); 
    } else {
      setIsAddMenuOpen(!isAddMenuOpen); 
    }
  };

  return (
    <>
      <div className="flex-shrink-0 flex items-center gap-2 mb-4 h-14 p-1.5 bg-white border border-stone-200/60 rounded-2xl shadow-sm w-full max-w-4xl mx-auto z-20 relative">
        <div className="flex items-center flex-1 min-w-0 bg-stone-50/50 rounded-xl px-1 relative h-full">
          
          <button onClick={() => scrollTabs('left')} className="p-1 hover:bg-white rounded-lg text-stone-400 shrink-0 transition-colors">
            <ChevronLeft size={14} strokeWidth={3} />
          </button>
          
          <div ref={scrollContainerRef} className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-1 scroll-smooth flex-1">
            {cards.map((c: any, idx: number) => (
              <div key={c.id} className="flex flex-col gap-1 min-w-[110px] max-w-[140px] shrink-0">
                <button 
                  onClick={() => setActiveIndex(idx)}
                  onContextMenu={(e) => handleRightClick(e, idx)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase transition-all border truncate block w-full text-center tracking-wider ${activeIndex === idx ? "bg-black text-white border-black shadow-md" : "bg-white border-stone-200 text-stone-400 hover:border-stone-400"}`}
                >
                  {c.channel?.name || "Unnamed Card"}
                </button>
                <div className="flex gap-0.5 px-1 h-[2px] w-full">
                  <div className={`flex-1 rounded-full ${c.progress >= 1 ? (activeIndex === idx ? 'bg-black' : 'bg-stone-400') : 'bg-stone-200'}`} />
                  <div className={`flex-1 rounded-full ${c.progress >= 2 ? (activeIndex === idx ? 'bg-black' : 'bg-stone-400') : 'bg-stone-200'}`} />
                  <div className={`flex-1 rounded-full ${c.progress >= 3 ? (activeIndex === idx ? 'bg-black' : 'bg-stone-400') : 'bg-stone-200'}`} />
                  <div className={`flex-1 rounded-full ${c.progress >= 4 ? (activeIndex === idx ? 'bg-black' : 'bg-stone-400') : 'bg-stone-200'}`} />
                  <div className={`flex-1 rounded-full ${c.progress >= 5 ? (activeIndex === idx ? 'bg-black' : 'bg-stone-400') : 'bg-stone-200'}`} />
                </div>
              </div>
            ))}
          </div>
          
          <button onClick={() => scrollTabs('right')} className="p-1 hover:bg-white rounded-lg text-stone-400 shrink-0 transition-colors">
            <ChevronRight size={14} strokeWidth={3} />
          </button>
          
          <div className="pl-1 pr-1 border-l border-stone-200/50 ml-1 shrink-0 h-8 flex items-center relative" ref={addMenuRef}>
            <button 
              onClick={handleAddButtonClick} 
              disabled={cards.length >= 9} 
              className={`h-full px-3 rounded-lg border-2 border-dashed transition-all flex items-center gap-1.5 text-[9px] font-black uppercase disabled:opacity-30 ${
                isAddMenuOpen ? "border-black text-black bg-stone-100" : "border-stone-300 text-stone-400 hover:text-black hover:border-black bg-white"
              }`}
            >
                <Plus size={12} strokeWidth={3} /> Add
            </button>

            {isAddMenuOpen && availableChannels.length > 0 && (
              <div className="absolute top-full mt-2 right-0 w-56 bg-white border border-stone-200 shadow-xl rounded-xl p-1.5 z-[999] animate-in fade-in zoom-in-95 duration-150">
                <button 
                  onClick={() => handleCreateSelection(null)}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-stone-100 transition-colors text-left group"
                >
                  <div className="bg-[#1c1917] text-white p-1.5 rounded-md group-hover:scale-105 transition-transform"><FilePlus size={14} /></div>
                  <div className="flex flex-col"><span className="text-[11px] font-black text-[#1c1917] uppercase tracking-wider">Blank Card</span><span className="text-[9px] font-bold text-stone-400 uppercase">Create from scratch</span></div>
                </button>

                <div className="h-px bg-stone-100 my-1 mx-2"></div>
                <div className="px-3 py-1.5 text-[9px] font-black text-stone-400 uppercase tracking-widest">Link Existing Channel</div>

                <div className="max-h-[200px] overflow-y-auto no-scrollbar">
                  {availableChannels.map((channel: any) => (
                    <button 
                      key={channel.id}
                      onClick={() => handleCreateSelection(channel)}
                      className="w-full flex items-center p-2 rounded-lg hover:bg-stone-50 border border-transparent hover:border-stone-200 transition-colors text-left"
                    >
                      <div className="flex flex-col flex-1 pl-1">
                        <span className="text-[11px] font-bold text-[#1c1917] truncate max-w-[130px]">{channel.name}</span>
                        <span className="text-[9px] font-semibold text-stone-400">{channel.handle}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 shrink-0 border-l border-stone-200/60 ml-1">
          <div className="flex flex-col items-center">
             <span className="text-[7px] font-black text-stone-400 uppercase leading-none mb-1 tracking-tighter whitespace-nowrap">My Cards {cards.length}/9</span>
             <div className="text-[11px] font-black text-[#1c1917] bg-white border-2 border-black px-2.5 py-1 rounded-md shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">MC</div>
          </div>
        </div>
      </div>

      {contextMenu && (
        <div 
          className="fixed z-[999] bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] py-1 w-40" 
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onMouseDown={(e) => e.stopPropagation()} /* 🔴 THE SHIELD: Prevents the click from escaping and closing the menu early */
        >
          <button 
            onClick={() => { 
              onSaveSingleCard(contextMenu.index); 
              setContextMenu(null); 
            }} 
            className="w-full text-left px-3 py-2 text-[10px] font-black uppercase hover:bg-stone-50 flex items-center gap-2"
          >
            <Save size={14} strokeWidth={2.5} /> Save Card
          </button>
          
          <button 
            onClick={() => { 
              onDelete(contextMenu.index); 
              setContextMenu(null); 
            }} 
            className="w-full text-left px-3 py-2 text-[10px] font-black uppercase text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-stone-100"
          >
            <Trash2 size={14} strokeWidth={2.5} /> Delete Card
          </button>
        </div>
      )}
    </>
  );
}