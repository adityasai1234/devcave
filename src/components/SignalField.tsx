'use client'

import { useEffect, useRef } from 'react'

const COLS = 36
const ROWS = 16

function project(
  x: number,
  y: number,
  z: number,
  rot: number,
  width: number,
  height: number
) {
  const cos = Math.cos(rot)
  const sin = Math.sin(rot)
  const xr = x * cos - z * sin
  const zr = x * sin + z * cos
  const tilt = 0.85
  const ct = Math.cos(tilt)
  const st = Math.sin(tilt)
  const yr = y * ct - zr * st
  const depth = zr * ct + y * st
  const scale = Math.min(width, height) * 0.42 / (2.6 + depth)
  return {
    x: width * 0.5 + xr * scale,
    y: height * 0.55 - yr * scale,
  }
}

function wave(x: number, z: number, time: number) {
  return (
    Math.sin(x * 3.1 + time) * 0.22 +
    Math.sin(z * 2.4 + time * 0.7) * 0.12
  )
}

export function SignalField() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    let ctx: CanvasRenderingContext2D | null = null
    try {
      ctx = canvas.getContext('2d')
    } catch {
      return
    }
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let alive = true

    const draw = (time: number) => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      if (width < 2 || height < 2) return false

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const bw = Math.floor(width * dpr)
      const bh = Math.floor(height * dpr)
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw
        canvas.height = bh
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'

      const rot = reduce ? 0.7 : time * 0.00028
      const phase = reduce ? 0.4 : time * 0.0011

      const strokeRow = (zIndex: number) => {
        const z = (zIndex / (ROWS - 1)) * 2 - 1
        ctx.beginPath()
        for (let i = 0; i < COLS; i++) {
          const x = (i / (COLS - 1)) * 2 - 1
          const y = wave(x, z, phase)
          const p = project(x, y, z, rot, width, height)
          if (i === 0) ctx.moveTo(p.x, p.y)
          else ctx.lineTo(p.x, p.y)
        }
        const alpha = 0.28 + (zIndex / (ROWS - 1)) * 0.62
        ctx.strokeStyle = `rgba(63, 185, 80, ${alpha})`
        ctx.lineWidth = 1.35
        ctx.stroke()
      }

      for (let j = 0; j < ROWS; j++) strokeRow(j)

      for (let i = 0; i < COLS; i += 4) {
        const x = (i / (COLS - 1)) * 2 - 1
        ctx.beginPath()
        for (let j = 0; j < ROWS; j++) {
          const z = (j / (ROWS - 1)) * 2 - 1
          const y = wave(x, z, phase)
          const p = project(x, y, z, rot, width, height)
          if (j === 0) ctx.moveTo(p.x, p.y)
          else ctx.lineTo(p.x, p.y)
        }
        ctx.strokeStyle = 'rgba(63, 185, 80, 0.35)'
        ctx.lineWidth = 1
        ctx.stroke()
      }

      return true
    }

    const tick = (now: number) => {
      if (!alive) return
      const drew = draw(reduce ? 0 : now)
      if (reduce && drew) return
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      alive = false
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="signal" aria-hidden="true">
      <canvas ref={ref} />
    </div>
  )
}
