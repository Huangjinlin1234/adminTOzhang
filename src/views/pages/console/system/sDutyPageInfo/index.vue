<template>
  <div class="container">
    <formTable :page-options="pageOptions" @emitSelection="selectionFn">
      <template slot="button">
        <el-button type="primary" @click="openDialog('ADD','refDutyEdit','dutyInfo','dutyCode')">新增</el-button>
        <el-button type="primary" @click="openDialog('EDIT','refDutyEdit','dutyInfo','dutyCode')">修改</el-button>
        <el-button type="primary" @click="openDialog('DETAIL','refDutyEdit','dutyInfo','dutyCode')">查看</el-button>
        <el-button type="primary" @click="openDialog('','refVuser','dutyInfo','dutyCode')">查看岗位下用户</el-button>
        <el-button type="primary" @click="cancelOut">注销</el-button>
      </template>
    </formTable>
    <dutyEdit
      ref="refDutyEdit"
      :dialog-title="dialogTitle"
      :page-type="pageType"
      :duty-info="dutyInfo"
    />
    <viewRuser ref="refVuser" :table-fileds="tableFileds" :role-info="roleInfo" :table-data-url="vUserUrl" />
  </div>
</template>
<script>
import formTable from '@/views/pages/console/common/formTable.vue';
import minxinDiaFn from '@/views/pages/console/common/minxin.js';
import viewRuser from '@/views/pages/console/common/viewRuser.vue';
import dutyEdit from './dutyEdit.vue';
export default {
  components: { formTable, dutyEdit, viewRuser },
  mixins: [minxinDiaFn],
  data() {
    return {
      pageOptions: {
        title: '岗位管理',
        dataUrl: '/api/s/dutys',
        formFileds: [
          { label: '岗位代码', name: 'dutyCode', ctype: 'input' },
          { label: '岗位名称', name: 'dutyName', ctype: 'input' },
          { label: '状态', name: 'dutyName', ctype: 'select' }
        ],
        tableFileds: [
          { label: '岗位代码', prop: 'orgCode' },
          { label: '岗位名称', prop: 'orgName' },
          { label: '状态', prop: 'status' }
        ]
      },
      tableFileds: [
        { label: '角色代码', prop: 'roleCode' },
        { label: '用户代码', prop: 'roleName' },
        { label: '用户姓名', prop: 'userName' },
        { label: '机构名称', prop: 'orgName' },
        { label: '联系电话', prop: 'telPhone' },
        { label: '性别', prop: 'sex' },
        { label: '状态', prop: 'status' }

      ],
      selections: [],
      dutyInfo: {},
      input4: '',
      vUserUrl: ''
    };
  },
  methods: {
    selectionFn(selection) {
      this.dutyInfo = selection;
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