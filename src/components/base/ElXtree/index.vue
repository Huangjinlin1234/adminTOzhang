<template>
  <div class="el-xtree">
    <el-input v-if="isShowSearch" v-model="filterText" placeholder="请输入" :limit-char="limitChar" class="mb18" />
    <el-tree ref="refTree" :node-key="defaultProps.id" :data="treeData" :props="defaultProps" default-expand-all :filter-node-method="filterNode" @node-click="nodeClick" :render-content="renderContent" />
  </div>
</template>
<script>
import request from "@/utils/request";
export default {
  name: 'ElXtree',
  props: {
    dataUrl: {
      type: String,
      default: ''
    },
    baseParams: {
      type: Object,
      default: () => {
        return {}
      }
    },
    defaultLoad: {
      type: Boolean,
      default: true,
    },
    isShowSearch: {
      type: Boolean,
      default: true,
    },
    requestType: {
      type: String,
      default: 'post',
    },
    defaultProps: {
      type: Object,
      default: () => {
        return {
          id: '',
          pid: '',
          label: '',
          children: 'children',
        }
      }
    },
    limitChar: {
      type: String,
      default: ''
    },
    renderContent: {
      type: Function
    },
  },
  watch: {
    filterText (val) {
      this.$refs.refTree.filter(val);
    }
  },
  data () {
    return {
      filterText: '',
      treeData: [],
    };
  },
  created () {
    if (this.defaultLoad) {
      this.remoteData(this.baseParams)
    }
  },
  mounted () {
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true;
      return data[this.defaultProps.label].indexOf(value) !== -1;
    },
    nodeClick (data) {
      this.$emit('node-click', data)
    },
    remoteData (params) {
      if (this.dataUrl) {
        request({
          url: this.dataUrl,
          method: this.requestType,
          data: params || this.baseParams
        }).then(res => {
          this.treeData = res.rows;
          this.treeData = this.transTree(res.rows, this.defaultProps);
        }).catch(err => {
          console.log('err', err)
        })
      }
    },
    transTree (list, { id, pid, children }) {
      let treeData = [];
      list.forEach(item => {
        if (!item[pid]) {
          treeData.push(item);
        }
        const chi = list.filter(data => data[pid] === item[id]);
        if (!chi.length) { return };
        item[children] = chi;
      });
      return treeData;
    },
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
.el-xtree{
  .el-tree{
    .el-tree-node__content{
      position: relative;
      .el-button.el-button--primary:not{
        position: absolute;
        right: 0
      }
    }
  }
}


</style>
