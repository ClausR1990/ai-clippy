"use client";
import { cn } from "@/lib/utils";
import { motion, useAnimationControls, useDragControls } from "framer-motion";
import Image from "next/image";
import { PointerEventHandler, use, useEffect, useRef, useState } from "react";

import AppIcon from "@/public/icons/chat_icon.png";

type ChatWindowProps = {
  containerRef: React.RefObject<HTMLDivElement>;
};

const ChatWindow = ({ containerRef }: ChatWindowProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dragControls = useDragControls();
  const animationControls = useAnimationControls();
  const [appStarted, setAppStarted] = useState(false);
  const [appMaximized, setAppMaximized] = useState(false);
  const [windowOpen, setWindowOpen] = useState(false);

  useEffect(() => {
    if (appStarted) {
      setWindowOpen(true);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [appStarted]);

  useEffect(() => {
    if (appMaximized) {
      animationControls.set({ x: 0, y: 0 });
    }
  }, [animationControls, appMaximized]);

  const handleStartApp = () => {
    setAppStarted(true);
  };

  const closeApp = () => {
    setWindowOpen(false);
    setAppStarted(false);
  };

  const startDrag: PointerEventHandler<HTMLDivElement> = (event) => {
    dragControls.start(event, { snapToCursor: false });
  };

  return (
    <>
      <motion.div
        className="w-10 h-10 p-1 active:outline-dotted active:outline-1"
        drag
        dragElastic={0}
        dragMomentum={false}
        onDoubleClick={handleStartApp}
        dragConstraints={containerRef}
      >
        <Image
          src={AppIcon}
          alt=""
          className="select-none pointer-events-none"
        />
      </motion.div>
      <motion.div
        className={cn(
          "window fixed inset-x-0 mx-auto flex-col",
          appMaximized
            ? "!w-full !h-[calc(100%_-28px)] inset-0 resize-none overflow-hidden transform"
            : "w-[500px] resize overflow-auto",
          windowOpen ? "flex" : "hidden"
        )}
        animate={animationControls}
        drag={appMaximized ? false : true}
        dragElastic={0}
        dragMomentum={false}
        dragConstraints={containerRef}
        dragControls={dragControls}
        dragListener={false}
      >
        <div className="title-bar" onPointerDown={startDrag}>
          <div className="title-bar-text pointer-events-none cursor-none">
            Chat Window
          </div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button
              aria-label="Maximize"
              onClick={() => setAppMaximized(!appMaximized)}
            />
            <button aria-label="Close" onClick={closeApp} />
          </div>
        </div>

        <div className="window-body flex-grow flex flex-col justify-between">
          <div className="field-row-stacked min-h-1 flex-grow">
            <textarea
              className={cn("w-full h-full resize-none")}
              rows={8}
              disabled
            ></textarea>
          </div>
          <div className="field-row">
            <input ref={inputRef} type="text" className="w-full" />
            <button>Send</button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export { ChatWindow };
