'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDraggable } from '@/hooks/useDraggable'
import { useResizable } from '@/hooks/useResizable'

interface WindowProps {
  id: string
  title: string
  defaultPosition: { x: number; y: number }
  defaultSize: { width: number; height: number }
  zIndex: number
  isMinimized: boolean
  onClose: () => void
  onFocus: () => void
  onMinimize: () => void
  children: React.ReactNode
}

export function Window({
  id,
  title,
  defaultPosition,
  defaultSize,
  zIndex,
  isMinimized,
  onClose,
  onFocus,
  onMinimize,
  children,
}: WindowProps) {
  const { position, isDragging, dragHandlers } = useDraggable({
    initialPosition: defaultPosition,
    minY: 38,
  })

  const { size, resizeHandleProps } = useResizable({
    initialSize: defaultSize,
  })

  useEffect(() => {
    onFocus()
  }, [zIndex, onFocus])

  return (
    <AnimatePresence>
      {isMinimized ? null : (
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            width: size.width,
            height: size.height,
            zIndex,
          }}
          className="flex flex-col window-frame"
          onClick={onFocus}
        >
          <div
            {...dragHandlers}
            className={`flex items-center justify-center h-[38px] px-4 titlebar cursor-grab ${
              isDragging ? 'cursor-grabbing' : ''
            }`}
          >
            <div className="flex items-center gap-2 absolute left-4">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onClose()
                }}
                onPointerDown={(e) => e.stopPropagation()}
                className="w-3 h-3 rounded-full close-btn flex items-center justify-center"
                aria-label="Close window"
              >
                <span className="close-icon">×</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onMinimize()
                }}
                onPointerDown={(e) => e.stopPropagation()}
                className="w-3 h-3 rounded-full minimize-btn flex items-center justify-center"
                aria-label="Minimize window"
              >
                <span className="minimize-icon">−</span>
              </button>
              <button
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
                className="w-3 h-3 rounded-full maximize-btn flex items-center justify-center"
                aria-label="Maximize window"
              >
                <span className="maximize-icon">+</span>
              </button>
            </div>
            <span className="title-text">{title}</span>
          </div>

          <div className="flex-1 overflow-auto p-5 window-content">
            {children}
          </div>

          <div
            {...resizeHandleProps}
            className="absolute bottom-0 right-0 w-3 h-3 resize-handle"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
