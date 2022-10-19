<template>
  <div>
    <yu-panel title="用户日志" panel-type="simple">
      <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="refTable"  :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item label="用户账户" ctype="input" placeholder="合作方名称" name="partnerName" fuzzy-query="both"></yu-xform-item>
          <yu-xform-item label="机构" ctype="select" data-code="STD_PARTNER_TYPE" placeholder="合作方类型" name="partnerType"></yu-xform-item>
          <yu-xform-item label="操作类型" ctype="select" data-code="STD_ZB_APPR_STATUS" placeholder="审批状态" name="apprStatus"></yu-xform-item>
          <yu-xform-item label="日志时间" ctype="datepicker" placeholder="登记日期" name="inputDate"></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="input" placeholder="登记机构"  name="inputBrId"></yu-xform-item>-->
          <yu-xform-item label="日志等级" ctype="yu-xuser" placeholder="登记人" @select-fn="commonSelectFn" :mapping="{ loginCode: 'inputId' }" name="inputId"></yu-xform-item>
          <yu-xform-item label="登记机构" ctype="yu-xorg" placeholder="登记机构" @select-fn="commonSelectFn" :mapping="{ orgCode: 'inputBrId' }" name="inputBrId"></yu-xform-item>

        </yu-xform-group>
      </yu-xform>
        <yu-button type="primary" ref="btn_insertFn" v-if="checkCtrl('add')"  @click="customClick('insertFn')">新增</yu-button>
        <yu-button type="primary" ref="btn_updateFn" v-if="checkCtrl('edit')"  @click="customClick('updateFn')">修改</yu-button>
        <yu-button type="primary" ref="btn_deleteFn" v-if="checkCtrl('delete')"  @click="customClick('deleteFn')">删除</yu-button>
        <yu-button type="primary" ref="btn_viewFn" v-if="checkCtrl('view')"  @click="customClick('viewFn')">查看</yu-button>
        <yu-button type="primary" ref="btn_updateFn" @click="submitBeforeFn" hidden>提交</yu-button>
      <yu-xtable ref="refTable" row-number json-data="rows" request-type="POST"  selection-type="radio"  :dataUrl="dataUrl" :baseParams="baseParams" >
        <yu-xtable-column label="用户账户" prop="userId"></yu-xtable-column>
        <yu-xtable-column label="用户名称" prop="userOrgCode"></yu-xtable-column>
        <yu-xtable-column label="操作类型" prop="operType"></yu-xtable-column>
        <yu-xtable-column label="Url" prop="operPageUrl" data-code="STD_PARTNER_TYPE"></yu-xtable-column>
        <yu-xtable-column label="页面名称" prop="operPageName"  width="150"></yu-xtable-column>
        <yu-xtable-column label="日志等级" prop="logLevel"></yu-xtable-column>
        <yu-xtable-column label="记录时间" prop="createTime"></yu-xtable-column>
      </yu-xtable>
    </yu-panel>
  </div>
