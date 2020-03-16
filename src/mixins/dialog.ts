import { Vue, Component } from 'vue-property-decorator';

@Component({
    name: 'Dialog',
})
export default class extends Vue {
    protected visible: boolean = false;

    protected onClose() {
        this.$emit('hidden');
    }
    protected init(...arg: any[]) {}
}
