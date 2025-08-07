// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock window.matchMedia
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

// Mock navigator.geolocation
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
}
Object.defineProperty(navigator, 'geolocation', {
  value: mockGeolocation,
})

// Mock environment variables for tests
process.env.NEXT_PUBLIC_2GIS_API_KEY = 'test-api-key'
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000'

// Set up mobile viewport mocking
global.innerWidth = 375
global.innerHeight = 667

// Mock touch events
class TouchEvent extends Event {
  constructor(type, props) {
    super(type, props)
    this.touches = props.touches || []
    this.targetTouches = props.targetTouches || []
    this.changedTouches = props.changedTouches || []
  }
}
global.TouchEvent = TouchEvent

// Mock pointer events
class PointerEvent extends MouseEvent {
  constructor(type, props) {
    super(type, props)
    this.pointerId = props.pointerId || 1
    this.width = props.width || 1
    this.height = props.height || 1
    this.pressure = props.pressure || 0.5
    this.pointerType = props.pointerType || 'touch'
  }
}
global.PointerEvent = PointerEvent

// Suppress console errors in tests (optional)
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})