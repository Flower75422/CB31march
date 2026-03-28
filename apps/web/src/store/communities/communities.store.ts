import { create } from 'zustand';

interface CommunitiesState {
  myChannels: any[];
  myGroups: any[];
  setMyChannels: (channels: any[]) => void;
  setMyGroups: (groups: any[]) => void;
}

export const useCommunitiesStore = create<CommunitiesState>((set) => ({
  // 🔴 MOCK DATA: These represent channels you built in the Communities tab
  myChannels: [
    { id: "chan_1", name: "Web3 Founders", handle: "@web3_founders", members: 120 },
    { id: "chan_2", name: "UI/UX Daily", handle: "@ui_daily", members: 840 }
  ],
  myGroups: [],
  
  setMyChannels: (channels) => set({ myChannels: channels }),
  setMyGroups: (groups) => set({ myGroups: groups }),
}));