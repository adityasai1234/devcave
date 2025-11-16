'use client'

import { Box, Flex, Text, Link } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function Footer() {
  return (
    <Box
      as="footer"
      borderTop="1px solid"
      borderColor="black"
      _dark={{ borderColor: 'white' }}
      py={8}
      mt={24}
      fontFamily="mono"
    >
      <Flex
        maxW="1200px"
        mx="auto"
        px={{ base: 4, md: 8 }}
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align="center"
        gap={4}
      >
        <Text fontSize="xs" color="text.muted" fontFamily="mono">
          &gt; © {new Date().getFullYear()} Portfolio
        </Text>
        <Flex gap={6} fontSize="xs" fontFamily="mono">
          <Link
            href="https://github.com/adityasai1234"
            isExternal
            color="text.muted"
            borderBottom="1px solid"
            borderColor="black"
            _dark={{ borderColor: 'white' }}
            _hover={{ textDecoration: 'none' }}
          >
            [GITHUB]
          </Link>
          <NextLink href="/contact" passHref legacyBehavior>
            <Link
              color="text.muted"
              borderBottom="1px solid"
              borderColor="black"
              _dark={{ borderColor: 'white' }}
              _hover={{ textDecoration: 'none' }}
            >
              [CONTACT]
            </Link>
          </NextLink>
        </Flex>
      </Flex>
    </Box>
  )
}

