<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    @close="closeFn"
    @open="initData"
  >
    <el-form ref="refForm" :model="formdata" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="角色码">
            <el-input v-model="formdata.roleCode" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色名称" required>
            <el-input v-model="formdata.roleName" :disabled="pageType=='DETAIL'" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="适用机构" required>
            <el-input v-model="formdata.orgCode" :disabled="pageType=='DETAIL'">
              <i slot="suffix" class="el-icon-search" @click="iconClick" />
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="pageType==='DETAIL'" label="创建人">
            <el-input v-model="formdata.createUser" :disabled="pageType=='DETAIL'" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="pageType==='DETAIL'" label="创建时间">
            <el-date-picker
              v-model="formdata.createTime"
              type="date"
              placeholder="选择日期"
              :disabled="pageType=='DETAIL'"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="pageType==='DETAIL'" label="最后修改人" :disabled="pageType=='DETAIL'">
            <el-input v-model="formdata.lastUpdateUser" :disabled="pageType=='DETAIL'" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="pageType==='DETAIL'" label="最后修改时间" :disabled="pageType=='DETAIL'">
            <el-date-picker
              v-model="formdata.lastUpdateTime"
              type="date"
              placeholder="选择日期"
              :disabled="pageType=='DETAIL'"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" :disabled="pageType=='DETAIL'">
            <el-input v-model="formdata.remark" type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeFn">取 消</el-button>
      <el-button type="primary" @click="submitFn">确 定</el-button>
    </div>
    <transferCpn
      ref="refTrn"
      dialog-title="设置适用机构"
      :data-url="orgDataUrl"
      :titles="titlesRole"
      :default-props="orgProps"
      :savr-url="roleSaveUrl"
      :modal="false"
      @confirm="confirmFn"
    />
  </el-dialog>
</template>

<script>
import transferCpn from '@/views/pages/console/common/transferCpn.vue';
import { roleEditApi } from '@/api/systemManage/roleManage.js';
import { deepClone } from '@/utils';
export default {
  components: { transferCpn },
  props: {
    roleInfo: {
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
      formdata: { orgCode: '' },
      dialogVisible: false,
      orgDataUrl: '/console/api/s/getOrgsForRole',
      orgProps: { key: 'orgCode', label: 'orgName' },
      roleSaveUrl: '/console/api/s/role',
      titlesRole: ['可分配机构', '已选机构']
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
        this.formdata = deepClone(this.roleInfo);
      }
    },
    closeFn() {
      this.dialogVisible = false;
      this.$refs.refForm.resetFields();
    },
    confirmFn(valueArray) {
      this.formdata.orgCode = valueArray.join(',');
      this.$refs.refTrn.dialogVisible = false;
    },
    iconClick() {
      this.$refs.refTrn.dialogVisible = true;
    },
    // 保存
    submitFn() {
      roleEditApi(this.formdata).then(res => {
        if (res.code === '0') {
          this.closeFn();
        }
      });
    }

  }
};
</script>

<style lang="scss" scoped>

</style>