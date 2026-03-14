'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface TerminalLine {
  type: 'input' | 'output'
  content: React.ReactNode
}

interface TerminalWindowProps {
  onFocusWindow: (id: string) => void
}

export function TerminalWindow({ onFocusWindow }: TerminalWindowProps) {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [input, setInput] = useState('')
  const [currentCommand, setCurrentCommand] = useState('')
  const [showInput, setShowInput] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sequence = [
      { cmd: 'whoami', output: 'aditya — teenage engineer & ml enthusiast' },
      { cmd: 'cat links.txt', output: 'links' },
      { cmd: 'echo $STATUS', output: 'open to collabs & internships ✓' },
      { cmd: 'ls ./ml-interests/', output: 'ml_dir' },
    ]

    let lineIndex = 0
    let charIndex = 0

    const typeCommand = async () => {
      if (lineIndex >= sequence.length) {
        setShowInput(true)
        return
      }

      const current = sequence[lineIndex]

      while (charIndex < current.cmd.length) {
        setCurrentCommand(current.cmd.slice(0, charIndex + 1))
        charIndex++
        await new Promise((r) => setTimeout(r, 55))
      }

      await new Promise((r) => setTimeout(r, 400))

      let output: React.ReactNode
      switch (current.output) {
        case 'links':
          output = (
            <span>
              <a
                href="https://github.com/adityasai1234"
                target="_blank"
                rel="noopener noreferrer"
                className="terminal-link"
              >
                github
              </a>
              {' · '}
              <span className="cyan">twitter</span>
              {' · '}
              <span className="cyan">mail</span>
            </span>
          )
          break
        case 'open to collabs & internships ✓':
          output = <span className="yellow">open to collabs & internships ✓</span>
          break
        case 'ml_dir':
          output = (
            <span>
              <span className="muted">reinforcement-learning/</span>
              <br />
              <span className="muted">computer-vision/</span>
              <br />
              <span className="muted">llm-finetuning/</span>
            </span>
          )
          break
        default:
          output = <span className="green">{current.output}</span>
      }

      setLines((prev) => [
        ...prev,
        { type: 'input', content: '$ ' + current.cmd },
        { type: 'output', content: output },
      ])

      setCurrentCommand('')
      lineIndex++
      charIndex = 0

      setTimeout(typeCommand, 200)
    }

    setTimeout(typeCommand, 600)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return

    const cmd = input.trim().toLowerCase()
    let output: React.ReactNode = ''

    switch (cmd) {
      case 'help':
        output = (
          <span>
            <span className="green">whoami</span> ·{' '}
            <span className="green">ls</span> ·{' '}
            <span className="green">cat</span> ·{' '}
            <span className="green">clear</span> ·{' '}
            <span className="green">open</span> ·{' '}
            <span className="green">neofetch</span> ·{' '}
            <span className="green">uname -a</span>
          </span>
        )
        break
      case 'clear':
        setLines([])
        setInput('')
        return
      case 'open about':
        onFocusWindow('about')
        output = <span className="green">opening about...</span>
        break
      case 'open projects':
        onFocusWindow('projects')
        output = <span className="green">opening projects...</span>
        break
      case 'open skills':
        onFocusWindow('skills')
        output = <span className="green">opening skills...</span>
        break
      case 'open contact':
        onFocusWindow('contact')
        output = <span className="green">opening contact...</span>
        break
      case 'neofetch':
        output = (
          <span>
            <span className="cyan">addy</span>
            <span className="muted">@</span>
            <span className="green">arch</span>
            <br />
            <span className="muted">─────────────────</span>
            <br />
            <span className="cyan">os</span>{' '}
            <span className="muted">:</span>{' '}
            <span className="text">arch linux</span>
            <br />
            <span className="cyan">age</span>{' '}
            <span className="muted">:</span>{' '}
            <span className="text">13 years young</span>
          </span>
        )
        break
      case 'uname -a':
        output = (
          <span className="text">
            Linux addy-pc 6.x.x-arch1 #1 SMP PREEMPT x86_64 GNU/Linux
          </span>
        )
        break
      case '':
        break
      default:
        output = (
          <span>
            <span className="red">command not found: </span>
            {cmd}
          </span>
        )
    }

    setLines((prev): TerminalLine[] => [
      ...prev,
      { type: 'input', content: `$ ${input}` },
      ...(output ? [{ type: 'output' as const, content: output }] : []),
    ])
    setInput('')
  }

  return (
    <div ref={terminalRef} className="terminal-window">
      {lines.map((line, i) => (
        <div key={i} className="terminal-line">
          {line.content}
        </div>
      ))}
      {showInput ? (
        <div className="terminal-input-line">
          <span className="cyan">addy@arch</span>
          <span className="muted">:</span>
          <span className="yellow">~</span>
          <span className="muted">$ </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="terminal-input"
            autoFocus
          />
          {cursorVisible && <span className="cursor">█</span>}
        </div>
      ) : (
        <div className="terminal-input-line">
          <span className="cyan">addy@arch</span>
          <span className="muted">:</span>
          <span className="yellow">~</span>
          <span className="muted">$ </span>
          <span>{currentCommand}</span>
          {cursorVisible && <span className="cursor">█</span>}
        </div>
      )}
    </div>
  )
}
