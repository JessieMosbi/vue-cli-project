<template>
  <div class="row mt-5">
    <div class="col-6 m-auto">
      <div class="card card-body">
        <h2 class="text-center mt-3">使用者登入</h2>
        <div class="text-danger text-center mt-4" v-if="errorMessage">
          {{ errorMessage }}
        </div>
        <Form
          v-slot="{ errors }"
          class="m-4"
          @submit="sendForm"
          ref="user-form"
        >
          <div class="form-group">
            <label for="username" class="form-label">帳號</label>
            <Field
              type="email"
              id="username"
              name="帳號"
              class="form-control"
              :class="{ 'is-invalid': errors['帳號'] }"
              rules="required|email"
              v-model="user.username"
              @focus="errorMessage = ''"
            />
            <error-message name="帳號" class="invalid-feedback"></error-message>
          </div>
          <div class="form-group mt-3">
            <label for="password" class="form-label">密碼</label>
            <Field
              type="password"
              id="password"
              name="密碼"
              class="form-control"
              :class="{ 'is-invalid': errors['密碼'] }"
              rules="required"
              v-model="user.password"
              @focus="errorMessage = ''"
            />
            <error-message name="密碼" class="invalid-feedback"></error-message>
          </div>
          <div class="mt-5 text-center">
            <button type="submit" class="btn btn-primary btn-block">
              登入
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {},
      errorMessage: '',
      // loading
      isLoading: false,
      loader: null
    }
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
    sendForm () {
      this.isLoading = true

      this.$http.post(`${process.env.VUE_APP_API}/admin/signin`, this.user)
        .then((res) => {

          if (!res.data.success) {
            this.errorMessage = '帳密錯誤，登入失敗'
            this.isLoading = false
            return
          }

          const token = res.data.token
          const expireTime = new Date(res.data.expired).toUTCString()

          document.cookie = `hexschoolvue=${token};expires=${expireTime}`

          this.isLoading = false
          alert('登入成功！')
          this.$router.push('/admin')
        })
        .catch(err => console.dir(err))
    }
  }
}
</script>
