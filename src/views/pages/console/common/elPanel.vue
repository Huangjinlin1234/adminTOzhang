<template>
  <div class="el-panel">
    <el-row class="top-content" type="flex" justify="space-between">
      <el-col :span="4">
        <b class="title">{{ panelTitle }}</b>
      </el-col>
      <el-col :span="20">
        <slot name="rightButton" />
        <el-button type="text" @click="openHight">高级查询<i :class="open?'el-icon-arrow-down':'el-icon-arrow-up'" /></el-button>
      </el-col>
    </el-row>
    <el-row v-show="open" class="form-content">
      <slot name="form" />
    </el-row>
    <slot name="table" />
  </div>
</template>

<script>
export default {
  props: {
    panelTitle: {
      type: String,
      default: '机构管理'
    }
  },
  data() {
    return {
      open: false
    };
  },
  methods: {
    openHight() {
      this.open = !this.open;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-panel{
 .top-content{
    height: 56px;
    padding: 10px 24px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ededed;
    .title{
      font-size: 16px;
      color: #444444;
    }
    .el-col.el-col-18{
      text-align: right;
    }
  }
  .form-content{
    padding: 22px 24px 0;
  }
}

</style>