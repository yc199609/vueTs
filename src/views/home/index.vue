<template>
    <div class="dashboard-container">
        <p>联桥网云用数据采集、云平台连接方面的优势，搭建个性化应用云平台。帮助不同行业快速、高效地收集和分析数据，用数据辅助决策、提供服务，体现价值，实现新的业务模式和服务空间。</p>
        <p>联桥网云成功地与北京山水云图科技有限公司（山水云图）达成合作，从技术创新上支持山水云图在环境保护领域用数据解译水土共治的理念和提供治理规划方案。具体体现在提出以面代点、用遥感光谱技术表示土壤成分，搭建信息化土壤快速采集检测系统。用数据把行政区域(地图)、地块、土样、格盘、入库、分样、送检、管理、快速检测和结果显示实时绑定起来，最终降低土壤检测成本，提高土壤检测效率，加快土壤检测速度。</p>
        <p>联桥网云联手传统电机企业，实时采集、上传、处理、分析电机运行数据，从而掌握电机工作状态、寿命周期和运行效率。让传统电机企业与信息化系统相结合，为终端客户提供新的服务，包括减少电机停机时间、延长电机寿命、节省电机功耗、监测系统效率、核算运行成本等等。电机寿命的评估预测与电机运行环境、温度、振动、电压、电流等直接相关。除电压、电流外，我们无法获得和解析电机变频器（非电机厂提供）、控制器、上位机模块等电子系统数据，因此无法提供更多相关服务。只有电机厂提供电机信息化系统，并利用电机的这些参数，才可能为客户提供电机寿命评估预测和运维服务。</p>
        <p>联桥网云为桂林海威科技股份有限公司（桂林海威）搭建了消防灯云平台，为桂林海威和电信移动合作开发NBIoT物联网应用打下了基础。同时也为桂林海威提供了一套设备和生产线、设备和终端客户、设备和运营平台、终端客户和运营平台的信息化解决方案。最终为客户提供更好的服务，给消费者一个更好的体验。</p>
        <p>联桥网云和桂林海威自主研发的智能网关，是一款针对居家、社区、机构养老市场而设计的智能化设备，主要为老年人提供保健监管服务。通过有效便捷地监管、检测手段将老人的日常生活起居、健康状态数据实时上传到云端。数据经过有效处理后，借助互联网和移动终端，将有关信息推送到社区、医疗机构、亲友或子女手中。将老人的日常生活与他们的子女、亲友、社区、机构信息化地连接在一起，将老人按时吃药、定时检测、生活起居用数据的方式与亲友子女无距离绑定，以对老人提供及时有效地监管、医嘱、叮嘱和关爱。</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
    name: 'Home',
})
export default class extends Vue {
    private getStore() {
        console.log(this.$store);
    }
}
</script>
<style lang="scss" scoped>
.dashboard-container {
    padding: 30px;
    p {
        text-indent: 2em;
    }
}
</style>
