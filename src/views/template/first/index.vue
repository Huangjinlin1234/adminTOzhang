<template>
  <div>
    <treeCollapse :page-options="pageOptions">
      <el-collapse-item v-for="(item,index) in collapseList" :key="index" :title="item.title" :name="item.name">
        <component :is="item.component" :yform-fileds="item.yformFileds" />
      </el-collapse-item>
    </treeCollapse>
  </div>
</template>

<script>
import treeCollapse from './treeCollapse.vue';
import yform from './yform.vue';
export default {
  components: { treeCollapse, yform },
  data() {
    return {
      pageOptions: {
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        treeData: [{
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
        }]

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
        { title: '两致性',
          name: '2',
          yformFileds: [
            { label: '贷款信息', prop: 'creditInfo', ctype: 'input' },
            { label: '贷款信息', prop: 'creditInfo', ctype: 'input' },
            { label: '贷款信息', prop: 'creditInfo', ctype: 'input' },
            { label: '贷款信息', prop: 'creditInfo', ctype: 'input' },
            { label: '贷款信息', prop: 'creditInfo', ctype: 'input' },
            { label: '贷款信息', prop: 'creditInfo', ctype: 'input' }
          ]
        },
        { title: 'dds', name: '3' }
      ]
    };
  }
};
</script>

<style>

</style>