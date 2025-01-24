export type DistanceRange = {
    min: number;
    max: number;
    a: number;
    b: number;
    flag: null;
};

export type PriceBreakdown = {
    cartValue: number;
    smallOrderSurcharge: number;
    deliveryFee: number;
    deliveryDistance: number;
    totalPrice: number;
};

export type Coordinates = {
    latitude: number;
    longitude: number;
};

// Define the venue slugs
export type VenueSlug = 'home-assignment-venue-tallinn' | 'home-assignment-venue-helsinki';

// Define the structure for venue coordinates
type VenueCoordinates = {
    venue: Coordinates;
    validTest: Coordinates;
};

// Define the test coordinates structure
export const TEST_COORDINATES: Record<VenueSlug, VenueCoordinates> = {
    'home-assignment-venue-tallinn': {
        venue: { latitude: 59.4385937, longitude: 24.7513679 },
        validTest: { latitude: 59.4385937, longitude: 24.7613679 },
    },
    'home-assignment-venue-helsinki': {
        venue: { latitude: 60.17094, longitude: 24.93087 },
        validTest: { latitude: 60.17094, longitude: 24.94087 },
    },
};

export const validateForm = ({
    venueSlug,
    cartValue,
    latitude,
    longitude,
}: {
    venueSlug: string;
    cartValue: string;
    latitude: string;
    longitude: string;
}): string | null => {
    if (!venueSlug.trim()) return 'Please enter a valid location!';
    if (!['home-assignment-venue-helsinki', 'home-assignment-venue-tallinn'].includes(venueSlug)) {
        return 'Please use either "home-assignment-venue-helsinki" or "home-assignment-venue-tallinn"';
    }
    if (cartValue.trim() === '' || parseFloat(cartValue) <= 0) return 'Cart value must be greater than 0!';
    if (!latitude.trim() || !longitude.trim()) return 'Please enter valid latitude and longitude!';
    return null;
};

export const getUserLocation = (
    onSuccess: (position: GeolocationPosition) => void,
    onError: (error: string) => void
): void => {
    if (!navigator.geolocation) {
        onError('Geolocation is not supported by your browser.');
        return;
    }
    navigator.geolocation.getCurrentPosition(onSuccess, () => {
        onError('Unable to retrieve your location.');
    });
};

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    console.log('Calculating distance between:');
    console.log('Point 1 (User):', { lat: lat1, lon: lon1 });
    console.log('Point 2 (Venue):', { lat: lat2, lon: lon2 });

    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371e3; // Earth's radius in meters
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);

    const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    console.log('Calculated distance:', distance);
    return distance;
};

export const calculateDeliveryFee = (
    distance: number,
    distanceRanges: DistanceRange[],
    basePrice: number
): number => {
    let deliveryFee = basePrice;

    for (const range of distanceRanges) {
        if (distance >= range.min && (range.max === 0 || distance < range.max)) {
            deliveryFee += range.a + Math.round((range.b * distance) / 10);
            break;
        }
    }

    return deliveryFee;
};

export const getSuggestedCoordinates = (venueSlug: string): Coordinates | null => {
    return TEST_COORDINATES[venueSlug as VenueSlug]?.validTest || null;
};

export const formatDistance = (meters: number): string => {
    return meters >= 1000 
        ? `${(meters / 1000).toFixed(1)}km` 
        : `${Math.round(meters)}m`;
};
