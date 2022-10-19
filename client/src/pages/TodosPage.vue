<template>
  <div class="container">
    <HeaderArea />
    <FooterArea />
  </div>
</template>

<script setup lang="ts">
import HeaderArea from 'components/HeaderArea.vue';
import FooterArea from 'src/components/FooterArea.vue';
</script>

<style lang="scss">
body {
  background-color: #101010;
}
</style>
