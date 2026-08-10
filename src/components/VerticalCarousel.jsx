import React, { useEffect, useRef, useState } from "react";
import team2 from"../assets/team2.jpg";
import {
  ShoppingCart,
  Landmark,
  HeartPulse,
  Building2,
  GraduationCap,
  Truck,
  ShieldCheck,
} from "lucide-react";

/**
 * DigitizeIndustrySection
 * ------------------------
 * A full "Industry know-how" style section for digitize.pk:
 *  - top-left: an icon + 3-line name list that auto-slides upward in sync
 *    (prev/next faded, current bold + accent dot)
 *  - headline, supporting copy, CTA button
 *  - right: a photo with a caption
 *
 * Swap INDUSTRIES, COPY, and the image URL for your real content —
 * everything else (palette, type, motion) is ready to drop in.
 */

const INDUSTRIES = [
  { name: "E-commerce & Retail", icon: ShoppingCart },
  { name: "Banking & Fintech", icon: Landmark },
  { name: "Healthcare", icon: HeartPulse },
  { name: "Real Estate & Construction", icon: Building2 },
  { name: "Education & EdTech", icon: GraduationCap },
  { name: "Logistics & Supply Chain", icon: Truck },
  { name: "Government & Public Sector", icon: ShieldCheck },
];

const ACCENT = "#3D7BFF";
const BG = "#070B16";
const BG_SOFT = "#0C1224";

const ROW_H = 44; // px, height of each name row / icon row
const TRANSITION_MS = 600;

function IndustryStrip({ items, interval = 2400 }) {
  const len = items.length;
  const [index, setIndex] = useState(0);
  const [transitionOn, setTransitionOn] = useState(true);
  const resetTimeout = useRef(null);

  const extended = [items[len - 1], ...items, items[0], items[1]]; // len+3

  useEffect(() => {
    const id = setInterval(() => setIndex((p) => p + 1), interval);
    return () => clearInterval(id);
  }, [interval]);

  useEffect(() => {
    if (index === len) {
      resetTimeout.current = setTimeout(() => {
        setTransitionOn(false);
        setIndex(0);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setTransitionOn(true))
        );
      }, TRANSITION_MS);
    }
    return () => clearTimeout(resetTimeout.current);
  }, [index, len]);

  const centerAbs = index + 1;
  const CenterIcon = items[((index % len) + len) % len].icon;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      {/* Icon */}
      <div
        style={{
          width: 64,
          height: 64,
          flexShrink: 0,
          borderRadius: 14,
          background: `${ACCENT}1A`,
          border: `1px solid ${ACCENT}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CenterIcon
          size={30}
          color={ACCENT}
          strokeWidth={1.8}
          style={{ transition: "opacity 300ms ease" }}
        />
      </div>

      {/* Name track */}
      <div
        style={{
          position: "relative",
          height: ROW_H * 3,
          overflow: "hidden",
          width: 320,
          maxWidth: "60vw",
        }}
      >
        <div
          style={{
            transform: `translateY(-${index * ROW_H}px)`,
            transition: transitionOn
              ? `transform ${TRANSITION_MS}ms cubic-bezier(0.65,0,0.35,1)`
              : "none",
          }}
        >
          {extended.map((item, i) => {
            const diff = i - centerAbs;
            const isCenter = diff === 0;
            const isAdjacent = Math.abs(diff) === 1;
            const opacity = isCenter ? 1 : isAdjacent ? 0.38 : 0;
            return (
              <div
                key={i}
                style={{
                  height: ROW_H,
                  display: "flex",
                  alignItems: "center",
                  opacity,
                  transition: `opacity ${TRANSITION_MS}ms ease`,
                }}
              >
                <span
                  style={{
                    fontFamily:
                      "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                    fontSize: isCenter ? 21 : 18,
                    fontWeight: isCenter ? 700 : 500,
                    color: isCenter ? "#FFFFFF" : "#7C8598",
                    letterSpacing: -0.2,
                  }}
                >
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `linear-gradient(180deg, ${BG} 0%, rgba(7,11,22,0) 28%, rgba(7,11,22,0) 72%, ${BG} 100%)`,
          }}
        />
      </div>
    </div>
  );
}

export default function DigitizeIndustrySection() {
  return (
    <section
      style={{
        background: BG,
        color: "#FFFFFF",
        padding: "88px 8vw",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fraunces:ital,wght@1,500&display=swap');
        .dgz-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 64px;
          align-items: center;
        }
        .dgz-cta:hover {
          background: ${ACCENT};
          color: #fff !important;
        }
        @media (max-width: 900px) {
          .dgz-grid { grid-template-columns: 1fr; gap: 40px; }
          .dgz-img { order: -1; }
        }
      `}</style>

      <div className="dgz-grid">
        {/* Left column */}
        <div>
          <IndustryStrip items={INDUSTRIES} />

          <h2
            style={{
              marginTop: 48,
              fontSize: "clamp(34px, 4vw, 48px)",
              lineHeight: 1.1,
              fontWeight: 500,
              letterSpacing: -0.5,
            }}
          >
            Industry{" "}
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: "italic",
                fontWeight: 500,
                color: ACCENT,
              }}
            >
              know-how
            </span>
          </h2>

          <p
            style={{
              marginTop: 22,
              maxWidth: 460,
              fontSize: 17,
              lineHeight: 1.65,
              color: "#AEB6C4",
            }}
          >
            digitize.pk builds for the sectors that move Pakistan's economy —
            from fintech to retail to the public sector. We bring proven
            playbooks from each industry and share what we learn across all
            of them, so every product we ship is grounded in how your
            business actually works.
          </p>

          <button
            className="dgz-cta"
            style={{
              marginTop: 32,
              padding: "14px 28px",
              borderRadius: 999,
              border: `1.5px solid ${ACCENT}`,
              background: "transparent",
              color: ACCENT,
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 200ms ease, color 200ms ease",
            }}
          >
            Explore our industries
          </button>
        </div>

        {/* Right column: image + caption */}
        <div className="dgz-img">
          <div
            style={{
              borderRadius: 18,
              overflow: "hidden",
              background: BG_SOFT,
            }}
          >
            <img
              src={team2}
              alt="digitize.pk team collaborating with a client"
              style={{
                width: "100%",
                height: 420,
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
          <p
            style={{
              marginTop: 16,
              fontSize: 13.5,
              lineHeight: 1.6,
              color: "#7C8598",
            }}
          >
            The digitize.pk team working with a retail client on their
            digital transformation roadmap — replace with your own project
            photography and caption.
          </p>
        </div>
      </div>
    </section>
  );
}
