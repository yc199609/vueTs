<template>
    <el-dialog :visible.sync="visible" :closeOnClickModal="false" @close="onClose" title="业务参数">
        <el-table :data="tableData" border>
            <template slot="empty">
                <div class="empty">
                    <img src="@/assets/empty.png">
                    <p>暂无数据</p>
                </div>
            </template>
            <el-table-column align="center" prop="code" label="代码" />
            <el-table-column align="center" prop="name" label="名称" />
            <el-table-column align="center" prop="value" label="值" >
                <template slot-scope="{row}">
                    {{((row.value).length > 10) ? (row.value).substring(0, 8) + '......' : row.value}}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="description" label="备注" />
            <el-table-column align="center" label="操作" >
                <template slot="header">
                    <el-button type="success" plain size="small" icon="el-icon-plus" @click="handleInsert">新增</el-button>
                </template>
                <template slot-scope="{row}">
                    <el-button type="text" icon="el-icon-edit" @click="modify(row)" >修改值</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size='pageSize'
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
            style="margin: 15px 0;"
        />

        <el-dialog
            title="请在下方输入要修改的值"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            :modal-append-to-body="false"
            :append-to-body="true"
            @close="hidden"
        >
            <el-input type="textarea" v-model="value"></el-input>
            <span slot="footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submit">确定</el-button>
            </span>
        </el-dialog>
        <addParameter ref="addParameter" v-if="addParameterVisible" :id="id" @hidden="hidden" />
    </el-dialog>
</template>

<script lang='ts' >
import { Vue, Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

import { Dialog, Pagination } from '@/mixins';
import { getConfigById, ConfigItem, updateConfigItem } from '@/api/dms/organize';
import addParameter from './addParameter.vue';

@Component({
    name: 'businessParameter',
    components: {
        addParameter,
    },
})
export default class extends mixins(Dialog, Pagination) {
    private tableData = [];
    private id: number = -1;
    private value: string = '';
    private dialogVisible: boolean = false;
    private addParameterVisible: boolean = false;
    private row: any = {};

    public async init(id?: number) {
        if (id) {
            this.id = id;
        }
        this.visible = true;
        const { data } = await getConfigById({
            id: this.id,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
        });
        this.pageIndex = data.pageIndex;
        this.pageSize = data.pageSize;
        this.totalCount = data.totalCount;
        this.tableData = data.items;
    }

    private modify(row: ConfigItem ) {
        this.dialogVisible = true;
        this.value = row.value;
        this.row = row;
    }

    private async submit() {
        await updateConfigItem({ id: this.row.id, value: this.value, companyId: this.row.companyId });
        this.$message({
            type: 'success',
            message: '修改成功',
            duration: 500,
            onClose: () => {
                this.dialogVisible = false;
            },
        });
    }

    private handleInsert() {
        this.addParameterVisible = true;
        this.$nextTick(() => {
            (this.$refs.addParameter as any).init();
        });
    }

    private hidden() {
        this.dialogVisible = false;
        this.addParameterVisible = false;
        this.init();
    }
}
</script>
