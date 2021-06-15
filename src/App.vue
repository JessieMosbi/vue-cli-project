<template>
  <div id="nav">
    <router-link to="/products">產品列表</router-link> |
    <router-link to="/carts">購物車</router-link> |
  </div>
  <router-view />
</template>

<style lang="scss">
@import "bootstrap";
</style>
