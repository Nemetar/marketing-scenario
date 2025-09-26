<script lang="ts" setup>
import { useTasks } from '@/composables/tasks.composable';
import type { Task } from '@/models/tasks.model';
import TaskCard from '@/components/cards/TaskCard.vue';

const task = defineModel<Task>("task", { required: true });
const parent = defineModel<Task>("parent", { required: true });

const { hasSubtasks } = useTasks();

</script>

<template>
  <div class="flex flex-col items-center gap-6">
    <TaskCard v-model:task="task" v-model:parent="parent" />

    <div v-if="hasSubtasks(task)" class="flex justify-center gap-8 w-full">
      <div class="flex justify-center gap-32 pt-6">
        <TaskNode v-for="(subTask, index) in task.subTasks" :key="subTask.id" v-model:parent="task"
          v-model:task="task.subTasks[index]" />
      </div>
    </div>
  </div>
</template>
