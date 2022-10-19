<template>
  <div>
    <yu-xdialog
      :title="dialogTitle"
      size="large"
      @close="closeFn"
      @open="initData"
      :visible.sync="dialogVisible"
     >
      <yu-xform ref="refForm" label-width="120px"  v-model="formdata">
        <yu-xform-group column="3">
          <yu-xform-item label="岗位代码" name="dutyCode" ctype="input" :disabled="pageType=='DETAIL'"></yu-xform-item>
          <yu-xform-item label="岗位名称" name="dutyName"  ctype="input"  :disabled="pageType=='DETAIL'"></yu-xform-item>
          <yu-xform-item label="适用机构" name="orgCode"  ctype="input"  :disabled="pageType=='DETAIL'"></yu-xform-item>
          <yu-xform-item label="排序字段" name="orderId"   ctype="input" :disabled="pageType=='DETAIL'"></yu-xform-item>
          <yu-xform-item label="状态" name="status" ctype="input"  :disabled="pageType=='DETAIL'"></yu-xform-item>
          <yu-xform-item label="创建人" name="createUser"  ctype="input"  :disabled="pageType=='DETAIL'"></yu-xform-item>
          <yu-xform-item label="最后修改人" name="lastUpdateUser"  ctype="input"  :disabled="pageType=='DETAIL'"></yu-xform-item>
          <yu-xform-item label="最后修改时间" name="lastUpdateTime"  ctype="input"  :disabled="pageType=='DETAIL'"></yu-xform-item>
        </yu-xform-group>
      </yu-xform>
      <div slot="footer" class="dialog-footer">
        <yu-button @click="closeFn">取 消</yu-button>
        <yu-button type="primary" @click="comfirmFn">确 定</yu-button>
      </div>
    </yu-xdialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dutyInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    pageType: String
  },
  data () {
    return {
      formdata: { }
    };
  },
  computed: {
    dialogTitle () {
      let title;
      if (this.pageType == 'ADD') {
        title = '新增';
      } else if (this.pageType == 'EDIT') {
        title = '修改';
      } else if (this.pageType == 'DETAIL') {
        title = '详情';
      }
      return title;
    }
  },
  methods: {
    initData () {
      this.$nextTick(() => {
        if (this.pageType !== 'ADD') {
          this.formdata = this.dutyInfo;
          this.$refs.refForm.formdata = this.dutyInfo;
        } else if (this.pageType == 'ADD') { // 新增清空表单数据
          this.$refs.refForm.formdata = {};
        }
      });
    },
    closeFn () {
      this.$emit('update:dialogVisible', false);
    },
    comfirmFn () {
    }
  }
};
</script>

<style lang="scss" scoped>
  .top-content{
    margin: 0 auto;
    width: 80%;
  }
</style>