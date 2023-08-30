import axiosInstance from '../utils/axios';

const url = '/api/result';

const getResults = (id) => axiosInstance.get(`${url}/${id}`);
const deleteResult = (id) => axiosInstance.delete(`${url}/${id}`);
const addNewResult = (data) => axiosInstance.post(url, data);

export default {
  getResults,
  deleteResult,
  addNewResult
}