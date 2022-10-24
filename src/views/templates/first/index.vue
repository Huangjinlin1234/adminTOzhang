<template>
  <div>
    <el-button type="primary" @click="openDialog"></el-button>
    <guide-page :dialog-view.sync="dialogView" :dialog-title="dialogTitle" :form-fields="formFields" :form-data="formData" :btn-fields="btnFields"></guide-page>
  </div>
</template>

<script>
import guidePage from '@/components/layout/guidePage'
export default {
  name: 'first',
  props: {
  },
  components: { guidePage },
  data () {
    return {
      dialogView: false,
      dialogTitle: '合作项目新增——向导',
      formData: {},
      formFields: [
        { label: '操作类型', prop: 'operType', ctype: 'radio', options: [{ label: '新增', value: '01' }, { label: '变更', value: '02' }] },
        { label: '合作项目类型', prop: 'coProType', ctype: 'select', options: [{ label: '合作项目类型1', value: '01' }, { label: '合作项目类型2', value: '02' }] },
        { label: '合作项目名称', prop: 'coProType', ctype: 'select', options: [{ label: '合作项目类型1', value: '01' }, { label: '合作项目类型2', value: '02' }] },
      ],
      btnFields: [
        { label: '下一步', type: 'primary', clickFn: this.nextStep },
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
    nextStep () {
      console.log('下一步')
    }
  },
}
</script>
