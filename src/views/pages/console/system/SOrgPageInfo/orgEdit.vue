<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      size="large"
      :visible.sync="dialogVisible"
      @close="closeFn"
      @open="initData"
    >
      <div v-if="pageType=='EDIT'" class="">
        <el-form ref="form" :model="formdata" :inline="true" label-width="80px" size="small">
          <el-form-item label="机构代码">
            <el-input v-model="formdata.orgCode" :disabled="true" />
          </el-form-item>
          <el-form-item>
            <el-button v-if="pageType==='ADD'" type="primary">查询</el-button>
            <el-button v-if="pageType==='EDIT'" type="primary">刷新</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-xform ref="refForm" v-model="formdata" label-width="120px">
        <el-xform-group column="3">
          <el-xform-item label="是否虚拟机构" ctype="yu-xradio" data-code="YESNO" name="title" :hidden="pageType!=='ADD'" />
        </el-xform-group>
        <el-xform-group column="3">
          <el-xform-item label="机构代码" name="orgCode" ctype="input" :disabled="pageType=='DETAIL'" />
          <el-xform-item label="机构名称" name="orgName" ctype="input" :disabled="pageType=='DETAIL'" />
          <el-xform-item label="机构层级" name="orgLevel" ctype="input" :disabled="pageType=='DETAIL'" />
          <el-xform-item label="上级机构代码" name="orgParentCode" ctype="input" :disabled="pageType=='DETAIL'" />
          <el-xform-item label="机构英文名" name="orgEname" ctype="input" :disabled="pageType=='DETAIL'" />
          <el-xform-item label="机构简称" name="orgSimpleName" ctype="input" :disabled="pageType=='DETAIL'" />
          <el-xform-item label="机构负责人" name="orgManagerId" ctype="input" :disabled="pageType=='DETAIL'" />
          <el-xform-item label="排序字段" name="orderId" ctype="input" :disabled="pageType=='DETAIL'" />
          <el-xform-item label="机构联系电话" name="orgTel" ctype="input" :disabled="pageType=='DETAIL'" />
          <el-xform-item label="开办日期" name="launchDate" ctype="select" data-code="USER_STATUS" :disabled="pageType=='DETAIL'" />
          <el-xform-item label="机构邮编" name="orgZipcode" ctype="yu-date-picker" :disabled="pageType=='DETAIL'" />
          <el-xform-item label="机构地址" name="orgAddress" ctype="select" data-code="YESNO" :disabled="pageType=='DETAIL'" />
          <el-xform-item label="地区编号" name="distno" ctype="select" :disabled="pageType=='DETAIL'" />
          <el-xform-item label="机构传真" name="orgFax" ctype="input" :disabled="pageType=='DETAIL'" />
          <el-xform-item label="地区名称" name="distname" ctype="input" :disabled="pageType=='DETAIL'" />
          <el-xform-item label="状态" name="status" ctype="input" :disabled="pageType=='DETAIL'" />
          <el-xform-item label="位置属性" name="location" ctype="input" :disabled="pageType=='DETAIL'" />
          <el-xform-item label="金融代码" name="finaCode" ctype="input" :disabled="pageType=='DETAIL'" />
          <el-xform-item label="机构信用联社" name="creditUnionCode" ctype="input" :disabled="pageType=='DETAIL'" />
          <el-xform-item label="机构录入字头" name="areaCode" ctype="input" :disabled="pageType=='DETAIL'" />
          <el-xform-item label="珠三角地区标识" name="areaName" ctype="input" :disabled="pageType=='DETAIL'" />
          <el-xform-item label="创建时间" name="createTime" ctype="input" :disabled="pageType=='DETAIL'" />
          <el-xform-item label="创建人" name="createUser" ctype="input" :disabled="pageType=='DETAIL'" />
          <el-xform-item label="最后修改人" name="lastUpdateUser" ctype="input" :disabled="pageType=='DETAIL'" />
          <el-xform-item label="最后修改时间" name="lastUpdateTime" ctype="input" :disabled="pageType=='DETAIL'" />
        </el-xform-group>
      </el-xform>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeFn">取 消</el-button>
        <el-button type="primary" @click="comfirmFn">确 定</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    orgInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    pageType: String
  },
  data() {
    return {
      formdata: { }
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
      this.$nextTick(() => {
        if (this.pageType !== 'ADD') {
          this.formdata = this.orgInfo;
          this.$refs.refForm.formdata = this.orgInfo;
        } else if (this.pageType == 'ADD') { // 新增清空表单数据
          this.$refs.refForm.formdata = {};
        }
      });
    },
    closeFn() {
      this.$emit('update:dialogVisible', false);
    },
    comfirmFn() {
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