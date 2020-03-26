<template>
    <el-dialog
        top='5vh'
        :append-to-body="true"
        :modal-append-to-body="false"
        :visible.sync="visible"
        :closeOnClickModal="false"
        title="新增设备部位"
        @close="onClose"
    >
        <el-form inline label-width="100px" :model="form" :rules="rules" ref="form">
            <el-tabs v-model="activeName" >
                <el-tab-pane label="基本信息" name="baseInfo">
                    <el-form-item label="设备名称" prop="name">
                        <el-input v-model.trim="form.name" />
                    </el-form-item>
                    <el-form-item label="设备编码" prop="code">
                        <el-input v-model.trim="form.code" />
                    </el-form-item>
                    <el-form-item label="设备类型" prop="typeId">
                        <el-select v-model="form.typeId" placeholder="请选择" @change="handleChangeType">
                        <el-option
                            v-for="(item,index) in typeList"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                        />
                        </el-select>
                    </el-form-item>

                    <h4>固定属性:</h4>

                    <el-form-item v-for="(item,index) in form.fixedPropList" :key="index" :label="item.propertyName" >
                        <el-input v-model.trim="item.propertyValue" />
                    </el-form-item>
                </el-tab-pane>

                <el-tab-pane name="extraProp" label="扩展属性">
                    <el-row
                        v-for="(item, index) in form.extraPropList"
                        :key="index"
                    >
                        <el-col :span="8">
                            <el-form-item
                                :prop="'extraPropList['+index+'].propertyName'"
                                :rules="{
                                    required: true, message: '请输入名称', trigger: 'blur'
                                }"
                            >
                                <el-input v-model="item.propertyName" placeholder="请输入属性名称" style="width: 100%;"/>
                            </el-form-item>
                        </el-col>

                        <el-col :span="2" style="display: flex;justify-content:center;align-items:center;height:40px;font-weight:700;">:</el-col>
                        
                        <el-col :span="8">
                            <el-form-item
                                :prop="'extraPropList['+index+'].propertyName'"
                                :rules="{
                                    required: true,
                                    message: '请输入内容', trigger: 'blur'
                                }"
                            >
                                <el-input v-model="item.propertyValue" placeholder="请输入内容" />
                            </el-form-item >
                        </el-col>
                        <el-button style="margin-left: 15px;" @click.prevent="deleteExtraProp(index)">删除</el-button>

                    </el-row>

                    <el-form-item>
                        <el-button
                            type="success"
                            plain
                            icon="el-icon-circle-plus"
                            @click="handleInsertExtraprop">新增</el-button>
                    </el-form-item>
                </el-tab-pane>
            </el-tabs>
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
import { createPDevice, getAllPDeviceType, getPropertyList, updatePDevice, getPDeviceById } from '@/api/physicalEquipment/physicalEquipmentManage';

enum TabName {
    baseInfo = 'baseInfo',
    extraProp = 'extraProp',
}
interface ExtraProp {
    propertyName: string;
    propertyValue: string;
}

interface PropertyData {
    id: number;
    code: string;
    properties: ExtraProp[];
}

interface Form {
    name: string;
    code: string;
    typeId: number | undefined;
    extraPropList: ExtraProp[];
    fixedPropList: ExtraProp[];
}

@Component({
    name: 'addDevicePart',
})
export default class extends mixins(Dialog) {
    private form: Form = {
        name: '',
        code: '',
        typeId: undefined,
        extraPropList: [],
        fixedPropList: [],
    };
    private rules = {
        name: [{ required: true, message: '请输入设备名称', trigger: 'blur' }],
        code: [
            { required: true, message: '请输入设备编码', trigger: 'blur' },
            { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{24}$/, message: '长度必须为24个数字或字母组成' },
        ],
        typeId: [{ required: true, message: '请选择设备类型', trigger: 'change' }],
    };
    private typeList = [];
    private activeName: TabName = TabName.baseInfo;
    private id: number = -1;
    private propertyData: PropertyData[] = [];

    private get properties() {
        const index = this.propertyData.findIndex((item) => item.id === this.form.typeId);
        if (index === -1) {
            return [];
        } else {
            return this.propertyData[index].properties;
        }
    }

    public async init(id: number) {
        this.id = id;
        this.visible = true;
        const { data } = await getAllPDeviceType();
        this.typeList = data;
        const { data: propertyJson } = await getPropertyList();
        this.propertyData = JSON.parse(propertyJson);
    }

    private async submit() {
        const extraPropList = this.form.extraPropList.map((item: ExtraProp) => ({
            ...item,
            isExtProperty: 1,
        }));
        const sendForm = {
            code: this.form.code,
            name: this.form.name,
            typeId: (this.form.typeId as number),
            properties: this.form.fixedPropList.concat(extraPropList),
        };

        (this.$refs.form as ElForm).validate(async (valid, error) => {
            if (valid) {
                await createPDevice(sendForm);
                this.$message({
                    type: 'success',
                    message: '新增成功',
                    duration: 500,
                    onClose: () => {
                        this.visible = false;
                    },
                });
            } else {
                const flag = Object.keys(error).some((item) => !item.includes('extraPropList'));
                if (flag) {
                    this.activeName = TabName.baseInfo;
                } else {
                    this.activeName = TabName.extraProp;
                }
            }
        });
    }

    private handleInsertExtraprop() {
        const addItem = {
            propertyName: '',
            propertyValue: '',
        };
        this.$set(this.form, 'extraPropList', this.form.extraPropList.concat(addItem));
    }

    private handleChangeType() {
        this.$set(this.form, 'fixedPropList', this.properties);
    }

    private deleteExtraProp(index: number) {
        this.$set(this.form, 'extraPropList', this.form.extraPropList.splice(index, 1));
    }
}
</script>
