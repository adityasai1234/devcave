export interface StackItem {
  name: string
  icon: string
}

export interface StackRow {
  label: string
  items: StackItem[]
}

export const stackRows: StackRow[] = [
  {
    label: 'os',
    items: [
      { name: 'arch linux', icon: 'https://cdn.simpleicons.org/archlinux/888888' },
      { name: 'mac', icon: 'https://cdn.simpleicons.org/apple/888888' },
    ],
  },
  {
    label: 'editor',
    items: [
      { name: 'cursor', icon: 'https://cdn.simpleicons.org/cursor/888888' },
      { name: 'nvim', icon: 'https://cdn.simpleicons.org/neovim/888888' },
    ],
  },
  {
    label: 'langs',
    items: [
      { name: 'c', icon: 'https://cdn.simpleicons.org/c/888888' },
      { name: 'c++', icon: 'https://cdn.simpleicons.org/cplusplus/888888' },
      { name: 'python', icon: 'https://cdn.simpleicons.org/python/888888' },
      { name: 'typescript', icon: 'https://cdn.simpleicons.org/typescript/888888' },
    ],
  },
  {
    label: 'into',
    items: [
      { name: 'ml', icon: 'https://cdn.simpleicons.org/pytorch/888888' },
    ],
  },
]
