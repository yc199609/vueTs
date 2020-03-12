import router from './router';
import { getToken } from '@/utils/auth';
import { UserModule } from '@/store/modules/user';

const whiteList = ['/login']; // 不重定向白名单

router.beforeEach((to, from, next) => {
    if (getToken()) {
        if (to.path === '/login') {
            next({path: '/'});
        } else {
            if (UserModule.name) {
                next();
            } else {
                if (UserModule.GetInfo()) {
                    next();
                } else {
                    UserModule.FedLogOut();
                    next({ path: '/login' });
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next(`/login?redirect=${to.path}`);
        }
    }
});
