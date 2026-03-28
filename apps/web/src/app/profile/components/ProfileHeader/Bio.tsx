"use client";
import { MapPin } from "lucide-react";
import { useProfileStore } from "@/store/profile/profile.store";

export default function Bio() {
  // Pull Bio data directly from the store
  const { profileData } = useProfileStore();
  const { location, text, status } = profileData.bio;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-1.5 text-stone-400">
        <MapPin size={14} />
        <span className="text-[12px] font-bold tracking-tight">{location}</span>
      </div>

      <p className="text-[14px] text-brand-black leading-relaxed font-medium max-w-2xl">
        {text}
      </p>

      <div className="pt-2 border-t border-stone-50">
        <p className="text-[12px] text-stone-500 leading-relaxed italic">
          <span className="font-bold not-italic text-stone-400 mr-1">Latest:</span>
          {status}
        </p>
      </div>
    </div>
  );
}