<template>
  <div
    class="modal fade"
    id="couponModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="!coupon.id">新增優惠卷</span>
            <span v-else>編輯優惠卷</span> {{ isClickSendBtn }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          {{ coupon }}
          <div class="mb-3">
            <label for="title"><span class="text-danger">*</span> 標題</label>
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="coupon.title"
              placeholder="請輸入標題"
            />
            <div
              class="invalid-feedback"
              :class="{ 'd-block': !coupon.title }"
              v-if="isClickSendBtn"
            >
              標題為必填
            </div>
          </div>
          <div class="mb-3">
            <label for="coupon_code"
              ><span class="text-danger">*</span> 優惠碼</label
            >
            <input
              type="text"
              class="form-control"
              id="coupon_code"
              v-model="coupon.code"
              placeholder="請輸入優惠碼"
            />
            <div
              class="invalid-feedback"
              :class="{ 'd-block': !coupon.code }"
              v-if="isClickSendBtn"
            >
              優惠碼為必填
            </div>
          </div>
          <div class="mb-3">
            <label for="due_date"
              ><span class="text-danger">*</span> 到期日</label
            >
            <input
              type="date"
              class="form-control"
              id="due_date"
              v-model="coupon.due_date"
            />
            <div
              class="invalid-feedback"
              :class="{ 'd-block': !coupon.due_date }"
              v-if="isClickSendBtn"
            >
              到期日為必填
            </div>
          </div>
          <div class="mb-3">
            <label for="price"
              ><span class="text-danger">*</span> 折扣百分比</label
            >
            <input
              type="number"
              class="form-control"
              id="price"
              min="0"
              v-model="coupon.percent"
              placeholder="請輸入折扣百分比"
            />
            <div
              class="invalid-feedback"
              :class="{ 'd-block': !coupon.percent }"
              v-if="isClickSendBtn"
            >
              折扣百分比為必填
            </div>
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="is_enabled"
                v-model="coupon.is_enabled"
                true-value="1"
                false-value="0"
              />
              <label class="form-check-label" for="is_enabled">
                是否啟用
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="editCoupon">
            <span v-if="!coupon.id">新增</span>
            <span v-else>更新</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Modal from 'bootstrap/js/dist/modal.js'

export default {
  props: ['tempCoupon', 'action', 'listPage'],
  data () {
    return {
      isClickSendBtn: 0,
      modal: null,
      coupon: { is_enabled: 0 },
      // loading
      isLoading: false,
      loader: null
    }
  },
  watch: {
    isLoading (status) {
      if (status) {
        this.loader = this.$loading.show({
          container: null
        })
        return
      }
      if (this.loader) this.loader.hide()
    },
    tempCoupon () {
      // input type date format: yyyy-mm-dd
      this.coupon = { ...this.tempCoupon }

      if (this.action === 'edit') {
        this.coupon.due_date = this.$formatDate(this.tempCoupon.due_date, 'YYYY-MM-DD')
      }
      console.log('CouponsOmdal.vue watch')
      console.log(this.coupon)
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal, null)
  },
  methods: {
    openModal () {
      console.log('CouponsOmdal.vue openModal')
      console.log(this.tempCoupon)
      this.modal.show()
    },

    editCoupon () {
      this.isClickSendBtn = 1

      if (!this.coupon.title || !this.coupon.percent || !this.coupon.due_date || !this.coupon.code) {
        this.$toastMsg('請檢查必填欄位！', 'warning')
        this.isLoading = false
        return
      }

      this.isLoading = true

      const temp = { ...this.coupon }
      temp.due_date = (new Date(temp.due_date).getTime()) / 1000
      temp.percent = +(temp.percent)
      temp.is_enabled = +(temp.is_enabled)

      console.log(temp)

      // const tempUnix = (new Date(this.coupon.due_date).getTime()) / 1000
      // console.log(this.date(tempUnix))

      let actionName = ''
      let path = ''
      let method = ''
      const data = { data: temp }
      if (this.action === 'add') {
        actionName = '新增'
        path = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`
        method = 'post'
      } else if (this.action === 'edit') {
        actionName = '編輯'
        path = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${temp.id}`
        method = 'put'
      }

      this.$http[method](path, data)
        .then(res => {
          console.log(res.data)
          if (!res.data.success) {
            this.$toastMsg(`${actionName}失敗！`)
            this.isLoading = false
            return
          }
          this.$toastMsg(`${actionName}成功！`, 'success')
          this.isLoading = false

          this.modal.hide()
          this.$emit('updateData', this.listPage)
          this.isClickSendBtn = 0
        })
        .catch(err => console.dir(err))
    }
  }
}
</script>
