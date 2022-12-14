import { MessageBox, Message } from 'yuwp-ui'
import { sessionStore, request, lookup, storage } from '@/utils/util'
import XLSX from 'xlsx'
import { theme, menumodel, ssl, url } from '@/config'
import { getToken, getContrs } from '@/utils/oauth'
import frameConfig from '@/config/frame'
// import { auditlogdata } from '@/api/common/monitor'
import { MENU_STOREOG_KEY } from '@/config/constant/app.data.common'
// import { getLanguage } from '@/utils/i18n'
import router from '@/router'

/**
 * 根据路由 查找路由对象
 * @param {*} route
 * @returns
 */
export function getOpenMenuTab(route) {
  if (!route) {
    return ''
  }
  let router = yufp.router.getRoute(route)
  if (router) {
    return [router]
  }
}

// 控制点公共方法
export function checkCtrl(ctrlCode, menuId, isView) {
  let ctrls = getContrs()
  menuId = menuId || router.history.current.meta.routeId
  if (!ctrlCode || !ctrls || !menuId) {
    return false
  }
  let ctrlItem = ctrls.filter((item) => {
    return item.funcId === menuId && item.contrCode === ctrlCode
  })
  if (ctrls && menuId && !ctrlItem.length) {
    return true
  }
  return false
}

/**
 * 显示信息
 * @param {string} msg 待显示的信息
 * @param {String} type 显示信息类型 error|warning|info|success
 * @param {Integer} duration 显示信息长度,单位秒,默认5秒
 */
export function showMessage(msg, type = 'error', duration = 5) {
  msg &&
    Message({
      message: msg,
      type: type,
      duration: duration * 1000
    })
}
/**
 * 显示信息
 * @param {string} msg 待显示的信息
 * @param {String} type 显示信息类型 error|waring|info|success
 */
export function showMessageAlert(msg, type = 'error') {
  msg &&
    MessageBox({
      message: msg,
      type: type
    })
}

// 判断浏览器类型
export function getBrowserType() {
  let userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
  if (userAgent.indexOf('OPR') > -1) {
    return 'Opera'
  } // 判断是否Opera浏览器 OPR/43.0.2442.991
  if (userAgent.indexOf('Firefox') > -1) {
    return 'FF'
  } // 判断是否Firefox浏览器  Firefox/51.0
  if (userAgent.indexOf('Trident') > -1) {
    return 'IE'
  } // 判断是否IE浏览器  Trident/7.0; rv:11.0
  if (userAgent.indexOf('Edge') > -1) {
    return 'Edge'
  } // 判断是否Edge浏览器  Edge/14.14393
  if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome'
  } // Chrome/56.0.2924.87
  if (userAgent.indexOf('Safari') > -1) {
    return 'Safari'
  } // 判断是否Safari浏览器 AppleWebKit/534.57.2 Version/5.1.7 Safari/534.57.2
}

/**
 * js导出excel
 * 方法参数为一个Object, 包含以下属性：
 * ref: xtable对应的vue对象ref
 * importType: selected: 选中行的数据；page: 当前页面展示的所有表格数据；service：根据传递的参数从服务端获取要导出的数据
 * method: 从服务端获取要导出的数据时的请求method
 * url: 从服务端获取要导出的数据时的请求url
 * param: 从服务端获取要导出的数据时的请求参数
 * fileName: 导出文件名
 * importHidCloum: true/false 是否导出隐藏列，默认导出
 * stringifyNum: true/false 是否转换数字单元格内容为文本，以防止大数字显示为科学计数，默认为false
 * FAQ: 对于多表头的列，
 * 只有最底层的子节点可以配置prop属性，
 * 非最底层的不可以配置prop属性，
 * 整个表格的prop不可以重复，
 * 当表格使用了插槽的时候，会导致表格列的数据结构发生变化，现有方法不能满足使用插槽的表格导出
 * @author lvzl
 * @returns {*}
 */
