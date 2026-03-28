"use client";
import UserInfo from "./UserInfo";
import Bio from "./Bio";

export default function ProfileHeader() {
  return (
    <div className="bg-white rounded-[32px] p-8 -ml-4 shadow-[0_8px_30px_rgb(0,0,0,0.02)] mb-8 relative border border-stone-200/60 transition-all duration-300">
      
      {/* Profile Identity Block */}
      <UserInfo />
      
      {/* Bio Content Block */}
      <div className="mt-6">
        <Bio />
      </div>
      
    </div>
  );
}