import request from '@/utils/request';

// 获取全部设备类型
export const getAllTerminalType = () => request({
    url: '/api/Terminal/TerminalType/GetAll',
    method: 'get',
});

// 删除终端类型
export const deleteTerminalType = (id: number) => request({
    url: '/api/Terminal/TerminalType/Delete',
    method: 'post',
    data: {
        id,
    },
});

// 修改终端类型
export const updateTerminalType = (obj: any) => request({
    url: '/api/Terminal/TerminalType/UpdateInfo',
    method: 'post',
    data: obj,
});

// 新增终端类型
export const createTerminalType = (obj: any) => request({
    url: '/api/Terminal/TerminalType/create',
    method: 'post',
    data: obj,
});
