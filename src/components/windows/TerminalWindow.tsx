'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface TerminalLine {
  type: 'input' | 'output'
  content: React.ReactNode
}

interface FileSystem {
  [key: string]: { type: 'file' | 'dir'; content?: string }
}

const fileSystem: FileSystem = {
  'about.txt': { type: 'file', content: 'I am a 13 year old developer interested in ML, systems, and web development.' },
  'projects.txt': { type: 'file', content: 'Accelerate-C, Crash-Signal, addyhacks.xyz' },
  'skills.txt': { type: 'file', content: 'Python, Rust, TypeScript, PyTorch, Linux, Docker' },
  'contact.txt': { type: 'file', content: 'github.com/adityasai1234, @addy, adityasai3230@gmail.com' },
  'motto.txt': { type: 'file', content: '"ship fast, break prod, fix it at 2am"' },
  interests: { type: 'dir', content: undefined },
  'interests/ml.txt': { type: 'file', content: 'machine learning & deep learning' },
  'interests/systems.txt': { type: 'file', content: 'systems programming' },
  'interests/web.txt': { type: 'file', content: 'building things that matter' },
  projects: { type: 'dir', content: undefined },
  'projects/accelerate-c': { type: 'dir', content: undefined },
  'projects/crash-signal': { type: 'dir', content: undefined },
  'projects/addyhacks.xyz': { type: 'dir', content: undefined },
}

interface TerminalWindowProps {
  onFocusWindow: (id: string) => void
  onOpenSkillsRain?: () => void
}

