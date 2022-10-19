<template>
  <div class="yu-dashboard-box" style="min-height: 448px;">
    <div class="yu-zrc-title notice-center">
      <h1 v-if="!hiddenRisk" :class="activeIndex == 1 ? 'select' : ''" @click="activeIndex = 1" @dblclick="openPage">风险提示(<span v-text="risknum" />)</h1>
      <h1 :class="activeIndex == 3 ? 'select' : ''" @click="activeIndex = 3" @dblclick="openPage">问题交流(<span v-text="prbnum" />)</h1>
      <a href="javascript:void(0);" @click="openPage">更多</a>
    </div>
    <div class="yu-dashboard-content">
      <div style="padding:0 24px 20px 24px;">
        <!--<div class="yu-dashboard-notice">
          <span @click="tableToggle(1)" @dblclick="openPage">
              <span><i class="el-icon-yx-warning"></i></span>
              风险提示<span><yu-badge :value="risknum" :max="99"></yu-badge></span>
          </span>
          <span @click="tableToggle(2)" @dblclick="openPage">
              <span><i class="el-icon-yx-bell"></i></span>
              消息提示
              <span><yu-badge :value="msgnum" :max="99" ></yu-badge></span>
          </span>
          <span @click="tableToggle(3)" @dblclick="openPage">
              <span><i class="el-icon-yx-question"></i></span>
              问题交流
              <span><yu-badge :value="prbnum" :max="99"></yu-badge></span>
          </span>
        </div>-->
        <div v-show="activeIndex == 1" v-if="!hiddenRisk" style="margin-top: -4px;">
          <div v-for="(item, index) in riskData" :key="index" class="risk-row">
            <span :class="'messageType' + item.messageType" v-text="getlookup(item.messageType,'STD_WB_RISK_MESSAGE_TYPE')" />
            <span v-text="item.cusName" />
            <span v-text="item.endDate" />
          </div>
          <div v-if="riskData.length==0" style="display: flex;height: 385px;">
            <img style="margin: auto" src="../../../assets/common/zrcbank/images/缺省图标.png">
            <div style="position: absolute;    margin-top: 50%;    margin-left: 39%;    font-size: 14px;">暂无内容</div>
          </div>

          <!--<yu-xtable ref="refTable1" request-type="POST" condition-key="condition" :pageable="false" @loaded="loadrisk" style="margin-top:10px" row-number :data-url="url.riskNotice" :base-params="riskParam" :default-load="false">
            <yu-xtable-column label="提示类型" prop="messageType" data-code="STD_WB_RISK_MESSAGE_TYPE"></yu-xtable-column>
            <yu-xtable-column label="客户名称" prop="cusName"></yu-xtable-column>
            <yu-xtable-column label="业务编号" prop="lwaSerno"></yu-xtable-column>
            <yu-xtable-column label="到期日期" prop="endDate"></yu-xtable-column>
          </yu-xtable>-->
        </div>
        <!--<div v-show="activeIndex == 2" style="margin-top: -4px;">
          <yu-xtable ref="refTable2" request-type="POST" condition-key="condition" :pageable="false" @loaded="loadmsg" style="margin-top:10px" row-number :data-url="url.msgNotice" :base-params="otherParam" :default-load="false">
            <yu-xtable-column label="消息类型" prop="messageType" data-code="STD_WB_NOTICE_TYPE"></yu-xtable-column>
            <yu-xtable-column label="消息内容" prop="content"></yu-xtable-column>
            <yu-xtable-column label="发布时间" prop="pubTime"></yu-xtable-column>
          </yu-xtable>
        </div>-->
        <div v-show="activeIndex == 3" style="margin-top: -4px;">
          <div v-for="(item, index) in prbcommData" :key="index" class="prb-comm-row">
            <span v-text="getlookup(item.messageType,'STD_WB_PRB_MESSAGE_TYPE')" />
            <span :class="'status' + item.status" v-text="getlookup(item.status,'STD_WB_PRB_STATUS')" />
            <span v-text="item.pubTime" />
            <span :title="item.content" v-text="item.content.length>32?item.content.substr(0,32)+'...': item.content " />
          </div>
          <div v-if="prbcommData.length==0" style="display: flex;height: 385px;">
            <img style="margin: auto" src="../../../assets/common/zrcbank/images/缺省图标.png">
            <div style="position: absolute;    margin-top: 50%; margin-left: 39%;font-size: 14px;">暂无内容</div>
          </div>
          <!--<yu-xtable ref="refTable3" request-type="POST" condition-key="condition" :pageable="false" @loaded="loadprb" style="margin-top:10px" row-number :data-url="url.prbcomm" :base-params="otherParam" :default-load="false">
            <yu-xtable-column label="问题类型" prop="messageType" data-code="STD_WB_PRB_MESSAGE_TYPE"></yu-xtable-column>
            <yu-xtable-column label="问题和意见" prop="content"></yu-xtable-column>
            <yu-xtable-column label="问题状态" prop="status" data-code="STD_WB_PRB_STATUS"></yu-xtable-column>
            <yu-xtable-column label="发布时间" prop="pubTime"></yu-xtable-column>
          </yu-xtable>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// yufp.lookup.reg('STD_WB_RISK_MESSAGE_TYPE,STD_WB_NOTICE_TYPE,STD_WB_PRB_MESSAGE_TYPE,STD_WB_PRB_STATUS');
