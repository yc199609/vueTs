import request from '@/utils/request';

export const optGetList = (obj: {pageIndex: number, pageSize: number}) => request({
    url: '/api/operation/BizLog/GetList',
    method: 'get',
    params: obj,
});

export const dmsGetList = (obj: {pageIndex: number, pageSize: number}) => request({
    url: '/api/company/BizLog/GetList',
    method: 'get',
    params: obj,
});
