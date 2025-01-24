import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDeliveryCalculator } from "../hooks/useDeliveryCalculator";
import FormFields from "./FormFields";
import PriceBreakdownComponent from "./PriceBreakdownComponent";
import WarningModal from "./modals/WarningModal";
import ErrorModal from "./modals/ErrorModal";
import type { VenueSlug } from "../utils";
import "./InputForm.scss";

const InputForm = () => {
  const [venueSlug, setVenueSlug] = useState<VenueSlug | ''>('');
  const [cartValue, setCartValue] = useState<number | ''>('');
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [isWarningVisible, setIsWarningVisible] = useState<boolean>(false);
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);

  const {
    calculatePrice,
    priceBreakdown,
    warningMessage,
    errorMessage,
    setWarningMessage,
    setErrorMessage,
  } = useDeliveryCalculator({
    venueSlug,
    cartValue,
    latitude,
    longitude,
  });

  useEffect(() => {
    setIsWarningVisible(!!warningMessage);
  }, [warningMessage]);

  useEffect(() => {
    setIsErrorVisible(!!errorMessage);
  }, [errorMessage]);

  const handleGetLocation = () => {
    if (!venueSlug) {
      setErrorMessage("Please select a valid venue slug!");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toString());
        setLongitude(position.coords.longitude.toString());
        setWarningMessage(null);
      },
      () => {
        setErrorMessage("Failed to retrieve your location. Please try again.");
      }
    );
  };

  const handleVenueSlugChange = (value: string) => {
    const validSlugs: VenueSlug[] = [
      "home-assignment-venue-tallinn",
      "home-assignment-venue-helsinki",
    ];
    if (validSlugs.includes(value as VenueSlug)) {
      setVenueSlug(value as VenueSlug);
    } else {
      setVenueSlug('');
      setErrorMessage("Invalid venue slug. Please select a valid venue.");
    }
  };

  return (
    <Container className="input-form mt-4">
      <img
        src="/wolt-logo-white.png"
        alt="Wolt Logo"
        className="input-form__logo"
      />
      <div className="input-form__form">
        <h3 className="input-form__heading">Delivery Order Price Calculator</h3>

        <FormFields
          venueSlug={venueSlug}
          setVenueSlug={handleVenueSlugChange}
          cartValue={cartValue}
          setCartValue={setCartValue}
          latitude={latitude}
          setLatitude={setLatitude}
          longitude={longitude}
          setLongitude={setLongitude}
          handleGetLocation={handleGetLocation}
          handleCalculatePrice={calculatePrice}
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
      </div>

      <WarningModal
        show={isWarningVisible}
        onClose={() => setWarningMessage(null)}
        message={warningMessage}
      />

      <ErrorModal
        show={isErrorVisible}
        onClose={() => setErrorMessage(null)}
        message={errorMessage}
      />
    </Container>
  );
};

export default InputForm;
