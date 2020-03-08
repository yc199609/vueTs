<template>
    <div>
        首页
        <el-button @click="getStore">点击</el-button>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
    name: 'Login',
})
export default class extends Vue {
    private getStore() {
        console.log(this.$store);
    }
}
</script>
