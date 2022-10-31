<template>
  <div>
    <formTable :tableTitle="tableTitle" :yformFileds="yformFileds" :tableFileds="tableFileds" v-if="accept">
      <div slot="button">
        <el-button @click="acceptCase">受理</el-button>
        <el-button @click="back">退回</el-button>
        <el-button @click="refuse">拒绝</el-button>
        <el-button @click="redeploy">转派</el-button>
        <el-button type="primary" @click="add">查看</el-button>
      </div>
    </formTable>
    <treeCollapse :page-options="pageOptions" v-else>
      <p>借款人信息</p>
      <div>
        <yform :form-fields="formFileds1" :form-data="formData"></yform>
      </div>
      <p>商户工商户信息</p>
      <div>
        <yform :form-fields="formFileds2" :form-data="formData"></yform>
      </div>
      <p>商户经营信息</p>
      <div>
        <yform :form-fields="formFields3" :form-data="formData"></yform>
      </div>
      <p>房产信息</p>
      <div>
        <yform :form-fields="formFields4" :form-data="formData"></yform>
      </div>
    </treeCollapse>
    <back :dialog-visible.sync="showDialog" :form-fileds="formFileds" @saveData="saveFn"></back>
    <back :dialog-visible.sync="showDialog1" :form-fileds="formFileds" @saveData="saveFn1"></back>
    <select-page 
      :dialog-view.sync="dialogView" 
      :dialog-title="dialogTitle" 
      :dialog-width="dialogWidth" 
      :form-fields="formFieldsZp" 
      :table-fields="tableFieldsZp">
    </select-page>
  </div>
</template>

