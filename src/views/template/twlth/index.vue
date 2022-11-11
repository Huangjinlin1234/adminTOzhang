<template>
  <div>
    <formTable :tableTitle="tableTitle" :yformFileds="yformFileds" :tableFileds="tableFileds">
      <div slot="button">
        <el-button @click="zx">征信报告查看记录</el-button>
        <el-button @click="add">查看</el-button>
      </div>
    </formTable>
    <addPage 
      :dialog-view.sync="dialogView" 
      :dialog-title="dialogTitle" 
      :dialog-width="dialogWidth" 
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
    <fTable 
      :dialog-view.sync="dialogViewZx" 
      :dialog-title="dialogTitleZx" 
      :dialog-width="dialogWidth"
      :table-fields="tableFieldsZx">
    </fTable>
  </div>
</template>

<script>
import formTable from '../third/formTable.vue';
import addPage from '@/components/layout/guidePage';
import selectPage from '@/components/layout/selectPage'
import fTable from './formTable.vue';
export default {
  components: { formTable, addPage, selectPage, fTable },
  data() {
    return {
      tableTitle: '征信查询台账列表',
      yformFileds: [
        { label: '客户名称', prop: '测试2', ctype: 'input' },
        { label: '证件类型', prop: '测试2', ctype: 'input' },
        { label: '证件号码', prop: '测试2', ctype: 'input' },
        { label: '征信报告编号', prop: '测试2', ctype: 'input' },
        { label: '登记人', prop: '测试2', ctype: 'input' },
        { label: '登记机构', prop: '测试2', ctype: 'input' }
      ],
      tableFileds: [
        { label: '征信查询流水号', prop: 'borrrowNo' },
        { label: '授权书编号', prop: 'borrrowNo' },
        { label: '客户名称', prop: 'borrrowNo' },
        { label: '证件类型', prop: 'borrrowNo' },
        { label: '证件号码', prop: 'borrrowNo' },
        { label: '征信查询类别', prop: 'borrrowNo' },
        { label: '查询对象类型', prop: 'borrrowNo' },
        { label: '授权方式', prop: 'borrrowNo' },
        { label: '征信查询业务阶段', prop: 'borrrowNo' },
        { label: '征信查询原因', prop: 'borrrowNo' },
        { label: '发起查询渠道', prop: 'borrrowNo' },
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
      dialogWidth: '1000px',
      formData: {},
      formFields: [
        { label: '征信查询类别', prop: 'operType', ctype: 'select', options: [
          { label: '个人', value: '01' }, 
          { label: '企业', value: '02' }] 
        },
        { label: '授权书编号', prop: 'coProType', ctype: 'input' },
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
      dialogViewZx: false,
      dialogTitleZx: '征信报告查看记录列表',
      tableFieldsZx: [
        { label: '查看员工姓名', prop: 'borrrowNo' },
        { label: '查看员工号', prop: 'borrrowNo' },
        { label: '所在机构', prop: 'borrrowNo' },
        { label: '岗位', prop: 'borrrowNo' },
        { label: '查看IP地址', prop: 'borrrowNo' },
        { label: '查看时间', prop: 'borrrowNo' }
      ]
    }
  },
  methods: {
    zx() {
      this.dialogViewZx = true;
    },
    add() {
      this.dialogView = true;
    },
    nextStep() {
      this.dialogViewSq = true;
    }
  }
}
</script>

<style>

</style>