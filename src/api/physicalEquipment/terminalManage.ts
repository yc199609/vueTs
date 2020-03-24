import request from '@/utils/request';

// 根据关键字获类型模糊查询
export const getListTerminal = (obj: {keyword?: string, pageIndex: number, pageSize: number}) => request({
    url: '/api/Terminal/Terminal/GetList',
    method: 'get',
    params: obj,
});

// 删除终端
export const deleteTerminal = (id: number) => request({
    url: '/api/Terminal/Terminal/Delete',
    method: 'post',
    data: {
        id,
    },
});

// 新增采集终端
export const createTerminal = (obj: {code: string, terminalTypeId: number}) => request({
    url: '/api/Terminal/Terminal/Create',
    method: 'post',
    data: obj,
});

// 修改采集终端
export const updateTerminal = (obj: {id: number, code: string, terminalTypeId: number}) => request({
    url: '/api/Terminal/Terminal/Update',
    method: 'post',
    data: obj,
});

// 获取全部设备类型
export const getAllTerminalType = () => request({
    url: '/api/Terminal/TerminalType/GetAll',
    method: 'get',
});
