<template>
  <el-xpanel panel-title="报表权限管理">
    <template slot="content">
      <list-page :form-fields="formFields" :table-fields="tableFields" :btn-fields="btnFields"></list-page>
      <!-- <div class="role-container">
          <el-form ref="refForm" form-type="search" v-model="searchFormdata" label-width="120px" related-table-name="reftable" :custom-search-fn="customSearch" inline>
            <el-form-item v-for="(item,index) in formFields" :key="index" :label="item.label" :ctype="item.ctype" :placeholder="item.label" :name="item.name">
              <template v-if="!item.ctype || item.ctype=='input'">
                <el-input v-model="item.prop" placeholder="请输入内容" />
              </template>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查询</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </el-form>
          <el-button-group class="mb18">
            <el-button type="primary" icon="plus" @click="openType('xz')">新增</el-button>
            <el-button type="primary" icon="delete" @click="openType('sc')">删除</el-button>
          </el-button-group>
          <el-table ref="rescActTable" :data-url="dataUrl" :base-params="baseParams" request-type="POST" :defauld-load="false" :pageable="false" json-data="rows">
            <el-table-column v-for="(item, index) in tableFields" :key="index" :label="item.label" :prop="item.prop"></el-table-column>
          </el-table>
          <el-org-list :dialog-visible.sync="dialogVisible2"></el-org-list>
        </div> -->
    </template>
  </el-xpanel>
</template>

<script>
import { getResource, setResource, getRoles, getResCHNDesc, getPrdOrgList } from '@/api/systemManage/resource';
// import elPanel from '@/views/pages/console/common/elPanel.vue';
import listPage from '@/components/layout/listPage'
export default {
  components: { listPage },
  data () {
    let _this = this;
    return {
      dataUrl: getPrdOrgList(),
      baseParams: {},
      formFields: [
        { label: '产品信息', name: 'prdCode', icon: 'search', click: this.selProduct },
        { label: '机构信息', name: 'orgCode', icon: 'search', click: this.selOrg }
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
      btnFields: [],
      dialogVisible1: false,
      dialogVisible2: false,
    };
  },
  created () {
    // this.getTreeDataFn();
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
          this.transTree(res.rows, '');
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
      let _this = this, data = obj.data, store = obj.store, node = obj.node;
      let btnArray = [{ name: '增加', callback: function () { _this.append(store, data, node) }, type: 'primary' },
      { name: '删除', type: 'warning', callback: function () { _this.remove(store, data, node) } }];
      return h('span', {}, [
        h('span', {}, [h('span', {}, node.label)]),
        h('span', { attrs: { style: 'float: right; margin-right: 20px' } }, btnArray.map(function (item) {
          return h('el-button', { props: { size: 'mini', type: item.type }, on: { click: item.callback } }, item.name);
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
    remove (store, data, node) {
      console.log('data=== ', store, data, node);
      // let childNodes = node.childNodes;
      // if (childNodes.length > 0) {
      //   vm.$message({ message: '当前资源拥有子节点不允许删除!', type: 'warning' });
      //   return;
      // }
      // let rescCode = node.data ? node.data.rescCode : node.rescCode;

      //   vm.$confirm('是否删除?', '提示', {
      //     type: 'warning'
      //   }).then(function () {
      //     let url = backend.consoleService + '/api/s/resource';
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
    },
    selProduct () {
      this.dialogVisible1 = true
    },
    selOrg () {
      this.dialogVisible2 = true
    }
  },
};
</script>

<style lang="scss" scoped>
.resource-container {
  .tree-content {
    height: 692px;
    overflow: auto;
  }
}
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
</style>
