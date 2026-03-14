'use client'

import React from 'react'

const asciiArt = `
   A
  A A
 AAAAA
A     A
`

export function AboutWindow() {
  return (
    <div className="p-3 text-xs" style={{ color: '#e8e4dc' }}>
      <div className="flex gap-4">
        <pre
          className="text-xs leading-tight"
          style={{ color: '#00ff64', fontSize: '8px' }}
        >
          {asciiArt}
        </pre>
        <div className="flex-1">
          <div style={{ color: '#00ff64' }}>addy@arch</div>
          <div style={{ color: 'rgba(0, 255, 100, 0.2)' }}>─────────────</div>
          <div className="grid grid-cols-[60px_1fr] gap-y-0.5 mt-1">
            <span style={{ color: 'rgba(0, 255, 100, 0.4)' }}>os</span>
            <span>: arch linux</span>
            <span style={{ color: 'rgba(0, 255, 100, 0.4)' }}>role</span>
            <span>: teenage engineer</span>
            <span style={{ color: 'rgba(0, 255, 100, 0.4)' }}>focus</span>
            <span>: ml · systems · web</span>
            <span style={{ color: 'rgba(0, 255, 100, 0.4)' }}>editor</span>
            <span>: neovim btw</span>
            <span style={{ color: 'rgba(0, 255, 100, 0.4)' }}>shell</span>
            <span>: zsh + starship</span>
            <span style={{ color: 'rgba(0, 255, 100, 0.4)' }}>uptime</span>
            <span>: 17 years</span>
          </div>
        </div>
      </div>
      <div className="mt-3" style={{ color: 'rgba(0, 255, 100, 0.2)' }}>
        ───────────────────
      </div>
      <div className="mt-2">
        <span style={{ color: 'rgba(0, 255, 100, 0.4)' }}>$ cat motto.txt</span>
        <br />
        <span style={{ color: '#e8c46a' }}>&quot;ship fast, break prod, fix it at 2am&quot;</span>
      </div>
    </div>
  )
}
