<template>
  <div>
    <formTable :yformFileds="yformFileds" :tableFileds="tableFileds">
      <div slot="button">
        <el-button type="primary" @click="add">查看详情</el-button>
      </div>
    </formTable>
  </div>
</template>

<script>
import formTable from './formTable.vue'
export default {
  components: { formTable },
  data() {
    return {
      yformFileds: [
        { label: '押品编号', prop: '测试2', ctype: 'input' },
        { label: '押品类型', prop: '测试2', ctype: 'select' },
        { label: '权属人名称', prop: '测试2', ctype: 'input' },
        { label: '权属人证件类型', prop: '测试2', ctype: 'input' },
        { label: '权属人证件号码', prop: '测试2', ctype: 'input' },
        { label: '押品名称', prop: '测试2', ctype: 'input' },
        { label: '抵质押状态', prop: '测试2', ctype: 'select' },
        { label: '所属机构', prop: '测试2', ctype: 'select' }
      ],
      tableFileds: [
        { label: '押品编号', prop: 'borrrowNo' },
        { label: '唯一性校验编号', prop: 'borrrowNo' },
        { label: '押品名称', prop: 'borrrowNo' },
        { label: '押品类型', prop: 'borrrowNo' },
        { label: '担保方式', prop: 'borrrowNo' },
        { label: '权属人名称', prop: 'borrrowNo' },
        { label: '权属人证件号码', prop: 'borrrowNo' },
        { label: '评估价值（元）', prop: 'borrrowNo' },
        { label: '担保合同号', prop: 'borrrowNo' },
        { label: '抵质押物状态', prop: 'borrrowNo' },
        { label: '主管客户经理', prop: 'borrrowNo' },
        { label: '所属机构', prop: 'borrrowNo' }
      ],
    }
  },
  methods: {
    add() {
      
    }
  }
};
</script>

<style>

</style>