export function exportExcelByTable(options) {
  // const {log} = console;
  options.importHidCloum = options.importHidCloum || true
  let tableRef = options.ref
  let colums = tableRef.tableColumns
  let tableColumns = colums.concat([])
  if (!options.importHidCloum) {
    removeHidCloums(tableColumns)
  }
  // 移除隐藏列
  function removeHidCloums(arr) {
    if (!arr || !Array.isArray(arr)) {
      return new Error('参数类型必须是数组')
    }
    for (let i = 0; i < arr.length; i++) {
      let element = arr[i]
      if (element.hideColumn) {
        arr.splice(i, 1)
      }
      if (
        element.children &&
        Array.isArray(element.children) &&
        element.children.length > 0
      ) {
        removeHidCloums(element.children)
      }
    }
  }
  /** 输出计算的结果 */
  // log('初始状态的tableColumns', JSON.stringify(tableColumns));
  let collectionHtml = tableRef.$el
    .getElementsByClassName('el-table__header-wrapper')[0]
    .getElementsByTagName('tr')
  /** ----------------------------------> 1.获取表头行列数，给表头每个单元格设置行列合并数rowspan/colspan <------------------------------------------ */
  // 获取表头行数和列数（包含多级表头）
  function getRowAndCol(list) {
    if (!list || !Array.isArray(list)) {
      return new Error('参数类型必须是数组')
    }
    let haveSubCellList = [] // 存储每个多级表头整体的行列数信息
    for (let i = 0; i < list.length; i++) {
      if (list[i].children) {
        haveSubCellList.push(getMaxFloor(list[i].children))
      }
    }
    // 含有多个多级表头时获取最大的行数
    let maxRow
    if (haveSubCellList.length > 0) {
      maxRow = Math.max.apply(null, haveSubCellList) + 1
    } else {
      maxRow = 1
    }
    return { rowCount: maxRow, colCount: maxColCount(list) }
  }
  // 计算colCount
  function maxColCount(column) {
    if (!column || !Array.isArray(column)) {
      return new Error('参数类型必须是数组')
    }
    let colCount = 0 // colCount: 横向最底层单元格列数
    for (let i = 0; i < column.length; i++) {
      let element = column[i]
      if (
        element.children &&
        Array.isArray(element.children) &&
        element.children.length > 0
      ) {
        let childrenColCount = maxColCount(element.children)
        colCount += childrenColCount // 横向叠加计算总列数
      } else {
        colCount++
      }
    }
    return colCount
  }
  //  计算多表头的rowCount
  function getMaxFloor(treeData) {
    // let floor = 0;
    // let v = this;
    let max = 0
    function each(data, floor) {
      data.forEach(function (e) {
        e.floor = floor
        if (floor > max) {
          max = floor
        }
        if (e.children && Array.isArray(e.children) && e.children.length > 0) {
          each(e.children, floor + 1)
        }
      })
    }
    each(treeData, 1)
    return max
  }
  // 获取整个完整表头的行列数
  let cellData = getRowAndCol(tableColumns)
  /** 输出计算的结果 */
  // log('整个表头的行列数:', JSON.stringify(cellData));
  // 给表头每个单元格设置行列合并数量信息rowspan行 colspan列
  let maxcolspan = function (list) {
    if (list && Array.isArray(list) == true) {
      for (let i = 0; i < list.length; i++) {
        let element = list[i]
        let children = element.children
        let childrenColCount
        if (children) {
          childrenColCount = maxColCount(children) // 获取当前单元格的子单元格行列数
        }
        if (children && Array.isArray(children) && children.length > 0) {
          // 存在子节点
          element.rowspan = 0
          element.colspan = childrenColCount - 1
          getChildColspan(children)
        } else {
          // 不存在子节点
          element.colspan = 0
          element.rowspan = cellData.rowCount - 1
        }
      }
    }
  }
  function getChildColspan(list) {
    let listRowCount = getMaxFloor(list) // 获取当前list的占用单元格的行数和列数
    let rowIndex = cellData.rowCount - listRowCount
    if (list && Array.isArray(list) == true) {
      for (let i = 0; i < list.length; i++) {
        let element = list[i]
        let children = element.children
        let childrenColCount
        if (children) {
          childrenColCount = maxColCount(children) // 获取当前单元格的子单元格行列数
        }
        if (children && Array.isArray(children) && children.length > 0) {
          // 存在子节点
          element.colspan = childrenColCount - 1
          element.rowspan = 0
          getChildColspan(children)
        } else {
          // 不存在子节点
          element.rowspan =
            listRowCount - rowIndex <= 0 ? 0 : listRowCount - rowIndex
          element.colspan = 0
        }
      }
    }
  }
  maxcolspan(tableColumns)
  /** 输出计算的结果 */
  // let arr = [];
  // for (let i = 0; i < tableColumns.length; i++) {
  //   arr.push({label: tableColumns[i].label, colspan: tableColumns[i].colspan, rowspan: tableColumns[i].rowspan});
  // }
  // log('每个单元格的colspan&rowspan:', JSON.stringify(arr));
  /** ----------------------------------> 2.获取所有表头字段名label <------------------------------------------ */
  // 存储所有表头字段名
  let headLabel = [] // 所有表头的label，prop，没有prop就取''.
  let havePropArr = [] // 所有表头字段的prop
  let haveOptions = [] // 所有含有options的prop
  function getHeadLabel(list) {
    if (!list || !Array.isArray(list)) {
      return new Error('参数类型必须是数组')
    }
    for (let i = 0; i < list.length; i++) {
      if (list[i].label) {
        headLabel.push({ label: list[i].label, prop: list[i].prop || '' })
        if (list[i].prop) {
          havePropArr.push({ prop: list[i].prop })
          if (list[i].options) {
            haveOptions.push({ prop: list[i].prop, options: list[i].options })
          }
        }
        if (list[i].children && Array.isArray(list[i].children)) {
          getHeadLabel(list[i].children) // 递归子表头数据
        }
      }
    }
  }
  getHeadLabel(tableColumns)
  /** 输出计算的结果 */
  // log('所有label:', JSON.stringify(headLabel));
  // log('所有有prop属性的label:', JSON.stringify(havePropArr));
  /** ----------------------------------> 3.设置表头每个表头单元格的行列起始信息 <------------------------------------------ */
  let mergeCellDataList = [] // 存放表头每个单元格的行列起始信息
  function genCellPlace() {
    return {
      // 定义单元格的起止行列
      s: {
        // s为开始
        c: 0, // 开始列
        r: 0 // 开始行
      },
      e: {
        // e结束
        c: 0, // 结束列
        r: 0 // 结束行
      }
    }
  }
  /**
   * 设置表头每个表头单元格的行列起始信息
   * @param {Array} list 表头列组成的数据
   * @param {Number} subLength 当前表头有几个子表头（不含子表头的子表头的标志）
   */
  function getMerges(list) {
    if (!list || !Array.isArray(list)) {
      return new Error('参数类型必须是数组')
    }
    let lastEc = 0
    for (let i = 0; i < list.length; i++) {
      let element = list[i]
      let cellPlace = genCellPlace()
      let children = element.children
      if (children && Array.isArray(children) && children.length > 0) {
        // 存在子节点
        if (i == 0) {
          // 第一列就是多表头的处理
          cellPlace.s.c = lastEc > i ? lastEc : i
        } else {
          cellPlace.s.c = lastEc + 1
        }
        cellPlace.s.r = element.rowspan
        cellPlace.e.c = cellPlace.s.c + element.colspan
        cellPlace.e.r = element.rowspan
        lastEc = cellPlace.e.c
        mergeCellDataList.push(cellPlace)
        getChildMerges(children, cellPlace.s.c)
      } else {
        // 没有子节点的一级表头
        lastEc = lastEc > i ? lastEc : i
        cellPlace.s.c = getCellPlaceSC(element.prop)
        cellPlace.s.r = element.colspan
        cellPlace.e.c = cellPlace.s.c
        cellPlace.e.r = element.rowspan
        lastEc = cellPlace.e.c
        mergeCellDataList.push(cellPlace)
      }
    }
  }
  function getChildMerges(list, lastColIndex) {
    let listRowCount = getMaxFloor(list) // 获取当前list的占用单元格的行数和列数
    let rowIndex = cellData.rowCount - listRowCount
    let lastEc = lastColIndex
    for (let i = 0; i < list.length; i++) {
      let element = list[i]
      let cellPlace = genCellPlace()
      let children = element.children
      if (children && Array.isArray(children) && children.length > 0) {
        // 存在子节点
        if (i < 1) {
          cellPlace.s.c = lastEc > lastColIndex ? lastEc + 1 : lastEc
        } else {
          cellPlace.s.c = lastEc + 1
        }
        cellPlace.s.r = rowIndex
        cellPlace.e.c = cellPlace.s.c + element.colspan
        cellPlace.e.r = rowIndex
        lastEc = cellPlace.e.c
        mergeCellDataList.push(cellPlace)
        getChildMerges(children, cellPlace.s.c)
      } else {
        if (element.prop) {
          cellPlace.s.c = getCellPlaceSC(element.prop)
        } else {
          cellPlace.s.c = lastEc > lastColIndex ? lastEc + 1 : lastEc
        }
        cellPlace.s.r = rowIndex
        cellPlace.e.c = cellPlace.s.c
        cellPlace.e.r = rowIndex + element.rowspan
        lastEc = cellPlace.e.c
        mergeCellDataList.push(cellPlace)
      }
    }
  }
  function getCellPlaceSC(prop) {
    let index = 0
    if (prop) {
      for (let i = 0; i < havePropArr.length; i++) {
        let element = havePropArr[i]
        if (element.prop === prop) {
          index = i
          break
        }
      }
    } else {
      return 0
    }
    return index
  }
  getMerges(tableColumns)
  // log('每个表头单元格的行列起始信息:', JSON.stringify(mergeCellDataList));
  /** ----------------------------------> 4.表头单元格对应到excel中的位置排列(包括列数超出26处理)，比如A1 B1...AA1 AB1 AC1 <------------------------------------- */
  let l = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let letter = l.split('')
  // 表头数量超过26个
  if (cellData.colCount > l.length) {
    for (
      let len = cellData.colCount - l.length,
        ln = parseInt(len / l.length),
        k = 0;
      k <= ln;
      k++
    ) {
      for (let i = 0; i < Math.min(len, l.length); i) {
        letter.push(letter[k] + '' + letter[i++])
      }
    }
  }
  /** ----------------------------------> 5.设置所有表头单元格对应excel的单元格位置信息 <------------------------------------- */
  // 表头单元格对应excel的位置 ，比如 A1 B1 C1 ...
  let headSheel = []
  /**
   * 设置所有表头单元格对应excel的单元格位置信息
   * @param {Array} list 表头每个单元格的行列起始信息组成的数据
   */
  function getHeadcellPosition(list) {
    if (!list || !Array.isArray(list)) {
      return new Error('参数类型必须是数组')
    }
    for (let i = 0; i < list.length; i++) {
      let obj = list[i]
      headSheel.push(letter[obj.s.c] + (obj.s.r + 1)) // 根据单元格的起始行和起始列来对应excel的位置
    }
  }
  getHeadcellPosition(mergeCellDataList)
  // log('表头单元格对应excel的位置:', JSON.stringify(headSheel));
  /** ----------------------------------> 6.获取要导出的数据 <------------------------------------- */
  let data = []
  let tableData = []
  // 导出方式
  if (options.importType == 'page') {
    // updated by taoting1 on 20200211
    // 解决导出无法取得表格数据的情况
    tableData = tableRef.tabledata
  } else if (options.importType == 'selected') {
    tableData = tableRef.selections
  } else if (options.importType == 'service') {
    request({
      url: options.url,
      async: false,
      data: options.param,
      method: options.method ? options.method : 'GET'
    }).then((code, message, response) => {
      // 处理请求成功的情况
      if (options.jsonData) {
        let tmp = options.jsonData.split('.')
        let obj = response
        for (let z = 0; z < tmp.length; z++) {
          if (!obj) {
            break
          }
          obj = obj[tmp[z]]
        }
        tableData = obj
      } else {
        tableData = response.data
      }
    })
  }
  /** ----------------------------------> 7.列字段中对数据字典的翻译 <------------------------------------- */
  /**
   * 获取实际对应数据的列字段名称
   * @param {String} name 某一列的label属性对应的中文名
   * @return {String} 某一列的label属性对应的prop英文字段
   */
  // 存放表头最底层实际对应数据的列字段prop 比如['id','title','username'...]
  let headList_ = []
  // 循环获取表头最底层实际对应数据的列字段prop存储于headList数组
  for (let j = 0; j < havePropArr.length; j++) {
    let key = havePropArr[j].prop
    headList_[headList_.length] = key
  }

  /**
   * 获取列的数据字典
   * @param {String} column 某一列的label属性对应的中文名
   * @param {Array} tableColumns 表头列数组
   * @return {String} 数据字典dataCode
   */
  let getColumnsDataCode = function (column, tableColumns) {
    let code
    for (let i = 0; i < tableColumns.length; i++) {
      if (
        tableColumns[i].children &&
        tableColumns[i].children instanceof Array == true
      ) {
        code = getColumnsDataCode(column, tableColumns[i].children)
        if (code != undefined && code != null) {
          break
        }
      } else {
        if (column == tableColumns[i].prop) {
          code = tableColumns[i].dataCode || ''
          break
        }
      }
    }
    return code
  }
  // 翻译数据字典字段
  for (let i = 0; i < tableData.length; i++) {
    let o = {}
    let rowData = tableData[i]
    for (let j = 0; j < headList_.length; j++) {
      let k = headList_[j]
      let code = getColumnsDataCode(k, tableColumns)
      if (code) {
        let val = lookup.convertKey(code, rowData[k])
        o['' + k + ''] = val // 如果配置了字典项则为翻译后的值
      } else {
        o['' + k + ''] = rowData[k] // 没配置字典项为原始值
      }
    }
    for (let index = 0; index < haveOptions.length; index++) {
      let element = haveOptions[index]
      let value = getValByKey(rowData[element.prop], element.options)
      o[element.prop] = value
    }
    data.push(o)
  }
  function getValByKey(key, options) {
    if (!key) {
      return
    }
    if (!options || !Array.isArray(options)) {
      return key
    }
    let val
    for (let i = 0; i < options.length; i++) {
      let element = options[i]
      if (element.key === key) {
        val = element.value
        break
      }
    }
    return val
  }
  // TODO 有待了解插入空对象原因，但是如果删掉会导致导出数据的前两条丢失
  for (let i = 1; i < collectionHtml.length; i++) {
    data.unshift({})
  }
  /** ----------------------------------> 8.导出相关数据构造 <------------------------------------- */
  let saveAs = function (obj, fileName) {
    // 当然可以自定义简单的下载文件实现方式
    let tmpa = document.createElement('a')
    tmpa.download = fileName || '下载'
    tmpa.href = URL.createObjectURL(obj) // 绑定a标签
    tmpa.click() // 模拟点击实现下载
    setTimeout(function () {
      // 延时释放
      URL.revokeObjectURL(obj) // 用URL.revokeObjectURL()来释放这个object URL
    }, 100)
  }
  // 字符串转字符流
  let s2ab = function (s) {
    if (typeof ArrayBuffer !== 'undefined') {
      let buf = new ArrayBuffer(s.length)
      let view = new Uint8Array(buf)
      for (let i = 0; i != s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xff
      }
      return buf
    } else {
      let buf = new Array(s.length)
      for (let i = 0; i != s.length; ++i) {
        buf[i] = s.charCodeAt(i) & 0xff
      }
      return buf
    }
  }
  let wb = {
    SheetNames: ['Sheet1'],
    Sheets: {},
    Props: {}
  }
  data = XLSX.utils.json_to_sheet(data)
  for (let i = 0; i < headSheel.length; i++) {
    data[headSheel[i]] = { t: 's', v: headLabel[i].label }
  }
  // 如果单元格是数字，将数字转换成字符串，防止导出后成为科学计数显示格式
  if (options.stringifyNum) {
    Object.keys(data).forEach((item) => {
      const cell = data[item]
      if (cell.t === 'n') {
        cell.t = 's'
        cell.v = cell.v.toString()
      }
    })
  }

  data['!merges'] = mergeCellDataList
  wb.Sheets['Sheet1'] = data
  let wopts = { bookType: 'xlsx', bookSST: true, type: 'binary' } // 这里的数据是用来定义导出的格式类型
  let blob = new window.Blob([s2ab(XLSX.write(wb, wopts))], {
    type: 'application/octet-stream'
  })
  let filename =
    options.fileName +
    '.' +
    (wopts.bookType == 'biff2' ? 'xls' : wopts.bookType)
  let browser = getBrowserType()
  if (browser == 'IE') {
    window.navigator.msSaveBlob(blob, filename)
  } else {
    saveAs(blob, filename)
  }
  // 导出后置空
  tableRef =
    colums =
    tableColumns =
    collectionHtml =
    getColumnsDataCode =
    saveAs =
    s2ab =
    options =
      null
}

