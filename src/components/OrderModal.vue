<template>
  <div
    class="modal fade"
    id="orderModal"
    ref="orderModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>訂單細節</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <h3>用戶資料</h3>
              <table class="table">
                <tbody v-if="order.user">
                  <tr>
                    <th style="width: 100px">姓名</th>
                    <td>{{ order.user.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ order.user.email }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ order.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ order.user.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-8">
              <h3>訂單細節</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">訂單編號</th>
                    <td>{{ order.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ order.create_at }}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="order.is_paid"> 時間? </span>
                      <span v-else>尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <strong class="text-success" v-if="order.is_paid"
                        >已付款</strong
                      >
                      <span class="text-muted" v-else>尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>{{ order.total }}</td>
                  </tr>
                </tbody>
              </table>
              <h3>選購商品</h3>
              <table class="table">
                <thead>
                  <tr></tr>
                </thead>
                <tbody v-if="order.products">
                  <tr>
                    <th>名稱</th>
                    <th>數量 / 單位</th>
                    <th class="text-end">金額</th>
                  </tr>
                  <tr
                    v-for="productId in Object.keys(order.products)"
                    :key="productId"
                  >
                    <td>{{ order.products[productId].product.title }}</td>
                    <td>
                      {{ order.products[productId].product.num }} /
                      {{ order.products[productId].product.unit }}
                    </td>
                    <td class="text-end">
                      {{ order.products[productId].product.price }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-end">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                    ref="isPaidCheckbox"
                    v-model="temp.is_paid"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    <span v-if="temp.is_paid">已付款</span>
                    <span v-else>未付款</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="updateOrder">
            修改付款狀態
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Modal from 'bootstrap/js/dist/modal.js'

export default {
  props: ['tempOrder', 'listPage'],
  data () {
    return {
      order: {},
      modal: null,
      temp: {
        is_paid: false
      }
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.orderModal, null)
  },
  watch: {
    tempOrder () {
      this.order = this.tempOrder
      this.temp.is_paid = this.order.is_paid
    }
  },
  methods: {
    openModal () {
      this.modal.show()
    },

    updateOrder () {
      this.$emitter.emit('loading', true)

      const data = {
        data: {
          is_paid: this.temp.is_paid,
          total: this.order.total
        }
      }

      this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.order.id}`, data)
        .then(res => {
          if (!res.data.success) {
            this.$toastMsg('訂單更新失敗！')
            this.$emitter.emit('loading', false)
            return
          }
          this.$toastMsg('訂單更新成功！', 'success')
          this.$emitter.emit('loading', false)

          this.modal.hide()
          this.$emit('updateData', this.listPage) // 讓 list 停留在同一頁
        })
        .catch(err => console.dir(err))
    }
  }
}
</script>
