<template>
  <div class="text-end mt-4">
    <button type="button" class="btn btn-primary" @click="openModal('add')">
      建立新的優惠券
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th>名稱</th>
        <th>折扣百分比</th>
        <th>到期日</th>
        <th>是否啟用</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="coupon in coupons" :key="coupon.id">
        <td>{{ coupon.title }}</td>
        <td>{{ coupon.percent }}</td>
        <td>{{ this.$formatDate(coupon.due_date, "YYYY/MM/DD") }}</td>
        <td>
          <span class="text-success" v-if="coupon.is_enabled">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="openModal('edit', coupon.id)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="openModal('delete', coupon.id)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <pagination :pagination="page" @change-page="getData"></pagination>

  <coupon-modal
    :temp-coupon="tempCoupon"
    :action="nowAction"
    :list-page="page.current"
    @update-data="getData"
    ref="couponModal"
  ></coupon-modal>
  <del-coupon-modal
    :temp-coupon="tempCoupon"
    :action="nowAction"
    @update-data="getData"
    ref="delCouponModal"
  ></del-coupon-modal>
</template>

<script>

import pagination from '@/components/Pagination.vue'
import couponModal from '@/components/CouponModal.vue'
import delCouponModal from '@/components/DeleteCouponModal.vue'

export default {
  data () {
    return {
      coupons: [],
      page: {
        total: 0,
        current: 0,
        hasPre: false,
        hasNext: false
      },
      tempCoupon: {},
      nowAction: ''
      // loading
      // isLoading: false,
      // loader: null
    }
  },
  components: {
    pagination,
    couponModal,
    delCouponModal
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
      this.$emitter.emit('loading', true)

      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`)
        .then(res => {
          console.log(res.data)

          if (!res.data.success) {
            this.$toastMsg('獲取優惠券列表資料失敗！')
            this.$emitter.emit('loading', false)
            return
          }

          this.coupons = res.data.coupons
          this.page.total = res.data.pagination.total_pages
          this.page.current = res.data.pagination.current_page
          this.page.hasPre = res.data.pagination.has_pre
          this.page.hasNext = res.data.pagination.has_next
          this.$emitter.emit('loading', false)
        })
        .catch(err => console.dir(err))
    },
    openModal (action, id = null) {
      this.nowAction = action

      if (action === 'add') {
        this.tempCoupon = { is_enabled: 0 }
      } else if ((action === 'edit' || action === 'delete') && id) {
        this.tempCoupon = { ...this.coupons.find(coupon => coupon.id === id) }
        console.log('Coupons.vue')
        console.log(this.tempCoupon)
      }

      if (action === 'add' || action === 'edit') this.$refs.couponModal.openModal()
      else if (action === 'delete') this.$refs.delCouponModal.openModal()
    }
  }
}
</script>