/**
 * 获取默认皮肤对象
 */
export function getDefaultTheme() {
  const themes = frameConfig.baseFrameOptions.themesList.filter((item) => {
    return item.id === theme
  })
  return themes.length > 0 ? themes[0] : null
}
/**
 * 获取默认布局对象
 */
export function getDefaultMenuModel() {
  const model = frameConfig.baseFrameOptions.modelList.filter((item) => {
    return item.id === menumodel
  })
  return model.length > 0 ? model[0] : null
}
/**
 * 获取当前选中系统名称
 */
export function getSystemName() {
  let systemName = sessionStore.get('currentApp')
  if (systemName) {
    return systemName['applicationName']
  } else if (frameConfig.baseFrameOptions.appOptions.length > 1) {
    return frameConfig.baseFrameOptions.appOptions[0]['applicationName']
  }
  return ''
}
/**
 * 获取全路径
 */
export function getUrl(param) {
  let paramUrl = param.url || param.name
  if (!paramUrl) {
    throw new Error('service.request: 未设置请求URL')
  }
  const reg = /^(http|https):\/\//
  // url请求未附带http(s)://前缀，则按yufp.settings.url及ssl添加前缀
  if (!reg.test(paramUrl)) {
    let protocol
    let prefixUrl = url || ''
    // yufp.settings.url 非空，即非默认同源模式，计算服务端URL源路径
    if (prefixUrl) {
      if (reg.test(prefixUrl)) {
        protocol = ''
      } else if (ssl) {
        protocol = 'https://'
      } else {
        protocol = 'http://'
      }
      prefixUrl = protocol + prefixUrl
    }
    paramUrl = `/${paramUrl}`.replace(/^\/\//, '/') // 添加前缀
    paramUrl = (window.yufp.basePath || '') + paramUrl // 添加basePath
    paramUrl = prefixUrl + paramUrl // 组合origin
  }
  return paramUrl
}

/**
 * 为url添加token信息
 * @param url
 * @returns {string}
 */
export function addTokenInfo(path) {
  let token = 'access_token='
  let _url = ''
  if (path === null || path === '') {
    return _url
  }

  if (!path.indexOf(token) > -1) {
    _url =
      path +
      (path.indexOf('?') > -1 ? '&' : '?') +
      token +
      getToken().access_token
  }
  return _url
}
/**
 * 下载文件
 */
export function download(path) {
  if (path) {
    if (path.indexOf('http') <= -1) {
      // 当不包含http时拼接gateway地址
      path = getUrl({
        url: path
      })
    }
  } else {
    showMessage('必须设置请求url!', 'warning')
  }
  // url添加token
  path = addTokenInfo(path)
  // 模拟a标签进行下载
  const a = document.createElement('a')
  a.target = 'download'
  a.href = path
  a.click()
  if (window.fireEvent) {
    window.open(a.href)
  } else {
    // ie 浏览器createElement创建的是一个对象，需要添加到一个元素后面，去掉原a.click() liujie1 20191106
    let body = document.body
    body.appendChild(a).click()
    // 然后移除
    body.removeChild(a)
  }
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className, oid) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  // 替换2个以上的空格为一个空格 解决\s+正则替换出现样式无空格问题
  classString = classString.replace(/\s{1,}/g, ' ').replace(oid, '')
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += ' ' + className
  } else {
    // 旧id存在时，才做替换，解决空样式替换出现的主题色消失问题
    oid &&
      (classString =
        classString.substr(0, nameIndex) +
        classString.substr(nameIndex + className.length))
  }
  element.className = classString
}

