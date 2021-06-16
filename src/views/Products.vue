<template>
  <!-- 產品列表 -->
  <div class="mt-4" style="position: relative">
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
              <router-link
                :to="{
                  path: `/product/${product.id}`,
                  // query: { page: page.current },
                }"
                class="btn btn-outline-secondary"
                ><i class="fas fa-pulse"></i> 查看更多</router-link
              >
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
  </div>

  <pagination
    :total-pages="page.total"
    :current-page="page.current"
    :has-pre-page="page.hasPre"
    :has-next-page="page.hasNext"
    @change-page="getProducts"
  ></pagination>
</template>

<script>
// FIXME: ask why?
// console.log('this', this) // undefined

import pagination from '@/components/Pagination.vue'

export default {
  props: ['listPage'],
  data () {
    return {
      products: [],
      page: {
        total: 0,
        current: 0,
        hasPre: false,
        hasNext: false
      },
      product: {},
      // loading
      isLoading: false, // watch 一開始不會被觸發，所以不能設 true
      loader: null // 大家都是同一個 loader，避免重複宣告 2 個
    }
  },
  components: {
    pagination
  },
  mounted () {
    const page = (this.listPage > 1) ? this.listPage : 1
    this.getProducts(page)
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
    // 監聽物件內的變數，(有雙向綁定外層的 App.vue)
    'page.current': function () {
      this.$emit('update:list-page', this.page.current)
    }
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
      this.isLoading = true

      this.$http.get(`${process.env.VUE_APP_API}/${process.env.VUE_APP_PATH}/products?page=${page}`)
        .then(res => {
          if (!res.data.success) {
            alert('獲取產品列表資料失敗！')
            this.isLoading = false
            return
          }

          this.products = res.data.products
          this.page.total = res.data.pagination.total_pages
          this.page.current = res.data.pagination.current_page
          this.page.hasPre = res.data.pagination.has_pre
          this.page.hasNext = res.data.pagination.has_next
          this.isLoading = false
        })
        .catch(err => console.dir(err))
    },

    addToCart (product) {
      this.isLoading = true

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
            this.isLoading = false
            return
          }

          alert('成功新增至購物車！')
          this.isLoading = false
          // this.$refs.productModal.closeModal()
        })
        .catch(err => console.dir(err))
    }
  }
}
</script>
