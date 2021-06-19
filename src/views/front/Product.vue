<template>
  <div class="row">
    <div class="col-sm-6">
      <img
        class="img-fluid"
        :src="product.imageUrl"
        :alt="`${product.title} 商品的圖片`"
      />
    </div>
    <div class="col-sm-6">
      <span class="badge bg-primary rounded-pill">{{ product.category }}</span>
      <p>商品描述：{{ product.description }}</p>
      <p>商品內容：{{ product.content }}</p>
      <div class="h5">{{ product.price }} 元</div>
      <del class="h6">原價 {{ product.origin_price }} 元</del>
      <div class="h5">現在只要 {{ product.price }} 元</div>
      <div>
        <div class="input-group">
          <input type="number" class="form-control" min="1" v-model="qty" />
          <button type="button" class="btn btn-primary" @click="addToCart">
            加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-12 mt-5 text-center">
      <button type="button" class="btn btn-info text-white" @click="goBack">
        Back
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      product: {},
      qty: 1,
      // loading
      isLoading: false,
      loader: null
    }
  },
  props: ['page'],
  created () {
    this.product.id = this.$route.params.id
  },
  mounted () {
    this.getProduct()
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
    }
  },
  methods: {
    getProduct () {
      this.isLoading = true

      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${this.product.id}`)
        .then(res => {
          if (!res.data.success) {
            alert('獲取產品資料失敗！')
            this.isLoading = false
            return
          }

          this.product = res.data.product
          this.isLoading = false
        })
        .catch(err => console.dir(err))
    },
    addToCart () {
      this.isLoading = true

      const data = {
        data: {
          product_id: this.product.id,
          qty: +this.qty
        }
      }
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, data)
        .then(res => {
          if (!res.data.success) {
            alert('新增至購物車失敗！')
            this.isLoading = false
            return
          }

          alert('成功新增至購物車！')
          this.isLoading = false
        })
        .catch(err => console.dir(err))
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
