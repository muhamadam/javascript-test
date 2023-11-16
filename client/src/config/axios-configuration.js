import axios from 'axios';

const axiosBaseUrl = () => {
  axios.defaults.baseURL = 'http://localhost:4500/api/v1';
  return axios;
};

export {
  axiosBaseUrl
};
