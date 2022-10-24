<template>
  <div class="container">
    <el-panel panel-title="资源定义">
      <template slot="rightButton">
        <slot name="button" />
      </template>
      <template slot="form">
      </template>
      <div slot="table" class="table-content">
        <div class="role-container">
          <el-row :gutter="20">
            <el-col :span="9">
              <el-button-group class="mb18">
                <el-button icon="plus" @click="append">新增</el-button>
                <el-button :icon="expandAll ? 'yx-menu4' : 'yx-menu3' " @click="transExpand">{{ expandAll ? '收缩所有节点' : '展开所有节点' }} </el-button>
              </el-button-group>
              <div class="tree-content">
                <el-tree ref="rescTree" :data="treeData" :props="defaultProps" node-key="rescCode" :render-content="renderContent" @node-click="nodeClickFn">
                </el-tree>
              </div>
            </el-col>
            <el-col :span="15">
              <!-- 展示资源查看 -->
              <el-form ref="refForm" label-width="120px" :hidden-rule="true" :disabled="disabled" v-model="formdata" form-type="edit" hidden-del-val>
                <el-form-group>
                  <el-form-item v-for="(item,index) in formFileds" :key="index" :label="item.label" :colspan="item.colspan" :ctype="item.ctype" :name="item.name"></el-form-item>
                </el-form-group>
              </el-form>
              <el-button-group class="mb18">
                <el-button type="primary" icon="plus" @click="openType('xz')">新增</el-button>
                <el-button type="primary" icon="edit" @click="openType('xg')">修改</el-button>
                <el-button type="primary" icon="delete" @click="deleteResOper">删除</el-button>
                <el-button type="primary" icon="yx-zoom-in" @click="openType('ck')">查看</el-button>
              </el-button-group>
              <el-table ref="rescActTable" :data-url="dataUrl" :base-params="baseParams" request-type="POST" :defauld-load="false" :pageable="false" json-data="rows">
                <el-table-column v-for="(item, index) in tableFields" :key="index" :label="item.label" :prop="item.prop"></el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <add-resource :dialog-visible.sync="isShowResource" :form-data="resource" @update-Tree="getTreeDataFn"></add-resource>
          <res-operation :dialog-visible.sync="isShowResOper" :page-type="pageType" :form-data="resourceOper" @update-table="getTableDataFn"></res-operation>
        </div>
      </div>
    </el-panel>
  </div>
</template>

<script>
import { getTreeData, getRescActs, getResource, setResource } from '@/api/systemManage/resource';
import addResource from './addResource';
import resOperation from './resOperation'
import elPanel from '@/views/pages/console/common/elPanel.vue';
export default {
  components: {
    elPanel,
    addResource,
    resOperation
  },
  data () {
    return {
      expandAll: false,
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'rescDesc'
      },
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
      isShowResOper: false
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
      getTreeData({}).then(res => {
        if (res.code === '0') {
          let childrenArr = this.transTree(res.rows, '');
          this.treeData = childrenArr;
        }
      });
    },
    getTableDataFn () {
      this.$refs.rescActTable.remoteData();
    },
    nodeClickFn (row) {
      this.$refs.rescActTable.remoteData(row);
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
            //   this.$refs.rescActTable.remoteData();
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
      if (pageType === 'xz') {
        this.resourceOper = {}
      } else {
        if (!this.$refs.rescActTable.selections.length) {
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
