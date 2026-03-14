'use client'

import React from 'react'

export function ContactWindow() {
  return (
    <div className="p-3 text-xs" style={{ color: '#e8e4dc' }}>
      <div className="mb-2" style={{ color: 'rgba(0, 255, 100, 0.4)' }}>
        $ cat contact.txt
      </div>
      <div style={{ color: 'rgba(0, 255, 100, 0.2)' }}>
        ──────────────────────
      </div>
      <div className="space-y-1 mt-2">
        <div className="flex items-center gap-2">
          <span style={{ color: 'rgba(0, 255, 100, 0.4)' }}>github</span>
          <span>→</span>
          <a
            href="https://github.com/adityasai1234"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: 'rgba(0, 200, 255, 0.85)' }}
          >
            github.com/adityasai1234
          </a>
        </div>
        <div className="flex items-center gap-2">
          <span style={{ color: 'rgba(0, 255, 100, 0.4)' }}>twitter</span>
          <span>→</span>
          <a
            href="https://twitter.com/vectorspace21"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: 'rgba(0, 200, 255, 0.85)' }}
          >
            @vectorspace21
          </a>
        </div>
        <div className="flex items-center gap-2">
          <span style={{ color: 'rgba(0, 255, 100, 0.4)' }}>email</span>
          <span>→</span>
          <a
            href="mailto:adityasai3230@gmail.com"
            className="hover:underline"
            style={{ color: 'rgba(0, 200, 255, 0.85)' }}
          >
            adityasai3230@gmail.com
          </a>
        </div>
        <div className="flex items-center gap-2">
          <span style={{ color: 'rgba(0, 255, 100, 0.4)' }}>site</span>
          <span>→</span>
          <a
            href="https://addyhacks.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
            style={{ color: 'rgba(0, 200, 255, 0.85)' }}
          >
            addyhacks.xyz
          </a>
        </div>
      </div>
      <div style={{ color: 'rgba(0, 255, 100, 0.2)' }}>
        ──────────────────────
      </div>
      <div className="mt-2" style={{ color: '#00ff64' }}>
        $ echo &quot;open to work & collabs&quot;
      </div>
    </div>
  )
}
