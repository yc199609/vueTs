<template>
    <el-dialog
        :visible.sync="visible"
        :close-on-click-modal="false"
        :append-to-body="true"
        :modal-append-to-body="false"
        title="绑定物理设备"
        @close="onClose"
    >
        <strong >机构名称: {{ name }}</strong>

        <el-table
            ref="multipleTable"
            :data="tableData"
            height="500"
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
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submit">确定</el-button>
        </div>
    </el-dialog>
</template>

<script lang='ts' >
import { Vue, Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

import { Dialog, Pagination } from '@/mixins';
import { GetPDevicesByCompanyId } from '@/api/dms/organize';

@Component({
    name: 'bindPhysiDevice',
})
export default class extends mixins(Dialog, Pagination) {
    private name: string = '';
    private id: number = -1;
    private tableData = [];
    private chooseArray = [];

    public async init(id: number, name: string) {
        this.name = name;
        this.id = id;
        this.visible = true;
        const { data } = await GetPDevicesByCompanyId(id);
        this.chooseArray = data;
        
    }

    private submit() {

    }
}
</script>
