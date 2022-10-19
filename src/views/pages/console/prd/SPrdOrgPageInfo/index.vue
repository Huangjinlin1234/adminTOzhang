<template>
  <div class="resource-container">
    <yu-xform ref="refForm" label-width="120px" :hidden-rule="true" :disabled="disabled" v-model="formdata" form-type="search" hidden-del-val>
      <yu-xform-group>
        <yu-xform-item v-for="(item,index) in queryFields" :key="index" :label="item.label" :colspan="item.colspan" :ctype="item.ctype" :name="item.name"></yu-xform-item>
      </yu-xform-group>
    </yu-xform>
    <el-button type="primary" icon="plus" @click="dialogVisible = true">新增</el-button>
    <el-button type="primary" icon="delete" @click="openType('sc')">删除</el-button>
    <yu-xtable ref="rescActTable" :data-url="dataUrl" :base-params="baseParams" request-type="POST" :defauld-load="false" :pageable="false" json-data="rows">
      <yu-xtable-column v-for="(item, index) in tableFields" :key="index" :label="item.label" :prop="item.prop"></yu-xtable-column>
    </yu-xtable>
    <yu-org-list :dialog-visible.sync="dialogVisible"></yu-org-list>
  </div>
</template>

<script>
import { getResource, getRescActs, getRoles, getResCHNDesc, getPrdOrgList } from '@/api/systemManage/resource';
export default {
  components: {
  },
  data () {
    return {
      dataUrl: getPrdOrgList(),
      baseParams: {},
      queryFields: [
        { label: '产品信息', name: 'prdCode', },
        { label: '机构信息', name: 'orgCode', }
      ],
      tableFields: [
        // { label: 'PKID', prop: 'pkId', sortable: true, resizable: true, hidden: true },
        // { label: '产品ID', prop: 'prdId', sortable: true, resizable: true, hidden: true },
        { label: '产品编号', prop: 'prdCode', sortable: true, resizable: true },
        { label: '产品名称', prop: 'prdName', sortable: true, resizable: true },
        { label: '机构号', prop: 'orgCode', sortable: true, resizable: true },
        { label: '机构名称', prop: 'orgName', sortable: true, resizable: true },
        // { label: '创建人', prop: 'createUser', sortable: true, resizable: true, hidden: true },
        // { label: '创建时间', prop: 'createTime', sortable: true, resizable: true, hidden: true },
        { label: '最后修改人', prop: 'lastUpdateUser', sortable: true, resizable: true },
        { label: '最后修改时间', prop: 'lastUpdateTime', sortable: true, resizable: true }
      ],
      dialogVisible: false
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
    getTreeDataFn () {
      getRoles({}).then(res => {
        if (res.code === '0') {
          this.roleTreeData = res.rows;
        }
      });
      getResCHNDesc({}).then(res => {
        if (res.code === '0') {
          console.log('res', res)
          let childrenArr = this.transTree(res.rows, '');
          this.rescTreeData = res.rows;
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
      if (pageType === 'xz') {
        this.resourceOper = {}
      } else {
        if (!this.$refs.rescActTable.selections[0].length) {
          this.$message({ message: '请先选择一条资源操作记录', type: 'warning' });
          return;
        }
        this.resourceOper = this.$refs.rescActTable.selections[0];
        this.resourceOper.rescDesc = this.$refs.refForm.formdata.rescDesc
      }
      this.isShowResOper = true;
      this.pageType = pageType;
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
