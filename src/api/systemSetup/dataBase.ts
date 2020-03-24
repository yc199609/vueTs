import request from '@/utils/request';

export const dataBaseList = (data: { keyword?: string }) => request({
    url: '/api/Operation/DataBase/List',
    method: 'get',
    params: data,
});

export const updateBaseInfo = (obj: { id: number, name: string }) => request({
    url: '/api/Operation/DataBase/UpdateBaseInfo',
    method: 'post',
    data: obj,
});

export const updateConfigInfo = (obj: {
    id: number,
    ip: string,
    port: number;
    userName: string,
    password: string,
    dbName: string,
    isDefault: number,
}) => request({
    url: '/api/Operation/DataBase/UpdateConfigInfo',
    method: 'post',
    data: obj,
});

export const updateStatus = (obj: { id: number, status: number }) => request({
    url: '/api/Operation/DataBase/UpdateStatus',
    method: 'post',
    data: obj,
});
