import { Platform } from 'react-native';
import axios from 'axios';

const baseURL =
  Platform.OS === 'android' ? 'http://172.16.100.151:3000' : 'http://localhost:3000';

const instance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
