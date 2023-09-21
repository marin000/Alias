import axios from 'axios';
import config from '../config/config';

const instance = axios.create({
  baseURL: config.backendServer,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Invitation': config.adminEmail
  },
});

export default instance;