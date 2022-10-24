<template>
  <div>
    <formTable>
      <div slot="button">
        <el-button @click="add">设置</el-button>
        <el-button @click="add">设置</el-button>
        <el-button type="primary" @click="add">新增</el-button>
      </div>
    </formTable>
  </div>
</template>

<script>
import formTable from './formTable.vue';
export default {
  components: { formTable },
  methods: {
    add() {

    }
  }
};
</script>

<style>

</style>