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

interface PDevice {
    id?: number;
    name: string;
    code: string;
    typeId: number;
    properties: Array<{propertyName: string, propertyValue: string, isExtProperty: number}>;
}

// 新增物理设备
export const createPDevice = (obj: PDevice) => request({
    url: '/api/Operation/PDevice/Create',
    method: 'post',
    data: obj,
});

// 更新物理设备信息
export const updatePDevice = (obj: PDevice) => request({
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
    url: '/api/Operation/PDevice/GetById',
    method: 'get',
    params: {
        id,
    },
});

// 根据物理设备ID查询关联机构信息
export const getCompaniesByPDeviceId = (id: number) => request({
    url: '/api/Operation/PDevice/GetCompaniesByPDeviceId',
    method: 'get',
    params: {
        pDeviceId: id,
    },
});

// 机构列表
export const getCompanyList = (obj: {pageIndex: number, pageSize: number}) => request({
    url: '/api/Operation/Company/List',
    method: 'get',
    params: obj,
});

// 绑定物理设备与机构关系
export const bindPDeviceCompany = (obj: {
    pDevice: {
        id: number;
        name: string;
        code: string;
        typeId: number;
    },
    CompanyIds: number[],
}) => request({
    url: '/api/Operation/PDevice/BindPDeviceCompany',
    method: 'post',
    data: obj,
});

// 根据物理设备类型获取部位
export const getPDevicePartByDeviceTypeId = (deviceTypeId: number) => request({
    url: '/api/Terminal/TerminalDeviceLocation/GetDeviceLocationByDeviceTypeId',
    method: 'get',
    params: {
        deviceTypeId,
    },
});

// 根据设备与部位，获取绑定信息
export const getTerminalByIds = (obj: {deviceId: number, deviceLocationId: number}) => request({
    url: '/api/Terminal/DeviceTerminalLocation/GetTerminalByIds',
    method: 'get',
    params: obj,
});

// 获取全部终端信息
export const getAllTerminal = () => request({
    url: '/api/Terminal/Terminal/GetAll',
    method: 'get',
});

// 获取未绑定的终端列表
export const getIsNotBind = () => request({
    url: '/api/Terminal/Terminal/GetIsNotBind',
    method: 'get',
});

// 物理设备绑定
export const bindDevice = (obj: any) => request({
    url: '/api/Terminal/DeviceTerminalLocation/Create',
    method: 'post',
    data: obj,
});

// 解除物理设备绑定
export const unboundDevice = (obj: any) => request({
    url: '/api/Terminal/DeviceTerminalLocation/UnboundDevice',
    method: 'post',
    data: obj,
});
