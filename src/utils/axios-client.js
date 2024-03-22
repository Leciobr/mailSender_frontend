import axios from 'axios';

// Create a function that returns a new Axios instance with custom configuration
const createApiClient = (baseURL, headers) => {
  return axios.create({
    baseURL: baseURL,
    headers: headers,
  });
};

export default createApiClient;