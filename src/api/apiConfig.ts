import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://127.0.0.1:3333',
  headers: {
    Authorization:
      'Bearer NQ.dX0pQjpCn_vr9E97FKA7hbwbZXnmhrVOpVwkZuJwJZYlajl7TC-rQwZsNIng',
  },
});
