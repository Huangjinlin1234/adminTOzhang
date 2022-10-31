<template>
  <div>
    <formTable :tableTitle="tableTitle" :yformFileds="yformFileds" :tableFileds="tableFileds" v-if="nxt">
      <div slot="button">
        <el-button @click="deal">处理</el-button>
        <el-button @click="add">撤回</el-button>
        <el-button type="primary" @click="add">查看</el-button>
      </div>
    </formTable>
    <div v-else>
      <yform :form-fields="formFields" :form-data="formData"></yform>
      <div class="btnG">
        <el-button type="primary">保存</el-button>
        <el-button @click="back">返回</el-button>
        <el-button>确定预约</el-button>
        <el-button>终止预约</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import formTable from '../third/formTable.vue';
import yform from '../ninth/yform.vue'
export default {
  components: { formTable, yform },
  data() {
    return {
      tableTitle: '进件任务池列表',
      yformFileds: [
        { label: '', prop: '测试2', ctype: 'input' },
        { label: '', prop: '测试2', ctype: 'select' },
        { label: '', prop: '测试2', ctype: 'input' },
        { label: '', prop: '测试2', ctype: 'input' },
        { label: '', prop: '测试2', ctype: 'input' },
        { label: '', prop: '测试2', ctype: 'input' },
        { label: '', prop: '测试2', ctype: 'select' },
        { label: '', prop: '测试2', ctype: 'select' }
      ],
      tableFileds: [
        { label: '进件流水号', prop: 'borrrowNo' },
        { label: '申请日期', prop: 'borrrowNo' },
        { label: '授信编号', prop: 'borrrowNo' },
        { label: '客户编号', prop: 'borrrowNo' },
        { label: '客户名称', prop: 'borrrowNo' },
        { label: '证件类型', prop: 'borrrowNo' },
        { label: '证件号码', prop: 'borrrowNo' },
        { label: '产品名称', prop: 'borrrowNo' },
        { label: '授信建议额度（元）', prop: 'borrrowNo' },
        { label: '企业经营注册地', prop: 'borrrowNo' },
        { label: '我行接收日期', prop: 'borrrowNo' },
        { label: '预约日期', prop: 'borrrowNo' },
        { label: '预约手机号码', prop: 'borrrowNo' },
        { label: '房产所在城市', prop: 'borrrowNo' },
        { label: '房产地址-区域', prop: 'borrrowNo' },
        { label: '受理状态', prop: 'borrrowNo' },
        { label: '管理岗拒绝原因', prop: 'borrrowNo' },
        { label: '退回原因', prop: 'borrrowNo' },
        { label: '分派状态', prop: 'borrrowNo' },
        { label: '归属分行', prop: 'borrrowNo' },
        { label: '归属支行/团队', prop: 'borrrowNo' }
      ],
      formFields: [
        { label: '进件流水号', prop: 'taskNo', ctype: 'input' },
        { label: '申请日期', prop: 'checkType', ctype: 'select', options: [{ label: '个人', value: '01' }, { label: '企业', value: '02' }] },
        { label: '授信编号', prop: 'custNo', ctype: 'input' },
        { label: '我行接收日期', prop: 'saleBdyName', ctype: 'input' },
        { label: '客户编号', prop: 'taskNo', ctype: 'input' },
        { label: '客户名称', prop: 'taskNo', ctype: 'input' },
        { label: '证件类型', prop: 'taskNo', ctype: 'input' },
        { label: '证件号码', prop: 'taskNo', ctype: 'input' },
        { label: '企业经营注册地', prop: 'taskNo', ctype: 'input' },
        { label: '产品名称', prop: 'taskNo', ctype: 'input' },
        { label: '授信建议额度（元）', prop: 'taskNo', ctype: 'input' },
        { label: '房产所在城市', prop: 'taskNo', ctype: 'input' },
        { label: '房产地址-区域', prop: 'taskNo', ctype: 'input' },
        { label: '预约日期', prop: 'taskNo', ctype: 'input' },
        { label: '预约手机号', prop: 'taskNo', ctype: 'input' },
        { label: '是否确定预约', prop: 'checkType', ctype: 'select', options: [{ label: '是', value: '01' }, { label: '否', value: '02' }] },
        { label: '归属支行/团队', prop: 'taskNo', ctype: 'input', icon: 'el-icon-search', iconClick: this.selCus },
        { label: '拒绝原因', prop: 'checkType', ctype: 'select', options: [
          { label: '01-欺诈险类名单', value: '01' }, 
          { label: '02-公检法险类名单', value: '02' }, 
          { label: '03-历史征信不良', value: '03' }, 
          { label: '04-综合评分不良', value: '04' }, 
          { label: '05-客户经营资质不符', value: '05' }, 
          { label: '06-审批授信不致', value: '06' }, 
          { label: '07-审批定价不致', value: '07' }, 
          { label: '08-已有抵押额度客户', value: '08' }, 
          { label: '09-房屋情况不符', value: '09' }, 
          { label: '10-共有产权征信异常', value: '10' }, 
          { label: '11-共有产权其他异常', value: '11' }, 
          { label: '12-房产不准（地址、面积等）', value: '12' }, 
          { label: '13-客户联系不上/拒绝接听', value: '13' }, 
          { label: '14-客户无意愿', value: '14' }, 
          { label: '15-客户试单/点错', value: '15' }, 
          { label: '16-产品吸引力不足', value: '16' }, 
          { label: '17-其他', value: '17' }] 
        }
      ],
      nxt: true
    }
  },
  methods: {
    deal() {
      this.nxt = false;
    },
    back() {
      this.nxt = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.btnG {
  text-align: center;
}
</style>