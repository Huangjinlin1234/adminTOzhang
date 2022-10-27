<template>
  <div class="user-container">
    <formTable ref="formTable" :page-options="pageOptions" @emitSelection="selectionFn">
      <template slot="button">
        <el-button type="primary" @click="openDialog('ADD','refUserEdit','userInfo','userCode')">新增</el-button>
        <el-button type="primary" @click="openDialog('EDIT','refUserEdit','userInfo','userCode')">修改</el-button>
        <el-button type="primary" @click="openDialog('DETAIL','refUserEdit','userInfo','userCode')">查看</el-button>
        <el-button type="primary" @click="cancelUser('user')">注销</el-button>
        <el-button type="primary" @click="setDuty">设置岗位</el-button>
        <el-button type="primary" @click="setRole">设置角色</el-button>
        <el-button type="primary" @click="resetPwdFn">重置密码</el-button>
        <el-button type="primary" @click="openDialog('','refTransBusiness','userInfo','userCode')">移交业务</el-button>
      </template>
    </formTable>
    <userEdit
      ref="refUserEdit"
      :dialog-title="dialogTitle"
      :page-type="pageType"
      :user-info="userInfo"
      @refresh="refreshTable"
    />
    <transferCpn
      ref="refTrfDuty"
      dialog-title="设置岗位"
      :data-url="dutyDataUrl"
      @confirm="confirmFnDuty"
    />
    <transferCpn
      ref="refTrfRole"
      dialog-title="设置角色"
      :data-url="roleDataUrl"
      :titles="titlesRole"
      :default-props="roleProps"
      @confirm="confirmFnRole"
    />
    <transBusiness
      ref="refTransBusiness"
      :user-info="userInfo"
    />
  </div>
</template>
<script>
import formTable from '@/views/pages/console/common/formTable.vue';
import transferCpn from '@/views/pages/console/common/transferCpn.vue';
import minxinDiaFn from '@/views/pages/console/common/minxin.js';
import userEdit from './userEdit.vue';
import transBusiness from './transBusiness.vue';
import { resetPwd, saveTransfer } from '@/api/systemManage/userManage.js';
export default {
  components: { formTable, userEdit, transferCpn, transBusiness },
  mixins: [minxinDiaFn],
  data() {
    return {
      pageOptions: {
        title: '用户管理',
        dataUrl: '/console/api/s/users',
        formFileds: [
          { label: '用户代码', name: 'userCode', ctype: 'input' },
          { label: '用户姓名', name: 'userName', ctype: 'input' },
          { label: '性别', name: 'sex', ctype: 'input' },
          { label: '状态', name: 'status', ctype: 'input' }
        ],
        tableFileds: [
          { label: '用户代码', prop: 'userCode', ctype: 'span' },
          { label: '用户姓名', prop: 'userName', ctype: 'span' },
          { label: '机构名称', prop: 'orgName', ctype: 'span' },
          { label: '联系电话', prop: 'telPhone', ctype: 'span' },
          { label: '性别', prop: 'sex', ctype: 'span' },
          { label: '状态', prop: 'status', ctype: 'tag' },
          { label: '是否柜员', prop: 'isSyncUser', ctype: 'span' }
        ]
      },
      selection: {},
      input4: '',
      pageType: '',
      roleDataUrl: '/console/api/s/queryRoleAll',
      dutyDataUrl: '/console/api/s/all/dutys',
      roleProps: {
        key: 'roleCode',
        label: 'roleName'
      },
      roleSaveUrl: '/console/api/s/userRole',
      dutySaveUrl: '/console/api/s/dutySaveUrl',
      titlesRole: ['可分配角色', '已选岗位']
    };
  },
  computed: {
    userInfo() {
      return this.selection;
    }
  },
  methods: {
    selectionFn(selection) {
      this.selection = selection;
    },
    setDuty() {
      if (!this.userInfo.userCode) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      this.$refs.refTrfDuty.dialogVisible = true;
    },
    setRole() {
      if (!this.userInfo.userCode) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      this.$refs.refTrfRole.dialogVisible = true;
    },
    refreshTable() {
      this.$refs.formTable.getTableData();
    },
    emitNodeFn(obj) {
      this.$refs.formTable.getTableData({ orgCode: obj.Id });
    },
    // 注销用户
    cancelUser(sysModule) {
      if (!this.userInfo.userCode) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      if (this.userInfo.status == '0') {
        this.$message({ message: '已注销用户不能注销', type: 'warning' });
        return;
      }
      this.$confirm('是否注销用户?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning' }).then(() => {
        this.$request({
          method: 'DELETE',
          url: '/console/api/s/' + sysModule,
          data: this.userInfo
        }).then(res => {
          if (res.code === '0') {
          }
        });
      });
    },
    // 重置密码
    resetPwdFn() {
      console.log(this.userInfo.userCode, 'uuu');
      if (!this.userInfo.userCode) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      this.$confirm('密码重置只对本地用户有效！是否重置密码?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning' }).then(() => {
        resetPwd({ userCode: this.userInfo.userCode }).then(res => {
          if (res.code === '0') {
            console.log('成功');
          }
        });
      });
    },
    // 移交业务
    transBusiness() {

    },
    confirmFnRole(valueArray) {
      const userCode = this.selection.userCode;
      saveTransfer({ userCode, roleCodes: valueArray }, this.roleSaveUrl).then(res => {
        if (res.code == '0') {
          this.$refs.refTrfRole.dialogVisible = false;
          this.$message.success(res.message);
        }
      });
    },
    confirmFnDuty(valueArray) {
      const legalOrgCode = this.selection.legalOrgCode;
      saveTransfer({ legalOrgCode, orgCodes: valueArray }, this.saveTransfer).then(res => {
        if (res.code == '0') {
          this.$refs.refTrfDuty.dialogVisible = false;
          this.$message.success(res.message);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.user-container{
  background-color: #ffff;
  .el-input.el-input--medium.el-input--suffix{
    width: 200px;
    margin: 0px 5px;
  }
  .el-select.el-select--medium{
    margin: 0px 5px;
  }
}
</style>