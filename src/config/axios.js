import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://integracionsistemas.azurewebsites.net',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
