<script lang="ts" setup>
import type { SmsTask } from '@/models/tasks.model';
import BaseForm from './BaseForm.vue';
const task = defineModel<SmsTask>('task', { required: true });
</script>

<template>
  <BaseForm v-model:task="task">
    <legend class="fieldset-legend">Message</legend>
    <textarea class="textarea h-24 w-full" placeholder="Contenu du message" v-model="task.message"></textarea>

    <legend class="fieldset-legend">Liste de diffusion</legend>
    <select v-model="task.diffusionListId" class="select w-full">
      <option>Liste client principaux</option>
      <option>Liste client secondaires</option>
    </select>
  </BaseForm>
</template>
