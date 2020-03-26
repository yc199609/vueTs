import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import { UserModule } from '@/store/modules/user';

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
        const status = error.response.status;
        if (status === 401) {
            MessageBox.confirm(
                '你已被登出，可以取消继续留在该页面，或者重新登录',
                '确定登出',
                {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning',
                },
            ).then(() => {
                UserModule.FedLogOut();
                location.reload();
                return Promise.reject(error);
            })
            .catch(() => {
                return Promise.reject(error);
            });
        }
        Message({
            message: error.message,
            type: 'error',
            duration: 3 * 1000,
        });
        return Promise.reject(error);
    },
);

export default service;
