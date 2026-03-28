// apps/web/src/app/cards/components/single-card/back/BodyOfBackCard.ts
"use client";

import { Play } from "lucide-react";

export default function BodyOfBackCard({ mediaUrl, mediaType = "image" }: any) {
  return (
    <div className="w-full h-[120px] bg-gray-50 rounded-xl overflow-hidden relative group border border-gray-100 flex items-center justify-center">
      {mediaUrl ? (
        <div className="w-full h-full">
          {mediaType === "video" ? (
            <div className="relative w-full h-full bg-black">
              <video src={mediaUrl} className="w-full h-full object-cover opacity-90" muted loop playsInline />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40">
                  <Play size={10} className="text-white fill-white" />
                </div>
              </div>
            </div>
          ) : (
            <img src={mediaUrl} alt="Back" className="w-full h-full object-cover" />
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center opacity-40">
          <span className="text-[9px] font-bold text-gray-500 uppercase">No Media Attached</span>
        </div>
      )}
    </div>
  );
}