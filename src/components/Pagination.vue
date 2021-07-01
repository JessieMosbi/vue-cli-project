<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li
          class="page-item"
          v-if="pagination.hasPre"
          @click.prevent="clickPage(pagination.current - 1)"
        >
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          :class="{ active: pagination.current === number }"
          v-for="number in pagination.total"
          :key="number"
        >
          <a class="page-link" href="javascript:;" @click="clickPage(number)">{{
            number
          }}</a>
        </li>
        <li
          class="page-item"
          v-if="pagination.hasNext"
          @click.prevent="clickPage(pagination.current + 1)"
        >
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['pagination'],
  methods: {
    clickPage (page) {
      this.$emit('changePage', page)
    }
  }
}
</script>
