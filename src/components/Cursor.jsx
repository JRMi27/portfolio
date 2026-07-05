import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Le curseur custom n'est actif que si un vrai pointeur est disponible ET que
// l'utilisateur n'a pas demandé à réduire les animations (accessibilité).
const cursorEnabled = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Cursor() {
  const [enabled] = useState(cursorEnabled)
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [overText, setOverText] = useState(false)

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  // Le halo suit avec un léger retard (ressort souple) pour un effet de projecteur fluide.
  const hx = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.3 })
  const hy = useSpring(my, { stiffness: 90, damping: 18, mass: 0.3 })

  // Masque le curseur natif uniquement pendant que le curseur custom est actif,
  // pour ne jamais laisser l'utilisateur « sans curseur ».
  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('custom-cursor')
    return () => document.documentElement.classList.remove('custom-cursor')
  }, [enabled])

  useEffect(() => {
    if (!enabled) return
    const onMove = (e) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const onOver = (e) => {
      const t = e.target
      setHovering(!!t.closest('a, button, [data-hover]'))
      setOverText(!!t.closest('input, textarea, [contenteditable="true"]'))
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled, visible, mx, my])

  if (!enabled) return null

  // Sur un champ de saisie, on laisse le curseur natif (I-beam) et on masque
  // le curseur custom pour ne pas afficher deux curseurs à la fois.
  const shown = visible && !overText

  return (
    <>
      {/* Halo lumineux flou — effet projecteur qui suit le curseur */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full mix-blend-screen"
        style={{
          x: hx,
          y: hy,
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle, rgba(129,140,248,0.55) 0%, rgba(99,102,241,0.20) 38%, transparent 70%)',
          filter: 'blur(14px)',
        }}
        animate={{
          width: hovering ? 340 : 240,
          height: hovering ? 340 : 240,
          opacity: shown ? (hovering ? 0.95 : 0.6) : 0,
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 26 }}
      />
      {/* Point net au centre, à la position exacte du curseur (aucun retard) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-indigo-200 mix-blend-difference"
        style={{ x: mx, y: my, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: hovering ? 10 : 6, height: hovering ? 10 : 6, opacity: shown ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}
