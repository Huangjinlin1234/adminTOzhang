<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-tree :data="pageOptions.treeData" :props="pageOptions.defaultProps" @node-click="handleNodeClick" />
      </el-col>
      <el-col :span="20">
        <el-collapse v-model="activeNames">
          <!--- 插槽放置自定义组件 -->
          <slot />
        </el-collapse>
      </el-col>
    </el-row>
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
</style>