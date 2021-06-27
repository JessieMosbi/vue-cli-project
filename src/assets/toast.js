// Toast
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

export const toastMsg = (message, type = 'danger') => {
  // this.$moshaToast('獲取產品列表資料失敗', {
  //   type: 'danger',
  //   position: 'bottom-right',
  //   hideProgressBar: true,
  //   showIcon: true,
  //   transition: 'slide'
  // })

  return createToast(message, {
    type,
    position: 'bottom-right',
    hideProgressBar: true,
    showIcon: true,
    transition: 'slide'
    // timeout: 5000
  })
}
