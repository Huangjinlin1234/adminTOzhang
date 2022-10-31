<template>
  <select-page :dialog-view.sync="isShow" :dialog-title="dialogTitle" :dialog-width="dialogWidth" :data-url="dataUrl" :baseParams="baseParams" :form-fields="formFields" :table-fields="tableFields" @return-data="returnDataFn"></select-page>
</template>
<script>
import selectPage from '@/components/layout/selectPage'
export default {
  name: 'orgList',
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
      dataUrl: '/console/api/s/orgs/login/leage',
      baseParams: { page: 1, size: 10 },
      formFields: [
        { label: '机构代码', prop: 'orgCode' },
        { label: '机构名称', prop: 'orgName' },
      ],
      tableFields: [
        { label: '机构代码', prop: 'orgCode' },
        { label: '机构名称', prop: 'orgName' },
        { label: '机构层级', prop: 'orgLevel' },
        { label: '机构联系电话', prop: 'orgTel' },
        { label: '机构地址', prop: 'orgAddress' },
        { label: '机构邮编', prop: 'orgZipcode' },
      ],
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
