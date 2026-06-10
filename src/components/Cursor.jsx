import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const rx = useSpring(mx, { stiffness: 120, damping: 16, mass: 0.08 })
  const ry = useSpring(my, { stiffness: 120, damping: 16, mass: 0.08 })

  useEffect(() => {
    const onMove = (e) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const onOver = (e) => {
      setHovering(!!e.target.closest('a, button, [data-hover]'))
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
  }, [visible, mx, my])

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-indigo-400 mix-blend-difference"
        style={{ x: mx, y: my, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: hovering ? 6 : 8, height: hovering ? 6 : 8, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-indigo-400/50"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 52 : 36,
          height: hovering ? 52 : 36,
          opacity: visible ? (hovering ? 0.7 : 0.4) : 0,
          backgroundColor: hovering ? 'rgba(99,102,241,0.12)' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 22 }}
      />
    </>
  )
}
