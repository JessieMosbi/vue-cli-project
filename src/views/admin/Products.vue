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

  <product-modal
    ref="productModal"
    :temp-product="tempProduct"
    :action="nowAction"
    @update-data="getData"
  >
  </product-modal>
  <!-- <delete-modal
    ref="delProductModal"
    :temp-product="tempProduct"
    @update-data="getData"
  ></delete-modal> -->
</template>

<script>

import pagination from '@/components/Pagination.vue'
import productModal from '@/components/ProductModal.vue'

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
      nowAction: '',
      // loading
      isLoading: false,
      loader: null
    }
  },
  components: {
    pagination,
    productModal
  },
  mounted () {
    this.getData()
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
    getData (page = 1) {
      this.isLoading = true

      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`)
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

    openModal (action, id = null) {
      // 紀錄目前動作 (productModal 判斷 add/edit 會用到)
      this.nowAction = action

      // tempProduct 設定: imagesUrl 預設先給 blank array，這樣前台 add picture 可以直接 push
      if (action === 'add') {
        this.tempProduct = { imagesUrl: [] }
      } else if ((action === 'edit' || action === 'delete') && id) {
        this.tempProduct = { ...this.products.find(product => product.id === id) }
        this.tempProduct.id = id
        if (this.tempProduct.imagesUrl === undefined) this.tempProduct.imagesUrl = []
      }
      this.tempProduct.num = 1 // html 裡面沒數量，先填 1

      // open target modal
      if (action === 'add' || action === 'edit') this.$refs.productModal.openModal()
      else if (action === 'delete') this.$refs.delProductModal.openModal()
    }
  }
}
</script>
