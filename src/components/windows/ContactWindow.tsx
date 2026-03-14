'use client'

import React from 'react'

export function ContactWindow() {
  return (
    <div className="contact-window">
      <div className="contact-header">
        <span className="muted">$ </span>
        <span className="text">cat contact.txt</span>
      </div>
      <div className="contact-divider">──────────────────────</div>
      <div className="contact-list">
        <div className="contact-row">
          <span className="cyan">github</span>
          <span className="muted">→</span>
          <a
            href="https://github.com/adityasai1234"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            github.com/adityasai1234
          </a>
        </div>
        <div className="contact-row">
          <span className="cyan">email</span>
          <span className="muted">→</span>
          <a href="mailto:adityasai3230@gmail.com" className="contact-link">
            adityasai3230@gmail.com
          </a>
        </div>
        <div className="contact-row">
          <span className="cyan">twitter</span>
          <span className="muted">→</span>
          <a
            href="https://twitter.com/addy"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            @addy
          </a>
        </div>
        <div className="contact-row">
          <span className="cyan">site</span>
          <span className="muted">→</span>
          <a
            href="https://addyhacks.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            addyhacks.xyz
          </a>
        </div>
      </div>
      <div className="contact-divider">──────────────────────</div>
      <div className="contact-footer">
        <span className="muted">$ </span>
        <span className="green">echo $AVAILABILITY</span>
        <div className="availability">open to internships & collabs</div>
      </div>
    </div>
  )
}
