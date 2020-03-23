<template>
    <div class="container">
        <searchBar @search="search" />
        <el-card style="margin-top:10px;">
            <el-table border :data="tableData" >
                <template slot="empty">
                    <div class="empty">
                        <img src="@/assets/empty.png">
                        <p>暂无数据</p>
                    </div>
                </template>
                <el-table-column align="center" prop="system" label="所属系统"></el-table-column>
                <el-table-column align="center" prop="logMsg" label="备注"></el-table-column>
                <el-table-column align="center" prop="userId" label="用户id"></el-table-column>
                <el-table-column align="center" prop="userName" label="操作者用户名"></el-table-column>
                <el-table-column align="center" prop="clientIp" label="浏览器IP"></el-table-column>
                <el-table-column align="center" prop="logDate" label="记录时间"></el-table-column>
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
    </div>
</template>

<script lang='ts' >
import { Vue, Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

import { Pagination } from '@/mixins';
import { optGetList } from '@/api/bizLog';
import { isNotEmpty } from '@/utils/validate';
import searchBar from '@/components/searchBar.vue';

@Component({
    name: 'Opt',
    components: {
        searchBar,
    },
})
export default class extends mixins(Pagination) {
    private tableData = [];
    private keyword: string = '';

    public async init() {
        const { data } = await optGetList({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            ...isNotEmpty(this.keyword) && {
                keyword: this.keyword.trim(),
            },
        });
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
}
</script>
<style lang="scss" scoped>
.container{
    padding: 1vw 3vw 0;
}
</style>
