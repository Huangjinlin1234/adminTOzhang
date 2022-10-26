<template>
  <div class="el-panel">
    <div v-if="type=='first'">
      <el-row class="top-content" type="flex" justify="space-between">
        <el-col :span="4">
          <b class="title">{{ panelTitle }}</b>
        </el-col>
        <el-col :span="20">
          <slot name="rightButton" />
          <el-button type="text" @click="openHight">高级查询<i :class="open?'el-icon-arrow-up':'el-icon-arrow-down'" /></el-button>
        </el-col>
      </el-row>

      <el-row v-show="open" class="form-content">
        <slot name="form" />
      </el-row>
      <slot name="table" />
    </div>
    <div v-if="type==='second'">
      <el-row class="top-content" type="flex" justify="space-between">
        <b class="title">{{ panelTitle }}</b>
      </el-row>
      <el-row class="form-content">
        <slot name="form" />
      </el-row>
      <div class="second-rbtn">
        <slot name="secondLeft" />
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
import { string } from 'clipboard';
export default {
  props: {
    panelTitle: {
      type: String,
      default: '机构管理'
    },
    type: {
      type: String,
      default: 'first'
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
  .second-rbtn{
    margin-left: 24px;
  }
}

</style>