import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://127.0.0.1:3333',
  headers: {
    Authorization:
      'Bearer NA.Kt_XAtURYunzLp_OVMrH619pXtctg2hEZCqlrvn9alVrcK2VbjfdIhh4EMcR',
  },
});
