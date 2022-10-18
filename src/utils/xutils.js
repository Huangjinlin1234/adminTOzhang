import backend from '@/config/constant/app.data.service'
import * as utils from '@/utils/util'
import { getUrl, getBaseApi } from '@/utils/util'
import * as xyutils from 'xy-utils'
let utilVue = new window.Vue({})
/**
 * 标准ajax(仅协助处理token及url拼接)
 */
export function request(option) {
  let options = { ...option }
  try {
    if (typeof options.data === 'string') {
      options.data = JSON.parse(options.data)
    }
  } catch (error) {}
  if (options.type) {
    options.method = options.type
  } else {
    options.method = 'post'
  }
  if (options.async == false) {
    utilVue.$request(options)
  } else {
    utilVue
      .$request(options)
      .then((response) => {
        typeof options.success === 'function' && options.success(response, 0)
      })
      .catch((result) => {
        typeof options.error === 'function' && options.error(result, null, null)
      })
  }
}
// 弹出窗口.
export function openDialogAndCloseMe(
  _title,
  _js,
  _width,
  _height,
  _pars,
  _callBack,
  _isCloseMe,
  _isHaveCloseBtn,
  _jsMode
) {}
export function toUpperCase(par, flag) {
  let model = {}
  let item = null
  if (flag) {
    for (item in par) {
      // 将key值转化成驼峰命名 ;
      model[this.toHump(item)] = par[item]
    }
  } else {
    for (item in par) {
      // 将key值转化成驼峰命名 ;
      model[this.toLine(item)] = par[item]
    }
  }
  return model
}
// 下划线转驼峰
export function toHump(name) {
  return name.replace(/\_(\w)/g, function (all, letter) {
    return letter.toUpperCase()
  })
}

// 驼峰转换下划线
export function toLine(name) {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase()
}
export function showMessage(msg) {
  utilVue.$message(msg)
}
export function showMsgBox(_title, _msg, _width, _height, _callback, _type) {
  _msg = _msg || ''
  utilVue.$msgbox({
    title: _title,
    message: _msg,
    type: _type,
    callback: function (action) {
      _callback && _callback()
    }
  })
}
// 前端弹出窗口
export function showTextOrHtmlMsgBox(
  _title,
  _text,
  _isHtml,
  _width,
  _height,
  _btns,
  _callBackFunc,
  _isAutoClose,
  _type
) {
  // 先取得菜单根窗口
  utilVue.$confirm(_text, _title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: _type,
    center: false,
    callback: _callBackFunc
  })
}

