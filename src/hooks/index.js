import { useState, useEffect } from 'react'

export function useTypewriter(words, speed = 80) {
  const [display, setDisplay]   = useState('')
  const [wIdx, setWIdx]         = useState(0)
  const [cIdx, setCIdx]         = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word  = words[wIdx]
    const delay = deleting ? 40 : speed

    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplay(word.substring(0, cIdx + 1))
        if (cIdx + 1 === word.length) {
          setTimeout(() => setDeleting(true), 1400)
        } else {
          setCIdx(c => c + 1)
        }
      } else {
        setDisplay(word.substring(0, cIdx - 1))
        if (cIdx - 1 === 0) {
          setDeleting(false)
          setWIdx(w => (w + 1) % words.length)
          setCIdx(0)
        } else {
          setCIdx(c => c - 1)
        }
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [cIdx, deleting, wIdx, words, speed])

  return display
}

export function useMousePosition() {
  const [pos, setPos] = useState({ x: -200, y: -200 })

  useEffect(() => {
    const move = e => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return pos
}

export function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.4 }
    )
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [sectionIds])

  return active
}
