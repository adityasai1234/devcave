'use client'

import { Container, Box, Heading, Text, VStack, HStack, Link } from '@chakra-ui/react'
import { MotionBox } from '@/lib/motion'
import ContactForm from '@/components/ui/ContactForm'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function ContactPage() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <Box as="main" py={24}>
      <Container maxW="1200px" px={{ base: 4, md: 8 }}>
        <VStack spacing={12} align="stretch">
          <MotionBox
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            textAlign="center"
          >
            <Heading
              size="2xl"
              mb={4}
              fontFamily="mono"
              textTransform="uppercase"
              letterSpacing="0.2em"
            >
              &gt; Get In Touch
            </Heading>
            <Text
              fontSize="sm"
              color="text.muted"
              maxW="600px"
              mx="auto"
              fontFamily="mono"
            >
              &gt; Let's connect and build something amazing together
              <br />
              &gt; Always open to interesting conversations and collaboration
            </Text>
          </MotionBox>

          <ContactForm />

          <MotionBox
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={prefersReducedMotion ? {} : { opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            textAlign="center"
            pt={8}
          >
            <Text mb={4} color="text.muted" fontFamily="mono" fontSize="sm">
              &gt; Or reach out directly:
            </Text>
            <HStack spacing={6} justify="center" flexWrap="wrap" fontFamily="mono" fontSize="sm">
              <Link
                href="mailto:adityasai3230@gmail.com"
                borderBottom="1px solid"
                borderColor="black"
                _dark={{ borderColor: 'white' }}
                _hover={{ textDecoration: 'none' }}
              >
                [EMAIL]
              </Link>
              <Link
                href="https://github.com/adityasai1234"
                isExternal
                borderBottom="1px solid"
                borderColor="black"
                _dark={{ borderColor: 'white' }}
                _hover={{ textDecoration: 'none' }}
              >
                [GITHUB]
              </Link>
            </HStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  )
}
