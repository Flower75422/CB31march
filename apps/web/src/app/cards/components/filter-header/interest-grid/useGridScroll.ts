"use client";

import { useRef } from "react";

// The new Flex-Wrap layout uses native CSS smooth scrolling. 
// This hook is preserved for structural consistency but allows native behavior to take over.
export default function useGridScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  return { scrollRef };
}