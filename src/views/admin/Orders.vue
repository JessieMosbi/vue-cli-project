<template>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">購買時間</th>
        <th width="120">編號</th>
        <th width="120">姓名</th>
        <th width="120">Email</th>
        <th width="120">應付金額</th>
        <th width="100">是否付款</th>
        <th width="120">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orders" :key="order.id">
        <td>
          {{ $formatDate(order.create_at, "YYYY/MM/DD") }}
        </td>
        <td>{{ order.id }}</td>
        <td>{{ order.user.name }}</td>
        <td>{{ order.user.email }}</td>
        <td>${{ currency(order.total) }}</td>
        <td>
          <span class="text-success" v-if="order.is_paid">已付款</span>
          <span v-else>未付款</span>
        </td>
        <td>
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="openModal('check', order.id)"
            >
              查看
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="openModal('delete', order.id)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <pagination :pagination="page" @change-page="getData"></pagination>

  <order-modal
    :temp-order="tempOrder"
    @update-data="getData"
    :list-page="page.current"
    ref="orderModal"
  ></order-modal>

  <delete-order-modal
    :temp-order="tempOrder"
    @update-data="getData"
    ref="delOrderModal"
  ></delete-order-modal>
</template>

<script>

import pagination from '@/components/Pagination.vue'
import orderModal from '@/components/OrderModal.vue'
import deleteOrderModal from '@/components/DeleteOrderModal.vue'

export default {
  data () {
    return {
      orders: [],
      page: {
        total: 0,
        current: 0,
        hasPre: false,
        hasNext: false
      },
      tempOrder: {},
      nowAction: ''
      // loading
      // isLoading: false,
      // loader: null
    }
  },
  components: {
    pagination,
    orderModal,
    deleteOrderModal
  },
  mounted () {
    this.getData()
  },
  // watch: {
  //   isLoading (status) {
  //     if (status) {
  //       this.loader = this.$loading.show({
  //         container: null
  //       })
  //       return
  //     }
  //     if (this.loader) this.loader.hide()
  //   }
  // },
  methods: {
    getData (page = 1) {
      console.log(`page is ${page}`)
      this.$emitter.emit('loading', true)

      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`)
        .then(res => {
          console.log(res.data)

          if (!res.data.success) {
            this.$toastMsg('獲取產品列表資料失敗！')
            this.$emitter.emit('loading', false)
            return
          }

          this.orders = res.data.orders
          this.page.total = res.data.pagination.total_pages
          this.page.current = res.data.pagination.current_page
          this.page.hasPre = res.data.pagination.has_pre
          this.page.hasNext = res.data.pagination.has_next
          this.$emitter.emit('loading', false)
        })
        .catch(err => console.dir(err))
    },

    openModal (action, orderId) {
      console.log(action, orderId)
      this.tempOrder = this.orders.find(order => order.id === orderId)

      if (action === 'check') {
        // FIXME:
        // 如果不加這一行的話，openModal 會比 watch 更早觸發
        // 看了一下網路上的解釋：應該是 Vue 偵測到值改變後，會重新進行渲染，nextTick 就是等他重新渲染玩一次後所執行的 callback，但還是不是很懂
        // 不過即使 orderModal.openModal 比 orderModal.tempOrder 更早觸發，也不會影響到 orderModal template 的值，想請問原因？

        // this.$nextTick(() => {
        //   this.$refs.orderModal.openModal()
        // })
        this.$refs.orderModal.openModal()
      } else if (action === 'delete') {
        this.$refs.delOrderModal.openModal()
      }
    }
  }
}
</script>
