<template>
    <div class="navbar">
        <hamburger
            class="hamburger-container"
            :is-active="sidebar.opened"
            @toggleClick="toggleSideBar"
        />
        <Breadcrumb class="breadcrumb-container" />
        <div class="right-menu">
            <el-dropdown
                class="avatar-container right-menu-item hover-effect"
                trigger="click"
            >
                <div class="avatar-wrapper">
                    <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" class="user-avatar">
                    <i class="el-icon-caret-bottom" />
                </div>
                <el-dropdown-menu slot="dropdown">
                    <router-link to="/" tag="span">
                        <el-dropdown-item>
                            Home
                        </el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided>
                        <div @click="logout" >
                            LogOut
                        </div>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Hamburger from './hamburger.vue';
import Breadcrumb from './breadcrumb.vue';
import { AppModule } from '../../../store/modules/app';
import { UserModule } from '@/store/modules/user';

@Component({
    name: 'Navbar',
    components: {
        Hamburger,
        Breadcrumb,
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
    private logout() {
        UserModule.FedLogOut();
        location.reload();
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
    .breadcrumb-container{
        float: left;
    }
    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;

        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;
        }

        .hover-effect {
            cursor: pointer;
            transition: background .3s;

            &:hover{
                background: rgba(0, 0, 0, 0.025);
            }
        }

        .avatar-container {
            margin-right: 30px;

            .avatar-wrapper {
                margin-top: 5px;
                position: relative;

                .user-avatar {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
