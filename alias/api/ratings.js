import axiosInstance from '../utils/axios';

const url = '/api/rating';

const getRatings = () => axiosInstance.get(url);
const addNewRating = (data) => axiosInstance.post(url, data);

export default {
  getRatings,
  addNewRating
}