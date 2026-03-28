import { create } from 'zustand';
import { getUpdatedCards } from '@/app/cards/components/cardsettings/UpdateActiveCard'; 

interface CardsEditorState {
  isSettingsView: boolean;
  draftCards: any[];
  activeIndex: number;
  
  setIsSettingsView: (isOpen: boolean) => void;
  setDraftCards: (cards: any[]) => void;
  setActiveIndex: (index: number) => void;
  updateActiveDraft: (updates: any) => void;
  addNewDraft: (globalUser: any, existingChannel?: any) => void;
  deleteDraft: (index: number) => void; // 🔴 NEW: Takes an exact index to delete
}

export const useCardsEditorStore = create<CardsEditorState>((set, get) => ({
  isSettingsView: false,
  draftCards: [],
  activeIndex: 0,

  setIsSettingsView: (isOpen) => set({ isSettingsView: isOpen }),
  setDraftCards: (cards) => set({ draftCards: cards }),
  setActiveIndex: (index) => set({ activeIndex: index }),

  updateActiveDraft: (updates) => {
    const { draftCards, activeIndex } = get();
    const updated = getUpdatedCards(draftCards, activeIndex, updates);
    set({ draftCards: updated });
  },

  addNewDraft: (globalUser, existingChannel = null) => {
    const { draftCards } = get();
    if (draftCards.length >= 9) return;
    
    const newCard = {
      id: `card_${Date.now()}`, 
      bio: "", 
      backMediaUrl: null, 
      profilePicUrl: null,
      channel: existingChannel 
        ? { name: existingChannel.name, id: existingChannel.handle.replace('@', ''), isPublic: true } 
        : { name: "New Card", id: "", isPublic: true },
      interests: { primary: "", pool: [] },
      permissions: { allowChat: true, allowFullProfile: true, searchIndexing: true, isNSFW: false },
      team: [{ name: globalUser?.name || "You", handle: globalUser?.handle || "@user", role: "Owner" }],
      postAsChannel: true, 
      stats: { views: 0, likes: 0, posts: 0 }, 
      progress: existingChannel ? 2 : 1, 
      wallPosts: []
    };
    
    set({ draftCards: [...draftCards, newCard], activeIndex: draftCards.length });
  },

  // 🔴 THE FIX: Deletes exactly the card you target, and adjusts the active index
  deleteDraft: (index: number) => {
    const { draftCards, activeIndex } = get();
    const newCards = draftCards.filter((_, idx) => idx !== index);
    
    let newIndex = activeIndex;
    if (index === activeIndex) {
      newIndex = activeIndex >= newCards.length ? Math.max(0, newCards.length - 1) : activeIndex;
    } else if (index < activeIndex) {
      newIndex = activeIndex - 1;
    }
    
    set({ draftCards: newCards, activeIndex: newIndex });
  }
}));