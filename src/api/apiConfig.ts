import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://127.0.0.1:3333',
  headers: {
    Authorization:
      'Bearer Mg._WzTQXvXxG6ndCYLuCxERvTanI2gDz59Z6XZeEW92e-g4aQ0QFM5Qk02a3J_',
  },
});
