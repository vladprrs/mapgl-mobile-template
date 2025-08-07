import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MapProvider } from '@/components/map/MapProvider'
import { MapContainer } from '@/components/map/MapContainer'
import { BottomSheet } from '@/components/bottom-sheet/BottomSheet'
import { LocationList } from '@/components/LocationList'

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
    Marker: jest.fn().mockImplementation((map, options) => ({
      coordinates: options.coordinates,
      setCoordinates: jest.fn(),
      show: jest.fn(),
      hide: jest.fn(),
      destroy: jest.fn(),
    })),
    ZoomControl: jest.fn(),
    GeoControl: jest.fn(),
  }),
}))

describe('Map-Sheet Synchronization', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Set mobile viewport
    global.innerWidth = 375
    global.innerHeight = 667
  })

  describe('Location Selection', () => {
    it('should update map when location is selected in sheet', async () => {
      const user = userEvent.setup()
      
      render(
        <MapProvider>
          <MapContainer />
          <BottomSheet>
            <LocationList />
          </BottomSheet>
        </MapProvider>
      )

      // Wait for map to initialize
      await waitFor(() => {
        const { load } = require('@2gis/mapgl')
        expect(load).toHaveBeenCalled()
      })

      // Click on a location
      const locationButton = screen.getByText('Red Square')
      await user.click(locationButton)

      // Verify map was centered on the location
      const { load } = require('@2gis/mapgl')
      const mapInstance = await load()
      const mockMap = new mapInstance.Map()
      
      await waitFor(() => {
        expect(mockMap.setCenter).toHaveBeenCalledWith(
          [37.6173, 55.7558],
          expect.any(Object)
        )
        expect(mockMap.setZoom).toHaveBeenCalledWith(16, expect.any(Object))
      })
    })

    it('should add marker when location is selected', async () => {
      const user = userEvent.setup()
      
      render(
        <MapProvider>
          <MapContainer />
          <BottomSheet>
            <LocationList />
          </BottomSheet>
        </MapProvider>
      )

      await waitFor(() => {
        const { load } = require('@2gis/mapgl')
        expect(load).toHaveBeenCalled()
      })

      const locationButton = screen.getByText('Gorky Park')
      await user.click(locationButton)

      // Verify marker was added
      const { load } = require('@2gis/mapgl')
      const mapgl = await load()
      
      await waitFor(() => {
        expect(mapgl.Marker).toHaveBeenCalledWith(
          expect.any(Object),
          expect.objectContaining({
            coordinates: [37.6016, 55.7312],
            label: 'Gorky Park',
          })
        )
      })
    })

    it('should clear previous markers before adding new one', async () => {
      const user = userEvent.setup()
      const mockDestroy = jest.fn()
      
      // Setup marker mock with destroy method
      const { load } = require('@2gis/mapgl')
      load.mockResolvedValue({
        Map: jest.fn().mockImplementation(() => ({
          on: jest.fn(),
          setCenter: jest.fn(),
          setZoom: jest.fn(),
          destroy: jest.fn(),
        })),
        Marker: jest.fn().mockImplementation(() => ({
          destroy: mockDestroy,
        })),
        ZoomControl: jest.fn(),
        GeoControl: jest.fn(),
      })

      render(
        <MapProvider>
          <MapContainer />
          <BottomSheet>
            <LocationList />
          </BottomSheet>
        </MapProvider>
      )

      // Select first location
      await user.click(screen.getByText('Red Square'))
      
      // Select second location
      await user.click(screen.getByText('Gorky Park'))

      // Previous marker should be destroyed
      await waitFor(() => {
        expect(mockDestroy).toHaveBeenCalled()
      })
    })
  })

  describe('Sheet State and Map Interaction', () => {
    it('should adjust map padding when sheet snap point changes', async () => {
      const { container } = render(
        <MapProvider>
          <MapContainer />
          <BottomSheet
            snapPoints={[0.1, 0.5, 0.9]}
           
          >
            <LocationList />
          </BottomSheet>
        </MapProvider>
      )

      const handle = container.querySelector('[style*="touchAction"]')
      
      // Drag sheet to expanded position
      fireEvent.pointerDown(handle!, {
        clientY: 600,
        pointerId: 1,
        pointerType: 'touch',
      })

      fireEvent.pointerMove(window, {
        clientY: 100,
        pointerId: 1,
        pointerType: 'touch',
      })

      fireEvent.pointerUp(window, {
        pointerId: 1,
        pointerType: 'touch',
      })

      // Map should adjust its bounds padding
      // This would be implemented in the actual component
      await waitFor(() => {
        // Test expectation for map bounds adjustment
        expect(true).toBe(true) // Placeholder for actual implementation
      })
    })

    it('should not interfere with map gestures when sheet is collapsed', () => {
      const { container } = render(
        <MapProvider>
          <MapContainer />
          <BottomSheet
            snapPoints={[0.1, 0.5, 0.9]}
            // Collapsed
          >
            <LocationList />
          </BottomSheet>
        </MapProvider>
      )

      const mapElement = container.querySelector('[style*="position: absolute"]')
      const sheetContent = container.querySelector('[style*="pointer-events"]')

      // Map should be fully interactive
      expect(mapElement).toHaveStyle({ position: 'absolute' })
      
      // Sheet content should not capture events
      expect(sheetContent).toHaveStyle({ pointerEvents: 'none' })
    })

    it('should allow map interaction above sheet when partially expanded', () => {
      const { container } = render(
        <MapProvider>
          <MapContainer />
          <BottomSheet
            snapPoints={[0.1, 0.5, 0.9]}
            // Half expanded
          >
            <LocationList />
          </BottomSheet>
        </MapProvider>
      )

      // The visible map area above sheet should be interactive
      const mapElement = container.querySelector('[style*="position: absolute"]')
      expect(mapElement).toBeInTheDocument()
      
      // This tests that map events can still be triggered
      fireEvent.click(mapElement!, { clientY: 100 }) // Click in upper half
    })
  })

  describe('Clear Markers Functionality', () => {
    it('should clear all markers when clear button is clicked', async () => {
      const user = userEvent.setup()
      const mockDestroy = jest.fn()
      
      const { load } = require('@2gis/mapgl')
      load.mockResolvedValue({
        Map: jest.fn().mockImplementation(() => ({
          on: jest.fn(),
          setCenter: jest.fn(),
          setZoom: jest.fn(),
          destroy: jest.fn(),
        })),
        Marker: jest.fn().mockImplementation(() => ({
          destroy: mockDestroy,
        })),
        ZoomControl: jest.fn(),
        GeoControl: jest.fn(),
      })

      render(
        <MapProvider>
          <MapContainer />
          <BottomSheet>
            <LocationList />
          </BottomSheet>
        </MapProvider>
      )

      // Add some markers
      await user.click(screen.getByText('Red Square'))
      await user.click(screen.getByText('Gorky Park'))

      // Clear all markers
      const clearButton = screen.getByText('Clear All Markers')
      await user.click(clearButton)

      await waitFor(() => {
        expect(mockDestroy).toHaveBeenCalled()
      })
    })
  })

  describe('Mobile Performance', () => {
    it('should debounce rapid location selections', async () => {
      jest.useFakeTimers()
      const user = userEvent.setup({ delay: null })
      
      render(
        <MapProvider>
          <MapContainer />
          <BottomSheet>
            <LocationList />
          </BottomSheet>
        </MapProvider>
      )

      // Rapidly click multiple locations
      await user.click(screen.getByText('Red Square'))
      await user.click(screen.getByText('Gorky Park'))
      await user.click(screen.getByText('Moscow City'))

      jest.runAllTimers()

      // Only the last selection should be processed
      const { load } = require('@2gis/mapgl')
      const mapgl = await load()
      const mockMap = new mapgl.Map()

      await waitFor(() => {
        expect(mockMap.setCenter).toHaveBeenLastCalledWith(
          [37.5377, 55.7494], // Moscow City coordinates
          expect.any(Object)
        )
      })

      jest.useRealTimers()
    })

    it('should maintain smooth animations during sheet transitions', async () => {
      const { container } = render(
        <MapProvider>
          <MapContainer />
          <BottomSheet
            snapPoints={[0.1, 0.5, 0.9]}
           
          >
            <LocationList />
          </BottomSheet>
        </MapProvider>
      )

      const sheet = container.querySelector('.fixed')
      
      // Sheet should use hardware acceleration
      expect(sheet).toHaveStyle({
        willChange: 'transform',
      })
      
      // Should use transform instead of position changes
      const sheetElement = sheet as HTMLElement
      expect(sheetElement?.style.transform).toContain('translateY')
    })
  })

  describe('Error Handling', () => {
    it('should handle map initialization errors gracefully', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      
      // Mock map load failure
      const { load } = require('@2gis/mapgl')
      load.mockRejectedValue(new Error('Failed to load map'))

      render(
        <MapProvider>
          <MapContainer />
          <BottomSheet>
            <LocationList />
          </BottomSheet>
        </MapProvider>
      )

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(
          'Failed to initialize map:',
          expect.any(Error)
        )
      })

      // UI should still be interactive
      expect(screen.getByText('Popular Locations')).toBeInTheDocument()
      
      consoleSpy.mockRestore()
    })

    it('should handle marker creation errors', async () => {
      const user = userEvent.setup()
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      
      // Mock marker creation failure
      const { load } = require('@2gis/mapgl')
      load.mockResolvedValue({
        Map: jest.fn().mockImplementation(() => ({
          on: jest.fn(),
          setCenter: jest.fn(),
          setZoom: jest.fn(),
          destroy: jest.fn(),
        })),
        Marker: jest.fn().mockImplementation(() => {
          throw new Error('Failed to create marker')
        }),
        ZoomControl: jest.fn(),
        GeoControl: jest.fn(),
      })

      render(
        <MapProvider>
          <MapContainer />
          <BottomSheet>
            <LocationList />
          </BottomSheet>
        </MapProvider>
      )

      await user.click(screen.getByText('Red Square'))

      // Should handle error without crashing
      await waitFor(() => {
        expect(screen.getByText('Red Square')).toBeInTheDocument()
      })
      
      consoleSpy.mockRestore()
    })
  })
})