<template>
    <el-dialog
        :visible.sync="visible"
        :closeOnClickModal="false"
        :title="modelOption.title"
        @close="onClose"
    >
        <el-form>
            <el-form-item label="上级功能" prop="fucntionParentId">
                <el-cascader
                    v-model="form.functionParentId"
                    :options="fnOptions"
                    :props="{
                        value: 'functionId',
                        label: 'functionName',
                        children: 'nodes',
                        checkStrictly: true
                    }"
                    :show-all-levels="false"
                    clearable/>
            </el-form-item>

            <el-form-item label="上级菜单" prop="menuParentId">
                <el-cascader
                    v-model="form.menuParentId"
                    :options="menuOptions"
                    :props="{
                        value: 'menuId',
                        label: 'menuName',
                        children: 'nodes',
                        checkStrictly: true
                    }"
                    :show-all-levels="false"
                    clearable/>
            </el-form-item>

            <el-form-item label="功能名称" prop="functionName">
                <el-input v-model="form.functionName" :maxlength="30"/>
            </el-form-item>

            <el-form-item label="功能代码" prop="functionCode">
                <el-input v-model.number="form.functionCode" :maxlength="30"/>
            </el-form-item>

            <el-form-item label="菜单名称" prop="menuName">
                <el-input v-model="form.menuName" :maxlength="30"/>
            </el-form-item>

            <el-form-item label="菜单代码" prop="menuCode">
                <el-input v-model.number="form.menuCode" :maxlength="30"/>
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

import { TreeNode } from './index.vue';
import { createMenuFunction, updateMenuFunction } from '@/api/dms/fnTree';
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
    @Prop({ default: [] }) private readonly nodes!: TreeNode[];
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

    public init(data?: TreeNode) {
        this.visible = true;
        this.fnOptions[0].nodes = this.nodes;
        this.menuOptions[0].nodes = this.nodes;
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
        await createMenuFunction({
            ...(this.form as InsertFormType),
            functionParentId: this.functionParentId,
            menuParentId: this.menuParentId,
            system: 1,
            opType: this.opType,
        });
    }

    private async handleModify() {
        await updateMenuFunction({
            ...(this.form as ModifyFormType),
            functionParentId: this.functionParentId,
            menuParentId: this.menuParentId,
            opType: this.opType,
        });
    }
}
</script>
