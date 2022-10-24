<template>
  <div class="container">
    <el-panel panel-title="数据权限">
      <template slot="rightButton">
        <slot name="button" />
      </template>
      <template slot="form">
      </template>
      <div slot="table" class="table-content">
        <div class="role-container">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-input placeholder="输入角色名称进行过滤" v-model="roleName" class="h56"></el-input>
              <div class="tree-content">
                <el-tree ref="roleTree" :data="treeData" :filter-node-method="filterRoleNode" :props="defaultProps" @node-click="nodeClickFn" node-key="rescCode">
                </el-tree>
              </div>
            </el-col>
            <el-col :span="18">
              <div class="formTable-content">
                <el-form ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="reftable" :custom-search-fn="customSearch" inline>
                  <el-form-item v-for="(item,index) in formFileds" :key="index" :label="item.label" :ctype="item.ctype" :placeholder="item.label" :name="item.name">
                    <template v-if="item.ctype=='input'">
                      <el-input v-model="item.prop" placeholder="请输入内容" />
                    </template>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary">查询</el-button>
                    <el-button>重置</el-button>
                  </el-form-item>
                </el-form>
                <el-table ref="reftable" row-number json-data="rows" request-type="POST" selection-type="radio" :dataUrl="dataUrl" :baseParams="baseParams">
                  <el-table-column v-for="(ite,index) in tableFileds" :key="index" :label="ite.label" :prop="ite.prop"></el-table-column>
                </el-table>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-panel>
  </div>
</template>

<script>
// import { getTreeData, getTableData } from '@/api/systemManage/role.js';
import elPanel from '@/views/pages/console/common/elPanel.vue';
export default {
  components: { elPanel },
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
      formFileds: [
        { label: '菜单url', ctype: 'input', name: 'dataPersId' },
        { label: '菜单描述', ctype: 'input', name: 'rescDesc' }
      ],
      tableFileds: [
        { label: '角色代码', prop: 'roleCode' },
        { label: '菜单url', prop: 'dataPersId' },
        { label: '记录级权限类型', prop: 'dataPersId' }
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
}
.form-table{
  .table-content{
    padding: 24px;
  }
}
</style>
