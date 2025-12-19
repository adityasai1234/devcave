'use client'

import React from 'react'
import { Box, Container, Heading, VStack } from '@chakra-ui/react'
import SkillGlobe from '@/components/ui/SkillGlobe'
import { MotionBox } from '@/lib/motion'

export default function SkillsPage() {
  return (
    <Box as="main" pt={24} pb={12} minH="100vh">
      <Container maxW="1200px" h="full">
        <VStack spacing={8} h="full" align="stretch">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            {...({ transition: { duration: 0.5 } } as any)}
          >
            <Heading
              as="h1"
              size="xl"
              fontFamily="mono"
              textTransform="uppercase"
              letterSpacing="0.2em"
              mb={8}
            >
              &gt; WHAT I WORK WITH
            </Heading>
          </MotionBox>

          <Box 
            h="600px" 
            w="full" 
            position="relative"
            bg="black" 
            rounded="xl" 
            overflow="hidden"
            border="1px solid"
            borderColor="whiteAlpha.200"
          >
            <SkillGlobe />
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}
