import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import team from "../assets/team.jpg";

/**
 * DigitizeServicesSection
 * ------------------------
 * Left: photo with caption.
 * Right: a "periodic table" grid of service tiles (2-letter codes, staggered
 * rows, rainbow palette) — hover a tile to see its full name slide out —
 * plus headline, copy, and a CTA.
 *
 * Design tokens (colors, type scale, spacing, photo sizing, grid ratios)
 * are kept in lockstep with DigitizeIndustrySection.jsx so the two
 * alternating-layout sections read as one consistent system.
 */

const SERVICES = [
  // row 1 — Strategy & Planning, Design & Experience
  [
    { code: "St", name: "Strategy", color: "#D946A8" },
    { code: "Ux", name: "UX / UI Design", color: "#EAC22D" },
  ],
  // row 2 — Engineering (indented)
  [
    { code: "Sw", name: "Software Dev", color: "#CFE22D" },
    { code: "Mo", name: "Mobile Apps", color: "#7AD62B" },
    { code: "Cl", name: "Cloud", color: "#F2892B" },
  ],
  // row 3 — Growth & Commerce (less indented)
  [
    { code: "Mk", name: "Digital Marketing", color: "#20C4C4" },
    { code: "Ec", name: "E-commerce", color: "#22C79E" },
  ],
];

const ROW_OFFSET = [0, 2, 1]; // tile-widths to shift each row (desktop only — flattened on mobile)
const TILE_DESKTOP = 68;
const TILE_MOBILE = 42;
const GAP_DESKTOP = 10;
const GAP_MOBILE = 6;

// ---- Shared design tokens (keep identical in DigitizeIndustrySection.jsx) ----
const ACCENT = "#3E7A5A";
const BG = "#0A120C";
const BG_SOFT = "#131A13";
const TEXT_MUTED = "#B7C2B8";
const TEXT_CAPTION = "#7E8C81";
const FONT_STACK = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
const AUTO_INTERVAL_MS = 3000; // how often a random tile auto-reveals
const AUTO_SHOW_MS = 1700; // how long that auto-reveal stays open
const MOBILE_BREAKPOINT = 640;

// Tracks whether we're under the mobile breakpoint, so tile size / spacing /
// stagger can shrink instead of overflowing the screen width.
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

// Flatten SERVICES once, with a stable id per tile, so the parent can pick
// a random one to auto-reveal every few seconds.
function flattenServices(rows) {
  const flat = [];
  rows.forEach((row, r) =>
    row.forEach((service, c) => flat.push({ ...service, id: `${r}-${c}` }))
  );
  return flat;
}

function ServiceTile({ service, id, hoveredId, autoActive, tile, onHover, onLeave }) {
  const isHoveredSelf = hoveredId === id;
  const open = isHoveredSelf || autoActive;
  // rough width estimate so longer names get enough room; tweak the multiplier to taste
  const charWidth = tile < 60 ? 6.8 : 8.5;
  const expandedWidth = Math.max(tile - 8, service.name.length * charWidth + 22);
  const flyoutHeight = Math.round(tile * 0.9);

  return (
    <div
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onLeave(id)}
      onTouchStart={() => onHover(id)}
      style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
    >
      {/* original color tile — stays exactly as-is, code never changes */}
      <div
        style={{
          width: tile,
          height: tile,
          flexShrink: 0,
          borderRadius: 3,
          background: service.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: tile < 60 ? 14 : 18,
          color: "#0E140E",
          boxShadow: open ? "0 8px 20px -6px rgba(0,0,0,0.5)" : "none",
          transition: "box-shadow 200ms ease",
        }}
      >
        {service.code}
      </div>

      {/* white flyout with the full name — pushes tiles to the right when it opens */}
      <div
        style={{
          height: flyoutHeight,
          width: open ? expandedWidth : 0,
          marginLeft: open ? 0 : 0,
          flexShrink: 0,
          borderRadius: 1,
          background: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          paddingLeft: open ? (tile < 60 ? 8 : 12) : 0,
          overflow: "hidden",
          whiteSpace: "nowrap",
          transition:
            "width 280ms cubic-bezier(0.65,0,0.35,1), margin-left 280ms ease, padding-left 280ms ease",
        }}
      >
        <span
          style={{
            fontFamily: FONT_STACK,
            fontWeight: 600,
            fontSize: tile < 60 ? 12.5 : 15,
            color: "#0E140E",
            whiteSpace: "nowrap",
          }}
        >
          {service.name}
        </span>
      </div>
    </div>
  );
}

