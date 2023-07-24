import axiosInstance from '../utils/axios';

const url = '/api/player';

const getPlayers = () => axiosInstance.get();
const deletePlayer = (id) => axiosInstance.delete(`${url}/${id}`);
const addNewPLayer = (player) => axiosInstance.post(url, player);
const updatePLayer = (player) => axiosInstance.put(url, player);

export default {
  getPlayers,
  deletePlayer,
  addNewPLayer,
  updatePLayer
}