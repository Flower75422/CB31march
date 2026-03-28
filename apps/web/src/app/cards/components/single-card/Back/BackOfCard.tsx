"use client";

import TopOfSingleBackCard from "./TopOfSingleBackCard";
import BodyOfBackCard from "./BodyOfBackCard";
import BottomOfBackCard from "./BottomOfBackCard";

export default function BackOfCard(props: any) {
  return (
    <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-gray-200 p-5 font-sans flex flex-col justify-between">
      <TopOfSingleBackCard {...props} />
      <BodyOfBackCard {...props} />
      <div className="flex flex-col gap-2">
        <BottomOfBackCard {...props} />
      </div>
    </div>
  );
}