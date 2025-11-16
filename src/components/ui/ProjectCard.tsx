'use client'

import {
  Box,
  Heading,
  Text,
  Flex,
  Link,
  VStack,
} from '@chakra-ui/react'
import { MotionBox } from '@/lib/motion'
import NextLink from 'next/link'

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  image?: string
  link?: string
  github?: string
}

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const githubUrl = project.github || '#'

  return (
    <NextLink href={githubUrl} target="_blank" rel="noopener noreferrer" passHref legacyBehavior>
      <Link _hover={{ textDecoration: 'none' }}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          {...({ transition: { duration: 0.5, delay: index * 0.1 } } as any)}
          as="article"
          bg="white"
          _dark={{ bg: 'black', borderColor: 'white' }}
          border="1px solid"
          borderColor="black"
          overflow="hidden"
          cursor="pointer"
          _hover={{ 
            borderColor: 'black', 
            transform: 'translateY(-4px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            _dark: {
              borderColor: 'white',
              boxShadow: '0 4px 12px rgba(255, 255, 255, 0.1)',
            },
          }}
          fontFamily="mono"
        >
      <VStack align="start" p={4} spacing={3}>
        <Heading size="sm" fontFamily="mono" textTransform="uppercase" letterSpacing="0.1em" fontSize="sm">
          &gt; {project.title}
        </Heading>
        <Text color="text.muted" lineHeight="1.6" fontFamily="mono" fontSize="xs" noOfLines={3}>
          {project.description}
        </Text>
        <Flex wrap="wrap" gap={1.5}>
          {project.tags.slice(0, 4).map((tag) => (
            <Box
              key={tag}
              as="span"
              border="1px solid"
              borderColor="black"
              _dark={{ borderColor: 'white' }}
              px={1.5}
              py={0.5}
              fontSize="2xs"
              fontFamily="mono"
              textTransform="uppercase"
            >
              {tag}
            </Box>
          ))}
        </Flex>
      </VStack>
    </MotionBox>
      </Link>
    </NextLink>
  )
}

