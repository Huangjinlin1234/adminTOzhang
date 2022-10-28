<template>
  <div class="container">
    <formTable :page-options="pageOptions" @emitSelection="selectionFn">
      <template slot="button">
        <el-button type="primary" @click="openDialog('ADD','refDutyEdit','dutyInfo','dutyCode')">新增</el-button>
        <el-button @click="openDialog('EDIT','refDutyEdit','dutyInfo','dutyCode')">修改</el-button>
        <el-button @click="openDialog('DETAIL','refDutyEdit','dutyInfo','dutyCode')">查看</el-button>
        <el-button @click="openDialog('','refVuser','dutyInfo','dutyCode')">查看岗位下用户</el-button>
        <el-button @click="cancelDutyFn">注销</el-button>
      </template>
    </formTable>
    <dutyEdit
      ref="refDutyEdit"
      :dialog-title="dialogTitle"
      :page-type="pageType"
      :duty-info="dutyInfo"
    />
    <viewRuser ref="refVuser" :table-fileds="tableFileds" :module-info="dutyInfo" :base-params="baseParams" :table-data-url="vUserUrl" />
  </div>
</template>
<script>
import formTable from '@/views/pages/console/common/formTable.vue';
import minxinDiaFn from '@/views/pages/console/common/minxin.js';
import viewRuser from '@/views/pages/console/common/viewRuser.vue';
import dutyEdit from './dutyEdit.vue';
import { dutyEditApi } from '@/api/systemManage/dutyManage.js';
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
          { label: '岗位代码', prop: 'dutyCode' },
          { label: '岗位名称', prop: 'dutyName' },
          { label: '状态', prop: 'status' }
        ]
      },
      baseParams: {},
      tableFileds: [
        { label: '岗位代码', prop: 'roleCode' },
        { label: '用户代码', prop: 'roleName' },
        { label: '用户姓名', prop: 'userName' },
        { label: '机构名称', prop: 'orgName' },
        { label: '联系电话', prop: 'telPhone' },
        { label: '性别', prop: 'sex' },
        { label: '状态', prop: 'status' }

      ],
      dutyInfo: {},
      vUserUrl: '/console/api/s/dutys/user'
    };
  },
  methods: {
    selectionFn(selection) {
      this.dutyInfo = selection;
    },
    cancelDutyFn() {
      const dutyName = this.dutyInfo.dutyName;
      if (!dutyName) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      this.$confirm(`是否删除岗位【${dutyName}】？`, '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        dutyEditApi(this.dutyInfo.dutyCode).then(res => {
          if (res.code == '0') {
            this.$message.success(res.message);
          }
        });
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