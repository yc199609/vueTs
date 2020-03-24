<template>
    <el-dialog
        :visible.sync="visible"
        :closeOnClickModal="false"
        title="修改名称"
        @close="onClose"
    >
        <el-form ref="form" :model="form" :rules="rules">
            <el-form-item prop="name" label="名称">
                <el-input v-model.trim="form.name" />
            </el-form-item>
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

import { updateBaseInfo } from '@/api/systemSetup/dataBase';
import { Dialog } from '@/mixins';
import { DB } from '../index.vue';

@Component({
    name: 'changeName',
})
export default class extends mixins(Dialog) {
    public rules = {
        name: [{ required: true, message: '请输入数据库名称', trigger: 'blur' }],
    };
    private form = {
        name: '',
    };
    private id: number = -1;

    public init(data: DB) {
        this.id = data.id;
        this.form.name = data.name;
        this.visible = true;
    }
    private async submit() {
        await updateBaseInfo({
            id: this.id,
            name: this.form.name,
        });
        this.$message({
            type: 'success',
            message: '修改成功',
            duration: 500,
            onClose: () => {
                this.visible = false;
            },
        });
    }
}
</script>
