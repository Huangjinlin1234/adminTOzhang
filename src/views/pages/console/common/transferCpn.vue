<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      @close="closeFn"
      @open="initData"
    >
      <div class="transfer-container">
        <el-transfer v-model="valueArray" :props="defaultProps" :titles="titles" :data="transferData" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="comfirmFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTrfData, saveTransfer } from '@/api/systemManage/userManage.js';
export default {
  props: {
    dialogTitle: {
      type: String,
      default: '新增'
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    titles: {
      type: Array,
      default: () => {
        return ['可分配岗位', '已选岗位'];
      }
    },
    dataUrl: {
      type: String,
      default: ''
    },
    defaultProps: {
      type: Object,
      default: () => {
        return {
          key: 'roleCode',
          value: 'roleName'
        };
      }
    },
    savrUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      valueArray: [],
      transferData: []
    };
  },
  created() {
  },
  methods: {
    initData() {
      this.getTranasferData();
    },
    getTranasferData() {
      getTrfData({}).then(res => {
        if (res.code == '0') {
          this.transferData = res.rows;
        }
      });
    },
    closeFn() {
      this.$emit('update:dialogVisible', false);
    },
    comfirmFn() {
      console.log(this.valueArray, 'vvv');
      const userCode = this.$parent.selection.userCode;
      saveTransfer({ userCode, roleCodes: this.valueArray }, this.savrUrl).then(res => {
        if (res.code == '0') {
          this.closeFn();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .transfer-container{
    display: flex;
    justify-content: center;
  }
</style>