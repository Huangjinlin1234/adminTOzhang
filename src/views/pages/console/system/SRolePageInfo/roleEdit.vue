<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      size="large"
      :visible.sync="dialogVisible"
      @close="closeFn"
      @open="initData"
    >
      <el-form ref="refForm" v-model="formdata" label-width="120px">
        <el-form-item label="角色码" name="roleCode" ctype="input" :disabled="pageType=='DETAIL'" />
        <el-form-item label="角色名称" name="roleName" ctype="input" :disabled="pageType=='DETAIL'" />
        <el-form-item label="适用机构" name="orgCode" ctype="input" :disabled="pageType=='DETAIL'" />
        <el-form-item label="备注" name="roleRmk" ctype="input" type="textarea" :disabled="pageType=='DETAIL'" />
        <el-form-item label="创建日期" name="createTime" ctype="input" :hidden="pageType!=='DETAIL'" :disabled="pageType=='DETAIL'" />
        <el-form-item label="创建人" name="createUser" ctype="input" :hidden="pageType!=='DETAIL'" :disabled="pageType=='DETAIL'" />
        <el-form-item label="最后修改人" name="lastUpdateUser" ctype="input" :hidden="pageType!=='DETAIL'" :disabled="pageType=='DETAIL'" />
        <el-form-item label="最后修改时间" name="lastUpdateTime" ctype="input" :hidden="pageType!=='DETAIL'" :disabled="pageType=='DETAIL'" />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeFn">取 消</el-button>
        <el-button type="primary" @click="comfirmFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    roleInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    pageType: String
  },
  data() {
    return {
      formdata: { }
    };
  },
  computed: {
    dialogTitle() {
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
    initData() {
      this.$nextTick(() => {
        if (this.pageType !== 'ADD') {
          this.formdata = this.roleInfo;
          this.$refs.refForm.formdata = this.roleInfo;
        } else if (this.pageType == 'ADD') { // 新增清空表单数据
          this.$refs.refForm.formdata = {};
        }
      });
    },
    closeFn() {
      this.$emit('update:dialogVisible', false);
    },
    comfirmFn() {
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