"use client";

import CardsGrid from "../CardsGrid";
import SingleCard from "../single-card";
import { useAuthStore } from "@/store/auth/auth.store";
import { useCardsFeedStore } from "@/store/cards/cards.feed.store";
import { useCardsSearchStore } from "@/store/cards/cards.search.store";

export default function Feed({ onEditCard }: { onEditCard: (id: string) => void }) {
  const { user } = useAuthStore();
  const { activeFilter, myCards, followedCards, trendingCards, toggleFollowCard } = useCardsFeedStore();
  const { openChannel, openChat } = useCardsSearchStore();

  // BULLETPROOFING: Force these to ALWAYS be arrays
  const safeMyCards = myCards || [];
  const safeFollowedCards = followedCards || [];
  const safeTrendingCards = trendingCards || [];

  let displayCards: any[] = [];

  // Formats your personal cards safely
  const myFormattedCards = safeMyCards.filter((c: any) => activeFilter === "My Cards" || c.channel?.isPublic).map((c: any) => ({
      id: c.id, 
      name: user?.name, 
      handle: user?.handle, 
      avatarUrl: user?.avatarUrl,
      views: c.stats?.views, 
      likes: c.stats?.likes, 
      posts: c.stats?.posts,
      description: c.bio, 
      channelName: c.channel?.name, 
      channelHandle: c.channel?.id,
      mediaUrl: c.backMediaUrl,
      mediaType: "image", 
      primaryInterest: c.interests?.primary, 
      permissions: c.permissions,
      location: c.location 
  }));

  // Apply feed logic (🔴 NO MORE HEADER TITLES OR BADGES GENERATED HERE)
  if (activeFilter === "Following") {
    displayCards = safeFollowedCards;
  } else if (activeFilter === "Trending") {
    displayCards = safeTrendingCards;
  } else if (activeFilter === "My Cards") {
    displayCards = myFormattedCards;
  } else {
    // Generates mock filler cards for "For You" or any Custom Topic
    const generateCards = (topic: string) => Array.from({ length: 6 }).map((_, i) => ({
      id: `${topic}-${i}`, name: i % 2 === 0 ? "Sarah Designer" : "Devon Lewis", handle: i % 2 === 0 ? "@sarah_ux" : "@dev_lewis",
      avatarUrl: i % 2 === 0 ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80" : "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&q=80",
      views: "1.2k", likes: 69, posts: 12, description: `Exploring the best practices in ${topic === "For You" ? "digital creation" : topic}.`,
      createdAt: "2h ago", channelName: `${i % 2 === 0 ? "Sarah Designer" : "Devon Lewis"}'s Channel`, 
      channelHandle: "creator_hub",
      mediaUrl: i % 2 === 0 ? "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60" : "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
      mediaType: "image",
      interests: { primary: topic === "For You" ? "Design" : topic }
    }));
    
    displayCards = activeFilter === "For You" ? [...myFormattedCards, ...generateCards(activeFilter)] : generateCards(activeFilter);
  }

  // FINAL CRASH PROTECTION
  const finalCardsToRender = displayCards || [];

  return (
    // Added a slight top padding (pt-2) so it breathes nicely under your horizontal tabs
    <div className="animate-in fade-in duration-500 w-full pt-2">
      
      {/* 🔴 THE FIX: Completely nuked the header div. It's gone forever. */}

      <CardsGrid>
        {finalCardsToRender.length > 0 ? (
          finalCardsToRender.map((card: any) => {
            const isMyCardGlobally = safeMyCards.some((myCard: any) => myCard.id === card.id);
            const isFollowedGlobally = safeFollowedCards.some((c: any) => c.id === card.id);

            return (
              <SingleCard 
                key={card.id} 
                {...card} 
                isFollowed={isFollowedGlobally} 
                onFollowToggle={() => toggleFollowCard(card)} 
                onOpenChannel={() => openChannel({ channelName: card.channelName, handle: `@${card.channelHandle}` })} 
                onOpenChat={card.permissions?.allowChat === false ? undefined : () => openChat(card)}
                isMyCardView={isMyCardGlobally}
                onEditCard={() => onEditCard(card.id)}
              />
            );
          })
        ) : (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-stone-400">
            <span className="text-[13px] font-bold">No cards found.</span>
          </div>
        )}
      </CardsGrid>
    </div>
  );
}