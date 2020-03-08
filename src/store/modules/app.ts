import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';

export enum DeviceType {
    Mobile,
    Desktop,
}

export interface IAppState {
    device: DeviceType;
    sidebar: {
        opened: boolean,
        withoutAnimation: boolean,
    };
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
    public sidebar = {
        opened: true,
        withoutAnimation: false,
    };
    public device = DeviceType.Desktop;

    @Action
    public ToggleSideBar(withoutAnimation: boolean) {
        this.TOGGLE_SIDEBAR(withoutAnimation);
    }

    @Action
    public CloseSideBar(withoutAnimation: boolean) {
      this.CLOSE_SIDEBAR(withoutAnimation);
    }

    @Action
    public ToggleDevice(device: DeviceType) {
      this.TOGGLE_DEVICE(device);
    }

    @Mutation
    private TOGGLE_SIDEBAR(withoutAnimation: boolean) {
        this.sidebar.opened = !this.sidebar.opened;
        this.sidebar.withoutAnimation = withoutAnimation;
    }

    @Mutation
    private CLOSE_SIDEBAR(withoutAnimation: boolean) {
        this.sidebar.opened = false;
        this.sidebar.withoutAnimation = withoutAnimation;
    }

    @Mutation
    private TOGGLE_DEVICE(device: DeviceType) {
        this.device = device;
    }


}

export const AppModule = getModule(App);
