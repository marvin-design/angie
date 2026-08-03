"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Sparkles, MapPin, X, ChevronLeft, ChevronRight, GraduationCap, Award, BookOpen } from "lucide-react";

/* ─── Inline SVG icons (lucide-react dropped brand icons) ─── */
const IconInstagram = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const IconTikTok = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);



/* ─── Data ─── */
const GALLERY = [
  { src: "/images/gallery-1.png", alt: "Angie — playful vibes" },
  { src: "/images/gallery-2.png", alt: "Angie — all smiles" },
  { src: "/images/gallery-3.png", alt: "Angie — confident pose" },
  { src: "/images/gallery-4.jpg", alt: "Angie — streetwear look" },
  { src: "/images/gallery-5.png", alt: "Angie — outdoor shoot" },
  { src: "/images/gallery-6.jpg", alt: "Angie — nature vibes" },
];

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/just._.mak3na/",
    icon: IconInstagram,
    color: "from-pink-500 to-rose-500",
    hoverGlow: "hover:shadow-pink-300/40",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@2764angie",
    icon: IconTikTok,
    color: "from-gray-900 to-gray-700",
    hoverGlow: "hover:shadow-gray-400/40",
  },
];

/* ─── Lightbox Component ─── */
function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: typeof GALLERY;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Previous button */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-3 sm:left-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Previous photo"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Image */}
      <div
        className="relative w-screen h-screen"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>

      {/* Next button */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-3 sm:right-6 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Next photo"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "bg-white scale-125"
                : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function LinkInBio() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + GALLERY.length) % GALLERY.length : null
    );
  }, []);

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % GALLERY.length : null
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#faf7f5] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-rose-200/30 to-pink-200/20 blur-3xl" />
        <div className="absolute top-1/3 -left-24 w-72 h-72 rounded-full bg-gradient-to-br from-amber-200/20 to-orange-100/15 blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-violet-200/20 to-blue-100/15 blur-3xl" />
      </div>

      <main className="relative z-10 w-full max-w-lg mx-auto px-5 py-10 sm:py-16">
        {/* ── Profile Header ── */}
        <section className="text-center animate-fade-up">
          {/* Profile image */}
          <div className="relative inline-block">
            {/* Animated ring behind the avatar */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-400 via-amber-300 to-violet-400 animate-pulse-ring" />
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white shadow-xl shadow-gray-200/50 ring-2 ring-rose-200/50">
              <Image
                src="/images/profile.png"
                alt="Angie Makena"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 640px) 128px, 144px"
              />
            </div>
            {/* Online indicator */}
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-400 border-[3px] border-white rounded-full shadow-sm" />
          </div>

          {/* Name */}
          <h1 className="mt-5 text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
            Angie Makena
          </h1>

          {/* Bio */}
          <p className="mt-2.5 text-sm sm:text-base text-gray-500 font-medium leading-relaxed max-w-xs mx-auto">
            Creative thinker, adventurer, and friend.{" "}
            <Sparkles className="inline w-4 h-4 text-amber-400" />
            <br />
            <span className="text-gray-400">
              Welcome to my little corner of the internet!
            </span>
          </p>

          {/* Location tag */}
          <div className="mt-3 inline-flex items-center gap-1 text-xs text-gray-400 font-medium bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-100">
            <MapPin className="w-3 h-3" />
            Kenya 🇰🇪
          </div>
        </section>

        {/* ── About Me ── */}
        <section className="mt-10 animate-fade-up delay-200">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-violet-300" />
            About Me
          </h2>

          <div className="glass-card rounded-2xl p-5 sm:p-6 space-y-4">
            {/* School */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-200/40">
                <GraduationCap className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">Gitugi Girls&apos; High School</p>
                <p className="text-xs text-gray-400 mt-0.5">Form 4 Student</p>
              </div>
            </div>

            {/* CU Captain */}
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-amber-200/40">
                <Award className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">CU Captain ✝️</p>
                <p className="text-xs text-gray-400 mt-0.5">Christian Union Leader</p>
              </div>
            </div>

            {/* Short description */}
            <div className="pt-2 border-t border-gray-100/80">
              <p className="text-sm text-gray-500 leading-relaxed">
                A passionate leader and creative soul navigating her final year of high school 
                with faith, friendship, and a whole lot of adventure. 🌟
              </p>
            </div>
          </div>
        </section>

        {/* ── Photo Grid ── */}
        <section className="mt-10 animate-fade-up delay-400">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
            <Heart className="w-3.5 h-3.5 text-rose-300" />
            Moments
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {GALLERY.map((img, i) => (
              <button
                key={img.src}
                onClick={() => openLightbox(i)}
                className={`animate-fade-up img-zoom rounded-2xl overflow-hidden shadow-md shadow-gray-200/40 border border-white/60 relative cursor-pointer group ${
                  i === 0 || i === 3 ? "aspect-[3/4]" : "aspect-square"
                }`}
                style={{ animationDelay: `${0.45 + i * 0.1}s` }}
                aria-label={`View ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 45vw, 30vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ── Social Links ── */}
        <section className="mt-12 space-y-3.5 animate-fade-up delay-700">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Connect with me
          </h2>

          {SOCIALS.map((social, i) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                id={`social-${social.name.toLowerCase().replace(/[\s\/]/g, "-")}`}
                className={`
                  animate-fade-up block w-full rounded-2xl
                  bg-gradient-to-r ${social.color}
                  text-white font-semibold text-[15px]
                  py-4 px-6
                  shadow-lg ${social.hoverGlow}
                  transition-all duration-300 ease-out
                  hover:-translate-y-1 hover:shadow-xl
                  active:translate-y-0 active:shadow-md
                `}
                style={{ animationDelay: `${0.75 + i * 0.1}s` }}
              >
                <div className="flex items-center justify-center gap-3">
                  <Icon className="w-5 h-5" />
                  {social.name}
                </div>
              </a>
            );
          })}
        </section>

        {/* ── Secret Button ── */}
        <div className="mt-10 text-center animate-fade-up delay-900">
          <Link
            href="/secret"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/70 backdrop-blur-sm border border-rose-200/60 text-rose-400 font-medium text-sm hover:bg-rose-50 hover:border-rose-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rose-100/50 transition-all duration-300"
          >
            <Heart className="w-4 h-4 fill-rose-300" />
            Tap if you&apos;re curious... 👀
          </Link>
        </div>

        {/* ── Footer ── */}
        <footer className="mt-14 text-center animate-fade-up delay-1000">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-4" />
          <p className="text-xs text-gray-300 font-medium tracking-wide">
            Made with{" "}
            <Heart className="inline w-3 h-3 text-rose-300 fill-rose-300" />{" "}
            for Angie
          </p>
        </footer>
      </main>

      {/* ── Lightbox Modal ── */}
      {lightboxIndex !== null && (
        <Lightbox
          images={GALLERY}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goToPrev}
          onNext={goToNext}
        />
      )}
    </div>
  );
}
