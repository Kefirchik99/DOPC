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

export const validateForm = ({
    venueSlug,
    cartValue,
    latitude,
    longitude,
}: {
    venueSlug: string;
    cartValue: number;
    latitude: string;
    longitude: string;
}): string | null => {
    if (!venueSlug.trim()) return 'Please enter a valid location!';
    if (cartValue <= 0) return 'Cart value must be greater than 0!';
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
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371e3; // Earth's radius in meters
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);

    const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
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
