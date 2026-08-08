import React, { useState } from "react";
import {
  Search,
  Home,
  User,
  ChevronLeft,
  Wifi,
  BatteryFull,
  SignalHigh,
  Heart,
  Share2,
  Bookmark,
  Settings,
  Bell,
  ChevronRight,
  Circle,
} from "lucide-react";

/**
 * ────────────────────────────────────────────────────────────────
 *  ANDROID DEVICE SIMULATOR
 * ────────────────────────────────────────────────────────────────
 *  Drop-in phone frame + interactive prototype navigator.
 *
 *  TO USE YOUR OWN SCREENS: replace the four screen components
 *  below (HomeScreen, DetailScreen, SearchScreen, ProfileScreen)
 *  with your own designs. Keep the same props contract:
 *    - onOpenDetail(project)  → push the detail screen
 *    - onBack()               → pop back to the previous screen
 *  Everything else (frame, status bar, gesture bar, tab bar,
 *  transitions) is reusable chrome and shouldn't need to change.
 * ────────────────────────────────────────────────────────────────
 */

const ACCENT = "#3457D5";

const PROJECTS = [
  {
    id: 1,
    title: "Wayfinder",
    subtitle: "Transit companion app",
    tag: "Mobile · Navigation",
    gradient: "from-[#3457D5] to-[#7B8CF0]",
    description:
      "A rebuilt transit app for a mid-size city, focused on getting riders to real-time departures in under two taps. Designed the route search, live map, and offline fallback states.",
  },
  {
    id: 2,
    title: "Sundial",
    subtitle: "Habit tracking",
    tag: "Mobile · Wellness",
    gradient: "from-[#E8834E] to-[#F0B88C]",
    description:
      "A quieter alternative to streak-shaming habit trackers. Uses a soft daily arc instead of a counter, and lets people miss a day without breaking anything.",
  },
  {
    id: 3,
    title: "Ledger",
    subtitle: "Freelance invoicing",
    tag: "Mobile · Finance",
    gradient: "from-[#1F7A5C] to-[#5CBBA0]",
    description:
      "Invoicing built for people who hate invoicing. Send, track, and follow up on payments in three screens, with plain-language status instead of jargon.",
  },
];

