<script lang="ts" setup>
import { useTasks } from '@/composables/tasks.composable';
import type { Task } from '@/models/tasks.model';
import TaskCard from '@/components/cards/TaskCard.vue';

const task = defineModel<Task>("task", { required: true });
const parent = defineModel<Task>("parent", { required: true });

const { hasSubtasks } = useTasks();

</script>

<template>
  <div class="flex flex-col items-center gap-6 relative">
    <TaskCard v-model:task="task" v-model:parent="parent" />
    <div v-if="hasSubtasks(task)" class="flex justify-center gap-8 w-full relative">
      <div class="absolute top-0 left-0 right-0 h-px bg-gray-400" id="horizontal-line"></div>
      <div v-for="(subTask, index) in task.subTasks" :key="subTask.id" class="flex flex-col items-center relative">
        <div class="absolute top-0 h-6 w-px bg-gray-400" id="vertical-line"></div>
        <TaskNode v-model:parent="task" v-model:task="task.subTasks[index]" />
      </div>
    </div>
  </div>
</template>
