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
      order: {},
      // loading
      isLoading: false,
      loader: null
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal, null)
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
    tempOrder () {
      this.order = { ...this.tempOrder }
    }
  },
  methods: {
    openModal () {
      this.modal.show()
    },

    deleteOrder () {
      console.log(`deleteOrder: ${this.order.id}`)

      this.isLoading = true

      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.order.id}`)
        .then(res => {
          console.log(res.data)
          if (!res.data.success) {
            this.$toastMsg('訂單刪除失敗！')
            this.isLoading = false
            return
          }
          this.$toastMsg('訂單刪除成功！', 'success')
          this.isLoading = false

          this.modal.hide()
          this.$emit('updateData')
        })
        .catch(err => console.dir(err))
    }
  }
}
</script>
