<template>
  <div>
    <el-xform ref="refForm" :form-fields="formFields" :label-width="labelWidth" :form-data="formData">
      <el-button type="primary" @click="searchFn">查询</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
    </el-xform>
    <el-button-group v-if="btnFields && btnFields.length" class="mb8">
      <el-button v-for="(item,index) in btnFields" :key="index" @click="item.click" :type="item.type || 'primary'">{{ item.label }}</el-button>
    </el-button-group>
    <el-xtable ref="refTable" :table-data="tableData" :table-fields="tableFields" :data-url="dataUrl" :base-params="baseParams" :request-type="requestType" @row-click="rowClick">
      <slot></slot>
    </el-xtable>
  </div>
</template>

<script>
export default {
  name: 'listPage',
  props: {
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
    btnFields: {
      type: Array,
      default: () => {
        return []
      },
    },
    labelWidth: {
      type: String,
      default: '96',
    },
    requestType: {
      type: String,
    }
  },
  components: {},
  data () {
    return {
      tableData: [],
      selection: []
    }
  },
  methods: {
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
    rowClick (row, column, event) {
      this.selection = [row];
      this.$emit('row-click', row, column, event);
    },
  },
}
</script>
<style scoped>
.mb8{
  margin-bottom: 16px;
}
</style>
