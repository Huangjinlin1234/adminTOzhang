<template>
  <div>
    <formTable :tableTitle="tableTitle" :yformFileds="yformFileds" :tableFileds="tableFileds">
      <div slot="button">
        <el-button @click="add">重新查询</el-button>
        <el-button @click="add">查看征信报告</el-button>
        <el-button @click="add">查看</el-button>
        <el-button @click="add">修改</el-button>
        <el-button @click="add">删除</el-button>
        <el-button type="primary" @click="add">新增</el-button>
      </div>
    </formTable>
  </div>
</template>

<script>
import formTable from '../third/formTable.vue';
import addPage from '@/components/layout/guidePage';
import selectPage from '@/components/layout/selectPage'
export default {
  components: { formTable, addPage, selectPage },
  data() {
    return {
      tableTitle: '企业征信查询列表',
      yformFileds: [
        { label: '客户名称', prop: '测试2', ctype: 'input' },
        { label: '证件类型', prop: '测试2', ctype: 'input' },
        { label: '证件号码', prop: '测试2', ctype: 'input' },
        { label: '征信报告编号', prop: '测试2', ctype: 'input' },
        { label: '登记人', prop: '测试2', ctype: 'input' },
        { label: '登记机构', prop: '测试2', ctype: 'input' },
        { label: '查询审批状态', prop: '测试2', ctype: 'select' }
      ],
      tableFileds: [
        { label: '征信查询流水号', prop: 'borrrowNo' },
        { label: '授权书编号', prop: 'borrrowNo' },
        { label: '客户名称', prop: 'borrrowNo' },
        { label: '证件类型', prop: 'borrrowNo' },
        { label: '证件号码', prop: 'borrrowNo' },
        { label: '查询对象类型', prop: 'borrrowNo' },
        { label: '征信查询业务阶段', prop: 'borrrowNo' },
        { label: '征信查询原因', prop: 'borrrowNo' },
        { label: '查询审批状态', prop: 'borrrowNo' },
        { label: '查询日期', prop: 'borrrowNo' },
        { label: '征信报告编号', prop: 'borrrowNo' },
        { label: '报告生成时间', prop: 'borrrowNo' },
        { label: '登记人', prop: 'borrrowNo' },
        { label: '登记机构', prop: 'borrrowNo' },
        { label: '登记日期', prop: 'borrrowNo' },
      ]
    }
  },
  methods: {
    add() {
      this.dialogView = true;
    }
  }
}
</script>

<style>

</style>