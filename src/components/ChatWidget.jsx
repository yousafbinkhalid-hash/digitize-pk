import React, { useEffect, useRef, useState } from "react";

/**
 * ChatWidget
 * ------------------------
 * Floating chat bubble + panel, native React (no external script tag).
 * Talks to your own backend (see server/index.js from the earlier setup) —
 * never calls the Anthropic API directly from the browser.
 *
 * Usage: render once near the root of your app, e.g. in App.jsx:
 *
 *   <ChatWidget
 *     backendUrl="https://your-backend.com/api/chat"
 *     greeting="Hi! 👋 How can I help you today?"
 *     company="digitize.pk"
 *   />
 *
 * Design tokens match DigitizeIndustrySection / DigitizeServicesSection —
 * keep ACCENT/BG/BG_SOFT/FONT_STACK identical across all three if you edit them.
 */

// ---- Shared design tokens (match DigitizeIndustrySection.jsx / DigitizeServicesSection.jsx) ----
const ACCENT = "#3D7BFF";
const BG = "#070B16";
const BG_SOFT = "#0C1224";
const TEXT_MUTED = "#AEB6C4";
const TEXT_CAPTION = "#7C8598";
const FONT_STACK = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";

export default function ChatWidget({
  backendUrl,
  greeting = "Hi! 👋 How can I help you today?",
  company = "Chat",
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]); // { role, content }
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const [error, setError] = useState(null);
  const sessionIdRef = useRef(null);
  const scrollRef = useRef(null);

  // Stable per-tab session id, created once
  useEffect(() => {
    const key = "cw_session_id";
    let id = sessionStorage.getItem(key);
    if (!id) {
      id = "s_" + Math.random().toString(36).slice(2) + Date.now();
      sessionStorage.setItem(key, id);
    }
    sessionIdRef.current = id;
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const handleOpen = () => {
    setOpen((o) => {
      const next = !o;
      if (next && messages.length === 0) {
        // Greeting is instant — no API call needed
        setMessages([{ role: "assistant", content: greeting }]);
      }
      return next;
    });
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || limitReached || typing) return;

    const nextHistory = [...messages, { role: "user", content: text }];
    setMessages(nextHistory);
    setInput("");
    setError(null);
    setTyping(true);

    try {
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          messages: nextHistory,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      if (data.limitReached) setLimitReached(true);
    } catch (e) {
      setError("Connection issue — please try again in a moment.");
    } finally {
      setTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div style={{ fontFamily: FONT_STACK }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .cw-bubble:hover { transform: scale(1.05); }
        .cw-scroll::-webkit-scrollbar { width: 6px; }
        .cw-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 999px; }
      `}</style>

      {/* Floating bubble */}
      <button
        className="cw-bubble"
        onClick={handleOpen}
        aria-label={open ? "Close chat" : "Open chat"}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: ACCENT,
          color: "#fff",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
          zIndex: 999998,
          fontSize: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 150ms ease",
        }}
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 88,
            right: 20,
            width: 340,
            maxWidth: "92vw",
            height: 460,
            maxHeight: "70vh",
            background: BG_SOFT,
            borderRadius: 16,
            boxShadow: "0 12px 32px rgba(0,0,0,0.45)",
            zIndex: 999999,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: BG,
              padding: "14px 16px",
              fontWeight: 600,
              fontSize: 15,
              color: "#fff",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {company}
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="cw-scroll"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 14,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  padding: "9px 12px",
                  borderRadius: 12,
                  fontSize: 14,
                  lineHeight: 1.45,
                  background: m.role === "user" ? ACCENT : "#1A2138",
                  color: "#fff",
                  borderBottomRightRadius: m.role === "user" ? 3 : 12,
                  borderBottomLeftRadius: m.role === "user" ? 12 : 3,
                }}
              >
                {m.content}
              </div>
            ))}
            {typing && (
              <div style={{ fontSize: 13, color: TEXT_CAPTION, padding: "2px 12px" }}>
                Typing…
              </div>
            )}
            {error && (
              <div style={{ fontSize: 13, color: "#F0522F", padding: "2px 12px" }}>
                {error}
              </div>
            )}
          </div>

          {/* Input row */}
          <div
            style={{
              display: "flex",
              gap: 8,
              padding: 10,
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <input
              type="text"
              value={input}
              disabled={limitReached}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={limitReached ? "Conversation ended" : "Type a message…"}
              style={{
                flex: 1,
                background: "#131A2E",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff",
                borderRadius: 999,
                padding: "9px 14px",
                fontSize: 14,
                outline: "none",
                fontFamily: FONT_STACK,
              }}
            />
            <button
              onClick={sendMessage}
              disabled={limitReached || typing || !input.trim()}
              aria-label="Send"
              style={{
                background: ACCENT,
                border: "none",
                color: "#fff",
                borderRadius: 999,
                width: 36,
                height: 36,
                flexShrink: 0,
                cursor: limitReached || typing ? "not-allowed" : "pointer",
                opacity: limitReached || typing || !input.trim() ? 0.5 : 1,
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