/**
 * 切换皮肤
 * @param {String} theme 选中皮肤
 */
export function changeTheme(theme, oid) {
  const th = theme.id
  try {
    require(`@/assets/${th}/dist.min.css`)
    toggleClass(document.body, th, oid)
  } catch (error) {
    toggleClass(document.body, th, oid)
  }
}
/**
 * 更新界面是否紧凑模式
 * @param {Boolean} isCompact 是否紧凑模式
 */
export function changeSizeModel(isCompact) {
  // const target = document.getElementsByTagName('link');
  const dom = document.querySelector('.yu-frame-body') // dom结构
  const newClas = isCompact ? 'compact' : 'normal' // 新样式
  const oldClas = !isCompact ? 'compact' : 'normal' // 旧样式
  // 切换样式
  toggleClass(dom, newClas, oldClas)
}
/**
 * 格式化时间
 */
// export function parseTime(time, cFormat) {
//   if (arguments.length === 0) {
//     return null
//   }
//   const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
//   let date
//   if (typeof time === 'object') {
//     date = time
//   } else {
//     if (('' + time).length === 10) {
//       time = parseInt(time) * 1000
//     }
//     date = new Date(time)
//   }
//   const formatObj = {
//     y: date.getFullYear(),
//     m: date.getMonth() + 1,
//     d: date.getDate(),
//     h: date.getHours(),
//     i: date.getMinutes(),
//     s: date.getSeconds(),
//     a: date.getDay()
//   }
//   const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, function (result, key) {
//     let value = formatObj[key]
//     if (key === 'a') {
//       return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
//     }
//     if (result.length > 0 && value < 10) {
//       value = '0' + value
//     }
//     return value || 0
//   })
//   return timeStr
// }
/**
 * 将时间转成字符串
 */
