"use client";

import { ChatWindow } from "@/components/chat-window";
import { useRef } from "react";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <main ref={ref} className="size-full p-4">
      <ChatWindow containerRef={ref} />
    </main>
  );
}
