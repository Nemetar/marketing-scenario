<script lang="ts" setup>
import { useTasks } from '@/composables/useTasks';
import type { Task } from '@/models/tasks.model';
import { defineProps } from 'vue';

defineProps<{
  parent: Task,
  task: Task,
}>();

const { createSubTask, deleteSubTask } = useTasks();

</script>

<template>
  <div class="flex flex-col gap-2 rounded">
    <div class="flex gap-2 bg-white w-fit p-2 rounded">
      <div class="p-2 border rounded bg-primary">
        {{ task.type }}
      </div>
      <button class="bg-blue-500 text-white p-2 rounded" @click="createSubTask({ task, type: 'email' })">
        + Email
      </button>
      <button class="bg-green-500 text-white p-2 rounded" @click="createSubTask({ task, type: 'sms' })">
        + SMS
      </button>
      <button class="bg-gray-500 text-white p-2 rounded" @click="createSubTask({ task, type: 'custom' })">
        + Custom
      </button>
      <button class="bg-gray-500 text-white p-2 rounded" @click="createSubTask({ task, type: 'end' })">
        + End
      </button>
      <button class="bg-red-500 text-white p-2 rounded" @click="deleteSubTask({ parent, task })">
        - Delete
      </button>
    </div>
    <div v-if="task.subTasks" class="flex gap-2">
      <TaskNode v-for="subTask in task.subTasks" :key="subTask.id" :parent="task" :task="subTask" />
    </div>
  </div>
</template>
