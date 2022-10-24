<template>
  <div class="treeCollapse">

    <div class="tree-content">
      <el-tree :data="pageOptions.treeData" :props="pageOptions.defaultProps" @node-click="handleNodeClick" />
    </div>
    <el-collapse v-model="activeNames">
      <!--- 插槽放置自定义组件 -->
      <slot />
    </el-collapse>

  </div>
</template>

<script>

export default {
  props: {
    pageOptions: {
      type: Object,
      default: () => {
        return {
        };
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
}
.tree-content{
  min-width:210px;
  height: 100%;
  overflow: auto;
  .el-tree{
    overflow: auto;

  }
}

</style>