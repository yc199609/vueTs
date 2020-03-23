<template>
    <el-dialog
        :visible.sync="visible"
        :closeOnClickModal="false"
        title="新增"
        @close="onClose"
    >
        <el-form ref="form" :model="form">
            <el-form-item label="添加个数">
                <el-input-number v-model.number="form.number" :min="1" />
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
import { createStethophone } from '@/api/stethophone';

@Component({
    name: 'Insert',
})
export default class extends mixins(Dialog) {
    private form = {
        number: 1,
    };

    public init() {
        this.visible = true;
    }
    private async submit() {
        await createStethophone(this.form.number);
        this.$message({
            type: 'success',
            message: '新增成功',
            duration: 500,
            onClose: () => {
                this.visible = false;
            },
        });
    }
}
</script>
