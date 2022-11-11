<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogView" :width="dialogWidth" :before-close="closeDialog">
    <el-xtable ref="refTable" :table-data="tableData" :table-fields="tableFields">
      <slot></slot>
    </el-xtable>
    <el-pagination
      :current-page="pageInfo.pageNumber"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-button @click="closeDialog">返回</el-button>
  </el-dialog>
</template>

<script>
export default {
  name: 'selectPage',
  props: {
    dialogView: {
      type: Boolean,
      default: false,
    },
    dialogTitle: {
      type: String,
      default: '',
    },
    // tableData: {
    //   type: Array,
    //   default: () => {
    //     return []
    //   },
    // },
    tableFields: {
      type: Array,
      default: () => {
        return []
      },
    },
    dialogWidth: {
      type: String,
      default: '60%',
    },
    btnFields: {
      type: Array,
      default: () => {
        return []
      },
    }
  },
  components: {},
  data () {
    return {
      tableData: [],
      currentPage: 1,
      total: 20,
      pageInfo: {
        pageSize: 10,
        pageNumber: 1
      }
    }
  },
  created () {
    this.total = this.tableData.length;
  },
  mounted () {
    console.log("fff::: ", this.tableFields);
  },
  methods: {
    closeDialog () {
      this.$emit('update:dialogView', false);
    },
    handleCurrentChange(number) {
      console.log(number);
      this.pageInfo.pageNumber = number;
    },
    handleSizeChange(size) {
      console.log(size);
      this.pageInfo.pageNumber = size;
    }
  },
}
</script>
