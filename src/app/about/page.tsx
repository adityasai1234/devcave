'use client'

import { Container, Box, Heading, Text, VStack, HStack, SimpleGrid } from '@chakra-ui/react'
import { MotionBox } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useEffect, useState } from 'react'

interface GitHubStats {
  public_repos: number
  followers: number
  following: number
  total_stars: number
}

export default function AboutPage() {
  const prefersReducedMotion = useReducedMotion()
  const [stats, setStats] = useState<GitHubStats | null>(null)

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const userResponse = await fetch('https://api.github.com/users/adityasai1234')
        const userData = await userResponse.json()

        const reposResponse = await fetch('https://api.github.com/users/adityasai1234/repos')
        const repos = await reposResponse.json()
        const totalStars = repos.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0)

        setStats({
          public_repos: userData.public_repos || 0,
          followers: userData.followers || 0,
          following: userData.following || 0,
          total_stars: totalStars,
        })
      } catch (error) {
        console.error('Error fetching GitHub stats:', error)
      }
    }

    fetchGitHubStats()
  }, [])

  const skills = ['JavaScript', 'Python', 'Swift', 'Kotlin', 'React', 'Node.js', 'CSS', 'Git', 'Bash', 'Docker']

  const funFacts = [
    'I drink way too much Monster Energy',
    'I\'ve been coding since I was 8 years old',
    'I prefer coding at home over socializing',
    'I\'m always learning something new',
    'I\'m an open source enthusiast',
  ]

  return (
    <Box as="main" py={24}>
      <Container maxW="1200px" px={{ base: 4, md: 8 }}>
        <VStack spacing={16} align="stretch">
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
              &gt; About Me
            </Heading>
            <Text fontSize="sm" color="text.muted" maxW="600px" mx="auto" fontFamily="mono">
              &gt; Get to know the person behind the code
            </Text>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} alignItems="start">
            <VStack align="start" spacing={8}>
              <MotionBox
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                width="100%"
              >
                <Heading
                  size="md"
                  mb={4}
                  fontFamily="mono"
                  textTransform="uppercase"
                  letterSpacing="0.1em"
                >
                  &gt; Hey there!
                </Heading>
                <VStack align="start" spacing={4} color="text.primary" _dark={{ color: 'text.light' }} fontFamily="mono" fontSize="sm" lineHeight="1.8">
                  <Text>
                    &gt; I'm Aditya, a passionate teenage software engineer who loves
                    <br />
                    &gt; turning ideas into reality through code. I'm constantly learning
                    <br />
                    &gt; new technologies and building projects that solve real-world
                    <br />
                    &gt; problems.
                  </Text>
                  <Text>
                    &gt; When I'm not coding, you'll find me exploring the latest tech
                    <br />
                    &gt; trends, contributing to open source, or working on my next big
                    <br />
                    &gt; project. I believe in writing clean, efficient code.
                  </Text>
                </VStack>
              </MotionBox>

              <MotionBox
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                width="100%"
              >
                <Heading
                  size="md"
                  mb={4}
                  fontFamily="mono"
                  textTransform="uppercase"
                  letterSpacing="0.1em"
                >
                  &gt; What I Work With
                </Heading>
                <HStack wrap="wrap" gap={2}>
                  {skills.map((skill) => (
                    <Box
                      key={skill}
                      as="span"
                      border="1px solid"
                      borderColor="black"
                      _dark={{ borderColor: 'white' }}
                      px={3}
                      py={1}
                      fontSize="xs"
                      fontFamily="mono"
                      textTransform="uppercase"
                      cursor="pointer"
                      transition="all 0.2s"
                      _hover={{
                        bg: 'black',
                        color: 'white',
                        borderColor: 'black',
                        transform: 'translateY(-2px)',
                        _dark: {
                          bg: 'white',
                          color: 'black',
                          borderColor: 'white',
                        },
                      }}
                    >
                      {skill}
                    </Box>
                  ))}
                </HStack>
              </MotionBox>
              <MotionBox
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                width="100%"
              >
                <Heading
                  size="md"
                  mb={4}
                  fontFamily="mono"
                  textTransform="uppercase"
                  letterSpacing="0.1em"
                >
                  &gt; Fun Facts
                </Heading>
                <VStack align="start" spacing={2} fontFamily="mono" fontSize="sm" lineHeight="1.8">
                  {funFacts.map((fact, index) => (
                    <Text key={index}>
                      &gt; {index + 1}. {fact}
                    </Text>
                  ))}
                </VStack>
              </MotionBox>
            </VStack>

            <VStack spacing={8} align="stretch">
              <MotionBox
                initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                width="100%"
              >
                <Heading
                  size="md"
                  mb={4}
                  fontFamily="mono"
                  textTransform="uppercase"
                  letterSpacing="0.1em"
                  textAlign="center"
                >
                  &gt; GitHub Stats
                </Heading>

                <SimpleGrid columns={2} gap={4} mb={8}>
                  <Box
                    border="1px solid"
                    borderColor="black"
                    _dark={{ borderColor: 'white' }}
                    p={4}
                    textAlign="center"
                    fontFamily="mono"
                  >
                    <Text fontSize="2xl" fontWeight="bold">{stats?.public_repos ?? '-'}</Text>
                    <Text fontSize="xs" color="text.muted">Public Repos</Text>
                  </Box>
                  <Box
                    border="1px solid"
                    borderColor="black"
                    _dark={{ borderColor: 'white' }}
                    p={4}
                    textAlign="center"
                    fontFamily="mono"
                  >
                    <Text fontSize="2xl" fontWeight="bold">{stats?.followers ?? '-'}</Text>
                    <Text fontSize="xs" color="text.muted">Followers</Text>
                  </Box>
                  <Box
                    border="1px solid"
                    borderColor="black"
                    _dark={{ borderColor: 'white' }}
                    p={4}
                    textAlign="center"
                    fontFamily="mono"
                  >
                    <Text fontSize="2xl" fontWeight="bold">{stats?.following ?? '-'}</Text>
                    <Text fontSize="xs" color="text.muted">Following</Text>
                  </Box>
                  <Box
                    border="1px solid"
                    borderColor="black"
                    _dark={{ borderColor: 'white' }}
                    p={4}
                    textAlign="center"
                    fontFamily="mono"
                  >
                    <Text fontSize="2xl" fontWeight="bold">{stats?.total_stars ?? '-'}</Text>
                    <Text fontSize="xs" color="text.muted">Total Stars</Text>
                  </Box>
                </SimpleGrid>

                <VStack spacing={6}>
                  <Box
                    border="1px solid"
                    borderColor="black"
                    _dark={{ borderColor: 'white' }}
                    p={2}
                    width="100%"
                  >
                    <Box
                      as="img"
                      src="https://github-readme-stats.vercel.app/api?username=adityasai1234&show_icons=true&theme=default&hide_border=true&bg_color=ffffff&text_color=000000"
                      alt="GitHub Stats"
                      width="100%"
                      style={{ filter: 'grayscale(100%)' }}
                    />
                  </Box>
                  <Box
                    border="1px solid"
                    borderColor="black"
                    _dark={{ borderColor: 'white' }}
                    p={2}
                    width="100%"
                  >
                    <Box
                      as="img"
                      src="https://github-readme-stats.vercel.app/api/top-langs/?username=adityasai1234&layout=compact&theme=default&hide_border=true&bg_color=ffffff&text_color=000000"
                      alt="Top Languages"
                      width="100%"
                      style={{ filter: 'grayscale(100%)' }}
                    />
                  </Box>
                </VStack>
              </MotionBox>
            </VStack>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}
