<template>
  <div class="org-container">
    <formTable :page-options="pageOptions" @emitSelection="selectionFn">
      <template slot="button">
        <el-button type="primary" @click="openDialog('ADD','refOrgEdit','orgInfo','orgCode')">新增</el-button>
        <el-button @click="openDialog('EDIT','refOrgEdit','orgInfo','orgCode')">修改</el-button>
        <el-button @click="openDialog('DETAIL','refOrgEdit','orgInfo','orgCode')">查看</el-button>
        <el-button @click="cancelOrgFn">注销</el-button>
      </template>
    </formTable>
    <orgEdit
      ref="refOrgEdit"
      :dialog-title="dialogTitle"
      :page-type="pageType"
      :org-info="orgInfo"
    />
  </div>
</template>
<script>
import formTable from '@/views/pages/console/common/formTable.vue';
import minxinDiaFn from '@/views/pages/console/common/minxin.js';
import orgEdit from './orgEdit.vue';
import { orgEditApi } from '@/api/systemManage/orgManage.js';

export default {
  components: { formTable, orgEdit },
  mixins: [minxinDiaFn],
  data() {
    return {
      pageOptions: {
        title: '机构管理',
        dataUrl: '/console/api/s/orgs',
        formFileds: [
          { label: '机构代码', name: 'orgCode', ctype: 'input' },
          { label: '机构名称', name: 'orgName', ctype: 'input' }
        ],
        tableFileds: [
          { label: '机构代码', prop: 'orgCode' },
          { label: '机构名称', prop: 'orgName' },
          { label: '机构层级', prop: 'orgLvl' },
          { label: '上级机构代码', prop: 'orgParentCode' }
        ]
      },
      selections: {},
      orgInfo: {},
      input4: ''
    };
  },
  methods: {
    selectionFn(selection) {
      this.orgInfo = selection;
    },
    cancelOrgFn() {
      const orgName = this.orgInfo.orgName;
      if (!orgName) {
        this.$message({ message: '请先选择一条记录', type: 'warning' });
        return;
      }
      this.$confirm(`是否注销机构【${orgName}】?`, '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        orgEditApi({ orgCode: this.orgInfo.orgCode, status: '0' }).then(res => {
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
.org-container{
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