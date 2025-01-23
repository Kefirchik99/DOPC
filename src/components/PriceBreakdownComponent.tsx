import type { PriceBreakdown } from '../utils';

interface PriceBreakdownProps {
  breakdown: PriceBreakdown;
}

const PriceBreakdownComponent: React.FC<PriceBreakdownProps> = ({ breakdown }) => {
  const isDataFetched = Object.values(breakdown).some((value) => value > 0); // Check if any value is greater than 0

  return (
    <div className="input-form__price-breakdown">
      <h2>Price Breakdown</h2>
      <ul>
        <li>
          Cart Value: <span>{isDataFetched ? `${breakdown.cartValue} €` : '-'}</span>
        </li>
        <li>
          Small Order Surcharge: <span>{isDataFetched ? `${breakdown.smallOrderSurcharge} €` : '-'}</span>
        </li>
        <li>
          Delivery Fee: <span>{isDataFetched ? `${breakdown.deliveryFee} €` : '-'}</span>
        </li>
        <li>
          Delivery Distance: <span>{isDataFetched ? `${breakdown.deliveryDistance.toFixed(0)} m` : '-'}</span>
        </li>
        <li>
          Total Price: <span>{isDataFetched ? `${breakdown.totalPrice} €` : '-'}</span>
        </li>
      </ul>
    </div>
  );
};

export default PriceBreakdownComponent;
