import request from '@/utils/request';

export const getCompanyList = (obj: { pageIndex: number, pageSize: number, keyword?: string }) => request({
    url: '/api/Operation/Company/List',
    method: 'get',
    params: obj,
});

export const getBaseInfoById = (id: number) => request({
    url: '/api/Operation/Company/GetBaseInfoById',
    method: 'get',
    params: {
        id,
    },
});

export interface BaseInfo {
    name: string;
    id: number;
    fullName: string;
    code: string;
    outsidePhone: string;
    insidePhone: string;
    fax: string;
    zipCode: string;
    email: string;
    offcialSite: string;
    businessScop: string;
    floor: string;
    address: string;
    loginImage: string;
    siteName: string;
    parentId: number;
}

export const updateBaseInfo = (obj: BaseInfo) => request({
    url: '/api/Operation/Company/UpdateBaseInfo',
    method: 'post',
    data: obj,
});

export interface Company {
    name: string;
    fullName: string;
    code: string;
    dbId: number;
    adminMobile: number;
    adminName: string;
    adminNickName: string;
}

export const companyCreate = (obj: Company) => request({
    url: '/api/Operation/Company/Create',
    method: 'post',
    data: obj,
});

// 数据库列表
export const dataBaseList = (keyword?: string) => request({
    url: '/api/Operation/DataBase/List',
    method: 'get',
    params: {
        keyword,
    },
});

interface SystemInfo {
    id: number;
    isDMSEnable: boolean;
    dmsSite: string;
    code: string;
    db: {
        id: number;
        name: string;
    };
}

export const updateSystemInfo = (obj: SystemInfo) => request({
    url: '/api/Operation/Company/UpdateSystemInfo',
    method: 'post',
    data: obj,
});

export const getSystemInfoById = (id: number) => request({
    url: '/api/Operation/Company/GetSystemInfoById',
    method: 'get',
    params: {
        id,
    },
});

export const getConfigById = (obj: {id: number, pageIndex: number, pageSize: number }) => request({
    url: '/api/Operation/Company/GetConfigById',
    method: 'get',
    params: obj,
});

export interface ConfigItem {
    id: number;
    companyId: number;
    value: string;
}

export const updateConfigItem = (obj: ConfigItem) => request({
    url: '/api/Operation/Company/UpdateConfigItem',
    method: 'post',
    data: obj,
});

export interface ConfigParam {
    name: string;
    code: string;
    value: string;
    description: string;
    companyId: number;
    isToPC: number;
    isToWeChat: number;
}

export const createConfigItem = (obj: ConfigParam) => request({
    url: '/api/Operation/Company/CreateConfigItem',
    method: 'post',
    data: obj,
});

export const GetPDevicesByCompanyId = (companyId: number) => request({
    url: '/api/Operation/PDevice/GetPDevicesByCompanyId',
    method: 'get',
    params: {
        companyId,
    },
});

export const getPDevice = (obj: { pageIndex: number, pageSize: number }) => request({
    url: '',
    method: 'get',
    params: obj,
});
