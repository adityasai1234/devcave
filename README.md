# addyhacks.xyz

Personal portfolio website for Aditya with a hacker/arch-linux mini desktop UI — inspired by windowed desktop concepts but in a dark terminal aesthetic.

## Features

- **Fake Desktop Environment** — Multiple draggable, resizable, closeable windows
- **Window System** — Focus, minimize, close, drag, and resize windows
- **Interactive Terminal** — Typewriter effect with command support
- **Animated Skills** — Animated progress bars
- **Mobile Responsive** — Stacks windows vertically on mobile
- **Scanline & Grid Effects** — Retro CRT-style visual effects

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Jest + React Testing Library

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/adityasai1234/addyhacks.xyz.git
cd addyhacks.xyz

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Build

```bash
# Create production build
npm run build

# Start production server
npm start
```

### Testing

```bash
# Run tests
npm test
```

## Project Structure

```
src/
├── app/
│   ├── globals.css      # CSS variables, scanlines, grid effects
│   ├── layout.tsx       # Root layout with JetBrains Mono font
│   └── page.tsx         # Desktop component
├── components/
│   ├── Desktop.tsx      # Main desktop orchestrator
│   ├── DesktopIcon.tsx  # Desktop icons
│   ├── Dock.tsx         # Bottom dock bar
│   ├── Topbar.tsx       # Top menu bar with clock
│   ├── Window.tsx       # Reusable window component
│   └── windows/
│       ├── AboutWindow.tsx
│       ├── ContactWindow.tsx
│       ├── ProjectsWindow.tsx
│       ├── SkillsWindow.tsx
│       └── TerminalWindow.tsx
├── data/
│   └── projects.ts      # Project and skills data
├── hooks/
│   ├── useClock.ts      # Live clock hook
│   ├── useDraggable.ts  # Drag window hook
│   ├── useResizable.ts  # Resize window hook
│   └── useWindowManager.ts # Window state management
└── __tests__/
    ├── useWindowManager.test.ts
    ├── useDraggable.test.ts
    ├── Window.test.tsx
    ├── TerminalWindow.test.tsx
    ├── ProjectsWindow.test.tsx
    └── Topbar.test.tsx
```

## Commands in Terminal

- `help` — Show available commands
- `clear` — Clear terminal
- `open projects` — Focus projects window
- `open about` — Focus about window
- `open skills` — Focus skills window
- `open contact` — Focus contact window

## License

MIT
