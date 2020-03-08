<template>
    <div class="navbar">
        <hamburger
            class="hamburger-container"
            :is-active="sidebar.opened"
            @toggleClick="toggleSideBar"
        />
        导航栏
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Hamburger from './hamburger.vue';
import { AppModule } from '../../../store/modules/app';

@Component({
    name: 'Navbar',
    components: {
        Hamburger,
    },
})
export default class extends Vue {
    get sidebar() {
        return AppModule.sidebar;
    }
    get device() {
        return AppModule.device.toString();
    }
    private toggleSideBar() {
        AppModule.ToggleSideBar(false);
    }
}
</script>

<style lang="scss" scoped>
.navbar{
    height: 50px;
    overflow: hidden;
    position: relative;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    .hamburger-container{
        line-height: 46px;
        height: 100%;
        float: left;
        padding: 0 15px;
        cursor: pointer;
        transition: background .3s;
        -webkit-tap-highlight-color:transparent;

        &:hover {
            background: rgba(0, 0, 0, .025)
        }
    }
}
</style>
