<template>
  <div class="ycb">
    <span>{{ checkboxLabel}}:</span>
    <el-checkbox-group v-model="checkedCities">
      <el-checkbox v-for="(item, index) in options" :label="item" :key="index">{{item}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  props: {
    checkboxLabel: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      checkedCities:[]
    }
  }
}
</script>

<style lang="scss" scoped>
.ycb {
  margin: 0 auto;
  display: flex;
  .el-checkbox-group {
    display: flex;
    flex-direction: column;
  }
}
</style>