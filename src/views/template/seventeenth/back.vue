<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    @close="close"
  >
    <el-form ref="refform" :inline="true" :model="formData" label-suffix="：" :rules="rules" class="demo-form-inline">
      <el-form-item v-for="(item,index) in formFileds" :key="index" :label="item.label" :prop="item.prop">
        <!--输入框 -->
        <!-- <template v-if="item.ctype==='input'">
          <el-input v-model="formData[item.prop]" placeholder="审批人" />
        </template> -->
        <!--选择框 -->
        <template v-if="item.ctype==='select'">
          <el-select v-model="formData[item.prop]">
            <el-option v-for="(ite,idx) in item.options" :key="idx" :label="ite.label" :value="ite.value" />
          </el-select>
        </template>
        <!--日期框 -->
        <!-- <template v-if="item.ctype==='datepicker'">
          <el-date-picker
            v-model="formData[item.prop]"
            type="date"
            placeholder="选择日期"
          />
        </template> -->
        <!--单选框 -->
        <!-- <template v-if="item.ctype==='radio'">
          <el-radio-group v-model="formData[item.prop]">
            <el-radio v-for="(ite,idx) in item.options" :key="idx" :label="ite.label" />
          </el-radio-group>
        </template> -->
        <!--文本输入框框 -->
        <template v-if="item.ctype==='textarea'">
          <el-input v-model="formData[item.prop]" type="textarea" />
        </template>
        <!--复选框 -->
        <!-- <template v-if="item.ctype==='checkbox'">
          <el-checkbox-group v-model="formData[item.prop]">
            <el-checkbox v-for="(ite,idx) in item.options" :key="idx" :label="ite.label" :name="ite.value" />
          </el-checkbox-group>
        </template> -->
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">保存</el-button>
      <!-- <el-button type="primary" @click="save">提交</el-button> -->
      <el-button type="primary" @click="close">返回</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '进件退回'
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    formFileds: {
      type: Array,
      default: () => {
        return [];
      }
    },
    rules: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      formData: {
        type: []
      }
    };
  },
  methods: {
    // 表单校验方法
    validate() {
      let flag;
      this.$refs.refform.validate(valid => {
        flag = valid;
      });
      return flag;
    },
    resetFileds() {
      this.$refs.refform.resetFileds();
    },
    // 关闭弹窗
    close() {
      console.log(1111);
      this.$emit('update:dialogVisible', false);
    },
    // 保存
    save() {
      this.$emit('saveData', this.formData);
    }
  }
};
</script>

<style lang="scss" scoped>
  .demo-form-inline {
    .el-form-item {
      display: block;
    }
  }
</style>