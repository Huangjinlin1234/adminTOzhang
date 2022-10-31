<template>
  <div class="form-table">
    <el-panel type="second" :panel-title="pageOptions.title">
      <template slot="secondLeft">
        <slot name="button" />
      </template>
      <template slot="form">
        <el-form ref="refSearchForm" label-suffix="：" :model="searchFormdata" label-width="120px">
          <el-row id="searchForm">
            <el-col v-for="(item,index) in pageOptions.formFileds" :key="index" :span="8">
              <el-form-item :label="item.label" :placeholder="item.label" :prop="item.name">
                <!--输入框 -->
                <template v-if="item.ctype=='input'">
                  <el-input v-model="searchFormdata[item.name]" placeholder="请输入内容" />
                </template>
                <!--单选框 -->
                <template v-if="item.ctype==='radio'">
                  <el-radio-group v-model="searchFormdata[item.prop]" :disabled="pageType=='DETAIL'">
                    <el-radio label="N">否</el-radio>
                    <el-radio label="Y">是</el-radio>
                  </el-radio-group>
                </template>
                <template v-if="item.ctype==='select'">
                  <el-select v-model="searchFormdata[item.prop]">
                    <el-option v-for="(ite,idx) in item.options" :key="idx" :label="ite.label" :value="ite.value" />
                  </el-select>
                </template>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <div class="search-btn">
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button @click="resetForm ">重置</el-button>
              </div>

            </el-col>

          </el-row>
        </el-form>
      </template>
      <div class="table-content">
        <el-table ref="refTable" row-number :data="tableData" :highlight-current-row="true" @row-click="rowClick">
          <el-table-column v-for="(ite,index) in pageOptions.tableFileds" :key="index" :label="ite.label">
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
      </div>

    </el-panel>
  </div>
</template>
<script>
import elPanel from './elPanel.vue';
import { getUserList } from '@/api/systemManage/userManage.js';
export default {
  name: 'UserLog',
  components: { elPanel },
  props: {
    baseParams: {
      type: Object,
      default: () => {
        return {};
      }
    },
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
      dialogTitle: '新增',
      dialogVisible: false,
      deleteUrl: '/api/coopplanapp/delete/',
      searchFormdata: {},
      tableData1: [],
      total: 20,
      pageInfo: {
        size: 10,
        page: 1
      },
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
          'dutyCode': '001',
          'dutyName': '岗位1',
          'telPhone': '13112260613',
          'staffingLevel': '100',
          'createTime': '2021-04-25 00:00:00',
          'createUser': 'admin',
          'memo': 'eee',
          'lastUpdateUser': 'admin',
          'lastUpdateTime': '2022-10-10 10:56:48',
          'handleColtTaskCount': 0
        },
        {
          'roleCode': '222',
          'loginUserOrgCode': '00010',
          'loginUserOrgLocation': '00010',
          'userCode': '00065',
          'userName': '李都',
          'nickName': '李都',
          'orgCode': '00010999',
          'orgName': '广州银行佛山分行',
          'status': '1',
          'dutyCode': '002',
          'dutyName': '岗位2',
          'telPhone': '13112260613',
          'staffingLevel': '100',
          'createTime': '2021-04-25 00:00:00',
          'createUser': 'admin',
          'memo': 'eee',
          'lastUpdateUser': 'admin',
          'lastUpdateTime': '2022-10-10 10:56:48',
          'handleColtTaskCount': 0
        },
        {
          'roleCode': '222',
          'loginUserOrgCode': '00010',
          'loginUserOrgLocation': '00010',
          'userCode': '00065',
          'userName': '黄曾',
          'nickName': '黄曾',
          'orgCode': '00010999',
          'orgName': '广州银行佛山分行',
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
    this.getTableData(this.searchFormdata);
  },
  methods: {
    getTableData(data) {
      getUserList({ ...data, ...this.pageInfo, ...this.baseParams }, this.pageOptions.dataUrl).then(res => {
        if (res.code === '0') {
          this.tableData = res.rows;
          this.total = res.total;
        }
      });
    },
    rowClick(row, column, event) {
      this.$emit('emitSelection', row);
    },
    resetForm() {
      this.$refs.refSearchForm.resetFields();
      this.getTableData();
    },
    onSubmit() {
      this.getTableData(this.searchFormdata);
    },
    handleCurrentChange(number) {
      this.pageInfo.page = number;
      this.getTableData(this.searchFormdata);
    },
    handleSizeChange(size) {
      this.pageInfo.size = size;
      this.getTableData(this.searchFormdata);
    }

  }
};
</script>
<style lang="scss" scoped>
.form-table{
  .table-content{
    padding:5px 24px;
  }
  .search-btn{
    text-align: center;
    padding-bottom: 23px;
  }
}
</style>