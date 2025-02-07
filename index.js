const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.PLACES_API_KEY;
const location = '18.922064,72.834641';
const radius = 5000;
const type = 'restaurant';

async function getRestaurantsWithPOS() {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    // console.log("response :", response)
    const restaurants = response.data.results;

    const filteredRestaurants = restaurants.filter(restaurant =>
      restaurant.types.includes('point_of_interest')
    );

    console.log(filteredRestaurants.map(r => ({
      name: r.name,
      address: r.vicinity,
      rating: r.rating,
      place_id: r.place_id
    })));
    
  } catch (error) {
    console.error('Oops, Something went worng:', error)
  }
}

getRestaurantsWithPOS();
