<script lang="ts" setup>
import { useTasks } from '@/composables/tasks.composable';
import type { Task } from '@/models/tasks.model';
import EmailForm from '../forms/EmailForm.vue';

defineProps<{
  parent: Task,
  task: Task,
}>();

const { createSubtask, deleteSubtask, hasSubtasks, getTaskAuthorizedSubtasks, showDeleteAction, getTaskIcon } = useTasks();

</script>

<template>
  <div class="flex flex-col items-center gap-6">
    <div class="flex flex-col items-center gap-2 bg-white shadow-md rounded-lg p-3 w-fit justify-between">
      <EmailForm />
      <button v-if="showDeleteAction(task)" class="btn btn-soft btn-error" @click="deleteSubtask({ parent, task })">
        🗑️
      </button>
    </div>
    <div class="flex gap-2">
      <button class="btn btn-soft btn-primary" v-for="authorizedSubtask in getTaskAuthorizedSubtasks(task)"
        :key="authorizedSubtask" @click="createSubtask({ task, type: authorizedSubtask })"> {{
          getTaskIcon(authorizedSubtask) }}
      </button>
    </div>
    <div v-if="hasSubtasks(task)" class="flex justify-center gap-8 w-full">
      <div class="flex justify-center gap-32 pt-6">
        <TaskNode v-for="subTask in task.subTasks" :key="subTask.id" :parent="task" :task="subTask" />
      </div>
    </div>
  </div>
</template>
