import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop
 * ------------------------
 * React Router does not reset scroll position on navigation by default —
 * a new page inherits whatever scroll position the previous page was at.
 * Render this once, anywhere inside <BrowserRouter>, and it resets the
 * scroll to the top of the page every time the route (pathname) changes.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
