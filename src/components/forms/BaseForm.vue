<script lang="ts" setup>
import { ref } from 'vue';
import type { Task } from '@/models/tasks.model';

const task = defineModel<Task>('task', { required: true });
const isOpen = ref(false);
</script>

<template>
  <div class="collapse collapse-arrow bg-base-100 border-base-300 border">
    <input type="checkbox" v-model="isOpen" />
    <div class="collapse-title font-semibold">Modifier ma tâche</div>

    <div class="collapse-content">
      <legend class="fieldset-legend">Nom</legend>
      <input type="text" class="input w-full" placeholder="My awesome email task" v-model="task.name" />
      <slot></slot>
    </div>
  </div>
</template>
