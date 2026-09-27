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
      { name: 'arch linux', icon: 'https://cdn.simpleicons.org/archlinux/a1a1aa' },
      { name: 'mac', icon: 'https://cdn.simpleicons.org/apple/a1a1aa' },
    ],
  },
  {
    label: 'editor',
    items: [
      { name: 'cursor', icon: 'https://cdn.simpleicons.org/cursor/a1a1aa' },
      { name: 'nvim', icon: 'https://cdn.simpleicons.org/neovim/a1a1aa' },
    ],
  },
  {
    label: 'langs',
    items: [
      { name: 'c', icon: 'https://cdn.simpleicons.org/c/a1a1aa' },
      { name: 'c++', icon: 'https://cdn.simpleicons.org/cplusplus/a1a1aa' },
      { name: 'python', icon: 'https://cdn.simpleicons.org/python/a1a1aa' },
      { name: 'typescript', icon: 'https://cdn.simpleicons.org/typescript/a1a1aa' },
    ],
  },
  {
    label: 'into',
    items: [
      { name: 'ml', icon: 'https://cdn.simpleicons.org/pytorch/a1a1aa' },
    ],
  },
]
