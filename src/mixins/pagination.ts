import { Vue, Component } from 'vue-property-decorator';

@Component({
    name: 'Pagination',
})
export default class extends Vue {
    protected pageIndex: number = 1;
    protected pageSize: number = 10;
    protected totalCount: number = 20;

    protected handleSizeChange(val: number) {
        this.pageSize = val;
        this.init();
    }
    protected handleCurrentChange(val: number) {
        this.pageIndex = val;
        this.init();
    }
    protected init() {}
}
