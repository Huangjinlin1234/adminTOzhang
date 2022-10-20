<template>
  <div class="form-table">
    <el-panel :panel-title="pageOptions.title">
      <template slot="rightButton">
        <slot name="button" />
      </template>
      <template slot="form">
        <el-form ref="refSearchForm" label-suffix="：" :model="searchFormdata" label-width="120px" inline>
          <el-form-item v-for="(item,index) in pageOptions.formFileds" :key="index" :label="item.label" :ctype="item.ctype" :placeholder="item.label" :name="item.name">
            <template v-if="item.ctype=='input'">
              <el-input v-model="item.prop" placeholder="请输入内容" />
            </template>

          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="resetForm ">重置</el-button>
          </el-form-item>
        </el-form>
      </template>
      <div slot="table" class="table-content">
        <el-table ref="refTable" row-number :data="tableData" @row-click="rowClick">
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column v-for="(ite,index) in pageOptions.tableFileds" :key="index" :label="ite.label">
            <template slot-scope="scope">
              <el-tag v-if="ite.ctype=='tag'" type="success">{{ scope.row.status }}</el-tag>
              <span v-else>{{ scope.row[ite.prop] }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </el-panel>
  </div>
</template>
<script>
import elPanel from './elPanel.vue';
export default {
  name: 'UserLog',
  components: { elPanel },
  props: {
    pageOptions: {
      type: Object,
      default: () => {
        return {
          title: '机构管理',
          dataUrl: '/api/s/users'
        };
      }
    }
  },
  data: function() {
    return {
      pkField: 'serno',
      dialogTitle: '新增',
      dialogVisible: false,
      formType: 'ADD',
      dataUrl: '/api/s/users',
      baseParams: {},
      deleteUrl: '/api/coopplanapp/delete/',
      searchFormdata: {},
      tableData: [
        {
          'roleCode': '111',
          'loginUserOrgCode': '00010',
          'loginUserOrgLocation': '00010',
          'userCode': '00063',
          'userName': '陈健坤',
          'nickName': '陈健坤',
          'orgCode': '00010',
          'orgName': '广州银行总行',
          'status': '1',
          'telPhone': '13112260613',
          'staffingLevel': '100',
          'createTime': '2021-04-25 00:00:00',
          'createUser': 'admin',
          'memo': 'eee',
          'lastUpdateUser': 'admin',
          'lastUpdateTime': '2022-10-10 10:56:48',
          'handleColtTaskCount': 0

        }
      ]
    };
  },
  created() {
  },
  methods: {
    rowClick() {
      const selections = this.$refs.refTable.selection;
      this.$emit('emitSelection', selections);
    },
    resetForm() {

    },
    onSubmit() {

    }

  }
};
</script>
<style lang="scss" scoped>
.form-table{
  .table-content{
    padding: 24px;
  }
}
</style>