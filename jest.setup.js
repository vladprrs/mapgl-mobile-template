// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Only set up DOM-related mocks if window is defined (not in Node environment)
if (typeof window !== 'undefined') {
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
}

// Mock environment variables for tests
process.env.NEXT_PUBLIC_2GIS_API_KEY = 'test-api-key'
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000'

// Mock 2GIS MapGL globally
jest.mock('@2gis/mapgl', () => ({
  load: jest.fn().mockResolvedValue({
    Map: jest.fn().mockImplementation(() => ({
      setCenter: jest.fn(),
      setZoom: jest.fn(),
      on: jest.fn(),
      off: jest.fn(),
      destroy: jest.fn(),
      getContainer: jest.fn(() => document.createElement('div')),
      getZoom: jest.fn(() => 13),
      getCenter: jest.fn(() => [37.618423, 55.751244]),
      getBounds: jest.fn(() => ({
        getNorthEast: jest.fn(() => ({ lng: 38, lat: 56 })),
        getSouthWest: jest.fn(() => ({ lng: 37, lat: 55 }))
      })),
      fitBounds: jest.fn(),
      addControl: jest.fn(),
      removeControl: jest.fn(),
      queryRenderedFeatures: jest.fn(() => []),
      project: jest.fn(),
      unproject: jest.fn(),
    }))
  })
}))

// Set up mobile viewport mocking (only in jsdom environment)
if (typeof window !== 'undefined') {
  global.innerWidth = 375
  global.innerHeight = 667
}

// Mock touch events (only in jsdom environment)
if (typeof window !== 'undefined') {
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
}

// Suppress console errors in tests (optional)
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    const firstArg = args[0]
    if (
      typeof firstArg === 'string' &&
      (firstArg.includes('Warning: ReactDOM.render') ||
       firstArg.includes('An update to MapProvider inside a test was not wrapped in act') ||
       firstArg.includes('Warning: An update to'))
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})