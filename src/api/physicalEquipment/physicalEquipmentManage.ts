import request from '@/utils/request';

// 获取物理设备列表(分页)
export const getPDevice = (obj: {keyword?: string, pageIndex: number, pageSize: number}) => request({
    url: '/api/Operation/PDevice/Get',
    method: 'get',
    params: obj,
});

// 获取物理设备列表(分页)
export const deletePDevice = (id: number) => request({
    url: '/api/Operation/PDevice/Delete',
    method: 'post',
    data: {
        id,
    },
});

// 获取所有物理设备类型
export const getAllPDeviceType = () => request({
    url: '/api/Operation/PDeviceType/GetAll',
    method: 'get',
});

// 新增物理设备
export const createPDevice = (obj: any) => request({
    url: '/api/Operation/PDevice/Create',
    method: 'post',
    data: obj,
});

// 更新物理设备信息
export const updatePDevice = (obj: any) => request({
    url: '/api/Operation/PDevice/Update',
    method: 'post',
    data: obj,
});

// 获取设备属性列表
export const getPropertyList = () => request({
    url: '/api/Operation/PDeviceProperty/GetPropertyList',
    method: 'get',
});

// 根据ID获取物理设备
export const getPDeviceById = (id: number) => request({
    url: '',
    method: 'get',
    params: {
        id,
    },
});
