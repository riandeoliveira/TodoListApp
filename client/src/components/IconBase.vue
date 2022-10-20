<template>
  <svg
    :width="size"
    :height="size"
    :viewBox="view"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path :d="name" fill="#ffffff" />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
  size: number;
}>();

const minSize = props.size !== 24 && 20;

const view = `0 0 ${minSize} ${minSize}`;
</script>
