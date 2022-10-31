<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogView" :width="dialogWidth" :before-close="closeDialog">
    <el-xform ref="refForm" :form-data="formData" :form-fields="formFields" label-width="120" :colspan="1"></el-xform>
    <template slot="footer">
      <span v-for="(item,index) in btnFields" :key="index">
        <el-button v-if="item.etype === 'reset'" type="primary" @click="reset">{{ item.label }}</el-button>
        <el-button v-else-if="item.etype === 'cancel'" @click="closeDialog">{{ item.label }}</el-button>
        <el-button v-else :type="item.type" @click="item.click">{{ item.label }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'guide',
  props: {
    dialogView: {
      type: Boolean,
      default: false,
    },
    dialogTitle: {
      type: String,
      default: '',
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
    dialogWidth: {
      type: String,
      default: '30%',
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
    }
  },
  created () { },
  mounted () { },
  methods: {
    submitForm () {
      this.refs['refForm'].validate(async (valid) => {
        if (valid) {
          this.$emit('submitForm')
        }
      })
    },
    closeDialog () {
      this.$emit('update:dialogView', false);
    },
    reset () {
      this.$refs.refForm.$refs.refForm.resetFields();
    },
    assign (data) {
      this.$emit('update:form-data', { ...this.formData, ...data });
    }
  },
}
</script>
