import axios, { AxiosInstance } from 'axios';

const BASE_URL = process.env.SERVER_URL

const getToken = (): string | null => {
  return localStorage.getItem('token')
}

const UnauthorizedService: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

const AuthorizedService: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

AuthorizedService.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${getToken()}`
  return config
})

export { UnauthorizedService, AuthorizedService };
