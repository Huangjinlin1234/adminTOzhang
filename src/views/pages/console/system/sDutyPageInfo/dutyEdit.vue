<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      size="large"
      :visible.sync="dialogVisible"
      @close="closeFn"
      @open="initData"
    >
      <el-form ref="refForm" :model="formdata" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="岗位代码" prop="dutyCode">
              <el-input v-model="formdata.dutyCode" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="岗位名称" prop="dutyName" required>
              <el-input v-model="formdata.dutyName" :disabled="pageType=='DETAIL'" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="适用机构" prop="orgCode" ctype="input">
              <el-input v-model="formdata.orgCode" :disabled="pageType=='DETAIL'">
                <i slot="suffix" class="el-icon-search" @click="iconClick" />
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-input v-model="formdata.status" :disabled="pageType=='DETAIL'" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="pageType=='DETAIL'" label="创建人">
              <el-input v-model="formdata.createUser" :disabled="pageType=='DETAIL'" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="pageType=='DETAIL'" label="创建时间">
              <el-date-picker
                v-model="formdata.createTime"
                :disabled="pageType=='DETAIL'"
                type="date"
                placeholder="选择日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="pageType=='DETAIL'" label="最后修改人">
              <el-input v-model="formdata.lastUpdateUser" :disabled="pageType=='DETAIL'" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="pageType=='DETAIL'" label="最后修改时间">
              <el-date-picker
                v-model="formdata.lastUpdateTime"
                :disabled="pageType=='DETAIL'"
                type="date"
                placeholder="选择日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="formdata.memo" type="textarea" :disabled="pageType=='DETAIL'" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeFn">取 消</el-button>
        <el-button type="primary" @click="comfirmFn">确 定</el-button>
      </div>
    </el-dialog>
    <orgSelect ref="refOrgSelct" :base-params="baseParams" @emitRow="reciveRow" />
  </div>
</template>

<script>
import orgSelect from '@/views/pages/console/common/orgSelect.vue';
import { deepClone } from '@/utils';
import { dutyEdit } from '@/api/systemManage/dutyManage.js';
export default {
  components: { orgSelect },
  props: {
    dutyInfo: {
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
      formdata: { },
      baseParams: {}
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
        this.formdata = deepClone(this.dutyInfo);
      }
    },
    closeFn() {
      this.dialogVisible = false;
      this.$refs.refForm.resetFields();
    },
    reciveRow(row) {
      this.formdata.orgCode = row.orgCode;
      this.formdata.orgName = row.orgName;
    },
    comfirmFn() {
      dutyEdit({}).then(res => {
        if (res.code === '0') {
          this.closeFn();
        }
      });
    },
    iconClick() {
      if (this.pageType == 'DETAIL') {
        return;
      }
      this.$refs.refOrgSelct.dialogVisible = true;
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