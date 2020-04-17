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
                <el-table-column align="center" prop="name" label="类型名称"></el-table-column>
                <el-table-column align="center" prop="code" label="类型编码"></el-table-column>
                <el-table-column align="center" prop="description" label="描述"></el-table-column>
                <el-table-column align="center" prop="isOnboard" label="是否板载传感器">
                    <template slot-scope="{ row }">
                        {{ row.isOnboard | isOnboard }}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-tooltip content="编辑" placement="top" effect="dark">
                            <el-button size="small" type="info" icon="el-icon-document" @click="handleModify(scope.row)"></el-button>
                        </el-tooltip>

                        <el-tooltip content="删除" placement="top" effect="dark">
                            <el-button size="small" type="warning" icon="el-icon-setting"></el-button>
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
        <edit v-if="editVisible" ref="edit" @hidden="dialogHidden" />
    </div>
</template>

<script lang='ts' >
import { Vue, Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

import searchBar, { Type, Option } from '@/components/searchBar.vue';
import Pagination from '@/mixins/pagination';
import { getTypeList } from '@/api/instructions/type';
import { isNotEmpty } from '@/utils/validate';
import edit from './edit.vue';

@Component({
    name: 'InstructionsType',
    components: {
        searchBar,
        edit,
    },
    filters: {
        isOnboard: (value: number) => (value === 1 ? '是' : '不是' ),
    },
})
export default class Organize extends mixins(Pagination) {
    private options: Option[] = [
        { title: '新增指标类型', emit: 'handleInsert', icon: '', type: Type.warning },
    ];

    private keyword: string = '';
    private tableData: any[] = [];
    private editVisible: boolean = false;

    public async init() {
        const requestData = {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            ...isNotEmpty(this.keyword) && {
                keyword: this.keyword.trim(),
            },
        };
        const { data }  = await getTypeList(requestData);
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
        this.init();
    }

    private handleInsert() {
        this.editVisible = true;
        this.$nextTick(() => {
            (this.$refs.edit as any).init();
        });
    }

    private handleModify(obj: any) {
        this.editVisible = true;
        this.$nextTick(() => {
            (this.$refs.edit as any).init(obj);
        });
    }
}
</script>
<style lang="scss" scoped>
.container{
    padding: 1vw 3vw 0;
}
</style>
