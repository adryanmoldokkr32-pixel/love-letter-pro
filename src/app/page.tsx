"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import AudioButton, { useAudioPlayer } from "./components/AudioPlayer";

const ThreeBackground = dynamic(() => import("./components/ThreeBackground"), { ssr: false });
const ThreeCelebration = dynamic(() => import("./components/ThreeCelebration"), { ssr: false });

/* PARALLAX STARS */
function ParallaxStars() {
  const layerRef = useRef<HTMLDivElement>(null);
  const stars = useRef(Array.from({ length: 90 }, () => ({ x: Math.random() * 100, y: Math.random() * 100, size: 1 + Math.random() * 2.5, opacity: 0.15 + Math.random() * 0.45 }))).current;

  useEffect(() => {
    const el = layerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      el.style.transform = `translate(${cx * -12}px, ${cy * -8}px)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={layerRef} className="parallax-layer z-[1]">
      {stars.map((s, i) => (
        <div key={i} className="parallax-star" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, opacity: s.opacity }} />
      ))}
    </div>
  );
}

export default function Home() {
  const [scene, setScene] = useState<"landing" | "animation">("landing");
  const [recipientName, setRecipientName] = useState("Dragostea Mea");
  const audio = useAudioPlayer();

  const handleStart = (name: string) => {
    setRecipientName(name);
    setScene("animation");
    audio.play();
  };

  return (
    <main className="relative min-h-screen bg-[#0a0a0f] text-white">
      <ThreeBackground />
      <ParallaxStars />
      {scene === "landing" ? (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-5xl font-bold mb-8">Scrisori Magice PRO+</h1>
          <input 
            type="text" 
            placeholder="Numele ei/lui..." 
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 mb-4"
            onChange={(e) => setRecipientName(e.target.value)}
          />
          <button 
            onClick={() => handleStart(recipientName)} 
            className="px-8 py-4 rounded-xl bg-pink-600 font-bold"
          >
            Creează Magia
          </button>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-3xl">Te iubesc, {recipientName}! 💕</h2>
          <button onClick={() => setScene("landing")} className="mt-8 text-gray-500">← Înapoi</button>
          <ThreeCelebration active={true} />
        </div>
      )}
      <AudioButton muted={audio.muted} started={audio.started} onToggle={audio.toggleMute} />
    </main>
  );
}
