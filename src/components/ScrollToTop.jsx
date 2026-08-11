import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop
 * ------------------------
 * React Router does not reset scroll position on navigation by default —
 * a new page inherits whatever scroll position the previous page was at.
 * Render this once, anywhere inside <BrowserRouter>, and it resets the
 * scroll to the top of the page every time the route (pathname) changes —
 * unless the URL includes a hash (e.g. /partners#google), in which case it
 * scrolls to that element instead once the new page has painted.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      // wait a tick for the new route's DOM to actually be there
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
        window.scrollTo(0, 0)
      })
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
