<template>
  <div class="treeCollapse">

    <div class="tree-content">
      <el-tree :data="pageOptions.treeData" :props="pageOptions.defaultProps" :node-key="nodeKeys" :default-expanded-keys="expandedKeys" @node-click="handleNodeClick" />
    </div>
    <div class="collapse-content">
      <el-collapse v-model="activeNames">
        <!--- 插槽放置自定义组件 -->
        <slot />
      </el-collapse>
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
      activeNames: ['1']

    };
  },
  created() {
    console.log(this.pageOptions, 'page');
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
.treeCollapse{
  display: flex;
  .collapse-content{
    width: 86%;
    flex: 1;
  }
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

</style>