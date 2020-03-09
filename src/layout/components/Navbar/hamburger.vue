<template>
    <div
        class="iconBox"
        @click="toggleClick"
    >
        <i class="fz18" :class="{
            'el-icon-s-fold':isActive,
            'el-icon-s-unfold':!isActive
        }"></i>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
    name: 'Hamburger',
})
export default class extends Vue {
    @Prop({ default: false }) private isActive!: boolean;

    private toggleClick() {
        this.$emit('toggleClick');
    }
}
</script>
<style lang="scss" scoped>
.fz18{
    font-size: 20px;
}
.iconBox{
    display: flex;
    align-items: center;
}
</style>
