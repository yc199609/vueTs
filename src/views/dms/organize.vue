<template>
    <div class="container">
        <searchBar :options="options" @search="search" @createOrange="createOrange" />
        <el-card style="margin-top:10px;">
            <el-table border :data="tableData" >
                <el-table-column align="center" prop="name" label="简称"></el-table-column>
                <el-table-column align="center" prop="code" label="代码"></el-table-column>
                <el-table-column align="center" prop="dmsSite" label="站点"></el-table-column>
                <el-table-column align="center" prop="isDMSEnable" label="状态"></el-table-column>
                <el-table-column align="center" prop="parentCompanyName" label="父级机构名"></el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <el-tooltip content="基本信息" placement="top" effect="dark">
                            <el-button type="info" icon="el-icon-document" @click="baseInfo(scope.row.id)"></el-button>
                        </el-tooltip>

                        <el-tooltip content="机构设置" placement="top" effect="dark">
                            <el-button type="warning" icon="el-icon-setting" @click="setOrganize(scope.row.id)"></el-button>
                        </el-tooltip>

                        <el-tooltip content="绑定物理设备" placement="top" effect="dark">
                            <el-button type="primary" icon="el-icon-plus" @click="bindDevice(scope.row.id, scope.row.name)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script lang='ts' >
import { Vue, Component } from 'vue-property-decorator';
import searchBar, { Type, Option } from '@/components/searchBar.vue';
import { getCompanyList } from '@/api/dms/organize';

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
    },
})
export default class extends Vue {
    private options: Option[] = [
        { title: '创建机构', emit: 'createOrange', icon: '', type: Type.warning },
    ];
    private pageIndex: number = 1;
    private pageSize: number = 20;
    private totalCount: number = 20;
    private tableData: Item[] = [];

    private mounted() {
        this.init();
    }

    private search(keyword: string) {
        console.log('search', keyword);
    }
    private createOrange() {
        console.log('createOrange');
    }

    private async init() {
        const { data }  = await getCompanyList({
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
        });
        this.pageIndex = data.pageIndex;
        this.pageSize = data.pageSize;
        this.totalCount = data.totalCount;
        this.tableData = data.items;
    }
    private baseInfo() {

    }
    private setOrganize() {

    }
    private bindDevice() {

    }
}
</script>
<style lang="scss" scoped>
.container{
    padding: 1vw 3vw 0;
}
</style>
