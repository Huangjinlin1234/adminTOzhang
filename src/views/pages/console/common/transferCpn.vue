<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :modal="modal"
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
import { getTrfData } from '@/api/systemManage/userManage.js';
export default {
  props: {
    dialogTitle: {
      type: String,
      default: '新增'
    },
    modal: {
      type: Boolean,
      default: true
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
          label: 'roleName'
        };
      }
    }
  },
  data() {
    return {
      valueArray: [],
      transferData: [
        { orgCode: '00001', orgName: '机构1' },
        { orgCode: '00002', orgName: '机构2' },
        { orgCode: '00003', orgName: '机构3' }
      ],
      dialogVisible: false
    };
  },
  created() {
  },
  methods: {
    initData() {
      this.getTranasferData();
    },
    getTranasferData() {
      getTrfData({}, this.dataUrl).then(res => {
        if (res.code == '0') {
          this.transferData = res.rows;
        }
      });
    },
    closeFn() {
      this.$emit('update:dialogVisible', false);
    },
    comfirmFn() {
      this.$emit('confirm', this.valueArray);
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