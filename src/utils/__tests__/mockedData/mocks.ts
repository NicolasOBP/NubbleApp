import { AxiosError } from 'axios';

const simpleError: AxiosError = {
  message: 'error message',
  isAxiosError: true,
  toJSON: () => ({}),
  name: 'AxiosError',
  config: {
    url: '/api/endpoint',
  } as any,
  code: 'ERR_BAD_REQUEST',
  response: {
    data: { message: 'error message' },
    status: 400,
    statusText: 'Bad Request',
    headers: {},
    config: {} as any,
  },
  request: {} as any,
};
const errorWithoutResponse: AxiosError = {
  message: 'error message',
  isAxiosError: true,
  toJSON: () => ({}),
  name: 'AxiosError',
  config: {
    url: '/api/endpoint',
  } as any,
  code: 'ERR_BAD_REQUEST',
  request: {} as any,
};
const notAxiosError: AxiosError = {
  message: 'error message',
  isAxiosError: false,
  toJSON: () => ({}),
  name: 'AxiosError',
  config: {
    url: '/api/endpoint',
  } as any,
  code: 'ERR_BAD_REQUEST',
  response: {
    data: { message: 'error message' },
    status: 400,
    statusText: 'Bad Request',
    headers: {},
    config: {} as any,
  },
  request: {} as any,
};
const arrayError: AxiosError = {
  message: 'error message',
  isAxiosError: true,
  toJSON: () => ({}),
  name: 'AxiosError',
  config: {
    url: '/api/endpoint',
  } as any,
  code: 'ERR_BAD_REQUEST',
  response: {
    data: { errors: [{ message: 'error 1' }, { message: 'error 2' }] },
    status: 400,
    statusText: 'Bad Request',
    headers: {},
    config: {} as any,
  },
  request: {} as any,
};
const arrayUnkownError: AxiosError = {
  message: 'error message',
  isAxiosError: true,
  toJSON: () => ({}),
  name: 'AxiosError',
  config: {
    url: '/api/endpoint',
  } as any,
  code: 'ERR_BAD_REQUEST',
  response: {
    data: { errors: ['error 1', 'error 2'] },
    status: 400,
    statusText: 'Bad Request',
    headers: {},
    config: {} as any,
  },
  request: {} as any,
};

export const axiosErrors = {
  simpleError,
  arrayError,
  arrayUnkownError,
  notAxiosError,
  errorWithoutResponse,
};
export const errors = {};
