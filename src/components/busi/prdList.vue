<template>
  <select-page :dialog-view.sync="isShow" :dialog-title="dialogTitle" :dialog-width="dialogWidth" :data-url="dataUrl" :baseParams="baseParams" :form-data.sync="formData" :form-fields="formFields" :table-fields="tableFields" @return-data="returnDataFn"></select-page>
</template>
<script>
import selectPage from '@/components/layout/selectPage'
export default {
  name: 'prdList',
  components: { selectPage },
  props: {
    dialogView: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  },
  watch: {
    dialogView (val) {
      if (val) {
        this.isShow = true;
      }
    },
    isShow (val) {
      if (!val) {
        this.closeDialog()
      }
    }
  },
  data () {
    return {
      isShow: false,
      dialogTitle: '产品列表',
      dialogWidth: '1000px',
      dataUrl: '/console/api/prd/queryPrdInfoSeletor',
      baseParams: { page: 1, size: 10 },
      formFields: [
        { label: '产品编号', prop: 'prdCode' },
        { label: '产品名称', prop: 'prdName' },
        { label: '渠道', prop: 'cooprName' },
        { label: '产品状态', prop: 'prdStatus' },
      ],
      tableFields: [
        { label: '产品编号', prop: 'prdCode' },
        { label: '产品名称', prop: 'prdName' },
        { label: '产品状态', prop: 'prdStatus' },
      ],
      formData: {}
    }
  },
  methods: {
    closeDialog () {
      this.$emit('update:dialogView', false);
    },
    returnDataFn (selection) {
      if (!selection.length) {
        this.$message.warning('请先选择一条数据！');
        return
      }
      this.$emit('return-data', selection[0], this.type);
    },
  },
}
</script>
