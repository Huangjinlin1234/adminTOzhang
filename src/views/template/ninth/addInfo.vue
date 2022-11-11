<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first">
        <p>基本信息</p>
        <div>
          <yform :form-fields="formFields" :form-data="formData"></yform>
          <ycheckbox :checkboxLabel="checkboxLabel" :options="options"></ycheckbox>
        </div>
        <p>登记信息</p>
        <div>
          <yform :form-fields="formFields1" :form-data="formData"></yform>
        </div>
      </el-tab-pane>
      <el-tab-pane label="影像资料" name="second">影像资料</el-tab-pane>
    </el-tabs>
    <div class="btnG">
      <el-button type="primary">保存</el-button>
      <el-button>返回</el-button>
    </div>
  </div>
</template>

<script>
import yform from './yform.vue'
import ycheckbox from './ycheckbox.vue'
export default {
  components: { yform, ycheckbox },
  data() {
    return {
      activeName: 'first',
      formData: {},
      formFields: [
        { label: '授权统一流水号', prop: 'taskNo', ctype: 'input' },
        { label: '征信查询类别', prop: 'checkType', ctype: 'select', options: [{ label: '个人', value: '01' }, { label: '企业', value: '02' }] },
        { label: '查询对象类型', prop: 'custNo', ctype: 'select', options: [
          { label: '主借款人', value: '01' }, 
          { label: '共同借款人', value: '02' }, 
          { label: '保证人', value: '03' }, 
          { label: '抵押人', value: '04' }, 
          { label: '质押人', value: '05' }, 
          { label: '借款人配偶', value: '06' }, 
          { label: '共借人配偶', value: '07' }, 
          { label: '保证人配偶', value: '08' }, 
          { label: '抵押人配偶', value: '09' }, 
          { label: '质押人配偶', value: '10' }, 
          { label: '法定代表人', value: '11' }, 
          { label: '实际控制人', value: '12' }, 
          { label: '股东', value: '13' }, 
          { label: '其他关系人', value: '14' }] 
        },
        { label: '授权书编号', prop: 'saleBdyName', ctype: 'input' },
        { label: '证件类型', prop: 'taskNo', ctype: 'select', options: [{ label: '居民身份证', value: '01' }] },
        { label: '证件号码', prop: 'taskNo', ctype: 'input' },
        { label: '客户名称', prop: 'taskNo', ctype: 'input' },
        { label: '授权日期', prop: 'taskNo', ctype: 'input' },
        { label: '授权起始日', prop: 'taskNo', ctype: 'input' },
        { label: '授权方式', prop: 'taskNo', ctype: 'select', options: [
          { label: '01-线下本人面签授权书', value: '01' }, 
          { label: '11-线上有生物识别的电子签名授权', value: '11' }, 
          { label: '12-线上无生物识别的电子签名授权', value: '12' }, 
          { label: '19-线上其他授权方式', value: '19' }] },
        { label: '授权终止日', prop: 'taskNo', ctype: 'input' }
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
      formFields1: [
        { label: '登记人', prop: 'taskNo', ctype: 'input' },
        { label: '登记机构', prop: 'taskNo', ctype: 'input' },
        { label: '登记日期', prop: 'taskNo', ctype: 'input' },
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
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