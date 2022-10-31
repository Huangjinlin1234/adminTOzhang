<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogView" :width="dialogWidth" :before-close="closeDialog">
    <el-xform ref="refForm" :form-fields="formFields" label-width="120" :form-data="formData">
      <el-button type="primary" @click="searchFn">查询</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
    </el-xform>
    <el-xtable ref="refTable" :data-url="dataUrl" :base-params="baseParams" :table-fields="tableFields" @row-click="rowClick">
      <slot></slot>
    </el-xtable>
    <template slot="footer">
      <el-button type="primary" @click="selectReturnFn">选取返回</el-button>
      <el-button @click="closeDialog">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'selectPage',
  props: {
    dialogView: {
      type: Boolean,
      default: false,
    },
    dialogTitle: {
      type: String,
      default: '',
    },
    dataUrl: {
      type: String,
      default: '',
    },
    baseParams: {
      type: Object,
      default: () => {
        return {}
      },
    },
    formData: {
      type: Object,
      default: () => {
        return {}
      },
    },
    formFields: {
      type: Array,
      default: () => {
        return []
      },
    },
    tableFields: {
      type: Array,
      default: () => {
        return []
      },
    },
    dialogWidth: {
      type: String,
      default: '60%',
    },
    btnFields: {
      type: Array,
      default: () => {
        return []
      },
    }
  },
  components: {},
  data () {
    return {
      tableData: [],
      selection: []
    }
  },
  created () { },
  mounted () {
  },
  methods: {
    closeDialog () {
      this.$emit('update:dialogView', false);
    },
    searchFn () {
      this.$refs.refTable.remoteData(this.$refs.refForm.formData)
    },
    remoteData (params) {
      this.$refs.refTable.remoteData(params || this.$refs.refForm.formData)
    },
    reset () {
      this.$emit('update:form-data', {})
      this.$refs.refTable.remoteData({})
    },
    selectReturnFn () {
      this.$emit('return-data', this.selection);
      this.closeDialog();
    },
    rowClick (row, column, event) {
      this.selection = [row];
    },
  },
}
</script>
