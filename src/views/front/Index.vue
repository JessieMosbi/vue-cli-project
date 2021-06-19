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
            <router-link to="/products" class="nav-link">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/carts" class="nav-link">購物車</router-link>
          </li>
        </ul>
        <!-- <form class="d-flex" @submit="searchProduct">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-model="text"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form> -->
      </div>
    </div>
  </nav>

  <div class="container mt-5">
    <!-- FIXME: 最好只與 Products.vue 雙向綁定，其餘不要綁（現在其他沒接收 props 的會有 warning） -->
    <router-view v-model:list-page="page" />
  </div>

  <footer class="mt-auto bg-light py-3">
    <div class="container">
      <div class="d-flex flex-column align-items-center">
        <router-link to="/login" v-if="this.$route.fullPath !== '/login'"
          >進入後台</router-link
        >
        <div class="mr-1">LazyIsGood © 2021</div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      text: '',
      page: 0 // 紀錄 product-list 的頁數（與各 component 雙向綁定），以便從其他頁面返回可正確顯示
    }
  },
  methods: {
    // TODO: Search product name: js filter products, then show
    // searchProduct () {
    //   console.log(`searchProduct: ${this.text}`)
    // }
  }
}
</script>
