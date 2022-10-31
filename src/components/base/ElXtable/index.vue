<template>
  <div>
    <el-table ref="refTable" :data="tableData" @row-click="rowClick" highlight-current-row>
      <el-table-column label="序号" type="index" width="50"></el-table-column>
      <el-table-column v-for="(item,index) in tableFields" :key="index" :label="item.label" :property="item.prop" :width="item.width">
        <slot />
      </el-table-column>
    </el-table>
    <el-pagination :current-page="pageInfo.page" :page-sizes="[10, 20, 30, 50]" :page-size="pageInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name: 'ElXtable',
  props: {
    tableFields: {
      type: Array,
      default: () => {
        return []
      },
    },
    dataUrl: {
      type: String,
      default: '',
    },
    baseParams: {
      type: Object,
      default: () => {
        return {}
      },
    },
    otherParams: {
      type: Object,
      default: () => {
        return {}
      },
    },
    defaultLoad: {
      type: Boolean,
      default: true,
    },
    requestType: {
      type: String,
      default: 'post',
    },
  },
  data () {
    return {
      tableData: [],
      selection: [],
      pageInfo: {
        page: 1,
        size: 10
      },
      total: 0
    }
  },
  created () {
    if (this.defaultLoad) {
      this.remoteData()
    }
  },
  mounted () { },
  methods: {
    remoteData (params) {
      let data = params ? params : this.baseParams
      if (this.dataUrl) {
        request({
          url: this.dataUrl,
          method: this.requestType,
          data: { ...this.otherParams, ...this.pageInfo, ...data }
        }).then(res => {
          this.tableData = res.rows;
          this.total = res.total;
        }).catch(err => {
          console.log('err', err)
        })
      }
    },
    rowClick (row, column, event) {
      this.$emit('row-click', row, column, event)
    },
    handleCurrentChange (number) {
      this.pageInfo.page = number;
      this.remoteData();
    },
    handleSizeChange (size) {
      this.pageInfo.size = size;
      this.remoteData();
    }
  },
}
</script>