export default function PhoneSimulator() {
  const [tab, setTab] = useState("home");
  const [detail, setDetail] = useState(null);
  const [time, setTime] = useState("9:41");

  const openDetail = (project) => setDetail(project);
  const closeDetail = () => setDetail(null);

  const switchTab = (next) => {
    setDetail(null);
    setTab(next);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#EDEAE3] p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .phone-font-display { font-family: 'Space Grotesk', sans-serif; }
        .phone-font-body { font-family: 'Inter', sans-serif; }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .slide-in { animation: slideIn 0.32s cubic-bezier(0.22, 1, 0.36, 1); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ── DEVICE BODY ─────────────────────────────────────── */}
      <div
        className="relative"
        style={{
          width: 320,
          height: 668,
          borderRadius: 46,
          background: "linear-gradient(155deg, #24262C 0%, #121317 60%, #1A1B20 100%)",
          padding: 14,
          boxShadow:
            "0 40px 80px -20px rgba(0,0,0,0.45), 0 10px 24px -8px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        {/* volume + power buttons */}
        <div className="absolute -right-[3px] top-[120px] w-[3px] h-16 bg-[#0E0F12] rounded-l-sm" />
        <div className="absolute -left-[3px] top-[100px] w-[3px] h-10 bg-[#0E0F12] rounded-r-sm" />
        <div className="absolute -left-[3px] top-[150px] w-[3px] h-16 bg-[#0E0F12] rounded-r-sm" />

        {/* ── SCREEN ────────────────────────────────────────── */}
        <div
          className="relative w-full h-full overflow-hidden phone-font-body"
          style={{ borderRadius: 34, background: "#F6F3ED" }}
        >
          {/* punch-hole camera */}
          <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] rounded-full bg-black z-30 ring-2 ring-[#0a0a0a]/40" />

          {/* status bar */}
          <div className="relative z-20 flex items-center justify-between px-6 pt-3 pb-1 text-[#1B1D22]">
            <span className="text-[13px] font-semibold tabular-nums">{time}</span>
            <div className="flex items-center gap-1.5">
              <SignalHigh size={14} strokeWidth={2.5} />
              <Wifi size={14} strokeWidth={2.5} />
              <BatteryFull size={16} strokeWidth={2.2} />
            </div>
          </div>

          {/* screen content area */}
          <div className="relative h-[calc(100%-34px)] overflow-hidden">
            <div className="h-full overflow-y-auto no-scrollbar pb-24">
              {tab === "home" && !detail && (
                <HomeScreen projects={PROJECTS} onOpenDetail={openDetail} />
              )}
              {tab === "search" && !detail && <SearchScreen projects={PROJECTS} onOpenDetail={openDetail} />}
              {tab === "profile" && !detail && <ProfileScreen />}
            </div>

            {/* detail screen slides over whatever tab is active */}
            {detail && (
              <div className="absolute inset-0 slide-in bg-[#F6F3ED] overflow-y-auto no-scrollbar pb-10">
                <DetailScreen project={detail} onBack={closeDetail} />
              </div>
            )}

            {/* bottom tab bar */}
            {!detail && (
              <div
                className="absolute bottom-0 left-0 right-0 flex items-center justify-around pt-2.5 pb-1"
                style={{
                  background: "rgba(246,243,237,0.92)",
                  backdropFilter: "blur(8px)",
                  borderTop: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <TabButton icon={Home} label="Home" active={tab === "home"} onClick={() => switchTab("home")} />
                <TabButton icon={Search} label="Search" active={tab === "search"} onClick={() => switchTab("search")} />
                <TabButton icon={User} label="Profile" active={tab === "profile"} onClick={() => switchTab("profile")} />
              </div>
            )}

            {/* gesture bar */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[120px] h-[4px] rounded-full bg-[#1B1D22]/70 z-30" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   REUSABLE CHROME
   ──────────────────────────────────────────────────────────── */

function TabButton({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-0.5 px-4 py-1 transition-colors"
      style={{ color: active ? ACCENT : "#9A9791" }}
    >
      <Icon size={20} strokeWidth={active ? 2.4 : 2} />
      <span className="text-[10px] font-medium phone-font-body">{label}</span>
    </button>
  );
}

/* ────────────────────────────────────────────────────────────
   SAMPLE SCREENS — replace these with your own UI/UX designs
   ──────────────────────────────────────────────────────────── */

function HomeScreen({ projects, onOpenDetail }) {
  return (
    <div className="px-5 pt-3">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-[13px] text-[#8A8781]">Good morning</p>
          <h1 className="text-[22px] font-semibold phone-font-display text-[#1B1D22]">Your work</h1>
        </div>
        <div className="w-9 h-9 rounded-full flex items-center justify-center relative" style={{ background: "#EFEAE0" }}>
          <Bell size={16} color="#1B1D22" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
        </div>
      </div>

      <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl mb-5" style={{ background: "#EFEAE0" }}>
        <Search size={16} color="#8A8781" />
        <span className="text-[13px] text-[#8A8781]">Search projects</span>
      </div>

      <div className="flex flex-col gap-3.5">
        {projects.map((p) => (
          <button
            key={p.id}
            onClick={() => onOpenDetail(p)}
            className="text-left rounded-3xl overflow-hidden bg-white active:scale-[0.98] transition-transform"
            style={{ boxShadow: "0 6px 20px -8px rgba(27,29,34,0.15)" }}
          >
            <div className={`h-28 bg-gradient-to-br ${p.gradient}`} />
            <div className="p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: ACCENT }}>
                {p.tag}
              </p>
              <h3 className="text-[16px] font-semibold phone-font-display text-[#1B1D22] mt-0.5">{p.title}</h3>
              <p className="text-[12.5px] text-[#8A8781] mt-0.5">{p.subtitle}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function DetailScreen({ project, onBack }) {
  return (
    <div>
      <div className={`h-52 bg-gradient-to-br ${project.gradient} relative`}>
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-8 h-8 rounded-full bg-black/25 backdrop-blur-sm flex items-center justify-center"
        >
          <ChevronLeft size={18} color="white" strokeWidth={2.5} />
        </button>
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button className="w-8 h-8 rounded-full bg-black/25 backdrop-blur-sm flex items-center justify-center">
            <Heart size={15} color="white" />
          </button>
          <button className="w-8 h-8 rounded-full bg-black/25 backdrop-blur-sm flex items-center justify-center">
            <Share2 size={15} color="white" />
          </button>
        </div>
      </div>

      <div className="px-5 pt-5">
        <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: ACCENT }}>
          {project.tag}
        </p>
        <h1 className="text-[21px] font-semibold phone-font-display text-[#1B1D22] mt-1">{project.title}</h1>
        <p className="text-[13.5px] leading-relaxed text-[#6B6862] mt-2.5">{project.description}</p>

        <div className="flex gap-2 mt-4">
          {["Case study", "Prototype", "2024"].map((chip) => (
            <span key={chip} className="text-[11px] font-medium px-3 py-1.5 rounded-full" style={{ background: "#EFEAE0", color: "#6B6862" }}>
              {chip}
            </span>
          ))}
        </div>

        <button
          className="w-full mt-6 py-3.5 rounded-2xl text-white text-[14px] font-semibold flex items-center justify-center gap-1.5"
          style={{ background: ACCENT }}
        >
          Open prototype <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

function SearchScreen({ projects, onOpenDetail }) {
  return (
    <div className="px-5 pt-3">
      <h1 className="text-[20px] font-semibold phone-font-display text-[#1B1D22] mb-4">Browse</h1>
      <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl mb-5" style={{ background: "#EFEAE0" }}>
        <Search size={16} color="#8A8781" />
        <span className="text-[13px] text-[#8A8781]">Search by name or tag</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {projects.map((p) => (
          <button
            key={p.id}
            onClick={() => onOpenDetail(p)}
            className={`h-28 rounded-2xl bg-gradient-to-br ${p.gradient} flex items-end p-3 active:scale-[0.97] transition-transform`}
          >
            <span className="text-white text-[12px] font-semibold phone-font-display text-left">{p.title}</span>
          </button>
        ))}
        <div className="h-28 rounded-2xl border-2 border-dashed flex items-center justify-center" style={{ borderColor: "#D8D3C8" }}>
          <span className="text-[11px] text-[#B0ABA1]">More soon</span>
        </div>
      </div>
    </div>
  );
}

function ProfileScreen() {
  const stats = [
    { label: "Projects", value: "12" },
    { label: "Prototypes", value: "34" },
    { label: "Years", value: "5" },
  ];
  const rows = [
    { icon: Bookmark, label: "Saved work" },
    { icon: Settings, label: "Preferences" },
    { icon: Circle, label: "About" },
  ];
  return (
    <div className="px-5 pt-3">
      <div className="flex flex-col items-center pt-2 pb-5">
        <div
          className="w-20 h-20 rounded-full mb-3"
          style={{ background: "linear-gradient(135deg, #3457D5, #7B8CF0)" }}
        />
        <h1 className="text-[18px] font-semibold phone-font-display text-[#1B1D22]">Jordan Avery</h1>
        <p className="text-[13px] text-[#8A8781]">Product Designer</p>
      </div>

      <div className="flex justify-around py-4 rounded-2xl mb-5" style={{ background: "#EFEAE0" }}>
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-[17px] font-semibold phone-font-display text-[#1B1D22]">{s.value}</p>
            <p className="text-[11px] text-[#8A8781]">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col rounded-2xl overflow-hidden bg-white" style={{ boxShadow: "0 6px 20px -8px rgba(27,29,34,0.1)" }}>
        {rows.map((r, i) => (
          <div
            key={r.label}
            className="flex items-center justify-between px-4 py-3.5"
            style={{ borderTop: i === 0 ? "none" : "1px solid #F0EDE6" }}
          >
            <div className="flex items-center gap-3">
              <r.icon size={16} color="#6B6862" />
              <span className="text-[13.5px] text-[#1B1D22]">{r.label}</span>
            </div>
            <ChevronRight size={15} color="#B0ABA1" />
          </div>
        ))}
      </div>
    </div>
  );
}
