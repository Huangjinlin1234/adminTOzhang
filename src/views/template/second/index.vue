<template>
  <div class="container">
    <treeTabCollapse :page-options="pageOptions">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </treeTabCollapse>
  </div>
</template>

<script>
import treeTabCollapse from './treeTabCollapse.vue';
import treeData from '../first/treeData.js';

export default {
  components: { treeTabCollapse },
  data() {
    return {
      activeName: 'first',
      pageOptions: {
        defaultProps: {
          children: 'children',
          label: 'orgName'
        },
        treeData: treeData
      }
    };
  },
  methods: {
    handleClick($v) {
      console.log($v.name);
    }
  }
};
</script>
<style lang="scss" scoped>
.container{
  background-color: #ffff;
  padding: 24px;
  height: 100%;
}
</style>
