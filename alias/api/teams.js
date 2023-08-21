import axiosInstance from '../utils/axios';

const url = '/api/team';

const getTeams = () => axiosInstance.get();

const deleteTeam = (id) => axiosInstance.delete(`${url}/${id}`);

const addNewTeam = (data) => axiosInstance.post(url, data);

export default {
  getTeams,
  deleteTeam,
  addNewTeam,
}