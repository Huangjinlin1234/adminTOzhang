<template>
  <div class="yform-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item v-for="(item,index) in yformFileds" :key="index" :label="item.label" :prop="item.prop">
        <template v-if="item.ctype==='input'">
          <el-input v-model="formInline[item.prop]" placeholder="审批人" />
        </template>
        <template v-if="item.ctype==='select'">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </template>
        <template v-if="item.ctype==='date'">
          <el-date-picker v-model="formInline[item.prop]" type="date" placeholder="选择日期"></el-date-picker>
          <!-- <el-input v-model="formInline[item.prop]" placeholder="审批人" /> -->
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    yformFileds: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.yform-container{
  padding: 10px;
}
</style>