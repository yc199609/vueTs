<template>
    <div class="container">
        <searchBar
            :options="[
                { title: '新增', emit: 'handleInsert', icon: 'el-icon-plus', type: 'warning' },
            ]"
            @search="search" 
            @handleInsert="handleInsert"    
        />
        <el-card style="margin-top:10px;">
            <el-table border :data="tableData" >
                <template slot="empty">
                    <div class="empty">
                        <img src="@/assets/empty.png">
                        <p>暂无数据</p>
                    </div>
                </template>
                <el-table-column align="center" sortable prop="code" label="听诊器Code" />
                <el-table-column align="center" prop="name" label="听诊器名字" />
                <el-table-column align="center" prop="createTime" label="创建时间" />
                <el-table-column align="center" prop="updateTime" label="修改时间" />
                <el-table-column align="center" prop="isBinded" label="是否被绑定" >
                    <template slot-scope="scope">{{ scope.row.isBinded | boolFormat }}</template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-tooltip content="修改" placement="top" effect="dark">
                            <el-button size="small" type="info" icon="el-icon-document" @click="handleModify(scope.row)" />
                        </el-tooltip>
                        <el-tooltip content="删除" placement="top" effect="dark">
                            <el-button size="small" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.code)" />
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
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
        <insertDialog v-if="insertVisible" ref="insertDialog" @hidden="handleDialogClose" />
        <modifyDialog v-if="modifyVisible" ref="modifyDialog" @hidden="handleDialogClose" />
    </div>
</template>

<script lang='ts' >
import { Vue, Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import moment from 'moment';

import searchBar, { Type, Option } from '@/components/searchBar.vue';
import { Pagination } from '@/mixins';
import { getList, deleteStethophone } from '@/api/stethophone';
import { isNotEmpty } from '@/utils/validate';
import insertDialog from './components/insert.vue';
import modifyDialog from './components/modify.vue';

export interface Stethophone {
    code: string;
    companyId: number;
    createTime: string;
    id: number;
    isBinded: boolean;
    name: string;
    updateTime: string;
}

Vue.filter('boolFormat', (bool: boolean) => bool ? '已绑定' : '未绑定');

@Component({
    name: 'oprate',
    components: {
        searchBar,
        insertDialog,
        modifyDialog,
    },
})
export default class extends mixins(Pagination) {
    private keyword: string = '';
    private tableData = [];
    private insertVisible: boolean = false;
    private modifyVisible: boolean = false;

    public async init() {
        const { data } = await getList({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            ...isNotEmpty(this.keyword) && {
                code: this.keyword.trim(),
            },
        });
        const tableData = data.items.map((item: any) => ({
            ...item,
            createTime: moment.utc(item.createTime).local().format('YYYY-MM-DD HH:mm:ss'),
            updateTime: moment.utc(item.updateTime).local().format('YYYY-MM-DD HH:mm:ss'),
        }));
        this.tableData = tableData;
        this.pageIndex = data.pageIndex;
        this.pageSize = data.pageSize;
        this.totalCount = data.totalCount;
    }
    private handleInsert() {
        this.insertVisible = true;
        this.$nextTick(() => {
            (this.$refs.insertDialog as any).init();
        });
    }
    private handleModify(data: Stethophone) {
        this.modifyVisible = true;
        this.$nextTick(() => {
            (this.$refs.modifyDialog as any).init(data);
        });
    }
    private mounted() {
        this.init();
    }
    private search(keyword: string) {
        this.keyword = keyword;
        this.init();
    }
    private async handleDelete(code: string) {
        await this.$confirm('此操作将删除该终端, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        });
        await deleteStethophone(code);
        this.$message({
            type: 'success',
            message: '已成功删除',
            duration: 500,
            onClose: () => {
                this.init();
            },
        });
    }
    private handleDialogClose() {
        this.insertVisible = false;
        this.modifyVisible = false;
        this.init();
    }

}
</script>
<style lang="scss" scoped>
.container{
    padding: 1vw 3vw 0;
}
</style>
