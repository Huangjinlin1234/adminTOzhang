import { monitorAble, watermark } from '@/config'
import '@/assets/common/icons' // icon
import '@/utils/error-log' // error log
import '@/router/router-filter'
/* 监控 */
if (monitorAble) {
  require('@/utils/yufp.monitor');
}
if (watermark) {
  require('@/utils/yufp.watermark');
}
