'use client'

import React from 'react'

const asciiArt = `░█████╗░
██╔══██╗
██████╔╝
██╔══██╗
██║  ██║
╚═╝  ╚═╝`

export function AboutWindow() {
  return (
    <div className="about-window">
      <div className="about-columns">
        <pre className="ascii-art">{asciiArt}</pre>
        <div className="neofetch">
          <div className="neofetch-header">
            <span className="cyan">addy</span>
            <span className="muted">@</span>
            <span className="green">arch</span>
          </div>
          <div className="muted">──────────────</div>
          <div className="neofetch-row">
            <span className="cyan">os</span>
            <span className="muted">:</span>
            <span className="text">arch linux</span>
          </div>
          <div className="neofetch-row">
            <span className="cyan">age</span>
            <span className="muted">:</span>
            <span className="text">13 years young</span>
          </div>
          <div className="neofetch-row">
            <span className="cyan">role</span>
            <span className="muted">:</span>
            <span className="text">teenage engineer</span>
          </div>
          <div className="neofetch-row">
            <span className="cyan">focus</span>
            <span className="muted">:</span>
            <span className="text">ml · systems · web</span>
          </div>
          <div className="neofetch-row">
            <span className="cyan">editor</span>
            <span className="muted">:</span>
            <span className="text">neovim btw</span>
          </div>
          <div className="neofetch-row">
            <span className="cyan">shell</span>
            <span className="muted">:</span>
            <span className="text">zsh + starship</span>
          </div>
          <div className="neofetch-row">
            <span className="cyan">uptime</span>
            <span className="muted">:</span>
            <span className="text">13 years</span>
          </div>
        </div>
      </div>
      <div className="divider" />
      <div className="about-bottom">
        <div className="command-line">
          <span className="muted">$ </span>
          <span className="text">cat motto.txt</span>
        </div>
        <div className="motto">
          &quot;ship fast, break prod, fix it at 2am&quot;
        </div>
        <div className="command-line">
          <span className="muted">$ </span>
          <span className="text">cat interests.txt</span>
        </div>
        <div className="interest">
          <span className="green">▸ </span>
          <span className="text">machine learning & deep learning</span>
        </div>
        <div className="interest">
          <span className="green">▸ </span>
          <span className="text">systems programming</span>
        </div>
        <div className="interest">
          <span className="green">▸ </span>
          <span className="text">building things that matter</span>
        </div>
      </div>
    </div>
  )
}
