<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    @close="close"
  >
    <el-form :inline="true" :model="formData" label-suffix="：" class="demo-form-inline">
      <el-form-item v-for="(item,index) in formFileds" :key="index" :label="item.label">
        <!--输入框 -->
        <template v-if="item.ctype==='input'">
          <el-input v-model="formData.user" placeholder="审批人" />
        </template>
        <!--选择框 -->
        <template v-if="item.ctype==='select'">
          <el-select v-model="formData.region">
            <el-option v-for="(ite,idx) in item.options" :key="idx" :label="ite.label" :value="ite.value" />
          </el-select>
        </template>
        <!--日期框 -->
        <template v-if="item.ctype==='datepicker'">
          <el-date-picker
            v-model="formData.time"
            type="date"
            placeholder="选择日期"
          />
        </template>
        <!--单选框 -->
        <template v-if="item.ctype==='radio'">
          <el-radio-group v-model="formData.resource">
            <el-radio v-for="(ite,idx) in item.options" :key="idx" :label="ite.label" />
          </el-radio-group>
        </template>
        <!--文本输入框框 -->
        <template v-if="item.ctype==='textarea'">
          <el-input v-model="formData.desc" type="textarea" />
        </template>
        <!--复选框 -->
        <template v-if="item.ctype==='checkbox'">
          <el-checkbox-group v-model="formData.type">
            <el-checkbox v-for="(ite,idx) in item.options" :key="idx" :label="ite.label" :name="ite.value" />

          </el-checkbox-group>
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
      formData: {
        type: []
      }
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