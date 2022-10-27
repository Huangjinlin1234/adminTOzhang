<template>
  <div>
    <el-input v-model="input" placeholder="请输入" :limit-char="limitChar" class="mb18" />
    <el-tree ref="refTree" :node-key="defaultProps.id" :data="treeData" :props="defaultProps" default-expand-all @node-click="nodeClick" />
  </div>
</template>
<script>
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
    defaultProps: {
      type: Object,
      default: () => {
        return {
          id: 'id',
          label: 'label',
          children: 'children',
        }
      }
    },
    limitChar: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      input: '',
      treeData: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
    };
  },
  methods: {
    nodeClick (data) {
      this.$emit('node-click', data)
    }
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
</style>
