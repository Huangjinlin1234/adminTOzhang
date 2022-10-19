<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      @close="closeFn"
      @open="initData"
    >
      <div class="transfer-container">
        <el-transfer v-model="value1" :props="props" :titles="titles" :data="transferData" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
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
    transferData: {
      type: Array,
      default: () => {
        return [
          { roleCode: 1, roleName: '备选项1' },
          { roleCode: 2, roleName: '备选项2' },
          { roleCode: 3, roleName: '备选项3' },
          { roleCode: 4, roleName: '备选项4' },
          { roleCode: 5, roleName: '备选项5' }
        ];
      }
    }
  },
  data() {
    return {
      value1: [],
      props: {
        key: 'roleCode',
        roleName: 'roleName'
      }
    };
  },
  methods: {
    initData() {
      console.log(111);
    },
    closeFn() {
      this.$emit('update:dialogVisible', false);
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