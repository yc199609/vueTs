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
                    <template slot-scope="scope">
                        <el-tooltip content="修改名称" placement="top" effect="dark">
                            <el-button size="small" type="primary" icon="el-icon-edit-outline" @click="handleChangeName(scope.row)" />
                        </el-tooltip>
                        <el-tooltip content="修改配置" placement="top" effect="dark">
                            <el-button size="small" type="warning" icon="el-icon-setting" @click="handleModifyConfig(scope.row)" />
                        </el-tooltip>
                        <el-tooltip :content="statusFormat(scope.row.status,false).text" placement="top" effect="dark">
                            <el-button 
                                size="small" 
                                :type="statusFormat(scope.row.status,false).type" 
                                :icon="statusFormat(scope.row.status,false).icon"
                                @click="handleChangeStatus(scope.row)"
                            />
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <changeName v-if="changeNameVisible" ref="changeName" @hidden="dialogHidden" />
        <modifyConfig v-if="modifyConfigVisible" ref="modifyConfig" @hidden="dialogHidden" />
    </div>
</template>

<script lang='ts' >
import { Vue, Component } from 'vue-property-decorator';

import { dataBaseList, updateStatus } from '@/api/systemSetup/dataBase';
import { isNotEmpty } from '@/utils/validate';
import searchBar from '@/components/searchBar.vue';

import changeName from './components/changeName.vue';
import modifyConfig from './components/modifyConfig.vue';

export interface DB {
    dbName: string;
    id: number;
    ip: string;
    isDefault: number;
    name: string;
    port: number;
    status: number;
    userName: string;
}

@Component({
    name: 'dataBase',
    components: {
        searchBar,
        changeName,
        modifyConfig,
    },
})
export default class extends Vue {
    private tableData = [];
    private keyword: string = '';
    private changeNameVisible: boolean = false;
    private modifyConfigVisible: boolean = false;

    public async init() {
        const { data } = await dataBaseList({
            ...isNotEmpty(this.keyword) && {
                keyword: this.keyword.trim(),
            },
        });
        this.tableData  = data;
    }

    private mounted() {
        this.init();
    }

    private statusFormat(num: number, flag: boolean = true) {
        const OPEN = {
            text: '启用',
            type: 'success',
            icon: 'el-icon-circle-check',
        };
        const PAUSE = {
            text: '停用',
            type: 'danger',
            icon: 'el-icon-remove-outline',
        };
        if (flag) {
            if (num === 100) {
                return OPEN;
            } else {
                return PAUSE;
            }
        } else {
            if (num === 100) {
                return PAUSE;
            } else {
                return OPEN;
            }
        }
    }

    private handleChangeName(data: DB) {
        this.changeNameVisible = true;
        this.$nextTick(() => {
            (this.$refs.changeName as any).init(data);
        });
    }

    private handleModifyConfig(data: DB) {
        this.modifyConfigVisible = true;
        this.$nextTick(() => {
            (this.$refs.modifyConfig as any).init(data);
        });
    }

    private handleChangeStatus( data: DB) {
        updateStatus({
            id: data.id,
            status: data.status === 0 ? 100 : 0,
        });
        this.$message({
            type: 'success',
            message: `已成功${data.status === 0 ? '启用' : '停用'}`,
            duration: 500,
            onClose: () => {
                this.init();
            },
        });
    }

    private dialogHidden() {
        this.changeNameVisible = false;
        this.modifyConfigVisible = false;
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
