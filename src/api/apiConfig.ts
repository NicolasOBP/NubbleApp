import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://127.0.0.1:3333',
  headers: {
    Authorization:
      'Bearer MQ.gwCE1xVLw0Qd1nHnW23t3Q8Igtw6QHCsq3HDDpoYlTJ6_2zXMK8dVvI_Q33B',
  },
});
