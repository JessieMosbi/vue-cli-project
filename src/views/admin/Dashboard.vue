<template>
  <nav class="navbar navbar-expand-lg sticky-top navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">懶人福音</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/admin/products" class="nav-link"
              >產品</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/admin/orders" class="nav-link">訂單</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/coupons" class="nav-link"
              >優惠券</router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a href="javascript:;" class="nav-link">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container">
    <router-view />
  </div>
</template>

<script>
export default {
  // 若設 mounted，則包含子元件的 DOM 都要 ready 才會執行
  // 我在子元件的 mounted 有用 axios，這樣會導致子元件 mounted 先執行，才換母元件的 mounted 執行 > 導致取不到 token
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;s*)hexschoolvues*=s*([^;]*).*$)|^.*$/, '$1')

    if (!token) {
      this.$router.replace('/login')
    }
    this.$http.defaults.headers.common.Authorization = token
  }
}
</script>
