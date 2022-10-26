<template>
  <el-form ref="refForm" :model="formData" :rules="rules" :label-width="labelWidth+'px'" :disabled="disabled">
    <el-row>
      <el-col v-for="(item,index) in formFields" :key="index" :span="(item.colspan && 24/item.colspan)|| 24/colspan">
        <el-form-item :label="item.label" :prop="item.prop">
          <el-input v-if="!item.ctype || item.ctype === 'input'" v-model="formData[item.prop]" :type="item.type" :row="item.row" :readonly="item.readonly" :disabled="item.disabled" placeholder="请输入" maxlength="20" clearabl>
            <i v-if="item.icon" slot="suffix" :class="`el-input__icon ${item.icon}`" @click="item.iconClick"></i>
          </el-input>
          <el-select v-else-if="item.ctype === 'select'" v-model="formData[item.prop]" placeholder="请选择" clearable>
            <el-option v-for="(it,ind) in item.options" :key="ind" :label="it.label" :value="it.value"></el-option>
          </el-select>
          <el-checkbox-group v-else-if="item.ctype === 'checkbox'" v-model="formData[item.prop]">
            <el-checkbox v-for="(it,ind) in item.options" :key="ind" :label="it.label"></el-checkbox>
          </el-checkbox-group>
          <el-radio-group v-else-if="item.ctype === 'radio'" v-model="formData[item.prop]">
            <el-radio v-for="(it,ind) in item.options" :key="ind" :label="it.label"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="colspan && 24/colspan">
        <el-form-item>
          <slot />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: 'ElXform',
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
    rules: {
      type: Object,
      default: () => {
        return {}
      },
    },
    labelWidth: {
      type: String,
    },
    // inline: {
    //   type: Boolean,
    //   default: false
    // },
    colspan: {
      type: Number,
      default: 3
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  components: {},
  data () {
    return {}
  },
  created () { },
  mounted () { },
  methods: {
  },
}
</script>
