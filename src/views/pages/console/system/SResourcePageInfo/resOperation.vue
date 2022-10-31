<template>
  <el-dialog :visible.sync="dialogView" :before-close="handleClose" v-loading="loading">
    <el-xform ref="refForm" v-model="formData" :form-fields="formFields" form-type="edit" label-width="140" :colspan="colspan"></el-xform>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addResOperationFn">保 存</el-button>
      <el-button @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
// import { addResOperation } from '@/api/systemManage/resource';
export default {
  name: 'resOperation',
  props: {
    dialogView: {
      type: Boolean,
      default: false
    },
    colspan: {
      type: Number,
      default: 2
    },
    pageType: {
      type: String,
      default: ''
    },
    formData: {
      type: Object,
      default: () => { }
    }
  },
  watch: {
    dialogView () {
      this.$nextTick(() => {
        // this.$refs.refForm.formdata = this.formData;
      })
    }
  },
  data () {
    return {
      loading: false,
      formFields: [
        { name: 'rescCode', label: '资源代码', disabled: true },
        { name: 'rescDesc', label: '资源中文描述', disabled: true },
        { name: 'funcId', label: '路由', disabled: true, rules: [{ max: 32, message: '最大长度为32' }] },
        {
          name: 'rescActCode', label: '资源操作码',
          rules: [{ required: true, message: '资源操作码是必填项', trigger: 'blur' }, { max: 32, message: '最大长度为32' }]
        },
        {
          name: 'rescActDesc', label: '资源操作中文描述',
          rules: [{ required: true, message: '资源操作中文描述是必填项', trigger: 'blur' }, { max: 80, message: '最大长度为80' }]
        },
        { name: 'createUser', label: '创建人', hidden: true },
        { name: 'createTime', label: '创建日期', hidden: true },
        { name: 'lastUpdateUser', label: '最后修改人', hidden: true },
        { name: 'lastUpdateTime', label: '最后修改时间', hidden: true }
      ],
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:dialog-view', false);
    },
    addResOperationFn () {
      let flag = false;
      this.$refs.refForm.validate((vali) => {
        flag = vali;
      });
      if (!flag) return;
      this.loading = true;
      let rMethod = '';
      if (this.pageType == 'xg') {
        rMethod = 'PUT';
      } else if (this.pageType == 'xz') {
        rMethod = 'POST';
      }
      // addResOperation(rMethod, this.$refs.refForm.formdata).then(res => {
      //   this.loading = false;
      //   this.$message.success('操作成功');
      //   this.handleClose();
      //   this.$emit('update-Table')
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
