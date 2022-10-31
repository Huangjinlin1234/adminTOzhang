<template>
  <el-dialog title="新增资源" :visible.sync="dialogView" :before-close="handleClose" v-loading="loading">
    <el-xform ref="refForm" :form-fields="formFields" label-width="120" :colspan="2"></el-xform>
    <span slot="footer">
      <el-button type="primary" @click="addResourceFn">保 存</el-button>
      <el-button @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
// import { setResource } from '@/api/systemManage/resource';
export default {
  name: 'addResource',
  props: {
    dialogView: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      loading: false,
      formFields: [
        { label: '资源代码', name: 'rescCode', disabled: true, rules: [{ required: true, message: '资源代码是必填项', trigger: 'blur' }, { max: 32, message: '最大长度为32' }] },
        { label: '资源中文描述', name: 'rescDesc', rules: [{ required: true, message: '资源中文描述是必填项', trigger: 'blur' }, { max: 80, message: '最大长度为80' }] },
        { label: '路由', name: 'funcId', rules: [{ max: 32, message: '最大长度为32' }] },
        { label: '资源图标', name: 'rescIcon', rules: [{ max: 60, message: '最大长度为60' }] },
        { label: '序号', name: 'orderId', rules: [{ message: '序号必须为数字值' }] },
        { label: '资源URL', name: 'rescUrl', colspan: "1", rules: [{ max: 254, message: '最大长度为254' }] },
        { label: '备注', name: 'memo', colspan: "1", ctype: 'input', type: 'textarea', rules: [{ max: 100, message: '最大长度为100' }] }
      ],
    }
  },
  watch: {
    dialogView () {
      this.$nextTick(() => {
        this.$refs.refForm.formdata = this.formData;
      })
    }
  },
  created () {
  },
  methods: {
    handleClose () {
      this.$emit('update:dialog-view', false);
    },
    addResourceFn () {
      let flag = false;
      this.$refs.refForm.validate((vali) => {
        flag = vali;
      });
      // console.log(flag, '==', this.$refs.refForm.formdata)
      if (!flag) return;
      this.loading = true;
      // setResource('POST', this.$refs.refForm.formdata).then(res => {
      //   this.loading = false;
      //   this.$message.success('操作成功');
      //   this.handleClose();
      //   this.$emit('update-Tree')
      // }).catch(() => {
      //   this.loading = false;
      //   this.$message.warning('操作失败');
      // })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
