<template>
  <div
    class="modal fade"
    id="delOrderModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">
            <span>刪除訂單</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除編號
          <strong class="text-danger">{{ order.id }}</strong> 的訂單
          (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="deleteOrder">
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
  props: ['tempOrder'],
  data () {
    return {
      modal: null,
      order: {}
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal, null)
  },
  watch: {
    tempOrder () {
      this.order = { ...this.tempOrder }
    }
  },
  methods: {
    openModal () {
      this.modal.show()
    },

    deleteOrder () {
      this.$emitter.emit('loading', true)

      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.order.id}`)
        .then(res => {
          if (!res.data.success) {
            this.$toastMsg('訂單刪除失敗！')
            this.$emitter.emit('loading', false)
            return
          }
          this.$toastMsg('訂單刪除成功！', 'success')
          this.$emitter.emit('loading', false)

          this.modal.hide()
          this.$emit('updateData')
        })
        .catch(err => console.dir(err))
    }
  }
}
</script>
