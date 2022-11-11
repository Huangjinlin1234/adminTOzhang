<template>
  <div class="yform-container">
    <el-xform ref="refForm" :form-data="formData" :form-fields="formFields" @icon-click="clickIconFn" label-width="140" ></el-xform>
  </div>
</template>

<script>
export default {
  props: {
    formData: {
      type: Object,
      default: () => {
        return {}
      },
    },
    formFields: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
    }
  },
  methods: {
    clickIconFn () {
    }
  }
};
</script>

<style lang="scss" scoped>
.yform-container{
  padding: 10px;
}
</style>