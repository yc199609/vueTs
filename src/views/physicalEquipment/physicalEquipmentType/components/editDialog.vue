<template>
    <el-dialog
        :visible.sync="visible"
        :closeOnClickModal="false"
        :title="modelOption.title"
        @close="onClose"
    >
        <el-form ref="form" :model="form" :rules="rules" label-position="left" label-width="120px">
            <el-form-item label="设备类型名称" prop="name">
                <el-input v-model.trim="form.name" />
            </el-form-item>

            <el-form-item label="设备类型编码" prop="code">
                <el-input v-model.trim="form.code" />
            </el-form-item>
      
            <el-form-item label="设备类型描述" prop="description">
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
import {
    createPDeviceType,
    updatePDeviceType,
    getByIdPDeviceType,
} from '@/api/physicalEquipment/physicalEquipmentType';

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
    name: 'editTerminal',
})
export default class extends mixins(Dialog) {
    private form: InsertFormType | ModifyFormType = {
        name: '',
        code: '',
        description: '',
    };
    private rules = {
        name: [{ required: true, message: '请输入设备类型名称', trigger: 'blur' },
        ],
        code: [
          {required: true, message: '请输入设备类型编码', trigger: 'blur' },
          { pattern: /^[a-zA-Z]+$/, message: '必须为字母组成' },
        ],
        description: [{required: true, message: '请输入设备类型描述', trigger: 'blur' }],
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
                fn: this.handleInsert,
            };
        } else {
            return {
                title: '修改',
                msg: '修改成功',
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
        return createPDeviceType((this.form as InsertFormType));
    }

    private handleModify() {
        return updatePDeviceType((this.form as ModifyFormType));
    }
}
</script>
