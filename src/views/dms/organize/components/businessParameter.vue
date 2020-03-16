<template>
    <el-dialog :visible.sync="visible" :closeOnClickModal="false" @close="onClose" title="业务参数">
        <el-table :data="tableData" border>
            <template slot="empty">
                <div class="empty">
                    <img src="@/assets/empty.png">
                    <p>暂无数据</p>
                </div>
            </template>
            <el-table-column align="center" prop="code" label="代码" />
            <el-table-column align="center" prop="name" label="名称" />
            <el-table-column align="center" prop="value" label="值" >
                <template slot-scope="{row}">
                    {{((row.value).length > 10) ? (row.value).substring(0, 8) + '......' : row.value}}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="description" label="备注" />
            <el-table-column align="right" label="操作" >
                <template slot="header">
                    <el-button type="success" plain round icon="el-icon-plus">新增</el-button>
                </template>
                <template slot-scope="{row}">
                    <el-button type="warning" icon="el-icon-edit" @click="modify(row)" >修改值</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
</template>

<script lang='ts' >
import { Vue, Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';

import Dialog from '@/mixins/dialog';

@Component({
    name: 'businessParameter',
})
export default class extends mixins(Dialog) {
    private tableData = [];
    public init() {
        this.visible = true;
    }
}
</script>
