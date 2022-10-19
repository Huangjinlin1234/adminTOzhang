<template>
  <div>
    <formTable :pageOptions="pageOptions"  @emitSelection="selectionFn">
      <yu-button type="primary" ref="btn_insertFn"   @click="openDialog('ADD')">新增</yu-button>
      <yu-button type="primary" ref="btn_insertFn"   @click="openDialog('EDIT')">修改</yu-button>
      <yu-button type="primary" ref="btn_deleteFn" @click="openDialog('DETAIL')">查看</yu-button>
    </formTable>
    <roleEdit
      ref="refRoleEdit"
      :dialogVisible.sync="showDialog"
      :dialogTitle="dialogTitle"
      :pageType="pageType"
      :roleInfo="roleInfo">
    </roleEdit>
  </div>
</template>
<script>
import formTable from '@/views/pages/console/common/formTable.vue';
import minxinDiaFn from '@/views/pages/console/common/minxin.js';
import roleEdit from './roleEdit.vue';

export default {
  components: { formTable, roleEdit },
  mixins: [minxinDiaFn],
  data () {
    return {
      pageOptions: {
        title: '角色管理',
        dataUrl: backend.console + '/api/s/rolesBaseOrgs',
        formFileds: [
          {label: '角色代码', name: 'roleCode', ctype: 'input'},
          {label: '角色名称', name: 'roleName', ctype: 'input'}
        ],
        tableFileds: [
          {label: '角色代码', prop: 'roleCode'},
          {label: '角色名称', prop: 'roleName'},
          {label: '角色类型', prop: 'roleType'}
        ]
      },
      selections: [],
      roleInfo: {}
    };
  },
  methods: {
    selectionFn (selections) {
      this.selections = selections;
      this.roleInfo = selections[0];
    }
  }
};
</script>