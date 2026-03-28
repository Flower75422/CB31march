import { create } from 'zustand';

interface ChatMessage {
  id: string;
  text: string;
  time: string;
  isSender: boolean;
}

interface ChatsState {
  activeTab: string;
  activeChatId: string | null;
  
  // Lists
  directChats: any[];
  channels: any[];
  groups: any[];
  
  // Message Histories (Key is the Chat/Channel ID)
  messages: Record<string, ChatMessage[]>;

  // Actions
  setActiveTab: (tab: string) => void;
  setActiveChatId: (id: string | null) => void;
  sendMessage: (text: string) => void;
}

export const useChatsStore = create<ChatsState>((set, get) => ({
  activeTab: "chats",
  activeChatId: "1", // Default open chat on page load
  
  directChats: [
    { id: "1", name: "Aisha Khan", lastMsg: "See you then!", time: "12:45 PM" },
    { id: "2", name: "Alex Rivera", lastMsg: "Got the designs.", time: "Yesterday" }
  ],
  channels: [
    { id: "c1", name: "Design Hub", handle: "@design_daily", time: "1h" },
    { id: "c2", name: "Web3 Alpha", handle: "@web3_alpha", time: "2h" }
  ],
  groups: [
    { id: "g1", name: "Frontend Masters", lastMsg: "Alex: Merged the PR.", time: "4:00 PM" }
  ],

  // Initial Message Database
  messages: {
    "1": [
      { id: "m1", text: "Hey! Let's build something awesome.", time: "10:30 AM", isSender: false },
      { id: "m2", text: "Absolutely. The new architecture is ready.", time: "10:32 AM", isSender: true }
    ],
    "2": [
      { id: "m3", text: "Are the designs ready for review?", time: "Yesterday", isSender: true },
      { id: "m4", text: "Got the designs.", time: "Yesterday", isSender: false }
    ],
    "g1": [
      { id: "m5", text: "Group project is due tomorrow!", time: "10:30 AM", isSender: false }
    ]
  },

  // 🔴 THE FIX: Auto-selects the first item in the list instead of setting to null
  setActiveTab: (tab) => set((state) => {
    let newActiveId = null;
    
    if (tab === "chats" && state.directChats.length > 0) {
      newActiveId = state.directChats[0].id;
    } else if (tab === "channels" && state.channels.length > 0) {
      newActiveId = state.channels[0].id;
    } else if (tab === "groups" && state.groups.length > 0) {
      newActiveId = state.groups[0].id;
    }

    return { activeTab: tab, activeChatId: newActiveId };
  }),
  
  setActiveChatId: (id) => set({ activeChatId: id }),
  
  sendMessage: (text) => set((state) => {
    if (!state.activeChatId) return state;

    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSender: true
    };

    const currentMessages = state.messages[state.activeChatId] || [];
    
    // Update the "lastMsg" preview in the sidebar
    const updateList = (list: any[]) => list.map(item => 
      item.id === state.activeChatId ? { ...item, lastMsg: text, time: "Just now" } : item
    );

    return {
      messages: { ...state.messages, [state.activeChatId]: [...currentMessages, newMessage] },
      directChats: state.activeTab === "chats" ? updateList(state.directChats) : state.directChats,
      groups: state.activeTab === "groups" ? updateList(state.groups) : state.groups,
    };
  })
}));