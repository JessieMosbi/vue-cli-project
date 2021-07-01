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
