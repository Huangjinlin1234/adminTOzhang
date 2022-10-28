<template>
  <div>
    <el-xform ref="refForm" :form-fields="formFields" :label-width="labelWidth">
      <el-button type="primary" @click="searchFn">查询</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
    </el-xform>
    <el-button-group v-if="btnFields && btnFields.length" class="mb8">
      <el-button v-for="(item,index) in btnFields" :key="index" @click="item.click" :type="item.type || 'primary'">{{ item.label }}</el-button>
    </el-button-group>
    <el-xtable ref="refTable" :table-data="tableData" :table-fields="tableFields">
      <slot></slot>
    </el-xtable>
  </div>
</template>

<script>
export default {
  name: 'listPage',
  props: {
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
  },
  components: {},
  data () {
    return {
      tableData: []
    }
  },
  created () { },
  mounted () {
  },
  methods: {
    searchFn () {
      this.$refs.refTable.remoteData(this.$refs.refForm.formData)
    },
    reset () {
      this.$refs.refForm.$refs.refForm.resetFields();
    },
  },
}
</script>
<style scoped>
.mb8{
  margin-bottom: 16px;
}
</style>
