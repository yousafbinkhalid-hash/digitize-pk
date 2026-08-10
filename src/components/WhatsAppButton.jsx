import React from "react";

/**
 * WhatsAppButton
 * ------------------------
 * Floating bubble, bottom-right, that opens a WhatsApp chat with a
 * pre-filled greeting message. No backend needed — this just builds a
 * wa.me link and opens it in a new tab.
 *
 * Usage: render once near the root of your app, e.g. in App.jsx:
 *
 *   <WhatsAppButton
 *     phoneNumber="923001234567"   // country code + number, no +, no spaces/dashes
 *     message="Hi! I'd like to know more about your services."
 *   />
 *
 * On mobile, wa.me opens the WhatsApp app directly.
 * On desktop, it opens WhatsApp Web (or the desktop app if installed).
 */

const ACCENT_WHATSAPP = "#25D366"; // WhatsApp's own brand green — reads correctly as "this is WhatsApp"

export default function WhatsAppButton({
  phoneNumber, // e.g. "00923214273257" — digits only, country code first, no leading +
  message = "Hi! I'd like to know more.",
}) {
  if (!phoneNumber) {
    console.error("[WhatsAppButton] Missing required phoneNumber prop.");
    return null;
  }

  const cleanNumber = phoneNumber.replace(/[^\d]/g, "");
  const href = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: "50%",
        background: ACCENT_WHATSAPP,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
        zIndex: 999998,
        transition: "transform 150ms ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <svg viewBox="0 0 32 32" width="30" height="30" fill="#fff" aria-hidden="true">
        <path d="M16.004 3C9.376 3 4 8.373 4 15c0 2.34.66 4.523 1.804 6.383L4 29l7.836-1.76A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm6.98 16.63c-.29.81-1.43 1.49-2.34 1.68-.62.13-1.43.24-4.16-.89-3.49-1.44-5.74-4.99-5.92-5.22-.17-.23-1.42-1.89-1.42-3.6 0-1.72.9-2.56 1.22-2.91.29-.31.64-.39.86-.39.21 0 .43 0 .62.01.2.01.47-.08.73.56.29.7.98 2.42 1.07 2.6.09.18.15.39.03.62-.12.23-.18.37-.36.57-.18.2-.38.44-.54.6-.18.18-.37.37-.16.73.21.36.93 1.53 1.99 2.48 1.37 1.22 2.52 1.6 2.88 1.78.36.18.57.15.78-.09.21-.24.9-1.05 1.14-1.41.24-.36.48-.3.8-.18.32.12 2.05.97 2.4 1.14.35.18.58.27.67.42.09.15.09.87-.2 1.68Z"/>
      </svg>
    </a>
  );
}
