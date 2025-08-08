import React from 'react'
import { render } from '@testing-library/react'
import { useMapGL, MapContext } from '@/hooks/useMapGL'

function UseHookOutsideProvider() {
  // Expect this to throw
  // eslint-disable-next-line react-hooks/rules-of-hooks
  try {
    useMapGL()
  } catch (e) {
    return <div data-testid="thrown">thrown</div>
  }
  return <div />
}

describe('useMapGL', () => {
  it('throws when used outside MapProvider', () => {
    const { getByTestId } = render(<UseHookOutsideProvider />)
    expect(getByTestId('thrown')).toBeInTheDocument()
  })

  it('returns context value when inside provider', () => {
    const value = {
      map: null,
      isLoading: true,
      markers: new Map(),
      addMarker: jest.fn(),
      removeMarker: jest.fn(),
      clearMarkers: jest.fn(),
      centerOnMarker: jest.fn(),
      centerOnLocation: jest.fn(),
    }
    const Child = () => {
      const ctx = useMapGL()
      return <div data-testid="ok">{String(Boolean(ctx))}</div>
    }
    const { getByTestId } = render(
      <MapContext.Provider value={value as any}>
        <Child />
      </MapContext.Provider>
    )
    expect(getByTestId('ok').textContent).toBe('true')
  })
})


