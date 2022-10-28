<template>
  <div class="container">
    <treeCollapse :page-options="pageOptions">
      <formTable :tableTitle="tableTitle" :yformFileds="yformFileds" :tableFileds="tableFileds">
        <div slot="button">
          <el-button @click="introduc">引入报告</el-button>
          <el-button @click="add">查看</el-button>
          <el-button @click="add">修改</el-button>
          <el-button @click="add">删除</el-button>
          <el-button type="primary" @click="add">新增查询</el-button>
        </div>
      </formTable>
      <guide-page 
        :dialog-view.sync="dialogView" 
        :dialog-title="dialogTitle" 
        :form-fields="formFields" 
        :form-data="formData" 
        :btn-fields="btnFields">
      </guide-page>
      <select-page 
        :dialog-view.sync="dialogViewP" 
        :dialog-title="dialogTitleP" 
        :dialog-width="dialogWidth" 
        :form-fields="formFieldsP" 
        :table-fields="tableFieldsP">
      </select-page>
      <guide-page 
        :dialog-view.sync="dialogViewA" 
        :dialog-title="dialogTitle" 
        :form-fields="formFieldsA" 
        :form-data="formDataA" 
        :btn-fields="btnFieldsA">
      </guide-page>
      <select-page 
        :dialog-view.sync="dialogViewBh" 
        :dialog-title="dialogTitleBh" 
        :dialog-width="dialogWidth" 
        :form-fields="formFieldsBh" 
        :table-fields="tableFieldsBh">
      </select-page>
      <select-page 
        :dialog-view.sync="dialogViewSq" 
        :dialog-title="dialogTitleSq" 
        :dialog-width="dialogWidth" 
        :form-fields="formFieldsSq" 
        :table-fields="tableFieldsSq">
      </select-page>
    </treeCollapse>
  </div>
</template>

<script>
import treeCollapse from '../first/treeCollapse.vue';
import formTable from './table.vue';
import guidePage from '@/components/layout/guidePage'
import selectPage from '@/components/layout/selectPage'
import { log } from 'console';
export default {
  components: { treeCollapse, formTable, guidePage, selectPage, log },
  data() {
    return {
      pageOptions: {
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        treeData: [
          {
            'name': '个人贷款申请',
            'children': [
              {
                'name': '基础信息'
              }, {
                'name': '关系人信息'
              }, {
                'name': '经营实体信息'
              }, {
                'name': '资产负债信息'
              }, {
                'name': '收入支出信息信息'
              }, {
                'name': '征信查询信息'
              }, {
                'name': '调查报告'
              }, {
                'name': '准入条件信息'
              }, {
                'name': '影像档案信息'
              }, {
                'name': '贷款业绩分配信息'
              }
            ]
          }
        ],
      },
      tableTitle: '征信查询申请列表',
      yformFileds: [],
      tableFileds: [
        { label: '授权书编号', prop: 'borrrowNo' },
        { label: '授权统一流水号', prop: 'borrrowNo' },
        { label: '客户名称', prop: 'borrrowNo' },
        { label: '证件类型', prop: 'borrrowNo' },
        { label: '证件号码', prop: 'borrrowNo' },
        { label: '查询对象类型', prop: 'borrrowNo' },
        { label: '授权方式', prop: 'borrrowNo' },
        { label: '征信查询业务阶段', prop: 'borrrowNo' },
        { label: '征信查询原因', prop: 'borrrowNo' },
        { label: '征信查询流水号', prop: 'borrrowNo' },
        { label: '查询审批状态', prop: 'borrrowNo' },
        { label: '查询日期', prop: 'borrrowNo' },
        { label: '征信报告编号', prop: 'borrrowNo' },
        { label: '报告生成时间', prop: 'borrrowNo' },
      ],
      dialogView: false,
      dialogTitle: '征信查询新增——向导',
      dialogWidth: '1000px',
      formData: {},
      formFields: [
        { label: '征信查询类别', prop: 'operType', ctype: 'select', options: [{ label: '个人', value: '01' }, { label: '企业', value: '02' }] }
      ],
      btnFields: [
        { label: '下一步', type: 'primary', clickFn: this.nextStep },
        // { label: '重置', etype: 'reset' },
        { label: '返回', etype: 'cancel' }
      ],
      dialogViewP: false,
      dialogTitleP: '个人征信查询列表',
      formDataP: {},
      formFieldsP: [
        { label: '客户名称', prop: 'custName' },
        { label: '证件类型', prop: 'custId' },
        { label: '证件号码', prop: 'custId' },
      ],
      tableFieldsP: [
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
      dialogViewA: false,
      formDataA: {},
      formFieldsA: [
        { label: '征信查询类别', prop: 'operType', ctype: 'select', options: [{ label: '个人', value: '01' }, { label: '企业', value: '02' }] },
        { label: '授权书编号', prop: 'custId', icon: 'el-icon-search', iconClick: this.selCusBh },
        { label: '查询对象类型', prop: 'coProType', ctype: 'select', options: [
          { label: '主借款人', value: '01' }, 
          { label: '共同借款人/共同收信人', value: '02' }, 
          { label: '担保人', value: '03' }, 
          { label: '法定代表、出资人及关联人等', value: '04' },  
          { label: '其他关系人', value: '05' }] 
        },
        { label: '客户名称', prop: 'coProType2', ctype: 'input' },
        { label: '证件类型', prop: 'coProType2', ctype: 'input' },
        { label: '证件号码', prop: 'coProType2', ctype: 'input' },
        { label: '授权统一流水号', prop: 'coProType2', ctype: 'input', icon: 'el-icon-search', iconClick: this.selCusLsh }
      ],
      btnFieldsA: [
        { label: '下一步', type: 'primary', clickFn: this.nextStepA },
        // { label: '重置', etype: 'reset' },
        { label: '返回', etype: 'cancel' }
      ],
      dialogViewBh: false,
      dialogTitleBh: '授权书编号选择页面',
      formFieldsBh: [
        { label: '授权书编号', prop: 'custName' },
        { label: '客户名称', prop: 'custName' },
        { label: '证件类型', prop: 'custId' },
        { label: '证件号码', prop: 'custId' },
      ],
      tableFieldsBh: [
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
      dialogViewSq: false,
      dialogTitleSq: '授权统一流水号选择页面',
      formFieldsSq: [
        { label: '授权统一流水号', prop: 'custId' },
        { label: '客户名称', prop: 'custName' },
        { label: '证件号码', prop: 'custId' },
        { label: '授权书编号', prop: 'custName' }
      ],
      tableFieldsSq: [
        { label: '授权统一流水号', prop: 'custId' },
        { label: '授权书编号', prop: 'custId' },
        { label: '征信查询类别', prop: 'custId' },
        { label: '客户名称', prop: 'custId' },
        { label: '证件类型', prop: 'custId' },
        { label: '证件号码', prop: 'custId' },
        { label: '查询对象类别', prop: 'custId' },
        { label: '授权状态', prop: 'custId' },
        { label: '登记人', prop: 'custId' },
        { label: '登记机构', prop: 'custId' },
        { label: '登记日期', prop: 'custId' }
      ]
    }
  },
  methods: {
    introduc() {
      this.dialogView = true;
    },
    add() {
      this.dialogViewA = true;
    },
    nextStep() {
      this.dialogViewP = true;
    },
    selCusBh() {
      this.dialogViewBh = true;
    },
    selCusLsh() {
      this.dialogViewSq = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  background-color: #ffff;
  height: 100%;
  padding: 24px;
}
</style>