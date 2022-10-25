<template>
  <div class="treeTabCollapse">
    <div class="tree-content">
      <el-tree :data="pageOptions.treeData" :props="pageOptions.defaultProps" :node-key="nodeKeys" :default-expanded-keys="expandedKeys" @node-click="handleNodeClick" />
    </div>
    <div class="tab-content">
      <slot />
    </div>
  </div>
</template>

<script>

export default {
  props: {
    nodeKeys: {
      type: String,
      default: 'orgCode'
    },
    pageOptions: {
      type: Object,
      default: () => {
        return {
        };
      }
    },
    expandedKeys: {
      type: Array,
      default: () => {
        return ['000000'];
      }
    }
  },
  data() {
    return {

    };
  },
  created() {
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
      this.$emit('nodeClickFn', data);
    }
  }
};
</script>

<style lang="scss" scoped>
>>>.el-collapse{
  margin-right: 10px;

}
.treeTabCollapse{
  display: flex;
  .tab-content{
    flex: 1;
  }
  .tree-content{
    height: 100%;
    min-width:210px;
    height: 100%;
    overflow: auto;
    .el-tree{
      overflow: auto;
    }
  }

}
</style>