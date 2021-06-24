<template>
  <div
    id="productModal"
    ref="productModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <!-- FIXME: 加入 vee-validation -->
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="product.id">編輯產品</span>
            <span v-else>新增產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <Form
          v-slot="{ errors }"
          class="m-4"
          @submit="editProduct"
          ref="product-form"
        >
          <div class="modal-body">
            {{ product }}
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-1">
                  <div class="form-group">
                    <label for="imageUrl">輸入主圖片網址</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="請輸入圖片連結"
                      v-model.trim="product.imageUrl"
                    />
                  </div>
                  <img
                    class="img-fluid"
                    :src="product.imageUrl"
                    :alt="product.imageUrl"
                  />
                </div>
                <div v-if="product.imageUrl">
                  <button
                    class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="deletePicture('main')"
                  >
                    刪除主圖片
                  </button>
                </div>
                <template
                  v-for="(image, index) in product.imagesUrl"
                  :key="index"
                >
                  <div class="mb-1">
                    <div class="form-group">
                      <label for="imageUrl">輸入圖片網址</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="請輸入圖片連結"
                        v-model.trim="product.imagesUrl[index]"
                      />
                    </div>
                    <img class="img-fluid" :src="image" :alt="image" />
                  </div>
                  <div>
                    <button
                      class="btn btn-outline-danger btn-sm d-block w-100"
                      @click="deletePicture(index)"
                    >
                      刪除圖片
                    </button>
                  </div>
                </template>
                <div v-if="product.imagesUrl.length < 5">
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="addPicture"
                  >
                    新增圖片
                  </button>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <Field
                    type="text"
                    id="title"
                    name="標題"
                    class="form-control"
                    :class="{ 'is-invalid': errors['標題'] }"
                    rules="required"
                    v-model.trim="product.title"
                    placeholder="請輸入標題"
                  />
                  <div
                    class="invalid-feedback"
                    :class="{ 'd-block': !product.title }"
                    v-if="isClickSendBtn"
                  >
                    標題為必填
                  </div>
                </div>

                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <Field
                      type="text"
                      id="category"
                      name="分類"
                      class="form-control"
                      :class="{ 'is-invalid': errors['分類'] }"
                      rules="required"
                      v-model.trim="product.category"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="unit">單位</label>
                    <Field
                      type="text"
                      id="unit"
                      name="單位"
                      class="form-control"
                      :class="{ 'is-invalid': errors['單位'] }"
                      rules="required"
                      v-model.trim="product.unit"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <Field
                      type="number"
                      id="origin_price"
                      name="原價"
                      class="form-control"
                      :class="{ 'is-invalid': errors['原價'] }"
                      min="0"
                      rules="required"
                      v-model.number="product.origin_price"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <Field
                      type="number"
                      id="price"
                      name="售價"
                      class="form-control"
                      :class="{ 'is-invalid': errors['售價'] }"
                      min="0"
                      rules="required"
                      v-model.number="product.price"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <Field
                    as="textarea"
                    id="description"
                    name="產品描述"
                    class="form-control"
                    v-model.trim="product.description"
                    placeholder="請輸入產品描述"
                  />
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <Field
                    as="textarea"
                    id="content"
                    name="說明內容"
                    class="form-control"
                    v-model.trim="product.content"
                    placeholder="請輸入說明內容"
                  />
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <Field
                      type="checkbox"
                      id="is_enabled"
                      name="是否啟用"
                      class="form-check-input"
                      :true-value="1"
                      :false-value="0"
                      v-model="product.is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled"
                      >是否啟用</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
              @click="isClickSendBtn = 0"
            >
              取消
            </button>
            <button type="submit" class="btn btn-primary">確認</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>

import Modal from 'bootstrap/js/dist/modal.js'

export default {
  props: ['tempProduct', 'action'],
  data () {
    return {
      isClickSendBtn: 0,
      modal: null,
      product: { imagesUrl: [] } // 這裡要預設給 array，否則會有 Error: can't read property length of null
    }
  },
  mounted () {
    // 現在是用 install bootstrap 的方式，而不是 CDN
    // 之前在 App.vue 只是匯入 Bootstrap 的 CSS 而已，這裡要使用 bootstrap modal 的 JS，故從 vendor 看一下路徑是什麼，並把他 import 進來
    // bootstrap/js/dist/modal.js，裡面裝的是舊的 SideEffect 方法，也可以用 ES Module 匯入（採預設匯入，可自訂名稱）
    this.modal = new Modal(this.$refs.productModal, null)
  },
  watch: {
    // Eslint 較嚴格，即便是改物件屬性，也不能改 root component 傳建來的 props，故用 watch 接到自己的 data 裡面
    tempProduct () {
      console.log('tempProduct watch')
      // 一但 vee-validate 啟動，就不能在動有綁定 validate 的屬性，否則會有 Error: Cannot convert a Symbol value to a string（因 vee-validate 是基於屬性去驗證的）
      // this.product = { ...this.tempProduct }
      console.log('tempProduct')
      console.log(this.tempProduct)

      // reset
      Object.keys(this.product).forEach(key => {
        this.product[key] = ''
        if (key === 'imagesUrl') this.product[key] = []
      })

      // give value
      Object.keys(this.tempProduct).forEach(key => {
        this.product[key] = this.tempProduct[key]
      })
      console.log('product')
      console.log(this.product)

      // if (this.product.imagesUrl === undefined) this.product.imagesUrl = []
    }
  },
  methods: {
    openModal () {
      console.log('openModal')
      // this.$refs['product-form'].resetForm()
      // console.log(this.product)
      this.modal.show()
    },

    editProduct () {
      this.isClickSendBtn = 1

      if (!this.product.title || !this.product.category || !this.product.unit || !this.product.origin_price || !this.product.price) {
        alert('請檢查必填欄位！')
        return
      }

      let actionName = ''
      let path = ''
      let method = ''
      const data = { data: this.product }
      if (this.action === 'add') {
        actionName = '新增'
        path = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`
        method = 'post'
      } else if (this.action === 'edit') {
        actionName = '編輯'
        path = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.product.id}`
        method = 'put'
      }

      this.$http[method](path, data)
        .then(res => {
          if (!res.data.success) {
            alert(`${actionName}失敗！`)
            return
          }
          alert(`${actionName}成功！`)

          this.modal.hide()
          this.$emit('updateData')
          this.isClickSendBtn = 0
        })
        .catch(err => console.dir(err))
    },

    addPicture () {
      // 雖然 props 是 readonly，但因 Object by reference 特性，還是可以修改裡面的值
      if (this.product.imagesUrl.length === 5) return
      this.product.imagesUrl.push('')
    },

    deletePicture (index) {
      if (index === 'main') this.product.imageUrl = ''
      else this.product.imagesUrl.splice(index, 1)
    }
  }
}
</script>
