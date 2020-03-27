<template>
    <el-dialog
        :append-to-body="true"
        :modal-append-to-body="false"
        :visible.sync="visible"
        :closeOnClickModal="false"
        title="物理设备"
        @close="onClose"
    >
        <el-table border :data="tableData">
            <el-table-column align="center" prop="name" label="部位名称" />
            <el-table-column align="center" prop="code" label="部位代码" />
            <el-table-column align="center" prop="description" label="部位描述" />
            <el-table-column align="center" label="操作" >
                <template slot-scope="scope">
                    <el-button type="text" @click="handleTerminal(scope.row.id)">查看终端</el-button>
                </template>
            </el-table-column>
        </el-table>
        <terminal v-if="terminalVisible" ref="terminal" @hidden="dialogHidden" />
    </el-dialog>
</template>

<script lang='ts' >
import { Vue, Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

import { Dialog } from '@/mixins';
import { getPDevicePartByDeviceTypeId } from '@/api/physicalEquipment/physicalEquipmentManage';
import terminal from './terminal.vue';

@Component({
    name: 'devicePart',
    components: {
        terminal,
    },
})
export default class extends mixins(Dialog) {
    private tableData: Array<{id: number, name: string, description: string, code: string}> = [];
    private terminalVisible: boolean = false;
    private device!: {typeId: number, id: number};

    public async init(device: {typeId: number, id: number}) {
        this.device = device;
        this.visible = true;
        const { data } = await getPDevicePartByDeviceTypeId(device.typeId);
        this.tableData = data;
    }

    private handleTerminal(deviceLocationId: number) {
        this.terminalVisible = true;
        this.$nextTick(() => {
            (this.$refs.terminal as any).init({ deviceId: this.device.id, deviceLocationId});
        });
    }

    private dialogHidden() {
        this.terminalVisible = false;
        this.init(this.device);
    }
}
</script>
