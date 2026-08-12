import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowUpRight, ArrowRight } from "lucide-react";

/**
 * ServicesPage
 * ------------------------
 * Full "Services (detailed)" inner page for digitize.pk.
 *
 * Signature idea: the homepage's color-coded "periodic table" service tiles
 * become the actual navigation for this page — an oversized tile grid in
 * the hero that visitors click to jump straight into that service's detail
 * section below, with a brief highlight pulse on arrival. This keeps the
 * homepage teaser and this inner page reading as one system rather than two
 * disconnected components.
 *
 * Design tokens match DigitizeIndustrySection.jsx / DigitizeServicesSection.jsx —
 * keep ACCENT/BG/BG_SOFT/FONT_STACK identical across all site files if you edit them.
 */

// ---- Shared design tokens ----
const ACCENT = "#3D7BFF";
const BG = "#070B16";
const BG_SOFT = "#0C1224";
const BG_ELEV = "#131A2E";
const TEXT_MUTED = "#AEB6C4";
const TEXT_CAPTION = "#7C8598";
const FONT_STACK = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
const MOBILE_BREAKPOINT = 640;
const TABLET_BREAKPOINT = 900;

// ---- Service data: 6 services across 4 stacks, same source powers the
// homepage tile grid and this page's detail sections. ----
const SERVICES = [
  {
    code: "St",
    name: "Strategy",
    stack: "Strategy & Planning",
    color: "#D946A8",
    tagline: "Know where you're going before you spend on how to get there.",
    description:
      "We audit what you have, benchmark it against where your industry is heading, and turn that into a roadmap your team can actually execute — not a slide deck that sits in a drawer.",
    deliverables: [
      "Digital maturity audit",
      "3-year technology roadmap",
      "Build vs. buy recommendations",
      "Budget & phasing plan",
    ],
    bestFor: "Leadership teams planning a transformation budget",
    engagement: "Fixed-scope engagement",
  },
  {
    code: "Ux",
    name: "UX / UI Design",
    stack: "Design & Experience",
    color: "#EAC22D",
    tagline: "Design that makes the right action the obvious one.",
    description:
      "We research how people actually use your product, then design flows and interfaces that reduce friction — backed by prototypes you can test before a single line of code ships.",
    deliverables: [
      "User research & journey mapping",
      "Wireframes & clickable prototypes",
      "Full UI design system",
      "Usability testing",
    ],
    bestFor: "Products with a drop-off point users keep hitting",
    engagement: "Fixed-scope engagement",
  },
  {
    code: "Sw",
    name: "Software Dev",
    stack: "Engineering",
    color: "#CFE22D",
    tagline: "Custom-built, for the workflow you actually have.",
    description:
      "When off-the-shelf software almost fits but not quite, we build the tool around your process instead of forcing your process around a tool.",
    deliverables: [
      "Custom web application build",
      "API development & integration",
      "Legacy system modernization",
      "Ongoing maintenance",
    ],
    bestFor: "Teams whose workflow doesn't fit any off-the-shelf tool",
    engagement: "Dedicated team or fixed-scope",
  },
  {
    code: "Mo",
    name: "Mobile Apps",
    stack: "Engineering",
    color: "#7AD62B",
    tagline: "One codebase, every device that matters.",
    description:
      "iOS, Android, or both — we build native-feeling apps efficiently and keep them maintainable, so shipping your next feature doesn't mean rebuilding twice.",
    deliverables: [
      "Native or cross-platform build",
      "App Store & Play Store launch",
      "Push notifications & offline support",
      "Post-launch iteration",
    ],
    bestFor: "Businesses ready to move a core workflow to mobile",
    engagement: "Dedicated team or fixed-scope",
  },
  {
    code: "Cl",
    name: "Cloud",
    stack: "Engineering",
    color: "#F2892B",
    tagline: "Infrastructure that scales when you need it, and costs less when you don't.",
    description:
      "We migrate, architect, or right-size your cloud setup so it holds up under real traffic without you overpaying for capacity you're not using.",
    deliverables: [
      "Cloud architecture design",
      "Migration & zero-downtime cutover",
      "Cost optimization review",
      "Monitoring & alerting setup",
    ],
    bestFor: "Teams outgrowing on-prem servers or a single provider",
    engagement: "Fixed-scope or ongoing retainer",
  },
  {
    code: "Mk",
    name: "Digital Marketing",
    stack: "Growth & Commerce",
    color: "#20C4C4",
    tagline: "Spend that's traceable to actual results.",
    description:
      "Search, social, and paid campaigns set up with tracking from day one, so you always know which channel is actually earning its budget.",
    deliverables: [
      "SEO audit & content strategy",
      "Paid campaign setup & management",
      "Conversion tracking & analytics",
      "Monthly performance reporting",
    ],
    bestFor: "Teams running ad spend without clear attribution",
    engagement: "Ongoing retainer",
  },
  {
    code: "Ec",
    name: "E-commerce",
    stack: "Growth & Commerce",
    color: "#22C79E",
    tagline: "From browsing to checkout, without the drop-off.",
    description:
      "We build and tune storefronts on the platform that fits your catalog and volume, then optimize the checkout flow where most revenue quietly leaks away.",
    deliverables: [
      "Storefront build or migration",
      "Payment & shipping integration",
      "Checkout conversion optimization",
      "Inventory & catalog setup",
    ],
    bestFor: "Retailers launching online or switching platforms",
    engagement: "Fixed-scope engagement",
  },
];

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Discovery",
    description:
      "We learn your business, your users, and the constraint that's actually slowing you down — not just the one you called us about.",
  },
  {
    n: "02",
    title: "Design & Prototype",
    description:
      "We map the solution and put a clickable version in front of you before committing engineering time to it.",
  },
  {
    n: "03",
    title: "Build & Integrate",
    description:
      "Development happens in short cycles with visible progress, wired into the systems you already run on.",
  },
  {
    n: "04",
    title: "Launch & Support",
    description:
      "We ship it, watch it under real usage, and stay reachable for whatever comes up after launch.",
  },
];

