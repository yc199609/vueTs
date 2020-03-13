<template>
    <div class="login-container">
        <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            autocomplete="on"
            label-position="left"
        >
            <div class="title-container">
                <h3 class="title">
                    登录
                </h3>
            </div>

            <el-form-item prop="mobile">
                <span class="svg-container">
                    <!-- <svg-icon name="user" /> -->
                    <i class="el-icon-s-custom"></i>
                </span>
                <el-input
                    ref="mobile"
                    v-model.number="loginForm.mobile"
                    name="mobile"
                    type="text"
                    autocomplete="on"
                    placeholder="mobile"
                />
            </el-form-item>

            <el-form-item prop="password">
                <span class="svg-container">
                    <i class="el-icon-lock"></i>
                    <!-- <svg-icon name="password" /> -->
                </span>
                <el-input
                    :key="passwordType"
                    ref="password"
                    v-model="loginForm.password"
                    :type="passwordType"
                    placeholder="password"
                    name="password"
                    autocomplete="on"
                    @keyup.enter.native="handleLogin"
                />
                <span
                    class="show-pwd"
                    @click="showPwd"
                >
                    <i class="iconfont">{{passwordType === 'password'? '&#xe612;': '&#xe600;'}}</i>
                </span>
            </el-form-item>

            <el-button
                v-loading="loading"
                type="primary"
                style="width:100%; margin-bottom:30px;"
                @click.native.prevent="handleLogin"
            >
                登录
            </el-button>

            <div style="position:relative">
                <el-button style="float:right;" type="text">忘记密码</el-button>
            </div>
        </el-form>
    </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import { validateMobile, validatePassword } from '@/utils/validate';
import { Form as ElForm, Input } from 'element-ui';
import { Login } from '@/api/login';

@Component({
    name: 'Login',
})
export default class extends Vue {
    private loading = false;
    private loginForm = {
        mobile: 18888888888,
        password: 'gosafenet.com',
    };
    private loginRules = {
        mobile: [{ validator: validateMobile, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
    };
    private passwordType = 'password';
    private showPwd() {
        if (this.passwordType === 'password') {
            this.passwordType = '';
        } else {
            this.passwordType = 'password';
        }
        this.$nextTick(() => {
            (this.$refs.password as Input).focus();
        });
    }
    private async handleLogin() {
        (this.$refs.loginForm as ElForm).validate(async (valid: boolean) => {
            if (valid) {
                this.loading = true;
                const { data } = await Login(this.loginForm);
                this.loading = false;
                if (data.isNeedResetPassword === 0) { // 是否需要重置密码，0是，1否
                } else {
                    window.location.href = data.redirectUrl;
                }
            }
        });
    }
}
</script>
<style lang="scss" scoped>
    .login-container {
        height: 100%;
        width: 100%;
        overflow: hidden;
        background-color: #2d3a4b;
        .login-form {
            position: relative;
            width: 520px;
            max-width: 100%;
            padding: 160px 35px 0;
            margin: 0 auto;
            overflow: hidden;
        }
        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;
            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }
        .title-container {
            position: relative;
            .title {
                font-size: 26px;
                color: #eee;
                margin: 0px auto 40px auto;
                text-align: center;
                font-weight: bold;
            }
        }
        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: #889aa4;
            cursor: pointer;
            user-select: none;
        }
        .svg-container {
            padding: 6px 5px 6px 15px;
            color: #889aa4;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
        }
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;

            input {
                height: 47px;
                background: transparent !important;
                border: 0px;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                color: #eee;
                caret-color: #fff;
                -webkit-appearance: none;

                &:-webkit-autofill {
                    box-shadow: 0 0 0px 1000px #2d3a4b inset !important;
                    -webkit-text-fill-color: #fff !important;
                }
            }
        }

        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }
    }
</style>
<style scoped>
    .el-input >>> input {
        height: 47px;
        background: transparent !important;
        border: 0px;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: #eee;
        caret-color: #fff;
        -webkit-appearance: none;
    }
    .el-input >>> input:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #2d3a4b inset !important;
        -webkit-text-fill-color: #fff !important;
    }
</style>
