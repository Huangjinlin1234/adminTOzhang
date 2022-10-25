<template>
  <div>
    <el-button @click="open">打开信息录入</el-button>
    <infoEnter :dialog-visible.sync="showDialog" :form-fileds="formFileds" @saveData="saveFn" />

  </div>
</template>

<script>
import infoEnter from './infoEnter';
export default {
  components: { infoEnter },
  data() {
    return {
      showDialog: false,
      formFileds: [
        { label: '任务编号', prop: 'taskNo', ctype: 'input' },
        { label: '认定状态', prop: 'taskNo', ctype: 'select' },
        { label: '日期', prop: 'taskNo', ctype: 'datepicker' },
        { label: '分类', prop: 'taskNo', ctype: 'radio', dataCode: 'user' },
        { label: '任务编号', prop: 'taskNo', ctype: 'textarea' },
        { label: '任务编号', prop: 'taskNo', ctype: 'checkbox' }
      ]
    };
  },
  methods: {
    open() {
      this.showDialog = !this.showDialog;
    },
    saveFn(data) {
      console.log(data, 'ddd');
    }
  }
};
</script>

<style>

</style>