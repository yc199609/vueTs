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
                <el-table-column align="center" prop="id" label="数据库ID"></el-table-column>
                <el-table-column align="center" prop="name" label="名称"></el-table-column>
                <el-table-column align="center" prop="dbName" label="数据库名"></el-table-column>
                <el-table-column align="center" label="服务器IP/端口">
                    <template slot-scope="scope">
                        <p>IP:{{ scope.row.ip }}</p>
                        <p>端口:{{ scope.row.port }}</p>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="userName" label="数据库用户名"></el-table-column>
                <el-table-column align="center" prop="status" label="状态">
                    <template slot-scope="scope">
                        <el-tag :type="statusFormat(scope.row.status).type">{{ statusFormat(scope.row.status).text }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template>
                        <el-tooltip content="修改名称" placement="top" effect="dark">
                            <el-button size="small" type="primary" icon="el-icon-edit-outline" />
                        </el-tooltip>
                        <el-tooltip content="修改配置" placement="top" effect="dark">
                            <el-button size="small" type="warning" icon="el-icon-setting" />
                        </el-tooltip>
                        <el-tooltip content="删除" placement="top" effect="dark">
                            <el-button size="small" type="danger" icon="el-icon-setting" />
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script lang='ts' >
import { Vue, Component } from 'vue-property-decorator';

import { dataBaseList } from '@/api/systemSetup/dataBase';
import { isNotEmpty } from '@/utils/validate';
import searchBar from '@/components/searchBar.vue';

@Component({
    name: 'dataBase',
    components: {
        searchBar,
    },
})
export default class extends Vue {
    private tableData = [];
    private keyword: string = '';

    public async init() {
        const { data } = await dataBaseList({
            ...isNotEmpty(this.keyword) && {
                keyword: this.keyword.trim(),
            },
        });
        this.tableData  = data;
    }

    private statusFormat(num: number) {
        if (num === 100) {
            return {
                text: '启用',
                type: 'success',
            };
        } else {
            return {
                text: '停用',
                type: 'danger',
            };
        }
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
