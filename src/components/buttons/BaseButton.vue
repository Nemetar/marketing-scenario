<script lang="ts" setup>
defineProps<{
  tooltip: string;
  color?: string;
}>();
</script>

<template>
  <button class="tooltip btn btn-soft" :class="`btn-${color}`" :data-tip="tooltip">
    <slot></slot>
  </button>
</template>
