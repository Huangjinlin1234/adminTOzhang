<template>
  <div class="user-container">
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
    </formTable>
    <userEdit
      ref="refUserEdit"
      :dialog-visible.sync="showDialog"
      :dialog-title="dialogTitle"
      :page-type="pageType"
      :user-info="userInfo"
    />
    <transferCpn
      dialog-title="设置岗位"
      :dialog-visible.sync="setDutyOpen"
    />

  </div>
</template>
<script>
import formTable from '@/views/pages/console/common/formTable.vue';
import transferCpn from '@/views/pages/console/common/transferCpn.vue';
import selectTree from '@/views/pages/console/common/selectTree.vue';
import minxinDiaFn from '@/views/pages/console/common/minxin.js';
import userEdit from './userEdit.vue';
export default {
  components: { formTable, userEdit, transferCpn, selectTree },
  mixins: [minxinDiaFn],
  data() {
    return {
      pageOptions: {
        title: '用户管理',
        dataUrl: '/api/s/users',
        formFileds: [
          { label: '用户代码', name: 'orgCode', ctype: 'input' },
          { label: '用户姓名', name: 'orgName', ctype: 'input' },
          { label: '性别', name: 'orgName', ctype: 'input' },
          { label: '状态', name: 'orgName', ctype: 'input' }
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
      selections: [],
      setDutyOpen: false,
      input4: ''
    };
  },
  computed: {
    userInfo() {
      return this.selections[0];
    }
  },
  methods: {
    selectionFn(selections) {
      this.selections = selections;
    },
    setDuty() {
      this.setDutyOpen = !this.setDutyOpen;
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