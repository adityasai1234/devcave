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
    minY: 26,
  })

  const { size, resizeHandleProps } = useResizable({
    initialSize: defaultSize,
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    onFocus()
  }, [zIndex])

  return (
    <AnimatePresence>
      {isMinimized ? null : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            width: size.width,
            height: size.height,
            zIndex,
          }}
          className="flex flex-col bg-surface border rounded-md overflow-hidden"
          onClick={onFocus}
        >
          <div
            {...dragHandlers}
            className={`
              flex items-center h-6 px-2 border-b cursor-grab select-none
              ${isDragging ? 'cursor-grabbing' : ''}
            `}
            style={{
              borderColor: 'rgba(0, 255, 100, 0.12)',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }}
          >
            <div className="flex items-center gap-1.5 mr-3">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onClose()
                }}
                onPointerDown={(e) => e.stopPropagation()}
                className="w-3 h-3 rounded-full bg-red hover:brightness-110 transition"
                style={{ backgroundColor: '#ff5f57' }}
                aria-label="Close window"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onMinimize()
                }}
                onPointerDown={(e) => e.stopPropagation()}
                className="w-3 h-3 rounded-full hover:brightness-110 transition"
                style={{ backgroundColor: '#febc2e' }}
                aria-label="Minimize window"
              />
              <button
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
                className="w-3 h-3 rounded-full hover:brightness-110 transition"
                style={{ backgroundColor: '#28c840' }}
                aria-label="Maximize window"
              />
            </div>
            <span
              className="text-xs truncate"
              style={{ color: 'rgba(0, 255, 100, 0.4)' }}
            >
              {title}
            </span>
          </div>

          <div className="flex-1 overflow-auto">{children}</div>

          <div
            {...resizeHandleProps}
            className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize"
            style={{
              backgroundImage:
                'linear-gradient(135deg, rgba(0,255,100,0.3) 25%, transparent 25%), linear-gradient(225deg, rgba(0,255,100,0.3) 25%, transparent 25%)',
              backgroundSize: '4px 4px',
              backgroundPosition: '0 0, 2px 0',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
