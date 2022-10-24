<template>
  <div class="container">
    <el-panel type="second" panel-title="用户日志">
      <template slot="secondRight">
        <el-button ref="btn_insertFn" type="primary" @click="customClick('insertFn')">新增</el-button>
        <el-button ref="btn_updateFn" type="primary" @click="customClick('updateFn')">修改</el-button>
        <el-button ref="btn_deleteFn" type="primary" @click="customClick('deleteFn')">删除</el-button>
        <el-button ref="btn_viewFn" type="primary" @click="customClick('viewFn')">查看</el-button>
        <el-button ref="btn_updateFn" type="primary" hidden @click="submitBeforeFn">提交</el-button>
      </template>
      <template slot="form">
        <el-form ref="refForm" :model="formInline" label-width="120px" inline>
          <el-form-item label="用户账户" placeholder="合作方名称" prop="partnerName" fuzzy-query="both">
            <el-input />
          </el-form-item>
          <el-form-item label="机构">
            <el-input v-model="formInline.partnerType" placeholder="机构" />
          </el-form-item>
          <el-form-item label="操作类型">
            <el-input v-model="formInline.apprStatus" placeholder="操作类型" />
          </el-form-item>
          <el-form-item label="日志时间">
            <el-input v-model="formInline.apprStatus" placeholder="日志时间" />
          </el-form-item>
          <el-form-item label="登记机构">
            <el-input v-model="formInline.inputBrId" placeholder="登记机构" />
          </el-form-item>
          <el-form-item label="登记人">
            <el-input v-model="formInline.inputBrId" placeholder="登记人" />
          </el-form-item>
          <el-form-item label="登记机构">
            <el-input v-model="formInline.inputBrId" placeholder="登记机构" />
          </el-form-item>
          <el-form-item label="">
            <el-button ref="btn_viewFn" @click="customClick('viewFn')">重置</el-button>
            <el-button ref="btn_updateFn" type="primary" hidden @click="submitBeforeFn">查询</el-button>
          </el-form-item>
        </el-form>

      </template>
      <div class="table-content">
        <el-table :data="tableData">
          <el-table-column label="用户账户" prop="userId" width="180" />
          <el-table-column label="用户名称" prop="userOrgCode" />
          <el-table-column label="操作类型" prop="operType" />
          <el-table-column label="Url" prop="operPageUrl" />
          <el-table-column label="日志等级" prop="logLevel" />
          <el-table-column label="记录时间" prop="createTime" />
        </el-table>
      </div>
    </el-panel>
  </div>
</template>
<script>
import elPanel from '@/views/pages/console/common/elPanel.vue';
// yufp.lookup.reg('STD_PARTNER_TYPE,STD_COOP_PLAN_OPR_TYPE,STD_ZB_APPR_STATUS');
export default {
  name: 'UserLog',
  components: { elPanel },
  mixins: [],
  data: function() {
    return {
      formInline: {},
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: '/api/user/oper/logs',
      baseParams: {},
      deleteUrl: '/api/coopplanapp/delete/',
      tableData: []
    };
  },
  created() {
  },
  methods: {
    submitBeforeFn() {

    }
  }
};
</script>
<style lang="scss" scoped>
.container{
   background-color: #ffff;
   .table-content{
     padding: 0px 24px;
   }
}
</style>