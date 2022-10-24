<template>
  <div class="container">
    <formTable :page-options="pageOptions" @emitSelection="selectionFn">
      <template slot="button">
        <el-button ref="btn_insertFn" type="primary" @click="openDialog('ADD')">新增</el-button>
        <el-button ref="btn_insertFn" type="primary" @click="openDialog('EDIT')">修改</el-button>
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
    <dutyEdit
      ref="refDutyEdit"
      :dialog-visible.sync="showDialog"
      :dialog-title="dialogTitle"
      :page-type="pageType"
      :duty-info="dutyInfo"
    />
  </div>
</template>
<script>
import formTable from '@/views/pages/console/common/formTable.vue';
import selectTree from '@/views/pages/console/common/selectTree.vue';
import minxinDiaFn from '@/views/pages/console/common/minxin.js';
import dutyEdit from './dutyEdit.vue';
export default {
  components: { formTable, dutyEdit, selectTree },
  mixins: [minxinDiaFn],
  data() {
    return {
      pageOptions: {
        title: '岗位管理',
        dataUrl: '/api/s/dutys',
        formFileds: [
          { label: '岗位代码', name: 'dutyCode', ctype: 'input' },
          { label: '岗位名称', name: 'dutyName', ctype: 'input' }
        ],
        tableFileds: [
          { label: '岗位代码', prop: 'orgCode' },
          { label: '岗位名称', prop: 'orgName' },
          { label: '状态', prop: 'status' }
        ]
      },
      selections: [],
      dutyInfo: {},
      input4: ''
    };
  },
  methods: {
    selectionFn(selections) {
      this.selections = selections;
      this.dutyInfo = selections[0];
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