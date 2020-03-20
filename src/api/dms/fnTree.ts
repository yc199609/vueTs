import request from '@/utils/request';

export const getMenuFunction = () => request({
    url: '/api/Operation/Menu/GetMenuFunction',
    method: 'get',
});

interface InsertMenuFunction {
    menuName: string;
    menuParentId: number;
    menuCode: string;
    menuOrderIndex?: number;
    functionName: string;
    functionCode: string;
    functionParentId: number;
    opType: number;
    system: number;
}

interface ModifyMenuFunction {
    menuId: number;
    menuName: string;
    menuParentId: number;
    menuCode: string;
    menuOrderIndex?: number;
    functionName: string;
    functionCode: string;
    functionParentId: number;
    opType: number;
}

export const updateMenuFunction = (obj: ModifyMenuFunction) => request({
    url: '/api/Operation/Menu/UpdateMenuFunction',
    method: 'post',
    data: obj,
});

export const deleteMenuFunction = (obj: {menuId?: number, functionId?: number}) => request({
    url: '/api/Operation/Menu/DeleteMenuFunction',
    method: 'post',
    data: obj,
});

export const createMenuFunction = (obj: InsertMenuFunction) => request({
    url: '/api/Operation/Menu/CreateMenuFunction',
    method: 'post',
    data: obj,
});
