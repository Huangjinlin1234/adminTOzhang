<template>
  <div class="formTabel">
    <el-row>
      <el-col :span="20">
        <el-form ref="refForm" :inline="true" :model="formData" class="demo-form-inline">
          <el-form-item v-for="(item,index) in yformFileds" :key="index" :label="item.label" :prop="item.prop">
            <template v-if="item.ctype==='input'">
              <el-input v-model="formData[item.prop]" placeholder="审批人" />
            </template>
            <template v-if="item.ctype==='select'">
              <el-select v-model="formData.region" placeholder="活动区域">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </template>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="4">
        <div class="search-btn">
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" @click="searchFn">查询</el-button>
        </div>

      </el-col>
    </el-row>
    <div class="panel-titile">
      <b>风险台账</b>
    </div>
    <div class="button-content">
      <slot name="button" />
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column v-for="(item,index) in tableFileds" :key="index" :prop="item.prop" :label="item.label" width="180" />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    searchUrl: {
      type: String,
      default: ''
    },
    tableFileds: {
      type: Array,
      default: () => {
        return [
          { label: '借据编号', prop: 'borrrowNo' },
          { label: '借据编号', prop: 'borrrowNo' },
          { label: '借据编号', prop: 'borrrowNo' },
          { label: '借据编号', prop: 'borrrowNo' },
          { label: '借据编号', prop: 'borrrowNo' },
          { label: '借据编号', prop: 'borrrowNo' },
          { label: '借据编号', prop: 'borrrowNo' },
          { label: '借据编号', prop: 'borrrowNo' },
          { label: '借据编号', prop: 'borrrowNo' },
          { label: '借据编号', prop: 'borrrowNo' },
          { label: '借据编号', prop: 'borrrowNo' },
          { label: '借据编号', prop: 'borrrowNo' },
          { label: '借据编号', prop: 'borrrowNo' },
          { label: '借据编号', prop: 'borrrowNo' }
        ];
      }
    },

    yformFileds: {
      type: Array,
      default: () => {
        return [
          { label: '测试1', prop: '测试2', ctype: 'input' },
          { label: '测试1', prop: '测试2', ctype: 'input' },
          { label: '测试1', prop: '测试2', ctype: 'input' },
          { label: '测试1', prop: '测试2', ctype: 'input' }
        ];
      }
    }
  },
  data() {
    return {
      formData: {},
      tableData: []
    };
  },
  methods: {
    searchFn() {
      this.$request({
        url: this.searchUrl,
        methods: 'POST',
        data: this.formData
      }).then(res => {
        console.log(res);
      });
    },
    reset() {
      this.$refs.refForm.resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.formTabel{
  padding: 24px;
  background-color: #ffff;
  .search-btn{
    text-align: right;
  }
  .panel-titile{
    font-size: 16px;
    margin: 10px 0px;
  }
  .button-content{
    text-align: right;
    margin: 10px 0px;
  }
}
</style>