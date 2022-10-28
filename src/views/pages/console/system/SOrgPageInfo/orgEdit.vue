<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      size="large"
      :visible.sync="dialogVisible"
      :destroy-on-close="true"
      @close="closeFn"
      @open="initData"
    >
      <div v-if="pageType!=='DETAIL'">
        <el-form ref="form" :model="queryData" :inline="true" label-width="80px" size="small">
          <el-form-item label="机构代码">
            <el-input v-model="queryData.orgCode" />
          </el-form-item>
          <el-form-item>
            <el-button v-if="pageType!=='DETAIL'" type="primary" @click="queryFn">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-form ref="refForm" :model="formdata" label-width="120px" :rules="rules" label-suffix="：">
        <el-row>
          <el-col v-if="pageType!=='DETAIL'" :span="24">
            <el-form-item label="是否虚拟机构" prop="isVirtOrg">
              <el-radio-group v-model="formdata.isVirtOrg" :disabled="pageType=='DETAIL'" @change="isVoClick">
                <el-radio v-for="(ite,idx) in YNoptions" :key="idx" :label="ite.key">{{ ite.value }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-for="(item,index) in formFileds" :key="index" :span="item.span||12">
            <el-form-item :label="item.label" :prop="item.prop">
              <!--输入框 -->
              <template v-if="item.ctype==='input'">
                <el-input v-model="formdata[item.prop]" :disabled="pageType=='DETAIL'||formOptions[item.prop]">
                  <i v-if="item.iconClick" slot="suffix" :class="item.suffixIcon" @click="item.iconClick" />
                </el-input>
              </template>
              <!--选择框 -->
              <template v-if="item.ctype==='select'">
                <el-select v-model="formdata[item.prop]" :placeholder="item.label" :disabled="pageType=='DETAIL'||formOptions[item.prop]" @change="item.change">
                  <el-option v-for="(ite,idx) in item.options" :key="idx" :label="ite.value" :value="ite.key" />
                </el-select>
              </template>
              <!--日期框 -->
              <template v-if="item.ctype==='datepicker'">
                <el-date-picker
                  v-model="formdata[item.prop]"
                  :disabled="pageType=='DETAIL'||formOptions[item.prop]"
                  type="date"
                  placeholder="选择日期"
                />
              </template>
              <!--单选框 -->
              <template v-if="item.ctype==='radio'">
                <el-radio-group v-model="formdata[item.prop]" :disabled="pageType=='DETAIL'" @change="item.click">
                  <el-radio v-for="(ite,idx) in item.options" :key="idx" :label="ite.key">{{ ite.value }}</el-radio>
                </el-radio-group>
              </template>
              <!--文本输入框框 -->
              <template v-if="item.ctype==='textarea'">
                <el-input v-model="formdata[item.prop]" :disabled="pageType=='DETAIL'" type="textarea" :autosize="{ minRows: 5 }" />
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
      <orgSelect ref="refOrgSelct" :base-params="baseParams" @emitRow="reciveRow" />
    </el-dialog>
  </div>
</template>

<script>
import orgSelect from '@/views/pages/console/common/orgSelect.vue';
import { orgEditApi, queryOrgInfo } from '@/api/systemManage/orgManage.js';
import { deepClone } from '@/utils';
export default {
  components: { orgSelect },
  props: {
    orgInfo: {
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
      formdata: { isVirtOrg: 'N' },
      YNoptions: [{ key: 'N', value: '否' }, { key: 'Y', value: '是' }],
      queryData: { },
      baseParams: {},
      formFileds: [
        { label: '机构代码', prop: 'orgCode', ctype: 'input', disabled: true },
        { label: '机构名称', prop: 'orgName', ctype: 'input' },
        { label: '机构层级', prop: 'orgLevel', ctype: 'select', options: [{ key: '1', value: '一级' }, { key: '2', value: '二级' }, { key: '3', value: '三级' }, { key: '4', value: '四级' }], disabled: false, change: value => { this.selectChange(value) } },
        { label: '机构简称', prop: 'orgSimpleName', ctype: 'input' },
        { label: '机构英文名', prop: 'orgEname', ctype: 'input' },
        { label: '机构负责人', prop: 'orgManagerId', ctype: 'input', disabled: false },
        { label: '机构联系电话', prop: 'orgTel', ctype: 'input' },
        { label: '开办日期', prop: 'launchDate', ctype: 'datepicker' },
        { label: '机构邮编', prop: 'orgZipcode', ctype: 'input' },
        { label: '机构地址', prop: 'orgAddress', ctype: 'input' },
        { label: '地区编号', prop: 'distno', ctype: 'input' },
        { label: '机构传真', prop: 'orgFax', ctype: 'input' },
        { label: '地区名称', prop: 'distname', ctype: 'input', disabled: false }
      ],
      rules: {
        isVirtOrg: [{ required: true, message: '必填' }],
        orgCode: [{ required: true, message: '必填' }],
        orgName: [{ required: true, message: '必填' }],
        orgLevel: [{ required: true, message: '必填' }]
      },
      formOptions: {}
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
  created() {
    this.formFileds.forEach(item => {
      if (item.disabled == undefined) {
        this.$set(this.formOptions, item.prop, true);
      }
    });
    this.formOptions.orgCode = true;
  },
  methods: {
    initData() {
      console.log(this.pageType, 'pageType');
      if (this.pageType !== 'ADD') {
        this.formdata = deepClone(this.orgInfo);
      }
    },
    selectChange(value) {
      if (value == '1') {
        this.$message.warning('一级机构只能由系统管理员初始化');
        this.formdata.orgLevel = '';
        return;
      }
      const index = this.formFileds.findIndex(item => item.prop == 'orgParentCode');
      // 加入上级机构字段
      if (index < 0) {
        const item = { label: '上级机构代码', prop: 'orgParentCode', ctype: 'input', suffixIcon: 'el-icon-search', iconClick: () => this.choosePrtOrg() };
        this.formFileds.splice(4, 0, item);
      }
      this.baseParams.orgLevel = value;
    },
    reciveRow(row) {
      this.formdata.orgParentCode = row.orgCode;
      this.formdata.orgParentName = row.orgName;
    },
    isVoClick(value) {
      if (value == 'Y') {
        this.formFileds.forEach(item => {
          if (item.disabled === undefined) {
            this.switchStatus(item.prop, false);
          }
        });
      } else if (value === 'N') {
        this.formFileds.forEach(item => {
          if (item.disabled === undefined) {
            this.switchStatus(item.prop, true);
          }
        });
      }
    },
    // 查询
    queryFn() {
      const params = {
        isVirtOrg: this.formdata.isVirtOrg,
        orgCode: this.queryData.orgCode
      };
      queryOrgInfo(params).then(res => {
        if (res.code === '0') {
          this.formdata = deepClone(res.rows);
        }
      });
    },
    choosePrtOrg() {
      this.$refs.refOrgSelct.dialogVisible = true;
    },
    closeFn() {
      if (this.pageType === 'ADD') {
        this.$refs.form.resetFields();
      }
      this.$refs.refForm.resetFields();
      this.dialogVisible = false;
    },
    comfirmFn() {
      this.$refs.refForm.validate(valid => {
        if (valid) {
          orgEditApi(this.formdata).then(res => {
            if (res.code === '0') {
              this.dialogVisible = false;
            }
          });
        }
      });
    },
    switchStatus(fields, boolean) {
      this.formOptions[fields] = boolean;
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