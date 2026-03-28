"use client";
import { Edit } from "lucide-react";
import { useChatsStore } from "@/store/chats/chats.store";

export default function DisplayFeature() {
  // 🔴 Reads and writes directly to the global store, removing parent prop conflicts
  const { activeTab, setActiveTab } = useChatsStore();

  return (
    <div className="h-28 flex flex-col shrink-0 bg-[#FDFBF7]">
      <div className="h-16 px-4 flex items-center justify-between">
        <h2 className="text-[16px] font-black text-[#1c1917] tracking-tight">Messages</h2>
        <button className="p-2 text-stone-400 hover:text-[#1c1917] hover:bg-stone-200/50 rounded-xl transition-all active:scale-95">
          <Edit size={18} strokeWidth={2.5} />
        </button>
      </div>
      <div className="h-12 px-4 flex items-center gap-6 border-b border-stone-200/50">
        <TabButton label="Chats" active={activeTab === "chats"} onClick={() => setActiveTab("chats")} />
        <TabButton label="Channels" active={activeTab === "channels"} onClick={() => setActiveTab("channels")} />
        <TabButton label="Groups" active={activeTab === "groups"} onClick={() => setActiveTab("groups")} />
      </div>
    </div>
  );
}

function TabButton({ label, active, onClick }: any) {
  return (
    // 🔴 Crucial: onClick is passed down safely
    <button onClick={onClick} className={`relative h-full flex items-center text-[12px] font-black uppercase tracking-wider transition-colors ${active ? "text-[#1c1917]" : "text-stone-400"}`}>
      {label}
      {active && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#1c1917] rounded-t-md" />}
    </button>
  );
}