import axiosInstance from '../utils/axios';

const url = '/api/player';

const getPlayers = () => axiosInstance.get(`${url}/all`);
const getPlayer = (credentials) => axiosInstance.post(`${url}/login`, credentials);
const getPlayerByToken = (header) => axiosInstance.get(`${url}/login`, header);
const deletePlayer = (id) => axiosInstance.delete(`${url}/${id}`);
const addNewPLayer = (player) => axiosInstance.post(url, player);
const addNewPLayerGoogle = (player) => axiosInstance.post(`${url}/googleSignIn`, player);
const updatePLayer = (updateFields) => axiosInstance.put(url, updateFields);
const validatePin = (data) => axiosInstance.post(`${url}/pin`, data)
const resetPlayerPassword = (data) => axiosInstance.post(`${url}/resetPassword`, data)
const checkPlayer = (data) => axiosInstance.post(`${url}/check`, data)

export default { 
  getPlayers,
  getPlayer,
  deletePlayer,
  addNewPLayer,
  updatePLayer,
  getPlayerByToken,
  validatePin,
  resetPlayerPassword,
  checkPlayer,
  addNewPLayerGoogle
}