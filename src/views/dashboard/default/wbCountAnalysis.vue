<template>
  <!--
    @created by tangxun 2021-06-22 14:08:56
    @updated by 2021-06-22 14:08:56
    @updated by 2021-06-22 14:08:56
    @description 主页面
  -->
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="客户数量统计表" name="first">
        <el-table ref="refTable" :data="tableData1">
          <el-table-column label="主管客户经理" prop="managerIdName" />
          <el-table-column label="主管机构" prop="managerBrIdName" />
          <el-table-column label="当前管户融资户数" prop="totalCusCount" width="140" />
          <el-table-column label="公司类融资户数" prop="cusComCount" />
          <el-table-column label="小企业类融资户数" prop="smCusCount" width="140" />
          <el-table-column label="贷款客户数" prop="loanCount" />
          <el-table-column label="非贷款客户数" prop="ohterLoanCount" />
        </el-table>
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[15, 30, 50, 100]"
          :page-size="pageInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-tab-pane>
      <el-tab-pane label="信贷客户核心业绩统计表" name="second">
        <el-table ref="refTable" :data="tableData1">
          <el-table-column label="客户经理" prop="cusManagerName" />
          <el-table-column label="所属机构" prop="orgIdName" />
          <el-table-column label="客户编号" prop="cusId" />
          <el-table-column label="客户名称" prop="cusName" />
          <el-table-column label="贷款余额年日均" prop="dkyerj" />
          <el-table-column label="较上年末新增额" prop="jsnmxze" />
          <el-table-column label="存款余额年日均" prop="ckyerj" />
          <el-table-column label="较上年新增额" prop="jsnxze" />
          <el-table-column label="上日账户存款余额合计" prop="srzhckjehj" />
          <el-table-column label="当前账户存款余额" prop="dqzhckye" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="管理资产统计表" name="third">
        <el-table ref="refTable" :data="tableData1">
          <el-table-column label="主管客户经理" prop="managerId" />
          <el-table-column label="主管机构" prop="managerBrId" />
          <el-table-column label="管理资产户数" prop="normalCusCount" />
          <el-table-column label="管理资产笔数" prop="normalAccCount" />
          <el-table-column label="管理资产余额" prop="normalTotalBalance" />
          <el-table-column label="瑕疵资产户数" prop="flawCusCount" />
          <el-table-column label="瑕疵资产笔数" prop="flawAccCount" />
          <el-table-column label="瑕疵资产余额" prop="flawTotalBalance" />
          <el-table-column label="不良资产户数" prop="badCusCount" />
          <el-table-column label="不良资产笔数" prop="badAccCount" />
          <el-table-column label="不良资产余额" prop="badTotalBalance" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="不良资产统计表" name="fourth">
        <el-table ref="refTable" :data="tableData1">
          <el-table-column label="主管客户经理" prop="managerId" />
          <el-table-column label="主管机构" prop="managerBrId" />
          <el-table-column label="本月新增不良资产户数" prop="monthAddBadcusCount" />
          <el-table-column label="本月新增不良资产笔数" prop="monthAddBadaccCount" />
          <el-table-column label="本月新增不良资产余额" prop="monthAddBadtotalBalance" />
          <el-table-column label="本年度新增不良资产户数" prop="yearAddBadcusCount" />
          <el-table-column label="本年度新增不良资产笔数" prop="yearAddBadaccCount" />
          <el-table-column label="本年度新增不良资产余额" prop="yearAddBadtotalBalance" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  components: {},
  data: function() {
    return {
      activeName: 'first',
      url: {
        bizCusCountUrl: ' /api/batbizcuscount/',
        badassetsUrl: ' /api/batbizbadassets/',
        assetsAnalyse: '/api/batbizassetsanalyse/',
        xdhxTotalUrl: ' /api/accloan/dscms2sjzt/xdhxQueryTotalList/'
      },
      tableData1: [],
      pageInfo: {
        pageSize: 10,
        pageNumber: 1
      },
      currentPage: 0,
      total: 0
    };
  },
  methods: {
    handleSizeChange() {

    },
    handleCurrentChange() {
      this.currentPage = 4;
    }
  }
};
</script>
