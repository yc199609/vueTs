<template>
    <el-dialog :visible.sync="visible" :closeOnClickModal="false" @close="onClose" title="机构设置">
        <div
            style="padding:0 30px 30px;"
            class="container"
        >
            <el-form :model="form" :rules="rules" ref="form">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item  prop="code" label="代码" >
                            <el-input v-model="form.code" :maxlength="50" />
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="站点" prop="dmsSite">
                            <el-input v-model="form.dmsSite" :maxlength="50" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="数据库">
                            <el-select v-model="form.db" placeholder="请选择" >
                                <el-option
                                    v-for="item in dBList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label="系统开通">
                    <el-checkbox
                        v-model="form.isDMSEnable"
                        label="管理系统"
                    />
                </el-form-item>
            </el-form>

            <el-button
                type="primary"
                style="float: right;"
                @click="submit"
            >保存</el-button>

            <el-button
                style="float: right; margin-right: 15px;"
                @click="closeInfo"
            >取消</el-button>
        </div>
    </el-dialog>
</template>

<script lang='ts' >
import { Vue, Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { Form as ElForm } from 'element-ui';

import Dialog from '@/mixins/dialog';
import { dataBaseList, getSystemInfoById, updateSystemInfo } from '@/api/dms/organize';

@Component({
    name: 'setupOrganize',
})
export default class extends mixins(Dialog) {
    private rules = {
        code: [
            { required: true, message: '请输入代码', trigger: 'blur' },
            { pattern: /^(?=.*?[a-z)(?=.*>[A-Z])[a-zA_Z0-9]{4,10}$/, message: '长度需在 4 到 10 个字符间,并且其中有字母组成' },
        ],
        dmsSite: [
            { required: true, message: '请输入站点', trigger: 'blur' },
            { pattern:  /^\S*$/, message: '不能输入空格' },
        ],
    };

    private form: any = {
        id: undefined,
        dmsSite: '',
        db: {},
        isDMSEnable: '',
    };

    private dBList = [];

    public async init(id: number) {
        this.visible = true;
        this.dBList = (await dataBaseList() as any).data;
        this.form = (await getSystemInfoById(id) as any).data;
    }

    private closeInfo() {
        this.visible = false;
    }

    private async submit() {
        await updateSystemInfo(this.form);
        this.$message({
            type: 'success',
            message: '修改成功',
            duration: 1000,
            onClose: () => {
                this.visible = false;
            },
        });
    }
}
</script>
