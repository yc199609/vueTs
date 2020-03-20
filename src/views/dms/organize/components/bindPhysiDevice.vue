<template>
    <el-dialog
        :visible.sync="visible"
        :close-on-click-modal="false"
        :append-to-body="true"
        :modal-append-to-body="false"
        title="绑定物理设备"
        @close="onClose"
    >
        <strong>机构名称: {{ name }}</strong>

        <el-table
            ref="multipleTable"
            :data="tableData"
            border
            @select="handleChoose"
            @select-all="handleChooseAll"
            style="margin-top: 10px"
        >
            <template slot="empty">
                <div class="empty">
                    <img src="@/assets/empty.png">
                    <p>暂无数据</p>
                </div>
            </template>
            <el-table-column type="selection" width="55" />
            <el-table-column label="设备编码" prop="code" align="center" sortable/>  
            <el-table-column label="设备名称" prop="name" align="center" sortable/>
            <el-table-column label="设备类型名称" prop="typeName" align="center" />
            <el-table-column label="绑定终端个数" prop="deviceTerminalNum" align="center" />
        </el-table>

        <el-pagination
            :page-sizes="[10 ,20, 30, 40, 50]"
            :current-page="pageIndex"
            :page-size="pageSize"
            :total="totalCount"
            layout="total, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />

        <div slot="footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="submit">确定</el-button>
        </div>
    </el-dialog>
</template>

<script lang='ts' >
import { Vue, Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { Table} from 'element-ui';

import { Dialog, Pagination } from '@/mixins';
import { getPDevicesByCompanyId, getPDevice, bindCompanyPDevice } from '@/api/dms/organize';

interface Device {
    code: string;
    deviceTerminalNum: number;
    id: number;
    name: string;
    typeId: number;
    typeNmae: string;
}

interface Choose {
    code: string;
    deviceTerminalNum: number;
    id: number;
    name: string;
    properties?: any;
    typeId: number;
}

@Component({
    name: 'bindPhysiDevice',
})
export default class extends mixins(Dialog, Pagination) {
    private name: string = '';
    private id: number = -1;
    private tableData: Device[] = [];
    private chooseArray: Choose[] = [];

    public async init(id: number, name: string) {
        if (id) {
            this.name = name;
            this.id = id;
            this.visible = true;
            const { data } = await getPDevicesByCompanyId(id);
            this.chooseArray = data || [];
        }
        this.setSelectsToTable();
    }

    private async setSelectsToTable() {
        const { data: tableData } = await getPDevice({ pageIndex: this.pageIndex, pageSize: this.pageSize });
        this.totalCount = tableData.totalCount;
        this.pageIndex = tableData.pageIndex;
        this.pageSize = tableData.pageSize;
        this.tableData = tableData.items;
        this.toggleSelection(this.chooseArray);
    }

    private toggleSelection(rows: Choose[]) {
        const addItems = this.tableData.filter((v) => rows.map((item) => item.id).includes(v.id));

        addItems.forEach((row) => {
            this.$nextTick(() => {
                (this.$refs.multipleTable as Table).toggleRowSelection(row, true);
            });
        });
    }

    /**
     * @function
     * @param selects 目前表格中所有选中的
     * @param row 当前点击的那一项
     */
    private handleChoose(selects: Device[], row: Device) {
        // 判断是新增选中还是取消选中
        const flag: boolean = selects.some((item) => item.id === row.id);

        if (flag) {
            // 判断是否已经在选中的数组中了
            const ishas: boolean = this.chooseArray.some((item) => item.id === row.id);
            if (!ishas) {
                this.chooseArray.push(row);
            }
        } else {
            this.chooseArray = this.chooseArray.filter((item) => item.id !== row.id);
        }
    }

    private handleChooseAll(selects: Device[]) {
        if (selects.length > 0) {
            const addItems = selects.filter((item) => !this.chooseArray.some((data) => data.id === item.id));
            this.chooseArray = this.chooseArray.concat(addItems);
        } else {
            this.chooseArray = this.chooseArray.filter((item) => !this.tableData.some((data) => data.id === item.id ));
        }
    }

    private async submit() {
        const PDeviceIds = this.chooseArray.map((item) => item.id);
        await bindCompanyPDevice({ CompanyId: this.id, PDeviceIds });
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
