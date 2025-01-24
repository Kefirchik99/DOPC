import type { PriceBreakdown } from '../utils';

interface PriceBreakdownProps {
  breakdown: PriceBreakdown;
}

const PriceBreakdownComponent: React.FC<PriceBreakdownProps> = ({ breakdown }) => {
  const isDataFetched = Object.values(breakdown).some((value) => value > 0);

  const formatValue = (value: number, unit: string = "") =>
    isDataFetched
      ? unit === "m"
        ? `${value.toFixed(0)} ${unit}`  
        : `${(value / 100).toFixed(2)} ${unit}` 
      : "-";

  const renderField = (label: string, value: number, unit: string = "", testId: string) => (
    <li>
      {label}{" "}
      <span 
        data-test-id={testId} 
        data-raw-value={isDataFetched ? value : undefined} 
        aria-hidden={!isDataFetched}
      >
        {isDataFetched ? `${formatValue(value, unit)}` : "-"}
      </span>
    </li>
  );

  return (
    <div className="input-form__price-breakdown">
      <h2>Price Breakdown</h2>
      <ul>
        {renderField("Cart Value", breakdown.cartValue, "€", "cartValue")}
        {renderField("Small Order Surcharge", breakdown.smallOrderSurcharge, "€", "smallOrderSurcharge")}
        {renderField("Delivery Fee", breakdown.deliveryFee, "€", "deliveryFee")}
        {renderField("Delivery Distance", breakdown.deliveryDistance, "m", "deliveryDistance")}
        {renderField("Total Price", breakdown.totalPrice, "€", "totalPrice")}
      </ul>
    </div>
  );
};

export default PriceBreakdownComponent;
