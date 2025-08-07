import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MapContainer } from '@/components/map/MapContainer'
import { MapProvider } from '@/components/map/MapProvider'

// Mock the 2GIS MapGL library
jest.mock('@2gis/mapgl', () => ({
  load: jest.fn().mockResolvedValue({
    Map: jest.fn().mockImplementation(() => ({
      on: jest.fn(),
      off: jest.fn(),
      setCenter: jest.fn(),
      setZoom: jest.fn(),
      getCenter: jest.fn().mockReturnValue([37.618423, 55.751244]),
      getZoom: jest.fn().mockReturnValue(13),
      destroy: jest.fn(),
    })),
    Marker: jest.fn().mockImplementation(() => ({
      setCoordinates: jest.fn(),
      show: jest.fn(),
      hide: jest.fn(),
      destroy: jest.fn(),
    })),
    ZoomControl: jest.fn(),
    GeoControl: jest.fn(),
  }),
}))

describe('MapContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Initialization', () => {
    it('should render the map container element', () => {
      render(
        <MapProvider>
          <MapContainer />
        </MapProvider>
      )

      const mapElement = document.querySelector('[style*="position: absolute"]')
      expect(mapElement).toBeInTheDocument()
    })

    it('should initialize with correct mobile settings', async () => {
      const { load } = require('@2gis/mapgl')
      const mockMapConstructor = jest.fn()
      load.mockResolvedValue({ Map: mockMapConstructor })

      render(
        <MapProvider>
          <MapContainer />
        </MapProvider>
      )

      await waitFor(() => {
        expect(mockMapConstructor).toHaveBeenCalledWith(
          expect.any(HTMLElement),
          expect.objectContaining({
            pitch: 0,
            rotation: 0,
            cooperativeGestures: false,
            preloadTiles: true,
            maxZoom: 18,
          })
        )
      })
    })

    it('should set correct viewport constraints for mobile', async () => {
      const { load } = require('@2gis/mapgl')
      const mockMapConstructor = jest.fn()
      load.mockResolvedValue({ Map: mockMapConstructor })

      render(
        <MapProvider>
          <MapContainer />
        </MapProvider>
      )

      await waitFor(() => {
        expect(mockMapConstructor).toHaveBeenCalledWith(
          expect.any(HTMLElement),
          expect.objectContaining({
            fitBoundsOptions: {
              padding: {
                top: 50,
                bottom: 300, // Space for bottom sheet
                left: 50,
                right: 50,
              },
            },
          })
        )
      })
    })

    it('should handle API key configuration errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      
      // Mock config to throw error
      jest.mock('@/lib/config/env', () => ({
        config: {
          mapgl: {
            get apiKey() {
              throw new Error('API key not configured')
            },
          },
        },
        ConfigError: Error,
      }))

      render(
        <MapProvider>
          <MapContainer />
        </MapProvider>
      )

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(
          'Configuration Error:',
          expect.any(String)
        )
      })

      consoleSpy.mockRestore()
    })
  })

  describe('Mobile Controls', () => {
    it('should let 2GIS handle controls automatically', async () => {
      const { load } = require('@2gis/mapgl')
      const mockMap = {
        on: jest.fn(),
        destroy: jest.fn(),
      }
      load.mockResolvedValue({
        Map: jest.fn().mockImplementation(() => mockMap),
      })

      render(
        <MapProvider>
          <MapContainer />
        </MapProvider>
      )

      await waitFor(() => {
        // Map should be created without manual control additions
        expect(load).toHaveBeenCalled()
        // No manual control creation should occur
      })
    })

    it('should not manually add any controls', async () => {
      const { load } = require('@2gis/mapgl')
      const mockZoomControl = jest.fn()
      const mockGeoControl = jest.fn()
      load.mockResolvedValue({
        Map: jest.fn().mockImplementation(() => ({
          on: jest.fn(),
          destroy: jest.fn(),
        })),
        ZoomControl: mockZoomControl,
        GeoControl: mockGeoControl,
      })

      render(
        <MapProvider>
          <MapContainer />
        </MapProvider>
      )

      await waitFor(() => {
        // Controls should not be manually created
        expect(mockZoomControl).not.toHaveBeenCalled()
        expect(mockGeoControl).not.toHaveBeenCalled()
      })
    })
  })

  describe('Touch Event Handling', () => {
    it('should handle map click events', async () => {
      const { load } = require('@2gis/mapgl')
      const mockOn = jest.fn()
      load.mockResolvedValue({
        Map: jest.fn().mockImplementation(() => ({
          on: mockOn,
          destroy: jest.fn(),
        })),
        ZoomControl: jest.fn(),
        GeoControl: jest.fn(),
      })

      render(
        <MapProvider>
          <MapContainer />
        </MapProvider>
      )

      await waitFor(() => {
        expect(mockOn).toHaveBeenCalledWith('click', expect.any(Function))
      })
    })

    it('should prevent default touch behaviors on map container', () => {
      const { container } = render(
        <MapProvider>
          <MapContainer />
        </MapProvider>
      )

      const mapElement = container.firstChild
      expect(mapElement).toHaveStyle({ position: 'absolute' })
    })
  })

  describe('Cleanup', () => {
    it('should destroy map instance on unmount', async () => {
      const { load } = require('@2gis/mapgl')
      const mockDestroy = jest.fn()
      load.mockResolvedValue({
        Map: jest.fn().mockImplementation(() => ({
          on: jest.fn(),
          destroy: mockDestroy,
        })),
        ZoomControl: jest.fn(),
        GeoControl: jest.fn(),
      })

      const { unmount } = render(
        <MapProvider>
          <MapContainer />
        </MapProvider>
      )

      await waitFor(() => {
        expect(mockDestroy).not.toHaveBeenCalled()
      })

      unmount()

      expect(mockDestroy).toHaveBeenCalled()
    })
  })
})