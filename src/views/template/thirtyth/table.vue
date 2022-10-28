<template>
  <div class="formTabel">
    <div class="panel-titile">
      <b>{{ tableTitle }}</b>
    </div>
    <div class="button-content">
      <slot name="button" />
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%" height="488">
        <el-table-column label="序号" type="index" align="center" />
        <el-table-column v-for="(item,index) in tableFileds" :key="index" :prop="item.prop" :label="item.label" width="180" align="center" />
        <el-table-column label="操作" fixed="right" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              @click="deleteRow(scope.$index, tableData)"
              type="text"
              size="small">
              重新查询
            </el-button>
            <el-button
              @click="deleteRow(scope.$index, tableData)"
              type="text"
              size="small">
              查看征信报告
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination
        :current-page="pageInfo.pageNumber"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      /> -->
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
        ];
      }
    }
  },
  data() {
    return {
      formData: {},
      tableData: [
        { borrrowNo: '11111' }, 
        { borrrowNo: '11111' }, 
        { borrrowNo: '11111' }, 
        { borrrowNo: '11111' }, 
        { borrrowNo: '22222' }, 
        { borrrowNo: '3333333' },
        { borrrowNo: '11111' }, 
        { borrrowNo: '11111' }, 
        { borrrowNo: '11111' }, 
        { borrrowNo: '11111' }, 
        { borrrowNo: '22222' }, 
        { borrrowNo: '3333333' }
      ],
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
    deleteRow(index, rows) {
      rows.splice(index, 1);
    }
    // handleCurrentChange(number) {
    //   console.log(number);
    //   this.pageInfo.pageNumber = number;
    // },
    // handleSizeChange(size) {
    //   console.log(size);
    //   this.pageInfo.pageNumber = size;
    // }
  }
};
</script>
<style lang="scss" scoped>
.formTabel{
  // padding: 24px;
  background-color: #ffff;
  .panel-titile{
    font-size: 16px;
    margin: 10px 0px;
  }
  .button-content{
    text-align: left;
    margin: 10px 0px;
  }
}
</style>