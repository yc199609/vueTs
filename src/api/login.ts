import request from '@/utils/request';

export const Login = (loginForm: { mobile: number, password: string }) => request({
    url: '/api/User/OptLogin',
    method: 'post',
    data: loginForm,
});

export const getInfo = () => request({
    url: '/api/User/OptWhoami',
    method: 'get',
});
