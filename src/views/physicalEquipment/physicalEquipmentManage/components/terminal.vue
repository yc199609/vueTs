<template>
    <el-dialog
        :append-to-body="true"
        :modal-append-to-body="false"
        :visible.sync="visible"
        :closeOnClickModal="false"
        :title="modelOption.title"
        @close="onClose"
    >
        <el-form>
            <el-form-item label="终端code">
                <el-select
                    filterable
                    remote
                    clearable
                    :remote-method="handleSearchCode"
                    v-model="form.terminalId"
                    :disabled="modelOption.disable" 
                    style="width:100%;"
                >
                    <el-option
                        v-for="(item,index) in terminalList"
                        :key="index"
                        :label="item.code"
                        :value="item.id"
                    />
                </el-select>
            </el-form-item>

            <el-form-item v-if="modelOption.disable" label="绑定时间">
                <el-input v-model.trim="form.bindTime" disabled ></el-input>
            </el-form-item>

            <el-form-item label="备注">
                <el-input v-model.trim="form.remark" :disabled="modelOption.disable"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="submit">{{modelOption.title}}</el-button>
        </div>
    </el-dialog>
</template>

<script lang='ts' >
import { Vue, Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import moment from 'moment';

import { Dialog } from '@/mixins';
import { getTerminalByIds, getAllTerminal, getIsNotBind, bindDevice, unboundDevice } from '@/api/physicalEquipment/physicalEquipmentManage';

interface Terminal {
    id: number;
    bindTime: string;
    deviceId: number;
    deviceLocationId: number;
    remark: string;
    terminalCode: string;
    terminalId: number;
    terminalTypeId: number;
}

enum Model {
    bind,
    unbind,
}

@Component({
    name: 'terminal',
})
export default class extends mixins(Dialog) {
    private model: Model = Model.unbind;
    private terminalList: Array<{id: number, code: string}> = [];
    private unbindList: Array<{id: number, code: string}> = [];
    private form: any = {
        bindTime: undefined,
        remark: '',
        terminalId: undefined,
    };
    private device = {
        deviceId: -1,
        deviceLocationId: -1,
    };

    public async init(data: { deviceId: number, deviceLocationId: number}) {
        this.device = data;
        this.visible = true;
        const {data: terminals} = await getTerminalByIds(data);
        if (terminals && terminals.length > 0 && terminals[0].terminalCode) {
            // data存在且terminalCode有值 已经绑定了终端
            this.model = Model.bind;
            this.bindInit(terminals[0]);
        } else {
            this.model = Model.unbind;
            this.unbindInit();
        }
    }

    private get modelOption() {
        if (this.model === Model.bind) {
            return {
                title: '解绑终端',
                disable: true,
                submitFn: unboundDevice,
                msg: '解绑成功',
            };
        } else {
            return {
                title: '绑定终端',
                disable: false,
                submitFn: bindDevice,
                msg: '绑定成功',
            };
        }
    }

    private async bindInit(terminal: Terminal) {
        const bindTime = moment.utc(terminal.bindTime).local().format('YYYY年MM月DD日 HH:mm:ss');

        this.form.bindTime = bindTime;
        this.form.terminalId = terminal.terminalId;
        this.form.remark = terminal.remark;

        const { data } = await getAllTerminal();
        const bindterminal = data.find((item: {id: number}) => item.id === terminal.terminalId);
        this.terminalList = [bindterminal];
    }

    private async unbindInit() {
        const { data } = await getIsNotBind();
        this.unbindList = data;
        this.terminalList = data.slice(0, 50);
    }

    private handleSearchCode(query: string) {
        let n = 0;
        this.terminalList = this.unbindList.filter((item) => {
            if (item.code.includes(query) && n < 50) {
                n ++;
                return true;
            }
            return false;
        });
    }

    private async submit() {
        await this.modelOption.submitFn({
            ...this.form,
            ...this.device,
        });
        this.$message({
            type: 'success',
            message: this.modelOption.msg,
            duration: 500,
            onClose: () => {
                this.visible = false;
            },
        });
    }
}
</script>
