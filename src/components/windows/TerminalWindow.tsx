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
  const [isTyping, setIsTyping] = useState(true)
  const [currentCommand, setCurrentCommand] = useState('')
  const terminalRef = useRef<HTMLDivElement>(null)

  const sequence = [
    { cmd: 'whoami', output: 'aditya — teenage engineer' },
    { cmd: 'cat links.txt', output: null, isLinks: true },
    { cmd: 'echo $STATUS', output: 'open to collabs ✓', isStatus: true },
  ]

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let lineIndex = 0
    let charIndex = 0

    const typeCommand = () => {
      if (lineIndex >= sequence.length) {
        setIsTyping(false)
        return
      }

      const current = sequence[lineIndex]

      if (charIndex === 0) {
        setCurrentCommand('')
      }

      if (charIndex < current.cmd.length) {
        setCurrentCommand(current.cmd.slice(0, charIndex + 1))
        charIndex++
        setTimeout(typeCommand, 80)
      } else {
        setTimeout(() => {
          if (current.isLinks) {
            setLines((prev) => [
              ...prev,
              { type: 'input', content: `$${current.cmd}` },
              {
                type: 'output',
                content: (
                  <span>
                    <a
                      href="https://github.com/adityasai1234"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline mx-1"
                      style={{ color: 'rgba(0, 200, 255, 0.85)' }}
                    >
                      github
                    </a>
                    ·{' '}
                    <a
                      href="https://twitter.com/vectorspace21"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline mx-1"
                      style={{ color: 'rgba(0, 200, 255, 0.85)' }}
                    >
                      twitter
                    </a>
                    ·{' '}
                    <a
                      href="mailto:adityasai3230@gmail.com"
                      className="hover:underline mx-1"
                      style={{ color: 'rgba(0, 200, 255, 0.85)' }}
                    >
                      mail
                    </a>
                  </span>
                ),
              },
            ])
          } else if (current.isStatus) {
            setLines((prev) => [
              ...prev,
              { type: 'input', content: `$${current.cmd}` },
              {
                type: 'output',
                content: (
                  <span style={{ color: '#e8c46a' }}>{current.output}</span>
                ),
              },
            ])
          } else {
            setLines((prev) => [
              ...prev,
              { type: 'input' as const, content: current.cmd },
              { type: 'output' as const, content: current.output },
            ])
          }

          lineIndex++
          charIndex = 0
          setCurrentCommand('')
          setTimeout(typeCommand, 300)
        }, 200)
      }
    }

    typeCommand()
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
            available commands:{' '}
            <span style={{ color: '#00ff64' }}>help</span>,{' '}
            <span style={{ color: '#00ff64' }}>clear</span>,{' '}
            <span style={{ color: '#00ff64' }}>open projects</span>,{' '}
            <span style={{ color: '#00ff64' }}>open about</span>,{' '}
            <span style={{ color: '#00ff64' }}>open skills</span>,{' '}
            <span style={{ color: '#00ff64' }}>open contact</span>
          </span>
        )
        break
      case 'clear':
        setLines([])
        setInput('')
        return
      case 'open projects':
        onFocusWindow('projects')
        output = <span style={{ color: '#00ff64' }}>opening projects...</span>
        break
      case 'open about':
        onFocusWindow('about')
        output = <span style={{ color: '#00ff64' }}>opening about...</span>
        break
      case 'open skills':
        onFocusWindow('skills')
        output = <span style={{ color: '#00ff64' }}>opening skills...</span>
        break
      case 'open contact':
        onFocusWindow('contact')
        output = <span style={{ color: '#00ff64' }}>opening contact...</span>
        break
      case '':
        break
      default:
        output = (
          <span>
            command not found:{' '}
            <span style={{ color: '#ff5f57' }}>{cmd}</span>
          </span>
        )
    }

    setLines((prev): TerminalLine[] => [
      ...prev,
      { type: 'input' as const, content: `$ ${input}` },
      ...(output ? [{ type: 'output' as const, content: output }] : []),
    ])
    setInput('')
  }

  return (
    <div
      ref={terminalRef}
      className="p-2 text-xs h-full overflow-auto font-mono"
      style={{ color: '#e8e4dc', backgroundColor: '#0a0e0a' }}
    >
      {lines.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {line.content}
        </div>
      ))}
      {isTyping ? (
        <div>
          <span style={{ color: 'rgba(0, 255, 100, 0.4)' }}>$</span>{' '}
          <span>{currentCommand}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            style={{ color: '#00ff64' }}
          >
            █
          </motion.span>
        </div>
      ) : (
        <div className="flex items-center">
          <span style={{ color: 'rgba(0, 255, 100, 0.4)' }}>$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent border-none outline-none ml-1"
            style={{ color: '#e8e4dc' }}
            autoFocus
          />
        </div>
      )}
    </div>
  )
}
