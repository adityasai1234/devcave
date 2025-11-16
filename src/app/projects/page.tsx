'use client'

import { Container, Box, Heading, Text, SimpleGrid, VStack } from '@chakra-ui/react'
import { MotionBox } from '@/lib/motion'
import ProjectCard from '@/components/ui/ProjectCard'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useEffect, useState } from 'react'

interface GitHubProject {
  id: number
  title: string
  description: string
  tags: string[]
  github: string
  link?: string
  stars?: number
  forks?: number
}

export default function ProjectsPage() {
  const prefersReducedMotion = useReducedMotion()
  const [projects, setProjects] = useState<GitHubProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPinnedProjects = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/github-pinned?username=adityasai1234')

        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }

        const data = await response.json()
        setProjects(data.projects || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects')
        console.error('Error fetching pinned projects:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPinnedProjects()
  }, [])

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
              &gt; My Projects
            </Heading>
            <Text 
              fontSize="sm" 
              color="text.muted" 
              maxW="600px" 
              mx="auto"
              fontFamily="mono"
            >
              &gt; Explore my work and see what I've been building
            </Text>
          </MotionBox>

          {loading && (
            <Text textAlign="center" fontFamily="mono" color="text.muted">
              &gt; Loading projects...
            </Text>
          )}

          {error && (
            <Text textAlign="center" fontFamily="mono" color="red.500">
              &gt; Error: {error}
            </Text>
          )}

          {!loading && !error && projects.length === 0 && (
            <Text textAlign="center" fontFamily="mono" color="text.muted">
              &gt; No pinned projects found
            </Text>
          )}

          {!loading && !error && projects.length > 0 && (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>
    </Box>
  )
}

