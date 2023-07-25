import axiosInstance from '../utils/axios';

const url = '/api/player';

const getPlayers = () => axiosInstance.get(`${url}/all`);
const getPlayer = (credentials) => axiosInstance.post(`${url}/login`, credentials);
const deletePlayer = (id) => axiosInstance.delete(`${url}/${id}`);
const addNewPLayer = (player) => axiosInstance.post(url, player);
const updatePLayer = (player) => axiosInstance.put(url, player);

export default {
  getPlayers,
  getPlayer,
  deletePlayer,
  addNewPLayer,
  updatePLayer
}