'use client'

import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { chakra, shouldForwardProp } from '@chakra-ui/react'
import { isValidMotionProp } from 'framer-motion'

const MotionButton = chakra(motion.button, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

interface CustomButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary'
}

export default function Button({ children, variant = 'primary', ...props }: CustomButtonProps) {
  return (
    <MotionButton
      as={ChakraButton}
      variant={variant}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </MotionButton>
  )
}

