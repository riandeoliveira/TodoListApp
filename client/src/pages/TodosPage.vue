<template>
  <div class="container">
    <HeaderArea />
    <main class="main">
      <FilterModal />
    </main>
    <FooterArea />
  </div>
</template>

<script setup lang="ts">
import HeaderArea from 'components/HeaderArea.vue';
import FooterArea from 'src/components/FooterArea.vue';
import FilterModal from 'src/components/FilterModal.vue';
</script>

<style lang="scss">
body {
  background-color: #101010;
}

.main {
  padding: 56px 16px;
  color: white;
}
</style>
