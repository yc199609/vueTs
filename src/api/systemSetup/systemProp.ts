import request from '@/utils/request';

// 系统参数列表
export const systemConfigList = (data: { keyword?: string, pageIndex: number, pageSize: number }) => request({
    url: '/api/Operation/SystemConfig/List',
    method: 'get',
    params: data,
});

// 修改系统参数值
export const updatesystemConfig = (obj: any) => request({
    url: '/api/Operation/SystemConfig/Update',
    method: 'post',
    data: obj,
});

// 初始化缓存中的数据库表格Id值
export const initTableID = () => request({
    url: '/api/Operation/SystemConfig/InitTableID',
    method: 'post',
});

// 新增系统参数
export const addsystemConfig = (obj: any) => request({
    url: '/api/Operation/SystemConfig/Create',
    method: 'post',
    data: obj,
});
