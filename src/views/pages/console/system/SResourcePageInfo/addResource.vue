<template>
  <yu-xdialog title="新增资源" :visible.sync="dialogVisible" :before-close="handleClose" v-loading="loading">
    <yu-xform ref="refForm" label-width="120px" :hidden-rule="true" form-type="edit" hidden-del-val>
      <yu-xform-group>
        <yu-xform-item v-for="(item,index) in formFileds" :key="index" :label="item.label" :name="item.name" :colspan="item.colspan" :ctype="item.ctype" :disabled="item.disabled"></yu-xform-item>
      </yu-xform-group>
    </yu-xform>
    <span slot="footer" class="dialog-footer">
      <yu-button type="primary" @click="addResourceFn">保 存</yu-button>
      <yu-button @click="handleClose">取 消</yu-button>
    </span>
  </yu-xdialog>
</template>
<script>
import { setResource } from '@/api/systemManage/resource';
export default {
  name: 'addResource',
  props: {
    dialogVisible: {
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
      formFileds: [
        { name: 'rescParentCode', label: '上级资源代码', disabled: true },
        { name: 'rescParentDesc', label: '上级资源中文描述', disabled: true },
        { name: 'rescCode', label: '资源代码', rules: [{ required: true, message: '资源代码是必填项', trigger: 'blur' }, { max: 32, message: '最大长度为32' }] },
        { name: 'rescDesc', label: '资源中文描述', rules: [{ required: true, message: '资源中文描述是必填项', trigger: 'blur' }, { max: 80, message: '最大长度为80' }] },
        { name: 'funcId', label: '路由', rules: [{ max: 32, message: '最大长度为32' }] },
        { name: 'rescIcon', label: '资源图标', rules: [{ max: 60, message: '最大长度为60' }] },
        { name: 'orderId', label: '序号', rules: [{ validator: yufp.validator.number, message: '序号必须为数字值' }] },
        { name: 'rescUrl', label: '资源URL', colspan: "24", rules: [{ max: 254, message: '最大长度为254' }] },
        { name: 'memo', label: '备注', colspan: "24", type: 'textarea', rules: [{ max: 100, message: '最大长度为100' }] }
      ],
    }
  },
  watch: {
    dialogVisible () {
      this.$nextTick(() => {
        this.$refs.refForm.formdata = this.formData;
      })
    }
  },
  created () {
  },
  methods: {
    handleClose () {
      this.$emit('update:dialog-visible', false);
    },
    addResourceFn () {
      let flag = false;
      this.$refs.refForm.validate((vali) => {
        flag = vali;
      });
      console.log(flag, '==', this.$refs.refForm.formdata)
      if (!flag) return;
      this.loading = true;
      setResource('POST', this.$refs.refForm.formdata).then(res => {
        this.loading = false;
        this.$message.success('操作成功');
        this.handleClose();
        this.$emit('update-Tree')
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
