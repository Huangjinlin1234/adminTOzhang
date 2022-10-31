<template>
  <el-xpanel panel-title="报表权限管理">
    <template slot="content">
      <list-page ref="refList" :form-fields="formFields" :table-fields="tableFields" :btn-fields="btnFields" :data-url="dataUrl" :base-params="baseParams" :form-data.sync="formData"></list-page>
      <prd-list :dialog-view.sync="dialogView1" @return-data="returnPrd" :type="openFlag"></prd-list>
      <org-list :dialog-view.sync="dialogView2" @return-data="returnOrg" :type="openFlag"></org-list>
      <guide-page ref="refGuide" :dialog-view.sync="dialogView3" :form-fields="dFormFields" :form-data="dFormData" :btn-fields="dBtnFields"></guide-page>
    </template>
  </el-xpanel>
</template>

<script>
import { getResource, getPrdOrgList, setProOrg } from '@/api/systemManage/resource';
import listPage from '@/components/layout/listPage'
import prdList from '@/components/busi/prdList'
import orgList from '@/components/busi/orgList'
import guidePage from '@/components/layout/guidePage'
export default {
  components: { listPage, prdList, orgList, guidePage },
  data () {
    return {
      dataUrl: getPrdOrgList(),
      baseParams: {},
      formFields: [
        { label: '产品信息', prop: 'prdName', icon: 'el-icon-search', iconClick: () => { this.openDialog('prd1') } },
        { label: '机构信息', prop: 'orgName', icon: 'el-icon-search', iconClick: () => { this.openDialog('org1') } }
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
      btnFields: [
        { label: '新增', click: () => { this.openDialog('guide') } },
        { label: '删除', click: this.ttt }
      ],
      dFormFields: [
        { label: '产品编号', prop: 'prdCode', icon: 'el-icon-search', iconClick: () => { this.openDialog('prd2') } },
        { label: '产品名称', prop: 'prdName', disabled: true },
        { label: '机构编号', prop: 'orgCode', icon: 'el-icon-search', iconClick: () => { this.openDialog('org2') } },
        { label: '机构名称', prop: 'orgName', disabled: true }
      ],
      dBtnFields: [
        { label: '保存', type: 'primary', click: this.nextStep },
        { label: '取消', etype: 'cancel' }
      ],
      dFormData: {},
      dialogView1: false,
      dialogView2: false,
      dialogView3: false,
      openFlag: '',
      formData: {}
    };
  },
  methods: {
    ttt () {
      console.log("ttt::: ", 'ttt');
    },

    openDialog (flag) {
      if (flag === 'prd1') {
        this.dialogView1 = true;
      } else if (flag === 'prd2') {
        this.dialogView1 = true;
      } else if (flag === 'org1') {
        this.dialogView2 = true;
      } else if (flag === 'org2') {
        this.dialogView2 = true;
      } else if (flag === 'guide') {
        this.dialogView3 = true;
      }
      this.openFlag = flag;
    },
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
    returnDataFn () {

    },
    nextStep () {
      setProOrg('POST', this.dFormData).then(_ => {
        this.$refs.refList.searchFn()
      })
    },
    returnPrd (row, flag) {
      let { prdCode, prdName } = row
      if (flag === 'prd1') {
        this.formData = { ...this.formData, prdCode, prdName }
      } else if (flag === 'prd2') {
        this.dFormData = { ...this.dFormData, prdCode, prdName }
      }
    },
    returnOrg (row, flag) {
      let { orgCode, orgName } = row
      if (flag === 'org1') {
        this.formData = { ...this.formData, orgCode, orgName }
      } else if (flag === 'org2') {
        this.dFormData = { ...this.dFormData, orgCode, orgName }
      }
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
