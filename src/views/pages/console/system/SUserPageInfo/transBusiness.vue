<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    @open="initData"
  >
    <el-collapse v-model="activeNames">
      <el-collapse-item title="移交业务选择" name="1">
        <el-table ref="refTable" row-number :data="tableData" :highlight-current-row="true" @row-click="rowClick">
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
      </el-collapse-item>
      <el-collapse-item title="移交信息" name="2">
        <el-form :inline="true" :model="transForm" class="demo-form-inline">
          <el-form-item label="业务类型">
            <el-input v-model="transForm.user" placeholder="业务类型" />
          </el-form-item>
          <el-form-item label="业务号">
            <el-input v-model="transForm.user" placeholder="业务号" />
          </el-form-item>
          <el-form-item label="移交用户">
            <el-input v-model="transForm.user" placeholder="移交用户" />
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitFn">提交</el-button>
    </span>
  </el-dialog>

</template>

<script>
import { getUserList } from '@/api/systemManage/userManage.js';
export default {
  props: {
    userInfo: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      dataUrl: '/console/api/s/transfer',
      tableData: [],
      activeNames: ['1', '2'],
      currentPage: 1,
      total: 0,
      pageInfo: {
        size: 10,
        page: 1
      },
      tableFileds: [
        { label: '用户代码', prop: 'userCode', ctype: 'span' },
        { label: '业务类型', prop: 'userName', ctype: 'span' },
        { label: '业务号', prop: 'orgName', ctype: 'span' },
        { label: '移交状态', prop: 'telPhone', ctype: 'span' }
      ],
      transForm: {}
    };
  },
  methods: {
    initData() {
      this.getTableData({ userCode: this.userInfo.userCode });
    },
    getTableData(data) {
      getUserList({ ...data, ...this.pageInfo }, this.dataUrl).then(res => {
        if (res.code === '0') {
          this.tableData = res.rows;
          this.total = res.total;
        }
      });
    },
    handleCurrentChange(number) {
      this.pageInfo.page = number;
      this.getTableData(this.searchFormdata);
    },
    handleSizeChange(size) {
      this.pageInfo.size = size;
      this.getTableData(this.searchFormdata);
    },
    rowClick() {
      this.$$nextTick(() => {
      });
    },
    submitFn() {

    }
  }
};
</script>

<style>

</style>