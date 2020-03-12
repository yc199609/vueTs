import store from '@/store';
import { Module, VuexModule, Mutation, getModule, Action } from 'vuex-module-decorators';
import { getInfo } from '@/api/login';
import router, { getRoute, asyncRouter } from '@/router';
import {removeToken} from '@/utils/auth';

interface Fn {
    id: string;
    name: string;
    code: string;
}

export interface IUserState {
    name: string;
    functions: Fn[];
}

@Module({ dynamic: true, store, name: 'user'})
class User extends VuexModule implements IUserState {
    public name = '';
    public functions: Fn[] = [];

    @Action
    public async GetInfo() {
        const { data } = await getInfo();
        if (data.userInfo) {
            this.SET_NAME(data.userInfo.userName);
            this.SET_FUCTIONS(data.userInfo.functions);
            // console.log(asyncRouter);
            const routes = getRoute(asyncRouter, data.userInfo.menus);
            console.log(routes);
            routes.push({path: '*', redirect: '/404', hidden: true});
            (router as any).options.routes = [...(router as any).options.routes, ...routes];
            router.addRoutes(routes);
            return data;
        } else {
            return false;
        }
    }

    @Action
    public async FedLogOut() {
        this.SET_NAME('');
        this.SET_FUCTIONS([]);
        removeToken();
    }

    @Mutation
    private SET_NAME(name: string) {
        this.name = name;
    }

    @Mutation
    private SET_FUCTIONS(functions: Fn[]) {
        this.functions = functions;
    }

}

export const UserModule = getModule(User);
