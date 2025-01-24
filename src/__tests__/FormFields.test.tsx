import { render, fireEvent, queryByAttribute } from '@testing-library/react';
import FormFields from '../components/FormFields';
import type { VenueSlug } from '../utils';

describe('FormFields Component', () => {
  const getByDataTestId = queryByAttribute.bind(null, 'data-test-id');

  const mockHandlers = {
    setVenueSlug: jest.fn() as (value: VenueSlug | '') => void,
    setCartValue: jest.fn() as (value: number | '') => void,
    setLatitude: jest.fn() as (value: string) => void,
    setLongitude: jest.fn() as (value: string) => void,
    handleGetLocation: jest.fn() as () => void,
    handleCalculatePrice: jest.fn() as () => void,
  };

  const defaultProps = {
    venueSlug: '' as const,
    cartValue: '' as const,
    latitude: '' as const,
    longitude: '' as const,
    ...mockHandlers,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all input fields and buttons', () => {
    const { container } = render(<FormFields {...defaultProps} />);

    expect(getByDataTestId(container, 'venueSlug')).toBeInTheDocument();
    expect(getByDataTestId(container, 'cartValue')).toBeInTheDocument();
    expect(getByDataTestId(container, 'userLatitude')).toBeInTheDocument();
    expect(getByDataTestId(container, 'userLongitude')).toBeInTheDocument();
    expect(getByDataTestId(container, 'getLocation')).toBeInTheDocument();
    expect(getByDataTestId(container, 'calculateDeliveryPrice')).toBeInTheDocument();
  });

  it('calls appropriate handler functions on input change and button clicks', () => {
    const { container } = render(<FormFields {...defaultProps} />);

    const venueSlugInput = getByDataTestId(container, 'venueSlug');
    fireEvent.change(venueSlugInput as HTMLElement, {
      target: { value: 'home-assignment-venue-tallinn' },
    });
    expect(mockHandlers.setVenueSlug).toHaveBeenCalledWith('home-assignment-venue-tallinn');

    const cartValueInput = getByDataTestId(container, 'cartValue');
    fireEvent.change(cartValueInput as HTMLElement, { target: { value: 15.5 } });
    expect(mockHandlers.setCartValue).toHaveBeenCalledWith(15.5);

    const getLocationBtn = getByDataTestId(container, 'getLocation');
    fireEvent.click(getLocationBtn as HTMLElement);
    expect(mockHandlers.handleGetLocation).toHaveBeenCalled();

    const calcPriceBtn = getByDataTestId(container, 'calculateDeliveryPrice');
    fireEvent.click(calcPriceBtn as HTMLElement);
    expect(mockHandlers.handleCalculatePrice).toHaveBeenCalled();
  });
});
