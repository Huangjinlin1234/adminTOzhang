<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    @close="close"
  >
    <el-form :inline="true" :model="formData" class="demo-form-inline">
      <el-form-item v-for="(item,index) in formFileds" :key="index" label="审批人">
        <template v-if="item.ctype==='input'">
          <el-input v-model="formData.user" placeholder="审批人" />
        </template>
        <template v-if="item.ctype==='select'">
          <el-select v-model="formData.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </template>
        <template v-if="item.ctype==='datepicker'">
          <el-date-picker
            v-model="formData.time"
            type="date"
            placeholder="选择日期"
          />
        </template>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="primary" @click="save">提交</el-button>
      <el-button type="primary" @click="close">返回</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '信息录入'
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
    }
  },
  data() {
    return {
      formData: {}
    };
  },
  methods: {
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

<style>

</style>