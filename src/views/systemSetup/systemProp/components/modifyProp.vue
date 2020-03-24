<template>
    <el-dialog
        :visible.sync="visible"
        :closeOnClickModal="false"
        title="修改参数"
        @close="onClose"
    >
        <el-form ref="form" :model="form" :rules="rules">
            <el-form-item prop="value" label="参数值">
                <el-input v-model.trim="form.value" />
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

import { updatesystemConfig } from '@/api/systemSetup/systemProp';
import { Dialog } from '@/mixins';

@Component({
    name: 'modifyProp',
})
export default class extends mixins(Dialog) {
    private id = -1;
    private form = {
        value: '',
    };
    private rules = {
        value: { required: true, message: '参数值不能为空' },
    };
    public init(data: {id: number, value: string}) {
        this.id = data.id;
        this.form.value = data.value;
        this.visible = true;
    }
    private submit() {
        (this.$refs.form as ElForm).validate(async (valid: boolean) => {
            if (valid) {
                await updatesystemConfig({...this.form, id: this.id});
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
