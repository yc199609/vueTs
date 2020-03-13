import request from '@/utils/request';

export const getCompanyList = (obj: { pageIndex: number, pageSize: number, keyword?: string }) => request({
    url: '/api/Operation/Company/List',
    method: 'get',
    params: obj,
});
