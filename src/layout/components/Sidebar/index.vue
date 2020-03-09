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
            <sidebar-item
                v-for="route in routes"
                :key="route.path"
                :item="route"
                :base-path="route.path"
                :is-collapse="isCollapse"
            >
            </sidebar-item>
        </el-menu>
    </el-scrollbar>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import variables from '@/styles/_variable.scss';
import { AppModule } from '@/store/modules/app';
import SidebarItem from './SidebarItem.vue';

@Component({
    name: 'Sidebar',
    components: {
        SidebarItem,
    },
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
    get routes() {
        return (this.$router as any).options.routes;
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
