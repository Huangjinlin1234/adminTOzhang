<template>
  <el-xpanel panel-title="数据权限">
    <template slot="content">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="输入角色名称进行过滤" v-model="roleName" class="h56"></el-input>
          <div class="tree-content">
            <el-tree ref="roleTree" :data="treeData" :filter-node-method="filterRoleNode" :props="defaultProps" @node-click="nodeClickFn" node-key="rescCode">
            </el-tree>
          </div>
        </el-col>
        <el-col :span="18">
          <list-page :form-fields="formFields" :table-fields="tableFields" :btn-fields="btnFields"></list-page>
        </el-col>
      </el-row>
    </template>
  </el-xpanel>
</template>

<script>
// import { getTreeData, getTableData } from '@/api/systemManage/role.js';
import listPage from '@/components/layout/listPage'
export default {
  components: { listPage },
  data () {
    return {
      treeData: [],
      dataUrl: '',
      // dataUrl: getTableData(),
      baseParams: {},
      searchFormdata: {},
      selectRoel: null,
      defaultProps: {
        children: 'children',
        label: 'roleName'
      },
      tableData: [],
      formFields: [
        { label: '菜单url', name: 'dataPersId' },
        { label: '菜单描述', name: 'rescDesc' }
      ],
      tableFields: [
        { label: '角色代码', prop: 'roleCode' },
        { label: '菜单url', prop: 'dataPersId' },
        { label: '记录级权限类型', prop: 'dataPersId' },
        { label: '菜单描述', prop: 'rescDesc' },
        { label: '创建人', prop: 'dataPersId' },
        { label: '创建时间', prop: 'dataPersId' },
      ],
      btnFields: [
        { label: '新增', name: 'add', click: this.clickFn },
        { label: '修改', name: 'add', click: this.clickFn },
        { label: '查看', name: 'add', click: this.clickFn },
        { label: '注销', name: 'add', click: this.clickFn },
      ],
      roleName: ''
    };
  },
  watch: {
    // 监听输入的值过滤树数据
    roleName: function (val) {
      this.$refs.roleTree.filter(val);
    }
  },
  created () {
    this.getTreeDataFn();
  },
  methods: {
    customSearch () {
      let params = {
        ...this.searchFormdata,
        roleCode: this.selectRoel.roleCode
      };
      this.$refs.reftable.remoteData(params);
    },
    filterRoleNode (value, data) {
      if (!value) { return true }
      return data.roleName.indexOf(value) !== -1;
    },
    // 点击树节点获取表格数据
    nodeClickFn (nodeData, node, self) {
      this.selectRoel = nodeData;
      this.$refs.reftable.remoteData(nodeData);
    },
    // 获取树数据
    getTreeDataFn () {
      // getTreeData({}).then(res => {
      //   if (res.code === '0') {
      //     this.treeData = res.rows;
      //   }
      // });
    },
    clickFn () {
      console.log("点击::: ");

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
