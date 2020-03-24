<template>
    <div class="container">
        <searchBar :options="options" @search="search" @handleInsert="handleInsert" />
        <el-card style="margin-top:10px;">
            <el-table border :data="tableData" >
                <template slot="empty">
                    <div class="empty">
                        <img src="@/assets/empty.png">
                        <p>暂无数据</p>
                    </div>
                </template>
                <el-table-column align="center" prop="id" label="终端Id"></el-table-column>
                <el-table-column align="center" prop="code" label="终端代码"></el-table-column>
                <el-table-column align="center" prop="typeName" label="类型名称"></el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-tooltip content="修改" placement="top" effect="dark">
                            <el-button size="small" type="info" icon="el-icon-document" @click="handleModify(scope.row)"></el-button>
                        </el-tooltip>

                        <el-tooltip content="删除" placement="top" effect="dark">
                            <el-button size="small" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.id)"></el-button>
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
        <editTerminal v-if="editDialogVisible" ref="editDialog" @hidden="dialogHidden" />
    </div>
</template>

<script lang='ts' >
import { Vue, Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

import searchBar, { Type, Option } from '@/components/searchBar.vue';
import Pagination from '@/mixins/pagination';
import { getListTerminal, deleteTerminal } from '@/api/physicalEquipment/terminalManage';
import { isNotEmpty } from '@/utils/validate';
import editTerminal from './components/editTerminal.vue';

@Component({
    name: 'Organize',
    components: {
        searchBar,
        editTerminal,
    },
})
export default class Organize extends mixins(Pagination) {
    private options: Option[] = [
        { title: '新增', emit: 'handleInsert', icon: 'el-icon-plus', type: Type.warning },
    ];

    private keyword: string = '';
    private tableData = [];
    private editDialogVisible: boolean = false;

    public async init() {
        const requestData = {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            ...isNotEmpty(this.keyword) && {
                keyword: this.keyword.trim(),
            },
        };
        const { data }  = await getListTerminal(requestData);
        this.pageIndex = data.pageIndex;
        this.pageSize = data.pageSize;
        this.totalCount = data.totalCount;
        this.tableData = data.items;
    }

    private mounted() {
        this.init();
    }

    private search(keyword: string) {
        this.keyword = keyword;
        this.init();
    }

    private dialogHidden() {
        this.editDialogVisible = false;
        this.init();
    }

    private handleInsert() {
        this.editDialogVisible = true;
        this.$nextTick(() => {
            (this.$refs.editDialog as any).init();
        });
    }

    private handleModify(data: {
        id: number,
        code: string,
        terminalTypeId: number,
    }) {
        this.editDialogVisible = true;
        this.$nextTick(() => {
            (this.$refs.editDialog as any).init(data);
        });
    }

    private async handleDelete(id: number) {
        await this.$confirm('此操作将删除该终端, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        });
        await deleteTerminal(id);
        this.$message({
            type: 'success',
            message: '删除成功',
            duration: 500,
            onClose: () => {
                this.pageIndex = 1;
                this.init();
            },
        });
    }
}
</script>
<style lang="scss" scoped>
.container{
    padding: 1vw 3vw 0;
}
</style>
