<template>
  <div>
    <formTable :tableTitle="tableTitle" :yformFileds="yformFileds" :tableFileds="tableFileds" v-if="nxt">
      <div slot="button">
        <el-button @click="add">重新查询</el-button>
        <el-button @click="add">查看征信报告</el-button>
        <el-button @click="watch">查看</el-button>
        <el-button @click="add">修改</el-button>
        <el-button @click="add">删除</el-button>
        <el-button type="primary" @click="add">新增</el-button>
      </div>
    </formTable>
    <addPage 
      :dialog-view.sync="dialogView" 
      :dialog-title="dialogTitle" 
      :form-fields="formFields" 
      :form-data="formData" 
      :btn-fields="btnFields">
    </addPage>
    <select-page 
      :dialog-view.sync="dialogViewSq" 
      :dialog-title="dialogTitleSq" 
      :dialog-width="dialogWidth" 
      :form-fields="formFieldsSq" 
      :table-fields="tableFieldsSq">
    </select-page>
    <addInfo v-if="!nxt"></addInfo>
  </div>
</template>

<script>
import formTable from '../third/formTable.vue';
import addPage from '@/components/layout/guidePage';
import selectPage from '@/components/layout/selectPage'
import addInfo from './addInfo.vue'
export default {
  components: { formTable, addPage, selectPage, addInfo },
  data() {
    return {
      tableTitle: '个人征信查询列表',
      yformFileds: [
        { label: '客户名称', prop: '测试2', ctype: 'input' },
        { label: '证件类型', prop: '测试2', ctype: 'select' },
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
      ],
      dialogView: false,
      dialogTitle: '征信查询新增——向导',
      formData: {},
      formFields: [
        { label: '征信查询类别', prop: 'operType', ctype: 'select', options: [
          { label: '个人', value: '01' }, 
          { label: '企业', value: '02' }] 
        },
        { label: '授权书编号', prop: 'coProType', ctype: 'input', icon: 'el-icon-search', iconClick: this.selCus },
        { label: '客户名称', prop: 'coProType2', ctype: 'input' },
        { label: '证件类型', prop: 'coProType2', ctype: 'input' },
        { label: '证件号码', prop: 'coProType2', ctype: 'input' },
        { label: '授权统一流水号', prop: 'coProType2', ctype: 'input' }
      ],
      btnFields: [
        { label: '下一步', type: 'primary', clickFn: this.nextStep },
        // { label: '重置', etype: 'reset' },
        { label: '返回', etype: 'cancel' }
      ],
      dialogViewSq: false,
      dialogTitleSq: '授权书编号选择页面',
      formFieldsSq: [
        { label: '授权书编号', prop: 'custName' },
        { label: '客户名称', prop: 'custName' },
        { label: '证件类型', prop: 'custId' },
        { label: '证件号码', prop: 'custId' },
      ],
      tableFieldsSq: [
      { label: '授权书编号', prop: 'custId' },
      { label: '授权统一流水号', prop: 'custId' },
      { label: '征信查询类别', prop: 'custId' },
      { label: '客户名称', prop: 'custId' },
      { label: '证件类型', prop: 'custId' },
      { label: '证件号码', prop: 'custId' },
      { label: '查询对象类型', prop: 'custId' },
      { label: '授权状态', prop: 'custId' },
      { label: '登记人', prop: 'custId' },
      { label: '登记机构', prop: 'custId' },
      { label: '登记日期', prop: 'custId' }
      ],
      nxt: true
    }
  },
  methods: {
    watch() {
      this.nxt = false;
    },
    add() {
      this.dialogView = true;
    },
    selCus() {
      this.dialogViewSq = true;
    },
    nextStep() {
      this.nxt = false;
      this.dialogView = false;
    }
  }
}
</script>

<style>

</style>