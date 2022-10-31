<template>
  <div class="formTabel">
    <el-row>
      <el-col :span="20">
        <el-form ref="refForm" :inline="true" :model="formData" class="demo-form-inline">
          <el-form-item v-for="(item,index) in yformFileds" :key="index" :prop="item.prop">
            <template v-if="item.ctype==='input'">
              <el-input v-model="formData[item.prop]" :placeholder="item.label" />
            </template>
            <template v-if="item.ctype==='select'">
              <el-select v-model="formData.region" :placeholder="item.label">
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
      <b>{{ tableTitle }}</b>
    </div>
    <div class="button-content">
      <slot name="button" />
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index" />
        <el-table-column v-for="(item,index) in tableFileds" :key="index" :prop="item.prop" :label="item.label" width="160" />
        <el-table-column label="操作" fixed="right" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              @click="deleteRow(scope.$index, tableData)"
              type="text"
              size="small">
              发起授信申请
            </el-button>
            <el-button
              @click="deleteRow(scope.$index, tableData)"
              type="text"
              size="small">
              发起业务申请
            </el-button>
          </template>
        </el-table-column>
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
    tableTitle: {
      type: String,
      default: '风险台账列表'
    },
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
      tableData: [{ borrrowNo: '11111' }, { borrrowNo: '11111' }, { borrrowNo: '11111' }],
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