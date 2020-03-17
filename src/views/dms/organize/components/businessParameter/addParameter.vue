<template>
    <el-dialog 
        title="新增业务参数"
        :visible.sync="visible"
        :closeOnClickModal="false"
        :modal-append-to-body="false"
        :append-to-body="true"
        @close="onClose"
    >
        <el-form ref="form" :model="form" :rules="rules">
            <el-form-item label="代码" prop="code" label-width="50px">
                <el-input v-model="form.code" />
            </el-form-item>
            <el-form-item label="名称" prop="name" label-width="50px">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="值" label-width="50px">
                <el-input type="textarea" v-model="form.value" />
            </el-form-item>
            <el-form-item label="备注" prop="description" label-width="50px">
                <el-input v-model="form.description" />
            </el-form-item>
            <el-form-item label="是否返回PC(1为返回，0为不返回)" prop="isToPC">
                <el-input-number v-model="form.isToPC" :min="0" :max="1" />
            </el-form-item>
            <el-form-item label="是否返回微信端(1为返回，0为不返回)" prop="isToWeChat">
                <el-input-number v-model="form.isToWeChat" :min="0" :max="1" />
            </el-form-item>
        </el-form>
        <div slot="footer" >
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script lang='ts' >
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { Form as ElForm } from 'element-ui';

import { Dialog } from '@/mixins';
import { createConfigItem, ConfigParam } from '@/api/dms/organize';

@Component({
    name: 'addParameter',
})
export default class extends mixins(Dialog) {
    @Prop() private id!: number;

    private form: ConfigParam = {
        companyId: -1,
        code: '',
        name: '',
        value: '',
        description: '',
        isToPC: 0,
        isToWeChat: 0,
    };

    private rules = {
        code: [
            { required: true, message: '请输入业务参数代码', trigger: 'blur' },
        ],
        name: [
            { required: true, message: '请输入业务参数名称', trigger: 'blur' },
        ],
        value: [
            { required: true, message: '请输入业务参数值', trigger: 'blur' },
        ],
        description: [
            { required: true, message: '请输入业务参数备注', trigger: 'blur' },
        ],
    };

    public init() {
        this.visible = true;
    }

    private submit() {
        (this.$refs.form as ElForm).validate(async (valid) => {
            if (valid) {
                this.form.companyId = this.id;
                await createConfigItem(this.form);
                this.$message({
                    type: 'success',
                    message: '新增成功',
                    duration: 500,
                    onClose: () => {
                        this.$emit('hidden');
                    },
                });
            }
        });
    }
}
</script>
