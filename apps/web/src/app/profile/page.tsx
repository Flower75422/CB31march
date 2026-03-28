"use client";
import ProfileHeader from "./components/ProfileHeader";
import ProfileBody from "./components/ProfileBody";

export default function ProfilePage() {
  return (
    <main className="min-h-screen w-full bg-[#FDFBF7] flex flex-col items-center overflow-x-hidden">
      <div className="w-full max-w-[1400px] px-6 pt-2">
        {/* Components now independently fetch their required data from Zustand */}
        <ProfileHeader />
        <ProfileBody />
      </div>
    </main>
  );
}