import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';
import { signOut } from '../contexts/AuthContext';

let cookies = parseCookies();

let isRefreshing = false;
let failedRequestsQueue = [];

export const api = axios.create({
  baseURL: 'http://localhost:3333/api',

  headers: {
    Authorization: `Bearer ${cookies['authproject.token']}`
  }
})

api.interceptors.response.use(response => {
  return response
}, (error: AxiosError) => {
  console.log('Error Interceptor..:', error.response.status);
  console.log('response', error.response.data.error);

  if (error.response.status === 403) {
    if (error.response.data?.error === 'token.expired') {
      console.log('renew token');
      cookies = parseCookies();
      const { 'authproject.refreshToken': refreshtoken } = cookies;
      console.log('refreshtoken', refreshtoken)

      const originalConfig = error.config; //request config created to backend, to repeat if fails

      if (!isRefreshing) {
        isRefreshing = true;

        api.post('/refresh-token', {
          refresh_token: refreshtoken
        }).then(response => {
          console.log(response);
          const newTokens = response.data;
          //refresh_token, token
          setCookie(undefined, 'authproject.token', newTokens.token, {
            maxAge: 60 * 60 * 24 * 30, //30 days
            path: '/', //paths that will have this cookie information
          });
          setCookie(undefined, 'authproject.refreshToken', newTokens.refresh_token, {
            maxAge: 60 * 60 * 24 * 30, //30 days
            path: '/', //paths that will have this cookie information
          });

          //updating token in header
          console.log('success', newTokens.token);
          api.defaults.headers['Authorization'] = `Bearer ${newTokens.token}`;

          failedRequestsQueue.forEach(request => request.onSuccess(newTokens.token));
          failedRequestsQueue = [];
        }).catch(err => {
          failedRequestsQueue.forEach(request => request.onFailure(err));
          failedRequestsQueue = [];
        }).finally(() => {
          isRefreshing = false;
        })
      }

      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          onSuccess: (token: string) => {
            originalConfig.headers['Authorization'] = `Bearer ${token}`;
            resolve(api(originalConfig)); //retry all requests with new token
          },
          onFailure: (err: AxiosError) => {
            reject(err);
          },
        })
      })

    } else {
      console.log('logout user');
      signOut();

    }
  }

  return Promise.reject(error);
})