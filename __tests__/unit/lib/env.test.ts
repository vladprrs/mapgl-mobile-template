/** @jest-environment node */
import { ConfigError, config, getAppUrl, getEnvironment, getMapGLApiKey } from '@/lib/config/env'

describe('env config', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
  })

  afterAll(() => {
    process.env = OLD_ENV
  })

  test('throws ConfigError when NEXT_PUBLIC_2GIS_API_KEY missing', () => {
    delete process.env.NEXT_PUBLIC_2GIS_API_KEY
    expect(() => getMapGLApiKey()).toThrow(ConfigError)
  })

  test('returns API key when present', () => {
    process.env.NEXT_PUBLIC_2GIS_API_KEY = 'test-key'
    expect(getMapGLApiKey()).toBe('test-key')
    expect(config.mapgl.apiKey).toBe('test-key')
  })

  test('getEnvironment returns valid env or defaults to development', () => {
    // Cannot assign to NODE_ENV due to readonly typing in env.d.ts; simulate via direct call side effects
    const original = process.env.NODE_ENV
    ;(process.env as any).NODE_ENV = 'production'
    expect(getEnvironment()).toBe('production')
    ;(process.env as any).NODE_ENV = 'test'
    expect(getEnvironment()).toBe('test')
    ;(process.env as any).NODE_ENV = 'invalid'
    expect(getEnvironment()).toBe('development')
    ;(process.env as any).NODE_ENV = original
  })

  test('getAppUrl falls back to localhost on server', () => {
    delete process.env.NEXT_PUBLIC_APP_URL
    expect(getAppUrl()).toBe('http://localhost:3000')
  })
})


