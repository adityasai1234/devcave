'use client'

import { Container, Box, Heading, Text, SimpleGrid, VStack } from '@chakra-ui/react'
import Hero from '@/components/ui/Hero'
import ProjectCard from '@/components/ui/ProjectCard'
import { MotionBox } from '@/lib/motion'
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

export default function Home() {
  const prefersReducedMotion = useReducedMotion()
  const [featuredProjects, setFeaturedProjects] = useState<GitHubProject[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPinnedProjects = async () => {
      try {
        const response = await fetch('/api/github-pinned?username=adityasai1234')
        if (response.ok) {
          const data = await response.json()
          setFeaturedProjects((data.projects || []).slice(0, 3))
        }
      } catch (err) {
        console.error('Error fetching pinned projects:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPinnedProjects()
  }, [])

  return (
    <>
      <Hero />
      
      <Box as="section" py={24} bg="white" _dark={{ bg: 'black' }}>
        <Container maxW="1200px" px={{ base: 4, md: 8 }}>
          <VStack spacing={12} align="stretch">
            <MotionBox
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                &gt; Featured Projects
              </Heading>
              <Text 
                fontSize="sm" 
                color="text.muted" 
                maxW="600px" 
                mx="auto"
                fontFamily="mono"
              >
                &gt; A selection of projects I've worked on
                <br />
                &gt; Showcasing my skills and passion for building great software
              </Text>
            </MotionBox>

            {loading ? (
              <Text textAlign="center" fontFamily="mono" color="text.muted">
                &gt; Loading projects...
              </Text>
            ) : featuredProjects.length > 0 ? (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                {featuredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </SimpleGrid>
            ) : (
              <Text textAlign="center" fontFamily="mono" color="text.muted">
                &gt; No projects found
              </Text>
            )}
          </VStack>
        </Container>
      </Box>
    </>
  )
}

