<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path :d="name" fill="#ffffff" />
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
}>();
</script>
