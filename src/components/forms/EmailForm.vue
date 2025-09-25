<script lang="ts" setup>
import type { EmailTask } from '@/models/tasks.model';
import BaseForm from './BaseForm.vue';

const task = defineModel<EmailTask>('task', { required: true });
</script>

<template>
  <BaseForm v-model:task="task">
    <legend class="fieldset-legend">Sujet</legend>
    <input type="text" class="input w-full" placeholder="Sujet de l'email" v-model="task.subject" />

    <legend class="fieldset-legend">Contenu</legend>
    <textarea class="textarea h-24 w-full" placeholder="Contenu de l'email" v-model="task.body"></textarea>

    <legend class="fieldset-legend">Liste de diffusion</legend>
    <select v-model="task.diffusionListId" class="select w-full">
      <option>Liste client principaux</option>
      <option>Liste client secondaires</option>
    </select>
  </BaseForm>
</template>
