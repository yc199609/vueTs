<template>
    <el-dialog
        :visible.sync="visible"
        :closeOnClickModal="false"
        :title="modelOption.title"
        @close="onClose"
    >
        <el-form>
            <el-form-item label="类型名称" >
                <el-input ></el-input>
            </el-form-item>

            <el-form-item label="类型编码" prop="menuParentId">
                <el-input></el-input>
            </el-form-item>

            <el-form-item label="描述" prop="functionName">
                <el-input v-model="form.functionName" :maxlength="30"/>
            </el-form-item>

            <el-form-item label="是否板载传感器(0为否,1为是)" prop="functionCode">
                <el-input v-model.number="form.functionCode" :maxlength="30"/>
            </el-form-item>

        </el-form>
        <div slot="footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button @click="submit">确定</el-button>
        </div>
    </el-dialog>
</template>

<script lang='ts' >
import _ from 'lodash';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

import { createType, modifyType } from '@/api/instructions/type';
import { Dialog } from '@/mixins';

interface InsertFormType {
    functionName: string;
    functionCode: string;
    menuName: string;
    menuCode: string;
    functionParentId: number[];
    menuParentId: number[];
}

interface ModifyFormType {
    menuId: number;
    functionId: number;
    functionName: string;
    functionCode: string;
    menuName: string;
    menuCode: string;
    functionParentId: number[] | number;
    menuParentId: number[] | number;
}

enum Model {
    modify,
    insert,
}

@Component({
    name: 'edit',
})
export default class extends mixins(Dialog) {
    private form: InsertFormType | ModifyFormType = {
        functionName: '',
        functionCode: '',
        menuName: '',
        menuCode: '',
        functionParentId: [],
        menuParentId: [],
    };

    private model: Model = Model.insert;

    private get opType(): number {
        if (this.form.menuName && this.form.functionName) {
            return 3;
        } else if (this.form.menuName) {
            return 1;
        } else {
            return 2;
        }
    }
    private get modelOption() {
        if (this.model === Model.insert) {
            return {
                title: '新增功能',
                msg: '新增成功',
                fn: this.handleInsert,
            };
        } else {
            return {
                title: '功能详情',
                msg: '修改成功',
                fn: this.handleModify,
            };
        }
    }
    private get functionParentId(): number {
        if (_.isArray(this.form.functionParentId)) {
            const fnlen = this.form.functionParentId.length;
            return fnlen > 1 ? this.form.functionParentId[fnlen - 1] : -1;
        } else {
            return this.form.functionParentId;
        }
    }
    private get menuParentId(): number {
        if (_.isArray(this.form.menuParentId)) {
            const menulen = this.form.menuParentId.length;
            return menulen > 1 ? this.form.menuParentId[menulen - 1] : -1;
        } else {
            return this.form.menuParentId;
        }
    }

    private fnOptions: any = [
        {
          functionId: -1,
          functionName: '顶级功能',
          nodes: [],
        },
    ];

    private menuOptions: any = [
        {
          menuId: -1,
          menuName: '顶级菜单',
          nodes: [],
        },
    ];

    public init(data?: any) {
        console.log(data);
        this.visible = true;
        if (data) {
            this.form = _.cloneDeep(data);
            this.model = Model.modify;
        }
    }

    private async submit() {
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

    private async handleInsert() {
        // await createMenuFunction({
        //     ...(this.form as InsertFormType),
        //     functionParentId: this.functionParentId,
        //     menuParentId: this.menuParentId,
        //     system: 1,
        //     opType: this.opType,
        // });
    }

    private async handleModify() {
        // await updateMenuFunction({
        //     ...(this.form as ModifyFormType),
        //     functionParentId: this.functionParentId,
        //     menuParentId: this.menuParentId,
        //     opType: this.opType,
        // });
    }
}
</script>
