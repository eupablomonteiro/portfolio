import Image from "next/image";
import { cn } from "@/lib/utils";
import pabloHeroImage from "@/assets/pablo-hero-section.png";

export type CharacterPose = "hero" | "peek" | "wave" | "confused" | "bye";

interface CharacterProps {
  pose: CharacterPose;
  className?: string;
}

export function Character({ pose, className }: CharacterProps) {
  if (pose === "hero") {
    return <HeroCharacter className={className} />;
  }
  return (
    <PlaceholderCharacter
      pose={pose}
      className={className}
      aria-label={`Ilustração do personagem — pose ${pose}`}
    />
  );
}

function HeroCharacter({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div
        className="pointer-events-none absolute -inset-6 rotate-50 rounded-16 bg-portfolio-gold/40 sm:-inset-10"
        aria-hidden="true"
      />
      <div className="relative overflow-hidden rounded-16">
        <Image
          src={pabloHeroImage}
          alt="Pablo Monteiro, desenvolvedor fullstack"
          width={1756}
          height={3872}
          priority
          quality={100}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 320px, 220px"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}

function PlaceholderCharacter({
  pose,
  className,
}: {
  pose: Exclude<CharacterPose, "hero">;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 140"
      className={cn("h-32 w-auto", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {pose === "peek" && <PeekArt />}
      {pose === "wave" && <WaveArt />}
      {pose === "confused" && <ConfusedArt />}
      {pose === "bye" && <ByeArt />}
    </svg>
  );
}

function Head({ color = "var(--color-portfolio-text)" }: { color?: string }) {
  return (
    <>
      <circle
        cx="60"
        cy="46"
        r="26"
        fill="var(--color-portfolio-surface)"
        stroke={color}
        strokeWidth="2.5"
      />
      <path
        d="M34 40 Q 38 22, 60 20 Q 82 22, 86 40 Q 78 30, 60 29 Q 42 30, 34 40 Z"
        fill="var(--color-portfolio-primary)"
      />
      <circle cx="51" cy="46" r="2.5" fill={color} />
      <circle cx="69" cy="46" r="2.5" fill={color} />
      <path
        d="M52 56 Q 60 62, 68 56"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </>
  );
}

function Torso({ color = "var(--color-portfolio-text)" }: { color?: string }) {
  return (
    <>
      <rect
        x="42"
        y="76"
        width="36"
        height="40"
        rx="10"
        fill="var(--color-portfolio-primary)"
        fillOpacity="0.15"
        stroke={color}
        strokeWidth="2.5"
      />
      <path
        d="M52 92 L 68 92"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </>
  );
}

function PeekArt() {
  return (
    <>
      <rect
        x="10"
        y="40"
        width="100"
        height="86"
        rx="12"
        fill="var(--color-portfolio-surface)"
        stroke="var(--color-portfolio-text)"
        strokeWidth="2.5"
      />
      <circle
        cx="60"
        cy="46"
        r="26"
        fill="var(--color-portfolio-surface)"
        stroke="var(--color-portfolio-text)"
        strokeWidth="2.5"
      />
      <path
        d="M34 40 Q 38 22, 60 20 Q 82 22, 86 40 Q 78 30, 60 29 Q 42 30, 34 40 Z"
        fill="var(--color-portfolio-primary)"
      />
      <circle cx="51" cy="46" r="2.5" fill="var(--color-portfolio-text)" />
      <circle cx="69" cy="46" r="2.5" fill="var(--color-portfolio-text)" />
      <path
        d="M52 56 Q 60 62, 68 56"
        stroke="var(--color-portfolio-text)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M34 86 L 22 86 Q 14 86, 14 78 L 14 70"
        stroke="var(--color-portfolio-text)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M86 86 L 98 86 Q 106 86, 106 78 L 106 70"
        stroke="var(--color-portfolio-text)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </>
  );
}

function WaveArt() {
  return (
    <>
      <Head />
      <Torso />
      <path
        d="M74 96 Q 100 84, 104 62"
        stroke="var(--color-portfolio-text)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle
        cx="104"
        cy="56"
        r="8"
        fill="var(--color-portfolio-surface)"
        stroke="var(--color-portfolio-text)"
        strokeWidth="2.5"
      />
      <path
        d="M38 100 L 26 108"
        stroke="var(--color-portfolio-text)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </>
  );
}

function ConfusedArt() {
  return (
    <>
      <Head />
      <Torso />
      <path
        d="M40 110 L 26 118"
        stroke="var(--color-portfolio-text)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M80 110 L 94 118"
        stroke="var(--color-portfolio-text)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <text
        x="90"
        y="22"
        fontSize="34"
        fontWeight="700"
        fill="var(--color-portfolio-primary)"
        fontFamily="'Bricolage Grotesque', sans-serif"
      >
        ?
      </text>
    </>
  );
}

function ByeArt() {
  return (
    <>
      <Head />
      <Torso />
      <path
        d="M74 96 Q 100 84, 104 62"
        stroke="var(--color-portfolio-text)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle
        cx="104"
        cy="56"
        r="8"
        fill="var(--color-portfolio-surface)"
        stroke="var(--color-portfolio-text)"
        strokeWidth="2.5"
      />
    </>
  );
}
