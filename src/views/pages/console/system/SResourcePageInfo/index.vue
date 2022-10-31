<template>
  <el-xpanel panel-title="资源定义">
    <div slot="content">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-button-group class="mb18">
            <el-button icon="plus" @click="append" type="primary">新增</el-button>
            <el-button :icon="expandAll ? 'yx-menu4' : 'yx-menu3' " @click="transExpand" type="primary">{{ expandAll ? '收缩所有节点' : '展开所有节点' }} </el-button>
          </el-button-group>
          <el-xtree ref="refTree" :data-url="dataUrl" :default-props="defaultProps" @node-click="nodeClickFn"></el-xtree>
        </el-col>
        <el-col :span="17">
          <!-- 展示资源查看 -->
          <el-xform ref="refForm" :form-data="formData" :form-fields="formFields" :label-width="labelWidth" :colspan="2">
            <el-button type="primary" @click="save('xz')">保存</el-button>
            <el-button type="primary" @click="cancel('xg')">取消</el-button>
          </el-xform>
          <el-button-group class="mb8">
            <el-button v-for="(item,index) in btnFields" :key="index" @click="item.click" :type="item.type || 'primary'">{{ item.label }}</el-button>
          </el-button-group>
          <el-xtable ref="refTable" :data-url="dataUrl2" :base-params="{}" :table-fields="tableFields"></el-xtable>
        </el-col>
      </el-row>
      <add-resource :dialog-view.sync="isShowResource" :form-data="resource"></add-resource>
      <res-operation :dialog-view.sync="isShowResOper" :page-type="pageType" :form-data="resourceOper" @update-table="getTableDataFn" :colspan="2"></res-operation>
    </div>
  </el-xpanel>
</template>

