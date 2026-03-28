"use client";

import TopOfFrontCard from "./TopOfFrontCard";
import BodyOfSingleCard from "./BodyOfSingleCard";
import BottomOfCard from "./BottomOfCard";

export default function FrontOfCard(props: any) {
  return (
    <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-gray-200 p-5 font-sans flex flex-col justify-between gap-3 relative z-20">
      <TopOfFrontCard {...props} />
      
      {/* Body handles bio, location, and status */}
      <BodyOfSingleCard {...props} /> 
      
      {/* Explicitly mapping the handlers to the bottom buttons */}
      <BottomOfCard 
        id={props.id}
        permissions={props.permissions}
        onFlip={props.onFlip}
        onOpenChannel={props.onOpenChannel}
        onOpenChat={() => {
          if (props.onOpenChat) props.onOpenChat(props);
        }}
      />
    </div>
  );
}