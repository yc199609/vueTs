<template>
    <div class="container">
        <el-card>
            <div slot="header">
                <span class="title">功能列表</span>
                <el-button 
                    class="btn-add" 
                    icon="el-icon-plus" 
                    type="text" 
                    @click="insert"
                >新增功能</el-button>
            </div>
            <el-tree :data="treeData" :props="{
                children: 'nodes',
                label: 'menuName',
            }">
                <span slot-scope="{ node, data }" class="custom-tree-node">
                    <span>{{ data.menuName? data.menuName: data.functionName }}</span>
                    <span>
                        <el-button type="text" size="mini" @click.stop="viewDetail(data)">查看详情</el-button>
                        <el-button type="text" size="mini" @click.stop="deleteDep(data)">删除</el-button>
                    </span>
                </span>
            </el-tree>
        </el-card>
        <edit v-if="dialogVisible" ref="edit" :nodes="treeData" @hidden='dialogHidden' />
    </div>
</template>

<script lang='ts' >
import { Vue, Component } from 'vue-property-decorator';
import { getMenuFunction, updateMenuFunction, deleteMenuFunction, createMenuFunction } from '@/api/dms/fnTree';
import edit from './edit.vue';

export interface TreeNode {
    functionCode: string;
    functionId: number;
    functionName: string;
    functionParentId: number;
    menuCode: string;
    menuId: number;
    menuName: string;
    menuOrderIndex: number;
    menuParentId: number;
    opType: number;
    nodes: TreeNode[];
}

@Component({
    name: 'FnTree',
    components: {
        edit,
    },
})
export default class extends Vue {
    private treeData: TreeNode[] = [];
    private dialogVisible: boolean = false;

    private mounted() {
        this.init();
    }

    private async init() {
        const { data } = await getMenuFunction();
        this.treeData = data.nodes;
    }
    private insert() {
        this.dialogVisible = true;
        this.$nextTick(() => {
            (this.$refs.edit as any).init();
        });
    }
    private viewDetail(data: TreeNode) {
        this.dialogVisible = true;
        this.$nextTick(() => {
            (this.$refs.edit as any).init(data);
        });
    }

    private async deleteDep(data: TreeNode) {
        await deleteMenuFunction({
            menuId: data.menuId,
            functionId: data.functionId,
        });
        this.$message({
            type: 'success',
            message: '删除成功',
            duration: 500,
            onClose: () => {
                this.init();
            },
        });
    }

    private dialogHidden() {
        this.dialogVisible = false;
        this.init();
    }
}
</script>
<style lang="scss" scoped>
    .container{
        padding: 1vw 3vw 0;
        .title{
            font-size:18px;
            font-weight:700;
        }
        .btn-add{
            float:right;
            padding:3px 0;
        }
        .custom-tree-node{
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
    }
</style>
