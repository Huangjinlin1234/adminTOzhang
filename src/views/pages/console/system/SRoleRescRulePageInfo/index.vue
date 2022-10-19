<template>
  <div class="resource-container">
    <el-row>
      <el-col :span="7">
        <yu-input v-model="input" placeholder="请输入内容" :limit-char="limitChar"></yu-input>
        <!-- 角色树 -->
        <div class="tree-content">
          <yu-tree ref="roleTree" :data="roleTreeData" :props="roleProps" node-key="roleCode" @node-click="nodeClickFn">
          </yu-tree>
        </div>
      </el-col>
      <el-col :span="10">
        <yu-input v-model="input" placeholder="请输入内容" :limit-char="limitChar"></yu-input>
        <!-- 资源树 -->
        <div class="tree-content">
          <yu-tree ref="rescTree" :data="rescTreeData" :props="rescProps" node-key="rescCode" @node-click="nodeClickFn">
          </yu-tree>
        </div>
      </el-col>
      <el-col :span="7">
        <yu-xcheckbox v-model="roleRescRules" style="margin-top: 36px;margin-left: 5px;"></yu-xcheckbox>
        <div style="margin-top: 36px;margin-left: 5px;text-align: center;">
          <el-button type="primary" @click="saveRoleRescRule">保存</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getResource, getRescActs, getRoles, getResCHNDesc } from '@/api/systemManage/resource';
