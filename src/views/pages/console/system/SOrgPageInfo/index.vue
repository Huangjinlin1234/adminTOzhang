<template>
  <div class="org-container">
    <formTable :page-options="pageOptions" @emitSelection="selectionFn">
      <template slot="button">
        <el-button ref="btn_insertFn" type="primary" @click="openDialog('ADD')">新增</el-button>
        <el-button ref="btn_insertFn" @click="openDialog('EDIT')">修改</el-button>
        <el-button ref="btn_deleteFn" type="primary" @click="openDialog('DETAIL')">查看</el-button>
        <selectTree />
        <el-input
          v-model="input4"
          placeholder="请输入内容"
        >
          <i slot="suffix" class="el-input__icon el-icon-search" />
        </el-input>
      </template>
    </formTable>
    <orgEdit
      ref="refOrgEdit"
      :dialog-visible.sync="showDialog"
      :dialog-title="dialogTitle"
      :page-type="pageType"
      :org-info="orgInfo"
    />
  </div>
</template>
<script>
import formTable from '@/views/pages/console/common/formTable.vue';
import minxinDiaFn from '@/views/pages/console/common/minxin.js';
import selectTree from '@/views/pages/console/common/selectTree.vue';
import orgEdit from './orgEdit.vue';
export default {
  components: { formTable, orgEdit, selectTree },
  mixins: [minxinDiaFn],
  data() {
    return {
      pageOptions: {
        title: '机构管理',
        dataUrl: '/api/s/orgs',
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
      selections: [],
      orgInfo: {},
      input4: ''
    };
  },
  methods: {
    selectionFn(selections) {
      this.selections = selections;
      this.orgInfo = selections[0];
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