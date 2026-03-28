"use client";

import { useState } from "react";
import { FilePlus, LayoutGrid, ChevronRight, ArrowLeft } from "lucide-react";
import CardEditor from "./CardEditor";
import CardSettingsTopBar from "./cardsettingstopbar/CardSettingsTopBar";
import CardSettingsFilterBar from "./cardsettingsfilterbar/CardSettingsFilterBar";

import { useAuthStore } from "@/store/auth/auth.store";
import { useCardsEditorStore } from "@/store/cards/cards.editor.store";
import { useCardsFeedStore } from "@/store/cards/cards.feed.store";
import { useCommunitiesStore } from "@/store/communities/communities.store";

export default function CardSettings() {
  const { user } = useAuthStore();
  
  const { 
    draftCards, activeIndex, setActiveIndex, 
    addNewDraft, deleteDraft, setIsSettingsView, updateActiveDraft 
  } = useCardsEditorStore();
  
  const { setMyCards, saveSingleCard, deleteCard } = useCardsFeedStore(); 
  const { myChannels } = useCommunitiesStore();

  const [showEmptyStateChannelSelect, setShowEmptyStateChannelSelect] = useState(false);

  const activeCard = draftCards[activeIndex];
  const isDeckEmpty = draftCards.length === 0;

  const isValidCard = (card: any) => {
    const name = card?.channel?.name?.trim();
    const handle = card?.channel?.id?.trim();
    return name && handle && name.length > 0 && handle.length > 0;
  };

  const handleSaveDeck = () => {
    const hasInvalidCard = draftCards.some(card => !isValidCard(card));
    if (hasInvalidCard) {
      alert("Cannot save! Please ensure all cards have a valid Card Name and Card Handle.");
      return; 
    }
    setMyCards([...draftCards]); 
    setIsSettingsView(false);    
  };

  const handleSaveSingleCard = (index: number) => {
    const targetCard = draftCards[index];
    if (!isValidCard(targetCard)) {
      alert("Cannot save! Please ensure this card has a valid Card Name and Card Handle.");
      return; 
    }
    saveSingleCard(targetCard);
    alert(`"${targetCard.channel.name || 'Card'}" saved to your deck successfully!`);
  };

  const handleDeleteCard = (index: number) => {
    const cardToDelete = draftCards[index];
    if (!cardToDelete) return;
    deleteCard(cardToDelete.id); 
    deleteDraft(index);          
  };

  const handleBack = () => {
    setIsSettingsView(false); 
  };

  // 🔴 THE FIX: Removed the useEffect that changed document.body.style.overflow to stop the rendering freeze!

  return (
    // 🔴 THE FIX: Consolidated animations here. Slide + Fade + High Z-Index + Shadow to make it pop.
    <div className="fixed inset-y-0 right-0 left-[256px] flex flex-col items-center bg-[#FDFBF7] overflow-hidden p-6 pt-2 select-none z-[100] animate-in slide-in-from-right-8 fade-in duration-300 shadow-2xl">
      
      <CardSettingsTopBar onBack={handleBack} onSave={handleSaveDeck} isEmpty={isDeckEmpty} />
      
      {isDeckEmpty ? (
        
        <div className="flex-1 w-full flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300 pb-20">
          <div className="flex flex-col items-center max-w-sm w-full gap-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-[#1c1917] tracking-tight">Your Deck is Empty</h2>
              <p className="text-[13px] font-medium text-stone-500">Create a blank identity or link one of your existing communities to get started.</p>
            </div>

            {!showEmptyStateChannelSelect ? (
              <div className="flex flex-col gap-3 w-full">
                <button 
                  onClick={() => addNewDraft(user)} 
                  className="group flex items-center p-4 bg-white border border-stone-200 rounded-2xl hover:border-black hover:shadow-md transition-all text-left"
                >
                  <div className="h-12 w-12 bg-stone-100 rounded-xl flex items-center justify-center group-hover:bg-[#1c1917] group-hover:text-white transition-colors text-stone-600 mr-4 shrink-0">
                    <FilePlus size={22} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[14px] font-black text-[#1c1917]">Create Blank Card</h3>
                    <p className="text-[11px] font-bold text-stone-400 mt-0.5">Start entirely from scratch</p>
                  </div>
                  <ChevronRight size={18} className="text-stone-300 group-hover:text-[#1c1917] transition-colors" />
                </button>

                <button 
                  onClick={() => setShowEmptyStateChannelSelect(true)} 
                  className="group flex items-center p-4 bg-white border border-stone-200 rounded-2xl hover:border-black hover:shadow-md transition-all text-left"
                >
                  <div className="h-12 w-12 bg-stone-100 rounded-xl flex items-center justify-center group-hover:bg-[#1c1917] group-hover:text-white transition-colors text-stone-600 mr-4 shrink-0">
                    <LayoutGrid size={22} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[14px] font-black text-[#1c1917]">Link Existing Channel</h3>
                    <p className="text-[11px] font-bold text-stone-400 mt-0.5">Import an active community</p>
                  </div>
                  <ChevronRight size={18} className="text-stone-300 group-hover:text-[#1c1917] transition-colors" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col w-full animate-in slide-in-from-right-8 duration-200">
                <button 
                  onClick={() => setShowEmptyStateChannelSelect(false)} 
                  className="text-[11px] font-black uppercase tracking-widest text-stone-400 hover:text-black self-start flex items-center gap-1.5 mb-4 px-2 py-1 -ml-2 rounded-lg hover:bg-stone-100 transition-colors"
                >
                  <ArrowLeft size={14} strokeWidth={3} /> Back
                </button>
                
                <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-stone-50 border-b border-stone-100 px-4 py-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Select a Channel</span>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto no-scrollbar flex flex-col p-2 gap-1 w-full">
                    {myChannels.length === 0 ? (
                      <div className="text-center py-8 text-[12px] font-bold text-stone-400">No channels available.</div>
                    ) : (
                      myChannels.map(channel => (
                        <button 
                          key={channel.id} 
                          onClick={() => { 
                            addNewDraft(user, channel); 
                            setShowEmptyStateChannelSelect(false); 
                          }} 
                          className="flex items-center p-3 rounded-xl hover:bg-stone-100 border border-transparent hover:border-stone-200 transition-colors text-left group"
                        >
                          <div className="flex-1 min-w-0 pr-4">
                            <h3 className="text-[13px] font-bold text-[#1c1917] truncate">{channel.name}</h3>
                            <p className="text-[11px] font-semibold text-stone-400 mt-0.5 truncate">{channel.handle}</p>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      ) : (

        <>
          <CardSettingsFilterBar 
            cards={draftCards} 
            activeIndex={activeIndex} 
            setActiveIndex={setActiveIndex} 
            onAdd={(existingChannel: any) => addNewDraft(user, existingChannel)} 
            onDelete={handleDeleteCard} 
            onSaveSingleCard={handleSaveSingleCard} 
          />
          
          <div className="flex-1 w-full max-w-4xl mx-auto overflow-hidden">
            {activeCard && (
              <CardEditor 
                user={user} 
                card={activeCard} 
                updateCard={updateActiveDraft} 
                onDelete={() => handleDeleteCard(activeIndex)} 
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}