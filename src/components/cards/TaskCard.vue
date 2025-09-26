<script lang="ts" setup>
import { useTasks } from '@/composables/tasks.composable';
import type { Task } from '@/models/tasks.model';
import BaseButton from '@/components/buttons/BaseButton.vue';
import { useTasksStore } from '@/stores/tasks.store';

const task = defineModel<Task>("task", { required: true });
const parent = defineModel<Task>("parent", { required: true });

const { createSubtask, deleteSubtask, isStartTask, getTaskIcon, getTaskFormComponent, getTaskAuthorizedSubtasks } = useTasks();
const { runSimulation } = useTasksStore();
</script>

<template>
  <div class="flex flex-col items-center gap-2  p-3 w-fit justify-between">
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
      <legend class="fieldset-legend">{{ task.name }}</legend>

      <BaseButton v-if="isStartTask(task)" @click="runSimulation" tooltip="lancer" color="success">▶️
      </BaseButton>

      <component v-if="getTaskFormComponent(task.type)" :is="getTaskFormComponent(task.type)" v-model:task="task" />

      <BaseButton v-if="!isStartTask(task)" @click="deleteSubtask({ parent, task })" tooltip="supprimer" color="error">
        🗑️
      </BaseButton>

      <div class="flex gap-2">
        <BaseButton v-for="authorizedSubtask in getTaskAuthorizedSubtasks(task)" :key="authorizedSubtask"
          :tooltip="authorizedSubtask" color="primary" @click="createSubtask({ task, type: authorizedSubtask })"> {{
            getTaskIcon(authorizedSubtask) }}
        </BaseButton>
      </div>
    </fieldset>
  </div>

</template>
