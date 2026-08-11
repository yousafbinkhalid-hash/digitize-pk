import { useEffect, useRef, useState } from 'react'

/**
 * useReveal
 * ------------------------
 * Returns a ref + boolean. Once the ref'd element scrolls into view, the
 * boolean flips to true and stays true (one-shot reveal, not a toggle).
 * Mirrors the IntersectionObserver pattern already used by useCountUp.
 */
export function useReveal(threshold = 0.2) {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, visible]
}
