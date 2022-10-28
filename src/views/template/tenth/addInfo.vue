<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="征信信息" name="first">
        <p>征信查询信息</p>
        <div>
          <yform :form-fields="formFields" :form-data="formData"></yform>
        </div>
        <p>主借款人信息</p>
        <div>
          <yform :form-fields="formFields1" :form-data="formData"></yform>
        </div>
        <p>查询对象授权信息</p>
        <div>
          <yform :form-fields="formFields2" :form-data="formData"></yform>
          <ycheckbox :checkboxLabel="checkboxLabel" :options="options"></ycheckbox>
        </div>
        <p>审批信息</p>
        <div>
          <yform :form-fields="formFields3" :form-data="formData"></yform>
        </div>
        <p>登记信息</p>
        <div>
          <yform :form-fields="formFields4" :form-data="formData"></yform>
        </div>
      </el-tab-pane>
      <el-tab-pane label="影像资料" name="second">影像资料</el-tab-pane>
    </el-tabs>
    <div class="btnG">
      <el-button type="primary">保存</el-button>
      <el-button type="primary">提交</el-button>
      <el-button @click="rtn">返回</el-button>
    </div>
    <select-page 
      :dialog-view.sync="dialogView" 
      :dialog-title="dialogTitle" 
      :dialog-width="dialogWidth" 
      :form-fields="formFields5" 
      :table-fields="tableFields">
    </select-page>
  </div>
</template>

