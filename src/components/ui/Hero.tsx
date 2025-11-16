'use client'

import { Box, Container, Heading, Text, VStack, useBreakpointValue } from '@chakra-ui/react'
import { MotionBox, MotionHeading, MotionText } from '@/lib/motion'
import Button from './Button'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import NextLink from 'next/link'

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const show3D = useBreakpointValue({ base: false, md: true })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <Box
      as="section"
      minH="100vh"
      display="flex"
      alignItems="center"
      position="relative"
      pt={20}
      pb={24}
    >
      <Container maxW="1200px" px={{ base: 4, md: 8 }}>
        <MotionBox
          variants={prefersReducedMotion ? {} : containerVariants}
          initial="hidden"
          animate="visible"
          display="grid"
          gridTemplateColumns={{ base: '1fr', lg: '1fr 1fr' }}
          gap={12}
          alignItems="center"
        >
          <VStack align="start" spacing={6}>
            <MotionHeading
              variants={prefersReducedMotion ? {} : itemVariants}
              as="h1"
              fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
              fontWeight="normal"
              lineHeight="1.2"
              fontFamily="mono"
              textTransform="uppercase"
              letterSpacing="0.2em"
            >
              &gt; Yo, i&apos;m Aditya
            </MotionHeading>
            <MotionText
              variants={prefersReducedMotion ? {} : itemVariants}
              fontSize={{ base: 'sm', md: 'md' }}
              color="text.muted"
              lineHeight="1.8"
              fontFamily="mono"
            >
              &gt; A teenage software engineer
              <br />
              &gt; Building intelligent, high performance digital experiences through machine learning, application development, and modern web engineering.
            </MotionText>
            <MotionBox
              variants={prefersReducedMotion ? {} : itemVariants}
              pt={4}
            >
              <NextLink href="/projects" passHref legacyBehavior>
                <Button variant="primary" size="lg" as="a">
                  View My Work
                </Button>
              </NextLink>
            </MotionBox>
          </VStack>

          {show3D && (
            <MotionBox
              variants={prefersReducedMotion ? {} : itemVariants}
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={4}
            >
            </MotionBox>
          )}
        </MotionBox>
      </Container>
    </Box>
  )
}
