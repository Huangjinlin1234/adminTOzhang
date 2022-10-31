<template>
  <div class="container">
    <el-xpanel panel-title="资源权限">
      <template slot="content">
        <el-row :gutter="20">
          <el-col :span="7">
            <el-xtree :data-url="dataUrl" @node-click="selectRoleFn" :default-props="roleProps"></el-xtree>
          </el-col>
          <el-col :span="10">
            <el-xtree :data-url="dataUrl2" @node-click="selectRescFn" :default-props="rescProps"></el-xtree>
          </el-col>
          <el-col :span="7">
            <el-checkbox-group v-model="rescRootData.roleRescRuleStrs">
              <el-checkbox v-for="item in options" :label="item.rescActDesc" :key="item.rescActCode">{{ item.rescActDesc }}</el-checkbox>
            </el-checkbox-group>
            <div style="margin-top: 36px;margin-left: 5px;text-align: center;">
              <el-button type="primary" @click="saveRoleRescRule">保存</el-button>
            </div>
          </el-col>
        </el-row>
      </template>
    </el-xpanel>
  </div>
</template>

<script>
import { getRootType, saveRescRoot } from '@/api/systemManage/resource';
import { getRescRule } from '@/api/systemManage/role';
import elPanel from '@/views/pages/console/common/elPanel.vue';
export default {
  components: { elPanel },
  data () {
    return {
      expandAll: false,
      dataUrl: '/console/api/s/queryRoleAll',
      dataUrl2: '/console/api/s/user/resc/data',
      roleTreeData: [],
      rescTreeData: [],
      defaultProps: {
        children: 'children',
        label: 'rescDesc'
      },
      roleProps: {
        id: 'roleCode',
        label: 'roleName',
        children: 'children',
      },
      rescProps: {
        id: 'rescCode',
        pid: 'rescParentCode',
        label: 'rescDesc',
        children: 'children',
      },
      roleRescRules: '',
      formFileds: [
        { prop: 'rescCode', label: '资源代码', disabled: true, rules: [{ required: true, message: '资源代码是必填项', trigger: 'blur' }, { max: 32, message: '最大长度为32' }] },
        { prop: 'rescDesc', label: '资源中文描述', rules: [{ required: true, message: '资源中文描述是必填项', trigger: 'blur' }, { max: 80, message: '最大长度为80' }] },
        { prop: 'funcId', label: '路由', rules: [{ max: 32, message: '最大长度为32' }] },
        { prop: 'rescIcon', label: '资源图标', rules: [{ max: 60, message: '最大长度为60' }] },
        { prop: 'orderId', label: '序号', rules: [{ message: '序号必须为数字值' }] },
        { prop: 'rescUrl', label: '资源URL', colspan: "24", rules: [{ max: 254, message: '最大长度为254' }] },
        { prop: 'memo', label: '备注', colspan: "24", type: 'textarea', rules: [{ max: 100, message: '最大长度为100' }] }
      ],
      tableFields: [
        { label: '操作码', prop: 'rescActCode', resizable: true },
        { label: '路由', prop: 'funcId', resizable: true },
        { label: '操作码中文描述', prop: 'rescActDesc', width: 200, resizable: true }
      ],
      baseParams: {},
      // dataUrl: getRescActs(),
      pageType: '', // 资源操作信息页面类型,
      resource: {}, // 资源信息
      resourceOper: {}, // 资源操作信息
      isShowResource: false,
      isShowResOper: false,
      // dataUrl: getResource(),
      rescRootData: {
        roleRescRuleStrs: ''
      },
      options: []
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
    getTableDataFn () {
      this.$refs.rescActTable.remoteData();
    },
    selectRoleFn (row) {
      this.rescRootData.roleCode = row.roleCode;
      getRescRule({ roleCode: row.roleCode, rescCode: this.rescRootData.rescCode }).then(res => {
        this.rescRootData.roleRescRuleStrs = res.rows;
      })
    },
    selectRescFn (row) {
      this.rescRootData.rescCode = row.rescCode;
      getRootType({ rescCode: row.rescCode }).then(res => {
        res.rows.forEach(el => {
          el.key = el.rescActDesc;
          el.value = el.rescActCode;
        });
        this.options = res.rows;
        getRescRule({ roleCode: this.rescRootData.roleCode, rescCode: this.rescRootData.rescCode }).then(res => {
          this.rescRootData.roleRescRuleStrs = res.rows;
        })
      })
    },
    renderContent: function (h, obj) {
      var _this = this, data = obj.data, store = obj.store, node = obj.node;
      var btnArray = [{ name: '增加', callback: function () { _this.append(store, data, node) }, type: 'primary' },
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
      //     elfp.service.request({
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
      if (!this.$refs.rescActTable.selection.length) {
        this.$message({ message: '请先选择一条资源操作记录', type: 'warning' });
        return;
      }
      this.isShowResOper = true;
      this.resourceOper = this.$refs.rescActTable.selections[0];
      this.resourceOper.rescDesc = this.$refs.refForm.formdata.rescDesc
    },
    saveRoleRescRule () {
      let roleRescRuleStrs = this.rescRootData.roleRescRuleStrs.join(',')
      saveRescRoot({ ...this.rescRootData, roleRescRuleStrs }).then(_ => {
        console.log(111111111, "33333333333333::: ");
      }).catch(err => {
        console.log(err, "err::: ");
      })
    },
    clickNode (data) {
      console.log("data::: ", data);

    }
  }
};
</script>

<style lang="scss" scoped>
.resource-container {
  .h56 {
    height: 56px;
  }
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
