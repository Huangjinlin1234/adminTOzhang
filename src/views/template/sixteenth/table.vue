<template>
  <div class="formTabel">
    <div class="panel-titile">
      <b>{{ tableTitle }}</b>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%" height="488">
        <el-table-column label="序号" type="index" align="center" />
        <el-table-column v-for="(item,index) in tableFileds" :key="index" :prop="item.prop" :label="item.label" width="180" align="center" />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableTitle: {
      type: String,
      default: '房产信息'
    },
    searchUrl: {
      type: String,
      default: ''
    },
    tableFileds: {
      type: Array,
      default: () => {
        return [
          { label: '房产类型', prop: 'borrrowNo' },
          { label: '房产地址', prop: 'borrrowNo' },
          { label: '详细地址', prop: 'borrrowNo' },
          { label: '房产面积（m²）', prop: 'borrrowNo' }
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
    };
  },
  created() {
  },
  methods: {
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
}
</style>