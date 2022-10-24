<template>
  <el-form ref='refForm' :rules='formRules' label-width='120px' class='demo-ruleForm'>
    <el-form-item label='' prop=''>
      <el-select class='global-el-input search-input' v-model='form.id' placeholder='请选择' filterable clearable>,
        <el-option v-for='option in options' :key='option.value' :label='option.label' :value='option.value'></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label='' prop=''>
      <el-input type='text' class='global-el-input' v-model='form.name' placeholder='请输入' :maxlength='inputMaxLength' clearable></el-input>
    </el-form-item>
    <div class="drawercustom_footer">
      <el-divider></el-divider>
      <el-form-item>
        <div class="drawercustom_footer_action">
          <el-button type="primary" size="small" @click="handleSubmit">保存</el-button>
          <el-button size="small" plain @click="handleDrawerClose">取消</el-button>
        </div>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
// import 组件名称 from '组件路径'
export default {
  name: 'Index',
  // import引入的组件需要注入到对象中才能使用
  components: {

  },
  data () {
    // 这里存放数据
    return {

    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  methods: {

  },
}
</script>

<style scoped lang="less">

//@import 'xxx.less';引入公共css类
</style>