// export function formatTime(time) {
//   return (
//     (time.hours < 10 ? '0' + time.hours : time.hours) +
//     ':' +
//     (time.minutes < 10 ? '0' + time.minutes : time.minutes)
//   )
// }
/**
 * 获取基础路径配置信息
 */
export function getBaseUrl() {
  const devEnv = process.env.NODE_ENV === 'development' // 开发环境
  const baseApi = process.env.VUE_APP_BASE_API // 应用服务前缀URL
  const proxyPrefix = '' // process.env.VUE_APP_PROXY_PREFIX // 代理API前缀
  const match = /^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?/i // 匹配URL(协议+域名+端口)
  const matchResult = match.exec(baseApi)
  return devEnv && matchResult ? proxyPrefix + (matchResult[4] || '') : baseApi
}
/**
 * 获取公钥字符串
 */
export function getRSAPublicKey() {
  return 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDAYwQ81rc1KW8tTYpxrLS3ArVxB40otmbWyXwgDQRkLsCuQKiq6KZgAM/8sJuI12S1JVOXnMu5d420vKFFS/+Ibz4TxqjhLmgownaguMTbAGBzIPvfN5lL52mDmm/CvKu2YPCFvZV8YulNTCexvuj7OiWRUXpAbaQqu5tPOjGytQIDAQAB'
}
/**
 * @created by zhangkun6
 * @updated by 2018/01/14
 * @description 数字金额格式化(千分位)
 */
