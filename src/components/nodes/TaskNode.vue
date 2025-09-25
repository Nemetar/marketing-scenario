<script lang="ts" setup>
import { useTasks } from '@/composables/tasks.composable';
import type { Task } from '@/models/tasks.model';

const task = defineModel<Task>("task", { required: true });
const parent = defineModel<Task>("parent", { required: true });

const { createSubtask, deleteSubtask, hasSubtasks, getTaskAuthorizedSubtasks, showDeleteAction, getTaskIcon, getTaskFormComponent } = useTasks();

</script>

<template>
  <div class="flex flex-col items-center gap-6">

    <div class="flex flex-col items-center gap-2  p-3 w-fit justify-between">
      <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend class="fieldset-legend">{{ task.name }}</legend>
        <component v-if="getTaskFormComponent(task.type)" :is="getTaskFormComponent(task.type)" v-model:task="task" />
        <button v-if="showDeleteAction(task)" class="btn btn-soft btn-error" @click="deleteSubtask({ parent, task })">
          🗑️
        </button>
        <div class="flex gap-2">
          <button class="btn btn-soft btn-primary" v-for="authorizedSubtask in getTaskAuthorizedSubtasks(task)"
            :key="authorizedSubtask" @click="createSubtask({ task, type: authorizedSubtask })"> {{
              getTaskIcon(authorizedSubtask) }}
          </button>
        </div>
      </fieldset>
    </div>

    <div v-if="hasSubtasks(task)" class="flex justify-center gap-8 w-full">
      <div class="flex justify-center gap-32 pt-6">
        <TaskNode v-for="subTask in task.subTasks" :key="subTask.id" v-model:parent="task" :task="subTask" />
      </div>
    </div>
  </div>
</template>
