"use client";

import { ArrowLeft, Save } from "lucide-react";

interface TopBarProps {
  onBack: () => void;
  onSave: () => void;
  isEmpty?: boolean; // 🔴 NEW: Flag to know if the deck is empty
}

export default function CardSettingsTopBar({ onBack, onSave, isEmpty = false }: TopBarProps) {
  return (
    <div className="flex-shrink-0 flex items-center justify-between mt-8 mb-6 px-1 w-full max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-stone-200 transition text-[#1c1917] bg-white border border-stone-200 shadow-sm active:scale-95">
          <ArrowLeft size={16} strokeWidth={2.5} />
        </button>
        <h1 className="text-[19px] font-black text-[#1c1917] tracking-tight leading-none">
          Card Deck Manager
        </h1>
      </div>

      {/* 🔴 CONDITIONAL RENDERING: Only show Save Deck if there are actually cards to save! */}
      {!isEmpty && (
        <button 
          onClick={onSave}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1c1917] hover:bg-black text-white rounded-xl text-[12px] font-black uppercase tracking-wider transition-all active:scale-95 shadow-md border border-black"
        >
          <Save size={16} strokeWidth={2.5} /> Save Deck
        </button>
      )}
    </div>
  );
}