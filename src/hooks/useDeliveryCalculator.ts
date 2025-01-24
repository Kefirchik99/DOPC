import { useState } from "react";
import {
  validateForm,
  calculateDistance,
  calculateDeliveryFee,
  formatDistance,
} from "../utils";
import { fetchVenueStaticData, fetchVenueDynamicData } from "../services";
import type { PriceBreakdown, DistanceRange } from "../utils";

interface UseDeliveryCalculatorProps {
  venueSlug: string;
  cartValue: number | "";
  latitude: string;
  longitude: string;
}

export const useDeliveryCalculator = ({
  venueSlug,
  cartValue,
  latitude,
  longitude,
}: UseDeliveryCalculatorProps) => {
  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown | null>(null);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const calculatePrice = async () => {
    const validationError = validateForm({
      venueSlug,
      cartValue: cartValue.toString(),
      latitude,
      longitude,
    });

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setErrorMessage(null);
    setWarningMessage(null);

    try {
      const staticData = await fetchVenueStaticData(venueSlug);
      const dynamicData = await fetchVenueDynamicData(venueSlug);

      const venueLocation = staticData.venue_raw.location.coordinates;
      const orderMinimum = dynamicData.venue_raw.delivery_specs.order_minimum_no_surcharge;
      const basePrice = dynamicData.venue_raw.delivery_specs.delivery_pricing.base_price;
      const distanceRanges = dynamicData.venue_raw.delivery_specs.delivery_pricing.distance_ranges;

      const deliveryDistance = calculateDistance(
        Number(latitude),
        Number(longitude),
        venueLocation[1],
        venueLocation[0]
      );

      if (
        distanceRanges.some(
          (range: DistanceRange) => range.max === 0 && deliveryDistance >= range.min
        )
      ) {
        setErrorMessage(
          `Delivery not available for this distance. Your location is ${formatDistance(
            deliveryDistance
          )} away, but maximum delivery distance is ${formatDistance(
            distanceRanges[distanceRanges.length - 1].min
          )}.
          P.S. You can use the example coordinates provided below the input fields.`
        );
        return;
      }

      const smallOrderSurcharge = Math.max(
        0,
        orderMinimum - Number(cartValue) * 100
      );

      if (smallOrderSurcharge > 0) {
        setWarningMessage(
          `The minimum order size is ${
            orderMinimum / 100
          } EUR. Your order incurs a surcharge of ${
            smallOrderSurcharge / 100
          } EUR.`
        );
      }

      const deliveryFee = calculateDeliveryFee(
        deliveryDistance,
        distanceRanges,
        basePrice
      );
      const totalPrice = Number(cartValue) * 100 + deliveryFee + smallOrderSurcharge;

      setPriceBreakdown({
        cartValue: Number(cartValue) * 100,
        smallOrderSurcharge,
        deliveryFee,
        deliveryDistance,
        totalPrice,
      });
    } catch (err) {
      setErrorMessage("Failed to fetch venue data. Please check the venue slug and try again.");
      console.error("API Error:", err);
    }
  };

  return {
    calculatePrice,
    priceBreakdown,
    warningMessage,
    errorMessage,
    setWarningMessage,
    setErrorMessage,
  };
};
