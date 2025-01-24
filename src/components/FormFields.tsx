import { Form, Button } from "react-bootstrap";
import type { VenueSlug } from "../utils";

interface FormFieldsProps {
  venueSlug: VenueSlug | "";
  setVenueSlug: (value: VenueSlug | "") => void;
  cartValue: number | "";
  setCartValue: (value: number | "") => void;
  latitude: string;
  setLatitude: (value: string) => void;
  longitude: string;
  setLongitude: (value: string) => void;
  handleGetLocation: () => void;
  handleCalculatePrice: () => void;
}

const FormFields: React.FC<FormFieldsProps> = ({
  venueSlug,
  setVenueSlug,
  cartValue,
  setCartValue,
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  handleGetLocation,
  handleCalculatePrice,
}) => {
  const handleVenueSlugChange = (value: string) => {
    const validSlugs: VenueSlug[] = [
      "home-assignment-venue-tallinn",
      "home-assignment-venue-helsinki",
    ];
    setVenueSlug(validSlugs.includes(value as VenueSlug) ? (value as VenueSlug) : "");
  };

  return (
    <Form className="input-form__form">
      <h2>Details</h2>

      <Form.Group className="mb-3" controlId="venueSlug">
        <Form.Label>Venue Slug</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter venue slug"
          value={venueSlug}
          onChange={(e) => handleVenueSlugChange(e.target.value)}
          required
          aria-label="Enter venue slug"
          aria-describedby="venueSlugHelp"
          data-test-id="venueSlug"
        />
        <Form.Text id="venueSlugHelp" className="text-muted">
          Example <i>home-assignment-venue-tallinn</i>
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="cartValue">
        <Form.Label>Cart Value (EUR)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter the cart value"
          value={cartValue === "" ? "" : cartValue.toString()}
          onChange={(e) => setCartValue(Number(e.target.value) || "")}
          required
          aria-label="Enter cart value in euros"
          data-test-id="cartValue"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="latitude">
        <Form.Label>User Latitude</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter your latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          required
          aria-label="Enter your latitude"
          aria-describedby="latitudeHelp"
          data-test-id="userLatitude"
        />
        <Form.Text id="latitudeHelp" className="text-muted">
          Example <i>59.433714</i>
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="longitude">
        <Form.Label>User Longitude</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter your longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          required
          aria-label="Enter your longitude"
          aria-describedby="longitudeHelp"
          data-test-id="userLongitude"
        />
        <Form.Text id="longitudeHelp" className="text-muted">
          Example <i>24.743960</i>
        </Form.Text>
      </Form.Group>

      <div className="input-form__buttons">
        <Button
          variant="primary"
          className="input-form__button"
          onClick={handleGetLocation}
          aria-label="Get your current location"
          data-test-id="getLocation"
        >
          Get Location
        </Button>
        <Button
          variant="primary"
          className="input-form__button"
          onClick={handleCalculatePrice}
          aria-label="Calculate the delivery price"
          data-test-id="calculateDeliveryPrice"
        >
          Calculate Delivery Price
        </Button>
      </div>
    </Form>
  );
};

export default FormFields;
