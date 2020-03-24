<template>
    <el-dialog
        :visible.sync="visible"
        :closeOnClickModal="false"
        title="修改数据库配置信息"
        @close="onClose"
    >
        <el-form ref="form" :model="form" :rules="rules" label-position="left" label-width="120px">
            <el-form-item label="数据库id" prop="id">
                <el-input v-model.trim="form.id" :disabled='true' :maxlength="50"></el-input>
            </el-form-item>

            <el-form-item label="服务器IP" prop="ip">
                <el-input v-model.trim="form.ip" :maxlength="50"></el-input>
            </el-form-item>

            <el-form-item label="服务器端口" prop="port">
                <el-input v-model.trim="form.port" :maxlength="50"></el-input>
            </el-form-item>

            <el-form-item label="数据库用户名" prop="userName">
                <el-input v-model.trim="form.userName" :maxlength="50"></el-input>
            </el-form-item>

            <el-form-item label="数据库密码" prop="password">
                <el-input type="password" v-model.trim="form.password" :maxlength="50"></el-input>
            </el-form-item>

            <el-form-item label="数据库名" prop="dbName">
                <el-input v-model.trim="form.dbName" :maxlength="50"></el-input>
            </el-form-item>

            <el-switch style="display: inline-block;" v-model.trim="form.isDefault" active-color="#13ce66" inactive-color="#ff4949"
                active-text="默认数据库" inactive-text="非默认数据库" :active-value="1" :inactive-value="0">
            </el-switch>

        </el-form>
        <div slot="footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script lang='ts' >
import { Vue, Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { Form as ElForm } from 'element-ui';

import { updateConfigInfo } from '@/api/systemSetup/dataBase';
import { Dialog } from '@/mixins';
import { DB } from '../index.vue';

@Component({
    name: 'modifyConfig',
})
export default class extends mixins(Dialog) {
    private form: any = {
        id: -1,
        ip: '',
        port: -1,
        userName: '',
        password: '',
        dbName: '',
        isDefault: 0,
    };
    private rules = {
        id: [{ required: true, message: 'id不能为空', trigger: 'blur' }],
        ip: [{ required: true, message: 'ip不能为空', trigger: 'blur' }],
        port: [{ required: true, message: '服务器端口不能为空', trigger: 'blur' }],
        userName: [{ required: true, message: '数据库用户名不能为空', trigger: 'blur' }],
        dbName: [{ required: true, message: '数据库名不能为空', trigger: 'blur' }],
    };
    public init(data: DB) {
        this.visible = true;
        this.form = data;
    }
    private submit() {
        (this.$refs.form as ElForm).validate(async (valid: boolean) => {
            if (valid) {
                await updateConfigInfo(this.form);
                this.$message({
                    type: 'success',
                    message: '修改成功',
                    duration: 500,
                    onClose: () => {
                        this.visible = false;
                    },
                });
            }
        });
    }
}
</script>
