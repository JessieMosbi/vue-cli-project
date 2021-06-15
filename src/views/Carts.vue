<template>
  <div class="text-end" v-if="isMounted">
    <button
      class="btn btn-outline-danger"
      type="button"
      @click="deleteAllCarts"
    >
      清空購物車
    </button>
  </div>

  <table class="table align-middle" v-if="isMounted">
    <thead>
      <tr>
        <th></th>
        <th>品名</th>
        <th style="width: 150px">數量/單位</th>
        <th>單價</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="cart in carts" :key="cart.id">
        <td>
          <button
            type="button"
            class="btn btn-outline-danger btn-sm"
            @click="deleteCart(cart.id)"
          >
            <i class="fas fa-pulse"></i>
            x
          </button>
        </td>
        <td>
          {{ cart.product.title }}
          <div class="text-success" v-if="cart.coupon">已套用優惠券</div>
        </td>
        <td>
          <div class="input-group input-group-sm">{{ cart.qty }} / 個</div>
        </td>
        <td class="text-end">
          {{ cart.product.origin_price }}
          <small class="text-success">折扣價：</small>
          {{ cart.product.price }}
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3" class="text-end">總計</td>
        <td class="text-end">{{ total }}</td>
      </tr>
      <tr>
        <td colspan="3" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">{{ final_total }}</td>
      </tr>
    </tfoot>
  </table>

  <!-- <teleport to="#cart-list-loading" v-if="isMounted" :is-full-page="false">
    <loading :active="isLoading" :is-full-page="false"></loading>
  </teleport> -->

  <!-- 訂購資訊 -->
  <div class="my-5 row justify-content-center">
    <Form
      v-slot="{ errors }"
      class="col-md-6"
      @submit="sendForm"
      ref="user-form"
    >
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <Field
          id="email"
          name="email"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': errors['email'] }"
          rules="required|email"
          placeholder="請輸入 Email"
          v-model="user.email"
        ></Field>
        <error-message name="email" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <Field
          id="name"
          name="姓名"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['姓名'] }"
          rules="required"
          placeholder="請輸入姓名"
          v-model="user.name"
        ></Field>
        <error-message name="姓名" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話</label>
        <Field
          id="tel"
          name="電話"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['電話'] }"
          rules="required|numeric|min:8"
          placeholder="請輸入電話"
          v-model="user.tel"
        ></Field>
        <error-message name="電話" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <Field
          id="address"
          name="地址"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['地址'] }"
          placeholder="請輸入地址"
          rules="required"
          v-model="user.address"
        ></Field>
        <error-message name="地址" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea
          type="text"
          name=""
          id="message"
          class="form-control"
          cols="30"
          rows="10"
          v-model="message"
        ></textarea>
      </div>
      <div class="text-end">
        <button type="submit" class="btn btn-danger">送出訂單</button>
      </div>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isMounted: false,
      isLoading: false,
      carts: [],
      total: 0,
      final_total: 0,

      user: {
        email: '',
        name: '',
        tel: '',
        address: ''
      },
      message: ''
    }
  },
  created () {
    // emitter.on('addToCart', (data) => this.addToCart(data))
    // emitter.on('updateCarts', () => this.getCarts())
  },
  mounted () {
    this.isMounted = true
    this.getCarts()
  },
  watch: {
    carts () {
      // emitter.emit('updateCartAmount', this.carts.length)
    }
  },
  methods: {
    getCarts () {
      // this.showLoading(true)
      const loader = this.$loading.show({
        container: null
      })

      this.$http.get(`${process.env.VUE_APP_API}/${process.env.VUE_APP_PATH}/cart`)
        .then(res => {
          if (!res.data.success) {
            alert('獲取購物車列表資料失敗！')
            loader.hide()
            return
          }

          this.carts = res.data.data.carts
          this.total = res.data.data.total
          this.final_total = res.data.data.final_total
          // this.showLoading(false)
          loader.hide()
        })
        .catch(err => console.dir(err))
    },

    deleteCart (cardId) {
      // this.showLoading(true)
      const loader = this.$loading.show({
        container: null
      })

      this.$http.delete(`${process.env.VUE_APP_API}/${process.env.VUE_APP_PATH}/cart/${cardId}`)
        .then(res => {
          if (!res.data.success) {
            alert('刪除購物車資料失敗！')
            // this.showLoading(false)
            loader.hide()
            return
          }

          loader.hide()
          this.getCarts()
        })
        .catch(err => console.dir(err))
    },

    deleteAllCarts () {
      // this.showLoading(true)
      const loader = this.$loading.show({
        container: null
      })

      this.$http.delete(`${process.env.VUE_APP_API}/${process.env.VUE_APP_PATH}/carts`)
        .then(res => {
          if (!res.data.success) {
            alert('清除購物車資料失敗！')
            // this.showLoading(false)
            loader.hide()
            return
          }

          loader.hide()
          this.getCarts()
        })
        .catch(err => console.dir(err))
    },

    sendForm () {
      // this.showLoading(true)
      const loader = this.$loading.show({
        container: null
      })

      // === check 購物車有無商品
      if (this.carts.length === 0) {
        alert('購物車內無商品可結帳！')
        // this.showLoading(false)
        loader.hide()
        return
      }

      const data = {
        data: {
          user: this.user,
          message: this.message
        }
      }

      this.$http.post(`${process.env.VUE_APP_API}/${process.env.VUE_APP_PATH}/order`, data)
        .then(res => {
          if (!res.data.success) {
            alert('新增訂單失敗！')
            // this.showLoading(false)
            loader.hide()
            return
          }
          alert('成功送出訂單！')

          // Object.keys(this.user).forEach(item => this.user[item] = '');
          // 清掉最外層 component 的 errors data (直接 console.log(this.$refs['user-form']); 才找到)
          this.$refs['user-form'].resetForm()
          this.message = '' // vee-validate 沒辦法用 textarea

          // emitter.emit('updateCarts')
          loader.hide()
          this.getCarts()
          // this.showLoading(false)
        })
        .catch(err => console.dir(err))
    }

    // showLoading (isShow) {
    //   this.isLoading = isShow
    // }
  }
}
</script>
