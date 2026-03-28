import { create } from 'zustand';

// Master keyword database for the dropdown
const MASTER_KEYWORD_DB = [
  "Artificial Intelligence", "UI/UX Design", "Web3", "SaaS", "Venture Capital", "Machine Learning",
  "Frontend", "Backend", "DevOps", "Crypto", "Digital Art", "Startups"
];

interface CardsFeedState {
  activeFilter: string;
  myCards: any[];
  followedCards: any[];
  globalFeed: any[]; // 🔴 NEW: The master database of everyone's cards
  interestPool: string[];
  
  setActiveFilter: (filter: string) => void;
  setMyCards: (cards: any[]) => void;
  saveSingleCard: (card: any) => void; 
  deleteCard: (cardId: string) => void; 
  toggleFollowCard: (card: any) => void;
  refreshInterestPool: () => void;
}

export const useCardsFeedStore = create<CardsFeedState>((set, get) => ({
  activeFilter: "For You",
  myCards: [], 
  
  // Cards you specifically follow
  followedCards: [
    { id: "f1", name: "Mike Creator", handle: "@mike_builds", stats: { views: 4000, likes: 210, posts: 8 }, bio: "Day 12 of building my SaaS...", channel: { name: "Mike's Startup Journey", id: "mike_builds", isPublic: true }, interests: { primary: "SaaS" }, progress: 3 },
  ],

  // 🔴 THE GLOBAL DATABASE: Represents all users on the platform
  globalFeed: [
    { id: "g1", name: "Startup Daily", handle: "@startups", stats: { views: 150000, likes: 8900, posts: 156 }, bio: "YCombinator just released their new list.", channel: { name: "Startup Daily", id: "startups", isPublic: true }, interests: { primary: "Startups" }, progress: 5, backMediaUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=60" },
    { id: "g2", name: "AI Weekly", handle: "@ai_news", stats: { views: 82000, likes: 6400, posts: 42 }, bio: "DeepMind's new model solves geometry.", channel: { name: "AI Weekly", id: "ai_news", isPublic: true }, interests: { primary: "Artificial Intelligence" }, progress: 4, backMediaUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=60" },
    { id: "g3", name: "Sarah Dev", handle: "@sarah_codes", stats: { views: 1200, likes: 85, posts: 4 }, bio: "Exploring Next.js 14 and Tailwind.", channel: { name: "Sarah's Dev Log", id: "sarah_codes", isPublic: true }, interests: { primary: "Frontend" }, progress: 2 },
    { id: "g4", name: "Crypto Whale", handle: "@whale_alert", stats: { views: 340000, likes: 12000, posts: 890 }, bio: "Tracking large blockchain movements.", channel: { name: "Whale Alerts", id: "whale_alert", isPublic: true }, interests: { primary: "Web3" }, progress: 5 },
    { id: "g5", name: "Design Hub", handle: "@design_hub", stats: { views: 45000, likes: 3200, posts: 112 }, bio: "Curated UI/UX inspiration daily.", channel: { name: "Design Hub", id: "design_hub", isPublic: true }, interests: { primary: "UI/UX Design" }, progress: 4 }
  ],

  interestPool: [],

  setActiveFilter: (filter) => set({ activeFilter: filter }),
  setMyCards: (cards) => set({ myCards: cards }),
  
  saveSingleCard: (card) => set((state) => {
    const exists = state.myCards.find(c => c.id === card.id);
    if (exists) return { myCards: state.myCards.map(c => c.id === card.id ? card : c) };
    return { myCards: [...state.myCards, card] };
  }),

  deleteCard: (cardId) => set((state) => ({
    myCards: state.myCards.filter(c => c.id !== cardId)
  })),
  
  toggleFollowCard: (card) => set((state) => {
    const isFollowing = state.followedCards.some(c => c.id === card.id);
    if (isFollowing) return { followedCards: state.followedCards.filter(c => c.id !== card.id) };
    return { followedCards: [card, ...state.followedCards] };
  }),

  refreshInterestPool: () => {
    const { myCards, followedCards, globalFeed } = get();
    
    // Pull interests from what you own and follow
    const userInterests = [
      ...myCards.map(c => c.interests?.primary),
      ...followedCards.map(c => c.interests?.primary),
    ].filter(Boolean); 

    const randomFiller = [...MASTER_KEYWORD_DB].sort(() => 0.5 - Math.random()).slice(0, 40);
    const combinedUniqueSet = Array.from(new Set([...userInterests, ...randomFiller]));

    for (let i = combinedUniqueSet.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combinedUniqueSet[i], combinedUniqueSet[j]] = [combinedUniqueSet[j], combinedUniqueSet[i]];
    }

    set({ interestPool: combinedUniqueSet });
  }
}));