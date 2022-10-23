<template>
  <svg
    :width="size"
    :height="size"
    :viewBox="viewBox"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path :d="name" fill="#ffffff" />
  </svg>
</template>

<script setup lang="ts">
export interface IconBaseProps {
  name: string;
  size: number;
}

const props = defineProps<IconBaseProps>();

const minSize: number = props.size === 24 ? 24 : 20;
const viewBox = `0 0 ${minSize} ${minSize}`;
</script>
