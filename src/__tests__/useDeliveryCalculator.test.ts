import { renderHook, act } from '@testing-library/react';
import axios from 'axios';
import { useDeliveryCalculator } from '../hooks/useDeliveryCalculator';

jest.mock('axios');

describe('useDeliveryCalculator Hook', () => {
  const defaultProps = {
    venueSlug: 'home-assignment-venue-tallinn',
    cartValue: 10,
    latitude: '59.4385937',
    longitude: '24.7513679',
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('validates inputs and sets error message for invalid data', async () => {
    const { result } = renderHook(() =>
      useDeliveryCalculator({ ...defaultProps, cartValue: '' })
    );

    await act(() => result.current.calculatePrice());

    expect(result.current.errorMessage).toBe('Cart value must be greater than 0!');
    expect(axios.get).not.toHaveBeenCalled();
  });

  it('fetches static and dynamic data successfully and calculates price', async () => {
    (axios.get as jest.Mock).mockImplementation((url: string) => {
      if (url.endsWith('/static')) {
        return Promise.resolve({
          data: {
            venue_raw: {
              location: { coordinates: [24.7513679, 59.4385937] },
            },
          },
        });
      }
      if (url.endsWith('/dynamic')) {
        return Promise.resolve({
          data: {
            venue_raw: {
              delivery_specs: {
                order_minimum_no_surcharge: 1000,
                delivery_pricing: {
                  base_price: 190,
                  distance_ranges: [
                    { min: 0, max: 500, a: 0, b: 0, flag: null },
                    { min: 500, max: 1000, a: 100, b: 1, flag: null },
                    { min: 1000, max: 0, a: 0, b: 0, flag: null },
                  ],
                },
              },
            },
          },
        });
      }
      return Promise.reject(new Error('Unexpected URL'));
    });

    const { result } = renderHook(() => useDeliveryCalculator(defaultProps));

    await act(() => result.current.calculatePrice());

    expect(result.current.errorMessage).toBeNull();
    expect(result.current.priceBreakdown).toBeTruthy();
  });

  it('handles API errors gracefully', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Some Network Error'));

    const { result } = renderHook(() =>
      useDeliveryCalculator({
        ...defaultProps,
        venueSlug: 'home-assignment-venue-tallinn',
      })
    );

    await act(() => result.current.calculatePrice());

    expect(result.current.errorMessage).toBe(
      'Failed to fetch venue data. Please check the venue slug and try again.'
    );
  });
});
