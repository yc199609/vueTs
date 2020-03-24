<template>
    <el-dialog
        :visible.sync="visible"
        :closeOnClickModal="false"
        title="新增系统参数"
        @close="onClose"
    >
        <el-form ref="form" :model="form" :rules="rules">
            <el-form-item prop="name" label="参数名称">
                <el-input v-model.trim="form.name" />
            </el-form-item>

            <el-form-item label="参数代码" prop="code" >
                <el-input v-model.trim="form.code" />
            </el-form-item>

            <el-form-item label="参数值" prop="value" >
                <el-input v-model.trim="form.value" />
            </el-form-item>

            <el-form-item label="备注" prop="description" >
                <el-input v-model.trim="form.description" />
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

import { addsystemConfig } from '@/api/systemSetup/systemProp';
import { Dialog } from '@/mixins';

@Component({
    name: 'addProp',
})
export default class extends mixins(Dialog) {
    private form = {
        name: '',
        code: '',
        value: '',
        description: '',
    };
    private rules = {
        name: { required: true, message: '参数名称不能为空' },
        code: { required: true, message: '参数代码不能为空' },
        value: { required: true, message: '参数值不能为空' },
        description: { required: true, message: '备注不能为空' },
    };
    public init() {
        this.visible = true;
    }
    private submit() {
        (this.$refs.form as ElForm).validate(async (valid: boolean) => {
            if (valid) {
                await addsystemConfig(this.form);
                this.$message({
                    type: 'success',
                    message: '新增成功',
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
