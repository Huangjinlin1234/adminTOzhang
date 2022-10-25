<template>
  <div class="container">
    <treeCollapse :page-options="pageOptions">
      <el-collapse-item v-for="(item,index) in collapseList" :key="index" :title="item.title" :name="item.name">
        <component :is="item.component" :yform-fileds="item.yformFileds" />
      </el-collapse-item>
    </treeCollapse>
  </div>
</template>

<script>
import treeCollapse from './treeCollapse.vue';
import treeData from './treeData.js';
import yform from './yform.vue';
export default {
  components: { treeCollapse, yform },
  data() {
    return {
      pageOptions: {
        defaultProps: {
          children: 'children',
          label: 'orgName'
        },
        treeData: treeData
      },
      collapseList: [
        { title: '一致性',
          name: '1',
          component: yform,
          yformFileds: [
            { label: '任务编号', prop: 'taskNo', ctype: 'input' },
            { label: '检查类型', prop: 'checkType', ctype: 'select' },
            { label: '客户编号', prop: 'custNo', ctype: 'input' },
            { label: '经营实体名称', prop: 'saleBdyName', ctype: 'input' },
            { label: '统一信用代码', prop: 'taskNo', ctype: 'input' },
            { label: '法定代表人', prop: 'taskNo', ctype: 'input' }
          ] },
        { title: '两面性',
          name: '2',
          yformFileds: [
            { label: '贷款信息', prop: 'creditInfo', ctype: 'input' },
            { label: '贷款信息', prop: 'creditInfo', ctype: 'input' },
            { label: '贷款信息', prop: 'creditInfo', ctype: 'input' },
            { label: '贷款信息', prop: 'creditInfo', ctype: 'input' },
            { label: '贷款信息', prop: 'creditInfo', ctype: 'input' },
            { label: '贷款信息', prop: 'creditInfo', ctype: 'input' }
          ] },
        { title: '三个人', name: '3' }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.container{
  background-color: #ffff;
  height: 100%;
}
</style>