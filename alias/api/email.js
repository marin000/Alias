import axiosInstance from '../utils/axios';

const url = '/api/email';

const sendEmail = (data) => axiosInstance.post(url, data);

export default {
  sendEmail
}