export default {
  props: {
    hiddenRisk: Boolean
  },
  data() {
    return {
      activeIndex: this.hiddenRisk ? 3 : 1,
      // url: {
      //   riskNotice: `${backend.cmisCfg}/api/wbrisknotice/`,
      //   msgNotice: `${backend.cmisCfg}/api/wbmsgnotice/`,
      //   prbcomm: `${backend.mock}/api/wbprbcomm/`
      // },
      riskParam: {},
      riskData: [],
      otherParam: {},
      prbcommData: [],
      risknum: 0,
      msgnum: 0,
      prbnum: 0,
      select: 1
    };
  },
  computed: {
    // ...mapGetters(['loginCode', 'userName', 'org', 'theme', 'roles'])
  },
  mounted() {
    this.riskParam = { condition: JSON.stringify({ inputId: this.loginCode }), size: 8, sort: 'endDate desc' };
    this.otherParam = { condition: JSON.stringify({ inputId: this.loginCode }), size: 4, sort: 'pubTime desc' };
    // this.init();
  },
  methods: {
    init() {
      const _this = this;
      // 风险提示
      if (!this.hiddenRisk) {
        // yufp.service.request({
        //   method: 'POST',
        //   url: _this.url.riskNotice,
        //   data: JSON.stringify(this.riskParam),
        //   callback: function (code, message, response) {
        //     if (response.code == '0') {
        //       _this.risknum = response.total;
        //       _this.riskData = response.data;
        //     } else {
        //       _this.$message({ message: '数据查询失败！', type: 'error' });
        //     }
        //   }
        // });
      }
      // 问题交流
      yufp.service.request({
        method: 'POST',
        url: _this.url.prbcomm,
        data: JSON.stringify(this.otherParam),
        callback: function(code, message, response) {
          if (response.code == '0') {
            _this.prbnum = response.total;
            _this.prbcommData = response.data;
          } else {
            _this.$message({ message: '数据查询失败！', type: 'error' });
          }
        }
      });
    },
    getlookup(index, type) {
      return yufp.lookup.find(type, false)[index];
    },
    // 打开更多页面
    openPage() {
      let route = '';
      let title = '';
      switch (this.activeIndex) {
      case 1:
        route = 'common/dashboard/default/riskNotice.vue';
        title = '风险事项提示';
        break;
      case 2:
        route = 'common/dashboard/bizpage/wbMsgNotice';
        title = '消息提示';
        break;
      case 3:
        route = 'common/dashboard/bizpage/WbPrbComm';
        title = '问题交流';
        break;
      default:
      }
      // this.$router.addTab({
      //   name: route,
      //   title: title,
      //   key: '1',
      //   data: {}
      // });
    },
    tableToggle(index) {
      this.activeIndex = index;
    },
    loadrisk(data, total, response) {
      this.risknum = total;
    },
    loadmsg(data, total, response) {
      this.msgnum = total;
    },
    loadprb(data, total, response) {
      this.prbnum = total;
    }
  }
};
</script>
