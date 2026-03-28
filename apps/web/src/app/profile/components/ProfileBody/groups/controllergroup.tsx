"use client";
import { useRouter } from "next/navigation";
import { useProfileStore } from "@/store/profile/profile.store";
import EmptyCommunityState from "../../EmptyCommunityState";
// 🔴 Pointing to the new local file we just created!
import ProfileGroupCard from "./ProfileGroupCard"; 

export default function ControllerGroup() {
  const router = useRouter();
  const { groups } = useProfileStore();

  if (!groups || groups.length === 0) {
    return <EmptyCommunityState type="group" onCreate={() => router.push("/communities")} />;
  }

  return (
    <div className="w-full">
      <div className="animate-in fade-in slide-in-from-bottom-3 duration-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
          {groups.map((group) => (
            <ProfileGroupCard 
              key={group.id} 
              group={group} 
              onOpenChat={() => router.push("/chats")} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}