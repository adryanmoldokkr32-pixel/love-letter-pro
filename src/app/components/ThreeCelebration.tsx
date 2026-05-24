"use client";
export default function ThreeCelebration({ active }: { active: boolean }) {
  if (!active) return null;
  return <div className="absolute inset-0 pointer-events-none">✨✨✨</div>;
}