export function TerminalWindow({ onFocusWindow, onOpenSkillsRain }: TerminalWindowProps) {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [input, setInput] = useState('')
  const [currentCommand, setCurrentCommand] = useState('')
  const [showInput, setShowInput] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [currentDir, setCurrentDir] = useState('/Users/addy')
  const terminalRef = useRef<HTMLDivElement>(null)

  const getAbsolutePath = (path: string): string => {
    if (path.startsWith('/')) return path
    if (path.startsWith('~')) return path.replace('~', '/Users/addy')
    if (currentDir === '/Users/addy' && path === '.') return '/Users/addy'
    
    const base = currentDir === '/Users/addy' ? '/Users/addy' : currentDir
    if (path === '..') {
      const parts = base.split('/')
      parts.pop()
      return parts.join('/') || '/'
    }
    if (path === '.') return base
    return base === '/' ? `/${path}` : `${base}/${path}`
  }

  const listDirectory = (path: string): string[] => {
    const absPath = getAbsolutePath(path)
    const result: string[] = []
    
    Object.keys(fileSystem).forEach(key => {
      const dir = absPath === '/' ? '' : absPath
      if (key === dir) return
      
      const parentDir = key.split('/').slice(0, -1).join('/') || '/'
      if (parentDir === absPath || (absPath === '/Users/addy' && parentDir === '')) {
        const name = key.split('/').pop() || key
        if (!result.includes(name)) {
          result.push(name)
        }
      }
    })
    
    if (absPath === '/Users/addy') {
      if (!result.includes('projects')) result.push('projects')
      if (!result.includes('interests')) result.push('interests')
    }
    
    return result.sort()
  }

  const resolveFile = (path: string) => {
    const absPath = getAbsolutePath(path)
    return fileSystem[absPath] || null
  }

  const handleCommand = (cmdStr: string): React.ReactNode => {
    const parts = cmdStr.trim().split(/\s+/)
    const cmd = parts[0]
    const args = parts.slice(1)

    switch (cmd) {
      case '':
        return null

      case 'help':
        return (
          <span>
            <span className="green">Available commands:</span>
            <br />
            <span className="text">ls [path]</span> - List directory contents
            <br />
            <span className="text">cd [path]</span> - Change directory
            <br />
            <span className="text">cat [file]</span> - Display file contents
            <br />
            <span className="text">pwd</span> - Print working directory
            <br />
            <span className="text">whoami</span> - Display current user
            <br />
            <span className="text">clear</span> - Clear terminal
            <br />
            <span className="text">open [about|projects|skills|contact]</span> - Open window
            <br />
            <span className="text">neofetch</span> - System info
            <br />
            <span className="text">uname -a</span> - System name
            <br />
            <span className="text">date</span> - Display date
            <br />
            <span className="text">echo [text]</span> - Display text
            <br />
            <span className="text">skills</span> - Launch skills matrix
          </span>
        )

      case 'ls': {
        const path = args[0] || '.'
        const items = listDirectory(path)
        if (items.length === 0) {
          return <span className="muted">(empty)</span>
        }
        return (
          <span>
            {items.map((item, i) => {
              const isDir = item.endsWith('/') || (args[0] ? false : (fileSystem[getAbsolutePath(args[0] + '/' + item)]?.type === 'dir') || (currentDir === '/Users/addy' && (item === 'projects' || item === 'interests')))
              return (
                <span key={i}>
                  <span className={isDir ? 'cyan' : 'green'}>{item}{isDir ? '/' : ''}</span>
                  {i < items.length - 1 ? '  ' : ''}
                </span>
              )
            })}
          </span>
        )
      }

      case 'cd': {
        const path = args[0] || '~'
        const absPath = getAbsolutePath(path)
        
        if (path === '~' || path === '/') {
          setCurrentDir('/Users/addy')
          return null
        }
        
        if (path === '..') {
          const parts = currentDir.split('/')
          parts.pop()
          setCurrentDir(parts.join('/') || '/')
          return null
        }
        
        if (path === '.') {
          return null
        }

        const targetPath = getAbsolutePath(path)
        
        const isDir = (p: string) => {
          if (p === 'projects' || p === 'interests') return true
          return fileSystem[p]?.type === 'dir'
        }
        
        if (isDir(path) || isDir(targetPath)) {
          setCurrentDir(targetPath)
          return null
        }
        
        return <span className="red">cd: no such directory: {path}</span>
      }

      case 'cat': {
        const path = args[0]
        if (!path) return <span className="red">cat: missing file operand</span>
        
        const file = resolveFile(path)
        if (!file) return <span className="red">cat: {path}: No such file or directory</span>
        if (file.type === 'dir') return <span className="red">cat: {path}: Is a directory</span>
        
        return <span className="text">{file.content}</span>
      }

      case 'pwd':
        return <span className="cyan">{currentDir}</span>

      case 'whoami':
        return <span className="green">addy</span>

      case 'clear':
        setLines([])
        return null

      case 'open':
        const windowMap: Record<string, string> = {
          about: 'about',
          projects: 'projects',
          skills: 'skills',
          contact: 'contact',
        }
        const targetWindow = args[0]?.toLowerCase()
        if (windowMap[targetWindow]) {
          onFocusWindow(windowMap[targetWindow])
          return <span className="green">opening {targetWindow}...</span>
        }
        return <span className="red">open: usage: open [about|projects|skills|contact]</span>

      case 'neofetch':
        return (
          <span>
            <pre style={{ margin: 0, display: 'inline', color: '#00ff64' }}>
{`('-.     
  ( OO ).-. 
  / . --. / 
  | \\-.  \\  
.-'-'  |  | 
 \\| |_.'  | 
  |  .-.  | 
  |  | |  | 
  \`--' \`--' `}
            </pre>
            <span className="cyan">addy</span>
            <span className="muted">@</span>
            <span className="green">macbook</span>
            <br />
            <span className="muted">─────────────────</span>
            <br />
            <span className="cyan">os</span>{' '}
            <span className="muted">:</span>{' '}
            <span className="text">macOS Sonoma 14</span>
            <br />
            <span className="cyan">host</span>{' '}
            <span className="muted">:</span>{' '}
            <span className="text">MacBook Pro 14&quot;</span>
            <br />
            <span className="cyan">kernel</span>{' '}
            <span className="muted">:</span>{' '}
            <span className="text">Darwin 23.0.0</span>
            <br />
            <span className="cyan">shell</span>{' '}
            <span className="muted">:</span>{' '}
            <span className="text">zsh</span>
            <br />
            <span className="muted">─────────────────</span>
            <br />
            <span className="cyan">os</span>{' '}
            <span className="muted">:</span>{' '}
            <span className="text">macOS Sonoma 14</span>
            <br />
            <span className="cyan">host</span>{' '}
            <span className="muted">:</span>{' '}
            <span className="text">MacBook Pro 14&quot;</span>
            <br />
            <span className="cyan">kernel</span>{' '}
            <span className="muted">:</span>{' '}
            <span className="text">Darwin 23.0.0</span>
            <br />
            <span className="cyan">shell</span>{' '}
            <span className="muted">:</span>{' '}
            <span className="text">zsh</span>
            <br />
            <span className="cyan">resolution</span>{' '}
            <span className="muted">:</span>{' '}
            <span className="text">3024x1964</span>
          </span>
        )

      case 'uname':
        if (args[0] === '-a') {
          return <span className="text">Darwin Adityas-MacBook-Pro.local 23.0.0 Darwin Kernel Version 23.0.0 x86_64</span>
        }
        return <span className="text">Darwin</span>

      case 'date':
        return <span className="text">{new Date().toString()}</span>

      case 'echo':
        return <span className="text">{args.join(' ')}</span>

      case 'skills':
        if (onOpenSkillsRain) {
          onOpenSkillsRain()
        }
        return <span className="muted">launching skills matrix...</span>

      default:
        return <span className="red">command not found: {cmd}</span>
    }
  }

  useEffect(() => {
    const sequence = [
      { cmd: 'whoami', output: 'addy' },
      { cmd: 'pwd', output: '/Users/addy' },
      { cmd: 'ls', output: 'ls' },
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

      await new Promise((r) => setTimeout(r, 300))

      let output: React.ReactNode
      if (current.output === 'ls') {
        const items = listDirectory('.')
        output = (
          <span>
            {items.map((item, i) => (
              <span key={i}>
                <span className="cyan">{item}/</span>
                {i < items.length - 1 ? '  ' : ''}
              </span>
            ))}
          </span>
        )
      } else {
        output = <span className="green">{current.output}</span>
      }

      setLines((prev) => [
        ...prev,
        { type: 'input', content: `~${currentDir === '/Users/addy' ? '' : currentDir.replace('/Users/addy', '')}$ ${current.cmd}` },
        { type: 'output', content: output },
      ])

      setCurrentCommand('')
      lineIndex++
      charIndex = 0

      setTimeout(typeCommand, 200)
    }

    setTimeout(typeCommand, 600)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return

    const output = handleCommand(input)
    const promptDir = currentDir === '/Users/addy' ? '~' : currentDir.replace('/Users/addy', '~')

    const newLines: TerminalLine[] = [
      { type: 'input', content: `${promptDir}$ ${input}` },
    ]
    if (output) {
      newLines.push({ type: 'output', content: output })
    }
    setLines((prev) => [...prev, ...newLines])
    setInput('')
  }

  return (
    <div ref={terminalRef} className="terminal-window">
      {lines.map((line, i) => (
        <div key={i} className="terminal-line">
          {line.content}
        </div>
      ))}
      {showInput && (
        <div className="terminal-input-line">
          <span className="green">addy</span>
          <span className="muted">@</span>
          <span className="cyan">macbook</span>
          <span className="muted">:</span>
          <span className="blue">{currentDir === '/Users/addy' ? '~' : currentDir.replace('/Users/addy', '~')}</span>
          <span className="muted">$ </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            className="terminal-input"
            autoFocus
          />
          {cursorVisible && <span className="cursor">█</span>}
        </div>
      )}
    </div>
  )
}
