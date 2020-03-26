<template>
    <el-dialog
        :visible.sync="visible"
        :closeOnClickModal="false"
        :title="modelOption.title"
        @close="onClose"
    >
        <el-form ref="form" :rules="rules" :model="form" label-position="left" label-width="140px">
            <el-form-item label="采集设备类型名称" prop="name">
                <el-input v-model="form.name" />
            </el-form-item>

            <el-form-item label="类型代码(型号)" prop="code">
                <el-input v-model.trim="form.code" />
            </el-form-item>
      
            <el-form-item label="类型描述说明" prop="description">
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
import _ from 'lodash';

import { Dialog } from '@/mixins';
import { updateTerminalType, createTerminalType } from '@/api/physicalEquipment/terminalType';

enum Model {
    modify,
    insert,
}
interface InsertFormType {
    name: string;
    code: string;
    description: string;
}
interface ModifyFormType {
    id: number;
    name: string;
    code: string;
    description: string;
}

@Component({
    name: 'editTerminalType',
})
export default class extends mixins(Dialog) {
    private form: InsertFormType | ModifyFormType = {
        name: '',
        code: '',
        description: '',
    };
    private rules = {
        name: [{ required: true, message: '请输入采集设备类型名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入类型代码（型号）', trigger: 'blur' }],
        description: [{ required: true, message: '请输入类型描述说明', trigger: 'blur' }],
    };

    private model: Model = Model.insert;

    public async init(data?: ModifyFormType) {
        this.visible = true;
        if (data) {
            this.model = Model.modify;
            (this.form as ModifyFormType) = _.cloneDeep(data);
        }
    }

    private get modelOption() {
        if (this.model === Model.insert) {
            return {
                title: '新增',
                msg: '新增成功',
                show: false,
                fn: this.handleInsert,
            };
        } else {
            return {
                title: '修改',
                msg: '修改成功',
                show: true,
                fn: this.handleModify,
            };
        }
    }

    private async submit() {
        (this.$refs.form as ElForm).validate(async (valid: boolean) => {
            if (valid) {
                await this.modelOption.fn();
                this.$message({
                    type: 'success',
                    message: this.modelOption.msg,
                    duration: 500,
                    onClose: () => {
                        this.visible = false;
                    },
                });
            }
        });
    }

    private handleInsert() {
        return createTerminalType((this.form as InsertFormType));
    }

    private handleModify() {
        return updateTerminalType((this.form as ModifyFormType));
    }
}
</script>
