<template>
  <div class="text-end mt-4">
    <button class="btn btn-primary" @click="openModal('add')">
      建立新的產品
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="120">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.category }}</td>
        <td>{{ product.title }}</td>
        <td class="text-end">{{ product.origin_price }}</td>
        <td class="text-end">{{ product.price }}</td>
        <td>
          <span class="text-success" v-if="product.is_enabled">啟用</span>
          <span v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="openModal('edit', product.id)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="openModal('delete', product.id)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <pagination
    :total-pages="page.total"
    :current-page="page.current"
    :has-pre-page="page.hasPre"
    :has-next-page="page.hasNext"
    @change-page="getData"
  ></pagination>
  <!-- Modal -->
  <!-- <product-modal
    ref="productModal"
    :temp-product="tempProduct"
    :action="nowAction"
    @update-data="getData"
  >
  </product-modal>
  <delete-modal
    ref="delProductModal"
    :temp-product="tempProduct"
    @update-data="getData"
  ></delete-modal> -->
</template>

<script>

import pagination from '@/components/Pagination.vue'

export default {
  data () {
    return {
      products: [],
      page: {
        total: 0,
        current: 0,
        hasPre: false,
        hasNext: false
      },
      tempProduct: {
        imagesUrl: []
      },
      nowAction: ''
    }
  },
  components: {
    pagination
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData (page = 1) {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`)
        .then(res => {
          if (!res.data.success) {
            alert('獲取產品列表資料失敗！')
            return
          }

          this.products = res.data.products
          this.page.total = res.data.pagination.total_pages
          this.page.current = res.data.pagination.current_page
          this.page.hasPre = res.data.pagination.has_pre
          this.page.hasNext = res.data.pagination.has_next
        })
        .catch(err => console.dir(err))
    }
  }
}
</script>