export function moneyFormatter(money, num) {
  /*
   * 参数说明：
   * money：要格式化的数字
   * num：保留几位小数
   * */
  num = num > 0 && num <= 20 ? num : 2
  money = parseFloat((money + '').replace(/[^\d.-]/g, '')).toFixed(num) + ''
  const l = money.split('.')[0].split('').reverse()
  const r = money.split('.')[1]
  let t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? ',' : '')
  }
  return t.split('').reverse().join('') + '.' + r
}

/**
 * @created by zhangkun6
 * @updated by 2018/05/03
 * @description 数值百分比显示
 */
export function toPercent(money, num) {
  /*
   * 参数说明：
   * money：要格式化的数字
   * num：保留几位小数
   */
  // num = num > 0 && num <= 20 ? num : 2;
  money = parseFloat(money + '') + '%'
  return money
}

/**
 * @created by zhangkun6
 * @updated by 2018/01/14
 * @description 数字金额转汉字金额
 */
export function moneyToUpper(money) {
  /*
   * 参数说明：
   * money：要转化的数字
   */
  // 汉字的数字
  let cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  // 基本单位
  let cnIntRadice = ['', '拾', '佰', '仟']
  // 对应整数部分扩展单位
  let cnIntUnits = ['', '万', '亿', '兆']
  // 对应小数部分单位
  let cnDecUnits = ['角', '分', '毫', '厘']
  // 整数金额时后面跟的字符
  let cnInteger = '整'
  // 整型完以后的单位
  let cnIntLast = '元'
  // 最大处理的数字
  let maxNum = 999999999999999.9999
  // 金额整数部分
  let integerNum
  // 金额小数部分
  let decimalNum
  // 输出的中文金额字符串
  let chineseStr = ''
  // 分离金额后用的数组，预定义
  let parts
  if (money === '') {
    return ''
  }
  money = parseFloat(money)
  if (money >= maxNum) {
    // 超出最大处理数字
    return ''
  }
  if (money === 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger
    return chineseStr
  }
  // 转换为字符串
  money = money.toString()
  if (money.indexOf('.') === -1) {
    integerNum = money
    decimalNum = ''
  } else {
    parts = money.split('.')
    integerNum = parts[0]
    decimalNum = parts[1].substr(0, 4)
  }
  // 获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0
    const IntLen = integerNum.length
    for (let i = 0; i < IntLen; i++) {
      const n = integerNum.substr(i, 1)
      const p = IntLen - i - 1
      const q = p / 4
      const m = p % 4
      if (n === '0') {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0]
        }
        // 归零
        zeroCount = 0
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
      }
      if (m === 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q]
      }
    }
    chineseStr += cnIntLast
  }
  // 小数部分
  if (decimalNum !== '') {
    const decLen = decimalNum.length
    for (let i = 0; i < decLen; i++) {
      const n = decimalNum.substr(i, 1)
      if (n !== '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i]
      }
    }
  }
  if (chineseStr === '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger
  } else if (decimalNum === '') {
    chineseStr += cnInteger
  }
  return chineseStr
}

