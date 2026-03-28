import { create } from 'zustand';

interface CardsSearchState {
  activeChannelData: any | null;
  activeChatUser: any | null;
  activeProfileUser: any | null;
  
  // Navigation Actions
  openChannel: (data: any) => void;
  openChat: (user: any) => void;
  openProfile: (user: any) => void;
  closeAllViews: () => void;
}

export const useCardsSearchStore = create<CardsSearchState>((set) => ({
  activeChannelData: null,
  activeChatUser: null,
  activeProfileUser: null,

  openChannel: (data) => {
    set({ activeChannelData: data, activeChatUser: null, activeProfileUser: null });
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
  openChat: (user) => {
    set({ activeChatUser: user, activeChannelData: null, activeProfileUser: null });
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
  openProfile: (user) => {
    set({ activeProfileUser: user, activeChannelData: null, activeChatUser: null });
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
  closeAllViews: () => set({ 
    activeChannelData: null, 
    activeChatUser: null, 
    activeProfileUser: null 
  }),
}));