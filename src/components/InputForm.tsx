import { useState } from 'react';
import { Container, Alert, Form } from 'react-bootstrap';
import {
  validateForm,
  getUserLocation,
  calculateDistance,
  calculateDeliveryFee,
  getSuggestedCoordinates,
  formatDistance,
} from '../utils';
import type { PriceBreakdown, VenueSlug } from '../utils';
import { fetchVenueStaticData, fetchVenueDynamicData } from '../services';
import FormFields from './FormFields';
import PriceBreakdownComponent from './PriceBreakdownComponent';
import './InputForm.scss';

const InputForm = () => {
  const [venueSlug, setVenueSlug] = useState<VenueSlug | ''>('');
  const [cartValue, setCartValue] = useState<number | ''>('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown | null>(null);

  const handleCalculatePrice = async () => {
    const validationError = validateForm({
      venueSlug,
      cartValue: cartValue.toString(),
      latitude,
      longitude,
    });

    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);

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

      if (deliveryDistance > distanceRanges[distanceRanges.length - 1].min) {
        setError(
          `Delivery not available for this distance. Your location is ${formatDistance(
            deliveryDistance
          )} away, but maximum delivery distance is ${formatDistance(
            distanceRanges[distanceRanges.length - 1].min
          )}.`
        );
        return;
      }

      const deliveryFee = calculateDeliveryFee(deliveryDistance, distanceRanges, basePrice);
      const smallOrderSurcharge = Math.max(0, orderMinimum - Number(cartValue));
      const totalPrice = Number(cartValue) + deliveryFee + smallOrderSurcharge;

      setPriceBreakdown({
        cartValue: Number(cartValue),
        smallOrderSurcharge,
        deliveryFee,
        deliveryDistance,
        totalPrice,
      });
    } catch (err) {
      setError('Failed to fetch venue data. Please check the venue slug and try again.');
      console.error('API Error:', err);
    }
  };

  const handleGetLocation = () => {
    if (!venueSlug) {
      setError('Please select a venue first!');
      return;
    }

    const suggestedCoords = getSuggestedCoordinates(venueSlug);
    if (suggestedCoords) {
      setLatitude(suggestedCoords.latitude.toString());
      setLongitude(suggestedCoords.longitude.toString());
      setWarning('Using test coordinates within delivery range.');
      return;
    }

    getUserLocation(
      (position) => {
        setLatitude(position.coords.latitude.toString());
        setLongitude(position.coords.longitude.toString());
      },
      (errorMessage) => {
        setError(errorMessage);
      }
    );
  };

  return (
    <Container className="input-form mt-4">
      <img src="/wolt-logo-white.png" alt="Wolt Logo" className="input-form__logo" />
      <Form className="input-form__form">
        <h3 className="input-form__heading">Delivery Order Price Calculator</h3>

        {error && (
          <Alert variant="danger" role="alert" aria-live="assertive" className="input-form__error">
            {error}
          </Alert>
        )}

        {warning && (
          <Alert variant="warning" role="alert" aria-live="polite" className="input-form__warning">
            {warning}
          </Alert>
        )}

        <FormFields
          venueSlug={venueSlug}
          setVenueSlug={setVenueSlug}
          cartValue={cartValue}
          setCartValue={setCartValue}
          latitude={latitude}
          setLatitude={setLatitude}
          longitude={longitude}
          setLongitude={setLongitude}
          handleGetLocation={handleGetLocation}
          handleCalculatePrice={handleCalculatePrice}
        />

        <PriceBreakdownComponent
          breakdown={
            priceBreakdown || {
              cartValue: 0,
              smallOrderSurcharge: 0,
              deliveryFee: 0,
              deliveryDistance: 0,
              totalPrice: 0,
            }
          }
        />
      </Form>
    </Container>
  );
};

export default InputForm;