/**
 * @created by zhangkun6
 * @updated by 2018/01/19
 * @description 汉字金额转数字金额
 */
export function upperToMoney(upper) {
  /*
   * 参数说明：
   * upper：要转化的汉字
   */
  // 金额数值
  const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  // 汉字的数字
  const cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  // 对应单位的乘积
  const upperMap = [10, 100, 1000]
  // 基本单位
  const cnIntRadice = ['拾', '佰', '仟']
  // 对应整数部分扩展单位
  // let cnIntUnits = ['万', '亿', '兆'];
  // 对应小数部分单位乘积
  const cnDecMap = [0.1, 0.01]
  // 对应小数部分单位
  const cnDecUnits = ['角', '分']
  // 金额单位亿之前的数值数组
  let maxArray = []
  // 金额单位亿和万之间的数值数组
  let middleArray = []
  // 金额单位万和元之间的数值数组
  let minArray = []

  const part = upper.split('元')
  // 金额整数部分
  const integerNum = part[0]
  // 金额小数部分
  const decimalNum = part[1].split('')
  if (integerNum.indexOf('亿') !== -1) {
    maxArray = integerNum.split('亿')[0].split('')
    if (integerNum.indexOf('万') !== -1) {
      middleArray = integerNum.split('亿')[1].split('万')[0].split('')
      minArray = integerNum.split('亿')[1].split('万')[1].split('')
    } else {
      minArray = integerNum.split('亿')[1].split('')
    }
  } else if (integerNum.indexOf('万') !== -1) {
    middleArray = integerNum.split('万')[0].split('')
    minArray = integerNum.split('万')[1].split('')
  } else {
    minArray = integerNum.split('')
  }
  const getNum = function (upArray, cnNums, cnRadice, numArray, map) {
    const length = upArray.length
    let num = 0
    let sum = 0
    for (let i = 0; i < length; i++) {
      const index = cnNums.indexOf(upArray[i])
      const _index = cnRadice.indexOf(upArray[i])
      if (index !== -1) {
        num += numArray[index]
        if (i === length - 1) {
          sum += num
        }
      }
      if (_index !== -1) {
        num *= map[_index]
        sum += num
        num = 0
      }
    }
    return sum
  }
  const maxSum = getNum(maxArray, cnNums, cnIntRadice, num, upperMap)
  const middleSun = getNum(middleArray, cnNums, cnIntRadice, num, upperMap)
  const minSun = getNum(minArray, cnNums, cnIntRadice, num, upperMap)
  const cesSum = getNum(decimalNum, cnNums, cnDecUnits, num, cnDecMap)
  // 输出的数字金额字符串
  return maxSum * 100000000 + middleSun * 10000 + minSun + cesSum
}
/**
 * 从路径中解析查询参数
 * @param {String} url 路径
 */
