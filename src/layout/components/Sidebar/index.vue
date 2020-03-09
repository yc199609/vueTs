<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
            :collapse="isCollapse"
            mode="vertical"
            :background-color="variables.menuBg"
            :text-color="variables.menuText"
            :active-text-color="variables.menuActiveText"
            :unique-opened="false"
            :collapse-transition="false"
        >
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">导航一</span>
                </template>

                <el-menu-item-group>
                    <span slot="title">分组一</span>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>

                <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>

                <el-submenu index="1-4">
                    <span slot="title">选项4</span>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
            </el-submenu>

            <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </el-menu-item>

            <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
            </el-menu-item>

            <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
            </el-menu-item>
        </el-menu>
    </el-scrollbar>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import variables from '@/styles/_variable.scss';
import { AppModule } from '@/store/modules/app';

@Component({
    name: 'Sidebar',
})
export default class extends Vue {
    get sidebar() {
        return AppModule.sidebar;
    }

    get variables() {
        return variables;
    }
    get isCollapse() {
        return !this.sidebar.opened;
    }
}
</script>

<style lang="scss">
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>


<style lang="scss" scoped>
.el-scrollbar {
  height: 100%
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
