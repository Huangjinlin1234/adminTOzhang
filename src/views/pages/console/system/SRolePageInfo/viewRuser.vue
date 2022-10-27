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
    }
  },
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      tableFileds: [
        { label: '角色代码', prop: 'roleCode' },
        { label: '用户代码', prop: 'roleName' },
        { label: '用户姓名', prop: 'userName' },
        { label: '机构名称', prop: 'orgName' },
        { label: '联系电话', prop: 'telPhone' },
        { label: '性别', prop: 'sex' },
        { label: '状态', prop: 'status' }

      ],
      total: 0,
      pageInfo: {
        size: 10,
        page: 1
      }
    };
  },
  methods: {

    initData() {
      this.getTableData();
    },
    getTableData() {
      roleViewApi({ role: this.roleInfo.roleCode, ...this.pageInfo }).then(res => {
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