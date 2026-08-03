"use client";

import { useState } from "react";
import { Heart, ArrowLeft, Sparkles, MessageCircleHeart } from "lucide-react";
import Link from "next/link";
import { saveSecretResult } from "../actions";

type Stage = "question" | "yes" | "no" | "whois" | "reveal";

export default function SecretPage() {
  const [stage, setStage] = useState<Stage>("question");
  const [guess, setGuess] = useState("");
  const [noPosition, setNoPosition] = useState<{ x: number; y: number; rotation: number } | null>(null);
  const [noDodgeCount, setNoDodgeCount] = useState(0);

  const handleReveal = (isAdmitted: boolean) => {
    setStage("reveal");
    // Fire and forget
    saveSecretResult(isAdmitted ? "yes" : guess, isAdmitted).catch(console.error);
  };

  // Pre-calculated values for floating hearts to keep the render function pure
  const HEARTS_CONFIG = [
    { width: 28, left: 15, top: 25, delay: 0.1, duration: 4.2 },
    { width: 18, left: 32, top: 60, delay: 0.7, duration: 3.5 },
    { width: 34, left: 55, top: 15, delay: 0.3, duration: 4.8 },
    { width: 22, left: 78, top: 45, delay: 1.2, duration: 3.8 },
    { width: 30, left: 24, top: 75, delay: 0.5, duration: 4.5 },
    { width: 20, left: 88, top: 20, delay: 0.9, duration: 3.2 },
    { width: 26, left: 45, top: 80, delay: 1.5, duration: 4.0 },
    { width: 32, left: 68, top: 70, delay: 0.2, duration: 4.6 },
  ];

  // Make the "No" button dart wildly across the screen
  const handleNoHover = () => {
    // Random position within a large area around center
    const maxX = typeof window !== "undefined" ? window.innerWidth * 0.35 : 150;
    const maxY = typeof window !== "undefined" ? window.innerHeight * 0.35 : 150;
    const x = (Math.random() - 0.5) * 2 * maxX;
    const y = (Math.random() - 0.5) * 2 * maxY;
    const rotation = Math.random() * 20 - 10;
    setNoPosition({ x, y, rotation });
    setNoDodgeCount((c) => c + 1);
  };

  return (
    <div className="min-h-screen bg-[#faf7f5] relative overflow-hidden flex items-center justify-center p-5">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-rose-200/40 to-pink-200/30 blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-72 h-72 rounded-full bg-gradient-to-br from-amber-200/30 to-orange-100/20 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-violet-200/25 to-blue-100/20 blur-3xl" />
      </div>

      {/* Back button */}
      <Link
        href="/"
        className="absolute top-5 left-5 z-20 flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <div className="relative z-10 w-full max-w-md mx-auto text-center">
        {/* ── Stage: Initial Question ── */}
        {stage === "question" && (
          <div className="animate-fade-up">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-rose-200/50 animate-float">
              <MessageCircleHeart className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight mb-3">
              Psst... 👀
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 font-medium mb-10">
              Do you know who likes you?
            </p>

            {/* Dodge count teaser */}
            {noDodgeCount > 2 && (
              <p className="text-sm text-rose-400 font-medium mb-4 animate-fade-up">
                {noDodgeCount > 8
                  ? "Just press Yes already! 😂💀"
                  : noDodgeCount > 5
                    ? "You can't catch it! 🏃‍♂️💨"
                    : "Hehe... nice try! 😏"}
              </p>
            )}

            <div className="flex gap-4 justify-center relative" style={{ minHeight: "80px" }}>
              {/* Yes button */}
              <button
                onClick={() => setStage("yes")}
                className="px-10 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-bold text-lg shadow-lg shadow-emerald-200/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 active:translate-y-0"
              >
                Yes 😏
              </button>

              {/* No button — darts across the screen! */}
              <button
                onMouseEnter={handleNoHover}
                onTouchStart={handleNoHover}
                onClick={() => setStage("no")}
                className="px-10 py-4 rounded-2xl bg-gradient-to-r from-gray-300 to-gray-400 text-white font-bold text-lg shadow-lg shadow-gray-200/50 z-30"
                style={{
                  transform: noPosition
                    ? `translate(${noPosition.x}px, ${noPosition.y}px) rotate(${noPosition.rotation}deg)`
                    : "none",
                  transition: "transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  position: noPosition ? "relative" : "relative",
                }}
              >
                No 🤷
              </button>
            </div>
          </div>
        )}

        {/* ── Stage: Yes — Ask "Is it you?" ── */}
        {stage === "yes" && (
          <div className="animate-fade-up">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-200/50 animate-float">
              <Sparkles className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight mb-3">
              Ooh interesting! 👀✨
            </h2>
            <p className="text-xl text-gray-600 font-semibold mb-10">
              Is it you? 😏
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setGuess("yes");
                  handleReveal(true);
                }}
                className="px-10 py-4 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-500 text-white font-bold text-lg shadow-lg shadow-rose-200/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 active:translate-y-0"
              >
                Yes 🙈💕
              </button>
              <button
                onClick={() => setStage("whois")}
                className="px-10 py-4 rounded-2xl bg-white border border-gray-200 text-gray-600 font-bold text-lg shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 active:translate-y-0"
              >
                No 😅
              </button>
            </div>
          </div>
        )}

        {/* ── Stage: Who is it? ── */}
        {stage === "whois" && (
          <div className="animate-fade-up">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-200/50 animate-float">
              <MessageCircleHeart className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight mb-3">
              Then who is it? 🤔
            </h2>
            <p className="text-lg text-gray-500 font-medium mb-8">
              Spill the tea... ☕💭
            </p>

            <div className="space-y-4 max-w-xs mx-auto">
              <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Type their name..."
                className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-200 text-gray-700 text-center font-medium placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-300/50 focus:border-violet-300 shadow-sm transition-all"
              />
              <button
                onClick={() => handleReveal(false)}
                disabled={!guess.trim()}
                className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-violet-400 to-indigo-500 text-white font-bold text-lg shadow-lg shadow-violet-200/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 active:translate-y-0 disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
              >
                Submit 💌
              </button>
            </div>
          </div>
        )}

        {/* ── Stage: No — Tease them ── */}
        {stage === "no" && (
          <div className="animate-fade-up">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-200/50 animate-float">
              <Heart className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight mb-3">
              Liar liar! 🤥🔥
            </h2>
            <p className="text-lg text-gray-500 font-medium mb-8">
              I think you do know... try again? 😏
            </p>

            <button
              onClick={() => {
                setNoPosition(null);
                setStage("question");
              }}
              className="px-10 py-4 rounded-2xl bg-gradient-to-r from-violet-400 to-purple-500 text-white font-bold text-lg shadow-lg shadow-violet-200/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 active:translate-y-0"
            >
              Go back 🔙
            </button>
          </div>
        )}

        {/* ── Stage: Reveal ── */}
        {stage === "reveal" && (
          <div className="animate-fade-up">
            {/* Floating hearts */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {HEARTS_CONFIG.map((heart, i) => (
                <Heart
                  key={i}
                  className="absolute text-rose-300/40 fill-rose-300/30 animate-float"
                  style={{
                    width: `${heart.width}px`,
                    left: `${heart.left}%`,
                    top: `${heart.top}%`,
                    animationDelay: `${heart.delay}s`,
                    animationDuration: `${heart.duration}s`,
                  }}
                />
              ))}
            </div>

            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-rose-200/50 animate-float">
              <Heart className="w-10 h-10 text-white fill-white" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight mb-3">
              {guess === "yes" ? (
                <>Aww you admitted it! 🤭💕</>
              ) : (
                <>You said &ldquo;{guess}&rdquo;! 🤭</>
              )}
            </h2>
            <p className="text-lg text-gray-500 font-medium mb-4">
              {guess === "yes"
                ? "That's so sweet of you!"
                : "Hmm... interesting guess!"}
            </p>
            <p className="text-base text-rose-400 font-semibold mb-8">
              {guess === "yes"
                ? "haiyaa 💕✨"
                : "But only Angie knows the real answer 🤫💕"}
            </p>

            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={() => {
                  setGuess("");
                  setStage("question");
                }}
                className="px-8 py-3.5 rounded-2xl bg-white border border-gray-200 text-gray-600 font-semibold shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                Try again
              </button>
              <Link
                href="/"
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-500 text-white font-semibold shadow-lg shadow-rose-200/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                Back to Angie&apos;s page
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
