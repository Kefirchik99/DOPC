import { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { validateForm, getUserLocation, calculateDistance, calculateDeliveryFee } from '../utils';
import type { PriceBreakdown } from '../utils';
import { fetchVenueStaticData, fetchVenueDynamicData } from '../services';

const InputForm = () => {
    const [venueSlug, setVenueSlug] = useState('');
    const [cartValue, setCartValue] = useState(0);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown | null>(null);

    const handleCalculatePrice = async () => {
        const validationError = validateForm({ venueSlug, cartValue, latitude, longitude });
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
                setError('Delivery not available for this distance.');
                return;
            }

            const deliveryFee = calculateDeliveryFee(deliveryDistance, distanceRanges, basePrice);
            const smallOrderSurcharge = Math.max(0, orderMinimum - cartValue);
            const totalPrice = cartValue + deliveryFee + smallOrderSurcharge;

            setPriceBreakdown({
                cartValue,
                smallOrderSurcharge,
                deliveryFee,
                deliveryDistance,
                totalPrice,
            });
        } catch {
            setError('Failed to fetch venue data. Please check the venue slug and try again.');
        }
    };

    const handleGetLocation = () => {
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
        <Container className="mt-4">
            <h3 className="mb-4">Delivery Order Price Calculator</h3>
            {error && (
                <Alert variant="danger" role="alert" aria-live="assertive">
                    {error}
                </Alert>
            )}
            <Form>
                <Form.Group className="mb-3" controlId="venueSlug">
                    <Form.Label>Venue Slug</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your location"
                        value={venueSlug}
                        onChange={(e) => setVenueSlug(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="cartValue">
                    <Form.Label>Cart Value (EUR)</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="0"
                        value={cartValue}
                        onChange={(e) => setCartValue(Number(e.target.value))}
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
                <div className="d-flex gap-3">
                    <Button variant="primary" onClick={handleGetLocation}>
                        Get Location
                    </Button>
                    <Button variant="success" onClick={handleCalculatePrice}>
                        Calculate Delivery Price
                    </Button>
                </div>
            </Form>
            {priceBreakdown && (
                <div className="mt-4">
                    <h5>Price Breakdown</h5>
                    <ul>
                        <li>Cart Value: {priceBreakdown.cartValue} EUR</li>
                        <li>Small Order Surcharge: {priceBreakdown.smallOrderSurcharge} EUR</li>
                        <li>Delivery Fee: {priceBreakdown.deliveryFee} EUR</li>
                        <li>Delivery Distance: {priceBreakdown.deliveryDistance.toFixed(0)} m</li>
                        <li>Total Price: {priceBreakdown.totalPrice} EUR</li>
                    </ul>
                </div>
            )}
        </Container>
    );
};

export default InputForm;
