<template>
  <div>
    <el-button type="primary" @click="openDialog"></el-button>
    <select-return :dialog-view.sync="dialogView" :dialog-title="dialogTitle" :dialog-width="dialogWidth" :form-fields="formFields" :table-fields="tableFields"></select-return>
  </div>
</template>
<script>
import selectReturn from '@/components/layout/selectReturn'
export default {
  name: 'first',
  props: {
  },
  components: { selectReturn },
  data () {
    return {
      dialogView: false,
      dialogTitle: '选择客户',
      dialogWidth: '400px',
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
