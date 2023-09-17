import axios from 'axios';

const GOOGLE_PLACES_API_KEY = 'AIzaSyB9OXlWAJumreIyb3fCWxUSMMdIeXRRjmU';

// Function to fetch nearby places based on a location (e.g., trip's destination)
const fetchRecommendedPlaces = async location => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=5000&type=tourist_attraction&key=${GOOGLE_PLACES_API_KEY}`,
    );

    if (response.data.status === 'OK') {
      return response.data.results;
    } else {
      console.error('Google Places API error:', response.data.status);
      return [];
    }
  } catch (error) {
    console.error('Error fetching nearby places:', error);
    return [];
  }
};

export {fetchRecommendedPlaces};
