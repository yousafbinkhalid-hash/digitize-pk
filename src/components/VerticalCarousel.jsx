import React, { useEffect, useRef, useState } from "react";
import team2 from "../assets/team2.jpg";
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
 * Design tokens (colors, type scale, spacing, photo sizing, grid ratios)
 * are kept in lockstep with DigitizeServicesSection.jsx so the two
 * alternating-layout sections read as one consistent system.
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

// ---- Shared design tokens (keep identical in DigitizeServicesSection.jsx) ----
const ACCENT = "#3E7A5A";
const BG = "#0A120C";
const BG_SOFT = "#131A13";
const TEXT_MUTED = "#B7C2B8";
const TEXT_CAPTION = "#7E8C81";
const FONT_STACK = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
const TRANSITION_MS = 600;
const MOBILE_BREAKPOINT = 640;

// Tracks whether we're under the mobile breakpoint, so the icon, row height,
// and type scale can shrink instead of overflowing/wrapping on a phone.
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= MOBILE_BREAKPOINT
  );
  useEffect(() => {
    const onResize = () =>
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
}

function IndustryStrip({ items, interval = 2400, isMobile }) {
  const len = items.length;
  const [index, setIndex] = useState(0);
  const [transitionOn, setTransitionOn] = useState(true);
  const resetTimeout = useRef(null);

  const extended = [items[len - 1], ...items, items[0], items[1]]; // len+3

  const iconSize = isMobile ? 46 : 64;
  const rowH = isMobile ? 34 : 44;
  const centerFont = isMobile ? 16 : 21;
  const sideFont = isMobile ? 13.5 : 18;

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
    <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 14 : 20 }}>
      {/* Icon */}
      <div
        style={{
          width: iconSize,
          height: iconSize,
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
          size={isMobile ? 22 : 30}
          color={ACCENT}
          strokeWidth={1.8}
          style={{ transition: "opacity 300ms ease" }}
        />
      </div>

      {/* Name track — flexes to fill available width instead of a fixed px value,
          and truncates rather than wrapping on narrow screens */}
      <div
        style={{
          position: "relative",
          height: rowH * 3,
          overflow: "hidden",
          flex: 1,
          minWidth: 0,
        }}
      >
        <div
          style={{
            transform: `translateY(-${index * rowH}px)`,
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
                  height: rowH,
                  display: "flex",
                  alignItems: "center",
                  opacity,
                  transition: `opacity ${TRANSITION_MS}ms ease`,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_STACK,
                    fontSize: isCenter ? centerFont : sideFont,
                    fontWeight: isCenter ? 700 : 500,
                    color: isCenter ? "#FFFFFF" : "#7E8C81",
                    letterSpacing: -0.2,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "100%",
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
  const isMobile = useIsMobile();

  return (
    <section
      className="dgz-section"
      style={{
        background: BG,
        color: "#FFFFFF",
        fontFamily: FONT_STACK,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fraunces:ital,wght@1,500&display=swap');
        .dgz-section { padding: 88px 8vw; }
        .dgz-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 64px;
          align-items: center;
        }
        .dgz-photo { width: 100%; height: 420px; object-fit: cover; display: block; }
        .dgz-cta:hover {
          background: ${ACCENT};
          color: #fff !important;
        }
        @media (max-width: 900px) {
          .dgz-grid { grid-template-columns: 1fr; gap: 40px; }
          .dgz-img { order: -1; }
        }
        @media (max-width: 640px) {
          .dgz-section { padding: 56px 6vw; }
          .dgz-photo { height: 240px; border-radius: 14px; }
          .dgz-copy { max-width: 100% !important; }
        }
      `}</style>

      <div className="dgz-grid">
        {/* Left column */}
        <div>
          <IndustryStrip items={INDUSTRIES} isMobile={isMobile} />

          <h2
            style={{
              marginTop: isMobile ? 32 : 48,
              fontSize: "clamp(32px, 4vw, 48px)",
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
            className="dgz-copy"
            style={{
              marginTop: 22,
              maxWidth: 480,
              fontSize: 17,
              lineHeight: 1.65,
              color: TEXT_MUTED,
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
            <img className="dgz-photo" src={team2} alt="digitize.pk team collaborating with a client" />
          </div>
          <p
            style={{
              marginTop: 16,
              fontSize: 13.5,
              lineHeight: 1.6,
              color: TEXT_CAPTION,
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
