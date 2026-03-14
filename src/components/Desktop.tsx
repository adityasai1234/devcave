'use client'

import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Topbar } from '@/components/Topbar'
import { Dock } from '@/components/Dock'
import { Window } from '@/components/Window'
import { SkillsRain } from '@/components/SkillsRain'
import { useWindowManager, WindowState } from '@/hooks/useWindowManager'
import { AboutWindow } from '@/components/windows/AboutWindow'
import { ProjectsWindow } from '@/components/windows/ProjectsWindow'
import { SkillsWindow } from '@/components/windows/SkillsWindow'
import { TerminalWindow } from '@/components/windows/TerminalWindow'
import { ContactWindow } from '@/components/windows/ContactWindow'

const windowConfigs = {
  about: {
    title: 'about.sh',
    defaultPosition: { x: 72, y: 44 },
    defaultSize: { width: 340, height: 280 },
    component: AboutWindow,
  },
  projects: {
    title: '~/projects',
    defaultPosition: { x: 430, y: 44 },
    defaultSize: { width: 330, height: 320 },
    component: ProjectsWindow,
  },
  skills: {
    title: 'skills.cfg',
    defaultPosition: { x: 72, y: 330 },
    defaultSize: { width: 280, height: 260 },
    component: SkillsWindow,
  },
  terminal: {
    title: 'kitty — zsh',
    defaultPosition: { x: 380, y: 330 },
    defaultSize: { width: 310, height: 220 },
    component: TerminalWindow,
  },
  contact: {
    title: 'contact.sh',
    defaultPosition: { x: 200, y: 160 },
    defaultSize: { width: 260, height: 200 },
    component: ContactWindow,
  },
}

export function Desktop() {
  const [skillsRainOpen, setSkillsRainOpen] = useState(false)
  const {
    windows,
    focusWindow,
    closeWindow,
    minimizeWindow,
    openWindow,
    restoreWindow,
  } = useWindowManager()

  const handleFocusTerminal = (windowId: string) => {
    focusWindow(windowId)
  }

  const handleOpenSkillsRain = () => {
    setSkillsRainOpen(true)
  }

  const getWindowComponent = (id: string) => {
    switch (id) {
      case 'about':
        return <AboutWindow />
      case 'projects':
        return <ProjectsWindow />
      case 'skills':
        return <SkillsWindow />
      case 'terminal':
        return <TerminalWindow onFocusWindow={handleFocusTerminal} onOpenSkillsRain={handleOpenSkillsRain} />
      case 'contact':
        return <ContactWindow />
      default:
        return null
    }
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-bg">
      <Topbar />

      <main className="pt-[26px] h-full pb-14 md:pb-0">
        <AnimatePresence>
          {windows
            .filter((w) => !w.isHidden)
            .map((win) => {
              const config = windowConfigs[win.id as keyof typeof windowConfigs]
              if (!config) return null

              return (
                <Window
                  key={win.id}
                  id={win.id}
                  title={config.title}
                  defaultPosition={config.defaultPosition}
                  defaultSize={config.defaultSize}
                  zIndex={win.zIndex}
                  isMinimized={win.isMinimized}
                  onClose={() => closeWindow(win.id)}
                  onFocus={() => focusWindow(win.id)}
                  onMinimize={() => minimizeWindow(win.id)}
                >
                  {getWindowComponent(win.id)}
                </Window>
              )
            })}
        </AnimatePresence>
      </main>

      <Dock
        windows={windows}
        onOpenWindow={openWindow}
        onRestoreWindow={restoreWindow}
      />

      <SkillsRain isOpen={skillsRainOpen} onClose={() => setSkillsRainOpen(false)} />
    </div>
  )
}
