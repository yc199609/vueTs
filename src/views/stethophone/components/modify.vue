<template>
    <el-dialog
        :visible.sync="visible"
        :closeOnClickModal="false"
        title="编辑"
        @close="onClose"
    >
        <el-form ref="form" :rules="rules" :model="form">
            <el-form-item label="听诊器代号" prop="code">
                <el-input v-model="form.code" />
            </el-form-item>

            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" />
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

import { Dialog } from '@/mixins';
import { Stethophone } from '../index.vue';
import { updateStethophone } from '@/api/stethophone';

@Component({
    name: 'Modify',
})
export default class extends mixins(Dialog) {
    private rules = {
        code: [{ required: true, message: '听诊器代号不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
    };
    private form = {
        code: '',
        name: '',
    };

    public init(data: Stethophone) {
        this.visible = true;
        this.form.code = data.code;
        this.form.name = data.name;
    }

    private submit() {
        (this.$refs.form as ElForm).validate(async (valid: boolean) => {
            await updateStethophone(this.form);
            this.$message({
                type: 'success',
                message: '修改成功',
                duration: 500,
                onClose: () => {
                    this.visible = false;
                },
            });
        });
    }
}
</script>
