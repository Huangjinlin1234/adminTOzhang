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
      <ytable></ytable>
      <div class="btnG">
        <el-button type="primary">保存</el-button>
        <el-button @click="back">返回</el-button>
        <el-button>确定预约</el-button>
        <el-button>终止预约</el-button>
      </div>
      <selectPage 
        :dialog-view.sync="dialogView" 
        :dialog-title="dialogTitle" 
        :dialog-width="dialogWidth" 
        :form-fields="formFields1" 
        :table-fields="tableFields1">
      </selectPage>
    </div>
  </div>
</template>

<script>
import formTable from '../third/formTable.vue';
import yform from '../ninth/yform.vue'
import ytable from './table.vue'
import selectPage from '@/components/layout/selectPage'
export default {
  components: { formTable, yform, ytable, selectPage },
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
        { label: '客户编号', prop: 'borrrowNo' },
        { label: '客户名称', prop: 'borrrowNo' },
        { label: '证件类型', prop: 'borrrowNo' },
        { label: '证件号码', prop: 'borrrowNo' },
        { label: '产品名称', prop: 'borrrowNo' },
        { label: '申请金额', prop: 'borrrowNo' },
        { label: '申请期限', prop: 'borrrowNo' },
        { label: '借款用途', prop: 'borrrowNo' },
        { label: '经营地址所在城市', prop: 'borrrowNo' },
        { label: '经营地址所在区域', prop: 'borrrowNo' },
        { label: '分派状态', prop: 'borrrowNo' },
        { label: '派单日期', prop: 'borrrowNo' },
        { label: '受理状态', prop: 'borrrowNo' },
        { label: '受理日期', prop: 'borrrowNo' },
        { label: '退回原因', prop: 'borrrowNo' },
        { label: '归属分行', prop: 'borrrowNo' },
        { label: '归属支行/团队', prop: 'borrrowNo' }
      ],
      formFields: [
        { label: '进件流水号', prop: 'taskNo', ctype: 'input' },
        { label: '客户编号', prop: 'taskNo', ctype: 'input' },
        { label: '客户名称', prop: 'taskNo', ctype: 'input' },
        { label: '证件类型', prop: 'taskNo', ctype: 'input' },
        { label: '证件号码', prop: 'taskNo', ctype: 'input' },
        { label: '出生日期', prop: 'checkType', ctype: 'input' },
        { label: '性别', prop: 'custNo', ctype: 'input' },
        { label: '联系电话', prop: 'saleBdyName', ctype: 'input' },
        { label: '产品名称', prop: 'taskNo', ctype: 'input' },
        { label: '申请金额', prop: 'taskNo', ctype: 'input' },
        { label: '申请期限', prop: 'taskNo', ctype: 'input' },
        { label: '借款用途', prop: 'taskNo', ctype: 'input' },
        { label: '经营所在地', prop: 'taskNo', ctype: 'input' },
        { label: '营业执照名称', prop: 'taskNo', ctype: 'input' },
        { label: '统一社会信用代码', prop: 'taskNo', ctype: 'input' },
        { label: '法定代表人姓名', prop: 'checkType', ctype: 'input' },
        { label: '法定代表人证件类型', prop: 'taskNo', ctype: 'input' },
        { label: '法定代表人证件号码', prop: 'taskNo', ctype: 'input' },
        { label: '是否派单', prop: 'taskNo', ctype: 'select', option: [ {label: '是', value: '01'}, {label: '否', value: '02'} ] },
        { label: '派单日期', prop: 'taskNo', ctype: 'input' },
        { label: '任务接收人', prop: 'coProType2', ctype: 'input', icon: 'el-icon-search', iconClick: this.selCus },
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
      nxt: true,
      dialogView: false,
      dialogTitle: '客户经理列表',
      dialogWidth: '1000px',
      formData: {},
      formFields1: [
        { label: '', prop: 'custId' },
        { label: '', prop: 'custName' },
        { label: '', prop: 'custId' },
      ],
      tableFields1: [
        { label: '客户经理工号', prop: 'custId' },
        { label: '客户经理名称', prop: 'custName' },
        { label: '在途任务数量 ', prop: 'custName' },
        { label: '待办任务数量', prop: 'custName' },
        { label: '归属分行', prop: 'custName' },
        { label: '归属支行/团队', prop: 'custName' },
      ],
    }
  },
  methods: {
    deal() {
      this.nxt = false;
    },
    back() {
      this.nxt = true;
    },
    selCus() {
      this.dialogView = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.btnG {
  text-align: center;
}
</style>