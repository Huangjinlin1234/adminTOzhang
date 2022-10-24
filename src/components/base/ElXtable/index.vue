<template>
  <el-table ref="refTable" :data="tableData">
    <el-table-column v-for="(item,index) in tableFields" :key="index" :label="item.label" :property="item.prop" :width="item.width">
      <slot />
    </el-table-column>
  </el-table>
</template>

<script>
import request from "@/utils/request";
export default {
  name: 'ElXtable',
  props: {
    tableData: {
      type: Array,
      default: () => {
        return []
      },
    },
    tableFields: {
      type: Array,
      default: () => {
        return []
      },
    },
    dataUrl: {
      type: Array,
      default: () => {
        return []
      },
    },
    baseParams: {
      type: Array,
      default: () => {
        return []
      },
    },
    defaultLoad: {
      type: Boolean,
      default: true,
    },
    requestType: {
      type: String,
      default: 'get',
    },
  },
  components: {},
  data () {
    return {
    }
  },
  created () {
    this.init()
  },
  mounted () { },
  methods: {
    init () {
      this.remoteData()
    },
    remoteData (params) {
      if (this.defaultLoad && this.dataUrl) {
        request({
          url: this.dataUrl,
          method: this.requestType,
          data: params || this.baseParams
        }).then(res => {
          this.tableData = res.rows;
          console.log("res::: ", res);
        }).catch(err => {
          console.log('err', err)
        })
      }
    }
  },
}
</script>
