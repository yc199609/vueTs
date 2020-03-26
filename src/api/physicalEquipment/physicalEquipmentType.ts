import request from '@/utils/request';

// 获取物理设备类型列表(分页)
export const getPDeviceType = (obj: {keyword?: string, pageIndex: number, pageSize: number}) => request({
    url: '/api/Operation/PDeviceType/Get',
    method: 'get',
    params: obj,
});

// 删除物理设备类型
export const deletePDeviceType = (id: number) => request({
    url: '/api/Operation/PDeviceType/Delete',
    method: 'post',
    data: {
        id,
    },
});

// 新增物理设备类型
export const createPDeviceType = (obj: {
    code: string,
    description: string,
    name: string,
}) => request({
    url: '/api/Operation/PDeviceType/Create',
    method: 'post',
    data: obj,
});

// 更新物理设备类型信息
export const updatePDeviceType = (obj: {
    id: number,
    code: string,
    description: string,
    name: string,
}) => request({
    url: '/api/Operation/PDeviceType/Update',
    method: 'post',
    data: obj,
});

// 根据ID获取物理设备类型
export const getByIdPDeviceType = (id: number) => request({
    url: '/api/Operation/PDeviceType/GetById',
    method: 'get',
    params: {
        id,
    },
});

// 根据物理设备类型获取部位
export const getPDevicePartByDeviceTypeId = (id: number) => request({
    url: '/api/Terminal/TerminalDeviceLocation/GetDeviceLocationByDeviceTypeId',
    method: 'get',
    params: {
        deviceTypeId: id,
    },
});

// 删除部位
export const deleteTerminalDeviceLocation = (id: number) => request({
    url: '/api/Terminal/TerminalDeviceLocation/Delete',
    method: 'post',
    data: {
        id,
    },
});

// 修改部位
export const updateTerminalDeviceLocation = (obj: {
    id: number,
    name: string,
    code: string,
    description: string,
    deviceTypeId: number,
}) => request({
    url: '/api/Terminal/TerminalDeviceLocation/Update',
    method: 'post',
    data: obj,
});

// 创建部位
export const createPDevicePart = (obj: {
    name: string,
    code: string,
    deviceTypeId: number,
    description: string,
}) => request({
    url: '/api/Terminal/TerminalDeviceLocation/Create',
    method: 'post',
    data: obj,
});
