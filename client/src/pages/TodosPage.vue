<template>
  <div class="container">
    <HeaderArea />
    <main class="main">
      <FilterModal v-if="filterModal.$state.isOpen" />
    </main>
    <FooterArea />
  </div>
</template>

<script setup lang="ts">
import HeaderArea from 'components/HeaderArea.vue';
import FooterArea from 'components/FooterArea.vue';
import FilterModal from 'components/FilterModal.vue';
import { useFilterModalStore } from 'stores/useFilterModalStore';

const filterModal = useFilterModalStore();
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
