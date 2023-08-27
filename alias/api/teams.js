import axiosInstance from '../utils/axios';

const url = '/api/team';

const getTeams = () => axiosInstance.get();
const deleteTeam = (id) => axiosInstance.delete(`${url}/${id}`);
const addNewTeam = (data) => axiosInstance.post(url, data);
const updateTeam = (updateFields) => axiosInstance.put(url, updateFields);

export default {
  getTeams,
  deleteTeam,
  addNewTeam,
  updateTeam
}