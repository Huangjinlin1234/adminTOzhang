<template>
  <el-select v-model="value" placeholder="请选择">
    <template>
      ddd
    </template>
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      value: ''
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