export function resolveQueryParameters(url) {
  if (url) {
    const i = url.indexOf('?')
    if (i > -1) {
      const query = url.substr(i + 1)
      const vars = query.split('&')
      const queryParams = {}
      for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=')
        queryParams[pair[0]] = pair[1]
      }
      return queryParams
    }
  }
  return null
}
/**
 * @description 获取机构名称
 */
export function getOrgName() {}
/**
 * @description 获取用户名称
 */
export function getUserName() {}
/**
 * @description 上传按钮日志
 */
// export function logInfo(data) {
//   auditlogdata(data)
//     .then((res) => {})
//     .catch((e) => {})
// }

/**
 * @description 判断传入的节点是不是选中节点的子节点
 * @param value 当前输入信息
 * @param nodeData 当前节点属性信息
 * @param label 当前节点名称
 */
export function checkBelongToChooseNode(value, node, label) {
  let level = node.level
  // 如果传入的节点本身就是一级节点就不用校验了
  if (level === 1) {
    return false
  }
  // 先取当前节点的父节点
  let parentData = node.parent
  // 遍历当前节点的父节点
  let index = 0
  while (index < level - 1) {
    // 如果匹配到直接返回
    if (
      parentData.data[label] &&
      parentData.data[label].indexOf(value) !== -1
    ) {
      return true
    }
    // 否则的话再往上一层做匹配
    parentData = parentData.parent
    index++
  }
  // 没匹配到返回false
  return false
}
/**
 * @description 根据菜单 funcUrl 获取菜单数据
 * @param funcUrl 菜单funcUrl
 */
export function getMenuNode(funcUrl) {
  const menuList = storage.get(MENU_STOREOG_KEY) || []
  return menuList.find((item) => {
    return `/${item.funcUrl}` === funcUrl
  })
}

/**
 * @description 上传页面访问rizhi
 * @to 路由信息
 */
export function menuLog(to) {
  if (!to.meta || (!to.meta.title && !to.meta.id)) {
    return
  }
  let zhCn = {
    button: '按钮',
    access: '访问：',
    path: '路径：',
    buttonName: '按钮名称：'
  }
  let en = {
    button: '',
    access: 'Access:',
    path: 'Path:',
    buttonName: 'Button name:'
  }
  let lang = zhCn
  // let lang = getLanguage() === 'en' ? en : zhCn
  let log = {
    menuId: to.meta.id ? to.meta.id : '',
    operFlag: lang.access,
    operObjId: to.meta.title ? to.meta.title : '',
    logTypeId: '7', // 访问菜单
    content: lang.access + to.meta.title + ',' + lang.path + to.path
  }
  // logInfo(log)
}

/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xdc00 && code <= 0xdfff) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map((key) => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach((v) => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
// export function toggleClass(element, className) {
//   if (!element || !className) {
//     return
//   }
//   let classString = element.className
//   const nameIndex = classString.indexOf(className)
//   if (nameIndex === -1) {
//     classString += '' + className
//   } else {
//     classString =
//       classString.substr(0, nameIndex) +
//       classString.substr(nameIndex + className.length)
//   }
//   element.className = classString
// }

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}
