export const asciiArtStyles: string[] = [
  // Sunday - ANSI Shadow
  `░█████╗░
██╔══██╗
██████╔╝
██╔══██╗
██║  ██║
╚═╝  ╚═╝`,

  // Monday - Block
  ` █████  
██   ██ 
███████ 
██   ██ 
██   ██ `,

  // Tuesday - Doom style
  ` ______  
/\\  _  \\ 
\\ \\ \\_\\ \\
 \\ \\  __ \\
  \\ \\ \\/\\ \\
   \\ \\_/\\_\\
    \\/_/\\/_/`,

  // Wednesday - Slant
  `    ___   
   /   |  
  / /| |  
 / ___ | 
/_/  |_|`,

  // Thursday - 3D
  `  ___    
 /\\  \\   
/::\\  \\  
/:/\\:\\  \\
\\:\\~\\:\\  \\
 \\:\\ \\:\\__\\
  \\:\\/:/  /
   \\::/__/ 
    \\__\\  `,

  // Friday - Cyberlarge
  `  _____ 
 /  _  \\
/  /_\\  \\
/    |    \\
\\____|__  /
        \\/ `,

  // Saturday - Banner3
  ` .d8888b.
d88P  Y88b
888    888
888    
888    
888    888
Y88b  d88P
 "Y8888P" `,
]

export const skillTooltips: Record<string, string> = {
  python: 'primary language, used in all ml projects',
  pytorch: 'deep learning, model training & inference',
  rust: 'systems, memory safety, blazing fast',
  'next.js': 'full-stack react framework',
  linux: 'daily driver, arch btw',
  docker: 'containerization & deployment',
  typescript: 'typed js, always',
  react: 'ui components & state',
  'ml/ai': 'the main obsession',
  websockets: 'used in crash-signal for realtime alerts',
  c: 'low level, accelerate-c project',
  neovim: 'the only editor',
}

export const skills = [
  { name: 'python', category: 'yellow' },
  { name: 'pytorch', category: 'yellow' },
  { name: 'rust', category: 'orange' },
  { name: 'next.js', category: 'cyan' },
  { name: 'linux', category: 'green' },
  { name: 'docker', category: 'green' },
  { name: 'typescript', category: 'cyan' },
  { name: 'react', category: 'cyan' },
  { name: 'ml/ai', category: 'yellow' },
  { name: 'websockets', category: 'yellow' },
  { name: 'c', category: 'orange' },
  { name: 'neovim', category: 'green' },
]
