<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-tree :data="pageOptions.treeData" :props="pageOptions.defaultProps" @node-click="handleNodeClick" />
      </el-col>
      <el-col :span="20">
        <slot />
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
</style>