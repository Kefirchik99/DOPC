// src/__tests__/PriceBreakdownComponent.test.tsx
import { render, queryByAttribute } from '@testing-library/react';
import PriceBreakdownComponent from '../components/PriceBreakdownComponent';

describe('PriceBreakdownComponent', () => {
  const getByDataTestId = queryByAttribute.bind(null, 'data-test-id');

  it('renders default values when no data is fetched', () => {
    const breakdown = {
      cartValue: 0,
      smallOrderSurcharge: 0,
      deliveryFee: 0,
      deliveryDistance: 0,
      totalPrice: 0,
    };

    const { container } = render(<PriceBreakdownComponent breakdown={breakdown} />);

    expect(getByDataTestId(container, 'cartValue')).toHaveTextContent('-');
    expect(getByDataTestId(container, 'smallOrderSurcharge')).toHaveTextContent('-');
    expect(getByDataTestId(container, 'deliveryFee')).toHaveTextContent('-');
    expect(getByDataTestId(container, 'deliveryDistance')).toHaveTextContent('-');
    expect(getByDataTestId(container, 'totalPrice')).toHaveTextContent('-');
  });

  it('renders correct raw values and formatted values when data is fetched', () => {
    const breakdown = {
      cartValue: 1055,
      smallOrderSurcharge: 200,
      deliveryFee: 359,
      deliveryDistance: 1200,
      totalPrice: 1614,
    };

    const { container } = render(<PriceBreakdownComponent breakdown={breakdown} />);

    expect(getByDataTestId(container, 'cartValue')).toHaveAttribute('data-raw-value', '1055');
    expect(getByDataTestId(container, 'cartValue')).toHaveTextContent('10.55 €');

    expect(getByDataTestId(container, 'smallOrderSurcharge')).toHaveAttribute('data-raw-value', '200');
    expect(getByDataTestId(container, 'smallOrderSurcharge')).toHaveTextContent('2.00 €');

    expect(getByDataTestId(container, 'deliveryFee')).toHaveAttribute('data-raw-value', '359');
    expect(getByDataTestId(container, 'deliveryFee')).toHaveTextContent('3.59 €');

    expect(getByDataTestId(container, 'deliveryDistance')).toHaveAttribute('data-raw-value', '1200');
    expect(getByDataTestId(container, 'deliveryDistance')).toHaveTextContent('1200 m');

    expect(getByDataTestId(container, 'totalPrice')).toHaveAttribute('data-raw-value', '1614');
    expect(getByDataTestId(container, 'totalPrice')).toHaveTextContent('16.14 €');
  });
});
