import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import Button from '../components/ui/Button'

describe('Button Component', () => {
  const renderWithChakra = (ui: React.ReactNode) => {
    return render(<ChakraProvider>{ui}</ChakraProvider>)
  }

  it('renders correctly with default props', () => {
    renderWithChakra(<Button>Click Me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  it('renders correctly with primary variant', () => {
    renderWithChakra(<Button variant="primary">Primary Button</Button>)
    const button = screen.getByRole('button', { name: /primary button/i })
    expect(button).toBeInTheDocument()
  })

  it('renders correctly with outline variant', () => {
    renderWithChakra(<Button variant="outline">Outline Button</Button>)
    const button = screen.getByRole('button', { name: /outline button/i })
    expect(button).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    renderWithChakra(<Button onClick={handleClick}>Click Me</Button>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    fireEvent.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
