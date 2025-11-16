import { chakra, shouldForwardProp } from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'

const createMotionComponent = (Component: any) => {
  return chakra(Component, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
  })
}

export const MotionBox = createMotionComponent(motion.div)
export const MotionFlex = createMotionComponent(motion.div)
export const MotionHeading = createMotionComponent(motion.h1)
export const MotionText = createMotionComponent(motion.p)

