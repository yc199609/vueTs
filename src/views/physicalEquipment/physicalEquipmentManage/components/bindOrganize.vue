<template>
    <el-dialog
        :visible.sync="visible"
        :closeOnClickModal="false"
        title="绑定机构"
        @close="onClose"
    >
        <el-select placeholder="请选择" v-model="chooses" multiple clearable style="width:100%;">
            <el-option
                v-for="(item,index) in companyList"
                :key="index"
                :label="item.name"
                :value="item.id"
            />
        </el-select>

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

import { Dialog } from '@/mixins';
import { getCompanyList, getCompaniesByPDeviceId, bindPDeviceCompany } from '@/api/physicalEquipment/physicalEquipmentManage';

interface PDevice {
    id: number;
    name: string;
    code: string;
    typeId: number;
}

interface Company {
    id: number;
    name: string;
}

@Component({
    name: 'bindOrganize',
})
export default class extends mixins(Dialog) {
    private companyList: Company[] = [];
    private chooses: number[] = [];
    private device!: PDevice;

    public async init(data: PDevice) {
        this.device = data;
        this.visible = true;
        const res = await Promise.all([
            getCompanyList({pageIndex: 1, pageSize: 9999}),
            getCompaniesByPDeviceId(data.id),
        ]);
        this.companyList = res[0].data.items;
        this.chooses = res[1].data.map((item: Company) => item.id);
    }

    private async submit() {
        await bindPDeviceCompany({
            pDevice: this.device,
            CompanyIds: this.chooses,
        });
        this.$message({
            type: 'success',
            message: '绑定成功',
            duration: 500,
            onClose: () => {
                this.visible = false;
            },
        });
    }
}
</script>
