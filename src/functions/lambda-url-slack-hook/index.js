import { Client } from '@googlemaps/google-maps-services-js';
import postcodes from 'node-postcodes.io';

const client = new Client({});

export const lambdaUrlSlackHook = async function lambdaUrlSlackHook(event) {
  const { body } = event;

  const buff = Buffer.from(body, 'base64');
  const text = buff.toString();
  const data = new URLSearchParams(text);

  const inputError = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      response_type: 'ephemeral',
      text: 'Invalid postcode',
    }),
  };

  if (!data.get('text')) return inputError;

  let postcodeData;

  try {
    postcodeData = await postcodes.lookup(data.get('text'));
  } catch (err) {
    console.log(err);
  }

  if (postcodeData.status === 404 || !postcodeData) return inputError;

  let r;
  if (postcodeData) {
    try {
      r = await client.placesNearby({
        params: {
          location: { lat: postcodeData.result.latitude, lng: postcodeData.result.longitude },
          key: process.env.GOOGLE_MAPS_API_KEY,
          type: 'bar',
          rankby: 'distance',
        },
        timeout: 1000, // milliseconds
      });
    } catch (err) {
      console.log('err', err);
    }
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      response_type: 'ephemeral',
      text: `${r.data.results[0].name}, ${r.data.results[0].vicinity}`,
    }),
  };
};

export default lambdaUrlSlackHook;
