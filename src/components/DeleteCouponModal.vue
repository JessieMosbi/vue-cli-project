<template>
  <div
    id="delOrderModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除優惠券</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ coupon.title }}</strong>
          的優惠券(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="deleteCoupon">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Modal from 'bootstrap/js/dist/modal.js'

export default {
  props: ['tempCoupon'],
  data () {
    return {
      modal: null,
      coupon: {}
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal, null)
  },
  watch: {
    tempCoupon () {
      this.coupon = { ...this.tempCoupon }
    }
  },
  methods: {
    openModal () {
      this.modal.show()
    },

    deleteCoupon () {
      this.$emitter.emit('loading', true)

      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`)
        .then(res => {
          if (!res.data.success) {
            this.$toastMsg('刪除優惠券失敗！')
            this.$emitter.emit('loading', false)
            return
          }
          this.$toastMsg('成功刪除優惠券！', 'success')
          this.$emitter.emit('loading', false)

          this.modal.hide()
          this.$emit('updateData')
        })
        .catch(err => console.dir(err))
    }
  }
}
</script>
