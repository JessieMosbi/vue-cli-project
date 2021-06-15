<template>
  <h1>我是產品列表頁面</h1>

  <!-- 產品列表 -->
  <div class="mt-4" style="position: relative">
    <div id="product-list-table"></div>
    <!-- loading is-full-page: false 時，只會作用在包住他的 container 底下（class="mt-4" div） -->
    <div id="product-list-loading"></div>
  </div>
  <div id="product-list-pagination"></div>

  <!-- Components -->
  <product-modal
    :product="product"
    @add-to-cart="addToCart"
    ref="productModal"
  ></product-modal>

  <teleport to="#product-list-table" v-if="isMounted">
    <table class="table align-middle">
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th>功能</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index">
          <td style="width: 200px">
            <div
              :style="getImageStyle(product.imageUrl)"
              v-if="product.imagesUrl"
            ></div>
          </td>
          <td>
            {{ product.title }}
          </td>
          <td>
            <div class="h5">{{ product.origin_price }} 元</div>
            <del class="h6">原價 {{ product.origin_price }} 元</del>
            <div class="h5">現在只要 {{ product.price }} 元</div>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="getProduct(product.id)"
              >
                <i class="fas fa-pulse"></i>
                查看更多
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="addToCart({ id: product.id, qty: 1 })"
              >
                <i class="fas fa-pulse"></i>
                加到購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </teleport>

  <teleport to="#product-list-pagination" v-if="isMounted">
    <pagination
      :total-pages="page.total"
      :current-page="page.current"
      :has-pre-page="page.hasPre"
      :has-next-page="page.hasNext"
      @change-page="getProducts"
    ></pagination>
  </teleport>

  <!-- <teleport to="#product-list-loading" v-if="isMounted">
    <loading :active="isLoading" :is-full-page="false"></loading>
  </teleport> -->
</template>

<script>
// import mitt from 'mitt'
// const emitter = mitt()

// const instance = this.$http.create({
//   baseURL: process.env.VUE_APP_API
// })

// console.log('this', this) // undefined

import pagination from '@/components/Pagination.vue'
import productModal from '@/components/ProductModal.vue'

export default {
  data () {
    return {
      isMounted: false,
      isLoading: true,
      products: [],
      page: {
        total: 0,
        current: 0,
        hasPre: false,
        hasNext: false
      },
      product: {}
    }
  },
  components: {
    pagination,
    productModal
  },
  mounted () {
    this.isMounted = true
    this.getProducts()
  },
  methods: {
    getImageStyle (url) {
      return {
        height: '100px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url("${url}")`
      }
    },

    getProducts (page = 1) {
      // this.showLoading(true)
      const loader = this.$loading.show({
        container: null
      })

      this.$http.get(`${process.env.VUE_APP_API}/${process.env.VUE_APP_PATH}/products?page=${page}`)
        .then(res => {
          console.log(res.data)
          if (!res.data.success) {
            alert('獲取產品列表資料失敗！')
            // this.showLoading(false)
            loader.hide()
            return
          }

          this.products = res.data.products
          this.page.total = res.data.pagination.total_pages
          this.page.current = res.data.pagination.current_page
          this.page.hasPre = res.data.pagination.has_pre
          this.page.hasNext = res.data.pagination.has_next
          // this.showLoading(false)
          loader.hide()
        })
        .catch(err => console.dir(err))
    },

    getProduct (productId) {
      this.$http.get(`${process.env.VUE_APP_API}/${process.env.VUE_APP_PATH}/product/${productId}`)
        .then(res => {
          if (!res.data.success) {
            alert('獲取產品詳細資料失敗！')
            // return
          }

          this.product = res.data.product
          this.$refs.productModal.openModal()
          // emitter.emit('openProductModal', res.data.product)
        })
        .catch(err => console.dir(err))
    },

    addToCart (product) {
      // this.showLoading(true)
      const loader = this.$loading.show({
        container: null
      })

      const data = {
        data: {
          product_id: product.id,
          qty: +product.qty
        }
      }

      this.$http.post(`${process.env.VUE_APP_API}/${process.env.VUE_APP_PATH}/cart`, data)
        .then(res => {
          if (!res.data.success) {
            alert('新增至購物車失敗！')
            // this.showLoading(false)
            loader.hide()
            return
          }

          // this.getCarts()
          // emitter.emit('closeProductModal')
          loader.hide()
          this.$refs.productModal.closeModal()
        })
        .catch(err => console.dir(err))
    }

    // showLoading (isShow) {
    //   this.isLoading = isShow
    // }
  }
}
</script>
