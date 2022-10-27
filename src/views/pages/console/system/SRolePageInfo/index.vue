<template>
  <div class="container">
    <formTable :page-options="pageOptions" @emitSelection="selectionFn">
      <template slot="button">
        <el-button type="primary" @click="openDialog('ADD','refRoleEdit','roleInfo','roleCode')">新增</el-button>
        <el-button @click="openDialog('EDIT','refRoleEdit','roleInfo','roleCode')">修改</el-button>
        <el-button @click="openDialog('DETAIL','refRoleEdit','roleInfo','roleCode')">查看</el-button>
        <el-button @click="openDialog('','refVuser','roleInfo','roleCode')">查看角色下用户</el-button>
        <el-button @click="cancelOut">注销</el-button>
      </template>
    </formTable>
    <roleEdit
      ref="refRoleEdit"
      :dialog-title="dialogTitle"
      :page-type="pageType"
      :role-info="roleInfo"
    />
    <viewRuser ref="refVuser" :base-params="baseParams" :table-fileds="tableFlds" :table-data-url="vUserUrl" :role-info="roleInfo" />
  </div>
</template>
<script>
import formTable from '@/views/pages/console/common/formTable.vue';
import minxinDiaFn from '@/views/pages/console/common/minxin.js';
import roleEdit from './roleEdit.vue';
import viewRuser from '@/views/pages/console/common/viewRuser.vue';
import { cancelRoleApi } from '@/api/systemManage/roleManage.js';

export default {
  components: { formTable, roleEdit, viewRuser },
  mixins: [minxinDiaFn],
  data() {
    return {
      pageOptions: {
        title: '角色管理',
        dataUrl: '/console/api/s/rolesBaseOrgs',
        formFileds: [
          { label: '角色代码', name: 'roleCode', ctype: 'input' },
          { label: '角色名称', name: 'roleName', ctype: 'input' }
        ],
        tableFileds: [
          { label: '角色代码', prop: 'roleCode' },
          { label: '角色名称', prop: 'roleName' },
          { label: '角色类型', prop: 'roleType' }
        ]
      },
      tableFlds: [
        { label: '角色代码', prop: 'roleCode' },
        { label: '用户代码', prop: 'roleName' },
        { label: '用户姓名', prop: 'userName' },
        { label: '机构名称', prop: 'orgName' },
        { label: '联系电话', prop: 'telPhone' },
        { label: '性别', prop: 'sex' },
        { label: '状态', prop: 'status' }
      ],
      roleInfo: {},
      vUserUrl: '/console/api/s/roles/user',
      baseParams: { roleCode: '' }
    };
  },
  methods: {
    selectionFn(selection) {
      this.roleInfo = selection;
      this.baseParams.roleCode = selection.roleCode;
    },
    cancelOut() {
      const roleName = this.roleInfo.roleName;
      if (!roleName) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      this.$confirm(`是否删除角色【${roleName}】？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cancelRoleApi({}.then(res => {
          if (res.code === '0') {

          }
        }));
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container{
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