import { create } from 'zustand';

// Existing Wallpost Interface
interface Wallpost {
  id: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  facet: string;
  stats: { views: string | number; likes: number };
  date: string;
}

// 🔴 NEW: Interfaces matching your Card Props
interface ProfileChannel {
  id: number;
  title: string;
  subs: string;
  owner: string;
  desc: string;
  trending?: boolean;
  isPrivate?: boolean;
  avatarUrl?: string;
  isJoined?: boolean;
}

interface ProfileGroup {
  id: number;
  title: string;
  members: string;
  owner: string;
  desc: string;
  isPrivate?: boolean;
  activity: string;
  avatarUrl?: string;
  isJoined?: boolean;
}

interface ProfileState {
  profileData: {
    name: string;
    username: string;
    avatarUrl: string;
    stats: { followers: string | number; following: string | number; views: string | number; };
    bio: { location: string; text: string; status: string; };
  };
  wallposts: Wallpost[];
  channels: ProfileChannel[]; // 🔴 NEW
  groups: ProfileGroup[];     // 🔴 NEW
}

export const useProfileStore = create<ProfileState>((set) => ({
  profileData: {
    name: "Wasim Akram Dudekula",
    username: "wasim_dev",
    avatarUrl: "https://ui-avatars.com/api/?name=Wasim+Akram&background=F5F5F4&color=78716c",
    stats: { followers: "1.2k", following: "450", views: "12.8k" },
    bio: {
      location: "Hyderabad, India",
      text: "Full-Stack Engineer exploring the social space through technology. Passionate about scalable systems, Python, and Next.js.",
      status: "Posted in Channels 2h ago: Building the ultimate social media platform called Cobucket."
    }
  },
  
  wallposts: [
    { id: "post_1", mediaUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60", mediaType: "image", facet: "Software Dev", stats: { views: "2.4k", likes: 142 }, date: "Oct 12, 2025" },
    { id: "post_2", mediaUrl: "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_24fps.mp4", mediaType: "video", facet: "Startup Founder", stats: { views: "8.1k", likes: 890 }, date: "Oct 05, 2025" },
    { id: "post_3", mediaUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60", mediaType: "image", facet: "UI/UX Design", stats: { views: "1.2k", likes: 95 }, date: "Sep 28, 2025" }
  ],

  // 🔴 NEW: 3 Mock Channels to fill 1 Row
  channels: [
    { id: 1, title: "Next.js Masters", subs: "12.4k", owner: "Wasim Akram", desc: "Official broadcast for Next.js and React architecture updates.", trending: true, isJoined: true },
    { id: 2, title: "UI/UX Daily", subs: "8.1k", owner: "Wasim Akram", desc: "Daily design inspiration, Figma tips, and UI breakdowns.", isPrivate: true, isJoined: true },
    { id: 3, title: "Backend Alpha", subs: "3.2k", owner: "Wasim Akram", desc: "System design, databases, and Python architecture deep dives.", isJoined: true }
  ],

  // 🔴 NEW: 3 Mock Groups to fill 1 Row
  groups: [
    { id: 1, title: "Python Devs", members: "1.2k", owner: "Wasim Akram", desc: "Discussing Django, APIs, and backend scripting.", activity: "Very Active", isJoined: true },
    { id: 2, title: "Startup Builders", members: "450", owner: "Wasim Akram", desc: "Networking for indie hackers and solo founders.", isPrivate: true, activity: "Active", isJoined: true },
    { id: 3, title: "Crypto Traders", members: "8.9k", owner: "Wasim Akram", desc: "Real-time alpha, Web3, and market analysis.", activity: "Very Active", isJoined: true }
  ]
}));