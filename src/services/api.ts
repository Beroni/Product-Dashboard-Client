import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cmsgetty.herokuapp.com',
});

export default api;