export default function DigitizeServicesSection() {
  const flatServices = React.useMemo(() => flattenServices(SERVICES), []);
  const [autoId, setAutoId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const isMobile = useIsMobile();
  const intervalRef = useRef(null);
  const showTimeoutRef = useRef(null);

  const tile = isMobile ? TILE_MOBILE : TILE_DESKTOP;
  const gap = isMobile ? GAP_MOBILE : GAP_DESKTOP;

  const handleHover = (id) => {
    setHoveredId(id);
  };
  const handleLeave = (id) => {
    setHoveredId((current) => (current === id ? null : current));
  };

  // Auto-cycle a random tile open every few seconds — paused entirely while
  // any tile is being hovered, and resumes once the mouse leaves.
  useEffect(() => {
    if (hoveredId !== null) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
      setAutoId(null);
      return undefined;
    }

    const pickRandom = () => {
      setAutoId((current) => {
        // avoid repeating the same tile twice in a row
        const choices = flatServices.filter((s) => s.id !== current);
        const pick = choices[Math.floor(Math.random() * choices.length)];
        return pick.id;
      });
      showTimeoutRef.current = setTimeout(() => setAutoId(null), AUTO_SHOW_MS);
    };

    intervalRef.current = setInterval(pickRandom, AUTO_INTERVAL_MS);
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(showTimeoutRef.current);
    };
  }, [hoveredId, flatServices]);

  return (
    <section
      className="dsvc-section"
      id="services"
      style={{
        background: BG,
        color: "#FFFFFF",
        fontFamily: FONT_STACK,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fraunces:ital,wght@1,500&display=swap');
        .dsvc-section { padding: 88px 8vw; }
        .dsvc-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 64px;
          align-items: center;
        }
        .dsvc-photo { width: 100%; height: 420px; object-fit: cover; display: block; }
        .dsvc-tiles { overflow-x: auto; -webkit-overflow-scrolling: touch; padding-bottom: 2px; }
        .dsvc-cta:hover { background: ${ACCENT}; color: #fff !important; border-color: ${ACCENT} !important; }
        @media (max-width: 900px) {
          .dsvc-grid { grid-template-columns: 1fr; gap: 40px; }
        }
        @media (max-width: 640px) {
          .dsvc-section { padding: 56px 6vw; }
          .dsvc-photo { height: 240px; border-radius: 14px; }
          .dsvc-copy { max-width: 100% !important; }
        }
      `}</style>

      <div className="dsvc-grid">
        {/* Left: image + caption */}
        <div>
          <div
            style={{
              borderRadius: 18,
              overflow: "hidden",
              background: BG_SOFT,
            }}
          >
            <img
              className="dsvc-photo"
              src={team}
              alt="digitize.pk team at a client event"
            />
          </div>
          <p
            style={{
              marginTop: 16,
              fontSize: 13.5,
              lineHeight: 1.6,
              color: TEXT_CAPTION,
            }}
          >
            The digitize.pk team connecting with clients at a Karachi tech
            meetup — replace with your own event or team photography.
          </p>
        </div>

        {/* Right: services grid + copy */}
        <div>
          <div className="dsvc-tiles">
            {SERVICES.map((row, r) => (
              <div
                key={r}
                style={{
                  display: "flex",
                  gap,
                  marginLeft: isMobile ? 0 : ROW_OFFSET[r] * (tile + gap),
                  marginBottom: gap,
                  width: "max-content",
                }}
              >
                {row.map((service, c) => {
                  const id = `${r}-${c}`;
                  return (
                    <ServiceTile
                      key={service.code}
                      service={service}
                      id={id}
                      tile={tile}
                      hoveredId={hoveredId}
                      autoActive={hoveredId === null && autoId === id}
                      onHover={handleHover}
                      onLeave={handleLeave}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          <h2
            style={{
              marginTop: isMobile ? 32 : 48,
              fontSize: "clamp(32px, 4vw, 48px)",
              lineHeight: 1.1,
              fontWeight: 500,
              letterSpacing: -0.5,
            }}
          >
            End-to-end{" "}
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: "italic",
                fontWeight: 500,
                color: ACCENT,
              }}
            >
              services
            </span>
          </h2>

          <p
            className="dsvc-copy"
            style={{
              marginTop: 22,
              maxWidth: 480,
              fontSize: 17,
              lineHeight: 1.65,
              color: TEXT_MUTED,
            }}
          >
            From strategy to digital product building and beyond, digitize.pk
            brings the right mix of services to accelerate your vision with
            holistic, practical solutions. We listen deeply and share our
            knowledge every step of the way, empowering your teams to
            continue the momentum after we're gone.
          </p>

          <Link
            to="/services"
            className="dsvc-cta"
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
              textDecoration: "none",
              display: "inline-block",
              transition: "background 200ms ease, color 200ms ease",
            }}
          >
            Explore our services
          </Link>
        </div>
      </div>
    </section>
  );
}