</template>
<script>
import yufpNwfInit from '@/components/widgets/YufpNwfInit';
import mixinList from '@/utils/mixins/mixin-list';
import mixin from '@/utils/mixin';
import { request } from 'xy-utils';
// yufp.lookup.reg('STD_PARTNER_TYPE,STD_COOP_PLAN_OPR_TYPE,STD_ZB_APPR_STATUS');
export default {
  components: { yufpNwfInit },
  name: 'UserLog',
  mixins: [mixinList, mixin],
  data: function () {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: backend.console + '/api/user/oper/logs',
      baseParams: {},
      deleteUrl: this.$backend.cmisBiz + '/api/coopplanapp/delete/',
      tableData: []
    };
  },
  created () {
  },
  methods: {
    submitBeforeFn () {
      let _this = this;
      let selections = _this.$refs.refTable.selections;
      if (selections.length !== 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      let rowData = selections[0];
      let oprType = rowData.oprType;
      // const partnerType = rowData.partnerType;
      // if(partnerType == '2'){
      //   let bailAccNo = rowData.bailAccNo;//保证金账号
      //   let bailAccNoSubSeq = rowData.bailAccNoSubSeq;//保证金账号子序号
      //   let bailAccNoAmt = rowData.bailAccNoAmt;//当前保证金金额(元)
      //   if(!(bailAccNo && bailAccNoSubSeq && bailAccNoAmt)){
      //     _this.$xutils.showMsgBox('提示', '<专业担保公司>必须录入保证金账号、保证金账号子序号、当前保证金金额(元)信息！');
      //     return;
      //   }
      // }
      this.$xutils.request({
        url: this.$backend.cmisBiz + '/api/cooppartnerlstinfo/query',
        data: {condition: JSON.stringify({partnerNo: rowData.partnerNo, partnerStatus: '1'})},
        success: (response, status, xhr) => {
          if (response.code == '0') {
            let list = response.data;
            if (list.length === 0 && oprType === 2) {
              this.$xutils.showMsgBox('提示', '合作方已退出，无法进行合作方准入变更操作');
              return false;
            } else {
              this.submitFn();
            }
          } else {
            this.$xutils.showMsgBox('提示', response.erortx);
            return false;
          }
        }
      });
    },
    submitFn () {
      let _this = this;
      let selections = _this.$refs.refTable.selections;
      if (selections.length !== 1) {
        _this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      let apprStatus = selections[0].apprStatus;
      if (!(apprStatus == '000' || apprStatus == '992') || selections[0].inputId != this.$xutils.getLoginUserInfo().loginCode) {
        _this.$xutils.showMsgBox('提示', '只能提交审批状态为【待发起】、【退回】且经办人是自己的协议申请！!');
        return;
      }
      _this.checkSubmit(selections[0]).then(res => {
        if (res.code == 0) {
          _this.submitWf(selections[0]);
        }
      });
    },
    checkSubmit (rowData) {
      return request({
        url: this.$backend.cmisBiz + '/api/coopplanapp/checkSubmit',
        method: 'POST',
        data: JSON.stringify(rowData)
      });
    },
    submitWf (rowData) {
      const loginUser = this.$xutils.getLoginUserInfo();
      let bizType = '';
      let orgType = loginUser.org.orgType;
      if (orgType == '') {
        this.$xutils.showMsgBox('提示', '机构类型未添加(总行/支行),请联系管理员');
        return false;
      }
      if (rowData.oprType == '1' && orgType == 0) {
        // HZ001 新增 总行部门
        bizType = 'HZ003';
      } else if (rowData.oprType == '1' && orgType != 0) {
        // HZ002 新增  支行部门
        bizType = 'HZ001';
      } else if (rowData.oprType == '2' && orgType == 0) {
        // HZ002 变更  总行部门
        bizType = 'HZ004';
      } else if (rowData.oprType == '2' && orgType != 0) {
        // HZ002 变更  支行部门
        bizType = 'HZ002';
      }

      const dutys = loginUser.dutys;

      var duty = '';

      for (let i = 0; i < dutys.length; i++) {
        // 如果是SGH01（寿光客户经理）或DHH01（东海客户经理），则是村镇银行客户经理)
        if (dutys[i].code == 'SGH01' || dutys[i].code == 'DHH01') {
          duty = 'H01';
          break;
        }
      }

      if (rowData.oprType == '1' && loginUser.orgCode.substring(0, 2) == '80' && duty != 'H01') {
        // 寿光村镇(普惠金融部)-准入
        bizType = 'SGB08';
      } else if (rowData.oprType == '1' && loginUser.orgCode.substring(0, 2) == '80' && duty == 'H01') {
        // 寿光村镇(分支机构)-准入
        bizType = 'SGB01';
      } else if (rowData.oprType == '2' && loginUser.orgCode.substring(0, 2) == '80' && duty != 'H01') {
        // 寿光村镇(普惠金融部)-变更
        bizType = 'SGB09';
      } else if (rowData.oprType == '2' && loginUser.orgCode.substring(0, 2) == '80' && duty == 'H01') {
        // 寿光村镇(分支机构)-变更
        bizType = 'SGB02';
      } else if (rowData.oprType == '1' && loginUser.orgCode.substring(0, 2) == '81' && duty != 'H01') {
        // 东海村镇(普惠金融部)-准入
        bizType = 'DHB08';
      } else if (rowData.oprType == '1' && loginUser.orgCode.substring(0, 2) == '81' && duty == 'H01') {
        // 东海村镇(分支机构)-准入
        bizType = 'DHB01';
      } else if (rowData.oprType == '2' && loginUser.orgCode.substring(0, 2) == '81' && duty != 'H01') {
        // 东海村镇(普惠金融部)-变更
        bizType = 'DHB09';
      } else if (rowData.oprType == '2' && loginUser.orgCode.substring(0, 2) == '81' && duty == 'H01') {
        // 东海村镇(分支机构)-变更
        bizType = 'DHB02';
      }

      const partnerType = rowData.partnerType;
      const apprStatus = rowData.apprStatus;
      // 项目类型
      var proType = '';
      if (partnerType == '1') {
        yufp.service.request({
          method: 'POST',
          async: false,
          data: {condition: JSON.stringify({serno: rowData.serno})},
          url: this.$backend.cmisBiz + '/api/coopplanproinfo/query',
          callback: function (code, message, response) {
            if (response.code == '0') {
              let coopPlanProArray = response.data;
              if (coopPlanProArray != null && coopPlanProArray.length > 0) {
                proType = coopPlanProArray[0].proType;
              }
            } else {
              this.$xutils.showMsgBox('提示', response.erortx);
              return false;
            }
          }
        });
      }
      // 提交流程
      let startdto = {};
      startdto.systemId = 'dscms';
      startdto.orgId = loginUser.orgCode;
      startdto.userId = loginUser.loginCode;
      startdto.bizType = bizType;
      startdto.bizId = rowData.serno;
      startdto.bizUserName = rowData.partnerName;
      startdto.bizUserId = rowData.partnerNo;
      startdto.param = {
        orgType: orgType,
        partnerType: partnerType,
        apprStatus: apprStatus,
        proType: proType
      };
      if (bizType == 'SGB01' || bizType == 'SGB02') {
        startdto.param.submitNodeId = '711_3';
        startdto.param.submitUserId = loginUser.loginCode;
      } else if (bizType == 'DHB01' || bizType == 'DHB02') {
        startdto.param.submitNodeId = '728_3';
        startdto.param.submitUserId = loginUser.loginCode;
      }
      this.$refs.yufpNwfInit.wfInit(startdto);
    },
    /** 刷新表格 */
    remoteData () {
      this.$refs.refTable.remoteData();
    },
    /**
    *格式化小数点
     */
    toPercent: function (row, column, cellValue) {
      if (cellValue != null && typeof cellValue != 'undefined') {
        cellValue = (parseFloat(cellValue) * 100).toFixed(2);
      }
      return cellValue;
    }
  }
};
</script>
<style lang="scss" scoped>
.yu-xtable{
  margin-top: 24px;
}
</style>