// ---- Hooks ----
function useIsMobile(breakpoint = MOBILE_BREAKPOINT) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= breakpoint
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

// Reveals an element once it scrolls into view; skips the transform entirely
// when the visitor has reduced motion set, showing content immediately.
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced) {
      setInView(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, reduced]);

  return [ref, inView, reduced];
}

function slugFor(code) {
  return `service-${code.toLowerCase()}`;
}

// ---- Hero tile grid: color-coded, click-to-jump navigation ----
function HeroTileGrid({ services, isMobile, onJump, pulseCode }) {
  const tile = isMobile ? 58 : 78;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile
          ? "repeat(3, 1fr)"
          : "repeat(auto-fit, minmax(78px, 1fr))",
        gap: isMobile ? 8 : 12,
        maxWidth: 620,
      }}
    >
      {services.map((s) => (
        <button
          key={s.code}
          onClick={() => onJump(s.code)}
          aria-label={`Jump to ${s.name}`}
          className={`svc-hero-tile${pulseCode === s.code ? " svc-pulse" : ""}`}
          style={{
            width: "100%",
            aspectRatio: "1 / 1",
            height: tile,
            borderRadius: 10,
            background: s.color,
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            color: "#0B0F1A",
            fontFamily: FONT_STACK,
            position: "relative",
          }}
        >
          <span style={{ fontWeight: 700, fontSize: isMobile ? 15 : 19 }}>{s.code}</span>
        </button>
      ))}
    </div>
  );
}