<script>
import formTable from './formTable.vue';
import back from './back.vue';
import selectPage from '@/components/layout/selectPage';
import treeCollapse from '../first/treeCollapse.vue';
import yform from '../ninth/yform.vue'
export default {
  components: { formTable, back, selectPage, treeCollapse, yform },
  data() {
    return {
      tableTitle: '我的受理列表',
      yformFileds: [
        { label: '客户名称', prop: '测试2', ctype: 'input' },
        { label: '客户编号', prop: '测试2', ctype: 'input' },
        { label: '渠道来源', prop: '测试2', ctype: 'select', options: [
          { label: '01-PAD端', value: '01' },
          { label: '02-小程序', value: '02' },
          { label: '03-公众号', value: '03' },
          { label: '04-第三方平台', value: '04' },] 
        },
        { label: '受理状态', prop: '测试2', ctype: 'select', options: [
          { label: '01-大数据风控拒绝', value: '01' },
          { label: '02-待受理', value: '02' },
          { label: '03-已受理', value: '03' },
          { label: '04-已拒绝', value: '04' },] 
        }
      ],
      tableFileds: [
        { label: '进件流水号', prop: 'borrrowNo' },
        { label: '客户编号', prop: 'borrrowNo' },
        { label: '客户名称', prop: 'borrrowNo' },
        { label: '证件类型', prop: 'borrrowNo' },
        { label: '证件号码', prop: 'borrrowNo' },
        { label: '产品名称', prop: 'borrrowNo' },
        { label: '渠道来源', prop: 'borrrowNo' },
        { label: '任务获取时间', prop: 'borrrowNo' },
        { label: '受理状态', prop: 'borrrowNo' },
        { label: '受理记录是否有效', prop: 'borrrowNo' },
        { label: '大数据风控拒绝原因', prop: 'borrrowNo' },
        { label: '拒绝原因', prop: 'borrrowNo' },
        { label: '归属分行', prop: 'borrrowNo' },
        { label: '归属支行/团队', prop: 'borrrowNo' }
      ],
      showDialog: false,
      formFileds: [
        { label: '退回原因', prop: 'backRsn', ctype: 'select', options: [
          { label: '01-欺诈险类名单', value: '01' },
          { label: '02-公检法险类名单', value: '02' },
          { label: '03-历史征信不良', value: '03' },
          { label: '04-综合评分不良', value: '04' },
          { label: '05-客户经营资质不符', value: '05' },
          { label: '06-审批授信不致（偿债能力不符）', value: '06' },
          { label: '07-审批定价不致', value: '07' },
          { label: '08-已有抵押额度客户', value: '08' },
          { label: '09-房屋情况不符', value: '09' },
          { label: '10-共有产权征信异常', value: '10' },
          { label: '11-共有产权其他异常', value: '11' },
          { label: '12-房产不准（地址、面积等）', value: '12' },
          { label: '13-客户联系不上/拒绝接听', value: '13' },
          { label: '14-客户无意愿', value: '15' },
          { label: '15-客户试单/点错', value: '14' },
          { label: '16-产品吸引力不足', value: '16' },
          { label: '17-欺诈险类名单', value: '17' }] 
        },
        { label: '退回原因描述', prop: 'rsnDes', ctype: 'textarea'}
      ],
      showDialog1: false,
      dialogView: false,
      dialogTitle: '机构成员列表',
      dialogWidth: '1000px',
      formFieldsZp: [
        { label: '客户经理名称', prop: 'custId' },
        { label: '客户经理工号', prop: 'custName' },
        { label: '归属机构', prop: 'custId' }
      ],
      tableFieldsZp: [
        { label: '客户经理工号', prop: 'custId' },
        { label: '客户经理名称', prop: 'custId' },
        { label: '归属分行', prop: 'custId' },
        { label: '归属支行', prop: 'custId' }
      ],
      pageOptions: {
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        treeData: [
          {
            'name': '进件信息',
            'children': [
              {
                'name': '网商初审信息'
              }, {
                'name': '网商预审信息'
              }, {
                'name': '预约信息'
              }, {
                'name': '受理信息'
              }, {
                'name': '影像资料'
              }
            ]
          }
        ],
      },
      accept: true,
      formData: {},
      formFileds1: [
        { label: '进件流水号', prop: 'taskNo', ctype: 'input' },
        { label: '产品名称', prop: 'taskNo', ctype: 'input' },
        { label: '客户编号', prop: 'taskNo', ctype: 'input' },
        { label: '客户名称', prop: 'taskNo', ctype: 'input' },
        { label: '证件类型', prop: 'taskNo', ctype: 'input' },
        { label: '证件号码', prop: 'taskNo', ctype: 'input' },
        { label: '借款人手机号码', prop: 'taskNo', ctype: 'input' },
        { label: '借款人地址信息', prop: 'taskNo', ctype: 'input' },
        { label: '推广者员工号', prop: 'taskNo', ctype: 'input' },
        { label: '行业门类代码', prop: 'taskNo', ctype: 'input' },
        { label: '申请日期', prop: 'taskNo', ctype: 'input' },
        { label: '我行接收日期', prop: 'taskNo', ctype: 'input' },
        { label: '任务获取日期', prop: 'taskNo', ctype: 'input' },
        { label: '受理记录是否有效', prop: 'taskNo', ctype: 'input' },
        { label: '是否二维码营销进件', prop: 'taskNo', ctype: 'input' }
      ],
      formFileds2: [
        { label: '数据采集时间', prop: 'taskNo', ctype: 'input' },
        { label: '是否存在有效工商信息', prop: 'taskNo', ctype: 'input' },
        { label: '无有效工商信息原因', prop: 'taskNo', ctype: 'input' },
        { label: '公司名', prop: 'taskNo', ctype: 'input' },
        { label: '法定代表人', prop: 'taskNo', ctype: 'input' },
        { label: '工行注册号', prop: 'taskNo', ctype: 'input' },
        { label: '注册时间', prop: 'taskNo', ctype: 'input' },
        { label: '注册地址', prop: 'taskNo', ctype: 'input' },
        { label: '注册地址行政区编号', prop: 'taskNo', ctype: 'input' },
        { label: '注册地省市区', prop: 'taskNo', ctype: 'input' },
        { label: '注册资本（万元）', prop: 'taskNo', ctype: 'input' },
        { label: '币种', prop: 'taskNo', ctype: 'input' },
        { label: '2017版行业代码', prop: 'taskNo', ctype: 'input' },
        { label: '经营范围', prop: 'taskNo', ctype: 'input' },
        { label: '组织机构号/统一社会信用代码', prop: 'taskNo', ctype: 'input' },
        { label: '注册工商局', prop: 'taskNo', ctype: 'input' },
        { label: '经营状态', prop: 'taskNo', ctype: 'input' },
        { label: '经营状态描述', prop: 'taskNo', ctype: 'input' },
        { label: '最后年检年度', prop: 'taskNo', ctype: 'input' },
        { label: '经营开始时间', prop: 'taskNo', ctype: 'input' },
        { label: '经营结束时间', prop: 'taskNo', ctype: 'input' },
        { label: '开业时间', prop: 'taskNo', ctype: 'input' },
        { label: '公司类型', prop: 'taskNo', ctype: 'input' },
        { label: '公司经济类型', prop: 'taskNo', ctype: 'input' }
      ],
      formFields3: [
        { label: '客群经营标签', prop: 'taskNo', ctype: 'input' },
        { label: '客群主营行业', prop: 'taskNo', ctype: 'input' },
        { label: '房产所在城市是否有经营', prop: 'taskNo', ctype: 'input' },
        { label: '房产所在省份是否有经营', prop: 'taskNo', ctype: 'input' }
      ],
      formFields4: [
        { label: '房产地址-省份', prop: 'taskNo', ctype: 'input' },
        { label: '省份编码', prop: 'taskNo', ctype: 'input' },
        { label: '房产地址-城市', prop: 'taskNo', ctype: 'input' },
        { label: '城市编码', prop: 'taskNo', ctype: 'input' },
        { label: '房产地址-区域', prop: 'taskNo', ctype: 'input' },
        { label: '区域编码', prop: 'taskNo', ctype: 'input' },
        { label: '房产地址-楼盘名称', prop: 'taskNo', ctype: 'input' },
        { label: '房产地址-楼幢', prop: 'taskNo', ctype: 'input' },
        { label: '房产地址-楼层', prop: 'taskNo', ctype: 'input' },
        { label: '房产地址-房号', prop: 'taskNo', ctype: 'input' },
        { label: '房产地址', prop: 'taskNo', ctype: 'input' },
        { label: '是否所有权人', prop: 'taskNo', ctype: 'input' },
        { label: '房产面积', prop: 'taskNo', ctype: 'input' },
        { label: '建成年份', prop: 'taskNo', ctype: 'input' },
        { label: '购房时间', prop: 'taskNo', ctype: 'input' },
        { label: '是否有非成年共有权人', prop: 'taskNo', ctype: 'input' },
        { label: '房产类型', prop: 'taskNo', ctype: 'input' },
        { label: '是否按揭中', prop: 'taskNo', ctype: 'input' },
        { label: '产权证与本人关系', prop: 'taskNo', ctype: 'input' },
        { label: '业务场景', prop: 'taskNo', ctype: 'input' }
      ]
    }
  },
  methods: {
    deal() {
      
    },
    back() {
      this.showDialog = true;
      this.formFileds[0].label = '退回原因';
      this.formFileds[1].label = '退回原因描述';
    },
    refuse() {
      this.showDialog1 = true;
      this.formFileds[0].label = '拒绝原因';
      this.formFileds[1].label = '拒绝原因描述';
    },
    redeploy() {
      this.dialogView = true;
    },
    acceptCase() {
      this.accept = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.btnG {
  text-align: center;
}
</style>