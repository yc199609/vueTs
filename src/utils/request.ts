import axios from 'axios';
import { Message } from 'element-ui';

const service = axios.create({
    baseURL: process.env.BASE_API,
    withCredentials: true, // 跨域带cookie
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
});

service.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

service.interceptors.response.use(
    (response) => {
        const res = response.data;
        if (res.code !== 0) {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000,
            });
            return Promise.reject(new Error(res.message || 'Error'));
        } else {
            return response.data;
        }
    },
    (error) => {
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000,
        });
        return Promise.reject(error);
    },
);

export default service;