//
export function closeDialog(_returnData) {}
export function genUUID(len, radix) {
  let chars =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  let uuid = []
  let i
  radix = radix || chars.length

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 | (Math.random() * radix)]
    }
  } else {
    // rfc4122, version 4 form
    let r

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    // Fill in random data. At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}

// 按顺序导入JS
export function importJsOrderBy(_allJSFiles, _index, _callBack, _idMark) {
  if (_index >= _allJSFiles.length) {
    if (_callBack != undefined && _callBack != null) {
      _callBack()
    }
    return
  }
  let strOneJsFile = _allJSFiles[_index]
  let script = document.createElement('script')
  if (_idMark != undefined) {
    // 如果定义了id标记,则设置id,个id用于判断重复
    script.id = _idMark + '@JS' + (_index + 1) //
  }
  script.type = 'text/javascript' // 一定设置类型
  script.src = strOneJsFile
  document.head.appendChild(script)
  script.onload = function () {
    console.log('按顺序成功加载自定义JS【' + strOneJsFile + '】')
    let newIndex = _index + 1
    this.importJsOrderBy(_allJSFiles, newIndex, _callBack, _idMark)
  }
}

// 校验公式执行,返回数组!!如果校验成功则返回null,表示没有错误,即都是成功的!可能有多个错误..
export function validateFormulaExec(_formula, _itemkey, _itemname, _carddata) {
  return ''
}

// 把一个SQL中的${key1}替换成实际值,jso_CardData是一个json数据对象
export function replaceStrByMacroKeys(_sql, jsoCardData) {
  if (_sql == undefined || _sql == null) {
    return _sql //
  }

  let jsoUser = this.getLoginUserInfo() //
  let strWhereSQL = _sql
  let aryItems = this.parseStrMacroKeys(strWhereSQL, '${', '}')
  let strItemValue = null
  if (aryItems != null && aryItems.length > 0) {
    for (let i = 0; i < aryItems.length; i++) {
      let strItemKey = aryItems[i] //
      if (strItemKey == 'LoginUserId') {
        strItemValue = jsoUser['userId'] //
        strWhereSQL = strWhereSQL.replace('${' + strItemKey + '}', strItemValue)
      } else if (strItemKey == 'LoginLoginCode') {
        strItemValue = jsoUser['loginCode'] //
        strWhereSQL = strWhereSQL.replace('${' + strItemKey + '}', strItemValue)
      } else if (strItemKey == 'LoginUserCode') {
        strItemValue = jsoUser['userCode'] //
        strWhereSQL = strWhereSQL.replace('${' + strItemKey + '}', strItemValue)
      } else if (strItemKey == 'LoginUserName') {
        strItemValue = jsoUser['userName'] //
        strWhereSQL = strWhereSQL.replace('${' + strItemKey + '}', strItemValue)
      } else if (strItemKey == 'LoginOrgId') {
        strItemValue = jsoUser['orgId'] //
        strWhereSQL = strWhereSQL.replace('${' + strItemKey + '}', strItemValue)
      } else if (strItemKey == 'LoginOrgCode') {
        // 机构编码
        strItemValue = jsoUser['orgCode'] //
        strWhereSQL = strWhereSQL.replace('${' + strItemKey + '}', strItemValue)
      } else if (strItemKey == 'LoginOrgName') {
        strItemValue = jsoUser['orgName'] //
        strWhereSQL = strWhereSQL.replace('${' + strItemKey + '}', strItemValue)
      } else if (strItemKey == 'LoginInstuId') {
        strItemValue = jsoUser['instuId'] //
        strWhereSQL = strWhereSQL.replace('${' + strItemKey + '}', strItemValue)
      } else if (strItemKey == 'LoginInstuCode') {
        // 机构编码
        strItemValue = jsoUser['instuCode'] //
        strWhereSQL = strWhereSQL.replace('${' + strItemKey + '}', strItemValue)
      } else if (strItemKey == 'LoginInstuName') {
        strItemValue = jsoUser['instuName'] //
        strWhereSQL = strWhereSQL.replace('${' + strItemKey + '}', strItemValue)
      } else {
        if (jsoCardData != undefined && jsoCardData != null) {
          let isHaveCol = jsoCardData.hasOwnProperty(
            strItemKey.toLocaleLowerCase()
          ) // 是否有该字段
          let strCardItemValue = jsoCardData[strItemKey.toLocaleLowerCase()] // 卡片中的值
          if (isHaveCol) {
            // 如果模板中有该字段才进行实际替换
            strWhereSQL = strWhereSQL.replace(
              '${' + strItemKey + '}',
              strCardItemValue
            )
          }
        }
      }
    }
  }
  return strWhereSQL //
}

// 日历选择返回的数据
export function formatDate(_date) {
  if (_date == null) {
    return ''
  }
  return this.dateFormat('yyyy-MM-dd', _date)
}

// 日历选择返回的数据
export function formatDate8(_date) {
  if (_date == null) {
    return ''
  }
  return this.dateFormat('yyyyMMdd', _date)
}

// 解析日期
export function parserDate(_str) {
  if (typeof _str === 'undefined' || _str == null || _str == '') {
    return new Date()
  }

  // 如果是8位数,则解析日期会失败,必须转换成10位数
  if (_str.length == 8) {
    _str =
      _str.substring(0, 4) +
      '-' +
      _str.substring(4, 6) +
      '-' +
      _str.substring(6, 8)
  }

  let t = Date.parse(_str)
  if (!isNaN(t)) {
    return new Date(t)
  } else {
    return null
  }
}
// YUFPUtil.dateFormat("yyyy-MM-dd hh:mm:ss",_date);
export function dateFormat(fmt, date) {
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}
// 日历选择返回的数据
export function formatTime(_date) {
  if (_date == null) {
    return ''
  }
  return this.dateFormat('yyyy-MM-dd hh:mm:ss', _date)
}
// 返回登录人员在window中的变量,
export function getLoginUserInfo() {
  let userInfo = utils.sessionStore.get('YUFP-SESSION-USER')
  userInfo.loginCode = userInfo.userCode
  userInfo.loginName = userInfo.userName
  userInfo.orgCode = userInfo.org && userInfo.org.code
  return userInfo // YuXP中的直接从YUXP-SESSION-USER取值，不再取yufp的了，因为登录时两个逻辑已经解耦独立分开了
}
// 根据序列模板id获取序列号
export function getSEQFromServer(seqId) {
  let tempNewSeq
  this.request({
    type: 'GET',
    url: backend.seqService + '/api/sequenceconfig/getseqwithtemplate', // ?seqId=' + seqId,
    async: false,
    data: { seqId: seqId },
    success: function (response) {
      if (response.code == 0) {
        tempNewSeq = Array.isArray(response.data)
          ? response.data[0]
          : response.data
      }
    }
  })
  return tempNewSeq
}
// 根据序列模板id获取带有业务参数的序列号
export function getSEQWithParamFromServer(seqId, param) {
  let tempNewSeq
  this.request({
    type: 'POST',
    url:
      backend.seqService +
      '/api/sequenceconfig/getSequenceWithTemplateWithCount/' +
      seqId +
      '/1',
    async: false,
    data: JSON.stringify(param),
    success: function (response) {
      tempNewSeq = Array.isArray(response) ? response[0] : response
    }
  })
  return tempNewSeq
}
/*
 * dom元素判断是否包含某个class
 * @param {*} el
 * @param {*} cls
 */
export function hasClass(el, cls) {
  if (!el || !cls) {
    return false
  }
  if (cls.indexOf(' ') !== -1) {
    throw new Error('className should not contain space.')
  }
  if (!el || !cls) {
    return false
  }
  if (cls.indexOf(' ') !== -1) {
    throw new Error('className should not contain space.')
  }
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

/*
 * dom元素增加class
 * @param {*} el
 * @param {*} cls
 */
export function addClass(el, cls) {
  if (!el) {
    return
  }
  if (!el) {
    return
  }
  let curClass = el.className
  let classes = (cls || '').split(' ')

  for (let i = 0, j = classes.length; i < j; i++) {
    let clsName = classes[i]
    if (!clsName) {
      continue
    }
    if (!clsName) {
      continue
    }

    if (el.classList) {
      el.classList.add(clsName)
    } else {
      if (!this.hasClass(el, clsName)) {
        curClass += ' ' + clsName
      }
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

/*
 * dom元素移除class
 * @param {*} el
 * @param {*} cls
 */
export function removeClass(el, cls) {
  if (!el || !cls) {
    return
  }
  if (!el || !cls) {
    return
  }
  let classes = cls.split(' ')
  let curClass = ' ' + el.className + ' '

  for (let i = 0, j = classes.length; i < j; i++) {
    let clsName = classes[i]
    if (!clsName) {
      continue
    }
    if (!clsName) {
      continue
    }

    if (el.classList) {
      el.classList.remove(clsName)
    } else {
      if (this.hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ')
      }
    }
  }
  if (!el.classList) {
    el.className = this.trim(curClass)
  }
}
/**
 * 去空
 * @param {*} string
 */
export function trim(string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}
/**
 * 生成UUID
 */
export function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0
    let v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
/**
 * 是否为普通对象
 * @param {*} obj
 * @return true or false
 */
export function isPlainObject(obj) {
  if (!obj || typeof obj !== 'object' || obj.nodeType || this.isWindow(obj)) {
    return false
  }
  let hasOwn = Object.prototype.hasOwnProperty
  if (
    obj.constructor &&
    !hasOwn.call(obj, 'constructor') &&
    !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')
  ) {
    return false
  }
  let key
  for (key in obj) {
    break // 对于非普通对象，不要循环N次，提升效率
  }
  return key === undefined || hasOwn.call(obj, key)
}

/**
 * 克隆（深复制）
 * @param {源对象} src
 * @param {目标对象} dest
 * @return 返回深复制后的对象
 */
export function clone(src, dest) {
  // return this.extend(true, dest, src);
  return xyutils.extend(true, dest, src)
}
/**
 * 继承（是否深度拷贝,dest,src1,src2,src3...）
 */
export function extend(...arg) {
  utils.extend(arg)
}

export function getLoginUserInfo2() {
  let jsoUser = utils.sessionStore.get('YUFP-SESSION-USER')
  let jsoUser2 = {}
  jsoUser2['userId'] = jsoUser.userId
  jsoUser2['loginCode'] = jsoUser.loginCode
  jsoUser2['userCode'] = jsoUser.userCode
  jsoUser2['userName'] = jsoUser.userName
  jsoUser2['org'] = {}
  jsoUser2['org']['id'] = jsoUser.org && jsoUser.org.id
  jsoUser2['org']['code'] = jsoUser.org && jsoUser.org.code
  jsoUser2['org']['name'] = jsoUser.org && jsoUser.org.name
  jsoUser2['org']['name'] = jsoUser.org && jsoUser.org.name
  return jsoUser2
}
export function openDialog(_title, _js, _width, _height, _pars, _callBack) {
  this.openDialogAndCloseMe(
    _title,
    _js,
    _width,
    _height,
    _pars,
    _callBack,
    false,
    true
  )
}
// 没有关闭按钮
export function openDialogNoCloseBtn(
  _title,
  _js,
  _width,
  _height,
  _pars,
  _callBack
) {
  this.openDialogAndCloseMe(
    _title,
    _js,
    _width,
    _height,
    _pars,
    _callBack,
    false,
    false
  )
}

// 关闭所有弹出窗口,并回调根窗口的回调函数
export function closeDialogAll(_returnData) {}

// 关闭本窗口,但直接回调根窗口的回调方法
export function closeDialogToRoot(_returnData) {}
// 弹出消息
export function showMsgBoxAutoClose(
  _title,
  _msg,
  _width,
  _height,
  _callback,
  _type
) {
  // 待实现
  this.showTextOrHtmlMsgBox(
    _title,
    _msg,
    false,
    _width,
    _height,
    ['确定'],
    _callback,
    true,
    _type
  )
}
// 弹出消息
export function showConfirmBox(
  _title,
  _msg,
  _width,
  _height,
  _callback,
  _type
) {
  if (!_type) {
    _type = 'warning'
  }
  this.showTextOrHtmlMsgBox(
    _title,
    _msg,
    false,
    _width,
    _height,
    ['Yes/是', 'No/否'],
    function (_index) {
      if (_index == 'confirm') {
        _callback(true)
      } else {
        _callback(false)
      }
    },
    false,
    _type
  )
}
// 弹出消息
export function showOptionBox(
  _title,
  _msg,
  _width,
  _height,
  _optionBtns,
  _callback
) {
  this.showTextOrHtmlMsgBox(
    _title,
    _msg,
    false,
    _height,
    _height,
    _optionBtns,
    _callback
  )
}
// 弹出Html消息
export function showHtmlMsgBox(_title, _html, _width, _height, _callback) {
  this.showTextOrHtmlMsgBox(
    _title,
    _html,
    true,
    _width,
    _height,
    ['确定'],
    _callback
  )
}
// 根据主键名与值,拼出where条件,考虑了联合主键的场景..
export function getWhereConditionByPK(_pkName, _rowData) {
  let strWhere = ''
  if (_pkName.indexOf(',') > 0) {
    // 如果是联合主键
    let aryPks = _pkName.split(',') // 数组
    strWhere = ' ('
    for (let i = 0; i < aryPks.length; i++) {
      strWhere = strWhere + aryPks[i] + "='" + _rowData[aryPks[i]] + "'"
      if (i != aryPks.length - 1) {
        strWhere = strWhere + ' and '
      }
    }
    strWhere = strWhere + ') '
    return strWhere
  } else {
    let strPkValue = _rowData[_pkName] // 主键值
    strWhere = ' ' + _pkName + "='" + strPkValue + "' " // 直接是
    return strWhere
  }
}
// 下载文件,类名必须继承于AbstractDownloadFile
export function downloadFile(_serviceName, _className, _fileName, _par) {}

// POST请求下载文件
export function downloadFile4Post(_url, _par) {}

// GET请求下载文件
export function downloadFile4Get(url) {}
/**
 * 身份证号码验证
 * value为当前输入框返回值
 */
export function validateIDCard(value) {
  let flag
  if (!value) {
    flag = true
  } else {
    let area = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外'
    }
    let Y, JYM
    let S, M
    let idCardArray = []
    idCardArray = value.split('')
    if (area[parseInt(value.substr(0, 2))] == null) {
      flag = false
    }
    let ereg
    // 身份号码位数及格式检验
    switch (value.length) {
      case 15:
        if (
          (parseInt(value.substr(6, 2)) + 1900) % 4 == 0 ||
          ((parseInt(value.substr(6, 2)) + 1900) % 100 == 0 &&
            (parseInt(value.substr(6, 2)) + 1900) % 4 == 0)
        ) {
          ereg =
            /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/ // 测试出生日期的合法性
        } else {
          ereg =
            /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/ // 测试出生日期的合法性
        }
        if (ereg.test(value)) {
          flag = true
        } else {
          flag = false
        }
        break
      case 18:
        // 18位身份号码检测
        // 出生日期的合法性检查
        // 闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
        // 平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
        if (
          parseInt(value.substr(6, 4)) % 4 == 0 ||
          (parseInt(value.substr(6, 4)) % 100 == 0 &&
            parseInt(value.substr(6, 4)) % 4 == 0)
        ) {
          ereg =
            /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|[X]|[x])$/ // 闰年出生日期的合法性正则表达式
        } else {
          ereg =
            /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}([0-9]|[X]|[x])$/ // 平年出生日期的合法性正则表达式
        }
        if (ereg.test(value)) {
          // 测试出生日期的合法性
          // 计算校验位
          S =
            (parseInt(idCardArray[0]) + parseInt(idCardArray[10])) * 7 +
            (parseInt(idCardArray[1]) + parseInt(idCardArray[11])) * 9 +
            (parseInt(idCardArray[2]) + parseInt(idCardArray[12])) * 10 +
            (parseInt(idCardArray[3]) + parseInt(idCardArray[13])) * 5 +
            (parseInt(idCardArray[4]) + parseInt(idCardArray[14])) * 8 +
            (parseInt(idCardArray[5]) + parseInt(idCardArray[15])) * 4 +
            (parseInt(idCardArray[6]) + parseInt(idCardArray[16])) * 2 +
            parseInt(idCardArray[7]) * 1 +
            parseInt(idCardArray[8]) * 6 +
            parseInt(idCardArray[9]) * 3
          Y = S % 11
          M = 'F'
          JYM = '10X98765432'
          M = JYM.substr(Y, 1) // 判断校验位
          if (M == idCardArray[17]) {
            flag = true
          } else {
            flag = false
          }
        } else {
          flag = false
        }
        break
      default:
        flag = false
        break
    }
  }
  return flag
}
/**
 *
 * @param {页面对象} obj
 * @param {页面方法} method
 * @param {方法参数} param
 */
export function getParentPage(vueObj, obj, method, param) {
  const parent =
    vueObj.$route.matched[vueObj.$route.matched.length - 1].instances.default
  if (obj) {
    if (parent[obj] && parent[obj][method]) {
      if (param) {
        parent[obj][method].apply(null, param)
      } else {
        parent[obj][method]()
      }
    }
  } else {
    if (parent[method]) {
      if (param) {
        parent[method].apply(null, param)
      } else {
        parent[method]()
      }
    }
  }
}
export function arrayToTree(opt, data) {
  let idField = opt.idField || 'id'
  let textField = opt.textField || 'text'
  let parentField = opt.parentField || 'pid'
  // 组装后数据的属性字段
  let label = opt.value || 'label'
  let id = opt.key || 'id'
  // 辅助主键：以逗号分隔。例如：id为主键，id1、id2为辅助主键，idField:'id',keyFields:'id1,id2'
  let keyFields = opt.keyFields || ''

  function getPre(data) {
    let temp = ''
    // 如果存在辅助主键
    if (keyFields) {
      let fields = keyFields.split(',')
      for (let i = 0; i < fields.length; i++) {
        temp += data[fields[i]] + '-'
      }
    }
    return temp
  }
  let i
  let l
  let treeData = []
  let tmpMap = {}
  for (i = 0, l = data.length; i < l; i++) {
    tmpMap[getPre(data[i]) + data[i][idField]] = data[i]
  }
  for (i = 0, l = data.length; i < l; i++) {
    let parent = tmpMap[getPre(data[i]) + data[i][parentField]] // 根据联合主键确定父节点
    if (parent && data[i][idField] != data[i][parentField]) {
      if (!parent['children']) {
        parent['children'] = []
      }
      data[i][label] = data[i][textField]
      data[i][id] = getPre(data[i]) + data[i][idField] // 构建联合主键
      parent['children'].push(data[i])
    } else {
      data[i][label] = data[i][textField]
      data[i][id] = getPre(data[i]) + data[i][idField]
      treeData.push(data[i])
    }
  }
  return treeData
}
/**
 * 解决页面中parent.parent.xxx的问题
 * @param {页面对象} obj
 * @param {页面方法} method
 * @param {方法参数} param
 */
export function getParentPage2(obj, method, param) {}
// 转默认值公式方法
export function getDefaultformulaData(formula) {
  const userInfo = this.getLoginUserInfo()
  if (formula.startsWith('$')) {
    const aryItems = formula.substr(1)
    if (aryItems) {
      if (aryItems == 'LoginUserId') {
        return userInfo['userId']
      } else if (aryItems == 'LoginLoginCode') {
        return userInfo['userCode']
      } else if (aryItems == 'LoginUserCode') {
        return userInfo['userCode']
      } else if (aryItems == 'LoginUserName') {
        return userInfo['userName']
      } else if (aryItems == 'LoginOrgId') {
        return userInfo['org'] && userInfo['org'].id
      } else if (aryItems == 'LoginOrgCode') {
        return userInfo['org'] && userInfo['org'].code
      } else if (aryItems == 'LoginOrgName') {
        return userInfo['org'] && userInfo['org'].name
      } else if (aryItems == 'LoginInstuId') {
        return userInfo['instu'] && userInfo['instu'].id
      } else if (aryItems == 'LoginInstuCode') {
        return userInfo['instu'] && userInfo['instu'].code
      } else if (aryItems == 'LoginInstuName') {
        return userInfo['instu'] && userInfo['instu'].name
      } else if (aryItems == 'CURRTIME') {
        let date = new Date()
        return dateFormat('yyyy-MM-dd hh:mm:ss', date)
      } else if (aryItems == 'CURRDATE') {
        let date = new Date()
        return dateFormat('yyyy-MM-dd', date)
      } else {
        console.error('默认值公式不支持的' + formula)
      }
    }
  } else if (formula.startsWith('get')) {
    if (formula.indexOf('getCurrDate()') > -1) {
      return new Date()
    } else if (formula.indexOf('getLoginUserLoginCode()') > -1) {
      return userInfo['userCode']
    } else if (formula.indexOf('getLoginUserOrgCode()') > -1) {
      return userInfo['org'] && userInfo['org'].code
    } else if (formula.indexOf('getSequence(') > -1) {
      formula = formula.replace('getSequence(', '').replace(')', '')
      return this.getSEQFromServer(formula)
    } else {
      console.error('默认值公式不支持的' + formula + '请确认是否还需要！！')
    }
  } else if (formula.startsWith('SEQ:')) {
    let strSeqId = formula.substring(4, formula.length)
    return this.getSEQFromServer(strSeqId)
  } else if (formula === 'UUID') {
    // UUID 前端不处理了
    return getUUID()
  } else {
    return formula
  }
}
/**
 * 根据值推出key
 */
export function getInputKey(id) {
  for (let item in this.mapping) {
    if (this.mapping[item] == id) {
      return item
    }
  }
}
// 获取根据name获取formitem项
export function getItemRef(children, name) {
  if (!children || (children && children.length === 0)) {
    return null
  }
  let realEl = null
  for (let i = 0; i < children.length; i++) {
    let el = children[i]
    if (el.name && el.name === name) {
      realEl = el
      break
    } else {
      realEl = this.getItemRef(el.$children, name)
      if (realEl) {
        break
      }
    }
  }
  return realEl
}

// form表单下面配置了fuzzy-query熟悉的字段 加上对应的 % 并返回加了%后的数据对象, 参数 - form: 表单实例, formData: 表单深克隆的数据对象
export function getFuzzyFormData(form, formData) {
  if (!form.$children || form.$children.length === 0) {
    return
  }
  let hadFoundFormItem = false
  for (let i = 0, length = form.$children.length; i < length; i++) {
    const item = form.$children[i]
    if (item.name && formData[item.name] && item.formdata) {
      hadFoundFormItem = true
      switch (item.fuzzyQuery) {
        case 'left':
          formData[item.name] = '%' + formData[item.name]
          break
        case 'right':
          formData[item.name] = formData[item.name] + '%'
          break
        case 'both':
          formData[item.name] = '%' + formData[item.name] + '%'
          break
        default:
          break
      }
    } else if (!hadFoundFormItem && item.$children && item.$children) {
      this.getFuzzyFormData(item, formData)
    }
  }
  return formData
}

export default xyutils
