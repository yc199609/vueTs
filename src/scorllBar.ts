import Vue from 'vue';
import PerfectScrollbar from 'perfect-scrollbar';
// 对应的css
import 'perfect-scrollbar/css/perfect-scrollbar.css';

/**
 * @description 为自定义滚动条全局注入自定义指令。自动判断该更新PerfectScrollbar还是创建它
 * @param {Element} el - 必填。dom元素
 */
const elScrollBar = (el: any) => {
    // 在元素上加点私货，名字随便取，确保不会和已有属性重复即可，我取名叫做dmePs
    if (el.dmePs instanceof PerfectScrollbar) {
        el.dmePs.update();
    } else {
        // el上挂一份属性
        el.dmePs = new PerfectScrollbar(el, { suppressScrollX: true });
    }
};

Vue.directive('scrollbar', {
    inserted(el: any, binding) {
        const { arg } = binding;
        // 针对el-table组件的处理
        if (arg === 'el-tabel') {
            el = el.querySelector('.el-table__body-wrapper');
            if (!el) {
                return console.warn('未发现className为el-table__body-wrapper的dom');
            }
        }
        const rules = ['fixed', 'absolute', 'relative'];
        if (!rules.includes(window.getComputedStyle(el, null).position)) {
            console.error(`perfect-scrollbar所在的容器的position属性必须是以下之一：${rules.join('、')}`);
        }
        elScrollBar(el);
    },
    componentUpdated(el: any, binding, vnode: any) {
        const { arg } = binding;
        if (arg === '任何你喜欢的标记') {
            el = el.querySelector('.el-table__body-wrapper');
            if (!el) {
                return console.warn('未发现className为el-table__body-wrapper的dom');
            }
        }
        vnode.context.$nextTick(
            () => {
                try {
                    elScrollBar(el);
                } catch (error) {
                    console.error(error);
                }
            },
        );
    },
});

//  然后就可以在容器中使用v-scrollbar指令控制自动逸滚动条了，
// 如果是el-table组件则添加v-scrollbar:el-table。
// 值得注意的是，容器的positon属性需要是[“fixed”, “absolute”, “relative”]之一，并且要有高度。
