/**
 * @description YUWPUI 组件全局配置
 * @created by weimei1
 * @updated by
 * @description 组件参数全局修改
 */
import locale from 'yuwp-ui/lib/locale/lang/zh-CN.js'
import { getBaseUrl } from '@/utils/util'
import { getI18nMessage } from '@/locale'
export default {
  i18n: function(key, options) {
    return getI18nMessage(key, options)
  },
  locale,
  xtable: {
    conditionKey: '', // 适配后端新框架条件查询无conditon对象
    customLayout: 'total, sizes, prev, pager, next, jumper'
  },
  xform: {
    labelSuffix: '', // 适配UI样式,表单label和输入框之间无冒号
    removeEmpty: true // 移除表单查询为空的项
  },
  upload: {
    baseUrl: getBaseUrl()
  }
  // 由于很多查看等都有高级查询，所以默认不要高级查询，如果需要高级查询请单独配置属性（参考组件panel 配置） 刘杰 20210428
  // panel: {
  //  panelType: 'simple'
  // }
}

