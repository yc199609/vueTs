<template>
    <div class="container">
        <searchBar :hiddenInput="true" :hiddenSearch="true" :options="options" @handleInsert="handleInsert" />
        <el-card style="margin-top:10px;">
            <el-table border :data="tableData" >
                <template slot="empty">
                    <div class="empty">
                        <img src="@/assets/empty.png">
                        <p>暂无数据</p>
                    </div>
                </template>
                <el-table-column align="center" prop="id" label="终端类型Id" />
                <el-table-column align="center" prop="name" label="终端类型名称" />
                <el-table-column align="center" prop="code" label="类型代码（型号）" />
                <el-table-column align="center" prop="description" label="类型描述说明"/>
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
        <editDialog ref="editDialog" v-if="editDialogVisible" @hidden="dialogHidden" />
    </div>
</template>

<script lang='ts' >
import { Vue, Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

import searchBar, { Type, Option } from '@/components/searchBar.vue';
import Pagination from '@/mixins/pagination';
import { getAllTerminalType, deleteTerminalType } from '@/api/physicalEquipment/terminalType';
import editDialog from './components/edit.vue';
import { isNotEmpty } from '@/utils/validate';

@Component({
    name: 'Organize',
    components: {
        searchBar,
        editDialog,
    },
})
export default class Organize extends Vue {
    private options: Option[] = [
        { title: '新增', emit: 'handleInsert', icon: 'el-icon-plus', type: Type.warning },
    ];

    private tableData = [];
    private editDialogVisible: boolean = false;

    public async init() {
        const { data }  = await getAllTerminalType();
        this.tableData = data;
    }

    private mounted() {
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
        await this.$confirm('此操作将删除该终端类型, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        });
        await deleteTerminalType(id);
        this.$message({
            type: 'success',
            message: '删除成功',
            duration: 500,
            onClose: () => {
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