// ---- One detailed service section ----
function ServiceDetail({ service, index, isMobile }) {
  const [ref, inView, reduced] = useInView(0.1);
  const reversed = index % 2 === 1;

  const revealStyle = reduced
    ? {}
    : {
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 700ms ease, transform 700ms ease",
      };

  return (
    <div
      id={slugFor(service.code)}
      ref={ref}
      className="svc-detail-row"
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "0.85fr 1.15fr",
        gap: isMobile ? 20 : 56,
        alignItems: "start",
        padding: isMobile ? "40px 0" : "64px 0",
        borderTop: `2px solid ${service.color}40`,
        ...revealStyle,
      }}
    >
      {/* Left: identity block */}
      <div
        style={{
          order: isMobile ? 0 : reversed ? 1 : 0,
          position: isMobile ? "static" : "sticky",
          top: 100,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 12px",
            borderRadius: 999,
            background: `${service.color}1A`,
            border: `1px solid ${service.color}55`,
            marginBottom: 16,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: service.color,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: 12.5,
              fontWeight: 600,
              letterSpacing: 0.3,
              color: service.color,
            }}
          >
            {service.engagement}
          </span>
        </div>

        <span
          style={{
            display: "block",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: 0.4,
            textTransform: "uppercase",
            color: TEXT_CAPTION,
            marginBottom: 6,
          }}
        >
          {service.stack}
        </span>

        <h3
          style={{
            fontSize: isMobile ? 26 : 32,
            fontWeight: 500,
            letterSpacing: -0.4,
            marginBottom: 10,
            color: service.color,
          }}
        >
          {service.name}
        </h3>

        <p
          style={{
            fontFamily: "'Fraunces', serif",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: isMobile ? 16 : 18,
            color: TEXT_MUTED,
            lineHeight: 1.5,
            maxWidth: 320,
          }}
        >
          {service.tagline}
        </p>
      </div>

      {/* Right: detail block */}
      <div style={{ order: isMobile ? 1 : reversed ? 0 : 1 }}>
        <p
          style={{
            fontSize: 16.5,
            lineHeight: 1.7,
            color: TEXT_MUTED,
            maxWidth: 560,
            marginBottom: 24,
          }}
        >
          {service.description}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "10px 24px",
            marginBottom: 24,
          }}
        >
          {service.deliverables.map((d) => (
            <div key={d} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <Check size={16} color={service.color} strokeWidth={2.5} style={{ marginTop: 2, flexShrink: 0 }} />
              <span style={{ fontSize: 14.5, color: "#EDEFF5", lineHeight: 1.5 }}>{d}</span>
            </div>
          ))}
        </div>

        <div
          style={{
            padding: "12px 16px",
            borderRadius: 12,
            background: BG_ELEV,
            border: "1px solid rgba(255,255,255,0.06)",
            fontSize: 13.5,
            color: TEXT_CAPTION,
            maxWidth: 440,
          }}
        >
          <strong style={{ color: TEXT_MUTED, fontWeight: 600 }}>Best for:</strong>{" "}
          {service.bestFor}
        </div>
      </div>
    </div>
  );
}

