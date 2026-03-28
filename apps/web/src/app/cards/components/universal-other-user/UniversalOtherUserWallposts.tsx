"use client";

import { ImageIcon } from "lucide-react";

export default function UniversalOtherUserWallposts() {
  // Mock data for the wall posts
  const MOCK_POSTS = [
    { 
      id: 1, 
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop", 
      text: "New design system updates." 
    },
    { 
      id: 2, 
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop", 
      text: "Working on some code." 
    },
    { 
      id: 3, 
      img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop", 
      text: "Office setup today." 
    },
  ];

  return (
    <div className="w-full animate-in fade-in duration-300">
      {MOCK_POSTS.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {MOCK_POSTS.map((post) => (
            <div 
              key={post.id} 
              className="aspect-square bg-stone-100 rounded-2xl overflow-hidden group cursor-pointer relative border border-stone-200"
            >
              <img 
                src={post.img} 
                alt="Post" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-white text-[11px] font-bold line-clamp-2">{post.text}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full py-20 px-6 flex flex-col items-center justify-center border-2 border-dashed border-stone-200 rounded-[40px] bg-stone-50/50">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-stone-100 mb-6">
            <ImageIcon className="text-stone-400" size={28} />
          </div>
          <h3 className="text-[15px] font-bold text-[#1c1917] mb-1">No Posts Yet</h3>
          <p className="text-[12px] text-stone-400 font-medium max-w-[220px] text-center">
            This user hasn't posted any media to their wall.
          </p>
        </div>
      )}
    </div>
  );
}