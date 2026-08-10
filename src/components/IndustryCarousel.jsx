import React, { useEffect, useRef, useState } from "react";
import {
  Cpu,
  HeartPulse,
  Landmark,
  ShoppingCart,
  Factory,
  GraduationCap,
  Building2,
} from "lucide-react";

/**
 * IndustryCarousel
 * -----------------
 * Two synced vertical carousels:
 *  - Left: one industry logo/icon at a time, sliding upward
 *  - Right: three names stacked (prev / center / next), center highlighted,
 *    prev & next faded, all sliding upward in sync with the logo.
 *
 * Props:
 *  - items: [{ name: string, icon: ReactComponent, accent: string, logoUrl?: string }]
 *      If `logoUrl` is provided it's used instead of `icon`.
 *  - interval: ms between slides (default 2600)
 *  - pauseOnHover: boolean (default true)
 */

const DEFAULT_ITEMS = [
  { name: "Technology", icon: Cpu, accent: "#6366F1" },
  { name: "Healthcare", icon: HeartPulse, accent: "#EF4444" },
  { name: "Finance", icon: Landmark, accent: "#10B981" },
  { name: "Retail", icon: ShoppingCart, accent: "#F59E0B" },
  { name: "Manufacturing", icon: Factory, accent: "#0EA5E9" },
  { name: "Education", icon: GraduationCap, accent: "#A855F7" },
  { name: "Real Estate", icon: Building2, accent: "#EC4899" },
];

const LOGO_H = 96; // px, height of the logo viewport row
const NAME_H = 56; // px, height of each name row
const TRANSITION_MS = 650;

export default function IndustryCarousel({
  items = DEFAULT_ITEMS,
  interval = 2600,
  pauseOnHover = true,
}) {
  const len = items.length;

  // index runs 0..len (len = the "checkpoint" duplicate frame, then silently resets to 0)
  const [index, setIndex] = useState(0);
  const [transitionOn, setTransitionOn] = useState(true);
  const [paused, setPaused] = useState(false);
  const resetTimeout = useRef(null);
  const rafRef = useRef(null);

  // Extended arrays with clones so the wrap-around is visually seamless.
  const extendedLogos = [...items, items[0]]; // len+1
  const extendedNames = [items[len - 1], ...items, items[0], items[1]]; // len+3

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, interval);
    return () => clearInterval(id);
  }, [interval, paused]);

  // When we land on the duplicate checkpoint frame (index === len), wait for the
  // slide transition to finish, then jump back to 0 with transitions disabled —
  // since the checkpoint frame is content-identical to frame 0, the jump is invisible.
  useEffect(() => {
    if (index === len) {
      resetTimeout.current = setTimeout(() => {
        setTransitionOn(false);
        setIndex(0);
        rafRef.current = requestAnimationFrame(() => {
          requestAnimationFrame(() => setTransitionOn(true));
        });
      }, TRANSITION_MS);
    }
    return () => {
      if (resetTimeout.current) clearTimeout(resetTimeout.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [index, len]);

  const centerAbsIndex = index + 1; // position of the "current" item inside extendedNames

  return (
    <div
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 28,
        padding: "28px 32px",
        borderRadius: 20,
        background: "linear-gradient(135deg, #0B0F1A 0%, #131A2B 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        maxWidth: 480,
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        boxShadow: "0 20px 50px -20px rgba(0,0,0,0.6)",
      }}
    >
      {/* Logo track */}
      <div
        style={{
          position: "relative",
          width: LOGO_H,
          height: LOGO_H,
          overflow: "hidden",
          flexShrink: 0,
          borderRadius: 16,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            transform: `translateY(-${index * LOGO_H}px)`,
            transition: transitionOn
              ? `transform ${TRANSITION_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`
              : "none",
          }}
        >
          {extendedLogos.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                style={{
                  height: LOGO_H,
                  width: LOGO_H,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.logoUrl ? (
                  <img
                    src={item.logoUrl}
                    alt={item.name}
                    style={{ maxWidth: "60%", maxHeight: "60%", objectFit: "contain" }}
                  />
                ) : (
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: `${item.accent}22`,
                    }}
                  >
                    <Icon size={26} color={item.accent} strokeWidth={2} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Name track */}
      <div
        style={{
          position: "relative",
          height: NAME_H * 3,
          overflow: "hidden",
          flex: 1,
          minWidth: 0,
        }}
      >
        <div
          style={{
            transform: `translateY(-${index * NAME_H}px)`,
            transition: transitionOn
              ? `transform ${TRANSITION_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`
              : "none",
          }}
        >
          {extendedNames.map((item, i) => {
            const diff = i - centerAbsIndex;
            const isCenter = diff === 0;
            const isAdjacent = Math.abs(diff) === 1;
            const opacity = isCenter ? 1 : isAdjacent ? 0.32 : 0;
            const scale = isCenter ? 1 : 0.86;
            return (
              <div
                key={i}
                style={{
                  height: NAME_H,
                  display: "flex",
                  alignItems: "center",
                  opacity,
                  transform: `scale(${scale})`,
                  transformOrigin: "left center",
                  transition: `opacity ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms ease`,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <span
                  style={{
                    fontSize: isCenter ? 22 : 17,
                    fontWeight: isCenter ? 700 : 500,
                    color: isCenter ? "#FFFFFF" : "#8A93A8",
                    letterSpacing: -0.2,
                  }}
                >
                  {item.name}
                </span>
                {isCenter && (
                  <span
                    style={{
                      display: "inline-block",
                      marginLeft: 10,
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: item.accent,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* fade masks top/bottom for extra polish */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(180deg, #0B0F1A 0%, rgba(11,15,26,0) 30%, rgba(11,15,26,0) 70%, #0B0F1A 100%)",
          }}
        />
      </div>
    </div>
  );
}
