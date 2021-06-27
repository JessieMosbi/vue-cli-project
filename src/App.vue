<template>
  <div></div>
  <router-view />

  <loading ref="loading"></loading>
</template>

<script>

import loading from '@/components/Loading.vue'

export default {
  components: {
    loading
  },
  created () {
    this.$emitter.on('loading', (show) => {
      if (show) this.$refs.loading.show()
      else this.$refs.loading.hide()
    })
  }
}
</script>

<style lang="scss">
@import "bootstrap";
</style>
