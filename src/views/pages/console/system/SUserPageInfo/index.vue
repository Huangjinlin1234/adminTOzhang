<template>
  <div class="user-container">
    <formTable :page-options="pageOptions" @emitSelection="selectionFn">
      <template slot="button">
        <el-button ref="btn_insertFn" type="primary" @click="openDialog('ADD')">新增</el-button>
        <el-button ref="btn_insertFn" type="primary" @click="openDialog('EDIT')">修改</el-button>
        <el-button ref="btn_deleteFn" type="primary" @click="openDialog('DETAIL')">查看</el-button>
        <el-button ref="btn_viewFn" type="primary" @click="cancelUser('user')">注销</el-button>
        <el-button ref="btn_updateFn" type="primary" @click="setDuty">设置岗位</el-button>
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
import minxinDiaFn from '@/views/pages/console/common/minxin.js';
import userEdit from './userEdit.vue';
export default {
  components: { formTable, userEdit, transferCpn },
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
          { label: '用户代码', prop: 'userCode' },
          { label: '用户姓名', prop: 'userName' },
          { label: '机构名称', prop: 'orgName' },
          { label: '联系电话', prop: 'telPhone' },
          { label: '性别', prop: 'sex' },
          { label: '状态', prop: 'status' },
          { label: '是否柜员', prop: 'isSyncUser' }
        ]
      },
      selections: [],
      setDutyOpen: false
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
}
</style>