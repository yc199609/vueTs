<template>
    <el-dialog
        :append-to-body="true"
        :modal-append-to-body="false"
        :visible.sync="visible"
        :closeOnClickModal="false"
        title="新增设备部位"
        @close="onClose"
    >
        <el-form ref="form" :rules="rules" :model="form">
            <el-form-item label="部位名称" prop="name">
                <el-input v-model.trim="form.name" />
            </el-form-item>
            <el-form-item label="部位代号" prop="code">
                <el-input v-model.trim="form.code" />
            </el-form-item>
            <el-form-item label="部位描述" prop="description">
                <el-input v-model.trim="form.description" />
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click="visible = false"> 取消 </el-button>
            <el-button @click="submit"> 确定 </el-button>
        </div>
    </el-dialog>
</template>

<script lang='ts' >
import { Vue, Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { Form as ElForm } from 'element-ui';

import { Dialog } from '@/mixins';
import { createPDevicePart } from '@/api/physicalEquipment/physicalEquipmentType';

@Component({
    name: 'addDevicePart',
})
export default class extends mixins(Dialog) {
    private form = {
        name: '',
        code: '',
        description: '',
    };
    private rules = {
        name: [{ required: true, message: '请输入部位名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入部位代号', trigger: 'blur' }],
        description: [{ required: true, message: '请输入部位描述', trigger: 'blur' }],
    };
    private id: number = -1;

    public async init(id: number) {
        this.id = id;
        this.visible = true;
    }

    private async submit() {
        (this.$refs.form as ElForm).validate(async (valid) => {
            if (valid) {
                await createPDevicePart({ ...this.form, deviceTypeId: this.id });
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
