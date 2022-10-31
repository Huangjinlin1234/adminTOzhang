<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      size="large"
      :visible.sync="dialogVisible"
      @close="closeFn"
      @open="initData"
    >
      <div class="">
        <el-form ref="form" :model="queryData" inline label-width="120px" label-suffix="：" size="small">
          <el-form-item label="用户代码">
            <el-input v-model="queryData.isTeller" />
          </el-form-item>
          <el-form-item>
            <el-button v-if="pageType==='ADD'" type="primary" @click="queryFn">查询</el-button>
            <el-button v-if="pageType==='EDIT'" type="primary">刷新</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-form ref="refForm" :model="formdata" label-width="120px" :rules="rules" label-suffix="：">
        <el-row>
          <el-col v-for="(item,index) in formFileds" :key="index" :span="item.span||12">
            <el-form-item :label="item.label" :prop="item.prop">
              <!--单选框 -->
              <template v-if="item.ctype==='radio'">
                <el-radio-group v-model="formdata[item.prop]" :disabled="pageType=='DETAIL'">
                  <el-radio label="N">否</el-radio>
                  <el-radio label="Y">是</el-radio>
                </el-radio-group>
              </template>
              <!--输入框 -->
              <template v-if="item.ctype==='input'">
                <el-input v-model="formdata[item.prop]" :disabled="pageType=='DETAIL'">
                  <i v-if="item.suffixIcon" slot="suffix" :class="item.suffixIcon" @click="item.iconClick" />
                </el-input>
              </template>
              <template v-if="item.ctype==='select'">
                <el-select v-model="formdata[item.prop]">
                  <el-option v-for="(ite,idx) in item.options" :key="idx" :label="ite.label" :value="ite.value" />
                </el-select>
              </template>
              <!--日期框 -->
              <template v-if="item.ctype==='datepicker'">
                <el-date-picker
                  v-model="formdata[item.prop]"
                  :disabled="pageType=='DETAIL'"
                  type="date"
                  placeholder="选择日期"
                />
              </template>
              <!--单选框 -->
              <template v-if="item.ctype==='radio'">
                <el-radio-group v-model="formdata[item.prop]" :disabled="pageType=='DETAIL'">
                  <el-radio v-for="(ite,idx) in item.options" :key="idx" :label="ite.label" />
                </el-radio-group>
              </template>
              <!--文本输入框框 -->
              <template v-if="item.ctype==='textarea'">
                <el-input v-model="formdata[item.prop]" :disabled="pageType=='DETAIL'" :autosize="{ minRows: 5 }" type="textarea" />
              </template>
              <!--复选框 -->
              <template v-if="item.ctype==='checkbox'">
                <el-checkbox-group v-model="formdata[item.prop]" :disabled="pageType=='DETAIL'">
                  <el-checkbox v-for="(ite,idx) in item.options" :key="idx" :label="ite.label" :name="ite.value" />
                </el-checkbox-group>
              </template>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeFn">取 消</el-button>
        <el-button type="primary" @click="comfirmFn">确 定</el-button>
      </div>
    </el-dialog>
    <orgSelect ref="refOrgSelect" @emitRow="reciveRow" />
  </div>
</template>

<script>
import orgSelect from '@/views/pages/console/common/orgSelect.vue';
import { userEdit, queryUser } from '@/api/systemManage/userManage.js';
import { deepClone } from '@/utils';
export default {
  components: { orgSelect },
  props: {
    userInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    pageType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      editUrl: '/api/s/user',
      queryData: { },
      formdata: { isguiyuan: 'N' },
      formFileds: [
        { label: '是否柜员', prop: 'isguiyuan', ctype: 'radio', span: 24 },
        { label: '用户代码', prop: 'userCode', ctype: 'input' },
        { label: '用户姓名', prop: 'userName', ctype: 'input' },
        { label: '昵称', prop: 'nickName', ctype: 'input' },
        { label: '身份证号', prop: 'idCardNo', ctype: 'input' },
        { label: '生日', prop: 'birthday', ctype: 'datepicker' },
        { label: '年龄', prop: 'age', ctype: 'input' },
        { label: '性别', prop: 'sex', ctype: 'input' },
        { label: '机构代码', prop: 'orgCode', ctype: 'input', suffixIcon: 'el-icon-search', iconClick: () => this.orgSelect() },
        { label: '状态', prop: 'status', ctype: 'input' },
        { label: '联系电话', prop: 'telPhone', ctype: 'input' },
        { label: '邮箱', prop: 'email', ctype: 'input' },
        { label: '所属分行', prop: 'ownBranch', ctype: 'input' },
        { label: '职级', prop: 'staffingLevel', ctype: 'input' },
        { label: '学历水平', prop: 'eduLevel', ctype: 'input' },
        { label: '备注', prop: 'memo', ctype: 'textarea', span: 24 }
        // { label: '密码失效日期', prop: 'pwdValdaDate', ctype: 'datepicker' },
        // { label: '是否使用指纹', prop: 'isUseFingerprint', ctype: 'radio' },
        // { label: '柜员级别', prop: 'tellerLevel', ctype: 'input' },
        // { label: '柜员类别', prop: 'tellerCategory', ctype: 'input' },
        // { label: '最后修改人', prop: 'lastUpdateUser', ctype: 'input' },
        // { label: '最后修改日期', prop: 'lastUpdateTime', ctype: 'datepicker' },
        // { label: '创建日期', prop: 'createTime', ctype: 'datepicker' },
        // { label: '创建人', prop: 'createUser', ctype: 'input' }
      ],
      rules: {
        userCode: [{ required: true }]
      }
    };
  },
  computed: {
    dialogTitle() {
      let title;
      if (this.pageType == 'ADD') {
        title = '新增';
      } else if (this.pageType == 'EDIT') {
        title = '修改';
      } else if (this.pageType == 'DETAIL') {
        title = '详情';
      }
      return title;
    }
  },
  methods: {
    initData() {
      if (this.pageType !== 'ADD') {
        this.formdata = deepClone(this.userInfo);
      }
    },
    queryFn() {
      queryUser(this.queryData).then(res => {
        if (res.code === '0') {
        }
      });
    },
    orgSelect() {
      this.$refs.refOrgSelect.dialogVisible = true;
    },
    // 接收机构选择框的值
    reciveRow(row) {
      this.formdata.orgCode = row.orgCode;
      this.formdata.orgName = row.orgName;
    },
    // 关闭弹框
    closeFn() {
      this.$refs.refForm.resetFields();
      this.dialogVisible = false;
    },
    // 确定提交更新表格数据
    comfirmFn() {
      userEdit(this.formdata).then(res => {
        if (res.code === '0') {
          this.closeFn();
          // 刷新表格
          this.$emit('refresh');
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .top-content{
    margin: 0 auto;
    width: 80%;
  }
</style>