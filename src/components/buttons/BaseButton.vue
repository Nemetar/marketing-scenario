<script lang="ts" setup>
import type { TaskType } from '@/models/tasks.model';
defineProps<{
  type: TaskType;
}>();
</script>

<template>
  <div class="tooltip" :data-tip="type">
    <button class="btn btn-soft btn-primary">
      <slot></slot>
    </button>
  </div>
</template>
