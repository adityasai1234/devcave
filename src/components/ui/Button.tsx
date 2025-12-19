'use client'

import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React from 'react'

const MotionButton = motion(ChakraButton as any)

interface CustomButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
}

export default function Button({ children, variant = 'primary', ...props }: CustomButtonProps) {
  return (
    <MotionButton
      variant={variant}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...({ transition: { type: 'spring', stiffness: 400, damping: 17 } } as any)}
      {...props}
    >
      {children}
    </MotionButton>
  )
}
