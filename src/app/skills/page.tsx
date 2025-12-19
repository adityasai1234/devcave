'use client'

import React from 'react'
import { Box, Container, Heading, VStack } from '@chakra-ui/react'
import SkillGlobe from '@/components/ui/SkillGlobe'
import { MotionBox } from '@/lib/motion'

export default function SkillsPage() {
  return (
    <Box as="main" h="100vh" w="100vw" bg="black" overflow="hidden" display="flex" flexDirection="column">
      <Container maxW="1400px" h="full" display="flex" flexDirection="column" pt={24} pb={4}>
        <VStack spacing={0} h="full" align="stretch">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            {...({ transition: { duration: 0.5 } } as any)}
            flexShrink={0}
            mb={6}
          >
            <Heading
              as="h1"
              size="xl"
              fontFamily="mono"
              textTransform="uppercase"
              letterSpacing="0.2em"
              color="white"
            >
              &gt; WHAT I WORK WITH
            </Heading>
          </MotionBox>

          <Box 
            flex={1}
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