<script>
import { getTreeData2, getRescActs, getResource, setResource } from '@/api/systemManage/resource';
import listPage from '@/components/layout/listPage'
import addResource from './addResource';
import resOperation from './resOperation'
export default {
  components: {
    listPage,
    addResource,
    resOperation
  },
  data () {
    return {
      formData: {},
      expandAll: false,
      treeData: [],
      defaultProps: {
        id: 'rescCode',
        pid: 'rescParentCode',
        label: 'rescDesc',
        children: 'children',
      },
      labelWidth: '120',
      data: [
        { "rescCode": "lp-70000", "rescDesc": "折扣活动", "rescParentCode": "" },
        { "rescCode": "lp-71000", "rescDesc": "人工检查", "rescParentCode": "lp-70000" },
        { "rescCode": "lp-79901", "rescDesc": "用户日志", "rescParentCode": "lp-70000" },
        { "rescCode": "lp-80001", "rescDesc": "台账报表", "rescParentCode": "lp-70000" }
      ],
      formFields: [
        { label: '资源代码', prop: 'rescCode', disabled: true, rules: [{ required: true, message: '资源代码是必填项', trigger: 'blur' }, { max: 32, message: '最大长度为32' }] },
        { label: '资源中文描述', prop: 'rescDesc', rules: [{ required: true, message: '资源中文描述是必填项', trigger: 'blur' }, { max: 80, message: '最大长度为80' }] },
        { label: '路由', prop: 'funcId', rules: [{ max: 32, message: '最大长度为32' }] },
        { label: '资源图标', prop: 'rescIcon', rules: [{ max: 60, message: '最大长度为60' }] },
        { label: '序号', prop: 'orderId', rules: [{ message: '序号必须为数字值' }] },
        { label: '资源URL', prop: 'rescUrl', colspan: "1", rules: [{ max: 254, message: '最大长度为254' }] },
        { label: '备注', prop: 'memo', colspan: "1", ctype: 'input', type: 'textarea', rules: [{ max: 100, message: '最大长度为100' }] }
      ],
      tableFields: [
        { label: '操作码', prop: 'rescActCode', resizable: true },
        { label: '路由', prop: 'funcId', resizable: true },
        { label: '操作码中文描述', prop: 'rescActDesc', width: 200, resizable: true }
      ],
      btnFields: [
        { label: '新增', name: 'add', click: () => { this.openType('xz') } },
        { label: '修改', name: 'modify', click: () => { this.openType('xz') } },
        { label: '删除', name: 'delete', click: this.deleteResOper },
        { label: '查看', name: 'view', click: () => { this.openType('xz') } },
      ],
      baseParams: {},
      dataUrl: getTreeData2(),
      dataUrl2: getRescActs(),
      pageType: '', // 资源操作信息页面类型,
      resource: {}, // 资源信息
      resourceOper: {}, // 资源操作信息
      isShowResource: false,
      isShowResOper: false
    };
  },
  mounted () {
  },
  methods: {
    save () {
      let _this = this
      console.log(_this.$refs.refTree, "_this.$refs.refTree::: ");
      setResource('PUT', this.formData).then(_ => {
        _this.$refs.refTree.remoteData();
      })
    },
    transExpand () {
      this.expandAll = !this.expandAll;
      let _this = this;
      let closeFn = function (obj) {
        let data = obj.childNodes;
        if (data && data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            // data[i].expanded = _this.expandAll;
            closeFn(data[i]);
          }
        }
      };
      // let data = this.$refs.refTree.root.childNodes;
      // if (data && data.length > 0) {
      //   for (let i = 0; i < data.length; i++) {
      //     // data[i].expanded = this.expandAll;
      //     closeFn(data[i]);
      //   }
      // }
    },
    getTableDataFn () {
      // this.$refs.refTable.remoteData();
    },
    nodeClickFn (row) {
      this.$refs.refTable.remoteData(row);
      getResource(row.rescCode).then(res => {
        if (res.code === '0') {
          this.formData = res.rows;
        }
      })
    },
    renderContent: function (h, obj) {
      let _this = this, data = obj.data, store = obj.store, node = obj.node;
      let btnArray = [{ name: '增加', callback: function () { _this.append(store, data, node) }, type: 'primary' },
      { name: '删除', type: 'warning', callback: function () { _this.remove(store, data, node) } }];
      return h('span', {}, [
        h('span', {}, [h('span', {}, node.label)]),
        h('span', { attrs: { style: 'float: right; margin-right: 20px', } }, btnArray.map(function (item) {
          return h('el-button', { props: { size: 'mini', type: item.type }, on: { click: item.callback } }, item.name);
        }))
      ]);
    },
    append (store, data, node) {
      console.log(store, data, node)
      this.isShowResource = true;
      if (data) {
        this.resource = { rescParentCode: data.rescCode, rescParentDesc: data.rescDesc };
      }
    },
    remove (store, data, node) {
      console.log(store, data, node)
      let childNodes = node.childNodes;
      if (childNodes.length > 0) {
        this.$message({ message: '当前资源拥有子节点不允许删除!', type: 'warning' });
        return;
      }
      let rescCode = node.data ? node.data.rescCode : node.rescCode;
      this.$confirm('是否删除?', '提示', { type: 'warning' }).then(() => {
        setResource('DELETE', { rescCode: rescCode + '' }).then(res => {
          if (res.code == 0) {
            node.parent.removeChild(node);
            //如果删除的当前form 表单的资源
            // if (rescCode == this.$refs.resourceform.formModel.rescCode) {
            //   this.$refs.resourceform.resetFn();
            //   this.$refs.refTable.remoteData();
            // }
            this.$message.success('操作成功!');
          } else {
            this.$message.warning('查询资源信息失败!');
          }
        })
      });
    },

    deleteResOper () {

    },
    openType (pageType) {
      console.log(1111, "1111::: ");
      if (pageType === 'xz') {
        this.resourceOper = {}
      } else {
        if (this.$refs.refTable && this.$refs.refTable.selections && this.$refs.refTable.selections.length) {
          this.resourceOper = this.$refs.refTable.selections[0];
          this.resourceOper.rescDesc = this.$refs.refForm.formdata.rescDesc
        } else {
          this.$message({ message: '请先选择一条资源操作记录', type: 'warning' });
          return;
        }
      }
      console.log(2222, "2222::: ");
      this.isShowResOper = true;
      this.pageType = pageType;
    },
    click () {

    }
  },
};
</script>

<style lang="scss" scoped>
.el-tree{
  position: relative;
  .el-button{
    position: absolute;
    right: 0;
    .hhh{
      background: red;
    }
  }
  .hhh{
    background: red;
  }
}
>>>.el-tree-node__content{
  .hhh{
    background: red;
  }
}

</style>
