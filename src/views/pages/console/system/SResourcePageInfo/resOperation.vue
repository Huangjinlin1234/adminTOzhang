<template>
  <el-dialog :visible.sync="dialogView" :before-close="handleClose" v-loading="loading">
    <el-xform ref="refForm" :form-fields="formFields" :form-data="formData" form-type="edit" label-width="140" :colspan="colspan"></el-xform>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addResOperationFn">保 存</el-button>
      <el-button @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { setResOperation } from '@/api/systemManage/resource';
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
  data () {
    return {
      loading: false,
      formFields: [
        { label: '资源代码', prop: 'rescCode', disabled: true },
        { label: '资源中文描述', prop: 'rescDesc', disabled: true },
        { label: '路由', prop: 'funcId', disabled: true, rules: [{ max: 32, message: '最大长度为32' }] },
        {
          label: '资源操作码', prop: 'rescActCode',
          rules: [{ required: true, message: '资源操作码是必填项', trigger: 'blur' }, { max: 32, message: '最大长度为32' }]
        },
        {
          label: '资源操作中文描述', prop: 'rescActDesc',
          rules: [{ required: true, message: '资源操作中文描述是必填项', trigger: 'blur' }, { max: 80, message: '最大长度为80' }]
        },
        { label: '创建人', prop: 'createUser', hidden: true },
        { label: '创建日期', prop: 'createTime', hidden: true },
        { label: '最后修改人', prop: 'lastUpdateUser', hidden: true },
        { label: '最后修改时间', prop: 'lastUpdateTime', hidden: true }
      ],
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:dialog-view', false);
    },
    addResOperationFn () {
      let flag = false;
      this.$refs.refForm.$refs.refForm.validate((vali) => {
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
      setResOperation(rMethod, this.$refs.refForm.formData).then(res => {
        this.loading = false;
        this.$message.success('操作成功');
        this.handleClose();
        this.$emit('update-Table')
      }).catch(() => {
        this.loading = false;
        this.$message.warning('操作失败');
      })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
