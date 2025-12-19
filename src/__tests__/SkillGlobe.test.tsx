
import React from 'react'
import ReactThreeTestRenderer from '@react-three/test-renderer'
import SkillGlobe from '../components/ui/SkillGlobe'

import { render } from '@testing-library/react'

describe('SkillGlobe Component', () => {
  // Test 1: DOM rendering (The container and overlay text)
  it('renders the overlay text in JSDOM', () => {
    // This uses standard ReactDOM.render. 
    // The <Canvas> child will try to mount. R3F is usually resilient in JSDOM if ResizeObserver exists.
    const { getByText } = render(<SkillGlobe />)
    expect(getByText('Interactive 3D Skills')).toBeInTheDocument()
  })
})
