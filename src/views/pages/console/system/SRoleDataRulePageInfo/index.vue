<template>
  <el-xpanel panel-title="数据权限">
    <template slot="content">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-xtree :data-url="dataUrl2" @node-click="nodeClickFn" :default-props="roleProps"></el-xtree>
        </el-col>
        <el-col :span="18">
          <list-page ref="refTable" :form-data.sync="formData" :form-fields="formFields" :table-fields="tableFields" :btn-fields="btnFields" :data-url="dataUrl"></list-page>
        </el-col>
      </el-row>
      <guide-page ref="refGuide" :dialog-view.sync="dialogView" :dialog-title="dialogTitle" :form-fields="dFormFields" :form-data.sync="dFormData" :btn-fields="dBtnFields"></guide-page>
      <data-rule-list :dialog-view.sync="dialogView2" @return-data="returnDataFn"></data-rule-list>
    </template>
  </el-xpanel>
</template>

<script>
import { setDataRule } from '@/api/systemManage/role.js';
import listPage from '@/components/layout/listPage'
import guidePage from '@/components/layout/guidePage'
import dataRuleList from '@/components/busi/dataRuleList'
export default {
  components: { listPage, guidePage, dataRuleList },
  data () {
    return {
      treeData: [],
      dataUrl: '/console/api/s/role/data/rules',
      dataUrl2: '/console/api/s/queryRoleAll',
      baseParams: {},
      searchFormdata: {},
      selectRole: null,
      defaultProps: {
        children: 'children',
        label: 'roleName'
      },
      tableData: [],
      formFields: [
        { label: '菜单url', prop: 'dataPersId' },
        { label: '菜单描述', prop: 'rescDesc' }
      ],
      tableFields: [
        { label: '角色代码', prop: 'roleCode' },
        { label: '菜单url', prop: 'dataPersId' },
        { label: '记录级权限类型', prop: 'permisType' },
        { label: '菜单描述', prop: 'rescDesc' },
        { label: '创建人', prop: 'createUser' },
        { label: '创建时间', prop: 'createTime' },
      ],
      btnFields: [
        { label: '新增', name: 'add', click: () => { this.openDialog('add') } },
        { label: '修改', name: 'modify', click: () => { this.openDialog('modify') } },
        { label: '查看', name: 'view', click: () => { this.openDialog('view') } },
        { label: '注销', name: 'delete', click: this.delData },
      ],
      roleName: '',
      roleProps: {
        id: 'roleCode',
        label: 'roleName',
        children: 'children',
      },
      dialogView: false,
      dialogTitle: '',
      dBtnFields: [
        { label: '保存', type: 'primary', click: this.nextStep },
        // { label: '重置', etype: 'reset' },
        { label: '取消', etype: 'cancel' }
      ],
      dFormFields: [
        { label: '角色代码', prop: 'roleCode' },
        { label: '菜单url', prop: 'dataPersId', icon: 'el-icon-search', iconClick: this.openDataRuleList },
        { label: '记录级权限类型', prop: 'permisType' },
        { label: '菜单描述', prop: 'rescDesc' },
      ],
      formData: {},
      dFormData: {},
      dialogView2: false,
    };
  },
  watch: {
    // 监听输入的值过滤树数据
    roleName: function (val) {
      this.$refs.roleTree.filter(val);
    },
    dialogView () {
      return this.dialogView2 = false
    }
  },
  methods: {
    filterRoleNode (value, data) {
      if (!value) { return true }
      return data.roleName.indexOf(value) !== -1;
    },
    // 点击树节点获取表格数据
    nodeClickFn (data, node, self) {
      this.selectRole = data;
      this.$refs.refTable.remoteData(data);
    },
    openDialog (title) {
      let selection = this.$refs.refTable.selection;
      switch (title) {
        case 'modify':
          if (!selection.length) {
            this.$message.warning('请先选择一条数据！');
            return;
          }
          this.dFormData = selection[0];
          break;
        case 'view':
          if (!selection.length) {
            this.$message.warning('请先选择一条数据！');
            return;
          }
          this.dFormData = selection[0];
          break;
        default:
          if (!this.selectRole || !this.selectRole.roleCode) {
            this.$message.warning('请先选择一个角色！');
            return
          }
          this.dFormData = { roleCode: this.selectRole.roleCode }
          break;
      }
      this.dialogView = true;
    },
    openDataRuleList () {
      this.dialogView2 = true
    },
    nextStep () {
      console.log("this.dialogView::: ", this.dialogView);
      // this.dialogTitle = title
      // this.dialogView = true;
    },
    delData () {
      let selection = this.$refs.refTable.selection;
      if (!selection.length) {
        this.$message.warning('请先选择一条数据！');
        return;
      }
      let _this = this;
      this.$confirm('点击确定将永久删除该数据，是否确认？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
        callback: function (action) {
          console.log(action, "action::: ");
          if (action === 'confirm') {
            let { dataPersId, roleCode } = selection[0]
            setDataRule('DELETE', { dataPersId, roleCode }).then(_ => {
              _this.$refs.refTable.searchFn();
            }).catch(err => {
              console.log(err, "err::: ");
            })
          }
        }
      });
    },
    click () {

    },
    returnDataFn (data) {
      const { dataPersId, dataPersDesc } = data;
      this.$refs.refGuide.assign({ dataPersId, rescDesc: dataPersDesc })
    }
  }
};
</script>

<style lang="scss" scoped>


  .el-input.el-input--medium.el-input--suffix{
    width: 200px;
    margin: 0px 5px;
  }
  .el-select.el-select--medium{
    margin: 0px 5px;
  }
  .role-container {
    margin-top: 16px;
    .h56 {
      height: 56px;
    }
    .tree-content {
      height: 608px;
      overflow: auto;
    }
  }
</style>
