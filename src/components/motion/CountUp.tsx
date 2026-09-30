import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'framer-motion'

export default function CountUp({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1.4,
}: {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      // es-ES no agrupa los números de 4 cifras con toLocaleString, así que formateamos a mano (4.970)
      onUpdate: (v) => {
        const [int, dec] = v.toFixed(decimals).split('.')
        setDisplay(int.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (dec ? ',' + dec : ''))
      },
    })
    return () => controls.stop()
  }, [inView, value, duration, decimals])

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
