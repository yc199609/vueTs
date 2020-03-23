import request from '@/utils/request';

export const dataBaseList = (data: any) => request({
    url: '/api/Operation/DataBase/List',
    method: 'get',
    params: data,
});

export const updateBaseInfo = (obj: any) => request({
    url: '/api/Operation/DataBase/UpdateBaseInfo',
    method: 'post',
    data: obj,
});

export const updateConfigInfo = (obj: any) => request({
    url: '/api/Operation/DataBase/UpdateConfigInfo',
    method: 'post',
    data: obj,
});

export const updateStatus = (obj: any) => request({
    url: '/api/Operation/DataBase/UpdateStatus',
    method: 'post',
    data: obj,
});
