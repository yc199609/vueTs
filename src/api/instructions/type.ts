import request from '@/utils/request';

// 获取全部指标类型
export const getAlltype = () => request({
    url: '/api/Terminal/SensorType/GetAll',
    method: 'get',
});

// 删除指标类型
export const deleteType = (id: number) => request({
    url: '/api/Terminal/SensorType/delete',
    method: 'post',
    data: {
        id,
    },
});

// 根据关键字模糊查询指标类型
export const getTypeList = (obj: {
    keyword?: string,
    pageIndex: number,
    pageSize: number,
}) => request({
    url: '/api/Terminal/SensorType/GetList',
    method: 'get',
    params: obj,
});

// 新增指标类型
export const createType = (obj: {
    name: string,
    code: string,
    description: string,
    isOnboard: 0|1,
}) => request({
    url: '/api/Terminal/SensorType/create',
    method: 'post',
    data: obj,
});

// 修改指标类型
export const modifyType = (obj: {
    id: number,
    name: string,
    code: string,
    description: string,
    isOnboard: 0|1,
}) => request({
    url: '/api/Terminal/SensorType/UpdateInfo',
    method: 'post',
    data: obj,
});

