/**
    搜索框组件
 */

<template>
    <el-card>
        <el-input 
            v-if="!hiddenInput"
            class="input"
            size="small"
            v-model="keyword" 
            :clearable="true" 
            placeholder="请输入内容"
        />

        <el-button
            v-if="!hiddenSearch"
            type="success"
            icon="el-icon-search" 
            plain
            size="small"
            @click="hanleClick('search')"
        >搜索</el-button>

        <el-button
            v-for="(item, index) in options"
            :key="index"
            :type="item.type"
            :icon="item.icon" 
            plain
            size="small"
            @click="hanleClick(item.emit)"
        >{{item.title}}</el-button>
    </el-card>
</template>

<script lang='ts' >
import { Vue, Component, Prop } from 'vue-property-decorator';

export enum Type {
    primary = 'primary',
    success = 'success',
    info = 'info',
    warning = 'warning',
    danger = 'danger',
    normal = '',
}

export interface Option {
    title: string;
    emit: string;
    type: Type;
    icon: string;
}

@Component({
    name: 'SearchBar',
})
export default class extends Vue {
    @Prop({ default: () => ([])}) private options!: Option[];
    @Prop({default: false}) private hiddenSearch!: boolean;
    @Prop({default: false}) private hiddenInput!: boolean;

    private keyword: string = '';

    private hanleClick(emit: string) {
        // 调用父组件中的方法
        try {
            (this.$parent as any)[emit](this.keyword);
        } catch (e) {
            console.error(`调用searchBar的组件中不存在${emit}方法`);
        }
    }
}
</script>
<style lang="scss" scoped>
.el-card{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}
.el-button{
    margin: 0 10px;
}
.input{
    width: 150px;
}
</style>
