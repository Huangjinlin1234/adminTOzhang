<template>
  <div>
    <el-button type="primary" @click="openDialog"></el-button>
    <el-dialog :title="dialogTitle" :visible.sync="dialogView" :width="dialogWidth" :before-close="closeDialog">
      <el-form ref="refForm" :model="formData" label-width="120">
        <el-form-item label="删除原因" prop="delReason">
          <el-input v-model="formData.delReason" type="textarea" :row="3"></el-input>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button type="primary" @click="confirm">确定</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'first',
  props: {
  },
  data () {
    return {
      dialogView: false,
      dialogTitle: '关联企业',
      dialogWidth: '400px',
      formData: {},
      formFields: [
        { label: '删除原因', prop: 'delReason', ctype: 'input', type: 'textarea' },
      ],
      btnFields: [
        { label: '下一步', type: 'primary', click: this.nextStep },
        { label: '重置', etype: 'reset' },
        { label: '取消', etype: 'cancel' }
      ]
    }
  },
  created () { },
  mounted () { },
  methods: {
    openDialog () {
      this.dialogView = true;
    },
    closeDialog () {
      this.dialogView = false;
      // this.$emit('update:dialogView', false);
    },
    confirm () {
      console.log('确定')
    }
  },
}
</script>
