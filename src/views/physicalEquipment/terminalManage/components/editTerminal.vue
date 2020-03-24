<template>
    <el-dialog
        :visible.sync="visible"
        :closeOnClickModal="false"
        :title="modelOption.title"
        @close="onClose"
    >
        <el-form ref="form" :model="form" label-position="left" label-width="120px">
            <el-form-item label="终端id" v-if="modelOption.show">
                <el-input disabled v-model="form.id" />
            </el-form-item>

            <el-form-item label="终端代码" prop="code">
                <el-input v-model.trim="form.code" />
            </el-form-item>
      
            <el-form-item label="终端类型" prop="terminalTypeId">
                <el-select v-model="form.terminalTypeId" placeholder="请选择">
                    <el-option
                        v-for="(item,index) in typeList"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                    />
                </el-select>
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
import { getAllTerminalType, updateTerminal, createTerminal } from '@/api/physicalEquipment/terminalManage';

enum Model {
    modify,
    insert,
}
interface InsertFormType {
    code: string;
    terminalTypeId: number | undefined;
}
interface ModifyFormType {
    id: number;
    code: string;
    terminalTypeId: number;
}

@Component({
    name: 'editTerminal',
})
export default class extends mixins(Dialog) {
    private form: InsertFormType | ModifyFormType = {
        code: '',
        terminalTypeId: undefined,
    };
    private rules = {
        code: [{ required: true, message: '请输入终端代码', trigger: 'blur' }],
        terminalTypeId: [{ required: true, message: '请选择终端类型', trigger: 'blur' }],
    };
    private typeList = [];
    private model: Model = Model.insert;

    public async init(data?: ModifyFormType) {
        this.visible = true;
        const { data: typeList} = await getAllTerminalType();
        this.typeList = typeList;
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
        interface InsertSendType {
            code: string;
            terminalTypeId: number;
        }
        return createTerminal((this.form as InsertSendType));
    }

    private handleModify() {
        return updateTerminal((this.form as ModifyFormType));
    }
}
</script>
