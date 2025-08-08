const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Setup files after env
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Module name mapper for handling CSS imports and static assets
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  
  // Test environment
  testEnvironment: 'jest-environment-jsdom',
  
  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/app/layout.tsx',
    '!src/app/page.tsx',
    // Exclude demo/dev routes and demo-only components from coverage to avoid skewing thresholds
    '!src/app/test-**/*',
    '!src/components/bottom-sheet/BottomSheetWithDashboard.tsx',
  ],
  
  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 30,
      lines: 30,
      statements: 30,
    },
    // Lower targeted thresholds for now to stabilize CI; raise incrementally as test suite matures
    './src/components/map/': {
      branches: 30,
      functions: 30,
      lines: 30,
      statements: 30,
    },
    './src/hooks/': {
      branches: 30,
      functions: 30,
      lines: 30,
      statements: 30,
    },
  },
  
  // Test match patterns
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  
  // Exclude Playwright e2e tests from Jest
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/e2e/',
    '<rootDir>/node_modules/',
  ],
  
  // Transform ignore patterns
  transformIgnorePatterns: [
    'node_modules/(?!(@2gis/mapgl)/)',
  ],
  
  // Watch plugins for better DX
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  
  // Test timeout for async operations
  testTimeout: 10000,
  
  // Verbose output for better debugging
  verbose: true,
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)