<template>
  <el-select v-model="value" placeholder="请选择">
    <el-option hidden />
    <el-tree :data="data" :props="defaultProps" />
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      data: [{
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
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
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