// ---- Process section (real sequence — numbering earns its place here) ----
function ProcessSection({ isMobile }) {
  const [ref, inView, reduced] = useInView(0.1);

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
        gap: isMobile ? 28 : 24,
        position: "relative",
      }}
    >
      {!isMobile && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 27,
            left: "12.5%",
            right: "12.5%",
            height: 1,
            background: "rgba(255,255,255,0.12)",
            transform: reduced || inView ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: reduced ? "none" : "transform 1100ms ease",
          }}
        />
      )}
      {PROCESS_STEPS.map((step, i) => (
        <div
          key={step.n}
          style={{
            opacity: reduced || inView ? 1 : 0,
            transform: reduced || inView ? "translateY(0)" : "translateY(16px)",
            transition: reduced
              ? "none"
              : `opacity 500ms ease ${i * 120}ms, transform 500ms ease ${i * 120}ms`,
          }}
        >
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              background: BG_SOFT,
              border: `1.5px solid ${ACCENT}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              fontWeight: 700,
              color: ACCENT,
              marginBottom: 16,
              position: "relative",
              zIndex: 1,
            }}
          >
            {step.n}
          </div>
          <h4 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#fff" }}>
            {step.title}
          </h4>
          <p style={{ fontSize: 14.5, lineHeight: 1.6, color: TEXT_MUTED, maxWidth: 260 }}>
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function ServicesPage() {
  const isMobile = useIsMobile();
  const isTablet = useIsMobile(TABLET_BREAKPOINT);
  const [pulseCode, setPulseCode] = useState(null);
  const pulseTimeout = useRef(null);

  const handleJump = useCallback((code) => {
    const el = document.getElementById(slugFor(code));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setPulseCode(code);
    clearTimeout(pulseTimeout.current);
    pulseTimeout.current = setTimeout(() => setPulseCode(null), 1400);
  }, []);

  useEffect(() => () => clearTimeout(pulseTimeout.current), []);

  return (
    <div style={{ background: BG, color: "#fff", fontFamily: FONT_STACK }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fraunces:ital,wght@1,500&display=swap');

        .svc-hero-tile {
          transition: transform 220ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 220ms ease;
        }
        .svc-hero-tile:hover {
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 10px 24px -8px rgba(0,0,0,0.5);
        }
        .svc-hero-tile:focus-visible {
          outline: 2px solid #fff;
          outline-offset: 3px;
        }
        .svc-hero-tile.svc-pulse {
          animation: svcPulse 1.4s ease;
        }
        @keyframes svcPulse {
          0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.55); }
          70% { box-shadow: 0 0 0 14px rgba(255,255,255,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
        }
        .svc-cta:hover {
          background: ${ACCENT};
          color: #fff !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .svc-hero-tile { transition: none; }
        }
        a:focus-visible, button:focus-visible {
          outline: 2px solid ${ACCENT};
          outline-offset: 3px;
        }
      `}</style>

      {/* ---------------- HERO ---------------- */}
      <section style={{ padding: isMobile ? "72px 6vw 48px" : "120px 8vw 80px", position: "relative" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isTablet ? "1fr" : "1.05fr 0.95fr",
            gap: 56,
            alignItems: "center",
            position: "relative",
          }}
        >
          <div>
            <span
              style={{
                display: "inline-block",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: 0.6,
                color: ACCENT,
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              4 stacks, one team
            </span>

            <h1
              style={{
                fontSize: "clamp(36px, 5vw, 58px)",
                lineHeight: 1.08,
                fontWeight: 500,
                letterSpacing: -0.8,
                marginBottom: 22,
              }}
            >
              Strategy to launch,{" "}
              <span
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: ACCENT,
                }}
              >
                one team.
              </span>
            </h1>

            <p style={{ fontSize: 17.5, lineHeight: 1.7, color: TEXT_MUTED, maxWidth: 480, marginBottom: 32 }}>
              From roadmap to design, build, and growth, digitize.pk covers the full
              stack a digital product needs — so you're not stitching together
              five different vendors who've never spoken to each other.
            </p>

            <a
              href="#svc-process"
              className="svc-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 26px",
                borderRadius: 999,
                border: `1.5px solid ${ACCENT}`,
                background: "transparent",
                color: ACCENT,
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
                transition: "background 200ms ease, color 200ms ease",
              }}
            >
              See how we work
              <ArrowRight size={16} />
            </a>
          </div>

          <div>
            <HeroTileGrid services={SERVICES} isMobile={isMobile} onJump={handleJump} pulseCode={pulseCode} />
            <p style={{ marginTop: 14, fontSize: 13, color: TEXT_CAPTION }}>
              Tap a tile to jump straight to it.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- SERVICE DETAILS ---------------- */}
      <section style={{ padding: isMobile ? "0 6vw 40px" : "0 8vw 60px" }}>
        {SERVICES.map((service, i) => (
          <ServiceDetail key={service.code} service={service} index={i} isMobile={isTablet} />
        ))}
      </section>

      {/* ---------------- PROCESS ---------------- */}
      <section id="svc-process" style={{ padding: isMobile ? "56px 6vw" : "100px 8vw", background: BG_SOFT }}>
        <div style={{ maxWidth: 640, marginBottom: isMobile ? 40 : 64 }}>
          <h2
            style={{
              fontSize: "clamp(28px, 3.6vw, 42px)",
              fontWeight: 500,
              letterSpacing: -0.5,
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            How a project actually{" "}
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: "italic",
                fontWeight: 500,
                color: ACCENT,
              }}
            >
              moves
            </span>
          </h2>
          <p style={{ fontSize: 16.5, lineHeight: 1.7, color: TEXT_MUTED }}>
            Four stages, in this order, every time — so you always know what's next
            and who's waiting on what.
          </p>
        </div>

        <ProcessSection isMobile={isTablet} />
      </section>

      {/* ---------------- CLOSING CTA ---------------- */}
      <section style={{ padding: isMobile ? "56px 6vw" : "100px 8vw", textAlign: "center" }}>
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 500,
            letterSpacing: -0.5,
            marginBottom: 18,
            maxWidth: 620,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Not sure which service you need?{" "}
          <span
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              fontWeight: 500,
              color: ACCENT,
            }}
          >
            Tell us the problem.
          </span>
        </h2>
        <p style={{ fontSize: 16.5, color: TEXT_MUTED, maxWidth: 480, margin: "0 auto 32px" }}>
          We'll point you to the right one — or tell you honestly if it's smaller
          than you think.
        </p>
        <Link
          to="/contact"
          className="svc-cta"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "15px 30px",
            borderRadius: 999,
            border: `1.5px solid ${ACCENT}`,
            background: "transparent",
            color: ACCENT,
            fontSize: 15.5,
            fontWeight: 600,
            textDecoration: "none",
            transition: "background 200ms ease, color 200ms ease",
          }}
        >
          Get in touch
          <ArrowUpRight size={17} />
        </Link>
      </section>
    </div>
  );
}
