import React, { useEffect, useState } from "react";

/**
 * DigitizeServicesSection
 * ------------------------
 * Left: photo with caption.
 * Right: a "periodic table" grid of service tiles (2-letter codes, staggered
 * rows, rainbow palette) — hover a tile to see its full name slide out —
 * plus headline, copy, and a CTA.
 *
 * Swap SERVICES, the copy, and the image URL for your real content.
 */

const SERVICES = [
  // row 1
  [
    { code: "St", name: "Strategy", color: "#D946A8" },
    { code: "Da", name: "Data & Analytics", color: "#EC4E7A" },
    { code: "Ai", name: "AI & Automation", color: "#F0522F" },
    { code: "Cl", name: "Cloud", color: "#F2892B" },
  ],
  // row 2 (indented)
  [
    { code: "Ux", name: "UX / UI Design", color: "#EAC22D" },
    { code: "Sw", name: "Software Dev", color: "#CFE22D" },
    { code: "Mo", name: "Mobile Apps", color: "#7AD62B" },
    { code: "Qa", name: "QA & Testing", color: "#2FCB6E" },
  ],
  // row 3 (less indented)
  [
    { code: "Ec", name: "E-commerce", color: "#22C79E" },
    { code: "Mk", name: "Digital Marketing", color: "#20C4C4" },
    { code: "Se", name: "Security", color: "#4FA9E8" },
    { code: "Su", name: "Support", color: "#6E7EF0" },
  ],
];

const ROW_OFFSET = [0, 2, 1]; // tile-widths to shift each row, mimics the staggered look
const TILE = 68;
const GAP = 10;
const BG = "#070B16";
const AUTO_INTERVAL_MS = 3000; // how often a random tile auto-reveals
const AUTO_SHOW_MS = 2500; // how long that auto-reveal stays open

// Flatten SERVICES once, with a stable id per tile, so the parent can pick
// a random one to auto-reveal every few seconds.
function flattenServices(rows) {
  const flat = [];
  rows.forEach((row, r) =>
    row.forEach((service, c) => flat.push({ ...service, id: `${r}-${c}` }))
  );
  return flat;
}

function ServiceTile({ service, autoActive }) {
  const [hovered, setHovered] = useState(false);
  const open = hovered || autoActive;
  // rough width estimate so longer names get enough room; tweak the multiplier to taste
  const expandedWidth = Math.max(60, service.name.length * 8.5 + 28);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
    >
      {/* original color tile — stays exactly as-is, code never changes */}
      <div
        style={{
          width: TILE,
          height: TILE,
          flexShrink: 0,
          borderRadius: 2,
          background: service.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: 18,
          color: "#0B0F1A",
          boxShadow: open ? "0 8px 20px -6px rgba(0,0,0,0.5)" : "none",
          transition: "box-shadow 200ms ease",
        }}
      >
        {service.code}
      </div>

      {/* white flyout with the full name — pushes tiles to the right when it opens */}
      <div
        style={{
          height: TILE,
          width: open ? expandedWidth : 0,
          marginLeft: open ? 0 : 0,
          flexShrink: 0,
          borderRadius: 2,
          background: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          paddingLeft: open ? 14 : 0,
          overflow: "hidden",
          whiteSpace: "nowrap",
          transition:
            "width 280ms cubic-bezier(0.65,0,0.35,1), margin-left 280ms ease, padding-left 280ms ease",
        }}
      >
        <span
          style={{
            fontWeight: 600,
            fontSize: 15,
            color: "#0B0F1A",
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

  useEffect(() => {
    let showTimeout;
    const pickRandom = () => {
      setAutoId((current) => {
        // avoid repeating the same tile twice in a row
        const choices = flatServices.filter((s) => s.id !== current);
        const pick = choices[Math.floor(Math.random() * choices.length)];
        return pick.id;
      });
      showTimeout = setTimeout(() => setAutoId(null), AUTO_SHOW_MS);
    };
    const interval = setInterval(pickRandom, AUTO_INTERVAL_MS);
    return () => {
      clearInterval(interval);
      clearTimeout(showTimeout);
    };
  }, [flatServices]);

  return (
    <section
      style={{
        background: BG,
        color: "#FFFFFF",
        padding: "88px 8vw",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fraunces:ital,wght@1,500&display=swap');
        .dsvc-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 64px;
          align-items: center;
        }
        .dsvc-cta:hover { background: #3D7BFF; color: #fff !important; border-color: #3D7BFF !important; }
        @media (max-width: 900px) {
          .dsvc-grid { grid-template-columns: 1fr; gap: 40px; }
        }
      `}</style>

      <div className="dsvc-grid">
        {/* Left: image + caption */}
        <div>
          <div style={{ borderRadius: 18, overflow: "hidden" }}>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80"
              alt="digitize.pk team at a client event"
              style={{
                width: "100%",
                height: 460,
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
            The digitize.pk team connecting with clients at a Karachi tech
            meetup — replace with your own event or team photography.
          </p>
        </div>

        {/* Right: services grid + copy */}
        <div>
          <div>
            {SERVICES.map((row, r) => (
              <div
                key={r}
                style={{
                  display: "flex",
                  gap: GAP,
                  marginLeft: ROW_OFFSET[r] * (TILE + GAP),
                  marginBottom: GAP,
                }}
              >
                {row.map((service, c) => (
                  <ServiceTile
                    key={service.code}
                    service={service}
                    autoActive={autoId === `${r}-${c}`}
                  />
                ))}
              </div>
            ))}
          </div>

          <h2
            style={{
              marginTop: 48,
              fontSize: "clamp(34px, 4vw, 48px)",
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
                color: "#3D7BFF",
              }}
            >
              services
            </span>
          </h2>

          <p
            style={{
              marginTop: 22,
              maxWidth: 520,
              fontSize: 17,
              lineHeight: 1.65,
              color: "#AEB6C4",
            }}
          >
            From strategy to digital product building and beyond, digitize.pk
            brings the right mix of services to accelerate your vision with
            holistic, practical solutions. We listen deeply and share our
            knowledge every step of the way, empowering your teams to
            continue the momentum after we're gone.
          </p>

          <button
            className="dsvc-cta"
            style={{
              marginTop: 32,
              padding: "14px 28px",
              borderRadius: 999,
              border: "1.5px solid #3D7BFF",
              background: "transparent",
              color: "#3D7BFF",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 200ms ease, color 200ms ease",
            }}
          >
            Explore our services
          </button>
        </div>
      </div>
    </section>
  );
}
