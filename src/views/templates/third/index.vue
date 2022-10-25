<template>
  <div>
    <el-button type="primary" @click="openDialog"></el-button>
    <select-page :dialog-view.sync="dialogView" :dialog-title="dialogTitle" :dialog-width="dialogWidth" :form-fields="formFields" :table-fields="tableFields"></select-page>
  </div>
</template>
<script>
import selectPage from '@/components/layout/selectPage'
export default {
  name: 'first',
  props: {
  },
  components: { selectPage },
  data () {
    return {
      dialogView: false,
      dialogTitle: '选择客户',
      dialogWidth: '1000px',
      formData: {},
      formFields: [
        { label: '客户编号', prop: 'custId' },
        { label: '客户名称', prop: 'custName' },
      ],
      tableFields: [
        { label: '客户编号', prop: 'custId' },
        { label: '客户名称', prop: 'custName' },
      ],
    }
  },
  created () { },
  mounted () { },
  methods: {
    openDialog () {
      this.dialogView = true;
    },
    closeDialog () {
      this.dialogView = false;
      // this.$emit('update:dialogView', false);
    },
    confirm () {
      console.log('确定')
    }
  },
}
</script>
