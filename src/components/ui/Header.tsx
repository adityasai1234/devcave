'use client'

import {
  Box,
  Flex,
  Heading,
  Link,
  useColorMode,
  IconButton,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons'
import { MotionBox } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { usePathname } from 'next/navigation'

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode()
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useBreakpointValue({ base: true, md: false })
  const pathname = usePathname()

  const getBreadcrumbPath = () => {
    const paths = ['HOME', 'ADITYA']
    
    if (pathname === '/') {
      return '/' + paths.join('/')
    }
    
    const pageName = pathname.slice(1).toUpperCase()
    if (pageName) {
      paths.push(pageName)
    }
    
    return '/' + paths.join('/')
  }

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <MotionBox
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg={colorMode === 'dark' ? 'bg.dark' : 'bg.light'}
      borderBottom="1px solid"
      borderColor={colorMode === 'dark' ? 'white' : 'black'}
      backdropFilter="blur(10px)"
      initial={prefersReducedMotion ? {} : { y: -100 }}
      animate={prefersReducedMotion ? {} : { y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Flex
        maxW="1200px"
        mx="auto"
        px={{ base: 4, md: 8 }}
        py={3}
        justify="space-between"
        align="center"
        minH="60px"
      >
        <NextLink href="/" passHref legacyBehavior>
          <Link 
            _hover={{ textDecoration: 'none' }}
            transition="all 0.2s"
          >
            <Text 
              fontSize="sm" 
              fontFamily="mono" 
              color="text.muted"
              letterSpacing="0.08em"
              fontWeight="normal"
              display="flex"
              alignItems="center"
              gap={1}
              _hover={{
                color: colorMode === 'dark' ? 'white' : 'black',
              }}
            >
              <Box as="span" color={colorMode === 'dark' ? 'white' : 'black'}>
                &bull;
              </Box>
              <Box as="span">
                &gt;
              </Box>
              <Box as="span" ml={1}>
                {getBreadcrumbPath()}
              </Box>
            </Text>
          </Link>
        </NextLink>

        {isMobile ? (
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              variant="ghost"
              aria-label="Navigation menu"
            />
            <MenuList>
              {navItems.map((item) => (
                <NextLink key={item.href} href={item.href} passHref legacyBehavior>
                  <MenuItem as={Link}>{item.label}</MenuItem>
                </NextLink>
              ))}
            </MenuList>
          </Menu>
        ) : (
          <Flex gap={6} align="center">
            {navItems.map((item) => (
              <NextLink key={item.href} href={item.href} passHref legacyBehavior>
                <Link
                  _hover={{ textDecoration: 'underline' }}
                  fontWeight="normal"
                  fontFamily="mono"
                  textTransform="uppercase"
                  letterSpacing="0.1em"
                  fontSize="sm"
                >
                  [{item.label}]
                </Link>
              </NextLink>
            ))}
            <IconButton
              icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
              onClick={toggleColorMode}
              aria-label="Toggle color mode"
              variant="ghost"
            />
          </Flex>
        )}
      </Flex>
    </MotionBox>
  )
}

