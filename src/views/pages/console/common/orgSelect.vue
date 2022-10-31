<template>
  <el-dialog
    title="机构选择"
    :visible.sync="dialogVisible"
    :modal="false"
    @close="closeFn"
    @open="initData"
  >
    <formTable
      :page-options="pageOptions"
      :base-params="baseParams"
      @emitSelection="selectionFn"
    />
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeFn">取消</el-button>
      <el-button type="primary" @click="comfirmFn">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import formTable from './formTable.vue';
export default {
  components: { formTable },
  props: {
    baseParams: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      pageOptions: {
        title: '机构列表',
        formFileds: [
          { label: '机构代码', prop: 'orgCode', ctype: 'input' },
          { label: '机构名称', prop: 'orgName', ctype: 'input' }
        ],
        tableFileds: [
          { label: '机构代码', prop: 'orgCode', ctype: 'input' },
          { label: '机构名称', prop: 'orgName', ctype: 'input' },
          { label: '机构层级', prop: 'orgLevel', ctype: 'input' },
          { label: '机构联系电话', prop: 'orgTel', ctype: 'input' },
          { label: '机构地址', prop: 'orgAddress', ctype: 'input' },
          { label: '机构邮编', prop: 'orgZipcode', ctype: 'input' }
        ],
        dataUrl: '/console/api/s/orgs/login/leage'
      },
      selecion: {}
    };
  },
  methods: {
    initData() {

    },
    closeFn() {
      this.dialogVisible = false;
    },
    selectionFn(se) {
      this.selecion = se;
    },
    comfirmFn() {
      this.$emit('emitRow', this.selecion);
      this.dialogVisible = false;
    }
  }

};
</script>

<style lang="scss" scoped>

</style>