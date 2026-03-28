"use client";

import { useState, useRef, useEffect } from "react";
import InputDisplayStyle from "./InputDisplayStyle";
import OutputDisplayStyle from "./OutputDisplayStyle";

// 🔴 Import your Brain!
import { useCardsSearchStore } from "@/store/cards/cards.search.store";

export type FilterType = "people" | "channels" | "interest pool";

const MOCK_PEOPLE = [
  { id: "p1", name: "Sarah Designer", handle: "@sarah_ux", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80" },
  { id: "p2", name: "Devon Lewis", handle: "@dev_lewis", avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&q=80" },
];
const MOCK_CHANNELS = [{ id: "c1", name: "DesignSystem", handle: "@design_sys", members: "1.2k" }];
const MOCK_INTEREST_POOLS = [{ id: "i1", name: "UI/UX", posts: "4.2k" }];

export default function InCardSearchEngine() {
  // 🔴 Grab the actions directly from the store
  const { openChannel, openProfile } = useCardsSearchStore();

  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("people");
  const [isOpen, setIsOpen] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getResults = () => {
    const q = query.toLowerCase();
    if (!q) return [];
    if (activeFilter === "people") return MOCK_PEOPLE.filter(i => i.name.toLowerCase().includes(q));
    if (activeFilter === "channels") return MOCK_CHANNELS.filter(i => i.name.toLowerCase().includes(q));
    if (activeFilter === "interest pool") return MOCK_INTEREST_POOLS.filter(i => i.name.toLowerCase().includes(q));
    return [];
  };

  const handleItemClick = (item: any) => {
    setIsOpen(false);
    setQuery("");

    // 🔴 Use the store functions to open the overlays!
    if (activeFilter === "people") {
      openProfile({ name: item.name, handle: item.handle, avatarUrl: item.avatarUrl });
    } else if (activeFilter === "channels") {
      openChannel({ channelName: item.name, handle: item.handle });
    }
  };

  return (
    <div ref={containerRef} className="relative w-64 hidden lg:block font-sans z-50">
      <InputDisplayStyle 
        query={query} 
        onQueryChange={(val) => { setQuery(val); setIsOpen(true); }}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && (
        <div className="absolute top-full mt-2 w-[320px] right-0 bg-white border border-stone-200 shadow-xl rounded-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
          <div className="flex p-1.5 gap-1 bg-stone-50 border-b border-stone-100">
            {(["people", "channels", "interest pool"] as FilterType[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${
                  activeFilter === filter ? "bg-white text-[#1c1917] shadow-sm border border-stone-200/60" : "text-stone-400 hover:text-[#1c1917] hover:bg-stone-200/30 border border-transparent"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="p-2 max-h-64 overflow-y-auto no-scrollbar">
            <OutputDisplayStyle results={getResults()} query={query} activeFilter={activeFilter} onResultClick={handleItemClick} />
          </div>
        </div>
      )}
    </div>
  );
}