<template>
  <div>
    <formTable :pageOptions="pageOptions"  @emitSelection="selectionFn">
      <yu-button type="primary" ref="btn_insertFn"   @click="openDialog('ADD')">新增</yu-button>
      <yu-button type="primary" ref="btn_insertFn"   @click="openDialog('EDIT')">修改</yu-button>
      <yu-button type="primary" ref="btn_deleteFn" @click="openDialog('DETAIL')">查看</yu-button>
    </formTable>
      <dutyEdit
        ref="refDutyEdit"
        :dialogVisible.sync="showDialog"
        :dialogTitle="dialogTitle"
        :pageType="pageType"
        :dutyInfo="dutyInfo">
      </dutyEdit>
  </div>
</template>
<script>
import formTable from '@/views/pages/console/common/formTable.vue';
import minxinDiaFn from '@/views/pages/console/common/minxin.js';
import dutyEdit from './dutyEdit.vue';
export default {
  components: { formTable, dutyEdit },
  mixins: [minxinDiaFn],
  data () {
    return {
      pageOptions: {
        title: '岗位管理',
        dataUrl: backend.console + '/api/s/dutys',
        formFileds: [
          {label: '岗位代码', name: 'dutyCode', ctype: 'input'},
          {label: '岗位名称', name: 'dutyName', ctype: 'input'}
        ],
        tableFileds: [
          {label: '岗位代码', prop: 'orgCode'},
          {label: '岗位名称', prop: 'orgName'},
          {label: '状态', prop: 'status'}
        ]
      },
      selections: [],
      dutyInfo: {}
    };
  },
  methods: {
    selectionFn (selections) {
      this.selections = selections;
      this.dutyInfo = selections[0];
    }
  }
};
</script>