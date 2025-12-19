import '@testing-library/jest-dom'

// Mock ResizeObserver for Three.js/Canvas components
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver

// Mock WebGL Context to prevent Three.js/R3F crashes in JSDOM
HTMLCanvasElement.prototype.getContext = jest.fn((contextId) => {
    if (contextId === 'webgl' || contextId === 'experimental-webgl') {
        return {
            getParameter: jest.fn().mockReturnValue(0),
            getExtension: jest.fn().mockReturnValue({}),
            createTexture: jest.fn(),
            bindTexture: jest.fn(),
            texParameteri: jest.fn(),
            texImage2D: jest.fn(),
            clearColor: jest.fn(),
            clear: jest.fn(),
            enable: jest.fn(),
            disable: jest.fn(),
            viewport: jest.fn(),
            // Add other WebGL methods as needed by Three.js initialization
            // The list can be extensive, use a dummy proxy if strictly needed or deep mocks
            createBuffer: jest.fn(),
            bindBuffer: jest.fn(),
            bufferData: jest.fn(),
            createShader: jest.fn(),
            shaderSource: jest.fn(),
            compileShader: jest.fn(),
            createProgram: jest.fn(),
            attachShader: jest.fn(),
            linkProgram: jest.fn(),
            getProgramParameter: jest.fn(),
            getShaderParameter: jest.fn(),
            useProgram: jest.fn(),
            getAttribLocation: jest.fn(),
            getUniformLocation: jest.fn(),
            enableVertexAttribArray: jest.fn(),
            vertexAttribPointer: jest.fn(),
        } as any
    }
    return null
}) as any

// Mock matchMedia for Chakra UI
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
