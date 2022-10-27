<template>
  <el-dialog
    title="修改"
    :visible.sync="dialogVisible"
    :fullscreen="true"
    @close="closeFn"
    @open="initData"
  >
    <el-table ref="refTable" :data="tableData" :highlight-current-row="true">
      <el-table-column v-for="(ite,index) in tableFileds" :key="index" :label="ite.label">
        <template slot-scope="scope">
          <el-tag v-if="ite.ctype=='tag'" type="success">{{ scope.row.status }}</el-tag>
          <span v-else>{{ scope.row[ite.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="pageInfo.page"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pageInfo.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="backFn">返回</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { roleViewApi } from '@/api/systemManage/roleManage.js';
export default {
  props: {
    roleInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    tableDataUrl: {
      type: String,
      default: ''
    },
    tableFileds: {
      type: Array,
      default: () => {
        return [];
      }
    },
    baseParams: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      total: 0,
      pageInfo: {
        size: 10,
        page: 1
      }
    };
  },
  methods: {

    initData() {
      this.getTableData(this.baseParams);
    },
    getTableData(data) {
      roleViewApi({ ...data, ...this.pageInfo }, this.tableDataUrl).then(res => {
        if (res.code === '0') {
          this.tableData = res.rows;
          this.total = res.total;
        }
      });
    },
    closeFn() {

    },
    backFn() {
      this.dialogVisible = false;
    },
    handleCurrentChange(number) {
      this.pageInfo.page = number;
      this.getTableData();
    },
    handleSizeChange(size) {
      this.pageInfo.size = size;
      this.getTableData();
    }
  }
};
</script>

<style>
.el-dialog__footer{
  text-align: center;
}
</style>