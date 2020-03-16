<template>
    <el-dialog :visible.sync="visible" :closeOnClickModal="false" @close="onClose" title="基本信息">
        <div
            style="padding:0 30px 30px;"
            class="container"
        >
            <el-form :model="form" :rules="rules" ref="form">
                <el-row :gutter="24">
                    <el-col :span="8">
                        <el-form-item label="简称" prop="name">
                            <el-input v-model="form.name" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="全称">
                            <el-input v-model="form.fullName" :maxlength="50"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="24">
                    <el-col :span="8">
                        <el-form-item label="外线电话">
                            <el-input
                                placeholder="请输入外线电话"
                                v-model="form.outsidePhone"
                                :maxlength="50"
                            />
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="内线电话">
                            <el-input
                                placeholder="请输入内线电话"
                                v-model="form.insidePhone"
                                :maxlength="50"
                            />
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="传真">
                            <el-input
                                placeholder="请输入机构传真"
                                v-model="form.fax"
                                :maxlength="50"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="24">
                    <el-col :span="8">
                        <el-form-item label="经营范围">
                            <el-input
                                placeholder="请输入机构经营范围"
                                v-model="form.businessScop"
                                :maxlength="50"
                            />
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="楼层">
                            <el-input
                                placeholder="请输入机构楼层"
                                v-model="form.floor"
                                :maxlength="50"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col>
                        <el-form-item label="详细地址">
                            <el-input
                                placeholder="请输入机构详细地址"
                                v-model="form.address"
                                :maxlength="50"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-button
                    type="primary"
                    style="float: right;"
                    @click="saveInfo"
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

import { updateBaseInfo, getBaseInfoById, BaseInfo } from '@/api/dms/organize';
import Dialog from '@/mixins/dialog';

@Component({
    name: 'baseInformation',
})
export default class extends mixins(Dialog) {
    private rules = {
        name: [
          { required: true, message: '请输入机构简称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度需在 1 到 50 个字符之间', trigger: 'blur' },
          { pattern:  /^\S*$/, message: '不能输入空格' },
        ],
    };
    private form: BaseInfo = {
        id: -1,
        name: '',
        fullName: '',
        code: '',
        outsidePhone: '',
        insidePhone: '',
        fax: '',
        zipCode: '',
        email: '',
        offcialSite: '',
        businessScop: '',
        floor: '',
        loginImage: '',
        address: '',
        siteName: '',
        parentId: -1,
    };
    public async init(id?: number) {
        this.visible = true;
        if (id) {
            const { data } = await getBaseInfoById(id);
            this.form = data;
        }
    }
    private closeInfo() {
        this.visible = false;
    }
    private saveInfo() {
        (this.$refs.form as ElForm).validate(async (valid: boolean) => {
            if (valid) {
                await updateBaseInfo(this.form);
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
}
</script>
