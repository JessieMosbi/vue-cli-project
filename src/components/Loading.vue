<template>
  <div></div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      loader: null
    }
  },
  watch: {
    // isLoading (status) {
    //   if (status) {
    //     this.loader = this.$loading.show({
    //       container: null
    //     })
    //     return
    //   }
    //   if (this.loader) this.loader.hide()
    // }
  },
  methods: {
    show () {
      this.loader = this.$loading.show({
        container: null
      })
    },
    hide () {
      if (this.loader) this.loader.hide()
    }
  }
}
</script>
