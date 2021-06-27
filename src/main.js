import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// vee-validate
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email, numeric, min } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

// vue-axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// vue-loading overlay
import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

// Other
import { currency, formatDate } from '@/assets/transfer.js'
import { toastMsg } from '@/assets/toast.js'

// vee-validate setting
defineRule('required', required)
defineRule('email', email)
defineRule('numeric', numeric)
defineRule('min', min)
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true // 當輸入任何內容直接進行驗證
})
setLocale('zh_TW')

const app = createApp(App)
app.use(router)
app.use(VueAxios, axios)
app.use(VueLoading)

app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)

// global properties
app.config.globalProperties.currency = currency
app.config.globalProperties.$formatDate = formatDate
app.config.globalProperties.$toastMsg = toastMsg

app.mount('#app')
