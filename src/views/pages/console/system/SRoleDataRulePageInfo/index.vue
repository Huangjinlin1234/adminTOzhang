<template>
  <div class="role-container">
    <el-row>
      <el-col :span="6">
        <el-input placeholder="输入角色名称进行过滤" v-model="roleName"></el-input>
        <div class="tree-content">
          <yu-tree
            ref="roleTree"
            :data="treeData"
            :filter-node-method="filterRoleNode"
            :props="defaultProps"
             @node-click="nodeClickFn"
            node-key="rescCode">
          </yu-tree>、
        </div>

      </el-col>
      <el-col :span="18">
      <div class="formTable-content">
        <yu-xform ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="reftable" :custom-search-fn="customSearch">
        <yu-xform-group :column="3">
          <yu-xform-item v-for="(item,index) in formFileds" :key="index" :label="item.label" :ctype="item.ctype" :placeholder="item.label" :name="item.name"></yu-xform-item>
        </yu-xform-group>
        </yu-xform>
        <yu-xtable ref="reftable" row-number json-data="rows" request-type="POST"  selection-type="radio"  :dataUrl="dataUrl" :baseParams="baseParams">
          <yu-xtable-column v-for="(ite,index) in tableFileds" :key="index" :label="ite.label" :prop="ite.prop"></yu-xtable-column>
        </yu-xtable>
      </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getTreeData, getTableData} from '@/api/systemManage/role.js';
export default {
  data () {
    return {
      treeData: [],
      dataUrl: getTableData(),
      baseParams: {},
      searchFormdata: {},
      selectRoel: null,
      defaultProps: {
        children: 'children',
        label: 'roleName'
      },
      tableData: [],
      formFileds: [
        {label: '菜单url', ctype: 'input', name: 'dataPersId'},
        {label: '菜单描述', ctype: 'input', name: 'rescDesc'}
      ],
      tableFileds: [
        {label: '角色代码', prop: 'roleCode'},
        {label: '菜单url', prop: 'dataPersId'},
        {label: '记录级权限类型', prop: 'dataPersId'}
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
      getTreeData({}).then(res => {
        if (res.code === '0') {
          this.treeData = res.rows;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.role-container{
  .tree-content{
    height: 608px;
    overflow: auto;
  }
  .formTable-content{
    padding: 10px;
  }
}
</style>