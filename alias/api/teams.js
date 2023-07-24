import axiosInstance from '../utils/axios';

const url = '/api/team';

const getTeams = () => axiosInstance.get();

const deleteTeam = (id) => axiosInstance.delete(`${url}/${id}`);

const addNewTeam = (player) => axiosInstance.post(url, player);

export default {
  getTeams,
  deleteTeam,
  addNewTeam,
}