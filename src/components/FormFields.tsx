import { Form, Button } from 'react-bootstrap';
import type { VenueSlug } from '../utils';

interface FormFieldsProps {
  venueSlug: VenueSlug | '';
  setVenueSlug: (value: VenueSlug | '') => void;
  cartValue: number | '';
  setCartValue: (value: number | '') => void;
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
}) => (
  <Form className="input-form__form">
    <h2>Details</h2>
    <Form.Group className="mb-3" controlId="venueSlug">
      <Form.Label>Venue Slug</Form.Label>
      <Form.Control
        type="text"
        placeholder="home-assignment-venue-tallinn"
        value={venueSlug}
        onChange={(e) => setVenueSlug(e.target.value as VenueSlug)}
        required
      />
      <Form.Text className="text-muted">
        Use "home-assignment-venue-tallinn" or "home-assignment-venue-helsinki"
      </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="cartValue">
      <Form.Label>Cart Value (EUR)</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter the cart value"
        value={cartValue === '' ? '' : cartValue.toString()}
        onChange={(e) => setCartValue(Number(e.target.value) || '')}
        required
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
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="longitude">
      <Form.Label>User Longitude</Form.Label>
      <Form.Control
        type="number"
        placeholder="Enter your longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        required
      />
    </Form.Group>

    <div className="input-form__buttons">
      <Button
        variant="primary"
        className="input-form__button"
        onClick={handleGetLocation}
        data-test-id="getLocation"
      >
        Get Location
      </Button>
      <Button
        variant="primary"
        className="input-form__button"
        onClick={handleCalculatePrice}
        data-test-id="calculateDeliveryPrice"
      >
        Calculate Delivery Price
      </Button>
    </div>
  </Form>
);

export default FormFields;
