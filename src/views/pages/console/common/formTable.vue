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
          <el-table-column v-for="(ite,index) in pageOptions.tableFileds" :key="index" :label="ite.label" :prop="ite.prop" />
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
      tableData: [],
      searchFormdata: {},
      tableData: [{ 'page': 1, 'size': 10, 'total': 809, 'loginUserId': 'admin', 'loginUserOrgCode': '00010', 'loginUserLeageOrgCode': null, 'loginUserOrgLocation': '00010', 'prdCodebyBaseInfo': null, 'dutyCodeStr': null, 'userCode': '00063', 'userName': '陈健坤', 'nickName': '陈健坤', 'legalOrgCode': null, 'legalOrgName': null, 'orgCode': '00010', 'orgName': '广州银行总行', 'userPwd': null, 'status': '1', 'birthday': '', 'telPhone': '13112260613', 'idCardNo': '', 'email': '', 'sex': '', 'staffingLevel': '100', 'age': null, 'createTime': '2021-04-25 00:00:00', 'createUser': 'admin', 'lastLoginTime': null, 'currPwdWrongNum': null, 'pwdValdaDate': '', 'eduLevel': '', 'memo': 'eee', 'lastUpdateUser': 'admin', 'lastUpdateTime': '2022-10-10 10:56:48', 'handleColtTaskCount': 0, 'rescRoleMap': null, 'isTeller': 'N', 'ownBranch': '水荫支行', 'isUseFingerprint': '', 'tellerLevel': '', 'tellerCategory': '', 'isInitPwd': 'N', 'isSyncUser': null, 'certType': null }, { 'page': 1, 'size': 10, 'total': 809, 'loginUserId': 'admin', 'loginUserOrgCode': '00010', 'loginUserLeageOrgCode': null, 'loginUserOrgLocation': '00010', 'prdCodebyBaseInfo': null, 'dutyCodeStr': null, 'userCode': '00169', 'userName': '彭淑君', 'nickName': '彭淑君', 'legalOrgCode': null, 'legalOrgName': null, 'orgCode': '00010', 'orgName': '广州银行总行', 'userPwd': null, 'status': '1', 'birthday': '', 'telPhone': '13926061288', 'idCardNo': '', 'email': '', 'sex': '', 'staffingLevel': '', 'age': null, 'createTime': '2021-04-25 00:00:00', 'createUser': 'admin', 'lastLoginTime': null, 'currPwdWrongNum': null, 'pwdValdaDate': '', 'eduLevel': '', 'memo': '', 'lastUpdateUser': 'admin', 'lastUpdateTime': '2021-04-25 00:00:00', 'handleColtTaskCount': 0, 'rescRoleMap': null, 'isTeller': 'N', 'ownBranch': '东华西支行', 'isUseFingerprint': '', 'tellerLevel': '', 'tellerCategory': '', 'isInitPwd': 'N', 'isSyncUser': null, 'certType': null }, { 'page': 1, 'size': 10, 'total': 809, 'loginUserId': 'admin', 'loginUserOrgCode': '00010', 'loginUserLeageOrgCode': null, 'loginUserOrgLocation': '00010', 'prdCodebyBaseInfo': null, 'dutyCodeStr': null, 'userCode': '00193', 'userName': '陈向华', 'nickName': '陈向华', 'legalOrgCode': null, 'legalOrgName': null, 'orgCode': '00010', 'orgName': '广州银行总行', 'userPwd': null, 'status': '0', 'birthday': '', 'telPhone': '13711411047', 'idCardNo': '', 'email': '', 'sex': '', 'staffingLevel': '', 'age': null, 'createTime': '2021-04-25 00:00:00', 'createUser': 'admin', 'lastLoginTime': null, 'currPwdWrongNum': null, 'pwdValdaDate': '', 'eduLevel': '', 'memo': '', 'lastUpdateUser': null, 'lastUpdateTime': '2022-03-16 15:16:41', 'handleColtTaskCount': 0, 'rescRoleMap': null, 'isTeller': 'Y', 'ownBranch': '福利支行', 'isUseFingerprint': '', 'tellerLevel': '', 'tellerCategory': '', 'isInitPwd': 'N', 'isSyncUser': null, 'certType': null }, { 'page': 1, 'size': 10, 'total': 809, 'loginUserId': 'admin', 'loginUserOrgCode': '00010', 'loginUserLeageOrgCode': null, 'loginUserOrgLocation': '00010', 'prdCodebyBaseInfo': null, 'dutyCodeStr': null, 'userCode': '00196', 'userName': '魏晓亮', 'nickName': '魏晓亮', 'legalOrgCode': null, 'legalOrgName': null, 'orgCode': '00010', 'orgName': '广州银行总行', 'userPwd': null, 'status': '1', 'birthday': '', 'telPhone': '', 'idCardNo': '', 'email': '', 'sex': '', 'staffingLevel': '', 'age': null, 'createTime': '2021-04-25 00:00:00', 'createUser': 'admin', 'lastLoginTime': null, 'currPwdWrongNum': null, 'pwdValdaDate': '', 'eduLevel': '', 'memo': '', 'lastUpdateUser': 'admin', 'lastUpdateTime': '2021-04-25 00:00:00', 'handleColtTaskCount': 0, 'rescRoleMap': null, 'isTeller': 'N', 'ownBranch': '芳草支行', 'isUseFingerprint': '', 'tellerLevel': '', 'tellerCategory': '', 'isInitPwd': 'N', 'isSyncUser': null, 'certType': null }, { 'page': 1, 'size': 10, 'total': 809, 'loginUserId': 'admin', 'loginUserOrgCode': '00010', 'loginUserLeageOrgCode': null, 'loginUserOrgLocation': '00010', 'prdCodebyBaseInfo': null, 'dutyCodeStr': null, 'userCode': '00238', 'userName': '王春林', 'nickName': '王春林', 'legalOrgCode': null, 'legalOrgName': null, 'orgCode': '00010', 'orgName': '广州银行总行', 'userPwd': null, 'status': '1', 'birthday': '', 'telPhone': '13570079000', 'idCardNo': '', 'email': '', 'sex': '', 'staffingLevel': '', 'age': null, 'createTime': '2021-04-25 00:00:00', 'createUser': 'admin', 'lastLoginTime': null, 'currPwdWrongNum': null, 'pwdValdaDate': '', 'eduLevel': '', 'memo': '', 'lastUpdateUser': 'admin', 'lastUpdateTime': '2021-04-25 00:00:00', 'handleColtTaskCount': 0, 'rescRoleMap': null, 'isTeller': 'N', 'ownBranch': '广州客村支行', 'isUseFingerprint': '', 'tellerLevel': '', 'tellerCategory': '', 'isInitPwd': 'N', 'isSyncUser': null, 'certType': null }, { 'page': 1, 'size': 10, 'total': 809, 'loginUserId': 'admin', 'loginUserOrgCode': '00010', 'loginUserLeageOrgCode': null, 'loginUserOrgLocation': '00010', 'prdCodebyBaseInfo': null, 'dutyCodeStr': null, 'userCode': '00262', 'userName': '文敏', 'nickName': '文敏', 'legalOrgCode': null, 'legalOrgName': null, 'orgCode': '00010', 'orgName': '广州银行总行', 'userPwd': null, 'status': '1', 'birthday': '', 'telPhone': '18620205599', 'idCardNo': '', 'email': '', 'sex': '', 'staffingLevel': '', 'age': null, 'createTime': '2021-04-25 00:00:00', 'createUser': 'admin', 'lastLoginTime': null, 'currPwdWrongNum': null, 'pwdValdaDate': '', 'eduLevel': '', 'memo': '', 'lastUpdateUser': 'admin', 'lastUpdateTime': '2021-04-25 00:00:00', 'handleColtTaskCount': 0, 'rescRoleMap': null, 'isTeller': 'N', 'ownBranch': '森保支行', 'isUseFingerprint': '', 'tellerLevel': '', 'tellerCategory': '', 'isInitPwd': 'N', 'isSyncUser': null, 'certType': null }, { 'page': 1, 'size': 10, 'total': 809, 'loginUserId': 'admin', 'loginUserOrgCode': '00010', 'loginUserLeageOrgCode': null, 'loginUserOrgLocation': '00010', 'prdCodebyBaseInfo': null, 'dutyCodeStr': null, 'userCode': '00284', 'userName': '冼志明', 'nickName': '冼志明', 'legalOrgCode': null, 'legalOrgName': null, 'orgCode': '00010', 'orgName': '广州银行总行', 'userPwd': null, 'status': '1', 'birthday': '', 'telPhone': '13602856423', 'idCardNo': '', 'email': '', 'sex': '', 'staffingLevel': '', 'age': null, 'createTime': '2021-04-25 00:00:00', 'createUser': 'admin', 'lastLoginTime': null, 'currPwdWrongNum': null, 'pwdValdaDate': '', 'eduLevel': '', 'memo': '', 'lastUpdateUser': 'admin', 'lastUpdateTime': '2021-04-25 00:00:00', 'handleColtTaskCount': 0, 'rescRoleMap': null, 'isTeller': 'N', 'ownBranch': '龙津东支行', 'isUseFingerprint': '', 'tellerLevel': '', 'tellerCategory': '', 'isInitPwd': 'N', 'isSyncUser': null, 'certType': null }, { 'page': 1, 'size': 10, 'total': 809, 'loginUserId': 'admin', 'loginUserOrgCode': '00010', 'loginUserLeageOrgCode': null, 'loginUserOrgLocation': '00010', 'prdCodebyBaseInfo': null, 'dutyCodeStr': null, 'userCode': '00299', 'userName': '秦巧珊', 'nickName': '秦巧珊', 'legalOrgCode': null, 'legalOrgName': null, 'orgCode': '00010', 'orgName': '广州银行总行', 'userPwd': null, 'status': '1', 'birthday': '', 'telPhone': '18620101089', 'idCardNo': '', 'email': '', 'sex': '', 'staffingLevel': '', 'age': null, 'createTime': '2021-04-25 00:00:00', 'createUser': 'admin', 'lastLoginTime': null, 'currPwdWrongNum': null, 'pwdValdaDate': '', 'eduLevel': '', 'memo': '', 'lastUpdateUser': 'admin', 'lastUpdateTime': '2021-04-25 00:00:00', 'handleColtTaskCount': 0, 'rescRoleMap': null, 'isTeller': 'N', 'ownBranch': '赤岗支行', 'isUseFingerprint': '', 'tellerLevel': '', 'tellerCategory': '', 'isInitPwd': 'N', 'isSyncUser': null, 'certType': null }, { 'page': 1, 'size': 10, 'total': 809, 'loginUserId': 'admin', 'loginUserOrgCode': '00010', 'loginUserLeageOrgCode': null, 'loginUserOrgLocation': '00010', 'prdCodebyBaseInfo': null, 'dutyCodeStr': null, 'userCode': '00323', 'userName': '钟丽娟', 'nickName': '钟丽娟', 'legalOrgCode': null, 'legalOrgName': null, 'orgCode': '00010', 'orgName': '广州银行总行', 'userPwd': null, 'status': '1', 'birthday': '', 'telPhone': '13922245331', 'idCardNo': '', 'email': '', 'sex': '', 'staffingLevel': '', 'age': null, 'createTime': '2021-04-25 00:00:00', 'createUser': 'admin', 'lastLoginTime': null, 'currPwdWrongNum': null, 'pwdValdaDate': '', 'eduLevel': '', 'memo': '', 'lastUpdateUser': 'admin', 'lastUpdateTime': '2021-04-25 00:00:00', 'handleColtTaskCount': 0, 'rescRoleMap': null, 'isTeller': 'N', 'ownBranch': '科技支行', 'isUseFingerprint': '', 'tellerLevel': '', 'tellerCategory': '', 'isInitPwd': 'N', 'isSyncUser': null, 'certType': null }, { 'page': 1, 'size': 10, 'total': 809, 'loginUserId': 'admin', 'loginUserOrgCode': '00010', 'loginUserLeageOrgCode': null, 'loginUserOrgLocation': '00010', 'prdCodebyBaseInfo': null, 'dutyCodeStr': null, 'userCode': '00496', 'userName': '温华', 'nickName': '温华', 'legalOrgCode': null, 'legalOrgName': null, 'orgCode': '00010', 'orgName': '广州银行总行', 'userPwd': null, 'status': '1', 'birthday': '', 'telPhone': '13710848678', 'idCardNo': '', 'email': '', 'sex': '', 'staffingLevel': '', 'age': null, 'createTime': '2021-04-25 00:00:00', 'createUser': 'admin', 'lastLoginTime': null, 'currPwdWrongNum': null, 'pwdValdaDate': '', 'eduLevel': '', 'memo': '', 'lastUpdateUser': 'admin', 'lastUpdateTime': '2021-04-25 00:00:00', 'handleColtTaskCount': 0, 'rescRoleMap': null, 'isTeller': 'N', 'ownBranch': '沙河支行', 'isUseFingerprint': '', 'tellerLevel': '', 'tellerCategory': '', 'isInitPwd': 'N', 'isSyncUser': null, 'certType': null }]
    };
  },
  created() {
  },
  methods: {
    rowClick() {
      const selections = this.$refs.refTable.selections;
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