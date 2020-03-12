<template>
    <div
        v-if="!item.meta || !item.meta.hidden"
        :class="['menu-wrapper', isCollapse ? 'simple-mode' : 'full-mode', {'first-level': isFirstLevel}]"
    >
        <template v-if="theOnlyOneChild && !theOnlyOneChild.children">
            <sidebar-item-link
                v-if="theOnlyOneChild.meta"
                :to="resolvePath(theOnlyOneChild.path)"
            >
                <el-menu-item
                    :index="resolvePath(theOnlyOneChild.path)"
                    :class="{'submenu-title-noDropdown': isFirstLevel}"
                >
                <i class="iconfont icon-size" v-html="theOnlyOneChild.meta.icon" />
                <span
                    v-if="theOnlyOneChild.meta.title"
                    slot="title"
                >{{ theOnlyOneChild.meta.title }}</span>
                </el-menu-item>
            </sidebar-item-link>
        </template>
        <el-submenu
            v-else
            :index="resolvePath(item.path)"
            popper-append-to-body
        >
            <template slot="title">
                <i
                    v-if="item.meta && item.meta.icon"
                    class="iconfont icon-size" 
                    v-html="item.meta.icon" 
                />
                <span
                    v-if="item.meta && item.meta.title"
                    slot="title"
                >{{ item.meta.title }}</span>
            </template>
            <template v-if="item.children">
                <sidebar-item
                    v-for="child in item.children"
                    :key="child.path"
                    :item="child"
                    :is-collapse="isCollapse"
                    :is-first-level="false"
                    :base-path="resolvePath(child.path)"
                    class="nest-menu"
                />
            </template>
        </el-submenu>
    </div>
</template>

<script lang='ts' >
import path from 'path';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';
import { isExternal } from '@/utils/validate';
import SidebarItemLink from './SidebarItemLink.vue';

@Component({
    name: 'SidebarItem',
    components: {
        SidebarItemLink,
    },
})
export default class extends Vue {
    @Prop({ required: true }) private item!: RouteConfig;
    @Prop({ default: true }) private isCollapse!: RouteConfig;
    @Prop({ default: true }) private isFirstLevel!: boolean;
    @Prop({ default: '' }) private basePath!: string;

    get showingChildNumber() {
        if (this.item.children) {
            const showingChildren = this.item.children.filter((item) => {
                if (item.meta && item.meta.hidden) {
                    return false;
                } else {
                    return true;
                }
            });
            return showingChildren.length;
        }
        return 0;
    }

    get theOnlyOneChild() {
        if (this.showingChildNumber > 1) {
            return null;
        }
        if (this.item.children) {
            for (const child of this.item.children) {
                if (!child.meta || !child.meta.hidden) {
                    return child;
                }
            }
        }
        // If there is no children, return itself with path removed,
        // because this.basePath already conatins item's path information
        return { ...this.item, path: '' };
    }

    private resolvePath(routePath: string) {
        if (isExternal(routePath)) {
            return routePath;
        }
        if (isExternal(this.basePath)) {
            return this.basePath;
        }
        return path.resolve(this.basePath, routePath);
    }
}
</script>
<style lang="scss">
.el-menu--collapse {
    .el-submenu__icon-arrow{
        display: none;
    }
}

.el-submenu.is-active > .el-submenu__title {
    color: $subMenuActiveText !important;
}

.full-mode {
    .nest-menu .el-submenu>.el-submenu__title,
    .el-submenu .el-menu-item {
        min-width: $sideBarWidth !important;
        background-color: $subMenuBg !important;

        &:hover {
            background-color: $subMenuHover !important;
        }
    }
}

.simple-mode {
    &.first-level {
        .submenu-title-noDropdown {
            padding: 0 !important;
            position: relative;

            .el-tooltip {
                padding: 0 !important;
            }
        }

        .el-submenu {
            overflow: hidden;

            &>.el-submenu__title {
                padding: 0px !important;

                .el-submenu__icon-arrow {
                    display: none;
                }

                &>span {
                    visibility: hidden;
                }
            }
        }
    }
}
</style>

<style lang="scss" scoped>
.icon-size{
    font-size: 16px;
    display: inline-block;
    width: 54px;
    text-align: center;
}

</style>
