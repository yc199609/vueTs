<template>
    <el-dialog
        :append-to-body="true"
        :modal-append-to-body="false"
        :visible.sync="visible"
        :closeOnClickModal="false"
        title="设备部位"
        @close="onClose"
    >
        <el-table :data="tableData" border>
            <el-table-column align="center" label="部位名称" >
                <template slot-scope="scope">
                    <div v-if="!scope.row.onEditing">
                        {{ scope.row.name }}
                    </div>
                    <el-input v-else v-model.trim="scope.row.name" />
                </template>
            </el-table-column>

            <el-table-column align="center" prop="code" label="部位代码" >
                <template slot-scope="scope">
                    <div v-if="!scope.row.onEditing">
                        {{ scope.row.code }}
                    </div>
                    <el-input v-else v-model.trim="scope.row.code" />
                </template>
            </el-table-column>

            <el-table-column align="center" prop="description" label="部位描述" >
                <template slot-scope="scope">
                    <div v-if="!scope.row.onEditing">
                        {{ scope.row.description }}
                    </div>
                    <el-input v-else v-model.trim="scope.row.description" />
                </template>
            </el-table-column>

            <el-table-column align="center" label="操作" >
                <template slot="header">
                    <el-button type="success" plain size="small" icon="el-icon-plus" @click="handleInsert">新增</el-button>
                </template>
                <template slot-scope="scope">
                    <el-button type="text" v-if="!scope.row.onEditing" @click="handleModify(scope.row)">编辑</el-button>
                    <el-button type="text" v-else @click="handleSave(scope.row)">保存</el-button>
                    <el-button type="text" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <addDevicePart ref="addDevicePart" v-if="addDevicePartVisible" @hidden="dialogHidden" />
    </el-dialog>
</template>

<script lang='ts' >
import { Vue, Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

import { Dialog } from '@/mixins';
import {
    getPDevicePartByDeviceTypeId,
    deleteTerminalDeviceLocation,
    updateTerminalDeviceLocation,
} from '@/api/physicalEquipment/physicalEquipmentType';
import addDevicePart from './addDevicePart.vue';

interface DevicePart {
    code: string;
    description: string;
    deviceTypeId: number;
    id: number;
    name: string;
}

@Component({
    name: 'editTerminal',
    components: {
        addDevicePart,
    },
})
export default class extends mixins(Dialog) {
    private tableData: DevicePart[] = [];
    private addDevicePartVisible: boolean = false;
    private id: number = -1;

    public async init(id: number) {
        this.id = id;
        this.visible = true;
        const { data } = await getPDevicePartByDeviceTypeId(id);
        this.tableData = data;
    }

    private handleInsert() {
        this.addDevicePartVisible = true;
        this.$nextTick(() => {
            (this.$refs.addDevicePart as any).init(this.id);
        });
    }

    private handleModify(devicePart: DevicePart) {
        this.$set(devicePart, 'onEditing', true);
    }

    private async handleSave(devicePart: DevicePart) {
        await updateTerminalDeviceLocation(devicePart);
        this.$message({
            type: 'success',
            message: '修改成功',
            duration: 500,
            onClose: () => {
                this.init(this.id);
            },
        });
    }
    private async handleDelete(id: number) {
        await this.$confirm('此操作将删除设备部位,是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        });
        await deleteTerminalDeviceLocation(id);
        this.$message({
            type: 'success',
            message: '删除成功',
            duration: 500,
            onClose: () => {
                this.init(this.id);
            },
        });
    }
    private dialogHidden() {
        this.init(this.id);
    }
}
</script>
