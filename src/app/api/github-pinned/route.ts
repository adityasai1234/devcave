import { NextResponse } from 'next/server'

const cache = new Map<string, { data: any; timestamp: number }>()
const CACHE_DURATION = 60 * 60 * 1000

interface GraphQLResponse {
  data: {
    user: {
      pinnedItems: {
        nodes: Array<{
          name: string
          description: string | null
          url: string
          homepageUrl: string | null
          repositoryTopics: {
            nodes: Array<{
              topic: {
                name: string
              }
            }>
          }
          languages: {
            nodes: Array<{
              name: string
            }>
          }
          stargazerCount: number
          forkCount: number
        }>
      }
    }
  }
  errors?: Array<{ message: string }>
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json(
      { error: 'Username is required', projects: [] },
      { status: 400 }
    )
  }

  const cached = cache.get(username)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return NextResponse.json(cached.data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  }

  try {
    const query = `
      query($username: String!) {
        user(login: $username) {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
                description
                url
                homepageUrl
                repositoryTopics(first: 5) {
                  nodes {
                    topic {
                      name
                    }
                  }
                }
                languages(first: 5) {
                  nodes {
                    name
                  }
                }
                stargazerCount
                forkCount
              }
            }
          }
        }
      }
    `

    const variables = { username }

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN || ''}`,
        'User-Agent': 'GitHub-Pinned-Repos',
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 3600 },
    })

    if (response.status === 401 || response.status === 403) {
      return await fetchFromRestAPI(username)
    }

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`GitHub API returned ${response.status}: ${errorText}`)
    }

    const result: GraphQLResponse = await response.json()

    if (result.errors) {
      return await fetchFromRestAPI(username)
    }

    if (!result.data?.user) {
      return NextResponse.json(
        { error: 'User not found', projects: [] },
        { status: 404 }
      )
    }

    let projects = result.data.user.pinnedItems.nodes
      .filter((repo) => {
        const name = repo.name.toLowerCase()
        const description = (repo.description || '').toLowerCase()
        return !name.includes('samurai') && !description.includes('samurai')
      })
      .map((repo, index) => ({
        id: index + 1,
        title: repo.name,
        description: repo.description || 'No description available',
        tags: [
          ...repo.languages.nodes.map((lang) => lang.name),
          ...repo.repositoryTopics.nodes.map((topic) => topic.topic.name),
        ].slice(0, 5),
        github: repo.url,
        link: repo.homepageUrl || undefined,
        stars: repo.stargazerCount,
        forks: repo.forkCount,
      }))

    const devCaveRepo = {
      id: 0,
      title: 'Dev-Cave',
      description: 'My personal portfolio website built with Next.js, TypeScript, and Chakra UI. Features a minimalist ASCII art design with 3D elements.',
      tags: ['Next.js', 'TypeScript', 'React', 'Chakra UI', 'Framer Motion'],
      github: 'https://github.com/adityasai1234/Dev-Cave',
      link: undefined,
      stars: 0,
      forks: 0,
    }

    const hasDevCave = projects.some((p: any) => p.title.toLowerCase() === 'dev-cave')
    if (!hasDevCave) {
      projects = [devCaveRepo, ...projects]
    } else {
      const devCaveIndex = projects.findIndex((p: any) => p.title.toLowerCase() === 'dev-cave')
      if (devCaveIndex > 0) {
        const [devCave] = projects.splice(devCaveIndex, 1)
        projects = [devCave, ...projects]
      }
    }

    const responseData = { projects }

    cache.set(username, { data: responseData, timestamp: Date.now() })

    return NextResponse.json(responseData, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Error fetching GitHub pinned repos:', error)
    return await fetchFromRestAPI(username)
  }
}

async function fetchFromRestAPI(username: string) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=stars&per_page=6&type=all`,
      {
        headers: {
          'User-Agent': 'GitHub-Pinned-Repos',
          'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 },
      }
    )

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`)
    }

    const repos = await response.json()

    let projects = repos
      .filter((repo: any) => {
        const name = (repo.name || '').toLowerCase()
        const description = (repo.description || '').toLowerCase()
        return !name.includes('samurai') && !description.includes('samurai')
      })
      .map((repo: any, index: number) => ({
        id: index + 1,
        title: repo.name,
        description: repo.description || 'No description available',
        tags: repo.language ? [repo.language] : [],
        github: repo.html_url,
        link: repo.homepage || undefined,
        stars: repo.stargazer_count,
        forks: repo.forks_count,
      }))

    const devCaveRepo = {
      id: 0,
      title: 'Dev-Cave',
      description: 'My personal portfolio website built with Next.js, TypeScript, and Chakra UI. Features a minimalist ASCII art design with 3D elements.',
      tags: ['Next.js', 'TypeScript', 'React', 'Chakra UI', 'Framer Motion'],
      github: 'https://github.com/adityasai1234/Dev-Cave',
      link: undefined,
      stars: 0,
      forks: 0,
    }

    const hasDevCave = projects.some((p: any) => p.title.toLowerCase() === 'dev-cave')
    if (!hasDevCave) {
      projects = [devCaveRepo, ...projects]
    } else {
      const devCaveIndex = projects.findIndex((p: any) => p.title.toLowerCase() === 'dev-cave')
      if (devCaveIndex > 0) {
        const [devCave] = projects.splice(devCaveIndex, 1)
        projects = [devCave, ...projects]
      }
    }

    return NextResponse.json(
      { projects },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    )
  } catch (error) {
    console.error('Error fetching from REST API:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch projects',
        projects: [],
      },
      { status: 500 }
    )
  }
}

