// ---------- small original marks for every partner ----------
// (deliberately not reproductions of real logo artwork — simple original
// glyphs in brand-adjacent colors, paired with the wordmark text. Kept as
// plain inline SVG rather than a third-party icon library so this never
// breaks on an icon-set version bump again.)

export function GoogleMark() {
  return (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <circle cx="11" cy="11" r="5" fill="#4285F4" />
      <circle cx="21" cy="11" r="5" fill="#EA4335" />
      <circle cx="11" cy="21" r="5" fill="#FBBC05" />
      <circle cx="21" cy="21" r="5" fill="#34A853" />
    </svg>
  )
}

export function AdobeMark() {
  return (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <path d="M4 27 L13 5 L19 5 L28 27 L21.5 27 L16 12.5 L11.8 23 H17 L18.7 27 Z" fill="#FA0F00" />
    </svg>
  )
}

export function VercelMark() {
  return (
    <svg viewBox="0 0 32 32" width="18" height="18" aria-hidden="true">
      <path d="M16 6 L28 26 H4 Z" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinejoin="round" />
    </svg>
  )
}

export function GitHubMark() {
  return (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <circle cx="10" cy="22" r="3.4" fill="none" stroke="#8957e5" strokeWidth="2.2" />
      <circle cx="22" cy="10" r="3.4" fill="none" stroke="#8957e5" strokeWidth="2.2" />
      <path d="M13 20 C13 14, 16 14, 19 12.5" fill="none" stroke="#8957e5" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

export function VSCodeMark() {
  return (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <path d="M6 12 L14 16 L6 20" fill="none" stroke="#007ACC" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 9 L26 16 L17 23" fill="none" stroke="#007ACC" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ClaudeMark() {
  return (
    <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
      <path
        d="M16 4 L18.4 13.6 L28 16 L18.4 18.4 L16 28 L13.6 18.4 L4 16 L13.6 13.6 Z"
        fill="#DA7756"
      />
    </svg>
  )
}

// single source of truth — both /partners and the homepage strip read from
// this so the two never drift out of sync
export const PARTNERS = [
  {
    id: 'google',
    name: 'Google',
    category: 'Cloud & Search',
    color: '#4285F4',
    mark: GoogleMark,
    blurb:
      "From Google Cloud infrastructure to Workspace collaboration, Google's ecosystem keeps our projects running reliably and our team in sync.",
  },
  {
    id: 'adobe',
    name: 'Adobe',
    category: 'Creative & Design',
    color: '#FA0F00',
    mark: AdobeMark,
    blurb:
      'Creative Cloud is where our design system lives — Photoshop, Illustrator, and After Effects, from first concept to final polish.',
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'Hosting & Deployment',
    color: '#a1a1aa',
    mark: VercelMark,
    blurb:
      'Every site we ship deploys through Vercel — instant previews, global edge delivery, and zero-downtime releases as standard.',
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Version Control & CI',
    color: '#8957e5',
    mark: GitHubMark,
    blurb:
      'Every line of code lives in GitHub — version history, pull requests, and CI pipelines that keep our releases clean and reviewable.',
  },
  {
    id: 'vscode',
    name: 'Visual Studio',
    category: 'Development Environment',
    color: '#007ACC',
    mark: VSCodeMark,
    blurb:
      "VS Code is where the team spends most of its day — extensions, debugging, and a consistent setup across every engineer's machine.",
  },
  {
    id: 'claude',
    name: 'Claude',
    category: 'AI-Assisted Engineering',
    color: '#DA7756',
    mark: ClaudeMark,
    blurb:
      'Claude sits alongside our engineers for planning, code review, and pairing — moving faster without cutting corners on quality.',
  },
]
