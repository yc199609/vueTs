import store from '@/store';
import { Module, VuexModule, Mutation, getModule, Action } from 'vuex-module-decorators';

export interface IUserState {
    token: string;
    name: string;
    roles: string;
}

@Module({ dynamic: true, store, name: 'user'})
class User extends VuexModule implements IUserState {
    public token = '';
    public name = '';
    public roles = '';

    @Mutation
    private SET_TOKEN(token: string) {
        this.token = token;
    }

    // @Action
    // public async Login(userInfo: { username: string,password: string }){
    //     let { username,password} = userInfo;
    //     username = username.trim();
    //     const { data } = await this.Login
    // }
}

export const UserModule = getModule(User);
