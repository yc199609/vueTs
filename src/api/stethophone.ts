import request from '@/utils/request';

export const getList = (obj: { code?: string, pageIndex: number, pageSize: number }) => request({
    url: '/api/Operation/Stethophone/GetList',
    method: 'get',
    params: obj,
});

export const deleteStethophone = (code: string) => request({
    url: '/api/Operation/Stethophone/Delete',
    method: 'post',
    data: {
        code,
    },
});

export const updateStethophone = (obj: { code: string, name: string }) => request({
    url: '/api/Operation/Stethophone/Update',
    method: 'post',
    data: obj,
});

export const createStethophone = (num: number) => request({
    url: '/api/Operation/Stethophone/Create',
    method: 'post',
    data: {
        number: num,
    },
});
