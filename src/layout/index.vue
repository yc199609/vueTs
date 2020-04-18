<template>
    <el-scrollbar
        wrap-class="scrollbar-wrapper"
        class="app-wrapper"
        :class="classObj"
    >
        <div
            v-if="classObj.mobile && sidebar.opened"
            class="drawer-bg"
        />
        <sidebar class="sidebar-container" />
        <div class="main-container">
            <navbar />
            <app-main />
        </div>
    </el-scrollbar>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { DeviceType, AppModule } from '@/store/modules/app';

import { AppMain, Navbar, Sidebar } from './components';
import ResizeMixin from './mixin/resize';

@Component({
    name: 'Layout',
    components: {
        AppMain,
        Navbar,
        Sidebar,
    },
})
export default class extends mixins(ResizeMixin) {
    get classObj() {
        return {
            hideSidebar: !this.sidebar.opened,
            openSidebar: this.sidebar.opened,
            withoutAnimation: this.sidebar.withoutAnimation,
            mobile: this.device === DeviceType.Mobile,
        };
    }
}
</script>
<style lang="scss">
.scrollbar-wrapper{
    overflow-x: hidden !important;
}
</style>
<style lang="scss" scoped>
.app-wrapper{
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
}
.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
}

.main-container {
    min-height: 100%;
    transition: margin-left .28s;
    margin-left: $sideBarWidth;
    position: relative;
}
.sidebar-container {
    transition: width 0.28s;
    width: $sideBarWidth !important;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
}

.hideSidebar {
    .main-container {
        margin-left: 54px;
    }

    .sidebar-container {
        width: 54px !important;
    }
}

.withoutAnimation {
    .main-container,
    .sidebar-container {
        transition: none;
    }
}

/* for mobile response 适配移动端 */
.mobile {
    .main-container {
        margin-left: 0px;
    }

    .sidebar-container {
        transition: transform .28s;
        width: $sideBarWidth !important;
    }

    &.openSidebar {
        position: fixed;
        top: 0;
    }

    &.hideSidebar {
        .sidebar-container {
            pointer-events: none;
            transition-duration: 0.3s;
            transform: translate3d(-$sideBarWidth, 0, 0);
        }
    }
}


</style>
