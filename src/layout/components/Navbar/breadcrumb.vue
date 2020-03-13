<template>
    <el-breadcrumb
        class="app-breadcrumb"
        separator-class="el-icon-arrow-right"
    >
        <transition-group name="breadcrumb">
            <el-breadcrumb-item
                v-for="(item, index) in breadcrumbs"
                :key="item.path"
            >
                <span
                    v-if="item.redirect === 'noredirect' || index === breadcrumbs.length - 1"
                    class="no-redirect"
                >{{ item.meta.title }}</span>
                <router-link
                    v-else
                    :to="handleLink(item)"
                >{{ item.meta.title }}</router-link>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script lang='ts' >
import { pathToRegexp, compile } from 'path-to-regexp';
import { Vue, Component, Watch } from 'vue-property-decorator';
import { RouteRecord, Route } from 'vue-router';

@Component({
    name: 'Breadcrumb',
})
export default class extends Vue {
    private breadcrumbs: RouteRecord[] = [];

    @Watch('$route')
    private onRouteChange(route: Route) {
        // if you go to the redirect page, do not update the breadcrumbs
        if (route.path.startsWith('/redirect/')) {
            return;
        }
        this.getBreadcrumb();
    }

    private created() {
        this.getBreadcrumb();
    }

    private getBreadcrumb() {
        let matched = this.$route.matched.filter(
            (item) => item.meta && item.meta.title,
        );
        const first = matched[0];
        if (!this.isDashboard(first)) {
            matched = [
                { path: '/dashboard', meta: { title: '首页' } } as RouteRecord,
            ].concat(matched);
        }
        this.breadcrumbs = matched.filter((item) => {
            return item.meta && item.meta.title && item.meta.breadcrumb !== false;
        });
    }

    private isDashboard(route: RouteRecord) {
        const name = route && route.meta && route.meta.title;
        return name === '首页';
    }

    private pathCompile(path: string) {
        const { params } = this.$route;
        const toPath = compile(path);
        return toPath(params);
    }

    private handleLink(item: RouteRecord) {
        const { redirect, path } = item;
        if (redirect) {
            return redirect;
        } else {
            return this.pathCompile(path);
        }
    }
}
</script>
<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}
.app-breadcrumb.el-breadcrumb{
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;
    .no-redirect {
        color: #97a8be;
        cursor: text;
    }
}
</style>
