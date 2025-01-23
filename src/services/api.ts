import axios from 'axios';

const BASE_URL = 'https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues';

export const fetchVenueStaticData = async (venueSlug: string) => {
    const response = await axios.get(`${BASE_URL}/${venueSlug}/static`);
    console.log('Static Data Response:', response.data);
    return response.data;
};

export const fetchVenueDynamicData = async (venueSlug: string) => {
    const response = await axios.get(`${BASE_URL}/${venueSlug}/dynamic`);
    console.log('Dynamic Data Response:', response.data);
    return response.data;
};