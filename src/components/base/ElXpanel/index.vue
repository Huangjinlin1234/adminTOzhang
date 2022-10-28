<template>
  <div class="el-panel">
    <el-row class="title-area" type="flex" justify="space-between">
      <el-col :span="4">
        <b class="title">{{ panelTitle }}</b>
      </el-col>
      <el-col :span="20">
        <slot name="func" />
        <el-button v-if="isShowHeight" type="text" @click="openHight">高级查询<i :class="open?'el-icon-arrow-up':'el-icon-arrow-down'" /></el-button>
      </el-col>
    </el-row>
    <el-row class="content-area">
      <slot v-show="open" name="searchForm" />
      <slot name="content" />
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ElXpanel',
  props: {
    panelTitle: {
      type: String,
      default: ''
    },
    isShowHeight: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      open: false
    };
  },
  methods: {
    openHight () {
      this.open = !this.open;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-panel{
  background-color: #ffff;
 .title-area{
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
  .content-area{
    padding: 16px 24px;
  }
}

</style>