export default {
  components: {
  },
  data () {
    return {
      expandAll: false,
      roleTreeData: [],
      rescTreeData: [],
      defaultProps: {
        children: 'children',
        label: 'rescDesc'
      },
      roleProps: {
        children: 'children',
        label: 'roleName'
      },
      rescProps: {
        children: 'children',
        label: 'rescDesc'
      },
      roleRescRules: '',
      formFileds: [
        { name: 'rescCode', label: '资源代码', disabled: true, rules: [{ required: true, message: '资源代码是必填项', trigger: 'blur' }, { max: 32, message: '最大长度为32' }] },
        { name: 'rescDesc', label: '资源中文描述', rules: [{ required: true, message: '资源中文描述是必填项', trigger: 'blur' }, { max: 80, message: '最大长度为80' }] },
        { name: 'funcId', label: '路由', rules: [{ max: 32, message: '最大长度为32' }] },
        { name: 'rescIcon', label: '资源图标', rules: [{ max: 60, message: '最大长度为60' }] },
        { name: 'orderId', label: '序号', rules: [{ validator: yufp.validator.number, message: '序号必须为数字值' }] },
        { name: 'rescUrl', label: '资源URL', colspan: "24", rules: [{ max: 254, message: '最大长度为254' }] },
        { name: 'memo', label: '备注', colspan: "24", type: 'textarea', rules: [{ max: 100, message: '最大长度为100' }] }
      ],
      tableFields: [
        { label: '操作码', prop: 'rescActCode', resizable: true },
        { label: '路由', prop: 'funcId', resizable: true },
        { label: '操作码中文描述', prop: 'rescActDesc', width: 200, resizable: true }
      ],
      baseParams: {},
      dataUrl: getRescActs(),
      pageType: '', // 资源操作信息页面类型,
      resource: {}, // 资源信息
      resourceOper: {}, // 资源操作信息
      isShowResource: false,
      isShowResOper: false,
    };
  },
  created () {
    this.getTreeDataFn();
  },
  methods: {
    transExpand () {
      this.expandAll = !this.expandAll;
      let _this = this;
      let closeFn = function (obj) {
        let data = obj.childNodes;
        if (data && data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            data[i].expanded = _this.expandAll;
            closeFn(data[i]);
          }
        }
      };
      let data = this.$refs.rescTree.root.childNodes;
      if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          data[i].expanded = this.expandAll;
          closeFn(data[i]);
        }
      }
    },
    transTree (list, rootValue) {
      let treeData = [];
      list.forEach(item => {
        if (!item.rescParentCode) {
          treeData.push(item);
        }
        const children = list.filter(data => data.rescParentCode === item.rescCode);
        if (!children.length) { return };
        item.children = children;
      });
      return treeData;
    },
    transRoleTree (list, rootValue) {
      let treeData = [];
      // list.forEach(item => {
      // if (!item.rescParentCode) {
      // treeData.push(item);
      // }
      // });
      return list;
    },
    getTreeDataFn () {
      getRoles({}).then(res => {
        if (res.code === '0') {
          console.log('res', res)
          let childrenArr = this.transRoleTree(res.rows, '');
          this.roleTreeData = childrenArr;
        }
      });
      getResCHNDesc({}).then(res => {
        if (res.code === '0') {
          console.log('res', res)
          let childrenArr = this.transTree(res.rows, '');
          this.rescTreeData = childrenArr;
        }
      });
    },
    getTableDataFn () {
      this.$refs.rescActTable.remoteData();
    },
    nodeClickFn (row) {
      // this.$refs.rescActTable.remoteData(row);
      getResource(row.rescCode).then(res => {
        if (res.code === '0') {
          this.$refs.refForm.formdata = res.rows;
        }
      })
    },
    renderContent: function (h, obj) {
      var _this = this, data = obj.data, store = obj.store, node = obj.node;
      var btnArray = [{ name: '增加', callback: function () { _this.append(store, data, node) }, type: 'primary' },
      { name: '删除', type: 'warning', callback: function () { _this.remove(store, data, node) } }];
      return h('span', {}, [
        h('span', {}, [h('span', {}, node.label)]),
        h('span', { attrs: { style: 'float: right; margin-right: 20px' } }, btnArray.map(function (item) {
          return h('yu-button', { props: { size: 'mini', type: item.type }, on: { click: item.callback } }, item.name);
        }))
      ]);
    },
    append (store, data, node) {
      console.log(store, data)
      this.isShowResource = true;
      if (data) {
        this.resource = { rescParentCode: data.rescCode, rescParentDesc: data.rescDesc };
      }
    },
    remove (store, data) {
      //   var childNodes = node.childNodes;
      //   if (childNodes.length > 0) {
      //     vm.$message({ message: '当前资源拥有子节点不允许删除!', type: 'warning' });
      //     return;
      //   }
      //   var rescCode = node.data ? node.data.rescCode : node.rescCode;

      //   vm.$confirm('是否删除?', '提示', {
      //     type: 'warning'
      //   }).then(function () {
      //     var url = backend.consoleService + '/api/s/resource';
      //     yufp.service.request({
      //       method: 'DELETE',
      //       url: url,
      //       data: { rescCode: rescCode },
      //       callback: function (code, message, response) {

      //         if (code == 0) {
      //           node.parent.removeChild(node);
      //           //如果删除的当前form 表单的资源
      //           if (rescCode == vm.$refs.resourceform.formModel.rescCode) {
      //             vm.$refs.resourceform.resetFn();
      //             vm.$refs.rescActTable.remoteData();
      //           }
      //           vm.$message('操作成功!');
      //         } else {
      //           vm.$message('查询资源信息失败');
      //         }
      //       }
      //     });
      //   });
      // }
    },
    deleteResOper () {

    },
    openType (pageType) {
      this.pageType = pageType;
      if (pageType === 'xz') {
        this.resourceOper = {}
        this.isShowResOper = true;
        return;
      }
      if (!this.$refs.rescActTable.selections.length) {
        this.$message({ message: '请先选择一条资源操作记录', type: 'warning' });
        return;
      }
      this.isShowResOper = true;
      this.resourceOper = this.$refs.rescActTable.selections[0];
      this.resourceOper.rescDesc = this.$refs.refForm.formdata.rescDesc
    }
  }
};
</script>

<style lang="scss" scoped>
.resource-container {
  .tree-content {
    height: 692px;
    overflow: auto;
  }
}
</style>
