<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogView" :width="dialogWidth" :before-close="closeDialog">
    <el-xform ref="refForm" :form-fields="formFields" label-width="120" @icon-click="clickIconFn">
      <el-button type="primary" @click="searchFn">查询</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
    </el-xform>
    <el-xtable ref="refTable" :table-data="tableData" :table-fields="tableFields">
      <slot></slot>
    </el-xtable>
    <el-button type="primary" @click="selectReturnFn">选取返回</el-button>
    <el-button @click="closeDialog">取消</el-button>
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
    formFields: {
      type: Array,
      default: () => {
        return []
      },
    },
    // tableData: {
    //   type: Array,
    //   default: () => {
    //     return []
    //   },
    // },
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
      tableData: []
    }
  },
  created () { },
  mounted () {
    console.log("fff::: ", this.tableFields);
  },
  methods: {
    closeDialog () {
      this.$emit('update:dialogView', false);
    },
    searchFn () {
      this.$refs.refTable.remoteData(this.$refs.refForm.formData)
    },
    reset () {
      this.$refs.refForm.$refs.refForm.resetFields();
    },
    selectReturnFn () {
      this.$emit('selectData', { msg: 返回的数据 })
    },
    clickIconFn () {
    }
  },
}
</script>
