<template>
    <div
        @click="toggleClick"
    >
        <i class="el-icon-s-fold" style="font-size:18px;"></i>
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
