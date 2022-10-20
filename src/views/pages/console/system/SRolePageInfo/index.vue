<template>
  <div class="container">
    <formTable :page-options="pageOptions" @emitSelection="selectionFn">
      <template slot="button">
        <el-button ref="btn_insertFn" type="primary" @click="openDialog('ADD')">新增</el-button>
        <el-button ref="btn_insertFn" type="primary" @click="openDialog('EDIT')">修改</el-button>
        <el-button ref="btn_deleteFn" type="primary" @click="openDialog('DETAIL')">查看</el-button>
        <el-button ref="btn_viewFn" type="primary" @click="cancelUser('user')">注销</el-button>
        <el-button ref="btn_updateFn" type="primary" @click="setDuty">设置岗位</el-button>
        <selectTree />
        <el-input
          v-model="input4"
          placeholder="请输入内容"
        >
          <i slot="suffix" class="el-input__icon el-icon-search" />
        </el-input>

      </template>
      <yu-button ref="btn_insertFn" type="primary" @click="openDialog('ADD')">新增</yu-button>
      <yu-button ref="btn_insertFn" type="primary" @click="openDialog('EDIT')">修改</yu-button>
      <yu-button ref="btn_deleteFn" type="primary" @click="openDialog('DETAIL')">查看</yu-button>
    </formTable>
    <roleEdit
      ref="refRoleEdit"
      :dialog-visible.sync="showDialog"
      :dialog-title="dialogTitle"
      :page-type="pageType"
      :role-info="roleInfo"
    />
  </div>
</template>
<script>
import formTable from '@/views/pages/console/common/formTable.vue';
import minxinDiaFn from '@/views/pages/console/common/minxin.js';
import roleEdit from './roleEdit.vue';

export default {
  components: { formTable, roleEdit },
  mixins: [minxinDiaFn],
  data() {
    return {
      pageOptions: {
        title: '角色管理',
        dataUrl: '/api/s/rolesBaseOrgs',
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
      selections: [],
      roleInfo: {}
    };
  },
  methods: {
    selectionFn(selections) {
      this.selections = selections;
      this.roleInfo = selections[0];
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