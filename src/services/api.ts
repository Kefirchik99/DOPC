import axios from 'axios';

const BASE_URL = 'https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues';

export const fetchVenueStaticData = async (venueSlug: string) => {
    const response = await axios.get(`${BASE_URL}/${venueSlug}/static`);
    return response.data;
};

export const fetchVenueDynamicData = async (venueSlug: string) => {
    const response = await axios.get(`${BASE_URL}/${venueSlug}/dynamic`);
    return response.data;
};