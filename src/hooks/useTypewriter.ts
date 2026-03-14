import { useState, useEffect, useCallback, useRef } from 'react'

interface TypewriterOptions {
  text: string
  delay?: number
  onComplete?: () => void
}

interface UseTypewriterReturn {
  displayedText: string
  isComplete: boolean
  reset: () => void
}

export function useTypewriter({ text, delay = 55, onComplete }: TypewriterOptions): UseTypewriterReturn {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const indexRef = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const reset = useCallback(() => {
    setDisplayedText('')
    setIsComplete(false)
    indexRef.current = 0
  }, [])

  useEffect(() => {
    if (isComplete) return

    const type = () => {
      if (indexRef.current < text.length) {
        setDisplayedText(text.slice(0, indexRef.current + 1))
        indexRef.current += 1
        timeoutRef.current = setTimeout(type, delay)
      } else {
        setIsComplete(true)
        onComplete?.()
      }
    }

    timeoutRef.current = setTimeout(type, delay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [text, delay, isComplete, onComplete])

  return { displayedText, isComplete, reset }
}

interface SequenceItem {
  type: 'input' | 'output'
  content: string
}

interface UseTypewriterSequenceOptions {
  sequence: SequenceItem[]
  initialDelay?: number
  outputDelay?: number
  charDelay?: number
}

interface UseTypewriterSequenceReturn {
  lines: SequenceItem[]
  currentIndex: number
  isComplete: boolean
}

export function useTypewriterSequence({
  sequence,
  initialDelay = 600,
  outputDelay = 400,
  charDelay = 55,
}: UseTypewriterSequenceOptions): UseTypewriterSequenceReturn {
  const [lines, setLines] = useState<SequenceItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null

    const runSequence = async () => {
      await new Promise((resolve) => setTimeout(resolve, initialDelay))

      for (let i = 0; i < sequence.length; i++) {
        const item = sequence[i]

        if (item.type === 'input') {
          let currentText = ''
          for (const char of item.content) {
            currentText += char
            setLines((prev) => {
              const newLines = [...prev]
              if (newLines[i]) {
                newLines[i] = { ...newLines[i], content: currentText }
              } else {
                newLines[i] = { type: 'input', content: currentText }
              }
              return newLines
            })
            await new Promise((resolve) => setTimeout(resolve, charDelay))
          }
          await new Promise((resolve) => setTimeout(resolve, outputDelay))
        } else {
          setLines((prev) => {
            const newLines = [...prev]
            newLines[i] = { type: 'output', content: item.content }
            return newLines
          })
          await new Promise((resolve) => setTimeout(resolve, outputDelay))
        }

        setCurrentIndex(i + 1)
      }

      setIsComplete(true)
    }

    runSequence()

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [sequence, initialDelay, outputDelay, charDelay])

  return { lines, currentIndex, isComplete }
}
