<template>
  <div class="formTabel">
    <el-form ref="refForm" :label-width="labelWidth" :label-suffix="labelSufix" :model="formData">
      <el-row>
        <el-col v-for="(item,index) in yformFileds" :key="index" :span="24/formColum">
          <el-form-item :label="item.label" :prop="item.prop">
            <!--输入框 -->
            <template v-if="item.ctype==='input'">
              <el-input v-model="formData[item.prop]" :placeholder="item.placeholder">
                <i v-if="item.iconClick" slot="suffix" :class="item.suffixIcon" @click="item.iconClick" />
              </el-input>
            </template>
            <!--选择框 -->
            <template v-if="item.ctype==='select'">
              <el-select v-model="formData[item.prop]" :placeholder="item.placeholder" @change="item.change">
                <el-option v-for="(ite,idx) in item.options" :key="idx" :label="ite.value" :value="ite.key" />
              </el-select>
            </template>
            <!--日期框 -->
            <template v-if="item.ctype==='datepicker'">
              <el-date-picker
                v-model="formData[item.prop]"
                type="date"
                placeholder="选择日期"
              />
            </template>
            <!--单选框 -->
            <template v-if="item.ctype==='radio'">
              <el-radio-group v-model="formData[item.prop]" @change="item.click">
                <el-radio v-for="(ite,idx) in item.options" :key="idx" :label="ite.key">{{ ite.value }}</el-radio>
              </el-radio-group>
            </template>
            <!--文本输入框框 -->
            <template v-if="item.ctype==='textarea'">
              <el-input v-model="formData[item.prop]" type="textarea" :autosize="{ minRows: 5 }" />
            </template>
            <!--复选框 -->
            <template v-if="item.ctype==='checkbox'">
              <el-checkbox-group v-model="formData[item.prop]">
                <el-checkbox v-for="(ite,idx) in item.options" :key="idx" :label="ite.label" :name="ite.value" />
              </el-checkbox-group>
            </template>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button @click="reset">重置</el-button>
            <el-button type="primary" @click="searchFn">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="panel-titile">
      <b>{{ tableTitle }}</b>
    </div>
    <div class="button-content">
      <slot name="button" />
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index" />
        <el-table-column v-for="(item,index) in tableFileds" :key="index" :prop="item.prop" :label="item.label" width="180" />
      </el-table>
      <el-pagination
        :current-page="pageInfo.pageNumber"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    formColum: {
      type: Number,
      default: 3
    },
    tableTitle: {
      type: String,
      default: '风险台账列表'
    },
    searchUrl: {
      type: String,
      default: ''
    },
    labelSufix: {
      type: String,
      default: '：'
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
    labelWidth: {
      type: String,
      default: '120px'
    },
    yformFileds: {
      type: Array,
      default: () => {
        return [
          { label: '测试1', prop: '测试2', ctype: 'input' },
          { label: '测试1', prop: '测试2', ctype: 'input' },
          { label: '测试1', prop: '测试2', ctype: 'select' }
        ];
      }
    }
  },
  data() {
    return {
      formData: {},
      tableData: [{ borrrowNo: '11111' }, { borrrowNo: '11111' }, { borrrowNo: '11111' }, { borrrowNo: '11111' }, { borrrowNo: '11111' }, { borrrowNo: '11111' }, { borrrowNo: '22222' }, { borrrowNo: '3333333' }, { borrrowNo: '3333333' }, { borrrowNo: '3333333' }, { borrrowNo: '3333333' }, { borrrowNo: '3333333' }, { borrrowNo: '3333333' }, { borrrowNo: '3333333' }],
      currentPage: 1,
      total: 20,
      pageInfo: {
        pageSize: 10,
        pageNumber: 1
      }
    };
  },
  created() {
    this.total = this.tableData.length;
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
    },
    handleCurrentChange(number) {
      console.log(number);
      this.pageInfo.pageNumber = number;
    },
    handleSizeChange(size) {
      console.log(size);
      this.pageInfo.pageNumber = size;
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