<template>
  <select-page :dialog-view.sync="isShow" :dialog-title="dialogTitle" :dialog-width="dialogWidth" :data-url="dataUrl" :baseParams="baseParams" :form-fields="formFields" :table-fields="tableFields" @return-data="returnDataFn"></select-page>
</template>
<script>
import selectPage from '@/components/layout/selectPage'
export default {
  name: 'dataRuleList',
  components: { selectPage },
  props: {
    dialogView: {
      type: Boolean,
      default: false
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
      dialogTitle: '数据权限菜单',
      dialogWidth: '1000px',
      dataUrl: '/console/api/s/data/perss',
      baseParams: { page: 1, size: 10 },
      formFields: [
        { label: '菜单url', prop: 'dataPersId' },
        { label: '菜单描述', prop: 'dataPersDesc' },
      ],
      tableFields: [
        { label: '菜单url', prop: 'dataPersId' },
        { label: '菜单描述', prop: 'dataPersDesc' },
        { label: '前端资源菜单', prop: 'frontEndPage' },
      ],
      selection: []
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
      this.$emit('return-data', selection[0]);
    },
  },
}
</script>
