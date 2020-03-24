<template>
    <div class="container">
        <searchBar 
            @search="search"
            @handleReflash="handleReflash"
            @handleInsert="handleInsert"
            :options="[
                { title: '新增系统参数', emit: 'handleInsert', icon: 'el-icon-plus', type: 'warning' },
                { title: '初始化缓存中数据库表格ID', emit: 'handleReflash', icon: 'el-icon-refresh', type: 'primary' },
            ]"
        />
        <el-card style="margin-top:10px;">
            <el-table border :data="tableData" >
                <template slot="empty">
                    <div class="empty">
                        <img src="@/assets/empty.png">
                        <p>暂无数据</p>
                    </div>
                </template>
                <el-table-column align="center" prop="code" label="代码" />
                <el-table-column align="center" prop="name" label="名称" />
                <el-table-column align="center" prop="value" label="值" />
                <el-table-column align="center" prop="description" label="备注" />
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleModify(scope.row)">修改</el-button>
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
        <addProp v-if="addPropVisible" ref="addProp" @hidden="dialogHidden" />
        <modifyProp v-if="modifyPropVisible" ref="modifyProp" @hidden="dialogHidden" />
    </div>
</template>

<script lang='ts' >
import { Vue, Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

import { Pagination } from '@/mixins';
import { isNotEmpty } from '@/utils/validate';
import searchBar from '@/components/searchBar.vue';
import addProp from './components/addProp.vue';
import modifyProp from './components/modifyProp.vue';
import { systemConfigList, initTableID } from '@/api/systemSetup/systemProp';

@Component({
    name: '',
    components: {
        searchBar,
        addProp,
        modifyProp,
    },
})
export default class extends mixins(Pagination) {
    private tableData = [];
    private keyword: string = '';
    private addPropVisible: boolean = false;
    private modifyPropVisible: boolean = false;

    public async init() {
        const { data } = await systemConfigList({
            ...isNotEmpty(this.keyword) && {
                keyword: this.keyword.trim(),
            },
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
        });
        this.tableData = data.items;
        this.pageSize = data.pageSize;
        this.pageIndex = data.pageIndex;
        this.totalCount = data.totalCount;
    }

    private mounted() {
        this.init();
    }

    private search(keyword: string) {
        this.keyword = keyword;
        this.init();
    }

    private handleModify(data: {
        code: string,
        description: string,
        id: number,
        name: string,
        value: string,
    }) {
        this.modifyPropVisible = true;
        this.$nextTick(() => {
            (this.$refs.modifyProp as any).init(data);
        });
    }

    private handleInsert() {
        this.addPropVisible = true;
        this.$nextTick(() => {
            (this.$refs.addProp as any).init();
        });
    }

    private async handleReflash() {
        await initTableID();
        this.$message({
            type: 'success',
            message: '初始化成功',
            duration: 500,
            onClose: () => {
                this.init();
            },
        });
    }

    private dialogHidden() {
        this.addPropVisible = false;
        this.modifyPropVisible = false;
        this.init();
    }
}
</script>
<style lang="scss" scoped>
.container{
    padding: 1vw 3vw 0;
}
</style>
