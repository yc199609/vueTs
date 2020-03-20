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
                <el-table-column align="center" prop="name" label="简称"></el-table-column>
                <el-table-column align="center" prop="code" label="代码"></el-table-column>
                <el-table-column align="center" prop="dmsSite" label="站点"></el-table-column>
                <el-table-column align="center" prop="isDMSEnable" label="状态"></el-table-column>
                <el-table-column align="center" prop="parentCompanyName" label="父级机构名"></el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <el-tooltip content="基本信息" placement="top" effect="dark">
                            <el-button size="small" type="info" icon="el-icon-document" @click="handleBaseInfo(scope.row.id)"></el-button>
                        </el-tooltip>

                        <el-tooltip content="机构设置" placement="top" effect="dark">
                            <el-button size="small" type="warning" icon="el-icon-setting" @click="handleSetupOrganize(scope.row.id)"></el-button>
                        </el-tooltip>

                        <el-tooltip content="业务参数" placement="top" effect="dark">
                            <el-button size="small" type="success" icon="el-icon-menu" @click="handleBusParams(scope.row.id)"></el-button>
                        </el-tooltip>

                        <el-tooltip content="绑定物理设备" placement="top" effect="dark">
                            <el-button size="small" type="primary" icon="el-icon-plus" @click="handleBindDevice(scope.row.id, scope.row.name)"></el-button>
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
        <baseInformation ref="baseInfo" v-if="baseInfoVisible" @hidden='dialogHidden' />
        <createOrganize ref="createOrganize" v-if="createOrganizeVisible" @hidden='dialogHidden' />
        <setupOrganize ref="setupOrganize" v-if="setupOrganizeVisible" @hidden='dialogHidden' />
        <businessParameter ref="busParams" v-if="busParamsVisible" @hidden='dialogHidden' />
        <bindPhysiDevice ref="bindPhysiDevice" v-if="bindPhysiDeviceVisible" @hidden='dialogHidden' />
    </div>
</template>

<script lang='ts' >
import { Vue, Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

import searchBar, { Type, Option } from '@/components/searchBar.vue';
import Pagination from '@/mixins/pagination';
import { getCompanyList } from '@/api/dms/organize';
import { isNotEmpty } from '@/utils/validate';
import { baseInformation, createOrganize, setupOrganize, businessParameter, bindPhysiDevice } from './components';

interface Item {
    code: string;
    dmsSite: string;
    fullName: string;
    id: number;
    isDMSEnable: boolean;
    name: string;
    parentCompanyId: number;
    parentCompanyName: string;
}

@Component({
    name: 'Organize',
    components: {
        searchBar,
        baseInformation,
        createOrganize,
        setupOrganize,
        businessParameter,
        bindPhysiDevice,
    },
})
export default class Organize extends mixins(Pagination) {
    private baseInfoVisible: boolean = false;
    private createOrganizeVisible: boolean = false;
    private setupOrganizeVisible: boolean = false;
    private busParamsVisible: boolean = false;
    private bindPhysiDeviceVisible: boolean = false;
    private options: Option[] = [
        { title: '创建机构', emit: 'handleInsert', icon: '', type: Type.warning },
    ];

    private keyword: string = '';
    private tableData: Item[] = [];

    public async init() {
        const requestData = {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            ...isNotEmpty(this.keyword) && {
                keyword: this.keyword,
            },
        };
        const { data }  = await getCompanyList(requestData);
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
        this.baseInfoVisible = false;
        this.createOrganizeVisible = false;
        this.setupOrganizeVisible = false;
        this.busParamsVisible = false;
        this.bindPhysiDeviceVisible = false;
        this.init();
    }

    private handleInsert() {
        this.createOrganizeVisible = true;
        this.$nextTick(() => {
            (this.$refs.createOrganize as any).init();
        });
    }

    private handleBaseInfo(id: number) {
        this.baseInfoVisible = true;
        this.$nextTick(() => {
            (this.$refs.baseInfo as any).init(id);
        });
    }

    private handleSetupOrganize(id: number) {
        this.setupOrganizeVisible = true;
        this.$nextTick(() => {
            (this.$refs.setupOrganize as any).init(id);
        });
    }
    private handleBindDevice(id: number, name: string) {
        this.bindPhysiDeviceVisible = true;
        this.$nextTick(() => {
            (this.$refs.bindPhysiDevice as any).init(id, name);
        });
    }
    private handleBusParams(id: number) {
        this.busParamsVisible = true;
        this.$nextTick(() => {
            (this.$refs.busParams as any).init(id);
        });
    }
}
</script>
<style lang="scss" scoped>
.container{
    padding: 1vw 3vw 0;
}
</style>
