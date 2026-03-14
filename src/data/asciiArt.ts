export const asciiArtStyles: string[] = [
  // Style 1
  `___  
 / _ \\ 
/ /_\\ \\
|  _  |
| | | |
\\_| |_/`,

  // Style 2
  `____ 
 /    |
|  o  |
|     |
|  _  |
|  |  |
|__|__|`,

  // Style 3
  `▞▀▖
▙▄▌
▌ ▌
▘ ▘`,

  // Style 4 - SSS
  `.S_SSSs    
.SS~SSSSS   
S%S   SSSS  
S%S    S%S  
S%S SSSS%S  
S&S  SSS%S  
S&S    S&S  
S&S    S&S  
S*S    S&S  
S*S    S*S  
S*S    S*S  
SSS    S*S  
       SP   
       Y`,
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
