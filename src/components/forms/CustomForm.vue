  <script lang="ts" setup>
  import { useTasks } from '@/composables/tasks.composable';
  import type { CustomTask } from '@/models/tasks.model';
  import BaseForm from './BaseForm.vue';

  const { createTask, getTaskFormComponent } = useTasks();
  const task = defineModel<CustomTask>('task', { required: true });
</script>

  <template>
    <div class="flex flex-col gap-4">
      <div>
        <legend class="fieldset-legend">Configuration</legend>
        <p>Une tâche personnalisée permet de regrouper plusieurs tâches (email, sms...)</p>
      </div>

      <BaseForm v-model:task=task />

      <div v-for="(customTask, index) in task.customTasks" :key="customTask.id" class="flex flex-col gap-1">
        <component v-if="getTaskFormComponent(customTask.type)" :is="getTaskFormComponent(customTask.type)"
          v-model:task="task.customTasks[index]" />
        <span class="text-red-500 hover:text-red-700 text-xs underline cursor-pointer self-end"
          @click="task.customTasks.splice(index, 1)">
          supprimer
        </span>
      </div>

      <div class="flex gap-2">
        <button class="btn btn-soft btn-primary btn-sm flex-1" @click="task.customTasks.push(createTask('email'))">
          Ajouter Email
        </button>
        <button class="btn btn-soft btn-primary btn-sm flex-1" @click="task.customTasks.push(createTask('sms'))">
          Ajouter SMS
        </button>
      </div>
    </div>
  </template>