<script>
import yform from '../ninth/yform.vue'
import selectPage from '@/components/layout/selectPage'
import ycheckbox from '../ninth/ycheckbox.vue'
export default {
  components: { yform, selectPage, ycheckbox },
  data() {
    return {
      activeName: 'first',
      formData: {},
      formFields: [
        { label: '查询申请类型', prop: 'taskNo', ctype: 'select', options: [
          { label: '01-人工申请（通过前置系统发起的申请）', value: '01' }, 
          { label: '02-网银接口申请（通过网银填写申请信息发起查询）', value: '02' }, 
          { label: '03-手机银行（APP）接口申请（通过手机银行填写申请信息发起查询）', value: '03' }, 
          { label: '05-业务系统申请（由业务系统填写申请信息发起申请）', value: '05' }] 
        },
        { label: '征信查询类别', prop: 'checkType', ctype: 'select', options: [{ label: '0-信息报告查询', value: '0' }, { label: '身份信息核查', value: '1' }] },
        { label: '信用报告查询方式', prop: 'custNo', ctype: 'select', options: [
          { label: '1-本地优先', value: '1' }, 
          { label: '2-仅查询本地', value: '2' }, 
          { label: '3-仅查询征信系统', value: '3' }],
        },
        { label: '征信查询类别', prop: 'saleBdyName', ctype: 'select', options: [{ label: '个人', value: '01' }] },
        { label: '征信查询流水号', prop: 'taskNo', ctype: 'input' },
        { label: '授权统一流水号', prop: 'taskNo', ctype: 'input' },
        { label: '查询对象类型', prop: 'coProType', ctype: 'select', options: [
          { label: '主借款人', value: '01' }, 
          { label: '共同借款人/共同收信人', value: '02' }, 
          { label: '担保人', value: '03' }, 
          { label: '法定代表、出资人及关联人等', value: '04' },  
          { label: '其他关系人', value: '05' }] 
        },
        { label: '征信查询业务阶段', prop: 'taskNo', ctype: 'select', options: [
          { label: '01-授信申请', value: '01' }, 
          { label: '02-出账放款', value: '02' }, 
          { label: '03-贷后检查', value: '03' }, 
          { label: '04-展期申请', value: '04' }] },
        { label: '征信查询原因', prop: 'taskNo', ctype: 'select' },
        { label: '关联业务流水号', prop: 'taskNo', ctype: 'input', icon: 'el-icon-search', iconClick: this.selCus },
        { label: '关联合同号', prop: 'taskNo', ctype: 'input', icon: 'el-icon-search', iconClick: this.selCus1 },
        { label: '查询原因描述', prop: 'taskNo', ctype: 'textarea' },
      ],
      formFields1: [
        { label: '授权书编号', prop: 'taskNo', ctype: 'input' },
        { label: '客户名称', prop: 'taskNo', ctype: 'input' },
        { label: '证件类型', prop: 'taskNo', ctype: 'input' },
        { label: '证件号码', prop: 'taskNo', ctype: 'input' },
        { label: '获客来源', prop: 'taskNo', ctype: 'input' },
        { label: '产品名称', prop: 'taskNo', ctype: 'input' },
      ],
      formFields2: [
        { label: '授权书编号', prop: 'taskNo', ctype: 'input' },
        { label: '证件号码', prop: 'taskNo', ctype: 'input' },
        { label: '客户名称', prop: 'taskNo', ctype: 'input' },
        { label: '证件类型', prop: 'saleBdyName', ctype: 'select', options: [{ label: '居民身份证', value: '01' }] },
        { label: '授权方式', prop: 'taskNo', ctype: 'select', options: [
          { label: '01-线下本人面签授权书', value: '01' }, 
          { label: '11-线上有生物识别的电子签名授权', value: '11' }, 
          { label: '12-线上无生物识别的电子签名授权', value: '12' }, 
          { label: '19-线上其他授权方式', value: '19' }] 
        },
        { label: '授权日期', prop: 'taskNo', ctype: 'input' },
        { label: '授权起始日', prop: 'taskNo', ctype: 'input' },
        { label: '授权终止日', prop: 'taskNo', ctype: 'input' },
      ],
      dialogView: false,
      dialogTitle: '',
      dialogWidth: '1000px',
      formFieldsLs: [
        { label: '进件流水号', prop: 'custName' },
        { label: '客户编号', prop: 'custName' },
        { label: '客户名称', prop: 'custName' },
        { label: '证件号码', prop: 'custName' }
      ],
      tableFieldsLs: [
        { label: '进件流水号', prop: 'custId' },
        { label: '客户编号', prop: 'custId' },
        { label: '客户名称', prop: 'custId' },
        { label: '证件号码', prop: 'custId' },
        { label: '产品名称', prop: 'custId' },
        { label: '来源渠道', prop: 'custId' },
        { label: '受理记录是否有效', prop: 'custId' },
        { label: '受理状态', prop: 'custId' },
        { label: '登记人', prop: 'custId' },
      ],
      formFieldsHt: [
        { label: '合同编号', prop: 'custName' },
        { label: '客户编号', prop: 'custName' },
        { label: '客户名称', prop: 'custName' },
        { label: '产品名称', prop: 'custName' }
      ],
      tableFieldsHt: [
        { label: '合同编号', prop: 'custName' },
        { label: '客户编号', prop: 'custName' },
        { label: '客户名称', prop: 'custName' },
        { label: '产品名称', prop: 'custName' },
        { label: '合同币种', prop: 'custName' },
        { label: '合同金额(元)', prop: 'custName' },
        { label: '合同可用金额(元)', prop: 'custName' },
        { label: '合同签约日期', prop: 'custName' },
        { label: '合同起始日', prop: 'custName' },
        { label: '合同到期日', prop: 'custName' },
        { label: '合同状态', prop: 'custName' }
      ],
      checkboxLabel: '个人授权书内容',
      options: [
        '审核本人贷款申请；',
        '审核本人作为担保人；',
        '对已发放的信贷业务进行贷后风险管理、资产清收、风险跟踪管理等事项；',
        '涉及本人关联人的授信申请、贷后管理或担保业务，需要查询本人信用状况；',
        '审核本人担任法定代表人、负责人或出资人的法人、商户或其他组织的特约商户开户申请，进行相关风险管理；',
        '其他'
      ],
      formFields3: [
        { label: '查询审批状态', prop: 'taskNo', ctype: 'select', options: [
          { label: '审批否决', value: '01' }, 
          { label: '查询成功', value: '11' }, 
          { label: '查询失败', value: '12' }] 
        },
        { label: '否决原因', prop: 'taskNo', ctype: 'input' }
      ],
      formFields4: [
        { label: '登记人', prop: 'taskNo', ctype: 'input' },
        { label: '登记机构', prop: 'taskNo', ctype: 'input' },
        { label: '登记日期', prop: 'taskNo', ctype: 'input' },
      ],
      formFields5: [],
      tableFields: []
    }
  },
  methods: {
    selCus() {
      this.dialogView = true;
      this.dialogTitle = '业务受理信息查询结果列表';
      this.formFields5 = this.formFieldsLs;
      this.tableFields = this.tableFieldsLs;
    },
    selCus1() {
      this.dialogView = true;
      this.dialogTitle = '合同列表';
      this.formFields5 = this.formFieldsHt;
      this.tableFields = this.tableFieldsHt;
    },
    rtn() {
      this.$router.push({path: '/template/tenth'});
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  padding: 10px;
  font-size: 16px;
  background: #a9e1fa;
}
.btnG {
  text-align: center;
}
</style>