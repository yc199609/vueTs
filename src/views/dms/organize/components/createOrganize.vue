<template>
    <el-dialog :visible.sync="visible" :closeOnClickModal="false" @close="onClose" title="创建机构">
        <div
            style="padding:0 30px 30px;"
            class="container"
        >
            <el-form :model="form" :rules="rules" ref="form">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="简称" prop="name">
                            <el-input v-model="form.name" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="名称" prop="fullName">
                            <el-input v-model="form.fullName" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="代码" prop="code">
                            <el-input v-model="form.code" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="数据库" prop="dbId"><br>
                            <el-select
                                v-model="form.dbId"
                                placeholder="请选择数据库名称"
                            >
                                <el-option
                                    v-for="item in baseList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <span>管理员</span>
                <hr style="background-color:#f7eaea; height: 1px; border: none;">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="手机号" prop="adminMobile">
                            <el-input v-model.number="form.adminMobile" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                    
                    <el-col :span="12">
                        <el-form-item label="姓名" prop="adminName">
                        <el-input v-model="form.adminName" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="昵称" prop="adminNickName">
                            <el-input v-model="form.adminNickName" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-button
                    type="primary"
                    style="float: right;"
                    @click="submit"
                >保存</el-button>

                <el-button
                    style="float: right; margin-right: 15px;"
                    @click="closeInfo"
                >取消</el-button>

            </el-form>
        </div>
    </el-dialog>
</template>

<script lang='ts' >
import { Vue, Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { Form as ElForm } from 'element-ui';

import { Company, companyCreate, dataBaseList } from '@/api/dms/organize';
import Dialog from '@/mixins/dialog';

interface Base {
    id: number;
    name: string;
}
@Component({
    name: 'CreateOrganize',
})
export default class extends mixins(Dialog) {
    private form: any = {
        name: '',
        fullName: '',
        code: '',
        dbId: undefined,
        adminMobile: undefined,
        adminName: '',
        adminNickName: '',
    };

    private rules = {
        name: [
            { required: true, message: '请输入机构简称', trigger: 'blur' },
            { min: 1, max: 50, message: '长度需在 1 到 50 个字符之间', trigger: 'blur' },
            { pattern:  /^\S*$/, message: '不能输入空格' },
        ],
        fullName: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 1, max: 50, message: '长度需在 1 到 50 个字符之间', trigger: 'blur' },
            { pattern:  /^\S*$/, message: '不能输入空格' },
        ],
        code: [
            { required: true, message: '请输入代码', trigger: 'blur' },
            // { min: 4, max: 10, message: '长度需在 4 到 10 个字符之间', trigger: 'blur' }
            { pattern: /^(?=.*?[a-z)(?=.*>[A-Z])[a-zA_Z0-9]{4,10}$/, message: '长度需在 4 到 10 个字符间,并且其中有字母组成' },
        ],
        dbId: [
            { required: true, message: '请选择数据库', trigger: 'blur' },
        ],
        adminMobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { pattern: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/, message: '手机格式不对' },
        ],
        adminName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 1, max: 50, message: '长度需在 1 到 50 个字符之间', trigger: 'blur' },
            { pattern:  /^\S*$/, message: '不能输入空格' },
        ],
        adminNickName: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 1, max: 50, message: '长度需在 1 到 50 个字符之间', trigger: 'blur' },
            { pattern:  /^\S*$/, message: '不能输入空格' },
        ],
    };

    private baseList: Base[] = [];

    public async init() {
        this.visible = true;
        const { data } = await dataBaseList();
        this.baseList = data;
    }

    private submit() {
        (this.$refs.form as ElForm).validate(async (valid: boolean) => {
            if (valid) {
                await companyCreate(this.form);
                this.$message({
                    type: 'success',
                    message: '成功',
                    duration: 500,
                    onClose: () => {
                        this.visible = false;
                    },
                });
            }
        });
    }

    private closeInfo() {
        this.visible = false;
    }
}
</script>
