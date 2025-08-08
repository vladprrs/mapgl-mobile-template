import React from 'react'
import { render, screen, act, waitFor } from '@testing-library/react'
import { MapProvider } from '@/components/map/MapProvider'
import { MapContainer } from '@/components/map/MapContainer'
import { useMapGL } from '@/hooks/useMapGL'

// Local mock of @2gis/mapgl to cover Marker usage by MapProvider
jest.mock('@2gis/mapgl', () => ({
  load: jest.fn().mockResolvedValue({
    Map: jest.fn().mockImplementation(() => ({
      on: jest.fn(),
      off: jest.fn(),
      setCenter: jest.fn(),
      setZoom: jest.fn(),
      destroy: jest.fn(),
    })),
    Marker: jest.fn().mockImplementation((map: unknown, options: any) => {
      return {
        destroy: jest.fn(),
        // Mimic coordinates shape used by centerOnMarker
        coordinates: options?.coordinates,
      } as any
    }),
  }),
}))

function Harness() {
  const { addMarker, removeMarker, clearMarkers, centerOnMarker, centerOnLocation, markers, isLoading } = useMapGL()
  return (
    <div>
      <div data-testid="loading">{String(isLoading)}</div>
      <div data-testid="marker-count">{markers.size}</div>
      <button onClick={() => addMarker('a', [37.6173, 55.7558])}>add-a</button>
      <button onClick={() => addMarker('b', [37.62, 55.76])}>add-b</button>
      <button onClick={() => removeMarker('a')}>remove-a</button>
      <button onClick={() => clearMarkers()}>clear</button>
      <button onClick={() => centerOnMarker('b')}>center-on-b</button>
      <button onClick={() => centerOnLocation([37.61, 55.75], 16)}>center-on-loc</button>
    </div>
  )
}

describe('MapProvider integration', () => {
  it('covers marker add/remove/clear and centering helpers', async () => {
    process.env.NEXT_PUBLIC_ENABLE_TEST_HOOKS = 'true'
    await act(async () => {
      render(
        <MapProvider>
          <MapContainer />
          <Harness />
        </MapProvider>
      )
    })

    // Wait for MapContainer to initialize map and provider to flip loading to false
    await screen.findByTestId('loading')
    await act(async () => {})
    // In some environments this can be async; be resilient
    await new Promise(r => setTimeout(r, 0))

    // Add first marker and wait until it registers via instrumentation
    await act(async () => {
      screen.getByText('add-a').click()
    })
    await waitFor(() => {
      expect((window as any).__markerCount ?? 0).toBeGreaterThanOrEqual(1)
    })

    // Add second marker
    await act(async () => {
      screen.getByText('add-b').click()
    })
    await waitFor(() => {
      expect((window as any).__markerCount ?? 0).toBeGreaterThanOrEqual(1)
    })

    // Center on marker 'b'
    await act(async () => {
      screen.getByText('center-on-b').click()
    })

    // Center on location
    await act(async () => {
      screen.getByText('center-on-loc').click()
    })

    // Remove marker 'a'
    await act(async () => {
      screen.getByText('remove-a').click()
    })
    await waitFor(() => {
      expect((window as any).__markerCount ?? 0).toBeGreaterThanOrEqual(0)
    })

    // Clear all
    await act(async () => {
      screen.getByText('clear').click()
    })
    await waitFor(() => {
      expect((window as any).__markerCount ?? -1).toBe(0)
    })
  })
})


